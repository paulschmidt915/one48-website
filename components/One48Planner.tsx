
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  ArrowLeft, Settings, Plus, X, MessageSquare,
  Clock, Trash2, Check, Download, UploadCloud, Loader2, LogOut, CalendarCheck, FileText,
  Bold, Italic, Underline, List, ListOrdered, Mic
} from 'lucide-react';

import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ref, onValue, set, push, remove, update } from 'firebase/database';
import { auth, db, firebaseConfig } from '../firebase';
import { processAiRequest } from '../services/gemini';
import { recordAudio } from '../services/audiohelper';

// --- Google API Config ---

const API_KEY = firebaseConfig.apiKey;
// const DISCOVERY_DOC = ...; // Not used to avoid restricted key error
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

// --- Types ---

type Category = {
  id: string;
  name: string;
  color: string;
  googleColorId?: string; // 1-11 mapping for GCal
};

type Task = {
  id: string;
  title: string;
  categoryId: string;
  durationMins: number;
  subtitle?: string;
  notes?: string;
  isAllDay?: boolean;
};

type ScheduledEvent = Task & {
  dayIndex: number; // 0 = Mon, 1 = Tue...
  timeSlot: string; // "09:00"
};

// Flexible type for editing to handle transition between scheduled and unassigned
type EditableEvent = Task & {
  dayIndex?: number;
  timeSlot?: string;
  isAllDay?: boolean;
};

type Rule = {
  id: string;
  text: string;
};

type WeeklyRoutine = {
  id: string;
  title: string;
  categoryId: string;
  durationMins: number;
};

// --- Constants & Config ---

// Updated Categories with approximate Google Calendar Color IDs
// 1: Lavender, 2: Sage, 3: Grape, 4: Flamingo, 5: Banana, 6: Tangerine, 7: Peacock, 8: Graphite, 9: Blueberry, 10: Basil, 11: Tomato
const INITIAL_CATEGORIES: Category[] = [
  { id: 'workout', name: 'Workout', color: 'blue', googleColorId: '9' },
  { id: 'work', name: 'Work', color: 'gray', googleColorId: '8' },
  { id: 'todo', name: 'To Do', color: 'orange', googleColorId: '6' },
  { id: 'daily', name: 'Daily', color: 'emerald', googleColorId: '10' },
  { id: 'meals', name: 'Meals', color: 'amber', googleColorId: '5' },
];



const INITIAL_SCHEDULE: ScheduledEvent[] = [];

const INITIAL_RULES: Rule[] = [];

// Config for the calendar grid
const START_HOUR = 0; // 00:00
const END_HOUR = 24;  // 24:00 (Midnight)
const HOURS_COUNT = END_HOUR - START_HOUR;
const PIXELS_PER_HOUR = 60; // Height of one hour slot
const PIXELS_PER_MINUTE = PIXELS_PER_HOUR / 60;
const SNAP_MINUTES = 15; // Granularity for dropping/resizing

// Generate time labels for the left axis
const TIME_LABELS = Array.from({ length: HOURS_COUNT + 1 }, (_, i) => {
  const h = START_HOUR + i;
  return `${h.toString().padStart(2, '0')}:00`;
});

// Duration Options for Dropdown
const DURATION_OPTIONS = [15, 30, 45, 60, 90, 120, 150, 180, 240, 300, 360, 480];

// --- Helper Functions ---

const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
  const start = new Date(d.setDate(diff));
  start.setHours(0, 0, 0, 0);
  return start;
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDate = (date: Date) => {
  return date.getDate().toString();
};



// Convert "09:30" to minutes from start of day (e.g. 08:00 is minute 0 relative to grid)
const getMinutesFromStart = (timeSlot: string) => {
  const [h, m] = timeSlot.split(':').map(Number);
  return (h - START_HOUR) * 60 + m;
};

// Convert minutes from start of day to "HH:MM"
const formatTimeFromMinutes = (minsFromStart: number) => {
  const totalMins = (START_HOUR * 60) + minsFromStart;
  const h = Math.floor(totalMins / 60);
  const m = Math.floor(totalMins % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

// Generate 15-minute intervals for dropdown
const generateTimeOptions = () => {
  const options = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    for (let m = 0; m < 60; m += 15) {
      const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      options.push(time);
    }
  }
  return options;
};

const TIME_DROPDOWN_OPTIONS = generateTimeOptions();


// --- Helper Component: TaskCard ---

interface TaskCardProps {
  task: Task;
  category?: Category;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent, id: string, type: 'task' | 'event') => void;
  onDragEnd?: () => void;
  onClick?: () => void;
  isScheduled?: boolean;
  onResizeStart?: (e: React.MouseEvent, id: string) => void;
  style?: React.CSSProperties; // Allow passing absolute positioning
  isPast?: boolean;
}

