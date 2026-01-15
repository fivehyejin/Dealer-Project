'use client'

import { useState } from 'react'
import Modal from './Modal'
import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

interface LoginAttemptsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface LoginAttempt {
  vehicle: string
  email: string
  date: string
}

export default function LoginAttemptsModal({ isOpen, onClose }: LoginAttemptsModalProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const loginAttempts: LoginAttempt[] = [
    { vehicle: '175.209.251.44', email: 'Chrome / 143.0 / WinNT', date: '31 minutes ago(2026-01-07 02:02:02)' },
    { vehicle: '175.209.251.44', email: 'Chrome / 143.0 / WinNT', date: '31 minutes ago(2026-01-07 02:02:02)' },
    { vehicle: '175.209.251.44', email: 'Chrome / 143.0 / WinNT', date: '31 minutes ago(2026-01-07 02:02:02)' },
  ]

  const footer = (
    <div className="flex gap-3 justify-end">
      <button
        onClick={onClose}
        className="px-3 py-2 text-sm font-semibold text-[#09090b] rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
    </div>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login attempts" footer={footer}>
      <div className="flex flex-col gap-4">
        {/* Search dropdown */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full px-3 py-2 bg-white border border-[#e4e4e7] rounded-lg text-sm font-semibold text-[#71717a] placeholder:text-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm pr-10"
          />
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717a]" />
        </div>

        {/* Table */}
        <div className="border border-[#d4d4d8] rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="flex bg-white border-b border-[#d4d4d8]">
            <div className="w-[160px] px-6 py-2.5 flex items-center gap-2 border-r border-[#d4d4d8]">
              <span className="text-sm font-semibold text-[#71717a]">Vehicle</span>
              <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
            </div>
            <div className="w-[216px] px-6 py-2.5 flex items-center gap-2 border-r border-[#d4d4d8]">
              <span className="text-sm font-semibold text-[#71717a]">Email</span>
              <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
            </div>
            <div className="flex-1 px-6 py-2.5 flex items-center gap-2">
              <span className="text-sm font-semibold text-[#71717a]">Email</span>
              <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
            </div>
          </div>

          {/* Table Rows */}
          {loginAttempts.map((attempt, index) => (
            <div
              key={index}
              className={`flex border-b border-[#e4e4e7] ${
                index % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
              }`}
            >
              <div className="w-[160px] px-6 py-4 border-r border-[#e4e4e7] min-h-[56px] flex items-center">
                <span className="text-sm font-semibold text-[#09090b]">{attempt.vehicle}</span>
              </div>
              <div className="w-[216px] px-6 py-4 border-r border-[#e4e4e7] min-h-[56px] flex items-center">
                <span className="text-sm font-semibold text-[#09090b]">{attempt.email}</span>
              </div>
              <div className="flex-1 px-6 py-4 min-h-[56px] flex items-center">
                <span className="text-sm font-semibold text-[#09090b]">{attempt.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
