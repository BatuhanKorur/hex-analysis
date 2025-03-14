import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import crypto, { createHash } from 'node:crypto'
import { FileService } from './FileService'
// import { ImageService } from './ImageService'
import { WSContext } from 'hono/dist/types/helper/websocket'
import { sendMessage } from '@hex-analysis/shared/utils'
import { HashListItem, HexLine } from '@hex-analysis/shared'
import { $ } from 'bun'
import { ImageService } from './ImageService'

export class AnalysisService {
  temp_dir: string = path.join(process.cwd(), 'temp')
  file: File | undefined = undefined
  file_path: string = ''
  ws: WSContext | null = null

  constructor(ws: WSContext<unknown>) {
    this.ws = ws
    if (!fs.existsSync(this.temp_dir)) {
      fs.mkdirSync(this.temp_dir, { recursive: true })
    }
  }

  public async startAnalysis(file: File) {
    if (!file || !this.ws) return
    this.file = file

    const { buffer, headerBuffer } = await this.getFileBuffer()
    await this.saveFile(buffer)

    const file_meta = FileService.verifyFile(headerBuffer, this.file)
    this.ws!.send(sendMessage('file_verification', file_meta))

    const tasks = []
    tasks.push(this.getHexDump()
      .then((hex_dump) => {
        this.ws!.send(sendMessage('hex_dump', hex_dump))
      }))

    tasks.push(this.getHexStrings()
      .then((hex_strings) => {
        this.ws!.send(sendMessage('hex_strings', hex_strings))
      }))

    tasks.push(this.getHashList()
      .then((hash_list) => {
        this.ws!.send(sendMessage('hash_list', hash_list))
      }))

    if (file_meta.isImage) {
      const imageService = new ImageService(this.file_path)
      tasks.push(imageService.getImageMetadata().then((metadata) => {
        this.ws!.send(sendMessage('image_metadata', metadata))
      }))

      tasks.push(imageService.analyzeColors().then((colors) => {
        this.ws!.send(sendMessage('image_colors', colors))
      }))
    }

    await Promise.all(tasks).finally(() => {
      this.removeFile()
    })
  }

  private async getHexDump() {
    const process = Bun.spawn(['xxd', this.file_path!], {
      stdout: 'pipe',
      stderr: 'pipe',
    })
    const output = await new Response(process.stdout).text()
    const error = await new Response(process.stderr).text()
    if (error) {
      throw new Error(`xxd command failed: ${error}`)
    }
    const lines = output.trim().split('\n')
    return lines.map((line) => {
      const [address, hexPart, asciiPart] = line.split(/:\s+|\s{2,}/)
      const hexArray = hexPart
        .split(' ')
        .map(byte => [byte.slice(0, 2), byte.slice(2, 4)])
        .flat()
      return {
        address,
        hex: hexArray,
        ascii: asciiPart.split(''),
      }
    })
  }

  private async getHexStrings() {
    try {
      const process = await $`strings ${this.file_path!}`.text()
      return process.trim().split('\n')
    }
    catch (error) {
      // @ts-ignore
      console.error(`Failed with code ${error.exitCode}`)
      // @ts-ignore
      console.error(error.stdout.toString())
      // @ts-ignore
      console.error(error.stderr.toString())
    }
  }

  private async getHashList() {
    const algorithms = ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512']
    const list: HashListItem[] = []

    algorithms.forEach((algo) => {
      const hash = createHash(algo)
      hash.update(this.file_path!)
      list.push({ algorithm: algo, hash: hash.digest('hex') })
    })

    return list
  }

  private async getFileBuffer() {
    const arrayBuffer = await this.file!.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Extract only the first 8192 bytes for magic number checking
    const headerBuffer = buffer.subarray(0, 8192)
    return { buffer, headerBuffer }
  }

  private async saveFile(buffer: Buffer) {
    const filePath = path.join(this.temp_dir, `${crypto.randomUUID()}-${this.file!.name}`)
    await Bun.write(filePath, buffer)
    this.file_path = filePath
  }

  public async removeFile() {
    if (this.file_path) {
      fs.rmSync(this.file_path)
    }
  }
}
