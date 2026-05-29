import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface LoyaltyScreenProps {
  onNavigate: (screen: Screen) => void;
}

const QR_CLIENT = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=1a1108&bgcolor=fff8f0&data=client:00142:modern-salon&qzone=2";
const QR_INVITE = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=1a1108&bgcolor=fff8f0&data=https://modern-beauty-salon-app--preview.poehali.dev/invite/00142&qzone=1";

const levels = [
  { name: "Новый клиент",       range: "0–499 б",    discount: "5%",  cosm: "—",   writeoff: "до 5%",  min: 0,    max: 499  },
  { name: "Постоянный гость",   range: "500–1499 б",  discount: "10%", cosm: "5%",  writeoff: "до 7%",  min: 500,  max: 1499 },
  { name: "Постоянный клиент",  range: "1500–2999 б", discount: "15%", cosm: "10%", writeoff: "до 10%", min: 1500, max: 2999 },
  { name: "Любимый клиент",     range: "3000+ б",     discount: "20%", cosm: "15%", writeoff: "до 15%", min: 3000, max: 9999 },
];

const actions = [
  { action: "Первая запись через приложение", points: "+150" },
  { action: "Заполнение профиля",             points: "+50"  },
  { action: "Добавление члена семьи",         points: "+70"  },
  { action: "Запись через приложение",        points: "+20"  },
  { action: "Посещение услуги",               points: "+5% от суммы" },
  { action: "Повтор записи в 30 дней",        points: "+100" },
  { action: "День рождения клиента",          points: "+200" },
  { action: "Отзыв с фото",                  points: "+50"  },
  { action: "Приглашение друга",              points: "+200" },
  { action: "Семейный визит (2 чел.)",        points: "+150" },
  { action: "Семейный визит (3+ чел.)",       points: "+250" },
];

