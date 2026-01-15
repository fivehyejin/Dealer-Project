'use client'

import { useState } from 'react'
import Modal from './Modal'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface MySettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MySettingsModal({ isOpen, onClose }: MySettingsModalProps) {
  const [formData, setFormData] = useState({
    name: 'admin',
    surname: 'admin',
    email: 'admin@test.com',
    emailAddress: 'admin@test.com',
    phoneNumber: '',
    userId: 'admin',
    timezone: 'Default[(UTC+07:00) Bangkok, Hanoi, Jakarta]',
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

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
    <Modal isOpen={isOpen} onClose={onClose} title="My settings" footer={footer}>
      <div className="flex flex-col gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>

        {/* Surname */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            Surname<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => handleChange('surname', e.target.value)}
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>

        {/* Email address */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            Email address<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>

        {/* Email address (duplicate) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            Email address
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => handleChange('emailAddress', e.target.value)}
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>

        {/* Phone number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            Phone number
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="placeholder"
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>

        {/* User id */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            User id(Login id)<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.userId}
            onChange={(e) => handleChange('userId', e.target.value)}
            className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
          />
        </div>

        {/* Timezone */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#09090b]">
            Timezone
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-[#d4d4d8] rounded-lg text-base text-[#09090b] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm pr-10"
            />
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
          </div>
        </div>
      </div>
    </Modal>
  )
}
