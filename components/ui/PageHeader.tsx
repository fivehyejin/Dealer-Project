// [2024-01-26]
// PageHeader 컴포넌트 업데이트
// 피그마 디자인에 맞게 브레드크럼, 제목, 즐겨찾기 버튼, Create dealer 버튼 구현
'use client'

import { HomeIcon, ChevronRightIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { PlusIcon } from '@heroicons/react/24/outline'
import Breadcrumb from './Breadcrumb'
import { useState } from 'react'

interface PageHeaderProps {
  title: string
  showFavorite?: boolean
  favoriteAction?: boolean
  createButtonLabel?: string
  onCreateClick?: () => void
}

export default function PageHeader({
  title,
  showFavorite = true,
  favoriteAction = false,
  createButtonLabel = 'Create dealer',
  onCreateClick,
}: PageHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(favoriteAction)

  return (
    <div className="flex items-start justify-between mb-8">
      {/* Left: Breadcrumb and Title */}
      <div className="flex flex-col gap-4">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Title with Favorite Button */}
        <div className="flex items-center gap-2">
          <h1 className="text-[30px] font-semibold leading-[36px] tracking-[-0.75px] text-[#09090b]">
            {title}
          </h1>
          {showFavorite && (
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-[#fafafa] border border-[#d4d4d8] rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              {isFavorite ? (
                <BookmarkSolidIcon className="w-4 h-4 text-[#0f766e]" />
              ) : (
                <BookmarkIcon className="w-4 h-4 text-[#71717a]" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Right: Create Button */}
      <button
        onClick={onCreateClick}
        className="bg-[#18181b] border border-[#3f3f46] rounded-lg px-3 py-2 flex items-center gap-1 hover:bg-[#27272a] transition-colors"
      >
        <PlusIcon className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold leading-5 text-white">{createButtonLabel}</span>
      </button>
    </div>
  )
}
