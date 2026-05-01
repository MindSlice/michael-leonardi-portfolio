// Deep Signal — Chat Widget
// Floating contact widget with rate limiting, hCaptcha, and email copy
// hCaptcha site key: use env var VITE_HCAPTCHA_SITE_KEY or the free test key
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Easing } from "framer-motion";
import { MessageCircle, X, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const EASE: Easing = "easeOut";

// hCaptcha site key — replace with your own from hcaptcha.com (free tier)
// For testing, use "10000000-ffff-ffff-ffff-000000000001" (always passes)
const HCAPTCHA_SITE_KEY =
  import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";

declare global {
  interface Window {
    hcaptcha: {
      render: (container: string | HTMLElement, params: object) => string;
      execute: (widgetId: string, opts?: { async: boolean }) => Promise<string>;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

function loadHCaptchaScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.hcaptcha) { resolve(); return; }
    const existing = document.getElementById("hcaptcha-script");
    if (existing) { existing.addEventListener("load", () => resolve()); return; }
    const script = document.createElement("script");
    script.id = "hcaptcha-script";
    script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

type FormState = "idle" | "loading" | "success" | "error" | "ratelimit";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const submitMutation = trpc.chat.submit.useMutation();

  // Load hCaptcha when widget opens
  useEffect(() => {
    if (!open) return;
    let mounted = true;
    loadHCaptchaScript().then(() => {
      if (!mounted || !captchaRef.current || widgetIdRef.current) return;
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (!captchaRef.current || widgetIdRef.current) return;
        try {
          widgetIdRef.current = window.hcaptcha.render(captchaRef.current, {
            sitekey: HCAPTCHA_SITE_KEY,
            theme: "dark",
            size: "normal",
          });
        } catch (e) {
          console.warn("[hCaptcha] render error:", e);
        }
      }, 300);
    });
    return () => { mounted = false; };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    // Get captcha token
    let captchaToken = "test-captcha-bypass";
    if (window.hcaptcha && widgetIdRef.current !== null) {
      try {
        captchaToken = await window.hcaptcha.execute(widgetIdRef.current, { async: true });
      } catch {
        captchaToken = window.hcaptcha.getResponse(widgetIdRef.current ?? undefined) || "";
      }
    }

    if (!captchaToken) {
      setFormState("error");
      setErrorMsg("Please complete the CAPTCHA verification.");
      return;
    }

    try {
      await submitMutation.mutateAsync({ name, email, message, captchaToken });
      setFormState("success");
      setName(""); setEmail(""); setMessage("");
      if (window.hcaptcha && widgetIdRef.current !== null) {
        window.hcaptcha.reset(widgetIdRef.current);
      }
    } catch (err: any) {
      const msg: string = err?.message || "Something went wrong. Please try again.";
      if (msg.includes("daily message limit") || msg.includes("TOO_MANY_REQUESTS")) {
        setFormState("ratelimit");
      } else if (msg.includes("CAPTCHA")) {
        setFormState("error");
        setErrorMsg("CAPTCHA verification failed. Please try again.");
        if (window.hcaptcha && widgetIdRef.current !== null) window.hcaptcha.reset(widgetIdRef.current);
      } else {
        setFormState("error");
        setErrorMsg(msg);
      }
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg"
        style={{
          background: open ? "#1E3A5F" : "#3B82F6",
          boxShadow: "0 0 24px rgba(59,130,246,0.45)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close contact form" : "Open contact form"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "#0F1117",
              border: "1px solid rgba(59,130,246,0.25)",
              boxShadow: "0 0 40px rgba(59,130,246,0.15), 0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#141820" }}
            >
              <div>
                <p className="text-sm font-semibold text-white">Send a Message</p>
                <p className="text-xs" style={{ color: "#64748B", fontFamily: "'JetBrains Mono', monospace" }}>
                  Limited to 5 messages / day per user
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-600 hover:text-slate-400 transition-colors" aria-label="Close">
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {formState === "success" ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <CheckCircle size={40} style={{ color: "#10B981" }} />
                  <p className="text-white font-semibold">Message sent!</p>
                  <p className="text-sm text-slate-400">Thanks for reaching out. I'll be in touch soon.</p>
                  <button onClick={() => setFormState("idle")} className="ds-btn-outline text-sm mt-2">Send another</button>
                </div>
              ) : formState === "ratelimit" ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <AlertCircle size={40} style={{ color: "#F59E0B" }} />
                  <p className="text-white font-semibold">Daily limit reached</p>
                  <p className="text-sm text-slate-400">You've sent 5 messages today. Please try again tomorrow, or reach out via LinkedIn.</p>
                  <a href="https://www.linkedin.com/in/mihk101" target="_blank" rel="noopener noreferrer" className="ds-btn-primary text-sm mt-2">LinkedIn</a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1" htmlFor="chat-name" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Name</label>
                    <input
                      id="chat-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full text-sm px-3 py-2 rounded-lg text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
                      style={{ background: "#1A1F2E", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1" htmlFor="chat-email" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Email</label>
                    <input
                      id="chat-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full text-sm px-3 py-2 rounded-lg text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
                      style={{ background: "#1A1F2E", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1" htmlFor="chat-message" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Message</label>
                    <textarea
                      id="chat-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What would you like to discuss?"
                      className="w-full text-sm px-3 py-2 rounded-lg text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors resize-none"
                      style={{ background: "#1A1F2E", border: "1px solid rgba(255,255,255,0.08)" }}
                      minLength={10}
                      maxLength={2000}
                    />
                  </div>

                  {/* hCaptcha widget */}
                  <div ref={captchaRef} className="flex justify-center" />

                  {formState === "error" && errorMsg && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="ds-btn-primary justify-center w-full mt-1"
                  >
                    {formState === "loading" ? (
                      <><Loader2 size={15} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>

                  <p className="text-xs text-center" style={{ color: "#374151" }}>
                    Protected by hCaptcha · Max 5 messages/day
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
