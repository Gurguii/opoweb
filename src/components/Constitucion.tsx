import {useState} from 'react';
import datosConstitucion from "../data/constitucion.json";
import { type ConstitucionJSON } from "../types/Constitucion.types.ts";

export const Constitucion = () => {
    // Cast de los datos al tipo que hemos definido
    const data = datosConstitucion as ConstitucionJSON;
    const [ buscarArticulo, setBuscarArticulo ] = useState('');

    const seccionesFiltradas = data.secciones.map(seccion => {
        // 1. Filtramos los artículos de esta sección
        const articulosQueCoinciden = seccion.articulos.filter(art => 
            art.contenido.toLowerCase().includes(buscarArticulo.toLowerCase()) ||
            art.titulo.toLowerCase().includes(buscarArticulo.toLowerCase()) ||
            art.tags.some(tag => tag.toLowerCase().includes(buscarArticulo.toLowerCase()))
        );

        // 2. Devolvemos una "copia" de la sección pero solo con los artículos filtrados
        return {
            ...seccion,
            articulos: articulosQueCoinciden
        };
    }).filter(seccion => seccion.articulos.length > 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-row space-x-2 py-3 mb-2 justify-center">
                <h1 className="text-3xl font-bold text-slate-800">{data.ley}</h1>
                <input placeholder="Busca un título, artículo..." className="bg-white rounded-xl hover:border p-2" onChange={(e) => {setBuscarArticulo(e.target.value)}}></input>
            </div>
            
<div className="space-y-12">
    {seccionesFiltradas.map((seccion) => (
        <section key={seccion.id} className="animate-fadeIn">
            {/* Cabecera de la Sección (Título de la Ley) */}
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-3 border-b pb-2 border-slate-200">
                <span className="bg-slate-900 text-white px-3 py-1 rounded text-sm">
                    {seccion.id === 'titulo_preliminar' ? 'TP' : 'T1'}
                </span>
                {seccion.nombre}
            </h2>

            {/* Contenedor de artículos de esta sección */}
            <div className="grid gap-6">
                {seccion.articulos.map((art) => (
                    <article 
                        key={art.id} 
                        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    Art. {art.id}
                                </span>
                                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                                    {art.titulo}
                                </h3>
                            </div>
                        </div>

                        <p className="text-slate-700 leading-relaxed">
                            {art.contenido}
                        </p>

                        {/* Etiquetas/Tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {art.tags.map(tag => (
                                <span 
                                    key={tag} 
                                    className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-medium hover:bg-blue-50 hover:text-blue-600 cursor-default transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    ))}
</div>
        </div>
    );
};