const currentPoints = 1240;
const currentLevel = levels[1];
const nextLevel = levels[2];
const progressPercent = Math.min(((currentPoints - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100, 100);

const pointsHistory = [
  { date: "12 мая", desc: "Балаяж + стрижка",       points: "+425", expiry: "12 нояб." },
  { date: "1 мая",  desc: "Семейный визит (2 чел.)", points: "+150", expiry: "1 нояб."  },
  { date: "20 апр.", desc: "Маникюр классический",   points: "+75",  expiry: "20 окт."  },
  { date: "1 мая",  desc: "Детская стрижка",          points: "+70",  expiry: "1 нояб."  },
];

export default function LoyaltyScreen({ onNavigate }: LoyaltyScreenProps) {
  const [showQr, setShowQr] = useState(false);

  return (
    <div className="px-4 pt-2 pb-4 animate-fade-in">

      {/* ── БОНУСНАЯ КАРТА с QR ── */}
      <div className="gradient-orange rounded-3xl p-5 text-white mb-4 orange-glow animate-fade-in-up">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/70 font-golos text-xs mb-0.5">Баланс бонусов</p>
            <p className="font-golos font-bold text-4xl leading-none">1 240</p>
            <p className="text-white/70 font-golos text-sm mt-0.5">= 1 240 ₽</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-xl px-3 py-1.5 mb-1.5">
              <p className="font-golos font-semibold text-sm">⭐ {currentLevel.name}</p>
            </div>
            <p className="text-white/60 font-golos text-xs">Скидка {currentLevel.discount}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/15 rounded-2xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <p className="font-golos text-xs text-white/80">До уровня «{nextLevel.name}»</p>
            <p className="font-golos text-xs font-semibold text-white">{nextLevel.min - currentPoints} б</p>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-golos text-[10px] text-white/60">{currentLevel.min}</span>
            <span className="font-golos text-[10px] text-white/60">{nextLevel.min}</span>
          </div>
        </div>

        {/* QR section */}
        <button
          onClick={() => setShowQr(v => !v)}
          className="w-full bg-white/15 rounded-2xl px-4 py-3 flex items-center gap-3"
        >
          <div className="bg-white rounded-xl p-1.5">
            <img src={QR_CLIENT} alt="QR" className={`transition-all ${showQr ? "w-20 h-20" : "w-10 h-10"}`} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-golos font-bold text-white text-sm">Бонусная карта</p>
            <p className="font-golos text-white/70 text-xs">ID: 00142 · Анна Петрова</p>
            <p className="font-golos text-white/60 text-[10px] mt-0.5">
              {showQr ? "Покажите QR на кассе" : "Нажмите, чтобы показать QR"}
            </p>
          </div>
          <Icon name={showQr ? "ChevronUp" : "QrCode"} size={20} className="text-white/80 shrink-0" />
        </button>

        {showQr && (
          <div className="mt-3 bg-white/10 rounded-2xl p-3 text-center animate-scale-in">
            <p className="font-golos text-white/80 text-xs mb-2">
              Покажите мастеру или кассиру для начисления баллов
            </p>
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-3">
                <img src={QR_CLIENT} alt="QR бонусная карта" className="w-36 h-36" />
              </div>
            </div>
            <p className="font-golos text-white/60 text-[10px] mt-2">+20 баллов за каждый визит через приложение</p>
          </div>
        )}

        {/* Warning */}
        <div className="bg-white/15 rounded-xl px-3 py-2 mt-3 flex items-center gap-2">
          <Icon name="AlertTriangle" size={14} className="text-yellow-200 shrink-0" />
          <p className="font-golos text-xs text-white/90">
            <span className="font-semibold text-yellow-200">320 баллов</span> сгорают 15 июня
          </p>
        </div>
      </div>

      {/* Actions row */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => onNavigate("booking")}
          className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/20 rounded-2xl py-3.5 flex items-center justify-center gap-2"
        >
          <Icon name="Zap" size={17} className="text-[hsl(var(--primary))]" />
          <span className="font-golos font-semibold text-sm text-[hsl(var(--primary))]">Потратить</span>
        </button>
        <button className="bg-white border border-[hsl(var(--border))] rounded-2xl py-3.5 flex items-center justify-center gap-2 shadow-sm">
          <Icon name="Share2" size={17} className="text-[hsl(var(--text-secondary))]" />
          <span className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Пригласить +200</span>
        </button>
      </div>

      {/* Invite QR */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 mb-4 shadow-sm flex items-center gap-4">
        <div className="bg-[hsl(var(--gray-soft))] rounded-xl p-2 shrink-0">
          <img src={QR_INVITE} alt="QR приглашение" className="w-16 h-16" />
        </div>
        <div>
          <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">QR-код для друзей</p>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5 leading-relaxed">
            Поделитесь — вы получите <span className="font-bold text-[hsl(var(--primary))]">+200 Б</span>, друг получит <span className="font-bold text-[hsl(var(--primary))]">+150 Б</span> при первом визите
          </p>
        </div>
      </div>

      {/* Levels */}
      <div className="mb-4">
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Уровни клиентов</p>
        <div className="space-y-2">
          {levels.map((level, i) => {
            const isActive = level.name === currentLevel.name;
            return (
              <div key={i} className={`rounded-2xl p-3.5 border transition-all ${isActive ? "gradient-orange border-transparent" : "bg-white border-[hsl(var(--border))]"}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {isActive && <Icon name="Crown" size={14} className="text-white" />}
                    <p className={`font-golos font-semibold text-sm ${isActive ? "text-white" : "text-[hsl(var(--text-main))]"}`}>{level.name}</p>
                  </div>
                  <span className={`font-golos text-xs ${isActive ? "text-white/80" : "text-[hsl(var(--text-secondary))]"}`}>{level.range}</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {[["Услуги", level.discount], ["Косметика", level.cosm], ["Списание", level.writeoff]].map(([k, v]) => (
                    <span key={k} className={`font-golos text-xs ${isActive ? "text-white/80" : "text-[hsl(var(--text-secondary))]"}`}>
                      {k}: <span className={`font-semibold ${isActive ? "text-white" : "text-[hsl(var(--text-main))]"}`}>{v}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accrual table */}
      <div className="mb-4">
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Как начисляются баллы</p>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
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
            <div key={i} className="flex items-center gap-3 bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm">
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
