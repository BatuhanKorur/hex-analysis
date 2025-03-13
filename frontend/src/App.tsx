import FileUpload from './components/FileUpload'
import { useSocket } from './context/SocketContext'
import { ColorAnalysisItem, FileVerificationResponse, HexDumpResponse, HashListItem } from '@hex-analysis/shared'
import FileVerificationCard from './components/FileVerificationCard'
import { useEffect } from 'react'
import { ImageColors } from './cards/ImageColors'
import { HexStrings } from './cards/HexStrings'
import { HexDump } from './cards/HexDump'
import { HashList } from './cards/HashList'

export default function App() {
  const { status, messages } = useSocket()

  useEffect(() => {
    console.log(messages)
  }, [messages])

  const hexDump = messages.get('hex_dump') as HexDumpResponse
  const hexStrings = messages.get('hex_strings') as string[]
  const hashList = messages.get('hash_list') as HashListItem[]
  const fileVerification = messages.get('file_verification') as FileVerificationResponse
  const imageColors = messages.get('image_colors') as ColorAnalysisItem[]

  return (
    <div>
      <div>
        <h1 className="text-3xl font-[550] tracking-[0.25px]">File Analysis</h1>
        <p>{ status }</p>
        <FileUpload className="col-span-6" />
      </div>
      <div className="grid grid-cols-12 my-10 gap-4">
        { hashList && <HashList className="col-span-12" data={hashList} />}
        { hexDump && <HexDump className="col-span-8" data={hexDump} />}
        { hexStrings && <HexStrings className="col-span-4" data={hexStrings} />}
        { fileVerification && <FileVerificationCard className="col-span-6" results={fileVerification} />}
        {imageColors && <ImageColors className="col-span-8" data={imageColors} />}
      </div>
    </div>
  )
}
