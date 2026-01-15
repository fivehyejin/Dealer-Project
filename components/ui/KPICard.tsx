'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
}

export default function KPICard({ title, value, change, isPositive }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
      <div className="text-sm text-gray-600 mb-2">{title}</div>
      <div className="flex items-baseline justify-between">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
    </div>
  )
}
