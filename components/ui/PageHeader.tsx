'use client'

import { Star, Plus } from 'lucide-react'

export default function PageHeader() {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        Home <span className="mx-2">/</span> Dealers
      </div>

      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Dealers</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Star className="w-5 h-5 text-green-500 fill-green-500" />
          </button>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create dealer
        </button>
      </div>
    </div>
  )
}
