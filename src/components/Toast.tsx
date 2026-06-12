/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Sparkles, X, Info } from "lucide-react";

export type ToastType = "success" | "welcome" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType, title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    
    // Automatically dismiss after 4.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            let icon = <Info className="w-5 h-5 text-indigo-500" />;
            let bgClass = "bg-white border-slate-200 text-slate-800";
            let accentBar = "bg-indigo-500";
            let shadowClass = "shadow-lg shadow-slate-100";

            if (toast.type === "success") {
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
              bgClass = "bg-white border-slate-100 text-slate-800";
              accentBar = "bg-emerald-500";
              shadowClass = "shadow-md shadow-slate-100";
            } else if (toast.type === "welcome") {
              icon = <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />;
              bgClass = "bg-slate-900 border-slate-800 text-slate-100";
              accentBar = "bg-indigo-500";
              shadowClass = "shadow-xl shadow-slate-900/35";
            }

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className={`w-full pointer-events-auto rounded-2xl border p-4.5 flex items-start gap-3.5 relative overflow-hidden ${bgClass} ${shadowClass}`}
                role="alert"
              >
                {/* Accent status bar */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${accentBar}`} />

                {/* Left Icon */}
                <div className="shrink-0 pt-0.5 pl-1.5">
                  {icon}
                </div>

                {/* Content body */}
                <div className="flex-1 pr-4">
                  {toast.title && (
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono mb-1 ${toast.type === 'welcome' ? 'text-indigo-400' : 'text-slate-900'}`}>
                      {toast.title}
                    </h4>
                  )}
                  <p className={`text-xs font-medium leading-relaxed ${toast.type === 'welcome' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {toast.message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => removeToast(toast.id)}
                  className={`absolute top-3.5 right-3.5 p-1 rounded-lg transition shrink-0 cursor-pointer ${
                    toast.type === "welcome"
                      ? "text-slate-500 hover:text-slate-200 hover:bg-slate-800"
                      : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  }`}
                  aria-label="Dismiss Notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