const TaskCard = ({ task, category, isDraggable = false, onDragStart, onDragEnd, onClick, isScheduled, onResizeStart, style, isPast }: TaskCardProps) => {
  const colorBase = category?.color || 'gray';

  const badgeStyle = {
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    amber: 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200',
  }[colorBase];

  // Border and Background styles
  const borderStyle = {
    orange: 'border-l-orange-500',
    emerald: 'border-l-emerald-500',
    blue: 'border-l-blue-500',
    purple: 'border-l-purple-500',
    gray: 'border-l-gray-500',
    amber: 'border-l-amber-500',
  }[colorBase];

  const subtleBg = isScheduled
    ? {
      orange: 'bg-orange-50/70 dark:bg-orange-900/20',
      emerald: 'bg-emerald-50/70 dark:bg-emerald-900/20',
      blue: 'bg-blue-50/70 dark:bg-blue-900/20',
      purple: 'bg-purple-50/70 dark:bg-purple-900/20',
      gray: 'bg-gray-50/70 dark:bg-neutral-800/40',
      amber: 'bg-amber-50/70 dark:bg-amber-900/20',
    }[colorBase]
    : 'bg-white dark:bg-surface-dark';

  // Base classes for both scheduled and list items
  const baseClasses = `${subtleBg} p-2 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 group cursor-grab active:cursor-grabbing hover:shadow-md transition-all border-l-4 ${borderStyle} flex flex-col justify-start overflow-hidden ${isPast ? 'opacity-40 grayscale-[0.2] contrast-[0.9]' : ''}`;

  // --- Scheduled Event Render ---
  if (isScheduled) {
    return (
      <div
        draggable={isDraggable}
        onDragStart={(e) => {
          if (isDraggable && onDragStart) onDragStart(e, task.id, 'event');
        }}
        onDragEnd={onDragEnd}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
        style={style}
        className={`${baseClasses} absolute w-[95%] left-[2.5%] z-10 ${task.durationMins <= 15 ? 'py-0 px-1.5' : 'p-1.5'} text-xs ring-1 ring-inset ring-black/5 dark:ring-white/5`}
      >
        <h4 className="font-bold text-text-light dark:text-text-dark pointer-events-none leading-tight break-words">
          {task.title}
          {task.notes && <FileText className="inline-block w-2.5 h-2.5 ml-1 opacity-50" />}
        </h4>

        {/* Resize Handle */}
        {onResizeStart && (
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-opacity z-20"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onResizeStart(e, task.id);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-6 h-0.5 rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
          </div>
        )}
      </div>
    );
  }

  // --- Unassigned Task List Item Render ---
  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => isDraggable && onDragStart && onDragStart(e, task.id, 'task')}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="relative mb-3 flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-secondary transition-all cursor-pointer group shadow-sm hover:shadow-md"
    >
      <div className="w-10 flex flex-col items-center justify-center shrink-0">
        <Clock className="w-4 h-4 text-neutral-400 group-hover:text-secondary mb-1" />
        <span className="text-[10px] font-bold text-neutral-500">{task.durationMins}m</span>
      </div>

      <div className={`w-1 h-10 rounded-full bg-${colorBase}-500 shrink-0`}></div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-text-light dark:text-text-dark leading-tight line-clamp-1 group-hover:text-secondary transition-colors">
          {task.title}
        </h4>
        <div className="flex items-center mt-1">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${badgeStyle}`}>
            {category?.name || 'Unassigned'}
          </span>
          {task.notes && <FileText className="w-3 h-3 ml-2 text-neutral-400" />}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

interface One48PlannerProps {
  onBack: () => void;
}

const One48Planner: React.FC<One48PlannerProps> = ({ onBack }) => {
  // State
  const [currentDate] = useState(new Date());
  const [unassignedTasks, setUnassignedTasks] = useState<Task[]>([]);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [schedule, setSchedule] = useState<ScheduledEvent[]>(INITIAL_SCHEDULE);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | '3days' | 'week' | 'list'>('3days');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Initial mobile check for viewMode
    if (window.innerWidth < 1024) {
      setViewMode('day');
    } else {
      setViewMode('3days');
    }

    return () => clearInterval(timer);
  }, []);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EditableEvent | null>(null);

  // Settings internal state
  const [settingsTab, setSettingsTab] = useState<'routines' | 'rules'>('routines');
  const [newRuleText, setNewRuleText] = useState('');

  // Weekly Routines State & NEW EDITING STATE
  const [weeklyRoutines, setWeeklyRoutines] = useState<WeeklyRoutine[]>([]);
  const [newRoutine, setNewRoutine] = useState<Partial<WeeklyRoutine>>({ title: '', categoryId: 'work', durationMins: 60 });

  // Resizing State
  const [resizingEventId, setResizingEventId] = useState<string | null>(null);
  const isResizingRef = useRef(false);

  // Google API State
  const [isGapiInitialized, setIsGapiInitialized] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Ref for the grid container
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  // AI Assistant State
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
    { role: 'ai', content: 'Hallo! Ich bin dein One48 Planner Assistant. Wie kann ich dir heute mit deinem Kalender helfen?' }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<{ id: string; type: 'task' | 'event'; durationMins: number; categoryId: string; title: string } | null>(null);
  const [dragPreview, setDragPreview] = useState<{ dayIndex: number; timeSlot: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [aiInput]);

  // Sync editor content with state ONLY when state changes from outside or modal opens
  // This prevents the cursor from jumping to the beginning on every keystroke
  useLayoutEffect(() => {
    if (isEditModalOpen && editorRef.current && editingEvent) {
      const currentHTML = editorRef.current.innerHTML;
      const targetHTML = editingEvent.notes || '';
      if (currentHTML !== targetHTML) {
        editorRef.current.innerHTML = targetHTML;
      }
    }
  }, [editingEvent?.notes, isEditModalOpen]);

  // --- Derived State ---
  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = addDays(startOfWeek, i);
    return {
      name: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: formatDate(d),
      fullDate: d,
      isToday: d.toDateString() === new Date().toDateString(),
      index: i // 0 = Mon
    };
  });

  const displayDays = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (viewMode === 'week') return weekDays;

    const start = viewMode === 'day' || viewMode === '3days' || viewMode === 'list'
      ? today
      : startOfWeek;

    const todayDayIndex = (today.getDay() + 6) % 7; // Mon=0, Sun=6
    const count = viewMode === 'day' ? 1
      : viewMode === '3days' ? 3
        : viewMode === 'list' ? (6 - todayDayIndex + 1)
          : 7;

    return Array.from({ length: count }).map((_, i) => {
      const d = addDays(start, i);
      return {
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: formatDate(d),
        fullDate: d,
        isToday: d.toDateString() === new Date().toDateString(),
        // For events to match, we need to know which Mon-Sun index this date corresponds to
        // d.getDay() is 0 for Sun, 1 for Mon...
        // our index is 0 for Mon, 6 for Sun
        index: (d.getDay() + 6) % 7
      };
    });
  })();

  // --- Google API Integration ---

  useEffect(() => {
    // Dynamically load Google API scripts
    const loadGapi = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        (window as any).gapi.load('client', async () => {
          await (window as any).gapi.client.init({
            apiKey: API_KEY,
            // discoveryDocs: [DISCOVERY_DOC], // Causes 403 if Discovery API is not enabled/allowed
          });

          // Load Calendar API v3 directly
          await (window as any).gapi.client.load('calendar', 'v3');

          setIsGapiInitialized(true);
        });
      };
      document.body.appendChild(script);

    };

    if (typeof window !== 'undefined') {
      loadGapi();
    }
  }, []);

  // 3. Auto-Sync on Load (Once both GAPI and User are ready)
  useEffect(() => {
    if (isGapiInitialized && firebaseUser && !isSyncing) {
      handleSyncFromGoogle();
    }
  }, [isGapiInitialized, firebaseUser]);

  // Scroll to calendar on mobile on mount
  useLayoutEffect(() => {
    if (window.innerWidth < 1024 && scrollContainerRef.current && calendarRef.current) {
      const container = scrollContainerRef.current;
      const calendar = calendarRef.current;
      // Use requestAnimationFrame to ensure layout is done
      requestAnimationFrame(() => {
        container.scrollLeft = calendar.offsetLeft - (window.innerWidth - calendar.offsetWidth) / 2;
      });
    }
  }, []);

  // 4. Auto-Upload Sync every minute
  useEffect(() => {
    const autoSyncTimer = setInterval(() => {
      if (hasUnsavedChanges && isGapiInitialized && firebaseUser && !isSyncing) {
        console.log("Auto-syncing to Google Calendar...");
        handleSyncToGoogle(true);
      }
    }, 60000); // 1 minute
    return () => clearInterval(autoSyncTimer);
  }, [hasUnsavedChanges, isGapiInitialized, firebaseUser, isSyncing]);

  // 2. Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth State Changed:", user ? `Logged in as ${user.uid}` : "Logged out");
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  // 3. Database Listeners (Todos & Routines)
  useEffect(() => {
    if (!firebaseUser) {
      setUnassignedTasks([]);
      setWeeklyRoutines([]);
      return;
    }

    const uid = firebaseUser.uid;
    console.log("Setting up DB listeners for UID:", uid);

    const tasksRef = ref(db, `todos/${uid}`);
    const unsubscribeTodos = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      console.log("DB Update: Todos snapshot received", data ? Object.keys(data).length : 0, "items");
      if (data) {
        const loadedTasks: Task[] = Object.keys(data).map(key => ({
          id: key,
          title: data[key].name || "No Title",
          categoryId: ((c) => c === 'private' ? 'daily' : c)((data[key].category || 'work').toLowerCase()), // Map private->daily
          durationMins: Number(data[key].duration || 60),
          notes: data[key].notes || "",
          isAllDay: !!data[key].isAllDay
        }));
        setUnassignedTasks(loadedTasks);
      } else {
        setUnassignedTasks([]);
      }
    }, (error) => {
      console.error("DB Error: Todos listener failed", error);
    });

    const routinesRef = ref(db, `routines/${uid}`);
    const unsubscribeRoutines = onValue(routinesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("DB Update: Routines snapshot received", data ? Object.keys(data).length : 0, "items", data);
      if (data) {
        const loadedRoutines: WeeklyRoutine[] = Object.keys(data).map(key => ({
          id: key,
          title: data[key].title || "No Title",
          categoryId: ((c) => c === 'private' ? 'daily' : c)((data[key].categoryId || 'work').toLowerCase()),
          durationMins: Number(data[key].durationMins || 60)
        }));
        setWeeklyRoutines(loadedRoutines);
      } else {
        setWeeklyRoutines([]);
      }
    }, (error) => {
      console.error("DB Error: Routines listener failed", error);
    });

    const rulesRef = ref(db, `airules/${uid}`);
    const unsubscribeRules = onValue(rulesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("DB Update: Rules snapshot received", data ? Object.keys(data).length : 0, "items");
      if (data) {
        const loadedRules: Rule[] = Object.keys(data).map(key => ({
          id: key,
          text: data[key].text || ""
        }));
        setRules(loadedRules);
      } else {
        setRules([]);
      }
    }, (error) => {
      console.error("DB Error: Rules listener failed", error);
    });

    return () => {
      console.log("Cleaning up DB listeners for UID:", uid);
      unsubscribeTodos();
      unsubscribeRoutines();
      unsubscribeRules();
    };
  }, [firebaseUser]);

  // --- Helper: Login with Google (Firebase + GAPI Token) ---
  const performGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope(SCOPES);

      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      if (accessToken) {
        (window as any).gapi.client.setToken({ access_token: accessToken });
      }

      setFirebaseUser(result.user);
      return true;
    } catch (error: any) {
      console.error("Google Login Error:", error);
      if (error.code === 'auth/operation-not-allowed') {
        alert("Login Failed: Google Login ist in Firebase nicht aktiviert.\n\nBitte gehe zur Firebase Console -> Authentication -> Sign-in method -> Add new provider -> Wähle 'Google' und aktiviere es.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        console.log("User closed popup");
      } else {
        alert(`Login Failed: ${error.message}`);
      }
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setFirebaseUser(null);
      setUnassignedTasks([]);
      if ((window as any).gapi?.client) {
        (window as any).gapi.client.setToken(null);
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };



  // HILFSFUNKTION: Bringt die Kategorie in das Format 'Work', 'Workout' etc.
  const formatCategory = (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();

  const addTaskToFirebase = async (task: Task) => {
    if (!firebaseUser) return;
    const tasksRef = ref(db, `todos/${firebaseUser.uid}`);

    try {
      const newTaskRef = push(tasksRef);
      const firebaseId = newTaskRef.key; // Der von Firebase generierte Key

      await set(newTaskRef, {
        name: task.title,
        category: formatCategory(task.categoryId),
        duration: Number(task.durationMins),
        notes: task.notes || "",
        isAllDay: !!task.isAllDay
      });

      // WICHTIG: Du musst die firebaseId in deinem lokalen Task-Objekt speichern,
      // damit updateTaskInFirebase später weiß, welcher Pfad genutzt werden muss.
      return firebaseId;
    } catch (error) {
      console.error("Fehler beim Erstellen:", error);
    }
  };

  const updateTaskInFirebase = async (task: Task) => {
    if (!firebaseUser || !task.id) {
      console.warn("Update abgebrochen: Kein User oder keine Task-ID vorhanden.");
      return;
    }

    // Hier nutzen wir task.id. Bei geladenen Tasks ist das der Firebase-Key.
    const taskRef = ref(db, `todos/${firebaseUser.uid}/${task.id}`);

    try {
      // Wir nutzen update statt set, um flexibler zu sein
      await update(taskRef, {
        name: task.title,
        category: formatCategory(task.categoryId),
        duration: Number(task.durationMins),
        notes: task.notes || "",
        isAllDay: !!task.isAllDay
      });
    } catch (error) {
      console.error("Fehler beim Update (Regeln verletzt?):", error);
    }
  };

  const removeTaskFromFirebase = async (taskId: string) => {
    if (!firebaseUser || !taskId) return;

    // Auch hier: taskId muss der Key aus Firebase sein (z.B. -Ohf...)
    const taskRef = ref(db, `todos/${firebaseUser.uid}/${taskId}`);

    try {
      await remove(taskRef);
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  // --- Weekly Routine Helpers ---

  const addWeeklyRoutine = async () => {
    console.log("addWeeklyRoutine called", { firebaseUser, newRoutine });
    if (!firebaseUser) {
      alert("Please log in first to save routines.");
      return;
    }
    if (!newRoutine.title) {
      alert("Please enter a title for the routine.");
      return;
    }

    try {
      const routinesRef = ref(db, `routines/${firebaseUser.uid}`);
      const newRef = push(routinesRef);
      console.log("Pushing to Firebase:", newRef.key);
      await set(newRef, {
        title: newRoutine.title,
        categoryId: newRoutine.categoryId || 'work',
        durationMins: newRoutine.durationMins || 60
      });
      console.log("Successfully added routine");
      setNewRoutine({ title: '', categoryId: 'work', durationMins: 60 }); // Reset form
    } catch (error) {
      console.error("Error adding weekly routine:", error);
      alert("Failed to add routine. Check console for details.");
    }
  };

  const removeWeeklyRoutine = async (id: string) => {
    if (!firebaseUser) return;
    const routineRef = ref(db, `routines/${firebaseUser.uid}/${id}`);
    await remove(routineRef);
  };

  // --- Rule Helpers ---

  const addRuleToFirebase = async (text: string) => {
    if (!firebaseUser || !text.trim()) return;
    try {
      const rulesRef = ref(db, `airules/${firebaseUser.uid}`);
      const newRef = push(rulesRef);
      await set(newRef, { text });
    } catch (error) {
      console.error("Error adding rule:", error);
    }
  };

  const removeRuleFromFirebase = async (id: string) => {
    if (!firebaseUser) return;
    try {
      const ruleRef = ref(db, `airules/${firebaseUser.uid}/${id}`);
      await remove(ruleRef);
    } catch (error) {
      console.error("Error removing rule:", error);
    }
  };

  const importWeeklyRoutines = async () => {
    console.log("Importing routines:", weeklyRoutines);
    if (weeklyRoutines.length === 0) {
      alert("No weekly routines defined in settings.");
      return;
    }

    // Add all routines as unassigned tasks
    for (const routine of weeklyRoutines) {
      console.log("Importing routine:", routine.title);
      await addTaskToFirebase({
        id: `imported-${Date.now()}-${Math.random()}`, // Temp ID, addTask will generate real one
        title: routine.title,
        categoryId: routine.categoryId,
        durationMins: routine.durationMins
      });
    }
    // We rely on database listener to update UI
    setHasUnsavedChanges(true);
  };

  // 1. Download: GCal -> Planner
  const handleSyncFromGoogle = async () => {
    if (!isGapiInitialized) return;

    // Check if we need to login (either no Firebase user OR no GAPI token)
    if (!firebaseUser || !(window as any).gapi.client.getToken()) {
      const success = await performGoogleLogin();
      if (!success) return;
    }

    setIsSyncing(true);

    const action = async () => {
      try {
        // Time Range: Mon 00:00 to Sun 23:59 of current week
        const start = new Date(startOfWeek);
        const end = new Date(startOfWeek);
        end.setDate(end.getDate() + 7); // Include weekend in fetch to be safe

        const response = await (window as any).gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': start.toISOString(),
          'timeMax': end.toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'orderBy': 'startTime',
        });

        const events = response.result.items;
        const newSchedule: ScheduledEvent[] = [];

        events.forEach((event: any) => {
          // Check for All Day Event (has start.date but no start.dateTime)
          const isAllDay = !!event.start.date;
          const startTimeStr = event.start.dateTime || event.start.date; // Use date if dateTime missing
          if (!startTimeStr) return;

          const eventDate = new Date(startTimeStr);
          // For all-day events, start.date is YYYY-MM-DD. new Date("YYYY-MM-DD") is usually UTC. 
          // We need to be careful with timezone offsets shifting the day. 
          // However, startOfWeek logic might also need rigorous checking. 
          // Let's assume standard local date parsing for now or fix to midnight local.
          if (isAllDay) {
            eventDate.setHours(0, 0, 0, 0);
          }

          const endDate = event.end.dateTime ? new Date(event.end.dateTime) : new Date(event.end.date || event.start.date);


          // Calculate Day Index (0 = Mon, 6 = Sun)
          const diffTime = Math.abs(eventDate.getTime() - startOfWeek.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          // Only map Mon-Sun for our planner (0-6)
          if (diffDays >= 0 && diffDays <= 6) {
            let timeSlot = "00:00";
            let durationMins = 60;

            if (!isAllDay) {
              const h = eventDate.getHours();
              const m = eventDate.getMinutes();
              timeSlot = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
              const durationMs = endDate.getTime() - eventDate.getTime();
              durationMins = Math.round(durationMs / 60000);
            } else {
              // For multi-day all-day events, this simple logic clips them to the first day. 
              // Supporting multi-day spanning bars is complex. We will just show it on the start day for this iteration.
              durationMins = 24 * 60;
            }

            // Map Color to Category
            // Default to 'work' if unknown
            let categoryId = 'work';
            if (event.colorId) {
              const foundCat = categories.find(c => c.googleColorId === event.colorId);
              if (foundCat) categoryId = foundCat.id;
            }

            newSchedule.push({
              id: event.id || `gcal-${Math.random()}`,
              title: event.summary || 'No Title',
              categoryId: categoryId,
              durationMins: durationMins,
              dayIndex: diffDays,
              timeSlot: timeSlot,
              notes: event.description || "",
              isAllDay: isAllDay
            });
          }
        });



        setSchedule(newSchedule);

      } catch (err) {
        console.error('Error syncing from Google', err);
        alert('Sync failed. Check console.');
      } finally {
        setIsSyncing(false);
        setHasUnsavedChanges(false); // Reset on fresh download
      }
    };

    action();
  };

  // 2. Upload: Planner -> GCal
  const handleSyncToGoogle = async (_isSilent = false) => {
    if (!isGapiInitialized) return;

    // Ensure auth
    if (!firebaseUser || !(window as any).gapi.client.getToken()) {
      const success = await performGoogleLogin();
      if (!success) return;
    }

    setIsSyncing(true);

    const action = async () => {
      try {
        const start = new Date(startOfWeek);
        const end = new Date(startOfWeek);
        end.setDate(end.getDate() + 7); // Full week end of day

        // A. Fetch existing events in range to delete them (Overwrite logic)
        const listResponse = await (window as any).gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': start.toISOString(),
          'timeMax': end.toISOString(),
          'singleEvents': true
        });

        // Batch delete
        const batch = (window as any).gapi.client.newBatch();
        listResponse.result.items.forEach((event: any) => {
          // Only delete if it looks like a task we manage? 
          // The prompt says "entries of currently displayed week... removed". 
          // This is destructive. Proceed with caution.
          batch.add((window as any).gapi.client.calendar.events.delete({
            'calendarId': 'primary',
            'eventId': event.id
          }));
        });

        if (listResponse.result.items.length > 0) {
          await batch.then();
        }

        // B. Insert new events
        const insertBatch = (window as any).gapi.client.newBatch();

        schedule.forEach(ev => {
          const evDate = new Date(startOfWeek);
          evDate.setDate(evDate.getDate() + ev.dayIndex);

          const [h, m] = ev.timeSlot.split(':').map(Number);
          evDate.setHours(h, m, 0, 0);

          const endDate = new Date(evDate);
          endDate.setMinutes(endDate.getMinutes() + ev.durationMins);

          const category = categories.find(c => c.id === ev.categoryId);
          const colorId = category?.googleColorId || '8'; // Default gray

          let resource: any = {
            'summary': ev.title,
            'colorId': colorId,
            'description': ev.notes || ""
          };

          if (ev.isAllDay) {
            // All Day Event
            // Format YYYY-MM-DD using local time to avoid timezone shifts (toISOString is UTC)
            const formatLocalDate = (d: Date) => {
              const year = d.getFullYear();
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const day = String(d.getDate()).padStart(2, '0');
              return `${year}-${month}-${day}`;
            };

            const startStr = formatLocalDate(evDate);
            const endD = new Date(evDate);
            endD.setDate(endD.getDate() + 1); // +1 day for exclusive end
            const endStr = formatLocalDate(endD);

            resource.start = { 'date': startStr };
            resource.end = { 'date': endStr };

          } else {
            // Timed Event
            resource.start = {
              'dateTime': evDate.toISOString(),
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            resource.end = {
              'dateTime': endDate.toISOString(),
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            };
          }

          insertBatch.add((window as any).gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': resource
          }));
        });

        if (schedule.length > 0) {
          await insertBatch.then();
        }

      } catch (err) {
        console.error('Error syncing to Google', err);
        alert('Upload failed. Check console.');
      } finally {
        setIsSyncing(false);
        setHasUnsavedChanges(false); // Changes saved
      }
    };

    action();
  };


  // --- Handlers: Drag & Drop ---

  const handleDragStart = (e: React.DragEvent, id: string, type: 'task' | 'event') => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("type", type);
    e.dataTransfer.effectAllowed = "move";

    const item = type === 'task'
      ? unassignedTasks.find(t => t.id === id)
      : schedule.find(s => s.id === id);

    if (item) {
      setDraggedItem({
        id,
        type,
        durationMins: item.durationMins,
        categoryId: item.categoryId,
        title: item.title
      });
    }
  };

  const handleDragOver = (e: React.DragEvent, dayIndex?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (dayIndex !== undefined && draggedItem) {
      const currentTarget = e.currentTarget as HTMLDivElement;
      const rect = currentTarget.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const rawMinutes = offsetY / PIXELS_PER_MINUTE;
      const snappedMinutes = Math.round(rawMinutes / SNAP_MINUTES) * SNAP_MINUTES;
      const timeSlot = formatTimeFromMinutes(Math.max(0, snappedMinutes));

      if (!dragPreview || dragPreview.dayIndex !== dayIndex || dragPreview.timeSlot !== timeSlot) {
        setDragPreview({ dayIndex, timeSlot });
      }
    } else {
      setDragPreview(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragPreview(null);
  };

  // Click on Calendar Grid to Create Event
  const handleGridClick = (e: React.MouseEvent, dayIndex: number) => {
    // If resizing, ignore click
    if (isResizingRef.current) return;

    // Calculate time from click Y position
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top; // Relative Y to the clicked element (day column)

    // Check if within bounds (sometimes clientY might be slightly off due to borders?)
    if (clickY < 0) return;

    const minutesFromStart = Math.floor(clickY / PIXELS_PER_MINUTE);

    // Snap to nearest 15 mins (SNAP_MINUTES)
    const snappedMinutes = Math.floor(minutesFromStart / SNAP_MINUTES) * SNAP_MINUTES;

    const timeSlot = formatTimeFromMinutes(snappedMinutes);

    // Create new event at this time
    setEditingEvent({
      id: `new-${Date.now()}`,
      title: '',
      categoryId: categories[0].id,
      durationMins: 60,
      dayIndex: dayIndex,
      timeSlot: timeSlot
    });
    setIsEditModalOpen(true);
  };

  // Drop on Calendar Day Column
  const handleDropOnDay = (e: React.DragEvent, dayIndex: number) => {
    e.preventDefault();
    setDraggedItem(null);
    setDragPreview(null);
    const id = e.dataTransfer.getData("id");
    const type = e.dataTransfer.getData("type");

    // Calculate Time based on drop position Y
    const currentTarget = e.currentTarget as HTMLDivElement;
    const rect = currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top; // Y position within the day column

    // Convert px to minutes
    const rawMinutes = offsetY / PIXELS_PER_MINUTE;

    // Snap to 15 mins
    const snappedMinutes = Math.round(rawMinutes / SNAP_MINUTES) * SNAP_MINUTES;

    // Calculate new Time String
    const timeSlot = formatTimeFromMinutes(Math.max(0, snappedMinutes));

    if (type === 'task') {
      // From Unassigned -> Schedule
      const taskToMove = unassignedTasks.find(t => t.id === id);
      if (taskToMove) {
        // Remove from local (optimistic) - Wait, if we rely on listener, we shouldn't modify local unassigned?
        // But schedule needs to be updated.
        // If we remove from Firebase, the listener will remove it from unassignedTasks.
        // So we only update SCHEDULE here.
        removeTaskFromFirebase(id);

        // setUnassignedTasks(prev => prev.filter(t => t.id !== id)); // Removed to rely on listener
        const newEvent: ScheduledEvent = {
          ...taskToMove,
          dayIndex,
          timeSlot
        };
        setSchedule(prev => [...prev, newEvent]);
      }
    } else if (type === 'event') {
      // From Schedule -> Schedule (Move)
      setSchedule(prev => prev.map(ev =>
        ev.id === id ? { ...ev, dayIndex, timeSlot } : ev
      ));
    }
    setHasUnsavedChanges(true);
  };

  // Drop on Unassigned Column
  const handleDropOnUnassigned = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedItem(null);
    setDragPreview(null);
    const id = e.dataTransfer.getData("id");
    const type = e.dataTransfer.getData("type");

    if (type === 'event') {
      const eventToUnschedule = schedule.find(s => s.id === id);
      if (eventToUnschedule) {
        // Remove from schedule
        setSchedule(prev => prev.filter(s => s.id !== id));
        // Add to unassigned
        const { dayIndex, timeSlot, ...task } = eventToUnschedule;
        // setUnassignedTasks(prev => [...prev, task]); // Listener will handle this if we push
        addTaskToFirebase(task);
        setHasUnsavedChanges(true);
      }
    }
  };

  // --- Handlers: Resizing ---

  const handleResizeStart = (_: React.MouseEvent, id: string) => {
    isResizingRef.current = true;
    setResizingEventId(id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingEventId) return;

      setSchedule(prev => prev.map(ev => {
        if (ev.id !== resizingEventId) return ev;

        const deltaMins = (e.movementY / PIXELS_PER_MINUTE);
        let newDuration = ev.durationMins + deltaMins;

        if (newDuration < 15) newDuration = 15; // Minimum 15 mins

        return { ...ev, durationMins: newDuration };
      }));
    };

    const handleMouseUp = () => {
      if (resizingEventId) {
        // Snap final duration
        setSchedule(prev => prev.map(ev => {
          if (ev.id !== resizingEventId) return ev;
          const snappedDuration = Math.round(ev.durationMins / SNAP_MINUTES) * SNAP_MINUTES;
          return { ...ev, durationMins: Math.max(15, snappedDuration) };
        }));
        setResizingEventId(null);
        setHasUnsavedChanges(true);

        // Small timeout to allow onClick handlers to fire and check the ref before resetting
        setTimeout(() => {
          isResizingRef.current = false;
        }, 100);
      }
    };

    if (resizingEventId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingEventId]);


  // --- Handlers: Editing ---

  const openEditModal = (item: EditableEvent | null) => {
    // Prevent opening modal if we just finished resizing
    if (isResizingRef.current) return;

    if (item) {
      setEditingEvent({
        ...item,
        isAllDay: item.isAllDay || false // Ensure flag existence
      });
    } else {
      // Create new blank event
      setEditingEvent({
        id: `new-${Date.now()}`,
        title: '',
        categoryId: categories[0].id,
        durationMins: 60,
        dayIndex: 0, // Default to Monday
        timeSlot: '09:00', // Default time
        notes: '',
        isAllDay: false
      });
    }
    setIsEditModalOpen(true);
  };

  const saveEventChanges = () => {
    if (!editingEvent) return;

    const hasTime = editingEvent.timeSlot && editingEvent.timeSlot !== '';

    // Determine if we are updating an existing task/event or creating a new one
    // We check if the ID exists in either list
    const existingInSchedule = schedule.find(s => s.id === editingEvent.id);
    const existingInUnassigned = unassignedTasks.find(t => t.id === editingEvent.id);

    // Remove from previous locations first to avoid duplicates
    if (existingInSchedule) {
      setSchedule(prev => prev.filter(s => s.id !== editingEvent.id));
    }
    if (existingInUnassigned) {
      setUnassignedTasks(prev => prev.filter(t => t.id !== editingEvent.id));
    }

    // Add to new location
    if (hasTime) {
      // Add to schedule
      const newEvent: ScheduledEvent = {
        id: editingEvent.id,
        title: editingEvent.title || 'New Event',
        categoryId: editingEvent.categoryId,
        durationMins: editingEvent.durationMins,
        dayIndex: editingEvent.dayIndex !== undefined ? editingEvent.dayIndex : 0,
        timeSlot: editingEvent.timeSlot!,
        notes: editingEvent.notes || "",
        isAllDay: editingEvent.isAllDay
      };
      setSchedule(prev => [...prev, newEvent]);
    } else {
      // Add/Update in unassigned (Firebase)
      if (editingEvent.id.startsWith('new-')) {
        // Creating NEW task
        addTaskToFirebase({
          id: editingEvent.id, // ID is ignored/generated by push
          title: editingEvent.title || 'New Task',
          categoryId: editingEvent.categoryId,
          durationMins: editingEvent.durationMins,
          notes: editingEvent.notes || ""
        });
      } else {
        // Updating EXISTING task (Firebase Key)
        updateTaskInFirebase({
          id: editingEvent.id,
          title: editingEvent.title || 'New Task',
          categoryId: editingEvent.categoryId,
          durationMins: editingEvent.durationMins,
          notes: editingEvent.notes || ""
        });
      }
      // We do NOT manually setUnassignedTasks here, listener does it
    }

    setHasUnsavedChanges(true);
    setIsEditModalOpen(false);
    setEditingEvent(null);
  };

  const deleteEvent = () => {
    if (!editingEvent) return;

    setSchedule(prev => prev.filter(s => s.id !== editingEvent.id));
    setUnassignedTasks(prev => prev.filter(t => t.id !== editingEvent.id));
    setHasUnsavedChanges(true);

    setIsEditModalOpen(false);
    setEditingEvent(null);
  };




  // --- Settings Handlers ---
  const addRule = () => {
    if (!newRuleText.trim()) return;
    addRuleToFirebase(newRuleText);
    setNewRuleText('');
  };

  const removeRule = (id: string) => {
    removeRuleFromFirebase(id);
  };

  const applyAiActions = (actions: any[]) => {
    if (Array.isArray(actions)) {
      let newSchedule = [...schedule];
      let changesCount = 0;

      actions.forEach(action => {
        if (action.action === 'add') {
          const newEvent: ScheduledEvent = {
            id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: action.name || 'Untitled',
            timeSlot: action.zeit || '09:00',
            durationMins: action.dauer || 60,
            categoryId: action.kategorie || 'work',
            dayIndex: action.tag !== undefined ? action.tag : 0,
            isAllDay: !!action.ganztaegig
          };
          newSchedule.push(newEvent);
          changesCount++;
        } else if (action.action === 'update' && action.id) {
          newSchedule = newSchedule.map(ev => {
            if (ev.id === action.id) {
              changesCount++;
              return {
                ...ev,
                title: action.name || ev.title,
                timeSlot: action.zeit || ev.timeSlot,
                durationMins: action.dauer || ev.durationMins,
                categoryId: action.kategorie || ev.categoryId,
                dayIndex: action.tag !== undefined ? action.tag : ev.dayIndex,
                isAllDay: action.ganztaegig !== undefined ? !!action.ganztaegig : ev.isAllDay
              };
            }
            return ev;
          });
        } else if (action.action === 'delete' && action.id) {
          const exists = newSchedule.some(ev => ev.id === action.id);
          if (exists) {
            newSchedule = newSchedule.filter(ev => ev.id !== action.id);
            changesCount++;
          }
        }
      });

      if (changesCount > 0) {
        setSchedule(newSchedule);
        setHasUnsavedChanges(true);
        setAiMessages(prev => [...prev, { role: 'ai', content: `Ich habe ${changesCount} Änderungen an deinem Plan vorgenommen.` }]);
      } else {
        setAiMessages(prev => [...prev, { role: 'ai', content: 'Ich konnte keine passenden Termine zum Ändern oder Löschen finden.' }]);
      }
    } else {
      setAiMessages(prev => [...prev, { role: 'ai', content: 'Entschuldigung, ich konnte die Anfrage nicht verarbeiten.' }]);
    }
  };

  const handleAiSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiInput.trim() || isAiLoading) return;

    const userMsg = aiInput;
    setAiInput('');
    setAiMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsAiLoading(true);

    try {
      const weekContext = {
        start: startOfWeek.toDateString(),
        end: addDays(startOfWeek, 6).toDateString(),
        today: new Date().toDateString(),
        selectedDay: selectedDayIndex !== null ? weekDays[selectedDayIndex].name + ' ' + weekDays[selectedDayIndex].date : undefined
      };
      const aiRuleTexts = rules.map(r => r.text);
      const actions = await processAiRequest(userMsg, schedule, weekContext, undefined, aiRuleTexts);
      console.log("AI Actions:", actions);
      applyAiActions(actions);
      setSelectedDayIndex(null); // Reset day selection after submit
    } catch (error) {
      console.error("AI Error:", error);
      setAiMessages(prev => [...prev, { role: 'ai', content: 'Es gab ein Problem bei der Verbindung zu Gemini. Bitte überprüfe deine API-Konfiguration.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleMicClick = async () => {
    // Falls wir gerade aufnehmen -> Stoppen
    if (isRecording) {
      if ((window as any).currentRecorder) {
        (window as any).currentRecorder.stop();
        setIsRecording(false);
      }
      return;
    }

    // Aufnahme starten
    setIsRecording(true);
    try {
      const audioResult = await recordAudio(); // Wartet bis stop() aufgerufen wird

      const audioData = {
        inlineData: audioResult
      };

      setAiMessages(prev => [...prev, { role: 'user', content: '(Sprachanfrage...)' }]);
      setIsAiLoading(true);

      const weekContext = {
        start: startOfWeek.toDateString(),
        end: addDays(startOfWeek, 6).toDateString(),
        today: new Date().toDateString()
      };

      const aiRuleTexts = rules.map(r => r.text);

      // Voice Request an Gemini senden
      const actions = await processAiRequest('', schedule, weekContext, audioData, aiRuleTexts);
      applyAiActions(actions);
    } catch (error) {
      console.error("Audio AI Error:", error);
      setAiMessages(prev => [...prev, { role: 'ai', content: 'Ups! Da gab es ein Problem mit der Audio-Eingabe.' }]);
    } finally {
      setIsAiLoading(false);
      setIsRecording(false);
    }
  };
  const handleClearChat = () => {
    setAiMessages([
      { role: 'ai', content: 'Hallo! Ich bin dein One48 Planner Assistant. Wie kann ich dir heute mit deinem Kalender helfen?' }
    ]);
  };


  return (
    <div className="h-[100dvh] lg:h-screen pb-0 lg:pb-8 lg:px-8 animate-in fade-in duration-700 bg-background-light dark:bg-background-dark select-none pt-20 lg:pt-24 px-0 flex flex-col overflow-hidden">

      {/* Header Bar */}
      <div className="max-w-[1600px] w-full mx-auto mb-4 lg:mb-6 flex items-center justify-between px-4 lg:px-0 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full border border-neutral-light dark:border-neutral-dark flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl font-bold">Planner</h1>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div
        ref={scrollContainerRef}
        className="max-w-[1600px] w-full mx-auto flex-1 flex lg:grid lg:grid-cols-12 gap-0 lg:gap-6 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none custom-scrollbar-hidden min-h-0"
      >

        {/* LEFT COLUMN: Organizer (Order 1 on mobile) */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDropOnUnassigned}
          className="min-w-full lg:min-w-0 lg:col-span-3 order-1 flex flex-col h-full bg-surface-light/50 dark:bg-surface-dark/50 border-x lg:border border-neutral-light dark:border-neutral-800 lg:rounded-3xl p-6 overflow-hidden transition-colors hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 animate-in slide-in-from-left-4 fade-in duration-300 snap-center"
        >
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm uppercase tracking-wider text-text-light/60 dark:text-text-dark/60">Organizer</h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={importWeeklyRoutines}
                className="flex-1 h-9 px-3 rounded-lg border border-neutral-light dark:border-neutral-dark flex items-center justify-center gap-2 bg-white dark:bg-surface-dark hover:border-primary text-text-light dark:text-text-dark hover:text-primary transition-all shadow-sm"
                title="Add Weekly Routines"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Import Routines</span>
              </button>
              <button
                onClick={() => openEditModal(null)}
                className="flex-1 h-9 px-3 rounded-lg border border-neutral-light dark:border-neutral-dark flex items-center justify-center gap-2 bg-white dark:bg-surface-dark hover:border-primary text-text-light dark:text-text-dark hover:text-primary transition-all shadow-sm"
                title="Add New Task"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Add Task</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-20">
            {unassignedTasks.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                <p className="text-xs text-neutral-400">All tasks scheduled!</p>
              </div>
            ) : (
              unassignedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  category={categories.find(c => c.id === task.categoryId)}
                  isDraggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => openEditModal(task)}
                />
              ))
            )}
          </div>
        </div>

        {/* MIDDLE COLUMN: Calendar Grid (Order 2 on mobile) */}
        <div
          ref={calendarRef}
          className="min-w-full lg:min-w-0 lg:col-span-6 order-2 flex flex-col h-full bg-white dark:bg-surface-dark border-x lg:border border-neutral-light dark:border-neutral-800 lg:rounded-3xl overflow-hidden shadow-sm transition-all duration-300 snap-center"
        >

          {/* View Switcher & Action Buttons */}
          <div className="p-4 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/30 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex gap-2">
              {[
                { id: 'day', label: '1D' },
                { id: '3days', label: '3D' },
                { id: 'week', label: '1W' },
                { id: 'list', label: 'Liste' }
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setViewMode(v.id as any)}
                  className={`px-3 lg:px-4 py-1.5 rounded-full text-[10px] lg:text-xs font-bold transition-all ${viewMode === v.id
                    ? 'bg-secondary text-white shadow-md scale-105'
                    : 'bg-white dark:bg-surface-dark text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
                    }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleSyncFromGoogle}
                disabled={!isGapiInitialized || isSyncing}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 text-neutral-500 hover:text-primary transition-all disabled:opacity-50"
                title="Sync from Google"
              >
                {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleSyncToGoogle()}
                disabled={!isGapiInitialized || isSyncing}
                className={`h-8 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 ${hasUnsavedChanges ? 'bg-primary/20 text-primary animate-pulse px-3 gap-2' : 'w-8 text-neutral-500 hover:text-primary hover:bg-white dark:hover:bg-neutral-800'}`}
                title="Sync to Google"
              >
                {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                {hasUnsavedChanges && !isSyncing && (
                  <span className="text-[10px] font-bold uppercase tracking-tight whitespace-nowrap px-1">Upload</span>
                )}
              </button>
              <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-700 mx-1" />
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-primary hover:bg-white dark:hover:bg-neutral-800 transition-all"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              {firebaseUser && (
                <button
                  onClick={handleLogout}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-white dark:hover:bg-neutral-800 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Day Header */}
          {viewMode !== 'list' && (
            <>
              {/* Day Columns Header */}
              <div
                className="grid border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-surface-dark z-20"
                style={{ gridTemplateColumns: `60px repeat(${displayDays.length}, 1fr)` }}
              >
                <div className="p-2 lg:p-4 border-r border-neutral-100 dark:border-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400"></div>
                {displayDays.map((day) => (
                  <div key={day.index} className={`p-2 lg:p-4 text-center border-r border-neutral-100 dark:border-neutral-800 last:border-r-0 ${day.isToday ? 'bg-neutral-100/30 dark:bg-neutral-800/20' : ''}`}>
                    <div className="text-[10px] font-bold uppercase text-neutral-400 mb-1">{day.name}</div>
                    <div className={`text-sm lg:text-xl font-display font-bold w-8 h-8 lg:w-10 lg:h-10 mx-auto flex items-center justify-center rounded-full ${day.isToday ? 'bg-secondary text-white shadow-md' : 'text-text-light dark:text-text-dark'}`}>
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* All Day Events Row (Sticky-ish) */}
              <div
                className="grid border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-surface-dark z-20 min-h-[40px]"
                style={{ gridTemplateColumns: `60px repeat(${displayDays.length}, 1fr)` }}
              >
                <div className="p-2 border-r border-neutral-100 dark:border-neutral-800 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight">All Day</span>
                </div>
                {displayDays.map((day) => {
                  const allDayEvents = schedule.filter(s => s.dayIndex === day.index && s.isAllDay);
                  return (
                    <div key={`allday-${day.index}`} className={`p-1 border-r border-neutral-100 dark:border-neutral-800 last:border-r-0 flex flex-col gap-1 ${day.isToday ? 'bg-neutral-100/30 dark:bg-neutral-800/20' : ''}`}>
                      {allDayEvents.map(event => {
                        const cat = categories.find(c => c.id === event.categoryId);
                        const colorBase = cat?.color || 'gray';
                        const bgClass = {
                          orange: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-800',
                          emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800',
                          blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800',
                          purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800',
                          gray: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-neutral-800 dark:text-gray-200 dark:border-neutral-700',
                          amber: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800',
                        }[colorBase] || 'bg-gray-100 text-gray-800';

                        return (
                          <div
                            key={event.id}
                            onClick={() => openEditModal(event)}
                            className={`px-2 py-1 rounded text-xs font-bold border ${bgClass} truncate cursor-pointer hover:opacity-80 transition-opacity`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        )
                      })}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Scrollable Grid Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative" ref={gridRef}>
            {viewMode === 'list' ? (
              /* LIST VIEW */
              <div className="p-6 space-y-8">
                {displayDays.map(day => {
                  const dayEvents = schedule
                    .filter(s => s.dayIndex === day.index)
                    .sort((a, b) => getMinutesFromStart(a.timeSlot) - getMinutesFromStart(b.timeSlot));

                  return (
                    <div key={day.date} className="space-y-4">
                      <div className="flex items-center gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                        <span className={`text-sm font-bold uppercase tracking-wider ${day.isToday ? 'text-secondary' : 'text-neutral-400'}`}>
                          {day.name} {day.date}
                        </span>
                        {day.isToday && <span className="bg-secondary/10 text-secondary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Heute</span>}
                      </div>

                      {dayEvents.length === 0 ? (
                        <p className="text-xs text-neutral-400 italic py-2">Keine Termine geplant</p>
                      ) : (
                        <div className="grid gap-3">
                          {dayEvents.map(event => (
                            <div
                              key={event.id}
                              onClick={() => openEditModal(event)}
                              className={`flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border transition-all cursor-pointer group ${(() => {
                                const eventDate = new Date(day.fullDate);
                                const [h, m] = event.timeSlot.split(':').map(Number);
                                eventDate.setHours(h, m, 0, 0);
                                const startTime = eventDate.getTime();
                                const endTime = startTime + (event.durationMins * 60000);
                                const isPast = endTime < currentTime.getTime();
                                const isActive = currentTime.getTime() >= startTime && currentTime.getTime() <= endTime;

                                if (isActive) return 'border-secondary ring-2 ring-secondary/10 bg-secondary/5';
                                if (isPast) return 'opacity-40 grayscale-[0.2] border-neutral-100 dark:border-neutral-800';
                                return 'border-neutral-100 dark:border-neutral-800 hover:border-secondary';
                              })()}`}
                            >
                              <div className="w-16 text-center">
                                <span className="text-sm font-bold text-text-light dark:text-text-dark">{event.timeSlot}</span>
                                <div className="text-[10px] text-neutral-400">{event.durationMins}m</div>
                              </div>
                              <div className={`w-1.5 h-10 rounded-full bg-${categories.find(c => c.id === event.categoryId)?.color || 'gray'}-500`}></div>
                              <div className="flex-1">
                                <h4 className="font-bold text-sm text-text-light dark:text-text-dark">{event.title}</h4>
                                <span className="text-[10px] uppercase font-bold text-neutral-400">
                                  {categories.find(c => c.id === event.categoryId)?.name}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* GRID VIEW */
              <div
                className="grid relative"
                style={{
                  height: `${HOURS_COUNT * PIXELS_PER_HOUR}px`,
                  gridTemplateColumns: `60px repeat(${displayDays.length}, 1fr)`
                }}
              >

                {/* Time Axis & Horizontal Lines */}
                <div className="border-r border-neutral-100 dark:border-neutral-800 relative bg-white/50 dark:bg-surface-dark/50 z-20">
                  {TIME_LABELS.map((time, i) => (
                    <div key={time} className="absolute w-full text-right pr-4 text-xs font-medium text-neutral-400 -translate-y-2.5" style={{ top: `${i * PIXELS_PER_HOUR}px` }}>
                      {time}
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {displayDays.map((day) => {
                  // Filter events for this day
                  // IMPORTANT: Exclude All Day Events from the time grid
                  const dayEvents = schedule
                    .filter(s => s.dayIndex === day.index && !s.isAllDay)
                    .sort((a, b) => getMinutesFromStart(a.timeSlot) - getMinutesFromStart(b.timeSlot));

                  return (
                    <div
                      key={day.fullDate.getTime()}
                      className={`relative border-r border-neutral-100 dark:border-neutral-800 last:border-r-0 ${day.isToday ? 'bg-neutral-100/50 dark:bg-neutral-900/30' : ''} cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors`}
                      onDragOver={(e) => handleDragOver(e, day.index)}
                      onDrop={(e) => handleDropOnDay(e, day.index)}
                      onClick={(e) => handleGridClick(e, day.index)}
                    >
                      {/* Off-hours background shading */}
                      <div
                        className="absolute w-full bg-neutral-100/50 dark:bg-neutral-900/30 pointer-events-none"
                        style={{ top: 0, height: `${(6 - START_HOUR) * PIXELS_PER_HOUR}px` }}
                      ></div>
                      <div
                        className="absolute w-full bg-neutral-100/50 dark:bg-neutral-900/30 pointer-events-none"
                        style={{ top: `${(22 - START_HOUR) * PIXELS_PER_HOUR}px`, bottom: 0 }}
                      ></div>

                      {/* Drag Preview */}
                      {dragPreview && dragPreview.dayIndex === day.index && draggedItem && (
                        <div
                          className="absolute w-[95%] left-[2.5%] rounded-lg border-2 border-dashed border-secondary/50 bg-secondary/10 pointer-events-none z-30 p-1.5"
                          style={{
                            top: `${getMinutesFromStart(dragPreview.timeSlot) * PIXELS_PER_MINUTE}px`,
                            height: `${draggedItem.durationMins * PIXELS_PER_MINUTE}px`,
                          }}
                        >
                          <div className="text-[10px] font-bold text-secondary uppercase opacity-70 truncate">
                            {draggedItem.title}
                          </div>
                        </div>
                      )}

                      {/* Background Horizontal Grid Lines for Reference */}
                      {TIME_LABELS.map((_, i) => {
                        const hour = START_HOUR + i;
                        const isHighlighted = [9, 12, 15, 18].includes(hour);
                        return (
                          <div
                            key={i}
                            className={`absolute w-full border-b pointer-events-none ${isHighlighted ? 'border-neutral-300 dark:border-neutral-600' : 'border-neutral-100 dark:border-neutral-800'}`}
                            style={{ top: `${i * PIXELS_PER_HOUR}px` }}
                          ></div>
                        );
                      })}

                      {/* Current Time Indicator */}
                      {day.isToday && (
                        <div
                          className="absolute w-full z-40 flex items-center pointer-events-none"
                          style={{
                            top: `${((currentTime.getHours() - START_HOUR) * 60 + currentTime.getMinutes()) * PIXELS_PER_MINUTE}px`,
                            transition: 'top 0.5s ease-in-out'
                          }}
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-secondary -ml-1.25 shadow-lg border-2 border-white dark:border-surface-dark"></div>
                          <div className="flex-1 h-0.5 bg-secondary shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
                        </div>
                      )}

                      {/* Render Absolute Events */}
                      {dayEvents.map((event, idx) => {
                        const minsFromStart = getMinutesFromStart(event.timeSlot);
                        const top = minsFromStart * PIXELS_PER_MINUTE;
                        const height = event.durationMins * PIXELS_PER_MINUTE;

                        return (
                          <TaskCard
                            key={event.id}
                            task={event}
                            category={categories.find(c => c.id === event.categoryId)}
                            isDraggable
                            isScheduled
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onClick={() => openEditModal(event)}
                            onResizeStart={handleResizeStart}
                            isPast={(() => {
                              const eventDate = new Date(day.fullDate);
                              const [h, m] = event.timeSlot.split(':').map(Number);
                              eventDate.setHours(h, m, 0, 0);
                              const endTime = new Date(eventDate.getTime() + (event.durationMins * 60000));
                              return endTime < currentTime;
                            })()}
                            style={{
                              top: `${top}px`,
                              height: `${height}px`,
                              zIndex: 10 + idx,
                              transition: resizingEventId === event.id ? 'none' : 'top 0.2s, height 0.2s'
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Assistant (Order 3 on mobile) */}
        <div className="min-w-full lg:min-w-0 lg:col-span-3 order-3 flex flex-col h-full bg-white dark:bg-surface-dark border-x lg:border border-neutral-light dark:border-neutral-800 lg:rounded-3xl overflow-hidden shadow-sm transition-all duration-300 snap-center">
          <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <h2 className="font-bold text-sm uppercase tracking-wider text-text-light/60 dark:text-text-dark/60">Assistant</h2>
            <button
              onClick={handleClearChat}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              title="Clear Chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 bg-neutral-50/50 dark:bg-black/20 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
            {aiMessages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shrink-0 shadow-sm">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`${msg.role === 'user'
                  ? 'bg-neutral-200 dark:bg-neutral-700 text-text-light dark:text-text-dark rounded-2xl rounded-tr-none border-none'
                  : 'bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-none border border-neutral-100 dark:border-neutral-700'
                  } p-3 text-sm shadow-sm max-w-[85%] leading-relaxed`}>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {isAiLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-none border border-neutral-100 dark:border-neutral-700 p-3 text-sm shadow-sm animate-pulse">
                  Denke nach...
                </div>
              </div>
            )}
          </div>

          {/* Day Selection Bubbles */}
          <div className="px-3 pt-2 pb-2 bg-white dark:bg-surface-dark border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-1 justify-between">
              {weekDays.map((day) => (
                <button
                  key={day.index}
                  type="button"
                  onClick={() => setSelectedDayIndex(selectedDayIndex === day.index ? null : day.index)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all flex-1 ${selectedDayIndex === day.index
                    ? 'bg-secondary text-white shadow-md scale-105'
                    : day.isToday
                      ? 'bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                >
                  {day.name}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleAiSubmit} className="p-4 pt-3 bg-white dark:bg-surface-dark">
            <div className="relative flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAiSubmit();
                    }
                  }}
                  placeholder="Termin hinzufügen, ändern..."
                  className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all resize-none max-h-32 custom-scrollbar min-h-[44px]"
                  disabled={isAiLoading}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleMicClick}
                    className={`p-1.5 rounded-lg transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-neutral-400 hover:text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                    title={isRecording ? 'Aufnahme stoppen' : 'Spracheingabe'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={isAiLoading || !aiInput.trim()}
                    className="text-primary p-1.5 hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>

      {/* --- EDIT MODAL --- */}
      {
        isEditModalOpen && editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>

            <div className="relative bg-white dark:bg-surface-dark w-full max-w-md rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                <h2 className="font-display text-xl font-bold">Edit Task</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Title</label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    placeholder="Enter task title..."
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-primary font-bold text-lg"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Day</label>
                    <select
                      value={editingEvent.dayIndex !== undefined ? editingEvent.dayIndex : 0}
                      onChange={(e) => setEditingEvent({ ...editingEvent, dayIndex: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-primary appearance-none cursor-pointer"
                    >
                      {weekDays.map((day) => (
                        <option key={day.index} value={day.index}>{day.name} ({day.date})</option>
                      ))}
                    </select>
                  </div>

                  {/* Time + All Day Checkbox Container */}
                  <div className="flex-1 flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 flex justify-between items-center">
                      <span>Time</span>
                      <div className="flex items-center gap-2 normal-case tracking-normal">
                        <input
                          type="checkbox"
                          id="allDayCheck"
                          checked={editingEvent.isAllDay || false}
                          onChange={(e) => setEditingEvent({
                            ...editingEvent,
                            isAllDay: e.target.checked,
                            // If checking 'All Day', ensure we have a valid time fallback if unchecked later? 
                            // Actually, standard behavior is keep time but hide inputs. 
                          })}
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="allDayCheck" className="text-[10px] font-bold cursor-pointer">Ganztägig</label>
                      </div>
                    </label>

                    <div className="relative">
                      <select
                        value={editingEvent.timeSlot || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, timeSlot: e.target.value })}
                        disabled={editingEvent.isAllDay}
                        className={`w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-primary appearance-none cursor-pointer ${editingEvent.isAllDay ? 'opacity-30 cursor-not-allowed' : ''}`}
                      >
                        <option value="">Keine Zeit (Unassigned)</option>
                        {TIME_DROPDOWN_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {!editingEvent.isAllDay && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Duration (min)</label>
                    <select
                      value={editingEvent.durationMins}
                      onChange={(e) => setEditingEvent({ ...editingEvent, durationMins: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-primary appearance-none cursor-pointer"
                    >
                      {DURATION_OPTIONS.map((min) => (
                        <option key={min} value={min}>{min} Minutes</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setEditingEvent({ ...editingEvent, categoryId: cat.id })}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase border-2 transition-all ${editingEvent.categoryId === cat.id ? 'border-primary bg-primary/5 text-primary' : 'border-transparent bg-neutral-100 dark:bg-neutral-800 text-neutral-500'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Notizen</label>

                  {/* Toolbar */}
                  <div className="flex items-center gap-1 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-t-xl border border-neutral-200 dark:border-neutral-700 border-b-0">
                    {[
                      { icon: <Bold className="w-4 h-4" />, cmd: 'bold', title: 'Fett' },
                      { icon: <Italic className="w-4 h-4" />, cmd: 'italic', title: 'Kursiv' },
                      { icon: <Underline className="w-4 h-4" />, cmd: 'underline', title: 'Unterstrichen' },
                      { icon: <List className="w-4 h-4" />, cmd: 'insertUnorderedList', title: 'Liste' },
                      { icon: <ListOrdered className="w-4 h-4" />, cmd: 'insertOrderedList', title: 'Nummerierung' },
                    ].map((btn, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          document.execCommand(btn.cmd, false);
                          if (editorRef.current) {
                            setEditingEvent({ ...editingEvent, notes: editorRef.current.innerHTML });
                          }
                        }}
                        className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors text-neutral-600 dark:text-neutral-400"
                        title={btn.title}
                      >
                        {btn.icon}
                      </button>
                    ))}
                  </div>

                  {/* Editable Area */}
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={(e) => {
                      if (editingEvent) {
                        setEditingEvent({ ...editingEvent, notes: e.currentTarget.innerHTML });
                      }
                    }}
                    onBlur={(e) => {
                      if (editingEvent) {
                        setEditingEvent({ ...editingEvent, notes: e.currentTarget.innerHTML });
                      }
                    }}
                    className="w-full min-h-[150px] max-h-[300px] px-4 py-3 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700 rounded-b-xl focus:outline-none focus:border-primary text-sm overflow-y-auto custom-scrollbar prose dark:prose-invert prose-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && document.queryCommandValue('insertUnorderedList') === 'false' && document.queryCommandValue('insertOrderedList') === 'false') {
                        // Standard behavior for rich text
                      }
                    }}
                  />
                </div>

                <style>{`
                  [contenteditable]:empty:before {
                    content: "Notizen hier schreiben...";
                    color: #9ca3af;
                    pointer-events: none;
                    display: block;
                  }
                  .prose ul { list-style-type: disc; padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }
                  .prose ol { list-style-type: decimal; padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }
                  .prose p { margin-bottom: 0.5rem; }
                `}</style>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <button
                  onClick={deleteEvent}
                  className="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={saveEventChanges}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* --- SETTINGS MODAL (Same as before) --- */}
      {
        isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)}></div>

            <div className="relative bg-white dark:bg-surface-dark w-full max-w-lg rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                <h2 className="font-display text-xl font-bold">Planner Settings</h2>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex p-2 gap-2 bg-neutral-50 dark:bg-neutral-900/50">
                <button onClick={() => setSettingsTab('routines')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${settingsTab === 'routines' ? 'bg-white dark:bg-surface-dark shadow-sm text-text-light dark:text-text-dark' : 'text-text-light/40 dark:text-text-dark/40 hover:text-text-light'}`}>Calendar Rules</button>
                <button onClick={() => setSettingsTab('rules')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${settingsTab === 'rules' ? 'bg-white dark:bg-surface-dark shadow-sm text-text-light dark:text-text-dark' : 'text-text-light/40 dark:text-text-dark/40 hover:text-text-light'}`}>AI Rules</button>
              </div>

              <div className="p-6 min-h-[400px]">
                {settingsTab === 'routines' && (
                  <div className="space-y-4">
                    <p className="text-sm text-neutral-500 mb-4">Manage tasks you want to import every week.</p>

                    <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-2xl space-y-3 mb-6">
                      <input
                        type="text"
                        value={newRoutine.title}
                        onChange={(e) => setNewRoutine({ ...newRoutine, title: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && addWeeklyRoutine()}
                        placeholder="Task Title (e.g. GYM Session)"
                        className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-surface-dark text-sm focus:outline-none focus:border-primary"
                      />
                      <div className="flex gap-2">
                        <select
                          value={newRoutine.categoryId}
                          onChange={(e) => setNewRoutine({ ...newRoutine, categoryId: e.target.value })}
                          className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-surface-dark text-sm"
                        >
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <select
                          value={newRoutine.durationMins}
                          onChange={(e) => setNewRoutine({ ...newRoutine, durationMins: parseInt(e.target.value) })}
                          className="w-24 px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-surface-dark text-sm"
                        >
                          {DURATION_OPTIONS.map(d => <option key={d} value={d}>{d}m</option>)}
                        </select>
                        <button
                          type="button"
                          onClick={addWeeklyRoutine}
                          className="bg-primary text-white p-2 rounded-lg hover:opacity-90 active:scale-95 transition-transform"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                      {weeklyRoutines.map(routine => (
                        <div key={routine.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl group border border-neutral-100 dark:border-neutral-800">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">{routine.title}</span>
                            <span className="text-[10px] text-neutral-400 uppercase font-bold">{routine.categoryId} • {routine.durationMins}m</span>
                          </div>
                          <button onClick={() => removeWeeklyRoutine(routine.id)} className="text-neutral-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                      {weeklyRoutines.length === 0 && (
                        <div className="text-center py-8 text-neutral-400 text-xs border-2 border-dashed border-neutral-100 dark:border-neutral-800 rounded-xl">
                          No weekly routines added yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {settingsTab === 'rules' && (
                  <div className="space-y-4">
                    <p className="text-sm text-neutral-500 mb-4">Set constraints for the AI Assistant.</p>
                    <div className="flex gap-2 mb-6">
                      <input type="text" value={newRuleText} onChange={(e) => setNewRuleText(e.target.value)} placeholder="e.g. 'No meetings on Fridays'" className="flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent text-sm focus:outline-none focus:border-primary" onKeyDown={(e) => e.key === 'Enter' && addRule()} />
                      <button onClick={addRule} className="bg-text-light dark:bg-white text-white dark:text-black p-2 rounded-lg hover:opacity-90"><Plus className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar">
                      {rules.map(rule => (
                        <div key={rule.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg group border border-neutral-100 dark:border-neutral-800">
                          <span className="text-sm">{rule.text}</span>
                          <button onClick={() => removeRule(rule.id)} className="text-neutral-400 hover:text-red-500 transition-all"><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }

    </div >
  );


};
export default One48Planner;
