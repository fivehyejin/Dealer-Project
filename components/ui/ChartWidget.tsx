// [2024-01-26]
// ChartWidget 컴포넌트 업데이트
// 피그마 디자인에 맞게 탭 스타일, 그래프 구현 정확히 반영
'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts'

interface ChartWidgetProps {
  title: string
  tabs: string[]
  type: 'line' | 'pie' | 'bar'
  data?: any[]
}

export default function ChartWidget({ title, tabs, type }: ChartWidgetProps) {
  const [activeTab, setActiveTab] = useState(tabs[0] || 'Daily')

  const pieData = [
    { name: 'Active', value: 84 },
    { name: 'Inactive', value: 16 },
  ]

  const barData = [
    { name: 'Standard', value: 120, width: 318 },
    { name: 'Premium', value: 80, width: 229 },
    { name: 'Enterprise', value: 50, width: 177 },
    { name: 'Basic', value: 30, width: 126 },
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

  const COLORS = ['#14b8a6', '#ccfbf1']

  return (
    <div className="bg-white border border-[#d4d4d8] rounded-lg px-6 py-6 flex flex-col gap-4">
      {/* Heading */}
      <h3 className="text-base font-semibold leading-6 text-[#09090b]">{title}</h3>

      {/* Tabs */}
      <div className="border-b border-[#e4e4e7] flex gap-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab
          return (
            <div key={tab} className="flex flex-col items-center relative shrink-0">
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 relative shrink-0 ${
                  isActive
                    ? 'border-b-2 border-[#09090b]'
                    : ''
                }`}
              >
                <span
                  className={`text-sm font-semibold leading-5 whitespace-pre ${
                    isActive ? 'text-[#09090b]' : 'text-[#71717a]'
                  }`}
                >
                  {tab}
                </span>
              </button>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="flex-1">
        {type === 'line' && (
          <div className="h-[160px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={lineData}
                margin={{ top: 0, right: 0, left: 43, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#f1f1f2" vertical={false} />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'Inter', fontWeight: 500, letterSpacing: '-0.3px' }}
                  tickMargin={16}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'Inter', fontWeight: 500, letterSpacing: '-0.3px' }}
                  domain={[0, 200]}
                  ticks={[0, 50, 100, 150, 200]}
                  width={27}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                    padding: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  fill="url(#colorArea)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {type === 'pie' && (
          <div className="flex items-center justify-center h-[176px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {/* Background arc (full semicircle) */}
                <Pie
                  data={[{ name: 'total', value: 100 }]}
                  cx="50%"
                  cy="100%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  fill="#ccfbf1"
                />
                {/* Active arc (84%) */}
                <Pie
                  data={[{ name: 'Active', value: 84 }, { name: 'Inactive', value: 16 }]}
                  cx="50%"
                  cy="100%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={180}
                  endAngle={180 - (84 * 180) / 100}
                >
                  <Cell fill="#14b8a6" />
                  <Cell fill="transparent" />
                </Pie>
                {/* 84% Text */}
                <text
                  x="50%"
                  y="calc(100% - 51px)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[30px] font-semibold leading-[36px] tracking-[-0.75px] text-[#09090b]"
                >
                  84%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {type === 'bar' && (
          <div className="space-y-2">
            {barData.map((item) => (
              <div key={item.name} className="relative h-8">
                <div
                  className="h-8 rounded px-2 py-1.5 flex items-center relative"
                  style={{
                    width: `${item.width}px`,
                    background: 'linear-gradient(to right, #14b8a6 2.574%, #f0fdfa 112.5%)',
                  }}
                >
                  <span className="text-sm font-medium leading-5 text-[#131313]">
                    {item.name}
                  </span>
                  <span className="text-xs font-medium leading-4 text-[#131313] absolute right-2 top-1/2 -translate-y-1/2">
                    {item.value}k
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
