import { Slide } from '@/types/presentation';
import SlideCanvas from './SlideCanvas';

interface SlideThumbnailProps {
  slide: Slide;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export default function SlideThumbnail({ slide, index, isActive, onClick, onDelete }: SlideThumbnailProps) {
  return (
    <div
      className={`group relative cursor-pointer rounded transition-all duration-200 ${
        isActive ? 'ring-2 ring-offset-2' : 'hover:opacity-90'
      }`}
      style={{ ringColor: slide.accentColor }}
      onClick={onClick}
    >
      <div
        className="relative overflow-hidden rounded"
        style={{
          width: '100%',
          paddingBottom: '56.25%',
          border: isActive ? `2px solid ${slide.accentColor}` : '2px solid transparent',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ fontSize: '8px' }}>
          <SlideCanvas slide={slide} isPreview />
        </div>
      </div>
      <div className="flex items-center justify-between mt-1.5 px-0.5">
        <span className="font-body text-[11px] text-muted-foreground">{index + 1}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive text-[11px] leading-none"
          title="Удалить слайд"
        >
          ×
        </button>
      </div>
    </div>
  );
}
