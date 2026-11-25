import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Backdrop from '@/components/Backdrop'
import RollLink from '@/components/RollLink'
import Subscribe from '@/components/Subscribe'
import { formatDate, getPost, getPosts } from '@/lib/posts'
import { site } from '@/site'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const url = `${site.url}/blog/${post.slug}`
  return {
    title: `${post.title} – ${site.name}`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.description, url, siteName: 'one48', type: 'article', publishedTime: post.date },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  return (
    <>
      <Backdrop />
      <main className="blog">
        <header className="blog-top">
          <RollLink href="/blog">All posts</RollLink>
        </header>

        <article>
          <header className="post-head">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <h1 className="post-title">{post.title}</h1>
          </header>
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <Subscribe title="Liked it? Get the next one by e-mail." />
      </main>
    </>
  )
}
