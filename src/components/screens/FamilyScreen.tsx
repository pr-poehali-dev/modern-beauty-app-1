import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface FamilyScreenProps {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

const PROFILE = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/16cbc8c4-ea9d-4083-9fff-12c510e31a77.jpg";
const MASHA   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/db101f73-ed27-44e6-bb2f-9ee28ae6fb24.jpg";
const MISHA   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/c1c9acb8-c2e4-4a05-8839-4413faf268b3.jpg";
const M1      = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";
const M2      = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";
const M3      = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/ebd24705-5d23-4a30-b95a-a058766b8e3f.jpg";

const members = [
  {
    id: 1,
    name: "Петрова Анна Алексеевна",
    role: "Я",
    relation: "Основной аккаунт",
    gender: "Женский",
    dob: "15 марта 1988",
    phone: "+7 (916) 123-45-67",
    img: PROFILE,
    masterImg: M1,
    masterName: "Анастасия Романова",
    masterSpec: "Колорист, стилист",
    favoriteServices: ["Стрижка + укладка", "Окрашивание (балаяж)", "Маска Olaplex"],
    preferredTime: "Будни, 14:00–18:00",
    hairType: "Тонкие, окрашенные, требуют увлажнения",
    allergies: "Аллергия на миндальное масло",
    notes: "Предпочитает стрижку на 2–3 см, укладку с лёгким объёмом у корней",
    lastVisit: "12 мая 2026",
    lastService: "Балаяж + стрижка",
    nextVisit: "29 июня 2026, 14:30",
    totalVisits: 24,
    totalSpend: 87400,
    yearSpend: 31200,
    avgCheck: 3642,
    bonusEarned: 2180,
    bonusSpent: 940,
    bonusBalance: 1240,
  },
  {
    id: 2,
    name: "Петрова Мария Алексеевна",
    role: "Дочь",
    relation: "Дочь",
    gender: "Женский",
    dob: "3 апреля 2016",
    phone: null,
    img: MASHA,
    masterImg: M2,
    masterName: "Мария Смирнова",
    masterSpec: "Мастер по стрижкам",
    favoriteServices: ["Детская стрижка"],
    preferredTime: "Выходные, 10:00–12:00",
    hairType: "Густые, вьющиеся, тёмные",
    allergies: null,
    notes: "Боится машинки — стричь только ножницами. Любит каре по плечи.",
    lastVisit: "1 мая 2026",
    lastService: "Детская стрижка",
    nextVisit: null,
    totalVisits: 8,
    totalSpend: 7200,
    yearSpend: 2700,
    avgCheck: 900,
    bonusEarned: 216,
    bonusSpent: 0,
    bonusBalance: 216,
  },
  {
    id: 3,
    name: "Петров Михаил Алексеевич",
    role: "Сын",
    relation: "Сын",
    gender: "Мужской",
    dob: "17 сентября 2012",
    phone: null,
    img: MISHA,
    masterImg: M3,
    masterName: "Елена Козлова",
    masterSpec: "Парикмахер-универсал",
    favoriteServices: ["Мужская стрижка"],
    preferredTime: "Выходные, любое время",
    hairType: "Прямые, тёмно-русые, средней густоты",
    allergies: null,
    notes: "Обычная стрижка машинкой + ножницами, не короче 2 см сверху",
    lastVisit: "15 апреля 2026",
    lastService: "Мужская стрижка",
    nextVisit: "12 июля 2026, 11:00",
    totalVisits: 12,
    totalSpend: 14400,
    yearSpend: 4800,
    avgCheck: 1200,
    bonusEarned: 432,
    bonusSpent: 0,
    bonusBalance: 432,
  },
];

const totalFamilySpend = members.reduce((s, m) => s + m.totalSpend, 0);
const totalFamilyVisits = members.reduce((s, m) => s + m.totalVisits, 0);
const totalFamilyBonus = members.reduce((s, m) => s + m.bonusBalance, 0);

export default function FamilyScreen({ onNavigate, onBack }: FamilyScreenProps) {
  const [selected, setSelected] = useState<typeof members[0] | null>(null);

  /* ── MEMBER DETAIL ── */
  if (selected) {
    const m = selected;
    return (
      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide animate-slide-in-right">
        {/* Hero */}
        <div className="relative bg-gradient-to-b from-[hsl(var(--orange-light))] to-white px-4 pt-4 pb-5 shrink-0">
          <button onClick={() => setSelected(null)}
            className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm mb-4">
            <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))]">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-[hsl(var(--primary))] text-white px-2 py-0.5 rounded-lg">{m.role}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-golos font-bold text-xl text-[hsl(var(--text-main))] leading-tight">{m.name}</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">{m.gender} · {m.dob}</p>
              {m.phone && <p className="font-golos text-xs text-[hsl(var(--primary))] font-semibold mt-0.5">{m.phone}</p>}
              {m.nextVisit && (
                <div className="flex items-center gap-1 mt-1.5">
                  <Icon name="Calendar" size={11} className="text-[hsl(var(--primary))]" />
                  <p className="font-golos text-[10px] font-semibold text-[hsl(var(--primary))]">Запись: {m.nextVisit}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 pb-6 flex flex-col gap-3">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Визитов",   value: String(m.totalVisits) },
              { label: "Потрачено", value: `${(m.totalSpend/1000).toFixed(0)}т₽` },
              { label: "За год",    value: `${(m.yearSpend/1000).toFixed(1)}т₽` },
              { label: "Ср. чек",   value: `${m.avgCheck}₽` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white border border-[hsl(var(--border))] rounded-xl p-2.5 text-center shadow-sm">
                <p className="font-golos font-bold text-base text-[hsl(var(--text-main))] leading-none">{value}</p>
                <p className="font-golos text-[9px] text-[hsl(var(--text-secondary))] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Bonus */}
          <div className="gradient-orange rounded-2xl px-4 py-3 text-white flex items-center justify-between">
            <div>
              <p className="font-golos text-white/70 text-[10px]">Бонусный баланс</p>
              <p className="font-golos font-bold text-2xl leading-none">{m.bonusBalance} Б</p>
              <p className="font-golos text-white/70 text-xs">= {m.bonusBalance} ₽</p>
            </div>
            <div className="text-right space-y-1">
              <p className="font-golos text-[10px] text-white/70">Начислено: <span className="text-white font-bold">+{m.bonusEarned} Б</span></p>
              <p className="font-golos text-[10px] text-white/70">Потрачено: <span className="text-white font-bold">−{m.bonusSpent} Б</span></p>
            </div>
          </div>

          {/* Favorite master */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[hsl(var(--border))]">
              <img src={m.masterImg} alt={m.masterName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Любимый мастер</p>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">{m.masterName}</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{m.masterSpec}</p>
            </div>
            <button onClick={() => onNavigate("masters")}
              className="font-golos text-xs font-bold text-[hsl(var(--primary))] shrink-0">Изменить</button>
          </div>

          {/* Last visit */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
              <Icon name="Clock" size={15} className="text-[hsl(var(--primary))]" />
            </div>
            <div className="flex-1">
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Последний визит</p>
              <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">{m.lastVisit}</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{m.lastService}</p>
            </div>
            {m.nextVisit ? (
              <div className="text-right shrink-0">
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Следующая запись</p>
                <p className="font-golos text-xs font-bold text-[hsl(var(--primary))] leading-snug">{m.nextVisit}</p>
              </div>
            ) : (
              <button onClick={() => onNavigate("booking")}
                className="gradient-orange text-white font-golos font-bold text-xs px-3 py-1.5 rounded-xl shrink-0">Записать</button>
            )}
          </div>

          {/* Services & preferences */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
            <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-2">Предпочтения</p>
            {[
              { icon: "Sparkles",  label: "Любимые услуги",      value: m.favoriteServices.join(", ") },
              { icon: "Clock",     label: "Удобное время",        value: m.preferredTime },
              { icon: "Layers",    label: "Тип волос / кожи",     value: m.hairType },
            ].map(({ icon, label, value }, i, arr) => (
              <div key={i} className={`px-4 py-3 flex items-start gap-3 ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
                <div className="w-7 h-7 bg-[hsl(var(--orange-light))] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name={icon} size={13} className="text-[hsl(var(--primary))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{label}</p>
                  <p className="font-golos text-sm text-[hsl(var(--text-main))] leading-snug">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Allergies & notes */}
          {(m.allergies || m.notes) && (
            <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
              <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-2">Особые заметки для мастера</p>
              {m.allergies && (
                <div className="px-4 py-3 flex items-start gap-3 border-b border-[hsl(var(--border))]">
                  <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="AlertCircle" size={13} className="text-red-500" />
                  </div>
                  <div>
                    <p className="font-golos text-[10px] text-red-400 font-semibold">Аллергия / противопоказания</p>
                    <p className="font-golos text-sm text-[hsl(var(--text-main))]">{m.allergies}</p>
                  </div>
                </div>
              )}
              {m.notes && (
                <div className="px-4 py-3 flex items-start gap-3">
                  <div className="w-7 h-7 bg-[hsl(var(--orange-light))] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="FileText" size={13} className="text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Пожелания</p>
                    <p className="font-golos text-sm text-[hsl(var(--text-main))]">{m.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <button onClick={() => onNavigate("booking")}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow flex items-center justify-center gap-2">
            <Icon name="CalendarPlus" size={18} />
            Записать {m.name.split(" ")[0]}
          </button>
        </div>
      </div>
    );
  }

  /* ── LIST ── */
  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-4 gap-3 animate-fade-in overflow-y-auto scrollbar-hide">

      {/* Header */}
      <div className="flex items-center gap-3 shrink-0">
        <button onClick={onBack}
          className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm">
          <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
        </button>
        <div>
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Семейный профиль</h2>
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Семья Петровых · {members.length} человека</p>
        </div>
      </div>

      {/* Family totals */}
      <div className="gradient-orange rounded-2xl px-4 py-3.5 text-white orange-glow">
        <p className="font-golos text-white/70 text-[10px] mb-2">Общая статистика семьи</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Визитов", value: String(totalFamilyVisits) },
            { label: "Потрачено", value: `${(totalFamilySpend/1000).toFixed(0)} т₽` },
            { label: "Бонусов", value: `${totalFamilyBonus} Б` },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-golos font-bold text-xl leading-none">{value}</p>
              <p className="font-golos text-white/70 text-[10px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Members */}
      <div className="flex flex-col gap-2">
        {members.map(m => (
          <button key={m.id} onClick={() => setSelected(m)}
            className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm text-left w-full transition-all active:scale-98">
            <div className="px-4 py-3.5 flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))]/30">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-[hsl(var(--primary))] text-white px-1.5 py-0.5 rounded-md">{m.role}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">{m.name}</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{m.dob} · {m.gender}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">
                    <span className="font-semibold text-[hsl(var(--text-main))]">{m.totalVisits}</span> визитов
                  </span>
                  <span className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold">{m.bonusBalance} Б</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="flex items-center gap-1">
                  <img src={m.masterImg} alt="" className="w-5 h-5 rounded-lg object-cover" />
                  <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{m.masterName.split(" ")[0]}</p>
                </div>
                {m.nextVisit ? (
                  <span className="font-golos text-[10px] text-[hsl(var(--primary))] font-bold bg-[hsl(var(--orange-light))] px-2 py-0.5 rounded-lg">
                    {m.nextVisit.split(",")[0]}
                  </span>
                ) : (
                  <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">нет записи</span>
                )}
                <Icon name="ChevronRight" size={14} className="text-[hsl(var(--text-secondary))]" />
              </div>
            </div>
            {/* Last visit strip */}
            <div className="px-4 pb-3 flex items-center gap-2 border-t border-[hsl(var(--border))]">
              <Icon name="Clock" size={11} className="text-[hsl(var(--text-secondary))] shrink-0" />
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">
                Последний визит: <span className="font-semibold text-[hsl(var(--text-main))]">{m.lastVisit}</span> — {m.lastService}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Add member */}
      <button className="bg-white border-2 border-dashed border-[hsl(var(--border))] rounded-2xl py-4 flex items-center justify-center gap-2">
        <div className="w-8 h-8 gradient-orange rounded-xl flex items-center justify-center orange-glow">
          <Icon name="Plus" size={16} className="text-white" />
        </div>
        <div className="text-left">
          <p className="font-golos text-sm font-semibold text-[hsl(var(--text-main))]">Добавить члена семьи</p>
          <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-bold">+100 бонусных баллов</p>
        </div>
      </button>

      {/* Loyalty info */}
      <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-start gap-3">
        <Icon name="Info" size={14} className="text-[hsl(var(--primary))] shrink-0 mt-0.5" />
        <div>
          <p className="font-golos font-semibold text-xs text-[hsl(var(--text-main))]">Программа лояльности</p>
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] leading-relaxed mt-0.5">
            Запись через приложение +50 Б · За каждую услугу 2% от суммы баллами · Семейный визит (3+ чел.) +250 Б
          </p>
        </div>
      </div>
    </div>
  );
}