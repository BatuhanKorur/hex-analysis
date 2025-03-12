import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { FileService } from './FileService'
import { ImageService } from './ImageService'

export class AnalysisService {
  temp_dir: string = path.join(process.cwd(), 'temp')
  file: File | undefined = undefined
  file_path: string = ''

  constructor() {
    if (!fs.existsSync(this.temp_dir)) {
      fs.mkdirSync(this.temp_dir, { recursive: true })
    }
  }

  public async start(file: File) {
    if (!file) return
    this.file = file

    const { buffer, headerBuffer } = await this.getFileBuffer()
    await this.saveFile(buffer)

    const verification = await FileService.verifyFile(headerBuffer, this.file)
    // console.log(verification)

    const hex_dump = await this.getHexDump()
    // console.log(hex_dump)

    const strings = await this.getStrings()
    // console.log(strings)

    const hash_data = await this.getHashData(['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512'])
    // console.log(hash_data)

    if (verification.isImage) {
      // TODO Some image related stuff bro
      const imageService = new ImageService(this.file_path)
      await imageService.getImageMetadata()
      const i = await imageService.analyzeColors()
      console.log(i)
    }
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
      return {
        address,
        hex: hexPart.trim(),
        ascii: asciiPart.trim(),
      }
    })
  }

  private async getStrings() {
    const process = Bun.spawn(['strings', this.file_path!], {
      stdout: 'pipe',
      stderr: 'pipe',
    })
    const output = await new Response(process.stdout).text()
    const error = await new Response(process.stderr).text()
    if (error) {
      throw new Error(`strings command failed: ${error}`)
    }
    return output.trim().split('\n')
  }

  private async getHashData(algorithms: string[]) {
    if (!this.file_path) return

    // Create a hash object for each algorithm
    const hashObjects: Record<string, crypto.Hash> = {}
    for (const algo of algorithms) {
      hashObjects[algo] = crypto.createHash(algo)
    }
    // Process the file in a single stream operation
    try {
      const stream = fs.createReadStream(this.file_path)

      // Process each chunk of data
      for await (const chunk of stream) {
        // Update all hash objects with the current chunk
        Object.values(hashObjects).forEach(hash => hash.update(chunk))
      }

      // Convert hash objects to hex digest results
      const results: Record<string, string> = {}
      for (const [algo, hash] of Object.entries(hashObjects)) {
        results[algo] = hash.digest('hex')
      }

      return results
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
      throw new Error(`Failed to compute file hashes`)
    }
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
