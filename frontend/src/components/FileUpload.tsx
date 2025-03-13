import { cx } from '@/utils'
import React, { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import { useSocket } from '../context/SocketContext'

function FileInfo({ file }: { file: File }) {
  return (
    <div className="flex h-18">
      <div className="h-full w-18 center">
        <Icon icon="tabler:file" className="scale-[1.6]" />
      </div>
      <div className="min-w-64 flex flex-col justify-center">
        <p className="text-lg font-medium">{file.name }</p>
        <div className="between text-zinc-200">
          <span>{ file.type }</span>
          <span>{ file.size }</span>
        </div>
      </div>
    </div>
  )
}

export default function FileUpload({
  className,
}: {
  className: string
}) {
  const { send } = useSocket()
  const [file, setFile] = useState<File | null>(null)

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const sendFile = () => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1]
        send('analyze_file', {
          file: base64,
          filename: file.name,
          content_type: file.type,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={cx(className)}>
      <div className={cx('border border-dashed border-zinc-500 relative h-32 p-1 rounded-md')}>
        <input type="file" onChange={handleFileInput} />
        {file && <FileInfo file={file} /> }
      </div>
      <button onClick={sendFile} className="bg-zinc-800 px-5 py-2.5 rounded-md text-sm font-medium">Analyze</button>
    </div>
  )
}
