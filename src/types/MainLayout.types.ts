export interface Tema {
    id: number,
    titulo: string,
    apartado: 'informatica' | 'legislacion',
    estado: 'completado' | 'en curso' | 'pendiente',
    temario: string
}