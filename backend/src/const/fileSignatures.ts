import { FileSignature } from '@hex-analysis/shared/types'

// Collection of common file signatures (magic numbers)
export const FILE_SIGNATURES: FileSignature[] = [
  {
    signature: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
    mimeType: 'image/png',
    extension: 'png',
    description: 'PNG image',
  },
  {
    signature: [0xFF, 0xD8, 0xFF],
    mimeType: 'image/jpeg',
    extension: 'jpg',
    description: 'JPEG image',
  },
  {
    signature: [0x47, 0x49, 0x46, 0x38],
    mimeType: 'image/gif',
    extension: 'gif',
    description: 'GIF image',
  },
  {
    signature: [0x25, 0x50, 0x44, 0x46, 0x2D],
    mimeType: 'application/pdf',
    extension: 'pdf',
    description: 'PDF document',
  },
  {
    signature: [0x50, 0x4B, 0x03, 0x04],
    mimeType: 'application/zip',
    extension: 'zip',
    description: 'ZIP archive',
  },
  {
    signature: [0x7F, 0x45, 0x4C, 0x46],
    mimeType: 'application/x-elf',
    extension: 'elf',
    description: 'ELF executable',
  },
  {
    signature: [0x4D, 0x5A],
    mimeType: 'application/x-msdownload',
    extension: 'exe',
    description: 'Windows executable',
  },
  {
    signature: [0xCE, 0xFA, 0xED, 0xFE],
    mimeType: 'application/x-mach-binary',
    extension: 'macho',
    description: 'Mach-O binary (32-bit)',
  },
  {
    signature: [0xCF, 0xFA, 0xED, 0xFE],
    mimeType: 'application/x-mach-binary',
    extension: 'macho',
    description: 'Mach-O binary (64-bit)',
  },
  {
    signature: [0x42, 0x4D],
    mimeType: 'image/bmp',
    extension: 'bmp',
    description: 'BMP image',
  },
  {
    signature: [0x52, 0x49, 0x46, 0x46],
    mimeType: 'image/webp',
    extension: 'webp',
    description: 'WebP image',
  },
  {
    signature: [0x1F, 0x8B],
    mimeType: 'application/gzip',
    extension: 'gz',
    description: 'GZIP archive',
  },
  {
    signature: [0x75, 0x73, 0x74, 0x61, 0x72],
    offset: 257, // TAR files have their signature at offset 257
    mimeType: 'application/x-tar',
    extension: 'tar',
    description: 'TAR archive',
  },
  {
    signature: [0x52, 0x61, 0x72, 0x21, 0x1A, 0x07],
    mimeType: 'application/x-rar-compressed',
    extension: 'rar',
    description: 'RAR archive',
  },
  {
    signature: [0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C],
    mimeType: 'application/x-7z-compressed',
    extension: '7z',
    description: '7-Zip archive',
  },
  {
    signature: [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1],
    mimeType: 'application/vnd.ms-office',
    extension: 'doc',
    description: 'Microsoft Office document',
  },
  {
    signature: [0x00, 0x01, 0x00, 0x00, 0x00],
    mimeType: 'application/x-font-ttf',
    extension: 'ttf',
    description: 'TrueType font',
  },
  {
    signature: [0x4F, 0x54, 0x54, 0x4F],
    mimeType: 'application/x-font-otf',
    extension: 'otf',
    description: 'OpenType font',
  },
  {
    signature: [0x00, 0x00, 0x01, 0x00],
    mimeType: 'application/x-ico',
    extension: 'ico',
    description: 'ICO icon',
  },
]
