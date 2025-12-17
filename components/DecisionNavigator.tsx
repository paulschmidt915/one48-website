import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';

type QuestionType = 'single' | 'multi-limited' | 'scales' | 'multi' | 'text';

interface Option {
  label: string;
  isCustom?: boolean;
}

interface ScaleItem {
  label: string;
  minLabel?: string;
  maxLabel?: string;
}

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  description?: string;
  options?: Option[];
  scaleItems?: ScaleItem[];
  limit?: number; // For multi-limited
}

const DecisionNavigator: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});

  // Configuration of the 5 Questions
  const questions: Question[] = [
    {
      id: 0,
      type: 'single',
      question: "Wenn one48 EINE Sache für Sie spürbar verbessern dürfte – was wäre das?",
      options: [
        { label: "Weniger manuelle Arbeit" },
        { label: "Mehr Qualität & Klarheit" },
        { label: "KI im Team sicher nutzen" },
      ]
    },
    {
      id: 1,
      type: 'multi-limited',
      limit: 2,
      question: "Wo verlieren Sie aktuell am meisten Zeit und Nerven?",
      description: "Bitte wählen Sie bis zu 2 Punkte aus.",
      options: [
        { label: "E-Mails & Dokumente (erstellen, zusammenfassen)" },
        { label: "Admin & Datenpflege (Copy/Paste, Listen)" },
        { label: "Meetings & Abstimmung (Protokolle, To-dos)" },
        { label: "Reporting & Zahlenarbeit" },
        { label: "Wissenssuche & Onboarding" },
        { label: "Kundenanfragen & Service" },
        { label: "Anderes", isCustom: true },
      ]
    },
    {
      id: 2,
      type: 'scales',
      question: "Was wünschen Sie sich von one48?",
      description: "Stellen Sie Ihren Fokus ein (0 = egal, 5 = sehr wichtig)",
      scaleItems: [
        { label: "Umsetzung im Prozess (Workflows bauen)" },
        { label: "Workshops & Trainings (Literacy/Enablement)" },
        { label: "Sparring & Struktur (Rahmen, Priorisierung)" }
      ]
    },
    {
      id: 3,
      type: 'multi',
      question: "Welche Tools/Ansätze nutzen ihr bereits?",
      options: [
        { label: "Microsoft 365 (Teams, SharePoint, Outlook)" },
        { label: "Microsoft Copilot" },
        { label: "ChatGPT / OpenAI" },
        { label: "Gemini" },
        { label: "Power Automate / Power Apps" },
        { label: "Zapier / Make" },
        { label: "Notion / Confluence / Wiki" },
        { label: "Jira / Asana / Trello" },
        { label: "BI/Reporting (Power BI, Tableau, ...)" },
        { label: "CRM (HubSpot, Salesforce, ...)" },
        { label: "KI-Richtlinien / Datenschutz-Freigabe" },
        { label: "Noch nichts davon / unsicher" },
        { label: "Andere", isCustom: true },
      ]
    },
    {
      id: 4,
      type: 'text',
      question: "Ist Ihnen etwas gerade noch wichtig hinzuzufügen?",
      description: "Optional: 1–3 Sätze"
    }
  ];

  const result = {
    title: "Vielen Dank für Ihre Einschätzung!",
    description: "Wir haben Ihre Schwerpunkte analysiert. Basierend auf Ihren Angaben wäre ein initiales Strategie-Gespräch der effektivste nächste Schritt, um diese Potenziale konkret zu heben.",
    action: "Ergebnisse besprechen & Termin wählen"
  };

  // --- Handlers ---

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSingleSelect = (optionLabel: string) => {
    setAnswers({ ...answers, [step]: optionLabel });
    handleNext();
  };

  const handleMultiSelect = (optionLabel: string, limit?: number) => {
    const currentSelected: string[] = answers[step] || [];
    const isSelected = currentSelected.includes(optionLabel);

    let newSelected;
    if (isSelected) {
      newSelected = currentSelected.filter(item => item !== optionLabel);
    } else {
      if (limit && currentSelected.length >= limit) return; // Limit reached
      newSelected = [...currentSelected, optionLabel];
    }
    setAnswers({ ...answers, [step]: newSelected });
  };

  const handleScaleChange = (index: number, value: number) => {
    const currentScales = answers[step] || {};
    setAnswers({ ...answers, [step]: { ...currentScales, [index]: value } });
  };

  const handleTextChange = (text: string) => {
    setAnswers({ ...answers, [step]: text });
  };

  const handleCustomInputChange = (key: string, value: string) => {
    setCustomInputs({ ...customInputs, [key]: value });
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setCustomInputs({});
  };

  // --- Render Helpers ---

  const renderSpotlightButton = (
    label: string,
    onClick: () => void,
    isSelected: boolean,
    isMulti: boolean = false,
    hasCustomInput: boolean = false
  ) => {
    return (
      <div key={label} className="w-full">
        <button
          onClick={onClick}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty('--x', `${x}px`);
            e.currentTarget.style.setProperty('--y', `${y}px`);
          }}
          className={`group relative w-full flex items-center justify-between p-4 md:p-5 rounded-xl border transition-all text-left overflow-hidden 
            ${isSelected
              ? 'border-primary bg-primary/5 dark:bg-primary/10'
              : 'border-neutral-light dark:border-neutral-dark bg-surface-light/50 dark:bg-surface-dark/50 hover:border-secondary/50'
            }`}
        >
          {/* Spotlight Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(37, 99, 235, 0.1) 0%, transparent 60%)`
            }}
          />

          <div className="flex items-center gap-3 relative z-10">
            {isMulti && (
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary text-white' : 'border-neutral-400'}`}>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            )}
            <span className={`font-medium text-lg ${isSelected ? 'text-primary' : 'text-text-light dark:text-text-dark'}`}>
              {label}
            </span>
          </div>

          {!isMulti && (
            <ArrowRight className={`relative z-10 w-5 h-5 transition-colors group-hover:translate-x-1 ${isSelected ? 'text-primary' : 'text-neutral-400 group-hover:text-secondary'}`} />
          )}
        </button>

        {/* Render Custom Input field below button if selected and required */}
        {hasCustomInput && isSelected && (
          <div className="mt-2 animate-in fade-in slide-in-from-top-2">
            <input
              type="text"
              placeholder="Bitte spezifizieren..."
              value={customInputs[label] || ''}
              onChange={(e) => handleCustomInputChange(label, e.target.value)}
              className="w-full p-3 rounded-lg border border-neutral-light dark:border-neutral-dark bg-white dark:bg-black/20 focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    const currentQ = questions[step];

    switch (currentQ.type) {
      case 'single':
        return (
          <div className="grid gap-3">
            {currentQ.options?.map((opt) => (
              renderSpotlightButton(
                opt.label,
                () => handleSingleSelect(opt.label),
                answers[step] === opt.label
              )
            ))}
          </div>
        );

      case 'multi-limited':
      case 'multi':
        return (
          <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {currentQ.options?.map((opt) => (
              renderSpotlightButton(
                opt.label,
                () => handleMultiSelect(opt.label, currentQ.limit),
                (answers[step] || []).includes(opt.label),
                true,
                opt.isCustom
              )
            ))}
          </div>
        );

      case 'scales':
        return (
          <div className="space-y-8 py-4">
            {currentQ.scaleItems?.map((item, idx) => {
              const val = (answers[step] && answers[step][idx]) !== undefined ? answers[step][idx] : 0; // default 0
              return (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="font-medium text-lg">{item.label}</label>
                    <span className="text-primary font-bold text-xl">{val}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={val}
                    onChange={(e) => handleScaleChange(idx, parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-text-light/50 dark:text-text-dark/50 uppercase tracking-wider">
                    <span>Egal (0)</span>
                    <span>Wichtig (5)</span>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'text':
        return (
          <div className="py-2">
            <textarea
              value={answers[step] || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Dann sagen Sie es uns hier..."
              className="w-full h-40 p-4 rounded-xl border border-neutral-light dark:border-neutral-dark bg-surface-light/50 dark:bg-surface-dark/50 focus:outline-none focus:border-primary transition-colors resize-none text-lg"
            />
          </div>
        );

      default:
        return null;
    }
  };

  // --- Main Render ---

  return (
    <section className="py-20 relative z-10" id="check">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-primary font-medium tracking-wider text-sm uppercase">Decision Navigator</span>
          <h2 className="text-3xl font-display font-bold mt-2">Finden Sie den richtigen Ansatz.</h2>
        </div>

        <div className="glass bg-surface-light/60 dark:bg-surface-dark/60 rounded-2xl p-6 md:p-12 border border-neutral-light dark:border-neutral-dark shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1.5 bg-neutral-100 dark:bg-neutral-800 w-full">
            <div
              className="h-full bg-secondary transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / (questions.length + 1)) * 100}%` }}
            ></div>
          </div>

          {step < questions.length ? (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">

              <div className="mb-8 text-center">
                <span className="text-sm font-medium text-text-light/40 dark:text-text-dark/40 mb-2 block">
                  Frage {step + 1} von {questions.length}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-medium">
                  {questions[step].question}
                </h3>
                {questions[step].description && (
                  <p className="mt-2 text-text-light/60 dark:text-text-dark/60">
                    {questions[step].description}
                  </p>
                )}
              </div>

              <div className="flex-1 max-w-2xl mx-auto w-full">
                {renderContent()}
              </div>

              {/* Navigation Footer for complex steps */}
              {questions[step].type !== 'single' && (
                <div className="mt-8 pt-6 border-t border-neutral-light dark:border-neutral-dark flex justify-between items-center max-w-2xl mx-auto w-full">
                  <button
                    onClick={handleBack}
                    disabled={step === 0}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-text-light/60 hover:text-text-light dark:text-text-dark/60 dark:hover:text-text-dark'}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Zurück
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-2"
                  >
                    Weiter <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              {/* Back button for single choice (only needs to appear if step > 0) */}
              {questions[step].type === 'single' && step > 0 && (
                <div className="mt-8 pt-6 border-t border-neutral-light dark:border-neutral-dark flex justify-start max-w-2xl mx-auto w-full">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm font-medium text-text-light/60 hover:text-text-light dark:text-text-dark/60 dark:hover:text-text-dark transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Zurück
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">{result.title}</h3>
              <p className="text-lg text-text-light/70 dark:text-text-dark/70 mb-10 max-w-xl mx-auto leading-relaxed">
                {result.description}
              </p>

              <div className="bg-surface-light dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark p-6 rounded-xl w-full max-w-md mb-8 text-left">
                <h4 className="text-sm font-bold uppercase text-text-light/40 dark:text-text-dark/40 mb-4 tracking-wider">Ihre Zusammenfassung</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-neutral-light dark:border-neutral-dark pb-2">
                    <span className="text-text-light/60">Fokus:</span>
                    <span className="font-medium text-right">{answers[0]}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-light dark:border-neutral-dark pb-2">
                    <span className="text-text-light/60">Pain Points:</span>
                    <span className="font-medium text-right">{Array.isArray(answers[1]) ? answers[1].length : 0} ausgewählt</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
                <button className="flex-1 px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 text-lg">
                  {result.action}
                </button>
                <button onClick={resetQuiz} className="px-6 py-4 flex items-center justify-center gap-2 text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark transition-colors border border-transparent hover:border-neutral-light dark:hover:border-neutral-dark rounded-xl">
                  <RefreshCw className="w-4 h-4" /> Neu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DecisionNavigator;