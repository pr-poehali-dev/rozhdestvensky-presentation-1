import { Slide } from '@/types/presentation';

interface SlideCanvasProps {
  slide: Slide;
  isPreview?: boolean;
  animDir?: 'left' | 'right' | null;
}

export default function SlideCanvas({ slide, isPreview = false, animDir }: SlideCanvasProps) {
  const animClass = animDir === 'right' ? 'animate-slide-in-right' : animDir === 'left' ? 'animate-slide-in-left' : '';
  const scale = isPreview ? 'text-[8px]' : 'text-base';

  const renderContent = () => {
    switch (slide.layout) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full px-12 text-center">
            <div className="w-12 h-px mb-8" style={{ backgroundColor: slide.accentColor }} />
            <h1
              className={`font-display font-light leading-tight mb-4 ${isPreview ? 'text-[2.4em]' : 'text-5xl md:text-6xl'}`}
              style={{ color: '#1a1714' }}
            >
              {slide.title || 'Заголовок'}
            </h1>
            {slide.subtitle && (
              <p className={`font-body font-light mt-3 ${isPreview ? 'text-[1.1em]' : 'text-lg'}`} style={{ color: '#7a6f64' }}>
                {slide.subtitle}
              </p>
            )}
            <div className="w-12 h-px mt-8" style={{ backgroundColor: slide.accentColor }} />
          </div>
        );

      case 'image-right':
        return (
          <div className="flex h-full">
            <div className="flex flex-col justify-center flex-1 px-10 py-8">
              <div className="w-8 h-px mb-6" style={{ backgroundColor: slide.accentColor }} />
              <h2 className={`font-display font-light leading-tight mb-3 ${isPreview ? 'text-[2em]' : 'text-4xl'}`} style={{ color: '#1a1714' }}>
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className={`font-body mb-3 ${isPreview ? 'text-[0.9em]' : 'text-sm'}`} style={{ color: slide.accentColor }}>
                  {slide.subtitle}
                </p>
              )}
              <p className={`font-body font-light leading-relaxed whitespace-pre-line ${isPreview ? 'text-[0.85em]' : 'text-sm'}`} style={{ color: '#5a5248' }}>
                {slide.body}
              </p>
            </div>
            <div className="w-2/5 flex-shrink-0">
              {slide.imageUrl ? (
                <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: slide.accentColor + '22' }}>
                  <span className={`font-body ${isPreview ? 'text-[0.7em]' : 'text-xs'}`} style={{ color: slide.accentColor }}>изображение</span>
                </div>
              )}
            </div>
          </div>
        );

      case 'image-left':
        return (
          <div className="flex h-full">
            <div className="w-2/5 flex-shrink-0">
              {slide.imageUrl ? (
                <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: slide.accentColor + '22' }}>
                  <span className={`font-body ${isPreview ? 'text-[0.7em]' : 'text-xs'}`} style={{ color: slide.accentColor }}>изображение</span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center flex-1 px-10 py-8">
              <div className="w-8 h-px mb-6" style={{ backgroundColor: slide.accentColor }} />
              <h2 className={`font-display font-light leading-tight mb-3 ${isPreview ? 'text-[2em]' : 'text-4xl'}`} style={{ color: '#1a1714' }}>
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className={`font-body mb-3 ${isPreview ? 'text-[0.9em]' : 'text-sm'}`} style={{ color: slide.accentColor }}>
                  {slide.subtitle}
                </p>
              )}
              <p className={`font-body font-light leading-relaxed whitespace-pre-line ${isPreview ? 'text-[0.85em]' : 'text-sm'}`} style={{ color: '#5a5248' }}>
                {slide.body}
              </p>
            </div>
          </div>
        );

      case 'blank':
        return <div className="h-full" />;

      default: // text
        return (
          <div className="flex flex-col justify-center h-full px-12 py-10">
            <div className="w-8 h-px mb-6" style={{ backgroundColor: slide.accentColor }} />
            <h2 className={`font-display font-light leading-tight mb-4 ${isPreview ? 'text-[2em]' : 'text-4xl'}`} style={{ color: '#1a1714' }}>
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className={`font-body mb-4 ${isPreview ? 'text-[0.9em]' : 'text-sm'}`} style={{ color: slide.accentColor }}>
                {slide.subtitle}
              </p>
            )}
            <p className={`font-body font-light leading-relaxed whitespace-pre-line ${isPreview ? 'text-[0.85em]' : 'text-sm'}`} style={{ color: '#5a5248' }}>
              {slide.body}
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full relative overflow-hidden ${animClass} ${scale}`}
      style={{ backgroundColor: slide.bgColor }}
    >
      {renderContent()}
    </div>
  );
}
