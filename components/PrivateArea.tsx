
import React, { useState } from 'react';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

export default function PrivateArea() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);

    // Simple hardcoded password for MVP
    // Ideally this would be a hash check or server-side validation
    const SECRET_KEY = "one48private";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === SECRET_KEY) {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setPassword('');
            // Shake animation or visual feedback could be added here
        }
    };

    if (!isAuthenticated) {
        return (
            <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 flex flex-col items-center justify-center">
                <div className="max-w-md w-full glass rounded-2xl p-8 md:p-12 border border-neutral-light dark:border-neutral-dark shadow-2xl relative overflow-hidden">

                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-primary" />

                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4 text-primary">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-display font-bold mb-2">Private Access</h1>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Bitte geben Sie das Passwort ein, um auf diesen geschützten Bereich zuzugreifen.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                className={`w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border ${error ? 'border-red-500 focus:border-red-500' : 'border-neutral-light dark:border-neutral-dark focus:border-primary'
                                    } outline-none transition-all`}
                                placeholder="Passwort eingeben"
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-2 animate-pulse">
                                    Falsches Passwort. Bitte versuchen Sie es erneut.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-secondary to-primary text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <Unlock className="w-4 h-4" />
                            Zugang freischalten
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="/" className="text-sm text-neutral-500 hover:text-primary transition-colors inline-flex items-center gap-1">
                            Zurück zur Startseite
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="glass rounded-2xl p-8 md:p-12 border border-neutral-light dark:border-neutral-dark shadow-xl mb-8">
                    <div className="flex items-center gap-4 mb-6 border-b border-neutral-light dark:border-neutral-dark pb-6">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                            <Unlock className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-text-light dark:text-text-dark">
                                Interner Bereich
                            </h1>
                            <p className="text-primary">Willkommen im geschützten Bereich von one48</p>
                        </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed mb-6">
                            Hier finden Sie exklusive Inhalte, Dokumente und Ressourcen, die nur für autorisierte Personen zugänglich sind.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            {/* Placeholder Card 1 */}
                            <div className="bg-background-light dark:bg-background-dark/50 p-6 rounded-xl border border-neutral-light dark:border-neutral-dark hover:border-primary/50 transition-colors cursor-pointer group">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Dokumente</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4">Wichtige interne Unterlagen und Präsentationen.</p>
                                <div className="flex items-center text-secondary font-medium text-sm">
                                    Öffnen <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Placeholder Card 2 */}
                            <div className="bg-background-light dark:bg-background-dark/50 p-6 rounded-xl border border-neutral-light dark:border-neutral-dark hover:border-primary/50 transition-colors cursor-pointer group">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Ressourcen</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4">Tools, Links und weiterführende Materialien.</p>
                                <div className="flex items-center text-secondary font-medium text-sm">
                                    Ansehen <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
