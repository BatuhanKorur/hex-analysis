import FileUpload from './components/FileUpload'
import { useSocket } from './context/SocketContext'
import { ColorAnalysisItem, FileVerificationResponse, HexDumpResponse, HashListItem } from '@hex-analysis/shared'
import FileVerification from './cards/FileVerification'
import { useEffect, useState } from 'react'
import { ImageColors } from './cards/ImageColors'
import { HexStrings } from './cards/HexStrings'
import { HexDump } from './cards/HexDump'
import { HashList } from './cards/HashList'
import { SocketStatus } from './components'

export default function App() {
  const [file, setFile] = useState<File | null>(null)
  const { status, messages, send } = useSocket()

  const hexDump = messages.get('hex_dump') as HexDumpResponse
  const hexStrings = messages.get('hex_strings') as string[]
  const hashList = messages.get('hash_list') as HashListItem[]
  const fileVerification = messages.get('file_verification') as FileVerificationResponse
  const imageColors = messages.get('image_colors') as ColorAnalysisItem[]

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-[550] tracking-[0.25px] leading-12">File Analysis</h1>
          <SocketStatus status={status} />
        </div>
        <FileUpload className="col-span-6" onFileUpload={setFile} />
      </div>
      <div className="grid grid-cols-12 my-10 gap-4">
        { fileVerification && <FileVerification className="col-span-12" results={fileVerification} />}
        { hashList && <HashList className="col-span-12" data={hashList} />}
        { hexDump && <HexDump className="col-span-8" data={hexDump} />}
        { hexStrings && <HexStrings className="col-span-4" data={hexStrings} />}
        {imageColors && <ImageColors className="col-span-8" data={imageColors} />}
      </div>
    </div>
  )
}
