import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER1  = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";
const MASTER2  = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";
const MASTER3  = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/ebd24705-5d23-4a30-b95a-a058766b8e3f.jpg";
const MASTER4  = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/8c5a4941-6d8d-445a-908c-537218ec19c5.jpg";
const PROFILE  = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/16cbc8c4-ea9d-4083-9fff-12c510e31a77.jpg";
const MASHA    = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/db101f73-ed27-44e6-bb2f-9ee28ae6fb24.jpg";
const MISHA    = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/c1c9acb8-c2e4-4a05-8839-4413faf268b3.jpg";

const actions: { icon: string; label: string; screen: Screen; color: string; textColor: string }[] = [
  { icon: "CalendarPlus",  label: "Запись",        screen: "booking",      color: "gradient-orange orange-glow", textColor: "text-white" },
  { icon: "User",          label: "Профиль",       screen: "profile",      color: "bg-white border border-[hsl(var(--border))]", textColor: "text-[hsl(var(--text-main))]" },
  { icon: "Clock",         label: "История",       screen: "history",      color: "bg-white border border-[hsl(var(--border))]", textColor: "text-[hsl(var(--text-main))]" },
  { icon: "Percent",       label: "Акции",         screen: "promos",       color: "bg-white border border-[hsl(var(--border))]", textColor: "text-[hsl(var(--text-main))]" },
  { icon: "CalendarDays",  label: "Мои записи",    screen: "my-bookings",  color: "bg-white border border-[hsl(var(--border))]", textColor: "text-[hsl(var(--text-main))]" },
  { icon: "MessageCircle", label: "Чат",           screen: "chat",         color: "bg-white border border-[hsl(var(--border))]", textColor: "text-[hsl(var(--text-main))]" },
  { icon: "Scissors",      label: "Мастера",       screen: "masters",      color: "bg-white border border-[hsl(var(--border))]", textColor: "text-[hsl(var(--text-main))]" },
  { icon: "Tag",           label: "Скидки",        screen: "promos",       color: "bg-white border border-[hsl(var(--border))]", textColor: "text-[hsl(var(--text-main))]" },
];

const family = [
  { name: "Маша",  relation: "Дочь",   age: "8 лет",  img: MASHA,   lastVisit: "1 мая",    nextVisit: null           },
  { name: "Миша",  relation: "Сын",    age: "12 лет", img: MISHA,   lastVisit: "15 апр.",  nextVisit: "12 июня 11:00" },
];

