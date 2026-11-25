import fs from 'node:fs'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Backdrop from '@/components/Backdrop'
import { EpisodeKicker, EpisodeOutro, ListenPill } from '@/components/Emergence'
import RollLink from '@/components/RollLink'
import Subscribe from '@/components/Subscribe'
import { formatDate, getPost, getPosts, vizFile, words } from '@/lib/posts'
import { site } from '@/site'
import VizMount from '@/viz/VizMount'
import '@/viz/_kit/kit.css'

export const dynamicParams = false

export function generateStaticParams() {
  const posts = getPosts()
  // A published post must not point to a figure that does not exist: stop the build instead.
  if (process.env.NODE_ENV === 'production') {
    for (const p of posts.filter((p) => !p.draft))
      for (const name of p.vizzes)
        if (!fs.existsSync(vizFile(p.slug, name)))
          throw new Error(`content/blog/${p.slug}.md uses the figure "${name}", but src/viz/${p.slug}/${name}.tsx does not exist.`)
  }
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const url = `${site.url}/blog/${post.slug}`
  return {
    title: `${post.title} – ${site.name}`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'one48',
      type: 'article',
      publishedTime: post.date,
      ...(post.lang === 'de' ? { locale: 'de_DE' } : {}),
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  const w = words[post.lang]
  const s = post.series
  return (
    <>
      <Backdrop />
      <main className={s ? `blog blog-series blog-${s.key}` : 'blog'} lang={post.lang === 'en' ? undefined : post.lang}>
        <header className="blog-top">
          <RollLink href="/blog">{w.allPosts}</RollLink>
        </header>

        <article>
          {s ? (
            <header className="post-head">
              <EpisodeKicker series={s} lang={post.lang} />
              <h1 className="post-title">{post.title}</h1>
              {post.description && <p className="post-dek">{post.description}</p>}
              <div className="post-meta">
                <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
                <span aria-hidden>·</span>
                <span>{w.minRead(post.readingMinutes)}</span>
              </div>
              <ListenPill series={s} lang={post.lang} />
            </header>
          ) : (
            <header className="post-head">
              <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
              <h1 className="post-title">{post.title}</h1>
            </header>
          )}
          <div className="prose" data-post={post.slug} dangerouslySetInnerHTML={{ __html: post.html }} />
          {post.vizzes.length > 0 || s ? <VizMount key={post.slug} slug={post.slug} lang={post.lang} /> : null}
          {s && <EpisodeOutro series={s} lang={post.lang} text={post.outro} />}
        </article>

        <Subscribe
          lang={post.lang}
          title={post.lang === 'de' ? 'Gefallen? Den nächsten Beitrag gibt es per E-Mail.' : 'Liked it? Get the next one by e-mail.'}
        />
      </main>
    </>
  )
}
