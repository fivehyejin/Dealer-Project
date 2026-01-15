'use client'

// Heroicons 사용 (24x24 solid)
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
  ChevronUpDownIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  MoonIcon,
  InformationCircleIcon,
  LockClosedIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ChangePasswordModal from '@/components/ui/ChangePasswordModal'
import LoginAttemptsModal from '@/components/ui/LoginAttemptsModal'
import ChangeProfilePictureModal from '@/components/ui/ChangeProfilePictureModal'
import MySettingsModal from '@/components/ui/MySettingsModal'

export default function Navbar() {
  const router = useRouter()
  const [languageOpen, setLanguageOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [recentlyOpenItems, setRecentlyOpenItems] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<{ type: string; items: { name: string; matches?: string[] }[] }[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  ]
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
  const [loginAttemptsModalOpen, setLoginAttemptsModalOpen] = useState(false)
  const [changeProfilePictureModalOpen, setChangeProfilePictureModalOpen] = useState(false)
  const [mySettingsModalOpen, setMySettingsModalOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Load recently open from localStorage
  useEffect(() => {
    const savedRecentlyOpen = localStorage.getItem('recentlyOpen')
    if (savedRecentlyOpen) {
      try {
        const parsed = JSON.parse(savedRecentlyOpen)
        setRecentlyOpenItems(Array.isArray(parsed) ? parsed.slice(0, 5) : [])
      } catch {
        setRecentlyOpenItems([])
      }
    } else {
      // 초기값 설정
      setRecentlyOpenItems(['Smart Test Drive', 'Dealers', 'Admin'].slice(0, 5))
    }
  }, [])

  useEffect(() => {
    if (recentlyOpenItems.length > 0) {
      localStorage.setItem('recentlyOpen', JSON.stringify(recentlyOpenItems))
    }
  }, [recentlyOpenItems])

  // Generate search results based on input (Entity case)
  useEffect(() => {
    if (searchValue.trim().length > 0) {
      const results = generateSearchResults(searchValue)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchValue])

  const generateSearchResults = (input: string): { type: string; items: { name: string; matches?: string[] }[] }[] => {
    if (!input.trim()) return []

    const lowerInput = input.toLowerCase().trim()
    const results: { type: string; items: { name: string; matches?: string[] }[] }[] = []

    // Action 키워드 감지
    const actionKeywords = ['create', 'add', 'new', 'edit', 'delete', 'manage', 'view', 'register', 'upload']
    const isActionInput = actionKeywords.some((keyword) => lowerInput.includes(keyword))

    // Entity 키워드 감지
    const isUserEntity = lowerInput.includes('user') || lowerInput.includes('alex') || lowerInput.includes('sarah') || lowerInput.includes('admin') || lowerInput.includes('김민수')
    const isDealerEntity = lowerInput.includes('dealer') || lowerInput.includes('딜러') || lowerInput.includes('busan') || lowerInput.includes('auto') || lowerInput.includes('center') || lowerInput.includes('@@')
    const isKPIEntity = lowerInput.includes('kpi') || lowerInput.includes('active') || lowerInput.includes('pending') || lowerInput.includes('registration')

    // Menu 키워드 감지
    const isMenuInput = lowerInput.includes('role') || lowerInput.includes('permission') || lowerInput.includes('audit') || lowerInput.includes('menu')

    // Action + 대상 포함 (예: "alex permission")
    const actionWithTargetPattern = /(alex|sarah|김민수|user|dealer).*(permission|role|권한)/i
    if (actionWithTargetPattern.test(input)) {
      const targetMatch = input.match(/(alex|sarah|김민수|user)/i)
      const actionMatch = input.match(/(permission|role|권한)/i)
      
      if (targetMatch && actionMatch) {
        results.push({
          type: 'Actions',
          items: [
            { name: `Edit ${targetMatch[0]}'s ${actionMatch[0]}`, matches: [targetMatch[0], actionMatch[0]] },
            { name: `View ${targetMatch[0]} Detail`, matches: [targetMatch[0]] },
          ],
        })
        return results
      }
    }

    // Action 입력 (대상 미포함) - "Create New User" 같은 경우
    if (isActionInput && (lowerInput.includes('create new user') || lowerInput.includes('create user'))) {
      results.push({
        type: 'Actions',
        items: [
          { name: 'Create User (Role pre-filled)', matches: ['Create', 'User'] },
          { name: 'Create New Role', matches: ['Create', 'Role'] },
        ],
      })
      return results
    }

    // Action 입력 (add, create 등 단순 액션)
    if (isActionInput && !isUserEntity && !isDealerEntity) {
      const actions = [
        { name: 'Create New User', matches: ['Create'] },
        { name: 'Create New Role', matches: ['Create'] },
        { name: 'Register New Dealer', matches: ['Register'] },
      ].filter((action) => {
        if (lowerInput.includes('create') || lowerInput.includes('add') || lowerInput.includes('new')) {
          return action.name.toLowerCase().includes('create') || action.name.toLowerCase().includes('new')
        }
        if (lowerInput.includes('register')) {
          return action.name.toLowerCase().includes('register')
        }
        return true
      })

      if (actions.length > 0) {
        results.push({
          type: 'Actions',
          items: actions,
        })
      }
    }

    // Menu 입력 (role, permission, audit)
    if (isMenuInput) {
      const menuItems = []
      if (lowerInput.includes('role')) {
        menuItems.push({ name: 'Roles & Permissions', matches: ['Role'] })
        menuItems.push({ name: 'Role Management', matches: ['Role'] })
      }
      if (lowerInput.includes('permission')) {
        menuItems.push({ name: 'User Permissions', matches: ['Permission'] })
        menuItems.push({ name: 'Permissions & Roles', matches: ['Permission', 'Role'] })
      }
      if (lowerInput.includes('audit')) {
        menuItems.push({ name: 'Audit Log', matches: ['Audit'] })
        menuItems.push({ name: 'Activity History', matches: ['Activity'] })
      }

      if (menuItems.length > 0) {
        results.push({
          type: 'Menu',
          items: menuItems,
        })
      }
    }

    // Users 섹션
    if (isUserEntity && !isActionInput) {
      const users = [
        { name: 'Alex Johnson', matches: lowerInput.includes('alex') ? ['Alex'] : lowerInput.includes('a') ? ['A'] : undefined },
        { name: 'Sarah Admin', matches: lowerInput.includes('sarah') ? ['Sarah'] : lowerInput.includes('admin') ? ['Admin'] : lowerInput.includes('a') ? ['A'] : undefined },
      ].filter((user) => user.name.toLowerCase().includes(lowerInput) || lowerInput.includes('user'))

      if (users.length > 0) {
        results.push({
          type: 'Users',
          items: users,
        })
      }
    }

    // Dealers 섹션
    if (isDealerEntity && !isActionInput) {
      const dealers = [
        { name: 'Busan Auto Center', matches: lowerInput.includes('busan') ? ['Busan'] : lowerInput.includes('auto') ? ['Auto'] : lowerInput.includes('center') ? ['Center'] : undefined },
        { name: 'Seoul Motors', matches: lowerInput.includes('seoul') ? ['Seoul'] : lowerInput.includes('motors') ? ['Motors'] : undefined },
        { name: 'Daegu Car Dealer', matches: lowerInput.includes('daegu') ? ['Daegu'] : lowerInput.includes('car') ? ['Car'] : undefined },
      ].filter((dealer) => dealer.name.toLowerCase().includes(lowerInput) || lowerInput.includes('dealer') || lowerInput.includes('딜러'))

      if (dealers.length > 0) {
        results.push({
          type: 'Dealers',
          items: dealers,
        })
      }
    }

    // KPI 섹션
    if (isKPIEntity) {
      const kpis = [
        { name: 'Active Dealers Now', matches: lowerInput.includes('active') ? ['Active'] : undefined },
        { name: 'Pending Approvals', matches: lowerInput.includes('pending') ? ['Pending'] : undefined },
        { name: 'New Registrations', matches: lowerInput.includes('registration') ? ['Registration'] : lowerInput.includes('new') ? ['New'] : undefined },
      ].filter((kpi) => kpi.name.toLowerCase().includes(lowerInput))

      if (kpis.length > 0) {
        results.push({
          type: 'KPI',
          items: kpis,
        })
      }
    }

    // 애매한 입력 (manage, setup, settings)
    if (!results.length && (lowerInput.includes('manage') || lowerInput.includes('setup') || lowerInput.includes('settings'))) {
      results.push({
        type: 'Suggested Categories',
        items: [
          { name: 'User Management', matches: ['Manage'] },
          { name: 'Dealer Management', matches: ['Manage'] },
          { name: 'Settings', matches: ['Settings'] },
        ],
      })
    }

    // 결과가 없으면 빈 배열 반환 (No Result 처리는 UI에서)
    return results
  }

  // AI가 검색 결과를 분석하여 적절한 버튼 액션 결정
  const getAiButtonAction = (): { label: string; action: () => void } | null => {
    if (searchResults.length === 0) return null

    // 가장 우선순위가 높은 결과 타입 결정
    const primaryType = searchResults[0]?.type
    const primaryItem = searchResults[0]?.items[0]?.name

    switch (primaryType) {
      case 'Users':
        return {
          label: 'Go to Users',
          action: () => {
            router.push('/pages/users')
            setSearchOpen(false)
          },
        }
      case 'Dealers':
        return {
          label: 'Go to Dealers',
          action: () => {
            router.push('/pages/dealers')
            setSearchOpen(false)
          },
        }
      case 'KPI':
        return {
          label: 'Go to Dashboard',
          action: () => {
            router.push('/pages/dashboard')
            setSearchOpen(false)
          },
        }
      case 'Menu':
        // Permission 관련이면 Permissions & Roles로
        if (primaryItem?.toLowerCase().includes('permission')) {
          return {
            label: 'Go to Permissions & Roles',
            action: () => {
              router.push('/pages/permissions')
              setSearchOpen(false)
            },
          }
        }
        // Role 관련이면 Roles로
        if (primaryItem?.toLowerCase().includes('role')) {
          return {
            label: 'Go to Roles & Permissions',
            action: () => {
              router.push('/pages/roles')
              setSearchOpen(false)
            },
          }
        }
        return null
      case 'Actions':
        // Create User 관련이면 User Management로
        if (primaryItem?.toLowerCase().includes('user')) {
          return {
            label: 'Go to User Management',
            action: () => {
              router.push('/pages/users')
              setSearchOpen(false)
            },
          }
        }
        // Permission 관련이면 Permissions로
        if (primaryItem?.toLowerCase().includes('permission')) {
          return {
            label: 'Go to Permissions & Roles',
            action: () => {
              router.push('/pages/permissions')
              setSearchOpen(false)
            },
          }
        }
        return null
      case 'Suggested Categories':
        // User Management가 첫 번째면 Users로
        if (primaryItem?.includes('User')) {
          return {
            label: 'Go to Users',
            action: () => {
              router.push('/pages/users')
              setSearchOpen(false)
            },
          }
        }
        return null
      default:
        return null
    }
  }

  const highlightMatches = (text: string, matches?: string[]): React.ReactNode => {
    if (!matches || matches.length === 0) return <span>{text}</span>

    let highlighted = text
    matches.forEach((match) => {
      const regex = new RegExp(`(${match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      highlighted = highlighted.replace(regex, '<span class="text-[#0f766e]">$1</span>')
    })

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />
  }

  const handleSearch = (value: string) => {
    // Perform search action
    console.log('Searching for:', value)
  }

  const handleRecentlyOpenClick = (item: string) => {
    setSearchValue(item)
    searchInputRef.current?.focus()
    handleSearch(item)
    
    // 최근 열기 목록 업데이트 (클릭한 항목을 맨 위로)
    setRecentlyOpenItems((prev) => {
      const filtered = prev.filter((i) => i !== item)
      return [item, ...filtered].slice(0, 5)
    })
  }

  const handleDeleteRecentlyOpen = (e: React.MouseEvent, item: string) => {
    e.stopPropagation()
    setRecentlyOpenItems((prev) => prev.filter((i) => i !== item))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      handleSearch(searchValue)
      setSearchOpen(false)
    }
  }

  const profileMenuItems = [
    { icon: UserIcon, label: 'Change password' },
    { icon: Cog6ToothIcon, label: 'Login attempts' },
    { icon: InformationCircleIcon, label: 'Change profile picture' },
    { icon: MoonIcon, label: 'My setting' },
    { icon: ArrowRightOnRectangleIcon, label: 'Sign out' },
  ]


  const quickActions = [
    { icon: BuildingOfficeIcon, label: 'Register New Dealer' },
    { icon: UserIcon, label: 'Create New Role' },
    { icon: DocumentTextIcon, label: 'Upload New Documents' },
    { icon: ShieldCheckIcon, label: 'Manage Permissions' },
  ]

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-[#f1f1f2] border-b border-[#d4d4d8] z-50 flex items-center justify-between px-4">
      {/* Left: Logo */}
      <div className="flex items-center w-[200px]">
        <div className="flex flex-col gap-1">
          <div className="text-lg font-bold text-gray-900">DEALER 365</div>
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-[680px] mx-4 relative" ref={searchRef}>
        <div
          className={`relative bg-white border rounded-lg flex items-center px-3 py-2 gap-3 transition-all ${
            searchOpen
              ? 'border-[#14b8a6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),0px_0px_0px_2px_white,0px_0px_0px_4px_#14b8a6]'
              : 'border-[#d4d4d8]'
          }`}
          onClick={() => setSearchOpen(true)}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-[#71717a] flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchOpen ? 'Please enter your search term' : ''}
            className="flex-1 outline-none text-sm text-[#71717a] bg-transparent"
            onFocus={() => setSearchOpen(true)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={() => {
              if (searchValue.trim()) {
                handleSearch(searchValue)
              }
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MagnifyingGlassIcon className="w-4 h-4 text-[#71717a]" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MicrophoneIcon className="w-4 h-4 text-[#71717a]" />
          </button>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-[#e4e4e7] rounded-[6px] shadow-lg p-1 z-30 max-h-[400px] overflow-y-auto">
            {/* AI Intelligent Response Banner */}
            {searchValue.trim().length > 0 && (
              <div className="bg-[#ccfbf1] px-3 py-2 rounded-lg mb-1">
                <div className="flex items-start gap-3">
                  <InformationCircleIcon className="w-5 h-5 text-[#0f766e] flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-[#0f766e] leading-6 mb-1">
                      AI Intelligent Response
                    </p>
                    <p className="text-sm text-[#314158] leading-[1.43]">
                      {searchResults.length > 0
                        ? `Found ${searchResults.reduce((sum, section) => sum + section.items.length, 0)} results for '${searchValue}'`
                        : `Searching for '${searchValue}' across dealer records`}
                    </p>
                  </div>
                  {(() => {
                    const buttonAction = getAiButtonAction()
                    return buttonAction ? (
                      <button
                        onClick={buttonAction.action}
                        className="px-2 py-1 text-sm font-semibold text-[#0f766e] hover:bg-[#99f6e4] rounded-md whitespace-nowrap"
                      >
                        {buttonAction.label}
                      </button>
                    ) : null
                  })()}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 ? (
              searchResults.map((section, sectionIndex) => (
                <div key={sectionIndex} className="px-2.5 py-2">
                  <div className="text-xs font-semibold text-[#a1a1aa] px-2.5 py-2">{section.type}</div>
                  {section.items.map((item, itemIndex) => {
                    // 타입에 따라 아이콘 결정
                    let Icon = UserIcon
                    if (section.type === 'Dealers') {
                      Icon = BuildingOfficeIcon
                    } else if (section.type === 'KPI' || section.type === 'Menu') {
                      Icon = DocumentTextIcon
                    } else if (section.type === 'Actions') {
                      Icon = ArrowTopRightOnSquareIcon
                    } else if (section.type === 'Suggested Categories') {
                      Icon = InformationCircleIcon
                    }

                    return (
                      <button
                        key={itemIndex}
                        onClick={() => {
                          setSearchValue(item.name)
                          handleSearch(item.name)
                        }}
                        className="w-full px-2 py-2 flex items-center gap-2 text-xs font-semibold text-[#09090b] hover:bg-gray-50 rounded"
                      >
                        <Icon className="w-4 h-4 text-[#09090b]" />
                        <span>{highlightMatches(item.name, item.matches)}</span>
                      </button>
                    )
                  })}
                </div>
              ))
            ) : searchValue.trim().length > 0 ? (
              // No Result
              <div className="px-2.5 py-4">
                <p className="text-sm text-[#71717a] text-center mb-3">
                  No results found for '{searchValue}'
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#a1a1aa] px-2.5 py-2">Suggested actions</p>
                  <button
                    onClick={() => setSearchValue('')}
                    className="w-full px-2 py-2 text-xs font-semibold text-[#09090b] hover:bg-gray-50 rounded text-left"
                  >
                    Try different keywords
                  </button>
                  <button
                    onClick={() => {
                      setSearchValue('user')
                      searchInputRef.current?.focus()
                    }}
                    className="w-full px-2 py-2 text-xs font-semibold text-[#09090b] hover:bg-gray-50 rounded text-left"
                  >
                    Browse by category
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-semibold text-[#a1a1aa] px-2.5 py-2">Suggested categories</p>
                  <button
                    onClick={() => {
                      setSearchValue('user')
                      searchInputRef.current?.focus()
                    }}
                    className="w-full px-2 py-2 flex items-center gap-2 text-xs font-semibold text-[#09090b] hover:bg-gray-50 rounded"
                  >
                    <UserIcon className="w-4 h-4 text-[#09090b]" />
                    <span>Users</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchValue('dealer')
                      searchInputRef.current?.focus()
                    }}
                    className="w-full px-2 py-2 flex items-center gap-2 text-xs font-semibold text-[#09090b] hover:bg-gray-50 rounded"
                  >
                    <BuildingOfficeIcon className="w-4 h-4 text-[#09090b]" />
                    <span>Dealers</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchValue('permission')
                      searchInputRef.current?.focus()
                    }}
                    className="w-full px-2 py-2 flex items-center gap-2 text-xs font-semibold text-[#09090b] hover:bg-gray-50 rounded"
                  >
                    <ShieldCheckIcon className="w-4 h-4 text-[#09090b]" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            ) : null}

            {/* Recently open - 검색어가 없을 때만 표시 */}
            {searchValue.trim().length === 0 && recentlyOpenItems.length > 0 && (
              <div className="px-2.5 py-2">
                <div className="text-xs font-semibold text-[#a1a1aa] px-2 py-2">Recently open</div>
                {recentlyOpenItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentlyOpenClick(item)}
                    className="w-full px-2 py-2 flex items-center justify-between text-xs font-semibold text-[#09090b] hover:bg-gray-50 rounded group"
                  >
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-[#09090b]" />
                      <span>{item}</span>
                    </div>
                    <button
                      onClick={(e) => handleDeleteRecentlyOpen(e, item)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                    >
                      <XMarkIcon className="w-3 h-3 text-[#71717a]" />
                    </button>
                  </button>
                ))}
              </div>
            )}

            {/* Quick Actions - 검색어가 없을 때만 표시 */}
            {searchValue.trim().length === 0 && (
              <div className="px-2.5 py-2">
                <div className="text-xs font-semibold text-[#a1a1aa] px-2 py-2">Quick Actions</div>
                {quickActions.map((item, index) => (
                  <button
                    key={index}
                    className="w-full px-2 py-2 flex items-center justify-between text-xs font-semibold text-[#09090b] hover:bg-[rgba(0,0,0,0.05)] rounded"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-[#71717a]" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-[#09090b]" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setLanguageOpen(!languageOpen)
              setProfileOpen(false)
              setSearchOpen(false)
            }}
            className="bg-[#f1f1f2] border border-[#d4d4d8] rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-[#09090b] hover:bg-gray-100"
          >
            <span className="text-base leading-none">{selectedLanguage.flag}</span>
            <span>{selectedLanguage.name}</span>
            <ChevronUpDownIcon className="w-4 h-4 text-[#a1a1aa]" />
          </button>

          {languageOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setLanguageOpen(false)}
              />
              <div className="absolute top-full mt-1 left-0 bg-[#f1f1f2] border border-[#d4d4d8] rounded-xl shadow-lg w-[149px] py-1 z-20">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang)
                      setLanguageOpen(false)
                    }}
                    className="w-full px-3 py-2 flex items-center gap-2 text-sm font-medium text-[#09090b] hover:bg-gray-100 rounded-lg"
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.name}</span>
                    {selectedLanguage.code === lang.code && (
                      <span className="text-[#71717a]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-[#d4d4d8]" />

        {/* Notification */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-md"
          onClick={() => {
            setSearchOpen(false)
            setLanguageOpen(false)
            setProfileOpen(false)
          }}
        >
          <BellIcon className="w-4 h-4 text-[#71717a]" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen)
              setLanguageOpen(false)
              setSearchOpen(false)
            }}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <div className="w-6 h-6 bg-[#18181b] rounded-md flex items-center justify-center text-white text-xs font-medium">
              D1
            </div>
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute top-full mt-2 right-0 bg-[#fafafa] border border-[#d4d4d8] rounded-xl shadow-lg w-fit min-w-[182px] p-1 z-20">
                {profileMenuItems.slice(0, 4).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setProfileOpen(false)
                      if (item.label === 'Change password') {
                        setChangePasswordModalOpen(true)
                      } else if (item.label === 'Login attempts') {
                        setLoginAttemptsModalOpen(true)
                      } else if (item.label === 'Change profile picture') {
                        setChangeProfilePictureModalOpen(true)
                      } else if (item.label === 'My setting') {
                        setMySettingsModalOpen(true)
                      }
                    }}
                    className="w-full px-4 py-2 flex items-center gap-3 text-sm font-medium text-[#09090b] hover:bg-gray-50 rounded-lg"
                  >
                    <item.icon className="w-4 h-4 text-[#09090b] opacity-50 flex-shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
                {/* Divider */}
                <div className="px-4 py-1">
                  <div className="h-px bg-[#d4d4d8]" />
                </div>
                {/* Sign out */}
                <button
                  onClick={() => {
                    setProfileOpen(false)
                    // Handle sign out
                  }}
                  className="w-full px-4 py-2 flex items-center gap-3 text-sm font-medium text-[#09090b] hover:bg-gray-50 rounded-lg"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 text-[#09090b] opacity-50 flex-shrink-0" />
                  <span className="whitespace-nowrap">Sign out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
      />
      <LoginAttemptsModal
        isOpen={loginAttemptsModalOpen}
        onClose={() => setLoginAttemptsModalOpen(false)}
      />
      <ChangeProfilePictureModal
        isOpen={changeProfilePictureModalOpen}
        onClose={() => setChangeProfilePictureModalOpen(false)}
      />
      <MySettingsModal
        isOpen={mySettingsModalOpen}
        onClose={() => setMySettingsModalOpen(false)}
      />
    </nav>
  )
}
