import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface LoyaltyScreenProps {
  onNavigate: (screen: Screen) => void;
}

const QR_CLIENT = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=1a1108&bgcolor=fff8f0&data=client:00142:modern-salon&qzone=2";
const QR_INVITE = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=1a1108&bgcolor=fff8f0&data=https://modern-beauty-salon-app--preview.poehali.dev/invite/00142&qzone=1";

const levels = [
  { name: "Новый клиент",      range: "0–499 б",    discount: "5%",  min: 0    },
  { name: "Постоянный гость",  range: "500–1499 б",  discount: "10%", min: 500  },
  { name: "Постоянный клиент", range: "1500–2999 б", discount: "15%", min: 1500 },
  { name: "Любимый клиент",    range: "3000+ б",     discount: "20%", min: 3000 },
];

const earnActions = [
  { action: "Первая запись через приложение", points: "+150" },
  { action: "Запись через приложение",        points: "+50"  },
  { action: "Посещение услуги",               points: "+2%"  },
  { action: "Добавление члена семьи",         points: "+100" },
  { action: "День рождения клиента",          points: "+200" },
  { action: "Отзыв с фото",                  points: "+50"  },
  { action: "Приглашение друга",              points: "+200" },
  { action: "Семейный визит (3+ чел.)",       points: "+250" },
];

const pointsHistory = [
  { date: "12 мая 2026",  desc: "Балаяж + стрижка (2% от 8 500 ₽)", points: "+170", expiry: "12 ноября 2026" },
  { date: "1 мая 2026",   desc: "Запись через приложение",            points: "+50",  expiry: "1 ноября 2026"  },
  { date: "1 мая 2026",   desc: "Семейный визит (+3 чел.)",           points: "+250", expiry: "1 ноября 2026"  },
  { date: "20 апр. 2026", desc: "Маникюр (2% от 1 500 ₽)",           points: "+30",  expiry: "20 октября 2026" },
  { date: "1 мая 2026",   desc: "Детская стрижка (2% от 900 ₽)",     points: "+18",  expiry: "1 ноября 2026"  },
];

