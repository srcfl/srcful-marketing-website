"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterCodeProps {
  code: string;
  comment?: string;
  speed?: number;
  className?: string;
}

export function TypewriterCode({
  code,
  comment,
  speed = 10,
  className = "",
}: TypewriterCodeProps) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    let currentIndex = 0;
    const fullText = code;

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedCode(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setHasAnimated(true);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [isVisible, hasAnimated, code, speed]);

  return (
    <div ref={containerRef} className={`bg-muted rounded-lg p-6 font-mono text-sm ${className}`}>
      {comment && (
        <div className="text-muted-foreground mb-4">{comment}</div>
      )}
      <div className="relative">
        {/* Invisible full code to maintain height */}
        <pre className="text-transparent whitespace-pre-wrap select-none" aria-hidden="true">
          {code}
        </pre>
        {/* Visible animated code overlay */}
        <pre className="text-foreground overflow-hidden whitespace-pre-wrap absolute inset-0">
          {hasAnimated ? code : displayedCode}
          {!hasAnimated && isVisible && (
            <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />
          )}
        </pre>
      </div>
    </div>
  );
}
