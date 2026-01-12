import type { Tema } from "../types/MainLayout.types";
import { Compass, BookOpen, ChevronRight, Copyright } from 'lucide-react';

const Temario: Tema[] = [
    { id: 1, titulo: 'La constitución española', apartado: 'legislacion', estado: 'pendiente', temario: 'constitucion' },
    { id: 2, titulo: 'Redes informática', apartado: 'informatica', estado: 'pendiente', temario: 'routers_y_switches' }
]

export const Sidebar = ({ setCurrentTemario }: { setCurrentTemario: (nombreTemario: string) => void }) => {
    return (
        <aside className="w-80 h-screen bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shadow-xl">
            {/* Header del Sidebar */}
            <div className="p-6">
                <div className="flex items-center gap-x-3 text-white">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Compass size={24} className="text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Opoweb AGSE</span>
                </div>
            </div>

            {/* Navegación */}
            <nav className="flex-1 px-4 py-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                    Temario
                </p>
                <ul className="space-y-2">
                    {Temario.map(tema => (
                        <li 
                            key={tema.id}
                            onClick={() => setCurrentTemario(tema.temario)}
                            className="group flex items-center justify-between p-3 rounded-xl cursor-pointer 
                                     hover:bg-slate-800 hover:text-white transition-all duration-200 border border-transparent hover:border-slate-700"
                        >
                            <div className="flex items-center gap-x-3">
                                <BookOpen size={18} className="text-slate-500 group-hover:text-blue-400" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{tema.titulo}</span>
                                    <span className="text-[10px] text-slate-500 uppercase">{tema.apartado}</span>
                                </div>
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer del Sidebar (Opcional) */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400 flex text-center items-center gap-x-1 justify-center">
                    <Copyright size={12}/> Airán Gómez de Salazar Eugenio
                </div>
            </div>
        </aside>
    )
}