// [2024-01-26]
// 브레드크럼 컴포넌트 생성
// 모든 페이지에 공통으로 사용되는 네비게이션 경로 표시
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname()

  // items가 제공되지 않으면 pathname 기반으로 자동 생성
  const breadcrumbItems: BreadcrumbItem[] = items || generateBreadcrumbsFromPath(pathname)

  return (
    <nav className="mb-4">
      <ol className="flex items-center gap-2 text-sm text-[#71717a]">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRightIcon className="w-4 h-4 text-[#a1a1aa]" />
              )}
              {isLast || !item.href ? (
                <span className={isLast ? 'text-[#09090b] font-medium' : ''}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#09090b] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// pathname으로부터 브레드크럼 아이템 자동 생성
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/pages/dashboard' },
  ]

  if (pathname === '/' || pathname === '/pages/dashboard') {
    return items
  }

  const segments = pathname.split('/').filter(Boolean)
  let currentPath = ''

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1

    // 경로를 읽기 쉬운 라벨로 변환
    const label = formatSegmentLabel(segment)

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    })
  })

  return items
}

// URL 세그먼트를 읽기 쉬운 라벨로 변환
function formatSegmentLabel(segment: string): string {
  // 하이픈을 공백으로, 첫 글자를 대문자로
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
