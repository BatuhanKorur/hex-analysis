import { FileSignature, FileVerificationResponse } from '../../../shared'
import { FILE_SIGNATURES } from '../const/fileSignatures'
import { VERIFICATION_STATUS } from '../../../shared/enum'

export class FileService {
  public static verifyFile(headerBuffer: Buffer, file: File) {
    const response: FileVerificationResponse = {
      status: VERIFICATION_STATUS.UNKNOWN,
      message: '',
      signature: null,
      claimed_mime: '',
      verified_mime: '',
      isImage: false,
      isExecutable: false,
      isArchive: false,
      isDocument: false,
    }
    const claimed_mime = file.type
    const signature: FileSignature | undefined = FILE_SIGNATURES.find(signature => this.matchSignatures(headerBuffer, signature))

    if (!signature) {
      response.message = 'No matching signature found'
      return response
    }

    if (claimed_mime === signature.mimeType) {
      response.status = VERIFICATION_STATUS.MATCH
      response.message = `Claimed ${claimed_mime} matches verified type, ${signature.mimeType}`
    }
    else {
      response.status = VERIFICATION_STATUS.MISMATCH
      response.message = `Claimed ${claimed_mime} does not match verified type, ${signature.mimeType}`
    }

    return {
      ...response,
      signature,
      claimed_mime,
      verified_mime: signature.mimeType,
      isImage: this.isImage(signature.mimeType),
      isExecutable: this.isExecutable(signature.mimeType),
      isArchive: this.isArchive(signature.mimeType),
      isDocument: this.isDocument(signature.mimeType),
    }
  }

  private static matchSignatures(buffer: Buffer, signature: FileSignature): boolean {
    const offset = signature.offset || 0
    if (offset + signature.signature.length > buffer.length) {
      return false
    }
    for (let i = 0; i < signature.signature.length; i++) {
      if (buffer[offset + i] !== signature.signature[i]) {
        return false
      }
    }
    return true
  }

  public static isImage(mimeType: string): boolean {
    return mimeType.startsWith('image/')
  }

  public static isDocument(mimeType: string): boolean {
    return [
      'application/pdf',
      'application/msword',
      'application/vnd.ms-excel',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/html',
      'text/csv',
      'application/rtf',
      'application/vnd.ms-office',
    ].includes(mimeType)
  }

  public static isArchive(mimeType: string): boolean {
    return [
      'application/zip',
      'application/x-rar-compressed',
      'application/gzip',
      'application/x-tar',
      'application/x-7z-compressed',
      'application/x-bzip2',
      'application/x-xz',
      'application/x-lzip',
    ].includes(mimeType)
  }

  public static isExecutable(mimeType: string): boolean {
    return [
      'application/x-msdownload',
      'application/x-elf',
      'application/x-mach-binary',
      'application/x-executable',
      'application/x-sharedlib',
      'application/x-dosexec',
    ].includes(mimeType)
  }
}
