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
  {
    name: "Анастасия Романова", title: "Старший колорист, стилист",
    experience: "9 лет", rating: 4.9, reviews: 127,
    bio: "Специализируется на сложном окрашивании и авторских техниках. Победитель регионального чемпионата по колористике 2024.",
    specialties: ["Балаяж", "Омбре", "Сложное окрашивание", "Стрижки"],
    freeSlot: "Завтра, 10:00", favorite: true,
    avatar: MASTER1, gallery: [WORK1, WORK2, WORK3, WORK1, WORK2, WORK3],
  },
  {
    name: "Мария Смирнова", title: "Мастер по стрижкам",
    experience: "6 лет", rating: 4.8, reviews: 89,
    bio: "Мастер классических и современных стрижек для всей семьи. Особая любовь — детские стрижки.",
    specialties: ["Женские стрижки", "Мужские стрижки", "Детские стрижки"],
    freeSlot: "Сегодня, 16:00", favorite: false,
    avatar: MASTER2, gallery: [WORK2, WORK1, WORK3, WORK2, WORK3, WORK1],
  },
  {
    name: "Елена Козлова", title: "Мастер маникюра и бровей",
    experience: "7 лет", rating: 4.9, reviews: 203,
    bio: "Сертифицированный мастер маникюра. Работает с гель-лаками премиум класса. Эксперт по коррекции бровей.",
    specialties: ["Маникюр", "Педикюр", "Брови", "Ресницы"],
    freeSlot: "Завтра, 14:30", favorite: false,
    avatar: MASTER3, gallery: [WORK3, WORK1, WORK2, WORK3, WORK1, WORK2],
  },
  {
    name: "Светлана Новикова", title: "Парикмахер-универсал",
    experience: "11 лет", rating: 4.7, reviews: 156,
    bio: "Универсальный мастер с многолетним опытом. Работает с любым типом волос.",
    specialties: ["Стрижки", "Укладки", "Уход за волосами"],
    freeSlot: "Послезавтра, 12:00", favorite: false,
    avatar: MASTER4, gallery: [WORK1, WORK3, WORK2, WORK1, WORK3, WORK2],
  },
];

const specialtyFilters = ["Все", "Стрижки", "Окрашивание", "Маникюр", "Брови", "Укладки"];

export default function MastersScreen({ onNavigate }: MastersScreenProps) {
  const [selected, setSelected] = useState<typeof masters[0] | null>(null);
  const [filter, setFilter] = useState("Все");

  if (selected) {
    return (
      <div className="pb-4 animate-slide-in-right">
        {/* Back */}
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 px-5 pt-4 pb-3 font-golos text-sm text-[hsl(var(--text-secondary))]"
        >
          <Icon name="ChevronLeft" size={18} />
          Назад
        </button>

        {/* Hero */}
        <div className="px-5 mb-4">
          <div className="relative rounded-3xl overflow-hidden h-64">
            <img src={selected.avatar} alt={selected.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="font-golos font-bold text-xl text-white">{selected.name}</h2>
              <p className="font-golos text-white/80 text-sm">{selected.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-golos font-semibold text-white text-sm">{selected.rating}</span>
                </div>
                <span className="font-golos text-white/70 text-sm">{selected.reviews} отзывов</span>
                <span className="font-golos text-white/70 text-sm">Стаж {selected.experience}</span>
              </div>
            </div>
            {selected.favorite && (
              <div className="absolute top-4 right-4 bg-[hsl(var(--primary))] rounded-xl px-2.5 py-1">
                <span className="font-golos text-white text-xs font-semibold">❤ Любимый</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 space-y-4">
          {/* Bio */}
          <div className="bg-[hsl(var(--gray-soft))] rounded-2xl p-4">
            <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{selected.bio}</p>
          </div>

          {/* Specialties */}
          <div>
            <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-2">Специализации</p>
            <div className="flex flex-wrap gap-2">
              {selected.specialties.map((s) => (
                <span key={s} className="font-golos text-sm bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))] px-3 py-1.5 rounded-xl font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-2">Работы</p>
            <div className="grid grid-cols-3 gap-2">
              {selected.gallery.map((img, n) => (
                <div key={n} className="aspect-square rounded-xl overflow-hidden">
                  <img src={img} alt={`Работа ${n + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Free slot */}
          <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-3.5 flex items-center gap-3">
            <Icon name="Clock" size={18} className="text-[hsl(var(--primary))]" />
            <div>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Ближайшее окно</p>
              <p className="font-golos font-semibold text-[hsl(var(--primary))]">{selected.freeSlot}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate("booking")}
              className="py-3.5 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
            >
              Записаться
            </button>
            <button
              onClick={() => onNavigate("chat")}
              className="py-3.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-semibold rounded-2xl"
            >
              Задать вопрос
            </button>
          </div>
          <button className="w-full py-3 border border-[hsl(var(--border))] rounded-2xl flex items-center justify-center gap-2 font-golos text-sm font-medium text-[hsl(var(--text-secondary))]">
            <Icon name="Heart" size={16} className="text-[hsl(var(--primary))]" />
            Добавить в любимые
          </button>
        </div>
      </div>
    );
  }

  const filteredMasters = filter === "Все"
    ? masters
    : masters.filter(m => m.specialties.some(s => s.toLowerCase().includes(filter.toLowerCase())));

  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">Наши мастера</h2>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{filteredMasters.length} специалист{filteredMasters.length !== 1 ? "а" : ""}</p>
        </div>
      </div>

      {/* Specialty filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-4">
        {specialtyFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-golos text-sm font-medium transition-all shrink-0 ${
              filter === f
                ? "gradient-orange text-white"
                : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-secondary))]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredMasters.map((master, i) => (
          <button
            key={master.name}
            onClick={() => setSelected(master)}
            className="w-full bg-white border border-[hsl(var(--border))] rounded-2xl p-4 flex items-center gap-3 card-shadow text-left animate-fade-in-up transition-all active:scale-98"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative">
              <img src={master.avatar} alt={master.name} className="w-16 h-16 rounded-2xl object-cover object-top" />
              {master.favorite && (
                <div className="absolute -top-1 -right-1 w-5 h-5 gradient-orange rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={10} className="text-white fill-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-golos font-semibold text-[hsl(var(--text-main))] text-sm">{master.name}</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">{master.title}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-golos text-xs font-semibold">{master.rating}</span>
                  <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">({master.reviews})</span>
                </div>
                <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">Стаж {master.experience}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Icon name="Clock" size={11} className="text-[hsl(var(--primary))]" />
                <span className="font-golos text-xs text-[hsl(var(--primary))] font-medium">{master.freeSlot}</span>
              </div>
            </div>
            <Icon name="ChevronRight" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
        ))}
      </div>
    </div>
  );
}