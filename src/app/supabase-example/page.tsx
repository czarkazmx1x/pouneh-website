import { createClient } from '@/lib/supabase/server'

export default async function SupabaseExamplePage() {
  const supabase = await createClient()
  
  // Example: Fetch data from a table
  // const { data, error } = await supabase.from('your_table').select('*')
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Supabase Integration</h1>
      <p className="text-gray-600">
        Supabase is now connected to your site!
      </p>
      
      <div className="mt-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Next Steps:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Create tables in your Supabase dashboard</li>
          <li>Use the supabase client to query data</li>
          <li>Add authentication</li>
          <li>Set up real-time subscriptions</li>
        </ul>
      </div>
    </div>
  )
}
