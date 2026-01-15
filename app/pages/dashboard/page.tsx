import Breadcrumb from '@/components/ui/Breadcrumb'
import KPICard from '@/components/ui/KPICard'
import ChartWidget from '@/components/ui/ChartWidget'
import DealerTable from '@/components/ui/DealerTable'

export default function DashboardPage() {
  return (
    <div className="max-w-[1627px]">
      <Breadcrumb />
      
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#09090b]">Dashboard</h1>
      </div>

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
      <div className="grid grid-cols-3 gap-6 mb-8">
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
