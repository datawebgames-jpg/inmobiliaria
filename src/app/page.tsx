import { supabase } from '@/lib/supabase'

export default async function Home() {
  // Consultamos las propiedades a Supabase
  const { data: propiedades, error } = await supabase
    .from('propiedades')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="p-10 text-red-500">Error: {error.message}</div>

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Propiedades en Vesta Habitat</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {propiedades?.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <img src={p.imagen_url} alt={p.titulo} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{p.titulo}</h3>
                <p className="text-blue-600 font-semibold text-lg">USD {p.precio}</p>
                <p className="text-gray-500 text-sm mt-2 uppercase">{p.tipo}</p>
              </div>
            </div>
          ))}
        </div>

        {propiedades?.length === 0 && (
          <p className="text-gray-500 mt-10">Todavía no hay propiedades. ¡Usa la página /publicar!</p>
        )}
      </div>
    </main>
  )
}