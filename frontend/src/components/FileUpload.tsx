import { cx } from '@/utils'
import React, { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import { useSocket } from '../context/SocketContext'
import { prettyBytes } from '@hex-analysis/shared'

interface FileUploadProps {
  className?: string
}

export default function FileUpload({ className }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  return (
    <div className={cx(className)}>
      <div
        className={cx([
          'flex items-center relative bg-white/3',
          'border border-dashed border-zinc-800 h-32 rounded-md',
          isDragging ? 'border-indigo-300/50' : '',
        ])}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragOver}
      >
        {!file && (
          <input
            type="file"
            onChange={handleFileInput}
            className="absolute inset-0 opacity-0 size-full cursor-pointer z-50"
          />
        )}

        {!file && (
          <div className="center w-full h-full transition duration-200 ease-in-out opacity-50 hover:opacity-100">
            <p className="font-medium">Drop or Select a File</p>
          </div>
        )}
        {file && <FileInfo file={file} onRemoveFile={handleRemoveFile} /> }
      </div>
    </div>
  )
}

function FileInfo({ file, onRemoveFile }: { file: File, onRemoveFile: () => void }) {
  const { send } = useSocket()
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

  console.log(file)
  return (
    <div className="flex mx-8">
      <div className="flex border border-zinc-800 rounded-md bg-zinc-950">
        <div className="ml-7 center">
          <Icon icon="tabler:file" className="scale-[2]" />
        </div>
        <div className="w-64 flex flex-col justify-center py-3 px-8">
          <p className="text-base font-medium">{file.name }</p>
          <div className="between">
            <p className="text-sm text-zinc-300">{ file.type }</p>
            <p className="text-sm text-zinc-300">{ prettyBytes(file.size) }</p>
          </div>
        </div>
        <button
          onClick={sendFile}
          className={cx([
            'cursor-pointer transition duration-200 ease-in-out hover:bg-zinc-800/75',
            'bg-zinc-800 px-5 py-2.5 text-sm font-medium',
          ])}
        >Analyze
        </button>
      </div>
      <button className="w-10 flex items-start justify-center mt-2 cursor-pointer tranition duration-100 ease-in-out hover:opacity-80" onClick={onRemoveFile}>
        <Icon icon="ic:twotone-remove-circle-outline" className="text-rose-300 scale-[1.3]" />
      </button>
    </div>
  )
}
