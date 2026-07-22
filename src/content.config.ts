import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entregas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entregas' }),
  schema: z.object({
    titulo: z.string(),
    palabra: z.string(),
    numero: z.number(),
  }),
});

export const collections = { entregas };
