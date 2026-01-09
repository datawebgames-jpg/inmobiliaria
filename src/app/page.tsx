import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default async function Home() {
  // Obtenemos las propiedades de Supabase
  const { data: propiedades, error } = await supabase
    .from('propiedades')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error de Supabase:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-blue-600 py-16 px-6 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Vesta Habitat</h1>
        <p className="text-xl opacity-90 mb-8">Encuentra tu próximo hogar con nosotros</p>
        <Link 
          href="/publicar" 
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
        >
          Publicar mi propiedad
        </Link>
      </header>

      {/* Grid de Propiedades */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Propiedades Destacadas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedades?.map((p) => (
            <div key={p.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-48 bg-gray-100">
                <img 
                  src={p.imagen_url || 'https://via.placeholder.com/400x300'} 
                  alt={p.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase text-blue-500">{p.tipo}</span>
                  <span className="text-xl font-bold text-gray-900">${Number(p.precio).toLocaleString()}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{p.titulo}</h3>
                <p className="text-gray-500 text-sm">{p.ubicacion}</p>
              </div>
            </div>
          ))}
        </div>

        {(!propiedades || propiedades.length === 0) && (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-400">Aún no hay propiedades cargadas. ¡Sé el primero!</p>
          </div>
        )}
      </section>
    </main>
  );
}