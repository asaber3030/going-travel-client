import { getStats } from "@/actions/auth"

export default async function AdminDashboard() {
  const data = await getStats()

  console.log(data)

  return (
    <div className='space-y-6'>
      {/* Welcome Section */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Welcome back, Admin!</h1>
          <p className='text-muted-foreground'>Here's what's happening with your tours today.</p>
        </div>
      </div>

      <div className='grid xl:grid-cols-5 grid-cols-1 gap-4'>
        <div className='bg-white p-4 rounded-md border'>
          <p className='font-bold text-xl'>Total Limousines</p>
          <p className='text-lg font-bold'>{data.total_limousines}</p>
        </div>
        <div className='bg-white p-4 rounded-md border'>
          <p className='font-bold text-xl'>Total Tours</p>
          <p className='text-lg font-bold'>{data.total_tours}</p>
        </div>
        <div className='bg-white p-4 rounded-md border'>
          <p className='font-bold text-xl'>Total Hotels</p>
          <p className='text-lg font-bold'>{data.total_hotels}</p>
        </div>
        <div className='bg-white p-4 rounded-md border'>
          <p className='font-bold text-xl'>Total Locations</p>
          <p className='text-lg font-bold'>{data.total_locations}</p>
        </div>
        <div className='bg-white p-4 rounded-md border'>
          <p className='font-bold text-xl'>Total Categories</p>
          <p className='text-lg font-bold'>{data.total_categories}</p>
        </div>
      </div>
    </div>
  )
}
