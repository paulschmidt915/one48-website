import Image from 'next/image'
import Link from 'next/link'
import Backdrop from '@/components/Backdrop'
import Headline from '@/components/Headline'
import Pager from '@/components/Pager'
import Parts from '@/components/Parts'
import Projects from '@/components/Projects'
import { site } from '@/site'

export default function Home() {
  return (
    <>
      <Backdrop />
      <Pager />
      <main className="home page" id="top">
        <header className="home-top">
          <span className="mark">one48</span>
          <nav className="home-nav">
            <a href="#projects" className="quiet">
              Projects
            </a>
            <Link href="/legal" className="quiet">
              Legal
            </Link>
          </nav>
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
          <p className="about rich">
            <Parts parts={site.about} />
          </p>
        </div>
      </main>

      <section className="home projects page" id="projects" aria-labelledby="projects-title">
        <header className="home-top">
          <span className="mark">Projects</span>
          <a href="#top" className="quiet">
            Back to top
          </a>
        </header>

        <div>
          <h2 className="projects-title" id="projects-title">
            Things I make.
          </h2>
          <Projects projects={site.projects} />
        </div>
      </section>
    </>
  )
}
