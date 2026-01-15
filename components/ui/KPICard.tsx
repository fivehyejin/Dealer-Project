// [2024-01-26]
// KPICard 컴포넌트 업데이트
// 피그마 디자인에 맞게 value/unit 분리, 배지 스타일 정확히 반영
'use client'

import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'

interface KPICardProps {
  title: string
  value: string
  unit: string
  change: string
  isPositive: boolean
}

export default function KPICard({ title, value, unit, change, isPositive }: KPICardProps) {
  // change 문자열 파싱 (예: "+2 /vs last mo" -> ["+2", "/vs last mo"])
  const changeParts = change.split(' ')
  const changeValue = changeParts[0]
  const changeText = changeParts.slice(1).join(' ')

  const bgColor = isPositive
    ? 'bg-[#dcfce7]'
    : changeValue.startsWith('-')
    ? 'bg-[#ffe4e6]'
    : 'bg-[#fee2e2]'
  const textColor = isPositive
    ? 'text-[#15803d]'
    : changeValue.startsWith('-')
    ? 'text-[#be123c]'
    : 'text-[#b91c1c]'

  return (
    <div className="bg-white border border-[#d4d4d8] rounded-lg p-6 flex-1 shadow-[0px_0.45px_0.9px_0px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-3">
        {/* Title */}
        <p className="text-base font-semibold leading-6 text-[#09090b]">{title}</p>

        {/* Value and Change Badge */}
        <div className="flex items-end gap-4 h-10">
          {/* Value with Unit */}
          <div className="flex items-end gap-1">
            <span className="text-[30px] font-semibold leading-[36px] tracking-[-0.75px] text-[#09090b]">
              {value}
            </span>
            <span className="text-xl font-normal leading-[28px] tracking-[-0.5px] text-[#09090b]">
              {unit}
            </span>
          </div>

          {/* Change Badge */}
          <div className={`${bgColor} flex items-center rounded-md`}>
            {/* Arrow Icon */}
            <div className="pl-1.5 pr-0 py-0 flex items-center">
              {isPositive ? (
                <ArrowTrendingUpIcon className="w-3 h-3 text-current" />
              ) : (
                <div className="scale-y-[-1]">
                  <ArrowTrendingDownIcon className="w-3 h-3 text-current" />
                </div>
              )}
            </div>
            {/* Change Value */}
            <div className={`${bgColor} px-1.5 py-1 flex items-center`}>
              <span className={`text-xs font-medium leading-4 text-center ${textColor}`}>
                {changeValue}
              </span>
            </div>
            {/* Change Text */}
            {changeText && (
              <div className={`${bgColor} pl-0 pr-1.5 py-1 flex items-center`}>
                <span className={`text-[10px] font-medium leading-4 text-center ${textColor}`}>
                  {changeText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
