import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const educacion = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/educacion' }),
  schema: z.object({
    entrada: z.number(),
    palabra: z.string(),
    pronunciacion: z.string(),
    categoria: z.string(),
    significado: z.array(z.string()),
    memorablePhrase: z.string(),
    valueAdd: z.object({
      comparisons: z.array(z.string()),
      explanation: z.string(),
    }),
    etymology: z.object({
      root: z.string(),
      verb: z.string(),
      conclusion: z.string(),
    }),
    lexicalFamily: z.array(z.object({
      word: z.string(),
      type: z.string(),
      desc: z.string(),
      example: z.string().optional(),
    })),
    verbs: z.object({
      desc: z.string(),
      list: z.array(z.string()),
    }),
    collocations: z.array(z.string()),
    rival: z.object({
      word: z.string(),
      rivalDesc: z.string(),
      mainDesc: z.string(),
      conclusion: z.string(),
    }),
    mistakes: z.array(z.object({
      mistake: z.string(),
      correction: z.string(),
    })),
    examples: z.array(z.object({
      context: z.string(),
      text: z.string(),
    })),
    whyKeep: z.object({
      intro: z.string(),
      contrast: z.string(),
      conclusion: z.string(),
    }),
  }),
});

export const collections = { educacion };
