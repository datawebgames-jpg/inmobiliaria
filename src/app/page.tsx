import { supabase } from '@/lib/supabase';

export default async function Home() {
  // 1. Pedimos las propiedades a Supabase
  const { data: propiedades, error } = await supabase
    .from('propiedades')
    .select('*');

  if (error) console.error("Error cargando propiedades:", error);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Vesta Habitat</h1>
        <p className="text-xl opacity-90">Tu próximo hogar está aquí.</p>
      </header>

      {/* Grid de Propiedades Reales */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Propiedades Disponibles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propiedades?.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <img 
                src={item.imagen_url || 'https://via.placeholder.com/400x300'} 
                alt={item.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-blue-600 font-bold uppercase text-xs tracking-widest">
                  {item.tipo}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{item.titulo}</h3>
                <p className="text-2xl text-gray-800 font-light mt-4">
                  ${Number(item.precio).toLocaleString()}
                </p>
                <div className="flex justify-between mt-6 text-gray-500 text-sm border-t pt-4">
                  <span>{item.habitaciones} Dorm.</span>
                  <span>{item.metros_cuadrados} m²</span>
                  <span>{item.ubicacion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!propiedades || propiedades.length === 0) && (
          <p className="text-center text-gray-500">No hay propiedades cargadas aún.</p>
        )}
      </section>
    </div>
  );
}