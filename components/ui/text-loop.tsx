'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Transition, Variants } from 'framer-motion';
import { useState, useEffect, Children } from 'react';

type TextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  containerClassName?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
};

export function TextLoop({
  children,
  className,
  containerClassName,
  interval = 3,
  transition = { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
  variants,
  onIndexChange,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  const [maxWidth, setMaxWidth] = useState<number>(0);

  useEffect(() => {
    // Calculate the maximum width needed
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.fontSize = '3rem';
    tempDiv.style.fontWeight = 'bold';
    document.body.appendChild(tempDiv);

    const widths = items.map(item => {
      tempDiv.textContent = item.toString();
      return tempDiv.offsetWidth;
    });

    document.body.removeChild(tempDiv);
    setMaxWidth(Math.max(...widths) + 32); // Add padding
  }, [items]);

  const defaultVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  useEffect(() => {
    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange]);

  return (
    <span className={cn('inline-flex', className)}>
      <div 
        className={cn("relative overflow-hidden flex items-center", containerClassName)}
        style={{ 
          height: '4rem',
          width: maxWidth ? `${maxWidth}px` : 'auto',
          minWidth: '200px'
        }} 
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants || defaultVariants}
            transition={transition}
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
            style={{ fontSize: '3rem', lineHeight: '1' }}
          >
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {items[currentIndex]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </span>
  );
}