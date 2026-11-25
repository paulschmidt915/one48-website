// Sends a blog post to the newsletter subscribers as a Resend broadcast.
//
//   npm run newsletter -- <slug>                  draft in Resend, to look at and send from the dashboard
//   npm run newsletter -- <slug> --test <email>   the e-mail to one address only, to see how it looks
//   npm run newsletter -- <slug> --send           send it to all subscribers now
//
// Needs RESEND_API_KEY in .env.local. Push the post first: the e-mail links to it on the website,
// and --send stops while the post is not live yet.

import fs from 'node:fs'
import { Resend } from 'resend'
import { formatDate, getPost } from '../src/lib/posts.ts'
import { newsletter, postEmail } from '../src/lib/newsletter.ts'

if (fs.existsSync('.env.local')) process.loadEnvFile('.env.local')

const args = process.argv.slice(2)
const slug = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--test')
const send = args.includes('--send')
const test = args.includes('--test') ? args[args.indexOf('--test') + 1] : null

const stop = (message) => {
  console.error(`\n  ${message}\n`)
  process.exit(1)
}

if (!slug) stop('Which post? npm run newsletter -- <slug> [--test <email> | --send]')
if (args.includes('--test') && !test) stop('--test needs an e-mail address.')
if (!process.env.RESEND_API_KEY) stop('RESEND_API_KEY is missing in .env.local.')

const post = getPost(slug, true)
if (!post) stop(`There is no post content/blog/${slug}.md.`)

const resend = new Resend(process.env.RESEND_API_KEY)
const email = postEmail({ ...post, dateLabel: formatDate(post.date) })
const name = `Blog: ${post.slug}`

if (test) {
  const { error } = await resend.emails.send({
    from: newsletter.from,
    replyTo: newsletter.replyTo,
    to: test,
    subject: `[Test] ${email.subject}`,
    html: email.html.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', `${newsletter.siteUrl}/blog`),
  })
  if (error) stop(error.message)
  console.log(`\n  Test e-mail for "${post.title}" sent to ${test}.\n`)
  process.exit(0)
}

if (post.draft) stop(`"${post.title}" is still a draft. Remove "draft: true" and push it first.`)

// Never twice: a broadcast for this post that is already sent or on its way.
const { data: list, error: listError } = await resend.broadcasts.list()
if (listError) stop(listError.message)
const earlier = list.data.find((b) => b.name === name && b.status !== 'draft')
if (earlier) stop(`"${post.title}" already went out (${earlier.status}). Nothing sent.`)
// An older draft of the same post is replaced by this one.
for (const b of list.data.filter((b) => b.name === name)) await resend.broadcasts.remove(b.id)

if (send) {
  const res = await fetch(`${newsletter.siteUrl}/blog/${post.slug}`, { method: 'HEAD' }).catch(() => null)
  if (!res?.ok) stop(`${newsletter.siteUrl}/blog/${post.slug} is not live yet. Push and wait for the deploy, then try again.`)
}

const { data, error } = await resend.broadcasts.create({
  name,
  segmentId: newsletter.segmentId,
  from: newsletter.from,
  replyTo: newsletter.replyTo,
  subject: email.subject,
  previewText: email.previewText,
  html: email.html,
  ...(send ? { send: true } : {}),
})
if (error) stop(error.message)

console.log(
  send
    ? `\n  "${post.title}" is on its way to all subscribers.\n`
    : `\n  Draft for "${post.title}" is ready: https://resend.com/broadcasts/${data.id}\n  Look at it there and send it, or run this again with --send.\n`
)
