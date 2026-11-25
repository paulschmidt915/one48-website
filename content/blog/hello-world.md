---
title: Hello, world
date: 2026-11-25
description: A sample post that shows how posts are written. It is a draft, so it only appears while running npm run dev.
draft: true
---

This is a sample post. Every post is one Markdown file in `content/blog/`; the file name is the address, so this one lives at `/blog/hello-world`.

## How to write a post

1. Copy this file and give it a new name, e.g. `content/blog/my-first-post.md`.
2. Change the title, date and description at the top. Remove `draft: true` once it is ready.
3. Write the text in Markdown: **bold**, *italic*, [links](https://www.one48.de), lists, quotes and images.
4. Commit and push. Once Vercel has deployed it, send it to subscribers with `npm run newsletter -- my-first-post`.

> Images go into `public/blog/` and are linked as `![Description](/blog/picture.webp)`; they show up in the e-mail too.

That's all.