const masters = [
  { name: "Анастасия", img: MASTER1, free: "Завтра 10:00" },
  { name: "Мария",     img: MASTER2, free: "Сегодня 16:00" },
  { name: "Елена",     img: MASTER3, free: "Завтра 14:30" },

];

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="h-full flex flex-col px-4 pt-1 pb-2 gap-3 animate-fade-in">

      {/* Greeting + balance — compact row */}
      <div className="gradient-orange rounded-2xl px-4 py-3.5 text-white orange-glow flex items-center justify-between animate-fade-in-up">
        <div>
          <p className="font-golos text-white/70 text-xs">Добрый день, Анна 👋</p>
          <p className="font-golos font-bold text-2xl leading-none mt-0.5">1 240 Б = 1 240 ₽</p>
          <p className="font-golos text-white/70 text-[10px] mt-0.5">⭐ Постоянный гость · скидка 10%</p>
        </div>
        <div className="text-right flex flex-col items-end gap-1.5">
          <div className="bg-white/20 rounded-xl px-2.5 py-1 flex items-center gap-1">
            <Icon name="AlertTriangle" size={11} className="text-yellow-200" />
            <span className="font-golos text-[10px] text-yellow-200 font-semibold">320 Б сгорят 15 июня</span>
          </div>
          <button
            onClick={() => onNavigate("booking")}
            className="bg-white text-[hsl(var(--primary))] font-golos font-bold text-xs px-3 py-1.5 rounded-xl"
          >
            Записаться
          </button>
        </div>
      </div>

      {/* Nearest booking — compact */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm animate-fade-in-up delay-100">
        <img src={MASTER1} alt="Мастер" className="w-11 h-11 rounded-xl object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] truncate">Стрижка + укладка</p>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Анастасия · <span className="text-[hsl(var(--primary))] font-semibold">5 июля, 14:30</span></p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button onClick={() => onNavigate("booking")} className="gradient-orange text-white font-golos font-medium text-xs px-2.5 py-1.5 rounded-lg">Перенести</button>
          <button className="bg-red-50 border border-red-100 text-red-400 font-golos font-medium text-xs px-2.5 py-1.5 rounded-lg">Отменить</button>
        </div>
      </div>

      {/* Profile + Family block */}
      <div className="grid grid-cols-2 gap-2 animate-fade-in-up delay-150">
        {/* My profile */}
        <button onClick={() => onNavigate("profile")}
          className="bg-white border border-[hsl(var(--border))] rounded-2xl p-3 flex items-center gap-2.5 shadow-sm text-left transition-all active:scale-95">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[hsl(var(--primary))]">
              <img src={PROFILE} alt="Анна" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="min-w-0">
            <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] truncate">Петрова Анна Николаевна</p>
            <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">⭐ Постоянный гость</p>
            <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold">1 240 Б = 1 240 ₽</p>
          </div>
        </button>

        {/* Family quick access */}
        <button onClick={() => onNavigate("family")}
          className="bg-white border border-[hsl(var(--border))] rounded-2xl p-3 shadow-sm text-left transition-all active:scale-95">
          <p className="font-golos font-semibold text-xs text-[hsl(var(--text-main))] mb-2">Моя семья</p>
          <div className="flex items-center gap-1.5">
            {family.map(m => (
              <div key={m.name} className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-[hsl(var(--border))]">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-golos text-[9px] font-semibold text-[hsl(var(--text-secondary))]">{m.name}</p>
              </div>
            ))}
            <button onClick={e => { e.stopPropagation(); onNavigate("booking"); }}
              className="w-9 h-9 rounded-xl bg-[hsl(var(--orange-light))] flex items-center justify-center border border-[hsl(var(--primary))]/20 shrink-0">
              <Icon name="CalendarPlus" size={14} className="text-[hsl(var(--primary))]" />
            </button>
          </div>
        </button>
      </div>

      {/* Quick actions — 4x2 compact grid */}
      <div className="grid grid-cols-4 gap-2 animate-fade-in-up delay-200">
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={() => onNavigate(a.screen)}
            className={`${a.color} ${a.textColor} rounded-2xl py-3 flex flex-col items-center gap-1.5 transition-all active:scale-95 shadow-sm`}
          >
            {a.label === "Профиль"
              ? <div className="w-5 h-5 rounded-full overflow-hidden border border-white/50"><img src={PROFILE} alt="" className="w-full h-full object-cover" /></div>
              : <Icon name={a.icon} size={19} />
            }
            <span className="font-golos text-[9px] font-semibold text-center leading-tight">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Promo — compact single card with orange accent */}
      <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-center gap-3 animate-fade-in-up delay-200">
        <div className="w-9 h-9 gradient-orange rounded-xl flex items-center justify-center shrink-0">
          <Icon name="Sparkles" size={17} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Окрашивание + стрижка</p>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Скидка 20% до 20 июля</p>
        </div>
        <span className="gradient-orange text-white font-golos font-bold text-xs px-2.5 py-1 rounded-xl shrink-0">-20%</span>
      </div>

      {/* Masters — compact horizontal row */}
      <div className="animate-fade-in-up delay-300">
        <div className="flex items-center justify-between mb-2">
          <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Наши мастера</p>
          <button onClick={() => onNavigate("masters")} className="font-golos text-xs text-[hsl(var(--primary))] font-semibold">Все →</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {masters.map(({ name, img, free }) => (
            <button
              key={name}
              onClick={() => onNavigate("masters")}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                <img src={img} alt={name} className="w-full h-full object-cover" />
              </div>
              <p className="font-golos text-[9px] font-semibold text-[hsl(var(--text-main))] truncate w-full text-center">{name}</p>
              <p className="font-golos text-[8px] text-[hsl(var(--primary))] truncate w-full text-center leading-none">{free}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Master recommendation — single line */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm animate-fade-in-up delay-300">
        <img src={MASTER1} alt="Мастер" className="w-9 h-9 rounded-xl object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-golos font-semibold text-xs text-[hsl(var(--text-main))]">Анастасия рекомендует:</p>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))] truncate">Маска Olaplex — восстановит волосы после окрашивания 🌿</p>
        </div>
        <button onClick={() => onNavigate("catalog")} className="gradient-orange text-white font-golos font-bold text-[10px] px-2.5 py-1.5 rounded-lg shrink-0">
          Купить
        </button>
      </div>

    </div>
  );
}