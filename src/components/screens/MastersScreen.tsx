import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface MastersScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";
const MASTER2 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";
const MASTER3 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/ebd24705-5d23-4a30-b95a-a058766b8e3f.jpg";
const MASTER4 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/8c5a4941-6d8d-445a-908c-537218ec19c5.jpg";
const WORK1   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/7c69e209-43ba-4185-b561-0b5a8cff492d.jpg";
const WORK2   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/16cbc8c4-ea9d-4083-9fff-12c510e31a77.jpg";
const WORK3   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/074f6916-0888-4bbb-a368-79f2886fb8e8.jpg";

const masters = [
  { name: "Анастасия Романова", title: "Колорист, стилист",      experience: "9 лет", rating: 4.9, reviews: 127, bio: "Сложное окрашивание, авторские техники. Победитель чемпионата по колористике 2024.", specialties: ["Балаяж", "Омбре", "Окрашивание", "Стрижки"], freeSlot: "Завтра, 10:00",       favorite: true,  avatar: MASTER1, gallery: [WORK1, WORK2, WORK3] },
  { name: "Мария Смирнова",     title: "Мастер по стрижкам",     experience: "6 лет", rating: 4.8, reviews: 89,  bio: "Классические и современные стрижки для всей семьи. Детские стрижки — особая любовь.", specialties: ["Женские", "Мужские", "Детские стрижки"],     freeSlot: "Сегодня, 16:00",     favorite: false, avatar: MASTER2, gallery: [WORK2, WORK1, WORK3] },
  { name: "Елена Козлова",      title: "Маникюр и брови",        experience: "7 лет", rating: 4.9, reviews: 203, bio: "Сертифицированный мастер маникюра, гель-лаки премиум. Эксперт по коррекции бровей.",  specialties: ["Маникюр", "Педикюр", "Брови", "Ресницы"],    freeSlot: "Завтра, 14:30",      favorite: false, avatar: MASTER3, gallery: [WORK3, WORK1, WORK2] },
  { name: "Светлана Новикова",  title: "Парикмахер-универсал",   experience: "11 лет", rating: 4.7, reviews: 156, bio: "Универсальный мастер с 11-летним опытом. Работает с любым типом и состоянием волос.",  specialties: ["Стрижки", "Укладки", "Уход за волосами"],    freeSlot: "Послезавтра, 12:00", favorite: false, avatar: MASTER4, gallery: [WORK1, WORK3, WORK2] },
];

const filters = ["Все", "Стрижки", "Окрашивание", "Маникюр", "Брови", "Укладки"];

type DetailTab = "info" | "gallery";

export default function MastersScreen({ onNavigate }: MastersScreenProps) {
  const [selected, setSelected] = useState<typeof masters[0] | null>(null);
  const [filter, setFilter] = useState("Все");
  const [detailTab, setDetailTab] = useState<DetailTab>("info");

  const filtered = filter === "Все"
    ? masters
    : masters.filter(m => m.specialties.some(s => s.toLowerCase().includes(filter.toLowerCase())));

  /* ── DETAIL ── */
  if (selected) {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-2 gap-2.5 animate-slide-in-right">
        {/* Back + name */}
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setSelected(null)}
            className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-golos font-bold text-base text-[hsl(var(--text-main))] truncate">{selected.name}</p>
            <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{selected.title}</p>
          </div>
          {selected.favorite && (
            <div className="gradient-orange rounded-xl px-2.5 py-1 shrink-0">
              <span className="font-golos text-white text-[10px] font-bold">❤ Любимый</span>
            </div>
          )}
        </div>

        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden h-44 shrink-0">
          <img src={selected.avatar} alt={selected.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/20 rounded-xl px-2.5 py-1">
                <Icon name="Star" size={12} className="text-yellow-300 fill-yellow-300" />
                <span className="font-golos font-bold text-white text-sm">{selected.rating}</span>
                <span className="font-golos text-white/70 text-xs">({selected.reviews})</span>
              </div>
              <span className="font-golos text-white/80 text-xs">Стаж {selected.experience}</span>
            </div>
          </div>
        </div>

        {/* Detail tabs */}
        <div className="flex bg-white rounded-2xl p-1 gap-1 border border-[hsl(var(--border))] shadow-sm shrink-0">
          {([["info","О мастере"], ["gallery","Работы (3)"]] as [DetailTab,string][]).map(([key, label]) => (
            <button key={key} onClick={() => setDetailTab(key)}
              className={`flex-1 py-2 rounded-xl font-golos text-xs font-semibold transition-all ${detailTab === key ? "gradient-orange text-white shadow-sm" : "text-[hsl(var(--text-secondary))]"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Info tab */}
        {detailTab === "info" && (
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide min-h-0 animate-fade-in">
            <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm">
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{selected.bio}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selected.specialties.map(s => (
                <span key={s} className="font-golos text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] px-3 py-1.5 rounded-xl">{s}</span>
              ))}
            </div>
            <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-center gap-3">
              <Icon name="Clock" size={16} className="text-[hsl(var(--primary))] shrink-0" />
              <div>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Ближайшее окно</p>
                <p className="font-golos font-semibold text-sm text-[hsl(var(--primary))]">{selected.freeSlot}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => onNavigate("booking")} className="py-3.5 gradient-orange text-white font-golos font-semibold text-sm rounded-2xl orange-glow">Записаться</button>
              <button onClick={() => onNavigate("chat")} className="py-3.5 bg-white border border-[hsl(var(--border))] text-[hsl(var(--text-main))] font-golos font-semibold text-sm rounded-2xl shadow-sm">Написать</button>
            </div>
          </div>
        )}

        {/* Gallery tab */}
        {detailTab === "gallery" && (
          <div className="grid grid-cols-3 gap-2 animate-fade-in flex-1 content-start overflow-y-auto scrollbar-hide min-h-0">
            {selected.gallery.map((img, n) => (
              <div key={n} className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                <img src={img} alt={`Работа ${n+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── LIST ── */
  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-2.5 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Наши мастера</h2>
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{filtered.length} специалиста</p>
        </div>
        <button onClick={() => onNavigate("booking")} className="gradient-orange text-white font-golos font-bold text-xs px-3 py-2 rounded-xl orange-glow">
          Записаться
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide shrink-0">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-golos text-xs font-semibold transition-all shrink-0 ${filter === f ? "gradient-orange text-white shadow-sm" : "bg-white border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))]"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Master cards — compact rows */}
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 space-y-2">
        {filtered.map((master, i) => (
          <button key={master.name} onClick={() => { setSelected(master); setDetailTab("info"); }}
            className="w-full bg-white border border-[hsl(var(--border))] rounded-2xl p-3 flex items-center gap-3 shadow-sm text-left animate-fade-in-up transition-all active:scale-98"
            style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="relative shrink-0">
              <img src={master.avatar} alt={master.name} className="w-14 h-14 rounded-2xl object-cover object-top" />
              {master.favorite && (
                <div className="absolute -top-1 -right-1 w-5 h-5 gradient-orange rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={10} className="text-white fill-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] truncate">{master.name}</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] truncate">{master.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-golos text-xs font-semibold">{master.rating}</span>
                  <span className="font-golos text-xs text-[hsl(var(--text-secondary))]"> ({master.reviews})</span>
                </div>
                <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">·</span>
                <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">Стаж {master.experience}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 justify-end">
                <Icon name="Clock" size={11} className="text-[hsl(var(--primary))]" />
                <span className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold whitespace-nowrap">{master.freeSlot}</span>
              </div>
              <Icon name="ChevronRight" size={15} className="text-[hsl(var(--text-secondary))] mt-1 ml-auto" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
