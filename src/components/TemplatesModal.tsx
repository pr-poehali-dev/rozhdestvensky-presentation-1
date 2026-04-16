import { TEMPLATES } from '@/types/presentation';
import Icon from '@/components/ui/icon';

interface TemplatesModalProps {
  onSelect: (templateIndex: number) => void;
  onClose: () => void;
}

export default function TemplatesModal({ onSelect, onClose }: TemplatesModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div
        className="relative bg-background rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display text-2xl font-light">Шаблоны</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <p className="font-body text-sm text-muted-foreground mb-6">
            Выберите шаблон — он заменит текущую презентацию
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TEMPLATES.map((t, i) => (
              <button
                key={i}
                onClick={() => { onSelect(i); onClose(); }}
                className="group text-left border border-border rounded-lg p-5 hover:border-sand transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-sand-light flex items-center justify-center">
                    <Icon name="Layout" size={14} className="text-foreground" />
                  </div>
                  <span className="font-body font-medium text-sm">{t.name}</span>
                </div>
                <p className="font-body text-[11px] text-muted-foreground">
                  {t.slides.length} слайд{t.slides.length > 1 ? 'а' : ''}
                </p>
                <div className="mt-3 flex gap-1">
                  {t.slides.map((_, si) => (
                    <div
                      key={si}
                      className="h-1 flex-1 rounded-full"
                      style={{ backgroundColor: t.slides[si].accentColor + '66' }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
