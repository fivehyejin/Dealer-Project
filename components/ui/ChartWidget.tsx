'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

interface ChartWidgetProps {
  title: string
  tabs: string[]
  type: 'line' | 'pie' | 'bar'
  data?: any[]
}

export default function ChartWidget({ title, tabs, type, data }: ChartWidgetProps) {
  const [activeTab, setActiveTab] = useState(tabs[tabs.length - 1] || tabs[0])

  const pieData = [
    { name: 'Active', value: 84 },
    { name: 'Inactive', value: 16 },
  ]

  const barData = [
    { name: 'Standard', value: 120 },
    { name: 'Premium', value: 80 },
    { name: 'Enterprise', value: 50 },
    { name: 'Basic', value: 30 },
  ]

  const lineData = [
    { year: '2016', value: 120 },
    { year: '2017', value: 140 },
    { year: '2018', value: 160 },
    { year: '2019', value: 180 },
    { year: '2020', value: 140 },
    { year: '2021', value: 150 },
    { year: '2022', value: 165 },
    { year: '2023', value: 175 },
  ]

  const COLORS = ['#14b8a6', '#f3f4f6']

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="h-[200px]">
        {type === 'line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {type === 'pie' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                84%
              </text>
            </PieChart>
          </ResponsiveContainer>
        )}

        {type === 'bar' && (
          <div className="space-y-4">
            {barData.map((item, index) => (
              <div key={item.name} className="relative">
                <div
                  className="h-8 rounded flex items-center justify-between px-3 text-white text-sm"
                  style={{
                    width: `${(item.value / 120) * 100}%`,
                    backgroundColor: index === 0 ? '#14b8a6' : index === 1 ? '#10b981' : index === 2 ? '#84cc16' : '#eab308',
                  }}
                >
                  <span className="font-medium">{item.name}</span>
                  <span>{item.value}k</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
