import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/* A kid's first robot program — short and concrete on purpose. The
   comment line gives it personality so the snippet reads as something
   a child wrote, not corporate sample code. */
const CODE = `# my robot says hi
forward(10)
turn(90)
say("hi!")`;

const TYPE_INTERVAL_MS = 55;
const HOLD_FRAMES = 28;
const TOTAL_FRAMES = CODE.length + HOLD_FRAMES;

const renderHighlighted = (text) => {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => (
    <span key={lineIndex} className="block">
      {line.split(/(#[^\n]*|"[^"]*"|\b\d+\b|\b(?:forward|turn|say)\b)/g).map((part, i) => {
        if (!part) return null;
        if (part.startsWith("#")) {
          return <span key={i} className="text-muted-foreground">{part}</span>;
        }
        if (part.startsWith('"')) {
          return <span key={i} className="text-success">{part}</span>;
        }
        if (/^\d+$/.test(part)) {
          return <span key={i} className="text-primary">{part}</span>;
        }
        if (/^(forward|turn|say)$/.test(part)) {
          return <span key={i} className="text-foreground font-semibold">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
      {lineIndex < lines.length - 1 && "\n"}
    </span>
  ));
};

export const EditorVignette = ({ className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState(reduced ? CODE.length : 0);

  useEffect(() => {
    if (reduced || !inView) return;
    if (frame >= TOTAL_FRAMES) {
      const reset = setTimeout(() => setFrame(0), 50);
      return () => clearTimeout(reset);
    }
    const tick = setTimeout(() => setFrame((f) => f + 1), TYPE_INTERVAL_MS);
    return () => clearTimeout(tick);
  }, [frame, inView, reduced]);

  const charsTyped = Math.min(frame, CODE.length);
  const visible = CODE.slice(0, charsTyped);
  const done = charsTyped >= CODE.length;

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-body-sm shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2">
        <span className="size-2 rounded-full bg-destructive/60" aria-hidden="true" />
        <span className="size-2 rounded-full bg-primary/60" aria-hidden="true" />
        <span className="size-2 rounded-full bg-success/60" aria-hidden="true" />
        <span className="ml-2 font-mono text-caption text-muted-foreground">robot.py</span>
      </div>
      <pre className="flex-1 whitespace-pre px-4 py-3 font-mono text-body-sm leading-relaxed">
        {renderHighlighted(visible)}
        <motion.span
          aria-hidden="true"
          className="ml-px inline-block w-1 align-text-bottom bg-foreground"
          style={{ height: "1em" }}
          animate={reduced ? { opacity: 1 } : { opacity: [1, 0, 1] }}
          transition={reduced ? { duration: 0 } : { duration: 1, repeat: Infinity }}
        />
      </pre>
      <div className="flex items-center gap-2 border-t border-border bg-muted/40 px-4 py-2 text-caption">
        <span
          className={cn(
            "size-1.5 rounded-full transition-colors",
            done ? "bg-success" : "bg-muted-foreground/40",
          )}
          aria-hidden="true"
        />
        <span className="font-mono text-muted-foreground">
          {done ? "→ moving forward" : "ready"}
        </span>
      </div>
    </div>
  );
};
