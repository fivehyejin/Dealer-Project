import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import PageHeader from '@/components/ui/PageHeader'
import KPICard from '@/components/ui/KPICard'
import ChartWidget from '@/components/ui/ChartWidget'
import DealerTable from '@/components/ui/DealerTable'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <main className="ml-[292px] mt-[60px] p-8">
        <div className="max-w-[1627px]">
          <PageHeader />

          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <KPICard
              title="Active Dealers Now"
              value="142 Case"
              change="+2 /vs last mo"
              isPositive={true}
            />
            <KPICard
              title="Pending Approvals"
              value="8 Case"
              change="-3 /vs last mo"
              isPositive={false}
            />
            <KPICard
              title="New Registrations"
              value="3 Case"
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
      </main>
    </div>
  )
}
