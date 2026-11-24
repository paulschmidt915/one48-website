import Image from 'next/image'
import Link from 'next/link'
import Backdrop from '@/components/Backdrop'
import Headline from '@/components/Headline'
import { site } from '@/site'

export default function Home() {
  return (
    <>
      <Backdrop />
      <main className="home">
        <header className="home-top">
          <span className="mark">one48</span>
          <Link href="/legal" className="quiet">
            Legal
          </Link>
        </header>

        <div>
          <div className="intro">
            <div className="portrait">
              <Image src="/paul.webp" alt={`Portrait of ${site.name}`} width={480} height={480} sizes="104px" priority />
            </div>
            <div>
              <p className="who">{site.name}</p>
              <p className="meta">{site.meta}</p>
            </div>
          </div>
          <Headline breaks={site.phraseBreaks}>{site.phrase}</Headline>
          <p className="about">
            {site.about.map((part, i) =>
              typeof part === 'string' ? (
                part
              ) : (
                <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
                  {part.label}
                </a>
              )
            )}
          </p>
        </div>
      </main>
    </>
  )
}