const currentPoints = 1240;
const currentLevel = levels[1];
const nextLevel = levels[2];
const progressPercent = Math.min(((currentPoints - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100, 100);

type Tab = "card" | "program" | "history";

export default function LoyaltyScreen({ onNavigate }: LoyaltyScreenProps) {
  const [tab, setTab] = useState<Tab>("card");

  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-3 animate-fade-in">

      {/* Tab switcher */}
      <div className="flex bg-white rounded-2xl p-1 gap-1 border border-[hsl(var(--border))] shadow-sm">
        {([["card","Бонусная карта"], ["program","Программа"], ["history","История"]] as [Tab,string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 py-2 rounded-xl font-golos text-xs font-semibold transition-all ${
              tab === key ? "gradient-orange text-white shadow-sm" : "text-[hsl(var(--text-secondary))]"
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB: CARD ── */}
      {tab === "card" && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {/* Main bonus card */}
          <div className="gradient-orange rounded-2xl px-4 py-4 text-white orange-glow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-golos text-white/70 text-[10px]">Баланс бонусов</p>
                <p className="font-golos font-bold text-3xl leading-none mt-0.5">1 240</p>
                <p className="font-golos text-white/70 text-xs mt-0.5">= 1 240 ₽ <span className="text-white/50 text-[10px]">(1 Б = 1 ₽)</span></p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 rounded-xl px-2.5 py-1 mb-1">
                  <p className="font-golos font-semibold text-xs">⭐ {currentLevel.name}</p>
                </div>
                <p className="font-golos text-white/60 text-[10px]">Скидка {currentLevel.discount}</p>
              </div>
            </div>
            {/* Progress */}
            <div className="bg-white/15 rounded-xl p-2.5 mb-2">
              <div className="flex justify-between mb-1.5">
                <p className="font-golos text-[10px] text-white/80">До «{nextLevel.name}»</p>
                <p className="font-golos text-[10px] font-semibold text-white">{nextLevel.min - currentPoints} б</p>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <Icon name="AlertTriangle" size={12} className="text-yellow-200 shrink-0" />
              <p className="font-golos text-[10px] text-white/90">
                <span className="font-semibold text-yellow-200">320 баллов</span> сгорают 23 июля 2026
              </p>
            </div>
          </div>

          {/* QR Card */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-2.5 shrink-0">
              <img src={QR_CLIENT} alt="QR бонусная карта" className="w-24 h-24" />
            </div>
            <div className="flex-1">
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">Бонусная карта</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">ID: 00142 · Петрова Анна Николаевна</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] mt-2 leading-relaxed">
                Покажите QR-код мастеру или на кассе для начисления баллов
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="w-1.5 h-1.5 gradient-orange rounded-full" />
                <span className="font-golos text-[10px] font-semibold text-[hsl(var(--primary))]">+20 Б за каждый визит</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => onNavigate("booking")}
              className="gradient-orange text-white rounded-2xl py-3 flex items-center justify-center gap-2 orange-glow">
              <Icon name="Zap" size={15} className="text-white" />
              <span className="font-golos font-semibold text-sm">Потратить баллы</span>
            </button>
            <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-3 flex items-center gap-3 shadow-sm">
              <div className="bg-[hsl(var(--gray-soft))] rounded-xl p-1.5 shrink-0">
                <img src={QR_INVITE} alt="Пригласить" className="w-9 h-9" />
              </div>
              <div>
                <p className="font-golos font-semibold text-xs text-[hsl(var(--text-main))]">Пригласить друга</p>
                <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold">+200 Б вам</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: PROGRAM ── */}
      {tab === "program" && (
        <div className="flex flex-col gap-2 animate-fade-in">
          {/* Levels */}
          <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Уровни клиентов</p>
          <div className="grid grid-cols-2 gap-2">
            {levels.map((level, i) => {
              const isActive = level.name === currentLevel.name;
              return (
                <div key={i} className={`rounded-2xl p-3 ${isActive ? "gradient-orange text-white orange-glow" : "bg-white border border-[hsl(var(--border))] shadow-sm"}`}>
                  <div className="flex items-center gap-1 mb-1">
                    {isActive && <Icon name="Crown" size={11} className="text-white shrink-0" />}
                    <p className={`font-golos font-bold text-xs truncate ${isActive ? "text-white" : "text-[hsl(var(--text-main))]"}`}>{level.name}</p>
                  </div>
                  <p className={`font-golos text-[10px] ${isActive ? "text-white/70" : "text-[hsl(var(--text-secondary))]"}`}>{level.range}</p>
                  <p className={`font-golos font-bold text-base mt-1 ${isActive ? "text-white" : "text-[hsl(var(--primary))]"}`}>{level.discount}</p>
                  <p className={`font-golos text-[9px] ${isActive ? "text-white/70" : "text-[hsl(var(--text-secondary))]"}`}>скидка на услуги</p>
                </div>
              );
            })}
          </div>

          {/* Expiry notice */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
            <Icon name="AlertTriangle" size={15} className="text-yellow-500 shrink-0" />
            <p className="font-golos text-xs text-yellow-800">
              Баллы сгорают через <span className="font-bold">6 месяцев</span> с момента начисления. Следите за датами в «Истории».
            </p>
          </div>

          {/* How to earn */}
          <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] mt-1">Как получить баллы</p>
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
            {earnActions.map((item, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-2.5 ${i < earnActions.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
                <span className="font-golos text-xs text-[hsl(var(--text-secondary))] flex-1 pr-2">{item.action}</span>
                <span className="font-golos font-bold text-xs text-[hsl(var(--primary))] whitespace-nowrap">{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: HISTORY ── */}
      {tab === "history" && (
        <div className="flex flex-col gap-2 animate-fade-in">
          <div className="gradient-orange rounded-2xl px-4 py-3 text-white flex items-center justify-between">
            <div>
              <p className="font-golos text-white/70 text-[10px]">Накоплено всего</p>
              <p className="font-golos font-bold text-2xl">1 240 Б</p>
              <p className="font-golos text-white/60 text-[10px]">= 1 240 ₽ (1 Б = 1 ₽)</p>
            </div>
            <div className="text-right">
              <p className="font-golos text-white/70 text-[10px]">Потрачено</p>
              <p className="font-golos font-bold text-2xl">430 Б</p>
              <p className="font-golos text-white/60 text-[10px]">= 430 ₽</p>
            </div>
          </div>
          <div className="space-y-2">
            {pointsHistory.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm">
                <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="Sparkles" size={14} className="text-[hsl(var(--primary))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))] truncate">{item.desc}</p>
                  <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{item.date} · до {item.expiry}</p>
                </div>
                <span className="font-golos font-bold text-sm text-[hsl(var(--primary))] shrink-0">{item.points}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate("booking")}
            className="w-full py-3 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow flex items-center justify-center gap-2 mt-1">
            <Icon name="Zap" size={16} />
            Потратить баллы
          </button>
        </div>
      )}
    </div>
  );
}