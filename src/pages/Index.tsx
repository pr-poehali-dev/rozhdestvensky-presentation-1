import { useState, useCallback, useRef } from 'react';
import { Slide, Presentation, TEMPLATES, DEFAULT_SLIDE } from '@/types/presentation';
import SlideCanvas from '@/components/SlideCanvas';
import SlideThumbnail from '@/components/SlideThumbnail';
import SlideEditor from '@/components/SlideEditor';
import TemplatesModal from '@/components/TemplatesModal';
import PresentationView from '@/components/PresentationView';
import Icon from '@/components/ui/icon';

const makeId = () => Math.random().toString(36).slice(2);

const createInitialPresentation = (): Presentation => ({
  id: makeId(),
  title: 'Моя презентация',
  slides: [
    {
      id: makeId(),
      layout: 'title',
      title: 'Название презентации',
      subtitle: 'Ваше имя или организация',
      body: '',
      imageUrl: '',
      bgColor: '#ffffff',
      accentColor: '#c4a882',
    },
    {
      id: makeId(),
      layout: 'text',
      title: 'Введение',
      subtitle: '',
      body: 'Расскажите о чём ваша презентация. Кратко опишите ключевые тезисы.',
      imageUrl: '',
      bgColor: '#ffffff',
      accentColor: '#c4a882',
    },
  ],
});

export default function Index() {
  const [presentation, setPresentation] = useState<Presentation>(createInitialPresentation);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const activeSlide = presentation.slides[activeIndex];

  const updateSlide = useCallback((updated: Partial<Slide>) => {
    setPresentation((p) => ({
      ...p,
      slides: p.slides.map((s, i) => (i === activeIndex ? { ...s, ...updated } : s)),
    }));
  }, [activeIndex]);

  const addSlide = () => {
    const newSlide: Slide = { id: makeId(), ...DEFAULT_SLIDE() };
    setPresentation((p) => {
      const slides = [...p.slides];
      slides.splice(activeIndex + 1, 0, newSlide);
      return { ...p, slides };
    });
    setActiveIndex(activeIndex + 1);
  };

  const deleteSlide = (index: number) => {
    if (presentation.slides.length <= 1) return;
    setPresentation((p) => ({
      ...p,
      slides: p.slides.filter((_, i) => i !== index),
    }));
    setActiveIndex((prev) => Math.min(prev, presentation.slides.length - 2));
  };

  const selectSlide = (index: number) => {
    const dir = index > activeIndex ? 'right' : 'left';
    setAnimDir(dir);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimDir(null);
    }, 10);
  };

  const applyTemplate = (templateIndex: number) => {
    const t = TEMPLATES[templateIndex];
    setPresentation({
      id: makeId(),
      title: t.name,
      slides: t.slides.map((s) => ({ ...s, id: makeId() })),
    });
    setActiveIndex(0);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-border bg-background flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#c4a882' }}>
            <Icon name="Presentation" size={13} className="text-white" />
          </div>
          {editingTitle ? (
            <input
              ref={titleRef}
              className="font-display text-lg font-light bg-transparent border-b border-sand focus:outline-none px-1"
              value={presentation.title}
              onChange={(e) => setPresentation((p) => ({ ...p, title: e.target.value }))}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
              autoFocus
            />
          ) : (
            <button
              className="font-display text-lg font-light hover:opacity-70 transition-opacity"
              onClick={() => setEditingTitle(true)}
              title="Нажмите для редактирования"
            >
              {presentation.title}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 px-3 py-1.5 rounded transition-all"
          >
            <Icon name="Layout" size={13} />
            Шаблоны
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 px-3 py-1.5 rounded transition-all"
          >
            <Icon name="Download" size={13} />
            Экспорт PDF
          </button>
          <button
            onClick={() => setShowPresentation(true)}
            className="flex items-center gap-1.5 font-body text-xs text-white px-3 py-1.5 rounded transition-all"
            style={{ backgroundColor: '#1a1714' }}
          >
            <Icon name="Play" size={13} />
            Запустить
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — slides list */}
        <aside className="w-48 flex-shrink-0 border-r border-border bg-background overflow-y-auto flex flex-col">
          <div className="flex-1 p-3 flex flex-col gap-2">
            {presentation.slides.map((slide, i) => (
              <SlideThumbnail
                key={slide.id}
                slide={slide}
                index={i}
                isActive={i === activeIndex}
                onClick={() => selectSlide(i)}
                onDelete={() => deleteSlide(i)}
              />
            ))}
          </div>
          <div className="p-3 border-t border-border">
            <button
              onClick={addSlide}
              className="w-full flex items-center justify-center gap-1.5 font-body text-xs text-muted-foreground hover:text-foreground border border-dashed border-border hover:border-foreground/30 py-2 rounded transition-all"
            >
              <Icon name="Plus" size={13} />
              Добавить слайд
            </button>
          </div>
        </aside>

        {/* Main canvas */}
        <main className="flex-1 flex items-center justify-center bg-muted/30 overflow-hidden p-8">
          <div
            className="w-full shadow-lg overflow-hidden rounded-sm"
            style={{ maxWidth: '900px', aspectRatio: '16/9' }}
          >
            {activeSlide && (
              <SlideCanvas key={activeSlide.id} slide={activeSlide} animDir={animDir} />
            )}
          </div>
        </main>

        {/* Right panel — editor */}
        <aside className="w-64 flex-shrink-0 border-l border-border bg-background overflow-hidden">
          {activeSlide && (
            <SlideEditor slide={activeSlide} onChange={updateSlide} />
          )}
        </aside>
      </div>

      {/* Slide counter */}
      <div className="flex items-center justify-center py-2 border-t border-border bg-background flex-shrink-0">
        <span className="font-body text-xs text-muted-foreground">
          Слайд {activeIndex + 1} из {presentation.slides.length}
        </span>
        <div className="flex items-center gap-1 ml-4">
          {presentation.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => selectSlide(i)}
              className="rounded-full transition-all"
              style={{
                width: i === activeIndex ? 16 : 6,
                height: 6,
                backgroundColor: i === activeIndex ? activeSlide?.accentColor || '#c4a882' : '#e2d8cc',
              }}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {showTemplates && (
        <TemplatesModal onSelect={applyTemplate} onClose={() => setShowTemplates(false)} />
      )}
      {showPresentation && (
        <PresentationView
          slides={presentation.slides}
          initialIndex={activeIndex}
          onClose={() => setShowPresentation(false)}
        />
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          header, aside, footer { display: none !important; }
          main { padding: 0 !important; background: white !important; }
          .shadow-lg { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
