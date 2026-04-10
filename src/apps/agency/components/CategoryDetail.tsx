'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { getCategory, type CategorySlug } from '@/apps/agency/data/categories'
import Cta from './Cta'

interface CategoryDetailProps {
  slug: CategorySlug
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ slug }) => {
  const router = useRouter()
  const category = getCategory(slug)

  const goToContact = () => router.push('/contact')

  return (
    <div className="pt-32 pb-10 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-text-light/60 dark:text-text-dark/60 hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zur Startseite
        </button>

        {/* ── Hero ── */}
        <section
          className="relative rounded-3xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(10, 14, 24, 0.6)',
            backdropFilter: 'blur(20px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
            border: `1px solid ${category.color}`,
            boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 80px ${category.glowColor}, 0 16px 64px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Background glow blob */}
          <div
            className="pointer-events-none absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-3xl"
            style={{ backgroundColor: category.accent, opacity: 0.18 }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-8 sm:p-12 lg:p-16">
            {/* Left: Text */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium mb-6">
                {category.num} · Schwerpunkt
              </span>
              <h1 className="font-display font-bold tracking-tight text-white text-4xl sm:text-5xl xl:text-6xl mb-4">
                {category.title}
              </h1>
              <p
                className="font-accent italic text-xl sm:text-2xl mb-8"
                style={{ color: category.accent }}
              >
                {category.slogan}
              </p>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
                {category.longDescription}
              </p>
              <div>
                <button
                  onClick={goToContact}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-text-light dark:bg-white text-white dark:text-background-dark font-medium rounded-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Erstgespräch vereinbaren
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Icon(s) */}
            <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[280px] sm:min-h-[360px]">
              {/* Concentrated glow behind icon */}
              <div
                className="absolute inset-10 rounded-full blur-3xl"
                style={{ backgroundColor: category.accent, opacity: 0.22 }}
              />

              {category.icons ? (
                <div className="relative flex items-center justify-center gap-4 sm:gap-8">
                  {category.icons.map((src) => (
                    <div
                      key={src}
                      className="relative w-36 h-36 sm:w-48 sm:h-48 xl:w-56 xl:h-56 transition-transform duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-[-2deg]"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width:1280px) 224px, (min-width:640px) 192px, 144px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  ))}
                </div>
              ) : category.icon ? (
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 xl:w-96 xl:h-96 transition-transform duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-[-2deg]">
                  <Image
                    src={category.icon}
                    alt=""
                    fill
                    sizes="(min-width:1280px) 384px, (min-width:640px) 320px, 256px"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* ── Highlights Grid ── */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium text-white/40">
              Was uns ausmacht
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold text-white">
              Vier <span className="font-accent italic" style={{ color: category.accent }}>Schwerpunkte</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {category.highlights.map((h, i) => (
              <div
                key={h.title}
                className="relative rounded-3xl p-8 overflow-hidden transition-transform duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: 'rgba(10, 14, 24, 0.5)',
                  backdropFilter: 'blur(20px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                  border: `1px solid ${category.color.replace('0.4', '0.25')}`,
                  boxShadow:
                    'inset 0 1px 0 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  className="pointer-events-none absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl"
                  style={{ backgroundColor: category.accent, opacity: 0.06 }}
                />
                <span
                  className="relative block text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
                  style={{ color: category.accent }}
                >
                  0{i + 1}
                </span>
                <h3 className="relative font-display text-xl font-bold text-white mb-3">
                  {h.title}
                </h3>
                <p className="relative text-sm text-white/65 leading-relaxed">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Offerings ── */}
        <section className="mt-20">
          <div
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16"
            style={{
              backgroundColor: 'rgba(10, 14, 24, 0.6)',
              backdropFilter: 'blur(20px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow:
                'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 16px 64px rgba(0,0,0,0.4)',
            }}
          >
            <div
              className="pointer-events-none absolute -bottom-1/3 -left-1/4 w-2/3 h-2/3 rounded-full blur-3xl"
              style={{ backgroundColor: category.accent, opacity: 0.1 }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium text-white/40">
                  Ergebnisse
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-display font-bold text-white">
                  Was du <span className="font-accent italic" style={{ color: category.accent }}>bekommst</span>
                </h2>
              </div>

              <ul className="lg:col-span-8 space-y-4">
                {category.offerings.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 text-white/80 text-base sm:text-lg leading-relaxed"
                  >
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        backgroundColor: `${category.accent}22`,
                        border: `1px solid ${category.color}`,
                      }}
                    >
                      <Check className="w-4 h-4" style={{ color: category.accent }} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* ── Bottom CTA ── */}
      <Cta onNavigateContact={goToContact} />
    </div>
  )
}

export default CategoryDetail
