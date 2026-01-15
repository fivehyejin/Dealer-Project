// [2024-01-26]
// 전역 레이아웃에 Navbar와 Sidebar 추가
// 모든 페이지에 고정적으로 표시되도록 수정
'use client'

import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Sidebar />
          <main className="ml-[292px] mt-[60px] p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
