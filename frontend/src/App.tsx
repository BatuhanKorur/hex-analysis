import FileUpload from './components/FileUpload'
import { useSocket } from './context/SocketContext'
import { VerifyFileResponse } from '@hex-analysis/types'
import FileVerification from './components/FileVerification'

export default function App() {
  const { status, messages } = useSocket()

  const fileVerification: VerifyFileResponse = messages.get('file_verification') as VerifyFileResponse

  return (
    <div>
      <div>
        <h1 className="text-3xl font-[550] tracking-[0.25px]">File Analysis</h1>
        <p>{ status }</p>
      </div>
      <div className="grid grid-cols-12">
        <FileUpload className="col-span-6" />
      </div>
      <div>
        { fileVerification && <FileVerification results={fileVerification} />}
      </div>
    </div>
  )
}
