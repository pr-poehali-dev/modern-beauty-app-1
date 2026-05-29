import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SALON_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/b1d4ff4b-73d5-4053-83b1-50046ba5374d.jpg";
const MASTER_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";

const promos = [
  { title: "Окрашивание + стрижка", desc: "Скидка 20% до конца мая", badge: "-20%" },
  { title: "Семейный комплекс", desc: "+250 баллов за визит 3 человек", badge: "+250 б" },
  { title: "День рождения", desc: "+200 баллов и скидка 15%", badge: "🎁" },
];

const quickActions = [
  { icon: "CalendarPlus", label: "Онлайн-запись", screen: "booking" as Screen, color: "gradient-orange text-white orange-glow" },
  { icon: "Users", label: "Семейная запись", screen: "booking" as Screen, color: "bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))]" },
  { icon: "RotateCcw", label: "Повторить визит", screen: "history" as Screen, color: "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))]" },
  { icon: "Star", label: "Мои баллы", screen: "loyalty" as Screen, color: "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))]" },
  { icon: "Clock", label: "История", screen: "history" as Screen, color: "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))]" },
  { icon: "ShoppingBag", label: "Каталог", screen: "catalog" as Screen, color: "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))]" },
  { icon: "MessageCircle", label: "Чат", screen: "chat" as Screen, color: "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))]" },
  { icon: "Scissors", label: "Мастера", screen: "masters" as Screen, color: "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))]" },
  { icon: "X", label: "Отменить запись", screen: "booking" as Screen, color: "bg-red-50 text-red-400" },
];

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="px-5 pt-2 pb-4 space-y-5 animate-fade-in">
      {/* Welcome */}
      <div className="animate-fade-in-up">
        <p className="font-golos text-[hsl(var(--text-secondary))] text-sm">Добрый день,</p>
        <h1 className="font-golos font-bold text-2xl text-[hsl(var(--text-main))]">Анна Петрова 👋</h1>
      </div>

      {/* Points + Level card */}
      <div className="gradient-orange rounded-3xl p-5 text-white orange-glow animate-fade-in-up delay-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-golos text-white/70 text-xs mb-0.5">Баланс бонусов</p>
            <p className="font-golos font-bold text-3xl">1 240</p>
            <p className="font-golos text-white/70 text-xs mt-0.5">= 1 240 рублей</p>
          </div>
          <div className="text-right">
            <span className="bg-white/20 text-white text-xs font-golos font-semibold px-3 py-1.5 rounded-xl">
              ⭐ Постоянный гость
            </span>
            <p className="text-white/60 text-xs font-golos mt-2">Скидка 10% на услуги</p>
          </div>
        </div>
        <div className="bg-white/15 rounded-2xl p-3 flex items-center gap-3">
          <Icon name="AlertTriangle" size={16} className="text-yellow-200 shrink-0" />
          <p className="font-golos text-xs text-white/90">
            <span className="font-semibold text-yellow-200">320 баллов</span> сгорают 15 июня — запишитесь сейчас!
          </p>
        </div>
      </div>

      {/* Nearest booking */}
      <div className="bg-white border-2 border-[hsl(var(--border))] rounded-3xl p-4 card-shadow animate-fade-in-up delay-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-[hsl(var(--orange-light))] rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={14} className="text-[hsl(var(--primary))]" />
          </div>
          <p className="font-golos text-xs font-semibold text-[hsl(var(--text-secondary))] uppercase tracking-wide">Ближайшая запись</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={MASTER_IMG} alt="Мастер" className="w-14 h-14 rounded-2xl object-cover" />
          <div className="flex-1">
            <p className="font-golos font-semibold text-[hsl(var(--text-main))]">Стрижка + укладка</p>
            <p className="font-golos text-sm text-[hsl(var(--text-secondary))]">Анастасия Романова</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">5 июня, 14:30</span>
              <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">2 500 ₽</span>
            </div>
          </div>
          <button className="w-9 h-9 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center">
            <Icon name="ChevronRight" size={18} className="text-[hsl(var(--primary))]" />
          </button>
        </div>
        <div className="flex gap-2 mt-3 pt-3 border-t border-[hsl(var(--border))]">
          <button
            onClick={() => onNavigate("booking")}
            className="flex-1 py-2 gradient-orange text-white font-golos font-medium text-xs rounded-xl"
          >
            Перенести
          </button>
          <button className="flex-1 py-2 bg-red-50 text-red-400 font-golos font-medium text-xs rounded-xl border border-red-100">
            Отменить
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="animate-fade-in-up delay-200">
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Быстрые действия</p>
        <div className="grid grid-cols-3 gap-2.5">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigate(action.screen)}
              className={`${action.color} rounded-2xl p-3.5 flex flex-col items-center gap-2 transition-all active:scale-95`}
            >
              <Icon name={action.icon} size={22} />
              <span className="font-golos text-xs font-medium text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Master recommendation */}
      <div className="animate-fade-in-up delay-300">
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Рекомендация мастера</p>
        <div className="bg-[hsl(var(--gray-soft))] rounded-3xl p-4 flex gap-3">
          <img src={MASTER_IMG} alt="Мастер" className="w-12 h-12 rounded-2xl object-cover shrink-0" />
          <div>
            <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Анастасия Романова</p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-1 leading-relaxed">
              Рекомендую сделать питательную маску Olaplex — ваши волосы нуждаются в восстановлении после окрашивания 🌿
            </p>
            <button
              onClick={() => onNavigate("booking")}
              className="mt-2 font-golos text-xs font-semibold text-[hsl(var(--primary))]"
            >
              Записаться →
            </button>
          </div>
        </div>
      </div>

      {/* Promos */}
      <div className="animate-fade-in-up delay-400">
        <div className="flex items-center justify-between mb-3">
          <p className="font-golos font-semibold text-[hsl(var(--text-main))]">Акции</p>
          <button className="font-golos text-xs text-[hsl(var(--primary))] font-medium">Все акции</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {promos.map((promo, i) => (
            <div
              key={i}
              className="min-w-[200px] bg-white border border-[hsl(var(--border))] rounded-2xl p-4 card-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] leading-tight flex-1 pr-2">{promo.title}</p>
                <span className="gradient-orange text-white text-xs font-bold px-2 py-1 rounded-lg shrink-0">{promo.badge}</span>
              </div>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{promo.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Masters preview */}
      <div className="animate-fade-in-up delay-400">
        <div className="flex items-center justify-between mb-3">
          <p className="font-golos font-semibold text-[hsl(var(--text-main))]">Наши мастера</p>
          <button onClick={() => onNavigate("masters")} className="font-golos text-xs text-[hsl(var(--primary))] font-medium">Все →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {["Анастасия", "Мария", "Елена", "Светлана"].map((name, i) => (
            <button
              key={i}
              onClick={() => onNavigate("masters")}
              className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[hsl(var(--gray-soft))] border-2 border-[hsl(var(--border))]">
                <img src={MASTER_IMG} alt={name} className="w-full h-full object-cover" />
              </div>
              <span className="font-golos text-xs text-[hsl(var(--text-main))] font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}