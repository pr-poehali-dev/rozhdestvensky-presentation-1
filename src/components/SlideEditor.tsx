import { Slide, SlideLayout } from '@/types/presentation';
import Icon from '@/components/ui/icon';

const LAYOUTS: { value: SlideLayout; label: string; icon: string }[] = [
  { value: 'title', label: 'Титул', icon: 'AlignCenter' },
  { value: 'text', label: 'Текст', icon: 'AlignLeft' },
  { value: 'image-right', label: 'Фото справа', icon: 'PanelRight' },
  { value: 'image-left', label: 'Фото слева', icon: 'PanelLeft' },
  { value: 'blank', label: 'Пустой', icon: 'Square' },
];

const ACCENT_COLORS = ['#c4a882', '#8b7355', '#607d8b', '#7b8c6e', '#a0867a', '#6b7a8d', '#9e8e7e'];

interface SlideEditorProps {
  slide: Slide;
  onChange: (updated: Partial<Slide>) => void;
}

export default function SlideEditor({ slide, onChange }: SlideEditorProps) {
  const inputClass = "w-full font-body text-sm bg-background border border-border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sand placeholder:text-muted-foreground resize-none";
  const labelClass = "font-body text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block";

  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto h-full">
      {/* Layout */}
      <div>
        <span className={labelClass}>Макет</span>
        <div className="grid grid-cols-5 gap-1.5">
          {LAYOUTS.map((l) => (
            <button
              key={l.value}
              onClick={() => onChange({ layout: l.value })}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded border text-[10px] font-body transition-all ${
                slide.layout === l.value
                  ? 'border-sand bg-sand-light text-foreground'
                  : 'border-border text-muted-foreground hover:border-sand'
              }`}
              title={l.label}
            >
              <Icon name={l.icon} size={14} fallback="Square" />
              <span className="leading-tight text-center">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className={labelClass}>Заголовок</label>
        <input
          className={inputClass}
          value={slide.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Заголовок слайда"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className={labelClass}>Подзаголовок</label>
        <input
          className={inputClass}
          value={slide.subtitle}
          onChange={(e) => onChange({ subtitle: e.target.value })}
          placeholder="Дополнительный текст"
        />
      </div>

      {/* Body */}
      {slide.layout !== 'title' && slide.layout !== 'blank' && (
        <div>
          <label className={labelClass}>Содержание</label>
          <textarea
            className={`${inputClass} min-h-[120px]`}
            value={slide.body}
            onChange={(e) => onChange({ body: e.target.value })}
            placeholder="Основной текст слайда"
            rows={5}
          />
        </div>
      )}

      {/* Image URL */}
      {(slide.layout === 'image-left' || slide.layout === 'image-right') && (
        <div>
          <label className={labelClass}>Ссылка на изображение</label>
          <input
            className={inputClass}
            value={slide.imageUrl}
            onChange={(e) => onChange({ imageUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
      )}

      {/* Background color */}
      <div>
        <label className={labelClass}>Фон слайда</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={slide.bgColor}
            onChange={(e) => onChange({ bgColor: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border border-border"
          />
          <span className="font-body text-xs text-muted-foreground">{slide.bgColor}</span>
        </div>
      </div>

      {/* Accent color */}
      <div>
        <label className={labelClass}>Акцентный цвет</label>
        <div className="flex items-center gap-2 flex-wrap">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ accentColor: c })}
              className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: c,
                borderColor: slide.accentColor === c ? '#1a1714' : 'transparent',
              }}
            />
          ))}
          <input
            type="color"
            value={slide.accentColor}
            onChange={(e) => onChange({ accentColor: e.target.value })}
            className="w-6 h-6 rounded-full cursor-pointer border border-border"
            title="Свой цвет"
          />
        </div>
      </div>
    </div>
  );
}
