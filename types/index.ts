export interface FileSignature {
  signature: number[]
  mimeType: string
  extension: string
  description: string
  offset?: number
}

export interface VerifyFileResponse {
  status: string
  message: string
  signature: FileSignature | null
  claimed_mime: string
  verified_mime: string
  isImage: boolean
  isExecutable: boolean
  isArchive: boolean
  isDocument: boolean
}
