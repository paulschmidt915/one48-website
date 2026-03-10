'use client'

import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Book, BarChart3, Lock } from 'lucide-react';

interface PrivateAreaProps {
    onNavigate: (view: 'landing' | 'contact' | 'legal' | 'private' | 'planner') => void;
}

export default function PrivateArea({ onNavigate }: PrivateAreaProps) {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);

    // Simple hardcoded password for MVP
    const SECRET_KEY = "one48";

    // Check session storage on mount to persist login during navigation
    useEffect(() => {
        const auth = sessionStorage.getItem('one48-auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === SECRET_KEY) {
            setIsAuthenticated(true);
            sessionStorage.setItem('one48-auth', 'true');
            setError(false);
        } else {
            setError(true);
            setPassword('');
        }
    };

    if (!isAuthenticated) {
        return (
            <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 flex flex-col items-center justify-center animate-in fade-in duration-700">
                <div className="max-w-xs w-full">

                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-display font-medium mb-2 text-text-light dark:text-text-dark tracking-tight">Private Access</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                className="w-full px-4 py-3 bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-primary outline-none transition-colors text-center placeholder-text-light/30 dark:placeholder-text-dark/30"
                                placeholder="Passwort"
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-500 text-xs text-center mt-2">
                                    Zugriff verweigert.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-text-light dark:bg-white text-white dark:text-background-dark font-medium py-3 rounded-lg hover:opacity-90 transition-all text-sm"
                        >
                            Enter
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <button
                            onClick={() => onNavigate('landing')}
                            className="text-xs text-text-light/30 dark:text-text-dark/30 hover:text-text-light dark:hover:text-text-dark transition-colors"
                        >
                            Zurück zur Startseite
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // AUTHENTICATED STATE: "App Store" View
    return (
        <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-neutral-light dark:border-neutral-dark pb-6">
                    <div>
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Internal Area</span>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-light dark:text-text-dark">
                            Apps & Tools
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            setIsAuthenticated(false);
                            sessionStorage.removeItem('one48-auth');
                        }}
                        className="text-sm font-medium text-text-light/40 dark:text-text-dark/40 hover:text-primary transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Active App: Planner */}
                    <button
                        onClick={() => onNavigate('planner')}
                        className="group text-left glass bg-white/40 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark rounded-3xl p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                            <Calendar className="w-24 h-24 text-primary" />
                        </div>

                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Calendar className="w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">one48 Planner</h3>
                        <p className="text-sm text-text-light/60 dark:text-text-dark/60 mb-8 leading-relaxed">
                            AI-gestützer Weekly Planner
                        </p>

                        <div className="flex items-center text-primary font-bold text-xs uppercase tracking-widest">
                            Öffnen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                    {/* Placeholder: Knowledge Base */}
                    <div className="opacity-60 cursor-not-allowed glass bg-neutral-100/50 dark:bg-white/5 border border-transparent rounded-3xl p-8 relative overflow-hidden grayscale">
                        <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 mb-6">
                            <Book className="w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-neutral-500">Knowledge Base</h3>
                        <p className="text-sm text-text-light/40 dark:text-text-dark/40 mb-8 leading-relaxed">
                            Zentraler Zugriff auf interne Dokumentationen und Assets.
                        </p>

                        <div className="flex items-center text-neutral-400 font-bold text-xs uppercase tracking-widest">
                            <Lock className="w-3 h-3 mr-2" /> Bald verfügbar
                        </div>
                    </div>

                    {/* Placeholder: Analytics */}
                    <div className="opacity-60 cursor-not-allowed glass bg-neutral-100/50 dark:bg-white/5 border border-transparent rounded-3xl p-8 relative overflow-hidden grayscale">
                        <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 mb-6">
                            <BarChart3 className="w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-neutral-500">Analytics</h3>
                        <p className="text-sm text-text-light/40 dark:text-text-dark/40 mb-8 leading-relaxed">
                            Performance-Daten und Projekt-Dashboards.
                        </p>

                        <div className="flex items-center text-neutral-400 font-bold text-xs uppercase tracking-widest">
                            <Lock className="w-3 h-3 mr-2" /> Bald verfügbar
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
