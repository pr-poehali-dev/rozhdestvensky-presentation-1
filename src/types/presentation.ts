export type SlideLayout = 'title' | 'text' | 'image-left' | 'image-right' | 'blank';

export interface Slide {
  id: string;
  layout: SlideLayout;
  title: string;
  subtitle: string;
  body: string;
  imageUrl: string;
  bgColor: string;
  accentColor: string;
}

export interface Presentation {
  id: string;
  title: string;
  slides: Slide[];
}

export const TEMPLATES: { name: string; slides: Omit<Slide, 'id'>[] }[] = [
  {
    name: 'Бизнес-план',
    slides: [
      { layout: 'title', title: 'Название проекта', subtitle: 'Краткое описание вашего проекта', body: '', imageUrl: '', bgColor: '#ffffff', accentColor: '#c4a882' },
      { layout: 'text', title: 'Проблема', subtitle: '', body: 'Опишите проблему, которую решает ваш продукт. Какую боль клиента вы устраняете?', imageUrl: '', bgColor: '#ffffff', accentColor: '#c4a882' },
      { layout: 'image-right', title: 'Решение', subtitle: 'Ваш продукт или услуга', body: 'Как именно вы решаете эту проблему. Ключевые особенности.', imageUrl: '', bgColor: '#ffffff', accentColor: '#c4a882' },
      { layout: 'text', title: 'Команда', subtitle: '', body: 'Расскажите о людях, которые делают это возможным.', imageUrl: '', bgColor: '#ffffff', accentColor: '#c4a882' },
    ],
  },
  {
    name: 'Портфолио',
    slides: [
      { layout: 'title', title: 'Иван Иванов', subtitle: 'Дизайнер & Разработчик', body: '', imageUrl: '', bgColor: '#faf7f2', accentColor: '#8b7355' },
      { layout: 'image-left', title: 'О себе', subtitle: '', body: 'Краткое описание опыта, навыков и интересов.', imageUrl: '', bgColor: '#faf7f2', accentColor: '#8b7355' },
      { layout: 'text', title: 'Проекты', subtitle: '', body: '• Проект 1 — краткое описание\n• Проект 2 — краткое описание\n• Проект 3 — краткое описание', imageUrl: '', bgColor: '#faf7f2', accentColor: '#8b7355' },
      { layout: 'text', title: 'Контакты', subtitle: '', body: 'email@example.com\n+7 (000) 000-00-00\ntelegram: @username', imageUrl: '', bgColor: '#faf7f2', accentColor: '#8b7355' },
    ],
  },
  {
    name: 'Отчёт',
    slides: [
      { layout: 'title', title: 'Квартальный отчёт', subtitle: 'Q1 2024', body: '', imageUrl: '', bgColor: '#ffffff', accentColor: '#607d8b' },
      { layout: 'text', title: 'Итоги квартала', subtitle: '', body: 'Ключевые показатели и достижения за период.', imageUrl: '', bgColor: '#ffffff', accentColor: '#607d8b' },
      { layout: 'text', title: 'Планы', subtitle: '', body: 'Цели и задачи на следующий квартал.', imageUrl: '', bgColor: '#ffffff', accentColor: '#607d8b' },
    ],
  },
];

export const DEFAULT_SLIDE = (): Omit<Slide, 'id'> => ({
  layout: 'text',
  title: 'Новый слайд',
  subtitle: '',
  body: 'Добавьте содержание слайда',
  imageUrl: '',
  bgColor: '#ffffff',
  accentColor: '#c4a882',
});
