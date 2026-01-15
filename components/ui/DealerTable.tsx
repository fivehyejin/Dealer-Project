// [2024-01-26]
// DealerTable 컴포넌트 업데이트
// 피그마 디자인에 맞게 테이블 구조, 스타일, 배지 색상 정확히 반영
'use client'

import { useState, useEffect, useRef } from 'react'
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
  EyeSlashIcon,
  ArrowDownTrayIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline'
import { CheckIcon as CheckSolidIcon, TrashIcon as TrashSolidIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Dealer {
  code: string
  name: string
  edition: string
  type: string
  sideMenuSet: string
  status: 'Active' | 'Inactive'
  creationTime: string
  expanded?: boolean
  subRows?: Array<{
    vehicle: string
    email: string
    isActive: 'Active' | 'Inactive'
  }>
}

const mockData: Dealer[] = [
  { code: 'A11AD50501', name: 'Pacific Auto Distributor', edition: 'DST', type: 'Standard', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.01.15', expanded: true, subRows: [
    { vehicle: 'A11AD50501', email: 'Pacific Auto Distributor', isActive: 'Active' },
    { vehicle: 'A11AD60601', email: 'Elite Drive Systems', isActive: 'Active' },
    { vehicle: 'A11AD50501', email: 'Pacific Auto Distributor', isActive: 'Active' },
    { vehicle: 'A11AD50501', email: 'Pacific Auto Distributor', isActive: 'Active' },
    { vehicle: 'A11AD50501', email: 'Pacific Auto Distributor', isActive: 'Active' },
    { vehicle: 'A11AD60601', email: 'Elite Drive Systems', isActive: 'Inactive' },
  ]},
  { code: 'A11AD50502', name: 'Seoul Motor Group', edition: 'DGP', type: 'Premium', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.03.20' },
  { code: 'A11AD60612', name: 'Green Energy Motors', edition: 'DLR', type: 'Standard', sideMenuSet: 'SSC', status: 'Inactive', creationTime: '2024.04.01' },
  { code: 'A11AD60603', name: 'Urban Mobility Hub', edition: 'DGP', type: 'Standard', sideMenuSet: 'SSC', status: 'Inactive', creationTime: '2024.05.10' },
  { code: 'A11AD70701', name: 'Metro Vehicle Agency', edition: 'DLR', type: 'Standard', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.06.05' },
  { code: 'A11AD50502', name: 'Seoul Motor Group', edition: 'DGP', type: 'Premium', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.08.30' },
  { code: 'A11AD70701', name: 'Metro Vehicle Agency', edition: 'DLR', type: 'Standard', sideMenuSet: 'SSC', status: 'Active', creationTime: '2024.11.05' },
  { code: 'A11AD50502', name: 'Seoul Motor Group', edition: 'DGP', type: 'Premium', sideMenuSet: 'SSC', status: 'Active', creationTime: '2025.12.18' },
  { code: 'A11AD60601', name: 'Elite Drive Systems', edition: 'DLR', type: 'Enterprise', sideMenuSet: 'Genesis', status: 'Active', creationTime: '2024.02.12' },
]

const typeColors: Record<string, { bg: string; text: string }> = {
  Standard: { bg: 'bg-[#e0e7ff]', text: 'text-[#71717a]' },
  Premium: { bg: 'bg-[#fce7f3]', text: 'text-[#71717a]' },
  Enterprise: { bg: 'bg-[#f3e8ff]', text: 'text-[#71717a]' },
  Basic: { bg: 'bg-[#fef3c7]', text: 'text-[#71717a]' },
}

export default function DealerTable() {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([0]))
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [dealerTypeFilters, setDealerTypeFilters] = useState<Set<string>>(new Set())
  const [sideMenuSetFilters, setSideMenuSetFilters] = useState<Set<string>>(new Set(['SSC']))
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set(['Active', 'Inactive']))
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(['Dealer Code', 'Name', 'Edition', 'Dealer Type', 'Side Menu Set', 'Active', 'Creation Time']))

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

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  const dealerTypeOptions = ['Select All', 'Standard', 'Premium', 'Enterprise', 'Basic']
  const sideMenuSetOptions = ['Select All', 'SSC', 'Genesis']
  const statusOptions = ['Select All', 'Active', 'Inactive']
  const columnOptions = ['Dealer Code', 'Name', 'Edition', 'Dealer Type', 'Side Menu Set', 'Active', 'Status', 'Creation Time']

  const handleFilterChange = (filterType: 'dealerType' | 'sideMenuSet' | 'status', value: string) => {
    if (value === 'Select All') {
      if (filterType === 'dealerType') {
        setDealerTypeFilters(new Set(dealerTypeOptions.slice(1)))
      } else if (filterType === 'sideMenuSet') {
        setSideMenuSetFilters(new Set(sideMenuSetOptions.slice(1)))
      } else {
        setStatusFilters(new Set(statusOptions.slice(1)))
      }
      return
    }

    if (filterType === 'dealerType') {
      const newFilters = new Set(dealerTypeFilters)
      if (newFilters.has(value)) {
        newFilters.delete(value)
      } else {
        newFilters.add(value)
      }
      setDealerTypeFilters(newFilters)
    } else if (filterType === 'sideMenuSet') {
      const newFilters = new Set(sideMenuSetFilters)
      if (newFilters.has(value)) {
        newFilters.delete(value)
      } else {
        newFilters.add(value)
      }
      setSideMenuSetFilters(newFilters)
    } else {
      const newFilters = new Set(statusFilters)
      if (newFilters.has(value)) {
        newFilters.delete(value)
      } else {
        newFilters.add(value)
      }
      setStatusFilters(newFilters)
    }
  }

  const handleColumnToggle = (column: string) => {
    const newColumns = new Set(visibleColumns)
    if (newColumns.has(column)) {
      newColumns.delete(column)
    } else {
      newColumns.add(column)
    }
    setVisibleColumns(newColumns)
  }

  const clearFilters = (filterType: 'dealerType' | 'sideMenuSet' | 'status') => {
    if (filterType === 'dealerType') {
      setDealerTypeFilters(new Set())
    } else if (filterType === 'sideMenuSet') {
      setSideMenuSetFilters(new Set())
    } else {
      setStatusFilters(new Set())
    }
  }

  // Close dropdown when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

  return (
    <div className="bg-white rounded-lg border border-[#e4e4e7]">
      {/* Heading */}
      <div className="px-6 pt-6 pb-0">
        <h2 className="text-base font-semibold leading-6 text-[#09090b]">Dealer List</h2>
      </div>

      {/* Table Setting: Search and Filters */}
      <div className="px-6 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          {/* Search Bar */}
          <div className="bg-white border border-[#e4e4e7] rounded-lg px-3 py-2 h-9 flex items-center justify-between w-[440px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <input
              type="text"
              placeholder="Search for dealer code, dealer name"
              className="flex-1 outline-none text-sm font-semibold text-[#a1a1aa] bg-transparent"
            />
            <div className="flex items-center gap-2">
              <button className="p-0.5">
                <MicrophoneIcon className="w-4 h-4 text-[#71717a]" />
              </button>
              <button className="p-0.5">
                <MagnifyingGlassIcon className="w-5 h-5 text-[#71717a]" />
              </button>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div ref={dropdownRef} className="flex items-center gap-3 relative">
            {/* Dealer Type Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'dealerType' ? null : 'dealerType')}
                className="px-3 py-1.5 rounded-lg border border-[#e4e4e7] flex items-center gap-4"
              >
                <span className="text-sm font-semibold text-[#09090b]">Dealer Type</span>
                <ChevronDownIcon className="w-4 h-4 text-[#09090b] opacity-50" />
              </button>
              {openDropdown === 'dealerType' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-[#d4d4d8] rounded-xl shadow-lg w-[160px] py-2 z-50">
                  {dealerTypeOptions.map((option) => {
                    const isChecked = option === 'Select All' 
                      ? dealerTypeFilters.size === dealerTypeOptions.length - 1
                      : dealerTypeFilters.has(option)
                    return (
                      <div key={option} className="flex gap-3 items-center px-4 py-1">
                        {option === 'Select All' ? (
                          <>
                            <button
                              onClick={() => handleFilterChange('dealerType', option)}
                              className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isChecked
                                  ? 'bg-[#18181b] border-[#27272a]'
                                  : 'bg-white border-[#d4d4d8]'
                              }`}
                            >
                              {isChecked && <CheckSolidIcon className="w-3 h-3 text-white" />}
                            </button>
                            <span className="text-sm font-semibold text-[#09090b]">{option}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-4"></div>
                            <button
                              onClick={() => handleFilterChange('dealerType', option)}
                              className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isChecked
                                  ? 'bg-[#18181b] border-[#27272a]'
                                  : 'bg-white border-[#d4d4d8]'
                              }`}
                            >
                              {isChecked && <CheckSolidIcon className="w-3 h-3 text-white" />}
                            </button>
                            <span className="text-sm font-semibold text-[#09090b]">{option}</span>
                          </>
                        )}
                      </div>
                    )
                  })}
                  <div className="border-t border-[#e4e4e7] flex items-center gap-3 px-4 py-2 mt-2">
                    <XMarkIcon className="w-4 h-4 text-[#ef4444]" />
                    <button
                      onClick={() => clearFilters('dealerType')}
                      className="text-sm font-medium text-[#ef4444] flex-1 text-left"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Side Menu Set Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'sideMenuSet' ? null : 'sideMenuSet')}
                className="px-3 py-1.5 rounded-lg border border-[#e4e4e7] flex items-center gap-4"
              >
                <span className="text-sm font-semibold text-[#09090b]">Side Menu Set</span>
                <ChevronDownIcon className="w-4 h-4 text-[#09090b] opacity-50" />
              </button>
              {openDropdown === 'sideMenuSet' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-[#d4d4d8] rounded-xl shadow-lg w-[160px] py-2 z-50">
                  {sideMenuSetOptions.map((option) => {
                    const isChecked = option === 'Select All'
                      ? sideMenuSetFilters.size === sideMenuSetOptions.length - 1
                      : sideMenuSetFilters.has(option)
                    return (
                      <div key={option} className="flex gap-3 items-center px-4 py-1">
                        {option === 'Select All' ? (
                          <>
                            <button
                              onClick={() => handleFilterChange('sideMenuSet', option)}
                              className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isChecked
                                  ? 'bg-[#18181b] border-[#27272a]'
                                  : 'bg-white border-[#d4d4d8]'
                              }`}
                            >
                              {isChecked && <CheckSolidIcon className="w-3 h-3 text-white" />}
                            </button>
                            <span className="text-sm font-semibold text-[#09090b]">{option}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-4"></div>
                            <button
                              onClick={() => handleFilterChange('sideMenuSet', option)}
                              className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isChecked
                                  ? 'bg-[#18181b] border-[#27272a]'
                                  : 'bg-white border-[#d4d4d8]'
                              }`}
                            >
                              {isChecked && <CheckSolidIcon className="w-3 h-3 text-white" />}
                            </button>
                            <span className="text-sm font-semibold text-[#09090b]">{option}</span>
                          </>
                        )}
                      </div>
                    )
                  })}
                  <div className="border-t border-[#e4e4e7] flex items-center gap-3 px-4 py-2 mt-2">
                    <XMarkIcon className="w-4 h-4 text-[#ef4444]" />
                    <button
                      onClick={() => clearFilters('sideMenuSet')}
                      className="text-sm font-medium text-[#ef4444] flex-1 text-left"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
                className="px-3 py-1.5 rounded-lg border border-[#e4e4e7] flex items-center gap-4"
              >
                <span className="text-sm font-semibold text-[#09090b]">Status</span>
                <ChevronDownIcon className="w-4 h-4 text-[#09090b] opacity-50" />
              </button>
              {openDropdown === 'status' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-[#d4d4d8] rounded-xl shadow-lg w-[160px] py-2 z-50">
                  {statusOptions.map((option) => {
                    const isChecked = option === 'Select All'
                      ? statusFilters.size === statusOptions.length - 1
                      : statusFilters.has(option)
                    return (
                      <div key={option} className="flex gap-3 items-center px-4 py-1">
                        {option === 'Select All' ? (
                          <>
                            <button
                              onClick={() => handleFilterChange('status', option)}
                              className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isChecked
                                  ? 'bg-[#18181b] border-[#27272a]'
                                  : 'bg-white border-[#d4d4d8]'
                              }`}
                            >
                              {isChecked && <CheckSolidIcon className="w-3 h-3 text-white" />}
                            </button>
                            <span className="text-sm font-semibold text-[#09090b]">{option}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-4"></div>
                            <button
                              onClick={() => handleFilterChange('status', option)}
                              className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isChecked
                                  ? 'bg-[#18181b] border-[#27272a]'
                                  : 'bg-white border-[#d4d4d8]'
                              }`}
                            >
                              {isChecked && <CheckSolidIcon className="w-3 h-3 text-white" />}
                            </button>
                            <span className="text-sm font-semibold text-[#09090b]">{option}</span>
                          </>
                        )}
                      </div>
                    )
                  })}
                  <div className="border-t border-[#e4e4e7] flex items-center gap-3 px-4 py-2 mt-2">
                    <XMarkIcon className="w-4 h-4 text-[#ef4444]" />
                    <button
                      onClick={() => clearFilters('status')}
                      className="text-sm font-medium text-[#ef4444] flex-1 text-left"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Date Range */}
            <div className="px-3 py-1.5 rounded-lg border border-[#e4e4e7]">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-[#09090b]">2026.01.15 - 2026.08.30</span>
                <ChevronDownIcon className="w-4 h-4 text-[#09090b] opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div ref={dropdownRef} className="flex items-center gap-3 relative">
          {/* Edit Columns Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'columns' ? null : 'columns')}
              className="bg-[#fafafa] border border-[#d4d4d8] rounded-lg px-3 py-2 flex items-center gap-3 hover:bg-gray-50"
            >
              <EyeSlashIcon className="w-4 h-4 text-[#09090b]" />
              <span className="text-sm font-semibold text-[#09090b]">Edit columns</span>
            </button>
            {openDropdown === 'columns' && (
              <div className="absolute top-full right-0 mt-2 bg-[#fafafa] border border-[#d4d4d8] rounded-xl shadow-lg w-[344px] py-2 z-50">
                <div className="px-4 py-1">
                  <p className="text-xs font-medium text-[#a1a1aa]">Edit columns</p>
                </div>
                {columnOptions.map((column) => {
                  const isChecked = visibleColumns.has(column)
                  return (
                    <div key={column} className="flex gap-3 items-center px-4 py-1">
                      <button
                        onClick={() => handleColumnToggle(column)}
                        className={`w-4 h-4 border rounded flex items-center justify-center ${
                          isChecked
                            ? 'bg-[#18181b] border-[#27272a]'
                            : 'bg-white border-[#d4d4d8]'
                        }`}
                      >
                        {isChecked && <CheckSolidIcon className="w-3 h-3 text-white" />}
                      </button>
                      <span className="text-sm font-semibold text-[#09090b]">{column}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <button className="bg-[#fafafa] border border-[#d4d4d8] rounded-lg px-3 py-2 flex items-center gap-3 hover:bg-gray-50">
            <ArrowDownTrayIcon className="w-4 h-4 text-[#09090b]" />
            <span className="text-sm font-semibold text-[#09090b]">Excel</span>
          </button>
        </div>
      </div>

      {/* Selected Rows Info */}
      {selectedRows.size > 0 && (
        <div className="px-6 py-0">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold leading-6 text-[#09090b]">{selectedRows.size}</span>
              <span className="text-base font-semibold leading-6 text-[#09090b]">Selected</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-white flex items-center gap-1 px-2 py-1 rounded-md">
                <CheckSolidIcon className="w-4 h-4 text-[#b91c1c]" />
                <span className="text-xs font-semibold leading-4 text-[#b91c1c]">Confirm selected</span>
              </button>
              <button className="bg-white flex items-center gap-1 px-2 py-1 rounded-md">
                <TrashSolidIcon className="w-4 h-4 text-[#b91c1c]" />
                <span className="text-xs font-semibold leading-4 text-[#b91c1c]">Delete selected</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#d4d4d8]">
              <th className="w-12 px-4 py-2.5"></th>
              <th className="px-4 py-2.5">
                <button
                  onClick={toggleAll}
                  className={`w-4 h-4 border rounded flex items-center justify-center ${
                    selectedRows.size === mockData.length
                      ? 'bg-[#18181b] border-[#27272a]'
                      : 'bg-white border-[#d4d4d8]'
                  }`}
                >
                  {selectedRows.size === mockData.length && (
                    <CheckSolidIcon className="w-3 h-3 text-white" />
                  )}
                </button>
              </th>
              <th className="px-6 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#71717a]">Dealer Code</span>
                  <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
                </div>
              </th>
              <th className="px-6 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#71717a]">Name</span>
                  <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
                </div>
              </th>
              <th className="px-6 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#71717a]">Edition</span>
                  <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
                </div>
              </th>
              <th className="px-6 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#71717a]">Dealer Type</span>
                  <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
                </div>
              </th>
              <th className="px-6 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#71717a]">Side Menu Set</span>
                  <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
                </div>
              </th>
              <th className="px-6 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#71717a]">Active</span>
                  <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
                </div>
              </th>
              <th className="px-6 py-2.5">
                <span className="text-sm font-semibold text-[#71717a]">Creation Time</span>
              </th>
              <th className="px-4 py-2.5 w-[68px]">
                <span className="text-sm font-semibold text-[#71717a]"> </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((dealer, index) => {
              const isEven = index % 2 === 0
              const isExpanded = expandedRows.has(index)
              const typeColor = typeColors[dealer.type] || { bg: 'bg-gray-100', text: 'text-[#71717a]' }
              const statusBg = dealer.status === 'Active' ? 'bg-[#dcfce7]' : 'bg-[#e4e4e7]'
              const isSelected = selectedRows.has(index)

              return (
                <>
                  <tr
                    key={index}
                    className={`border-b border-[#e4e4e7] ${isEven ? 'bg-white' : 'bg-[#fafafa]'} ${isExpanded ? 'bg-[#f0fdfa] border-l-4 border-[#0f766e]' : ''}`}
                  >
                    {/* Expand/Collapse Icon */}
                    <td className="w-12 px-0 py-0">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex items-center justify-center h-14 w-12"
                      >
                        {isExpanded ? (
                          <ChevronDownIcon className="w-5 h-5 text-[#09090b]" />
                        ) : (
                          <ChevronRightIcon className="w-5 h-5 text-[#09090b]" />
                        )}
                      </button>
                    </td>
                    {/* Checkbox */}
                    <td className="px-4 py-2.5">
                      <button
                        onClick={() => toggleRow(index)}
                        className={`w-4 h-4 border rounded flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#18181b] border-[#27272a]'
                            : 'bg-white border-[#d4d4d8]'
                        }`}
                      >
                        {isSelected && (
                          <CheckSolidIcon className="w-3 h-3 text-white" />
                        )}
                      </button>
                    </td>
                  {/* Dealer Code */}
                  <td className="px-6 py-4 w-[200px]">
                    <p className="text-sm font-semibold text-[#09090b] truncate">{dealer.code}</p>
                  </td>
                  {/* Name */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#09090b] truncate">{dealer.name}</p>
                  </td>
                  {/* Edition */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#09090b] truncate">{dealer.edition}</p>
                  </td>
                  {/* Dealer Type */}
                  <td className="px-6 py-4 w-[160px]">
                    <div className={`${typeColor.bg} ${typeColor.text} px-1.5 py-1 rounded-md inline-block`}>
                      <span className="text-xs font-medium">{dealer.type}</span>
                    </div>
                  </td>
                  {/* Side Menu Set */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#09090b] truncate">{dealer.sideMenuSet}</p>
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4 w-[160px]">
                    <div className={`${statusBg} text-[#71717a] px-1.5 py-1 rounded-md inline-block`}>
                      <span className="text-xs font-medium">{dealer.status}</span>
                    </div>
                  </td>
                  {/* Creation Time */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#09090b] truncate">{dealer.creationTime}</p>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-2.5 w-[68px]">
                    <button className="p-2.5 rounded-lg hover:bg-gray-100">
                      <EllipsisHorizontalIcon className="w-4 h-4 text-[#71717a]" />
                    </button>
                  </td>
                </tr>
                {/* Expanded Sub-rows */}
                {isExpanded && dealer.subRows && (
                  <tr key={`${index}-expanded`} className="bg-[#f0fdfa] border-l-4 border-[#0f766e]">
                    <td colSpan={9} className="pl-20 pr-12 py-4">
                      <div className="flex flex-col gap-0">
                        {/* Sub-table Header */}
                        <div className="flex items-center border-b border-[#d4d4d8]">
                          <div className="w-12 px-4 py-2.5"></div>
                          <div className="px-4 py-2.5">
                            <button
                              onClick={() => {
                                // Select all sub-rows
                              }}
                              className="w-4 h-4 border border-[#d4d4d8] rounded bg-white flex items-center justify-center"
                            >
                            </button>
                          </div>
                          <div className="flex-1 px-6 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#71717a]">Vehicle</span>
                              <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
                            </div>
                          </div>
                          <div className="flex-1 px-6 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#71717a]">Email</span>
                              <ChevronUpDownIcon className="w-5 h-5 text-[#71717a]" />
                            </div>
                          </div>
                          <div className="w-[160px] px-6 py-2.5">
                            <span className="text-sm font-semibold text-[#71717a]">IsActive</span>
                          </div>
                        </div>
                        {/* Sub-table Rows */}
                        {dealer.subRows.map((subRow, subIndex) => (
                          <div key={subIndex} className="flex items-center border-b border-[#e4e4e7] min-h-[56px]">
                            <div className="w-12 px-4 py-2.5"></div>
                            <div className="px-4 py-2.5">
                              <button
                                className="w-4 h-4 border border-[#d4d4d8] rounded bg-white flex items-center justify-center"
                              >
                              </button>
                            </div>
                            <div className="flex-1 px-6 py-4">
                              <p className="text-sm font-semibold text-[#09090b] truncate">{subRow.vehicle}</p>
                            </div>
                            <div className="flex-1 px-6 py-4">
                              <p className="text-sm font-semibold text-[#09090b] truncate">{subRow.email}</p>
                            </div>
                            <div className="w-[160px] px-6 py-4">
                              <div className={`${subRow.isActive === 'Active' ? 'bg-[#dcfce7]' : 'bg-[#e4e4e7]'} text-[#71717a] px-1.5 py-1 rounded-md inline-block`}>
                                <span className="text-xs font-medium">{subRow.isActive}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Page View Control: Row Count and Pagination */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-[#e4e4e7]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#09090b]">Row count:</span>
          <div className="px-3 py-2 border border-[#d4d4d8] rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#09090b]">10</span>
              <ChevronDownIcon className="w-4 h-4 text-[#09090b] opacity-50" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-[#d4d4d8] rounded-lg hover:bg-gray-50">
            <ChevronLeftIcon className="w-4 h-4 text-[#09090b]" />
          </button>
          <button className="px-3 py-2 bg-[#09090b] text-white rounded-lg text-sm font-medium">1</button>
          <button className="px-3 py-2 border border-[#d4d4d8] rounded-lg text-sm font-medium text-[#09090b] hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border border-[#d4d4d8] rounded-lg text-sm font-medium text-[#09090b] hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 border border-[#d4d4d8] rounded-lg text-sm font-medium text-[#09090b] hover:bg-gray-50">
            4
          </button>
          <button className="px-3 py-2 border border-[#d4d4d8] rounded-lg text-sm font-medium text-[#09090b] hover:bg-gray-50">
            5
          </button>
          <button className="p-2 border border-[#d4d4d8] rounded-lg hover:bg-gray-50">
            <ChevronRightIcon className="w-4 h-4 text-[#09090b]" />
          </button>
        </div>
      </div>
    </div>
  )
}
