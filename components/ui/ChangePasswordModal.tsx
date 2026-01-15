'use client'

import { useState } from 'react'
import Modal from './Modal'
import { CheckIcon } from '@heroicons/react/24/outline'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleSave = () => {
    // Handle save logic
    onClose()
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
        onClick={handleSave}
        className="px-3 py-2 bg-[#18181b] text-white text-sm font-semibold rounded-lg hover:bg-[#27272a] flex items-center gap-3"
      >
        <CheckIcon className="w-4 h-4" />
        Save
      </button>
    </div>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change password" footer={footer}>
      <div className="flex flex-col gap-6">
        {/* Current password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="place holder"
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>

        {/* New password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="place holder"
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>

        {/* New password (repeat) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            New password(repeat)
          </label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="place holder"
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>
      </div>
    </Modal>
  )
}
