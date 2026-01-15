'use client'

import { useState } from 'react'
import Modal from './Modal'
import { CheckIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

interface ChangeProfilePictureModalProps {
  isOpen: boolean
  onClose: () => void
}

interface UploadFile {
  name: string
  size: string
  progress?: number
  status?: 'uploading' | 'failed' | 'completed'
}

export default function ChangeProfilePictureModal({ isOpen, onClose }: ChangeProfilePictureModalProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [documentFile, setDocumentFile] = useState('')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFiles([
        ...files,
        {
          name: file.name,
          size: `${(file.size / 1024).toFixed(0)}KB`,
          progress: 15,
          status: 'uploading',
        },
      ])
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const footer = (
    <div className="flex gap-3 justify-end">
      <button
        onClick={onClose}
        className="px-3 py-2 text-sm font-semibold text-[#09090b] rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        onClick={onClose}
        className="px-3 py-4 bg-[#18181b] text-white text-sm font-semibold rounded-lg hover:bg-[#27272a] flex items-center gap-3"
      >
        <CheckIcon className="w-4 h-4" />
        Create
      </button>
    </div>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change profile picture" footer={footer}>
      <div className="flex flex-col gap-4">
        {/* Document File */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            Document File
          </label>
        </div>

        {/* File Upload Area */}
        <div className="flex flex-col gap-4">
          {/* Drag and Drop */}
          <div className="border-2 border-dashed border-[#a1a1aa] bg-[#e4e4e7] rounded-lg p-9 flex flex-col items-center justify-center gap-3.5">
            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-col items-center gap-2">
                <ArrowUpTrayIcon className="w-6 h-6 text-[#09090b]" />
                <div className="text-base text-[#09090b]">Drag and drop files here</div>
              </div>
              <div className="text-sm text-[#71717a] text-center">
                JPG, JPEG, PNG - Up to 5MB
              </div>
            </div>
            <button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="px-2.5 py-1.5 bg-[#fafafa] border border-[#d4d4d8] text-sm font-semibold text-[#09090b] rounded-lg hover:bg-gray-100"
            >
              Choose files
            </button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileUpload}
            />
          </div>

          {/* Upload Progress */}
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-white border border-[#d4d4d8] rounded-lg px-6 py-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-[#09090b]">{file.name}</span>
                  {file.status === 'failed' ? (
                    <span className="text-base font-medium text-red-600">Upload failed</span>
                  ) : (
                    <span className="text-base font-medium text-[#71717a]">{file.size}</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {file.status === 'failed' && (
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ArrowPathIcon className="w-6 h-6 text-[#a1a1aa]" />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <TrashIcon className="w-6 h-6 text-[#a1a1aa]" />
                  </button>
                </div>
              </div>
              {file.progress !== undefined && file.status === 'uploading' && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#d4d4d8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#09090b]">{file.progress}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
