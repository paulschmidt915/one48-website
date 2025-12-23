
import React, { useState } from 'react';
import {
  ArrowRight, ArrowLeft, CheckCircle2, RefreshCw, Zap, Rocket,
  LayoutGrid, FileText, Sparkles, Mail, Database, Users,
  BarChart3, Search, MessageSquare, ClipboardList, MoreHorizontal,
  ChevronRight
} from 'lucide-react';

type QuestionType = 'single' | 'grid' | 'scales';

interface Option {
  label: string;
  highlight?: string;
  icon?: React.ReactNode;
}

interface ScaleItem {
  label: string;
}

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  questionParts?: (string | { text: string; highlight: boolean })[];
  description?: string;
  options?: Option[];
  scaleItems?: ScaleItem[];
  limit?: number;
}

const DecisionNavigator: React.FC = () => {
  const [step, setStep] = useState(-1); // -1 is Intro
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [otherInputs, setOtherInputs] = useState<Record<number, string>>({});

  const questions: Question[] = [
    {
      id: 0,
      type: 'single',
      question: "Woran würden Sie nach ein paar Wochen sagen: Das hat sich gelohnt?",
      questionParts: [
        "Woran würden Sie nach ein paar Wochen sagen: ",
        { text: "Das hat sich gelohnt?", highlight: true }
      ],
      options: [
        { label: "Messbare Zeitersparnis im Alltag", highlight: "Zeitersparnis" },
        { label: "Bessere Qualität & weniger Reibung", highlight: "Qualität" },
        { label: "Team kann selbstständig weiterarbeiten", highlight: "selbstständig" },
      ]
    },
    {
      id: 1,
      type: 'single',
      question: "Wo soll der erste sichtbare Effekt entstehen?",
      questionParts: [
        { text: "Wo", highlight: true },
        " soll der erste sichtbare ",
        { text: "Effekt", highlight: true },
        " entstehen?"
      ],
      options: [
        { label: "In einzelnen Teams / Rollen", highlight: "einzelnen Teams" },
        { label: "In einem Kernprozess", highlight: "Kernprozess" },
        { label: "Über mehrere Bereiche hinweg", highlight: "mehrere Bereiche" },
      ]
    },
    {
      id: 2,
      type: 'grid',
      limit: 2,
      question: "Wo verlieren Sie aktuell am meisten Zeit und Nerven?",
      questionParts: [
        "Wo ",
        { text: "verlieren", highlight: true },
        " Sie aktuell am meisten ",
        { text: "Zeit", highlight: true },
        " und Nerven?"
      ],
      description: "Bitte wählen Sie bis zu 2 Punkte aus.",
      options: [
        { label: "E-Mails & Dokumente", icon: <Mail className="w-5 h-5" /> },
        { label: "Admin & Datenpflege", icon: <Database className="w-5 h-5" /> },
        { label: "Meetings & Protokolle", icon: <Users className="w-5 h-5" /> },
        { label: "Reporting & Zahlen", icon: <BarChart3 className="w-5 h-5" /> },
        { label: "Wissenssuche", icon: <Search className="w-5 h-5" /> },
        { label: "Kundenanfragen", icon: <MessageSquare className="w-5 h-5" /> },
        { label: "Projektplanung", icon: <ClipboardList className="w-5 h-5" /> },
        { label: "Sonstiges", icon: <MoreHorizontal className="w-5 h-5" /> },
      ]
    },
    {
      id: 3,
      type: 'grid',
      question: "Welche Tools/Ansätze nutzen Sie bereits?",
      questionParts: [
        "Welche ",
        { text: "Tools/Ansätze", highlight: true },
        " nutzen Sie bereits?"
      ],
      description: "Wählen Sie alles Zutreffende aus.",
      options: [
        { label: "Microsoft 365 (Teams, SharePoint, Outlook)" },
        { label: "Microsoft Copilot" },
        { label: "ChatGPT / OpenAI" },
        { label: "Gemini" },
        { label: "Power Automate / Power Apps" },
        { label: "Zapier / Make" },
        { label: "Notion / Confluence / Wiki" },
        { label: "Jira / Asana / Trello" },
        { label: "BI/Reporting (Power BI, Tableau, Looker, …)" },
        { label: "CRM (HubSpot, Salesforce, …)" },
        { label: "Noch nichts davon/unsicher" },
        { label: "Andere (Freitextfeld)" },
      ]
    },
    {
      id: 4,
      type: 'scales',
      question: "Was ist Ihnen in der Zusammenarbeit besonders wichtig?",
      description: "Stellen Sie Ihren Fokus ein (0 = egal, 5 = sehr wichtig)",
      scaleItems: [
        { label: "Schnelle Umsetzung (Quick Wins)" },
        { label: "Nachhaltiges Team-Enablement" },
        { label: "Strategisches Sparring" }
      ]
    }
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(99); // Result step
    }
  };

  const handleBack = () => {
    if (step > -1) {
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
      if (limit && currentSelected.length >= limit) return;
      newSelected = [...currentSelected, optionLabel];
    }
    setAnswers({ ...answers, [step]: newSelected });
  };

  const handleScaleChange = (index: number, value: number) => {
    const currentScales = answers[step] || {};
    setAnswers({ ...answers, [step]: { ...currentScales, [index]: value } });
  };

  const resetQuiz = () => {
    setStep(-1);
    setAnswers({});
    setOtherInputs({});
  };

  const renderHighlightedText = (text: string, highlight?: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase()
            ? <span key={i} className="text-primary font-bold">{part}</span>
            : part
        )}
      </>
    );
  };

  const renderIntro = () => (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-8 animate-in fade-in zoom-in duration-700">
      <div className="mb-10 relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
        <div className="relative w-24 h-24 bg-white dark:bg-neutral-800 rounded-[1.5rem] border border-neutral-light dark:border-neutral-700 flex items-center justify-center shadow-2xl rotate-3">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
      </div>

      <h3 className="font-display text-4xl md:text-6xl font-bold mb-10 leading-tight tracking-tight">
        Wissen, was <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">möglich ist?</span>
      </h3>

      <div className="max-w-2xl mb-12 space-y-6">
        <p className="text-xl md:text-2xl text-text-light dark:text-text-dark font-medium leading-relaxed">
          Sie möchten wissen, welche Potenziale in Ihrem Unternehmen schlummern, bei deren Umsetzung wir Sie unterstützen können?
        </p>
        <p className="text-lg text-text-light/60 dark:text-text-dark/60">
          Nehmen Sie sich <span className="text-primary font-bold">nur 1 Minute Zeit</span> und beantworten Sie fünf kurze Fragen. Als Ergebnis erhalten Sie direkt ein <span className="text-secondary font-bold">kostenfreies Pitchdeck</span> mit konkreten Handlungsempfehlungen für Ihr Team.
        </p>
      </div>

      <button
        onClick={() => setStep(0)}
        className="group relative px-12 py-6 bg-text-light dark:bg-white text-white dark:text-background-dark font-display font-bold text-2xl rounded-2xl hover:shadow-[0_20px_50px_rgba(234,88,12,0.3)] transition-all hover:-translate-y-1 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10 flex items-center gap-4">
          Jetzt starten
          <Rocket className="w-7 h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </span>
      </button>

      <div className="mt-16 flex flex-wrap justify-center items-center gap-6 text-sm font-bold text-text-light/30 dark:text-text-dark/30 uppercase tracking-[0.1em]">
        <span className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> 5 Fragen</span>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
        <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Gratis Pitchdeck</span>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
        <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Sofort-Ergebnis</span>
      </div>
    </div>
  );

  const renderGridOption = (label: string, isSelected: boolean, icon?: React.ReactNode, limit?: number, isTools?: boolean, highlight?: string) => (
    <button
      key={label}
      onClick={() => handleMultiSelect(label, limit)}
      className={`${isTools ? 'aspect-[1.6/1]' : 'aspect-square'} flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center gap-2 group relative overflow-hidden
        ${isSelected
          ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/20 shadow-inner shadow-primary/10'
          : 'border-neutral-light dark:border-neutral-dark bg-white/50 dark:bg-neutral-800/30 hover:border-secondary/50 hover:bg-white dark:hover:bg-neutral-800'
        }`}
    >
      {icon && (
        <div className={`transition-all duration-300 ${isSelected ? 'scale-110 text-primary' : 'text-text-light/40 dark:text-text-dark/40 group-hover:text-secondary group-hover:scale-110'}`}>
          {icon}
        </div>
      )}
      {!icon && (
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors mb-1 ${isSelected ? 'bg-primary border-primary text-white shadow-sm' : 'border-neutral-300 dark:border-neutral-600'}`}>
          {isSelected ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
      )}
      <span className={`text-[10px] md:text-[11px] font-bold leading-tight px-1 uppercase tracking-tight ${isSelected ? 'text-primary' : 'text-text-light/80 dark:text-text-dark/80'}`}>
        {renderHighlightedText(label, highlight)}
      </span>
      {isSelected && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="w-4 h-4 text-primary opacity-50" />
        </div>
      )}
    </button>
  );

  const renderContent = () => {
    const currentQ = questions[step];
    if (!currentQ) return null;

    if (currentQ.type === 'single') {
      return (
        <div className="grid gap-3 max-w-xl mx-auto w-full">
          {currentQ.options?.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSingleSelect(opt.label)}
              className="group relative w-full flex items-center justify-between p-6 rounded-2xl border border-neutral-light dark:border-neutral-dark bg-white/50 dark:bg-neutral-800/30 hover:border-primary/50 hover:bg-white dark:hover:bg-neutral-800 transition-all text-left overflow-hidden"
            >
              <span className="font-semibold text-xl text-text-light dark:text-text-dark transition-colors">
                {renderHighlightedText(opt.label, opt.highlight)}
              </span>
              <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (currentQ.type === 'grid') {
      const isOtherSelected = (answers[step] || []).toString().includes('Sonstiges') || (answers[step] || []).toString().includes('Andere');
      const isToolsQuestion = currentQ.id === 3;

      return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentQ.options?.map((opt) => renderGridOption(
              opt.label,
              (answers[step] || []).includes(opt.label),
              opt.icon,
              currentQ.limit,
              isToolsQuestion,
              opt.highlight
            ))}
          </div>

          {isOtherSelected && (
            <div className="animate-in fade-in zoom-in duration-300 max-w-2xl mx-auto">
              <label className="block text-xs font-bold mb-3 text-text-light/40 dark:text-text-dark/40 uppercase tracking-widest">Bitte präzisieren Sie:</label>
              <textarea
                value={otherInputs[step] || ''}
                onChange={(e) => setOtherInputs({ ...otherInputs, [step]: e.target.value })}
                placeholder="Details eingeben..."
                className="w-full bg-white/50 dark:bg-neutral-800/50 border border-neutral-light dark:border-neutral-dark rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-light dark:text-text-dark min-h-[80px] text-sm"
              />
            </div>
          )}
        </div>
      );
    }

    if (currentQ.type === 'scales') {
      return (
        <div className="space-y-12 py-4 max-w-2xl mx-auto w-full">
          {currentQ.scaleItems?.map((item, idx) => {
            const val = (answers[step] && answers[step][idx]) !== undefined ? answers[step][idx] : 0;
            return (
              <div key={idx} className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-xl">{item.label}</label>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-display font-black text-primary transition-all scale-110">{val}</span>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 right-0 my-auto h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-300 shadow-[0_0_15px_rgba(234,88,12,0.4)]"
                      style={{ width: `${(val / 5) * 100}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min="0" max="5" step="1"
                    value={val}
                    onChange={(e) => handleScaleChange(idx, parseInt(e.target.value))}
                    className="relative w-full h-10 bg-transparent appearance-none cursor-pointer z-10 accent-primary"
                    style={{ WebkitAppearance: 'none' }}
                  />

                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
                    <ArrowRight className="w-8 h-8 text-primary" strokeWidth={3} />
                  </div>
                </div>

                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-text-light/30 dark:text-text-dark/30">
                  <span className="flex items-center gap-1">Nicht relevant</span>
                  <span className="flex items-center gap-1 text-primary/60">Sehr relevant <ChevronRight className="w-3 h-3" /></span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-24 relative z-10" id="check">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {step !== -1 && step !== 99 && (
          <div className="text-center mb-10 animate-in fade-in duration-500">
            <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">Schritt {step + 1} von {questions.length}</span>
            <div className="mt-4 flex justify-center gap-2">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-700 ${idx <= step ? 'w-10 bg-primary shadow-[0_0_15px_rgba(234,88,12,0.4)]' : 'w-4 bg-neutral-200 dark:bg-neutral-800'}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className={`glass bg-white/40 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden min-h-[650px] flex flex-col transition-all duration-1000 ${step === -1 ? 'bg-gradient-to-br from-white/70 to-white/30 dark:from-white/10 dark:to-transparent' : ''}`}>

          {step === -1 ? renderIntro() : step === 99 ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-[2rem] border border-green-500/20 flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="font-display text-5xl font-bold mb-6">Analyse abgeschlossen!</h3>
              <p className="text-xl text-text-light/60 dark:text-text-dark/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                Vielen Dank. Basierend auf Ihren Angaben haben wir drei konkrete Automatisierungs-Szenarien für Sie identifiziert. Wir erstellen nun Ihr individuelles Pitchdeck.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
                <button className="flex-1 px-10 py-5 bg-primary text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 text-lg hover:-translate-y-1">
                  Pitchdeck anfordern
                </button>
                <button onClick={resetQuiz} className="px-6 py-5 flex items-center justify-center gap-2 text-text-light/40 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark transition-colors font-bold uppercase tracking-widest text-xs">
                  <RefreshCw className="w-4 h-4" /> Neustarten
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="mb-14 text-center">
                <h3 className="text-3xl md:text-5xl font-display font-bold leading-tight max-w-4xl mx-auto tracking-tight">
                  {questions[step].questionParts ? (
                    questions[step].questionParts?.map((part, i) => (
                      typeof part === 'string'
                        ? part
                        : <span key={i} className="text-primary">{part.text}</span>
                    ))
                  ) : questions[step].question}
                </h3>
                {questions[step].description && (
                  <p className="mt-4 text-text-light/40 dark:text-text-dark/40 font-bold uppercase tracking-[0.1em] text-sm">
                    {questions[step].description}
                  </p>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center py-4">
                {renderContent()}
              </div>

              <div className="mt-14 pt-8 border-t border-neutral-light dark:border-neutral-dark flex justify-between items-center">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-light/30 dark:text-text-dark/30 hover:text-text-light dark:hover:text-text-dark transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zurück
                </button>

                {questions[step].type !== 'single' && (
                  <button
                    onClick={handleNext}
                    disabled={questions[step].type === 'grid' && (answers[step] || []).length === 0}
                    className="px-12 py-4 bg-text-light dark:bg-white text-white dark:text-background-dark rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-3 disabled:opacity-20 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    Weiter <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DecisionNavigator;
