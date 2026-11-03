import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 写作集合：一篇 Markdown 对应一篇文章
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

// 摄影集合：coverImage 指向 public 下的静态图片路径，列表与详情页都会真实使用
const photography = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photography' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    camera: z.string().optional(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { writing, photography };
