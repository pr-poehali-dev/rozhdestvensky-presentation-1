import { useState, useEffect, useCallback } from 'react';
import { Slide } from '@/types/presentation';
import SlideCanvas from './SlideCanvas';
import Icon from '@/components/ui/icon';

interface PresentationViewProps {
  slides: Slide[];
  initialIndex: number;
  onClose: () => void;
}

export default function PresentationView({ slides, initialIndex, onClose }: PresentationViewProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);

  const go = useCallback((dir: 'prev' | 'next') => {
    if (dir === 'next' && current < slides.length - 1) {
      setAnimDir('right');
      setTimeout(() => { setCurrent((c) => c + 1); setAnimDir(null); }, 10);
    }
    if (dir === 'prev' && current > 0) {
      setAnimDir('left');
      setTimeout(() => { setCurrent((c) => c - 1); setAnimDir(null); }, 10);
    }
  }, [current, slides.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') go('next');
      if (e.key === 'ArrowLeft') go('prev');
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go, onClose]);

  const slide = slides[current];

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Slide */}
      <div className="relative w-full flex-1 flex items-center justify-center px-16 py-8">
        <div
          className="w-full shadow-2xl overflow-hidden"
          style={{ maxWidth: '1200px', aspectRatio: '16/9' }}
        >
          {slide && <SlideCanvas key={current} slide={slide} animDir={animDir} />}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 pb-6">
        <button
          onClick={() => go('prev')}
          disabled={current === 0}
          className="text-white/60 hover:text-white disabled:opacity-20 transition-colors"
        >
          <Icon name="ChevronLeft" size={28} />
        </button>
        <span className="font-body text-sm text-white/50">
          {current + 1} / {slides.length}
        </span>
        <button
          onClick={() => go('next')}
          disabled={current === slides.length - 1}
          className="text-white/60 hover:text-white disabled:opacity-20 transition-colors"
        >
          <Icon name="ChevronRight" size={28} />
        </button>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
      >
        <Icon name="X" size={22} />
      </button>

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 font-body text-[11px]">
        ← → для навигации · Esc для выхода
      </div>
    </div>
  );
}
