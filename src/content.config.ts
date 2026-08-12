import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entregas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entregas' }),
  schema: z.object({
    titulo: z.string(),
    palabra: z.string(),
    numero: z.number(),
    fecha: z.coerce.date(),
  }),
});

const ecos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ecos' }),
  schema: z.object({
    titulo: z.string(),
    numero: z.number(),
    autor: z.string(),
    anio: z.number(),
    intro: z.string(),
    catala: z.string(),
    cierre: z.string(),
  }),
});

export const collections = { entregas, ecos };
