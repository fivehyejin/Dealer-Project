// [2024-01-26]
// 피그마 디자인 기반 사이드바 재구현
// 즐겨찾기 기능 추가 (bookmark 클릭 시 Favorites Menu로 이동, 해제 기능)
// 1depth, 2depth, 3depth 구조 정확히 반영
// 접은 상태(collapsed) 구현
// localStorage를 통한 즐겨찾기 영구 저장
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  Squares2X2Icon,
  RectangleStackIcon,
  CloudArrowDownIcon,
  HomeIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'

interface MenuItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  path?: string
  children?: MenuItem[]
  isActive?: boolean
  isExpanded?: boolean
  hasBookmark?: boolean
}

interface FavoriteItem {
  id: string
  label: string
  path?: string
}

export default function Sidebar() {
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<string[]>(['smart-test-drive', 'smart-test-drive-nested'])
  const [activeItem, setActiveItem] = useState<string>('smart-test-drive-nested-inner')
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  // localStorage에서 favorites 로드
  useEffect(() => {
    const savedFavorites = localStorage.getItem('sidebar-favorites')
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        // path를 안전하게 기본값으로 설정
        const safeFavorites = parsed.map((fav: FavoriteItem) => ({
          ...fav,
          path: fav.path || '/pages/dashboard',
        }))
        setFavorites(safeFavorites)
      } catch {
        // 초기값 설정 (실제 페이지가 없으므로 기본 페이지로 설정)
        setFavorites([
          { id: 'roles', label: 'Roles', path: '/pages/dashboard' },
          { id: 'dealers-fav', label: 'Dealers', path: '/pages/dealers' },
        ])
      }
    } else {
      // 초기값 설정
      setFavorites([
        { id: 'roles', label: 'Roles', path: '/pages/dashboard' },
        { id: 'dealers-fav', label: 'Dealers', path: '/pages/dealers' },
      ])
    }
  }, [])

  // favorites 변경 시 localStorage에 저장
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('sidebar-favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  // 즐겨찾기 추가
  const addToFavorites = (item: MenuItem) => {
    if (!favorites.find((fav) => fav.id === item.id)) {
      setFavorites((prev) => [...prev, { id: item.id, label: item.label, path: item.path || '/pages/dashboard' }])
    }
  }

  // 즐겨찾기 제거
  const removeFromFavorites = (itemId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== itemId))
    // 메뉴 아이템의 hasBookmark도 제거
    updateMenuItemBookmark(itemId, false)
  }

  // 메뉴 아이템의 bookmark 상태 업데이트 (재귀적으로 찾아서 업데이트)
  const updateMenuItemBookmark = (itemId: string, hasBookmark: boolean) => {
    const updateItem = (items: MenuItem[]): MenuItem[] => {
      return items.map((item) => {
        if (item.id === itemId) {
          return { ...item, hasBookmark }
        }
        if (item.children) {
          return { ...item, children: updateItem(item.children) }
        }
        return item
      })
    }
    // 실제로는 메뉴 데이터를 재구성해야 하지만, 여기서는 렌더링 시 동적으로 처리
  }

  // 즐겨찾기 클릭 핸들러
  const handleBookmarkClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation()
    if (favorites.find((fav) => fav.id === item.id)) {
      removeFromFavorites(item.id)
    } else {
      addToFavorites(item)
    }
  }

  // Favorites Menu 항목 클릭 핸들러
  const handleFavoriteClick = (item: FavoriteItem) => {
    const targetPath = item.path || '/pages/dashboard'
    router.push(targetPath)
    setActiveItem(item.id)
  }

  // Favorites Menu bookmark 클릭 핸들러
  const handleFavoriteBookmarkClick = (e: React.MouseEvent, item: FavoriteItem) => {
    e.stopPropagation()
    removeFromFavorites(item.id)
  }

  const adminMenu: MenuItem[] = [
    {
      id: 'smart-test-drive',
      label: 'Smart Test Drive',
      icon: TruckIcon,
      path: '/',
      isExpanded: expandedItems.includes('smart-test-drive'),
      isActive: expandedItems.includes('smart-test-drive'),
      children: [
        {
          id: 'smart-test-drive-nested',
          label: 'Smart Test Drive',
          path: '/',
          isExpanded: expandedItems.includes('smart-test-drive-nested'),
          isActive: activeItem === 'smart-test-drive-nested-inner',
          children: [
            {
              id: 'smart-test-drive-nested-inner',
              label: 'Smart Test Drive',
              path: '/',
              isActive: true,
              hasBookmark: favorites.find((fav) => fav.id === 'smart-test-drive-nested-inner') !== undefined,
            },
            {
              id: 'test-drive-documents',
              label: 'Test drive documents',
              path: '/',
              hasBookmark: favorites.find((fav) => fav.id === 'test-drive-documents') !== undefined,
            },
            {
              id: 'test-drive-records',
              label: 'Test Drive Records',
              path: '/',
              hasBookmark: favorites.find((fav) => fav.id === 'test-drive-records') !== undefined,
            },
          ],
        },
        {
          id: 'real-time-monitoring',
          label: 'Real-Time Monitoring',
          path: '/',
          isExpanded: expandedItems.includes('real-time-monitoring'),
        },
        {
          id: 'test-drive',
          label: 'Test Drive',
          path: '/',
          isExpanded: expandedItems.includes('test-drive'),
        },
        {
          id: 'kpi-reports',
          label: 'KPI Reports',
          path: '/',
          isExpanded: expandedItems.includes('kpi-reports'),
        },
        {
          id: 'vehicle-code-manage',
          label: 'Vehicle Code Manage',
          path: '/',
          isExpanded: expandedItems.includes('vehicle-code-manage'),
        },
        {
          id: 'survey-form',
          label: 'Survey Form',
          path: '/',
          isExpanded: expandedItems.includes('survey-form'),
        },
      ],
    },
      {
        id: 'dealers',
        label: 'Dealers',
        icon: BuildingOfficeIcon,
        path: '/pages/dealers',
        isExpanded: expandedItems.includes('dealers'),
      },
      {
        id: 'dealers-distributor',
        label: 'Dealers for distributor',
        icon: BuildingOffice2Icon,
        path: '/pages/dealers-for-distributor',
        isExpanded: expandedItems.includes('dealers-distributor'),
      },
    {
      id: 'dealers-groups',
      label: 'Dealers for Dealer Groups',
      icon: UserGroupIcon,
      path: '/',
      isExpanded: expandedItems.includes('dealers-groups'),
    },
    {
      id: 'editions',
      label: 'Editions',
      icon: Squares2X2Icon,
      path: '/',
      isExpanded: expandedItems.includes('editions'),
    },
    {
      id: 'organization-groups',
      label: 'Organization Groups',
      icon: RectangleStackIcon,
      path: '/',
      isExpanded: expandedItems.includes('organization-groups'),
    },
    {
      id: 'app-download',
      label: 'App Download',
      icon: CloudArrowDownIcon,
      path: '/',
      isExpanded: expandedItems.includes('app-download'),
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: TruckIcon,
      path: '/',
      isExpanded: expandedItems.includes('administration'),
      children: [
        {
          id: 'vehicle-detail-chip',
          label: 'Vehicle Detail Chip Master',
          path: '/',
          isExpanded: expandedItems.includes('vehicle-detail-chip'),
        },
        {
          id: 'chip-assignment',
          label: 'Chip Assignment Rules',
          path: '/',
          isExpanded: expandedItems.includes('chip-assignment'),
        },
        {
          id: 'organization-units',
          label: 'Organization Units',
          path: '/',
          isExpanded: expandedItems.includes('organization-units'),
        },
        {
          id: 'roles-admin',
          label: 'Roles',
          path: '/',
          isExpanded: expandedItems.includes('roles-admin'),
        },
        {
          id: 'users',
          label: 'Users',
          path: '/',
          isExpanded: expandedItems.includes('users'),
        },
        {
          id: 'languages',
          label: 'Languages',
          path: '/',
          isExpanded: expandedItems.includes('languages'),
        },
        {
          id: 'audit-logs',
          label: 'Audit Logs',
          path: '/',
          isExpanded: expandedItems.includes('audit-logs'),
        },
        {
          id: 'maintenance',
          label: 'Maintenance',
          path: '/',
          isExpanded: expandedItems.includes('maintenance'),
        },
        {
          id: 'config-setting',
          label: 'Configuration Setting',
          path: '/',
          isExpanded: expandedItems.includes('config-setting'),
        },
        {
          id: 'app-version',
          label: 'App Version',
          path: '/',
          isExpanded: expandedItems.includes('app-version'),
        },
        {
          id: 'patch-system',
          label: 'Patch System',
          path: '/',
          isExpanded: expandedItems.includes('patch-system'),
        },
        {
          id: 'system-code',
          label: 'System Code',
          path: '/',
          isExpanded: expandedItems.includes('system-code'),
        },
        {
          id: 'app-settings',
          label: 'Application Settings',
          path: '/',
          isExpanded: expandedItems.includes('app-settings'),
        },
        {
          id: 'system-settings',
          label: 'System Settings',
          path: '/',
          isExpanded: expandedItems.includes('system-settings'),
        },
      ],
    },
  ]

  const renderMenuItem = (item: MenuItem, depth: number = 0, isLastChild: boolean = false) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = item.isExpanded || expandedItems.includes(item.id)
    const isActive = item.isActive || activeItem === item.id
    const IconComponent = item.icon
    const isFavorite = favorites.find((fav) => fav.id === item.id) !== undefined
    const hasBookmark = item.hasBookmark || isFavorite

    // Active 상태 색상 (teal)
    const activeBgColor = isActive && depth === 0 ? 'bg-[#e4e4e7]' : ''
    const activeTextColor = isActive ? 'text-[#0f766e]' : 'text-[#09090b]'

    return (
      <div key={item.id} className="relative">
        {/* 메뉴 아이템 */}
        <div
          className={`flex items-center gap-[10px] px-[10px] py-[4px] rounded-[6px] ${activeBgColor} ${
            depth > 0 ? 'justify-between' : ''
          } cursor-pointer hover:bg-gray-100`}
            onClick={() => {
              if (hasChildren) {
                toggleExpand(item.id)
              } else {
              setActiveItem(item.id)
              const targetPath = item.path || '/'
              router.push(targetPath)
            }
          }}
        >
          {/* 1depth (depth=0): 아이콘 영역 (40px 너비) */}
          {depth === 0 && IconComponent && (
            <div className="w-[40px] h-[20px] flex-shrink-0 flex items-center justify-center">
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#0f766e]' : 'text-[#71717a]'}`} />
            </div>
          )}

          {/* 2depth (depth=1): Line 컴포넌트 (28px 너비, 세로선 포함) */}
          {depth === 1 && (
            <div className="h-[20px] relative shrink-0 w-[28px]">
              {/* 세로선 - 항상 표시 (피그마의 Line 컴포넌트 구조) */}
              <div className="absolute inset-[-60%_0_-55%_0]">
                <div className="absolute left-[14px] top-0 bottom-0 w-[1px] bg-[#d4d4d8]" />
              </div>
            </div>
          )}

          {/* 3depth (depth=2): Line 컴포넌트 (28px) + Depth2 공간 (16px) */}
          {depth === 2 && (
            <div className="flex items-center gap-0 relative">
              {/* Line 컴포넌트 (28px 너비, 세로선 포함) */}
              <div className="h-[20px] relative shrink-0 w-[28px]">
                {/* 세로선 - 항상 표시 */}
                <div className="absolute inset-[-60%_0_-55%_0]">
                  <div className="absolute left-[14px] top-0 bottom-0 w-[1px] bg-[#d4d4d8]" />
                </div>
              </div>
              {/* Depth2 추가 공간 (16px) */}
              <div className="h-full shrink-0 w-[16px]" />
              {/* 위치 표시 (작은 녹색 점) - depth 2의 첫 번째 항목에만 */}
              {item.id === 'smart-test-drive-nested-inner' && (
                <div className="absolute left-[50px] top-[9px] w-[10px] h-[10px]">
                  <div className="w-1.5 h-1.5 bg-[#0f766e] rounded-full" />
                </div>
              )}
            </div>
          )}

          {/* 텍스트 */}
          <div className={`flex-1 text-[14px] font-medium leading-[20px] ${activeTextColor} truncate`}>
            {item.label}
          </div>

          {/* Bookmark 아이콘 (2depth, 3depth에 항상 표시) */}
          {depth > 0 && (
            <button
              onClick={(e) => handleBookmarkClick(e, item)}
              className="w-4 h-4 flex-shrink-0 hover:opacity-80"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <BookmarkSolidIcon className="w-4 h-4 text-[#0f766e]" />
              ) : (
                <BookmarkIcon className="w-4 h-4 text-[#a1a1aa]" />
              )}
            </button>
          )}

          {/* Chevron 아이콘 */}
          {hasChildren && (
            <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
              {isExpanded ? (
                <ChevronUpIcon className={`w-4 h-4 ${isActive ? 'text-[#09090b]' : 'text-[#71717a]'}`} />
              ) : (
                <ChevronDownIcon className={`w-4 h-4 rotate-180 ${isActive ? 'text-[#09090b]' : 'text-[#71717a]'}`} />
              )}
            </div>
          )}

          {/* Active 상태 연결선 (왼쪽, 1depth에만) */}
          {isActive && depth === 0 && hasChildren && (
            <div className="absolute left-[17px] top-[28px] w-0 h-[43px] flex items-center pointer-events-none">
              <div className="w-[1px] h-full bg-[#d4d4d8]" />
            </div>
          )}
        </div>

        {/* 하위 메뉴 */}
        {hasChildren && isExpanded && (
          <div className="relative">
            {/* 연결선 (왼쪽, 1depth의 자식들에 대해) */}
            {isActive && depth === 0 && (
              <div className="absolute left-[17px] top-0 bottom-0 w-0 flex items-start pointer-events-none">
                <div className="w-[1px] h-full bg-[#0f766e] mt-[28px]" />
              </div>
            )}
            <div className="space-y-0">
              {item.children?.map((child, index) => (
                <div key={child.id} className="relative">
                  {renderMenuItem(child, depth + 1, index === (item.children?.length || 0) - 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // 접은 상태 렌더링
  if (isCollapsed) {
    return (
      <aside className="fixed left-0 top-[60px] bottom-0 w-[72px] bg-[#fafafa] border-r border-[#d4d4d8] overflow-y-auto flex flex-col items-center py-5 gap-[10px]">
        {adminMenu.map((item) => {
          const IconComponent = item.icon
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id)
                const targetPath = item.path || '/'
                router.push(targetPath)
              }}
              className={`w-[40px] h-[40px] flex items-center justify-center rounded-[8px] ${
                isActive ? 'bg-[rgba(0,0,0,0.05)]' : 'hover:bg-[rgba(0,0,0,0.05)]'
              }`}
            >
              {IconComponent && (
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#0f766e]' : 'text-[#71717a]'}`} />
              )}
            </button>
          )
        })}
        <div className="sticky bottom-0 mt-auto border-t border-[#d4d4d8] bg-[#e4e4e7] w-full px-[16px] py-[12px] flex items-center justify-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-[35.33px] h-[35.33px] rounded-[8px] flex items-center justify-center hover:bg-gray-200 rotate-180"
          >
            <ArrowRightIcon className="w-[18px] h-[18px] text-[#71717a]" />
          </button>
        </div>
      </aside>
    )
  }

  return (
    <aside className="fixed left-0 top-[60px] bottom-0 w-[292px] bg-[#fafafa] border-r border-[#d4d4d8] overflow-y-auto flex flex-col">
      <div className="flex-1 overflow-y-auto p-0">
        {/* Favorites Menu */}
        <div className="px-0 py-[4px]">
          <div className="px-[16px] py-[8px]">
            <p className="text-[12px] font-medium leading-[16px] text-[#a1a1aa] uppercase">Favorites Menu</p>
          </div>
          <div className="space-y-0">
            {favorites.map((item) => (
              <button
                key={item.id}
                onClick={() => handleFavoriteClick(item)}
                className="w-full flex items-center gap-[12px] px-[16px] py-[8px] rounded-[8px] hover:bg-gray-50 group"
              >
                <button
                  onClick={(e) => handleFavoriteBookmarkClick(e, item)}
                  className="w-4 h-4 flex-shrink-0 hover:opacity-80"
                  title="Remove from favorites"
                >
                  <BookmarkSolidIcon className="w-4 h-4 text-[#0f766e]" />
                </button>
                <div className="flex-1 text-[14px] font-medium leading-[20px] text-[#09090b] text-left">
                  {item.label}
                </div>
                <ArrowRightIcon className="w-4 h-4 text-[#09090b] opacity-50 flex-shrink-0 rotate-[270deg]" />
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="px-[16px] py-[4px]">
          <div className="h-px bg-[#d4d4d8]" />
        </div>

        {/* Admin Menu */}
        <div className="px-0 py-[4px]">
          <div className="px-[16px] py-[8px]">
            <p className="text-[12px] font-medium leading-[16px] text-[#a1a1aa] uppercase">Admin Menu</p>
          </div>
          <div className="space-y-0 px-0">
            {adminMenu.map((item) => (
              <div key={item.id} className="relative">
                {renderMenuItem(item)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="sticky bottom-0 border-t border-[#d4d4d8] bg-[#e4e4e7] px-[16px] py-[12px] flex items-center justify-end">
        <button
          onClick={() => setIsCollapsed(true)}
          className="w-[35.33px] h-[35.33px] rounded-[8px] flex items-center justify-center hover:bg-gray-200"
        >
          <ArrowRightIcon className="w-[18px] h-[18px] text-[#71717a]" />
        </button>
      </div>
    </aside>
  )
}
