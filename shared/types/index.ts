import { VERIFICATION_STATUS } from '../enum'

export interface WSMessage {
  type: string
  message: unknown
}

// Hex Dump
export type HexDumpResponse = HexLine[]
export interface HexLine {
  address: string
  hex: string[]
  ascii: string[]
}

export interface FileSignature {
  signature: number[]
  mimeType: string
  extension: string
  description: string
  offset?: number
}

export interface FileVerificationResponse {
  status: VERIFICATION_STATUS
  message: string
  signature: FileSignature | null
  claimed_mime: string
  verified_mime: string
  isImage: boolean
  isExecutable: boolean
  isArchive: boolean
  isDocument: boolean
}

export interface ImageMetadataResponse {
  image_width: number
  image_height: number
  megapixels: number
}

export interface ColorAnalysisItem {
  color: string
  percentage: number
}

export interface HashListItem {
  algorithm: string
  hash: string
}
