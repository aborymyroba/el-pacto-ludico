import type { CollectionEntry } from 'astro:content';
import { extractIntro } from './extract';

export interface Publicacion {
  tipo: 'entrega' | 'eco';
  id: string;
  etiqueta: string;
  titulo: string;
  palabra?: string;
  fecha: Date;
  extracto: string;
  ruta: string;
}

type Entrega = CollectionEntry<'entregas'>;
type Eco = CollectionEntry<'ecos'>;

export function todasLasPublicaciones(entregas: Entrega[], ecos: Eco[]): Publicacion[] {
  const publicaciones: Publicacion[] = [
    ...entregas.map((entry) => ({
      tipo: 'entrega' as const,
      id: entry.id,
      etiqueta: 'Arsenal',
      titulo: entry.data.titulo,
      palabra: entry.data.palabra,
      fecha: entry.data.fecha,
      extracto: extractIntro(entry.body),
      ruta: `/arsenal/entregas/${entry.id}`,
    })),
    ...ecos.map((entry) => ({
      tipo: 'eco' as const,
      id: entry.id,
      etiqueta: 'Educación',
      titulo: entry.data.titulo,
      fecha: entry.data.fecha,
      extracto: extractIntro(entry.data.intro),
      ruta: `/educacion/ecos/${entry.id}`,
    })),
  ];
  return publicaciones.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
}
