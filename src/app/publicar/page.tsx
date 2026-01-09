'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Publicar() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const datos = Object.fromEntries(formData)

    const { error } = await supabase.from('propiedades').insert([
      { 
        titulo: datos.titulo, 
        precio: Number(datos.precio), 
        tipo: datos.tipo,
        ubicacion: datos.ubicacion,
        imagen_url: datos.imagen_url 
      }
    ])

    setLoading(false)
    if (error) alert("Error: " + error.message)
    else alert("¡Propiedad publicada en Vesta Habitat!")
  }

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Publicar Propiedad</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="titulo" placeholder="Título (ej: Depto 2 ambientes)" className="border p-2 rounded text-black" required />
        <input name="precio" type="number" placeholder="Precio en USD" className="border p-2 rounded text-black" required />
        <select name="tipo" className="border p-2 rounded text-black">
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
        <input name="ubicacion" placeholder="Ubicación (ej: Palermo, CABA)" className="border p-2 rounded text-black" />
        <input name="imagen_url" placeholder="URL de la imagen (Unsplash por ahora)" className="border p-2 rounded text-black" />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Subiendo...' : 'Publicar Ahora'}
        </button>
      </form>
    </div>
  )
}