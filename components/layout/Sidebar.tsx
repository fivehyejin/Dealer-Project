'use client'

import { ChevronRight, Star, Home } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['smart-test-drive'])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  return (
    <aside className="fixed left-0 top-[60px] bottom-0 w-[292px] bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* Favorites */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Favorites</div>
          <div className="space-y-1">
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Roles</div>
            <div className="px-3 py-2 text-sm font-semibold text-gray-900 bg-green-50 rounded cursor-pointer flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded"></div>
              Dealers
            </div>
          </div>
        </div>

        {/* Admin Menu */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Admin</div>
          <div className="space-y-1">
            {/* Smart Test Drive - Expanded */}
            <div>
              <div
                className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('smart-test-drive')}
              >
                <span>Smart Test Drive</span>
                <ChevronRight className={`w-4 h-4 transform transition-transform ${expandedSections.includes('smart-test-drive') ? 'rotate-90' : ''}`} />
              </div>
              {expandedSections.includes('smart-test-drive') && (
                <div className="ml-4 mt-1 space-y-1">
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Test Drive Documents</div>
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Test Drive Records</div>
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Real-Time Monitoring</div>
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Test Drive</div>
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">KPI Reports</div>
                </div>
              )}
            </div>

            {/* Other menu items */}
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
              <span>Dealers</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
              <span>Dealers for Distributor</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
              <span>Dealers for Dealer Groups</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
              <span>Editions</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
              <span>Organization Groups</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
              <span>App Download</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
              <span>Administration</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom icon */}
      <div className="absolute bottom-4 left-4">
        <Home className="w-5 h-5 text-gray-400" />
      </div>
    </aside>
  )
}
