// types/MainLayout.types.ts (o donde tengas tus tipos)

export interface Articulo {
    id: number;
    titulo: string;
    contenido: string;
    tags: string[];
}

export interface SeccionLey {
    id: string;
    nombre: string;
    articulos: Articulo[];
}

export interface ConstitucionJSON {
    ley: string;
    secciones: SeccionLey[];
}