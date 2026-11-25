import type { Metadata } from 'next'
import Link from 'next/link'
import Backdrop from '@/components/Backdrop'
import RollLink from '@/components/RollLink'
import Subscribe from '@/components/Subscribe'
import { formatDate, getPosts, words } from '@/lib/posts'
import { site } from '@/site'

const description = 'What I learn about AI at work and building my own apps. New posts also come by e-mail.'

export const metadata: Metadata = {
  title: `Blog – ${site.name}`,
  description,
  alternates: { canonical: `${site.url}/blog` },
  openGraph: { title: `Blog – ${site.name}`, description, url: `${site.url}/blog`, siteName: 'one48', type: 'website' },
}

export default function BlogPage() {
  const posts = getPosts()
  return (
    <>
      <Backdrop />
      <main className="blog">
        <header className="blog-top">
          <RollLink href="/">one48</RollLink>
        </header>

        <h1 className="blog-title">Blog.</h1>
        <p className="blog-lead">{description}</p>

        {posts.length ? (
          <ol className="posts">
            {posts.map((p, i) => (
              <li key={p.slug} style={{ '--i': i } as React.CSSProperties}>
                <Link href={`/blog/${p.slug}`} className="post-card" lang={p.lang === 'en' ? undefined : p.lang}>
                  <span className="post-card-meta">
                    {p.series && (
                      <span className="post-card-series">
                        {p.series.name}
                        {p.series.episode ? ` · ${words[p.lang].episode} ${p.series.episode}` : ''}
                      </span>
                    )}
                    <time dateTime={p.date}>{formatDate(p.date, p.lang)}</time>
                  </span>
                  <span className="post-card-title">
                    {p.title}
                    {p.draft && <span className="post-draft">Draft</span>}
                  </span>
                  {p.description && <span className="post-card-text">{p.description}</span>}
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="posts-empty">The first post is on its way. Subscribe below and it comes straight to you.</p>
        )}

        <div id="subscribe">
          <Subscribe />
        </div>
      </main>
    </>
  )
}
