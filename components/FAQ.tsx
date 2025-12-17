import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Für welche Unternehmensgröße ist one48 geeignet?",
      answer: "Wir arbeiten primär mit mittelständischen Unternehmen (KMU) und innovativen Abteilungen von Konzernen, die agile Transformationsprojekte umsetzen wollen."
    },
    {
      question: "Wie lange dauert ein typisches Beratungsprojekt?",
      answer: "Das variiert stark. Ein initialer Strategie-Sprint dauert oft 2-3 Wochen. Implementierungsprojekte begleiten wir meist über 3-6 Monate."
    },
    {
      question: "Muss ich bereits technische Expertise im Haus haben?",
      answer: "Nein. Wir fungieren als Ihr technischer Partner. Ziel ist es aber immer, Wissen in Ihr Team zu transferieren (Enablement), damit Sie langfristig unabhängig bleiben."
    },
    {
      question: "Wie wird abgerechnet?",
      answer: "Wir arbeiten meist auf Projektbasis mit festen Deliverables, bieten aber auch Retainer-Modelle für langfristige Begleitung an."
    }
  ];

  return (
    <section className="py-24 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold mb-4">Häufig gestellte Fragen</h2>
          <p className="text-text-light/60 dark:text-text-dark/60">
            Alles was Sie wissen müssen, bevor wir starten.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border border-neutral-light dark:border-neutral-dark rounded-xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-background-light dark:bg-background-dark shadow-md' : 'bg-transparent'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium font-display text-lg pr-4">{faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                )}
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;