// [2024-01-26]
// Dealers 페이지 생성
// 피그마 디자인에 맞게 PageHeader, KPI Cards, Charts, Table 통합
import PageHeader from '@/components/ui/PageHeader'
import KPICard from '@/components/ui/KPICard'
import ChartWidget from '@/components/ui/ChartWidget'
import DealerTable from '@/components/ui/DealerTable'

export default function DealersPage() {
  return (
    <div className="max-w-[1627px]">
      <PageHeader title="Dealers" />

      {/* KPI Cards */}
      <div className="flex gap-5 mb-6">
        <KPICard
          title="Active Dealers Now"
          value="142"
          unit="Case"
          change="+2 /vs last mo"
          isPositive={true}
        />
        <KPICard
          title="Pending Approvals"
          value="8"
          unit="Case"
          change="-3 /vs last mo"
          isPositive={false}
        />
        <KPICard
          title="New Registrations"
          value="3"
          unit="Case"
          change="-1 /vs last mo"
          isPositive={false}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <ChartWidget
          title="Dealer Growth Trend"
          tabs={['Daily', 'Weekly', 'Monthly', 'Yearly']}
          type="line"
        />
        <ChartWidget
          title="Active Dealer Goal"
          tabs={['Daily', 'Weekly', 'Monthly', 'Yearly']}
          type="pie"
        />
        <ChartWidget
          title="Dealers by Edition"
          tabs={['Daily', 'Weekly', 'Monthly', 'Yearly']}
          type="bar"
        />
      </div>

      {/* Table */}
      <DealerTable />
    </div>
  )
}
