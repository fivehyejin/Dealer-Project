// [2024-01-26]
// Dealers for distributor 페이지 생성
// 아키텍처 가이드에 따라 app/pages/ 디렉토리에 배치
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function DealersForDistributorPage() {
  return (
    <div className="max-w-[1627px]">
      <Breadcrumb />
      <div>
        <h1 className="text-3xl font-bold text-[#09090b] mb-4">Dealers for distributor</h1>
        {/* 페이지 콘텐츠는 여기에 추가 */}
      </div>
    </div>
  )
}
