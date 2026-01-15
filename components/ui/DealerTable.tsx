'use client'

import { useState } from 'react'
import { Search, Mic, Filter, ChevronRight, MoreVertical, ChevronLeft, ChevronDown } from 'lucide-react'

interface Dealer {
  code: string
  name: string
  edition: string
  type: string
  sideMenuSet: string
  status: 'Active' | 'Inactive'
  creationTime: string
}

const mockData: Dealer[] = [
  { code: 'A11AD70701', name: 'Metro Vehicle Agency', edition: 'DLR', type: 'Standard', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.02.25' },
  { code: 'A11AD70702', name: 'Seoul Motor Group', edition: 'DGP', type: 'Premium', sideMenuSet: 'Genesis', status: 'Active', creationTime: '2024.02.24' },
  { code: 'A11AD70703', name: 'Busan Auto Center', edition: 'DLR', type: 'Enterprise', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.02.23' },
  { code: 'A11AD70704', name: 'Incheon Car Dealers', edition: 'DLR', type: 'Standard', sideMenuSet: 'SSC', status: 'Inactive', creationTime: '2024.02.22' },
  { code: 'A11AD70705', name: 'Daegu Motors', edition: 'DGP', type: 'Premium', sideMenuSet: 'Genesis', status: 'Active', creationTime: '2024.02.21' },
  { code: 'A11AD70706', name: 'Gwangju Auto', edition: 'DLR', type: 'Basic', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.02.20' },
  { code: 'A11AD70707', name: 'Daejeon Car Sales', edition: 'DLR', type: 'Standard', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.02.19' },
  { code: 'A11AD70708', name: 'Ulsan Vehicle Group', edition: 'DGP', type: 'Enterprise', sideMenuSet: 'Genesis', status: 'Inactive', creationTime: '2024.02.18' },
]

const typeColors: Record<string, string> = {
  Standard: 'bg-teal-100 text-teal-800',
  Premium: 'bg-green-100 text-green-800',
  Enterprise: 'bg-blue-100 text-blue-800',
  Basic: 'bg-yellow-100 text-yellow-800',
}

export default function DealerTable() {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const toggleRow = (index: number) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedRows(newSelected)
  }

  const toggleAll = () => {
    if (selectedRows.size === mockData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(mockData.map((_, i) => i)))
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Dealer List</h2>

        {/* Search and Filters */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for dealer code, dealer name"
                className="pl-10 pr-20 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Mic className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Dealer Type</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Side Menu Set</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Status</option>
              </select>
              <input
                type="text"
                placeholder="2026.01.15 - 2026.08.30"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              Edit columns
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.size === mockData.length}
                  onChange={toggleAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Dealer Code</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Edition</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Dealer Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Side Menu Set</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Active</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Creation Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((dealer, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50/50' : ''}`}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(index)}
                      onChange={() => toggleRow(index)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{dealer.code}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{dealer.name}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{dealer.edition}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[dealer.type] || 'bg-gray-100 text-gray-800'}`}>
                    {dealer.type}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{dealer.sideMenuSet}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    dealer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {dealer.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{dealer.creationTime}</td>
                <td className="px-4 py-4">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Row count:</span>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">3</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">4</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">5</button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
