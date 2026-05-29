import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface LoyaltyScreenProps {
  onNavigate: (screen: Screen) => void;
}

const levels = [
  { name: "Новый клиент", range: "0–499 б", discount: "5%", cosm: "—", writeoff: "до 5%", min: 0, max: 499 },
  { name: "Постоянный гость", range: "500–1499 б", discount: "10%", cosm: "5%", writeoff: "до 7%", min: 500, max: 1499 },
  { name: "Постоянный клиент", range: "1500–2999 б", discount: "15%", cosm: "10%", writeoff: "до 10%", min: 1500, max: 2999 },
  { name: "Любимый клиент", range: "3000+ б", discount: "20%", cosm: "15%", writeoff: "до 15%", min: 3000, max: 9999 },
];

const actions = [
  { action: "Первая запись через приложение", points: "+150" },
  { action: "Заполнение профиля", points: "+50" },
  { action: "Добавление члена семьи", points: "+70" },
  { action: "Запись через приложение", points: "+20" },
  { action: "Посещение услуги", points: "+5% от суммы" },
  { action: "Повтор записи в 30 дней", points: "+100" },
  { action: "День рождения клиента", points: "+200" },
  { action: "Отзыв с фото", points: "+50" },
  { action: "Приглашение друга", points: "+200" },
  { action: "Семейный визит (2 чел.)", points: "+150" },
  { action: "Семейный визит (3+ чел.)", points: "+250" },
];

const currentPoints = 1240;
const currentLevel = levels[1];
const nextLevel = levels[2];
const progressPercent = Math.min(((currentPoints - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100, 100);

const pointsHistory = [
  { date: "12 мая", desc: "Балаяж + стрижка", points: "+425", expiry: "12 нояб." },
  { date: "1 мая", desc: "Семейный визит (2 чел.)", points: "+150", expiry: "1 нояб." },
  { date: "20 апр.", desc: "Маникюр классический", points: "+75", expiry: "20 окт." },
  { date: "1 мая", desc: "Детская стрижка", points: "+70", expiry: "1 нояб." },
];

export default function LoyaltyScreen({ onNavigate }: LoyaltyScreenProps) {
  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      {/* Main card */}
      <div className="gradient-orange rounded-3xl p-5 text-white mb-5 orange-glow animate-fade-in-up">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/70 font-golos text-xs mb-1">Ваш баланс</p>
            <p className="font-golos font-bold text-4xl">1 240</p>
            <p className="text-white/70 font-golos text-sm">баллов = 1 240 ₽</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-xl px-3 py-1.5 mb-2">
              <p className="font-golos font-semibold text-sm">⭐ {currentLevel.name}</p>
            </div>
            <p className="text-white/60 font-golos text-xs">Скидка {currentLevel.discount}</p>
          </div>
        </div>

        {/* Progress to next level */}
        <div className="bg-white/15 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="font-golos text-xs text-white/80">До уровня «{nextLevel.name}»</p>
            <p className="font-golos text-xs font-semibold text-white">{nextLevel.min - currentPoints} баллов</p>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-golos text-[10px] text-white/60">{currentLevel.min}</span>
            <span className="font-golos text-[10px] text-white/60">{nextLevel.min}</span>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-white/15 rounded-xl px-3 py-2 mt-3 flex items-center gap-2">
          <Icon name="AlertTriangle" size={14} className="text-yellow-200 shrink-0" />
          <p className="font-golos text-xs text-white/90">
            <span className="font-semibold text-yellow-200">320 баллов</span> сгорают 15 июня
          </p>
        </div>
      </div>

      {/* Use points button */}
      <button
        onClick={() => onNavigate("booking")}
        className="w-full bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/20 rounded-2xl py-3.5 flex items-center justify-center gap-2 mb-5"
      >
        <Icon name="Zap" size={18} className="text-[hsl(var(--primary))]" />
        <span className="font-golos font-semibold text-[hsl(var(--primary))]">Потратить баллы на запись</span>
      </button>

      {/* Levels table */}
      <div className="mb-5">
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Уровни клиентов</p>
        <div className="space-y-2">
          {levels.map((level, i) => {
            const isActive = level.name === currentLevel.name;
            return (
              <div
                key={i}
                className={`rounded-2xl p-3.5 border transition-all ${
                  isActive
                    ? "gradient-orange border-transparent"
                    : "bg-white border-[hsl(var(--border))]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {isActive && <Icon name="Crown" size={14} className="text-white" />}
                    <p className={`font-golos font-semibold text-sm ${isActive ? "text-white" : "text-[hsl(var(--text-main))]"}`}>
                      {level.name}
                    </p>
                  </div>
                  <span className={`font-golos text-xs ${isActive ? "text-white/80" : "text-[hsl(var(--text-secondary))]"}`}>
                    {level.range}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className={`font-golos text-xs ${isActive ? "text-white/80" : "text-[hsl(var(--text-secondary))]"}`}>
                    Услуги: <span className={`font-semibold ${isActive ? "text-white" : "text-[hsl(var(--text-main))]"}`}>{level.discount}</span>
                  </span>
                  <span className={`font-golos text-xs ${isActive ? "text-white/80" : "text-[hsl(var(--text-secondary))]"}`}>
                    Косметика: <span className={`font-semibold ${isActive ? "text-white" : "text-[hsl(var(--text-main))]"}`}>{level.cosm}</span>
                  </span>
                  <span className={`font-golos text-xs ${isActive ? "text-white/80" : "text-[hsl(var(--text-secondary))]"}`}>
                    Списание: <span className={`font-semibold ${isActive ? "text-white" : "text-[hsl(var(--text-main))]"}`}>{level.writeoff}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Points accrual */}
      <div className="mb-5">
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Как начисляются баллы</p>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow">
          {actions.map((item, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < actions.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <span className="font-golos text-sm text-[hsl(var(--text-secondary))] flex-1 pr-3">{item.action}</span>
              <span className="font-golos font-bold text-sm text-[hsl(var(--primary))] whitespace-nowrap">{item.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">История начислений</p>
        <div className="space-y-2">
          {pointsHistory.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-[hsl(var(--gray-soft))] rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-lg flex items-center justify-center shrink-0">
                <Icon name="Sparkles" size={14} className="text-[hsl(var(--primary))]" />
              </div>
              <div className="flex-1">
                <p className="font-golos text-sm text-[hsl(var(--text-main))] font-medium">{item.desc}</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{item.date} · до {item.expiry}</p>
              </div>
              <span className="font-golos font-bold text-[hsl(var(--primary))]">{item.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
