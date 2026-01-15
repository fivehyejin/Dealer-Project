'use client'

import { Search, Mic, ChevronDown, Bell, User, Plus } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6">
      {/* Left: Logo */}
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold text-gray-900">DEALER JES</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Mic className="w-5 h-5 text-gray-600" />
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm">
          English
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            D1
          </div>
        </button>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create dealer
        </button>
      </div>
    </nav>
  )
}
