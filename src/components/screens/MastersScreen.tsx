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
    name: "Анастасия Романова", title: "Стилист-колорист", quote: "«Создаю образы, которые меняют жизнь»",
    experience: "9 лет", rating: 4.9, reviews: 127, favorite: true,
    bio: "Специализируется на сложном окрашивании и авторских техниках. Победитель регионального чемпионата по колористике 2024.",
    specialties: ["Балаяж", "Омбре", "Сложное окрашивание", "Стрижки"],
    freeSlot: "Завтра, 10:00",
    avatar: MASTER1,
    works: [
      { before: WORK1, after: WORK2, desc: "Балаяж на тёмных волосах" },
      { before: WORK3, after: WORK1, desc: "Омбре, натуральные тона"  },
    ],
    certs: [
      "Колористика L'Oréal Professionnel 2023",
      "Мастер-класс Wella Professionals 2022",
      "Balayage Expert, Schwarzkopf 2021",
    ],
  },
  {
    name: "Мария Смирнова", title: "Мастер по стрижкам", quote: "«Стрижка — начало нового образа»",
    experience: "6 лет", rating: 4.8, reviews: 89, favorite: false,
    bio: "Мастер классических и современных стрижек для всей семьи. Особая любовь — детские стрижки.",
    specialties: ["Женские стрижки", "Мужские стрижки", "Детские стрижки"],
    freeSlot: "Сегодня, 16:00",
    avatar: MASTER2,
    works: [
      { before: WORK2, after: WORK3, desc: "Каре на длинных волосах"  },
      { before: WORK1, after: WORK2, desc: "Слои и текстура"          },
    ],
    certs: [
      "Курс стрижек Toni&Guy Academy 2023",
      "Детские стрижки, сертификат Comber 2022",
    ],
  },
  {
    name: "Елена Козлова", title: "Мастер маникюра и бровей", quote: "«Детали делают образ завершённым»",
    experience: "7 лет", rating: 4.9, reviews: 203, favorite: false,
    bio: "Сертифицированный мастер маникюра. Работает с гель-лаками премиум класса.",
    specialties: ["Маникюр", "Педикюр", "Брови", "Ресницы"],
    freeSlot: "Завтра, 14:30",
    avatar: MASTER3,
    works: [
      { before: WORK3, after: WORK1, desc: "Маникюр с дизайном"    },
      { before: WORK2, after: WORK3, desc: "Коррекция формы бровей" },
    ],
    certs: [
      "Nail Art Professional 2024",
      "Brovi Master, Академия красоты 2022",
    ],
  },
  {
    name: "Светлана Новикова", title: "Парикмахер-универсал", quote: "«Каждый клиент — новая история»",
    experience: "11 лет", rating: 4.7, reviews: 156, favorite: false,
    bio: "Универсальный мастер с многолетним опытом. Работает с любым типом волос.",
    specialties: ["Стрижки", "Укладки", "Уход за волосами"],
    freeSlot: "Послезавтра, 12:00",
    avatar: MASTER4,
    works: [
      { before: WORK1, after: WORK3, desc: "Укладка и завивка"       },
      { before: WORK3, after: WORK2, desc: "Выпрямление и уход Olaplex" },
    ],
    certs: [
      "Кератиновое выпрямление 2023",
      "Уход за волосами Olaplex Pro 2022",
      "Стажировка в Москве, Chop-Chop 2020",
    ],
  },
];

const filters = ["Все", "Стрижки", "Окрашивание", "Маникюр", "Брови", "Укладки"];

type DetailTab = "works" | "certs";

export default function MastersScreen({ onNavigate }: MastersScreenProps) {
  const [selected, setSelected] = useState<typeof masters[0] | null>(null);
  const [filter, setFilter] = useState("Все");
  const [detailTab, setDetailTab] = useState<DetailTab>("works");

  const filtered = filter === "Все"
    ? masters
    : masters.filter(m => m.specialties.some(s => s.toLowerCase().includes(filter.toLowerCase())));

  /* ── MASTER DETAIL (как на макете) ── */
  if (selected) {
    return (
      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide animate-slide-in-right">

        {/* HERO — полноэкранное фото с overlay */}
        <div className="relative w-full h-72 shrink-0">
          <img src={selected.avatar} alt={selected.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          {/* Back button */}
          <button onClick={() => setSelected(null)}
            className="absolute top-4 left-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon name="ChevronLeft" size={20} className="text-white" />
          </button>
          {/* Master info overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <p className="font-golos text-white/70 text-xs uppercase tracking-widest mb-0.5">{selected.title}</p>
            <h2 className="font-golos font-bold text-2xl text-white leading-tight">{selected.name}</h2>
            <p className="font-golos italic text-white/80 text-sm mt-0.5">{selected.quote}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Icon key={s} name="Star" size={13} className={s <= Math.floor(selected.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/30"} />
                ))}
                <span className="font-golos font-bold text-white text-sm ml-1">{selected.rating}</span>
              </div>
              <span className="text-white/50">·</span>
              <span className="font-golos text-white/70 text-sm">{selected.reviews} отзывов</span>
              <span className="text-white/50">·</span>
              <span className="font-golos text-white/70 text-sm">{selected.experience} опыта</span>
            </div>
          </div>
        </div>

        {/* Book button */}
        <div className="px-4 pt-3 pb-2 shrink-0">
          <button onClick={() => onNavigate("booking")}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow flex items-center justify-center gap-2">
            <Icon name="CalendarPlus" size={18} />
            Записаться к {selected.name.split(" ")[0]}
          </button>
        </div>

        {/* Specialties */}
        <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {selected.specialties.map(s => (
            <span key={s} className="font-golos text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] px-3 py-1 rounded-xl">{s}</span>
          ))}
          <span className="font-golos text-xs text-[hsl(var(--text-secondary))] bg-white border border-[hsl(var(--border))] px-3 py-1 rounded-xl">
            ⏰ {selected.freeSlot}
          </span>
        </div>

        {/* Tab switcher */}
        <div className="px-4 pb-2 shrink-0">
          <div className="flex bg-white rounded-2xl p-1 gap-1 border border-[hsl(var(--border))] shadow-sm">
            {([["works","Мои работы"], ["certs","Сертификаты и образование"]] as [DetailTab, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setDetailTab(key)}
                className={`flex-1 py-2 rounded-xl font-golos text-xs font-semibold transition-all ${detailTab === key ? "gradient-orange text-white shadow-sm" : "text-[hsl(var(--text-secondary))]"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── WORKS TAB ── */}
        {detailTab === "works" && (
          <div className="px-4 pb-4 space-y-3 animate-fade-in">
            {selected.works.map((work, i) => (
              <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative">
                    <img src={work.before} alt="До" className="w-full aspect-square object-cover" />
                    <div className="absolute top-2 left-2 bg-black/60 text-white font-golos text-[10px] font-bold px-2 py-0.5 rounded-lg">ДО</div>
                  </div>
                  <div className="relative">
                    <img src={work.after} alt="После" className="w-full aspect-square object-cover" />
                    <div className="absolute top-2 left-2 bg-[hsl(var(--primary))]/90 text-white font-golos text-[10px] font-bold px-2 py-0.5 rounded-lg">ПОСЛЕ</div>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <p className="font-golos text-sm font-semibold text-[hsl(var(--text-main))]">{work.desc}</p>
                </div>
              </div>
            ))}
            <button onClick={() => onNavigate("booking")}
              className="w-full py-3.5 bg-white border border-[hsl(var(--border))] rounded-2xl font-golos font-semibold text-sm text-[hsl(var(--text-main))] shadow-sm">
              Записаться к {selected.name.split(" ")[0]} →
            </button>
          </div>
        )}

        {/* ── CERTS TAB ── */}
        {detailTab === "certs" && (
          <div className="px-4 pb-4 space-y-2 animate-fade-in">
            {/* Bio */}
            <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm">
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{selected.bio}</p>
            </div>
            {/* Certificates */}
            {selected.certs.map((cert, i) => (
              <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="FileText" size={15} className="text-[hsl(var(--primary))]" />
                </div>
                <p className="font-golos text-sm text-[hsl(var(--text-main))]">{cert}</p>
              </div>
            ))}
            <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-center gap-3">
              <Icon name="Clock" size={15} className="text-[hsl(var(--primary))] shrink-0" />
              <div>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Ближайшее свободное время</p>
                <p className="font-golos font-bold text-sm text-[hsl(var(--primary))]">{selected.freeSlot}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── MASTER LIST ── */
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
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-golos text-xs font-semibold shrink-0 transition-all ${filter === f ? "gradient-orange text-white shadow-sm" : "bg-white border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))]"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Master cards — thumbnail grid 2-col */}
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 grid grid-cols-2 gap-2 content-start">
        {filtered.map((master) => (
          <button key={master.name} onClick={() => { setSelected(master); setDetailTab("works"); }}
            className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm text-left transition-all active:scale-95 flex flex-col">
            {/* Photo */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img src={master.avatar} alt={master.name} className="w-full h-full object-cover object-top" />
              {master.favorite && (
                <div className="absolute top-2 right-2 w-6 h-6 gradient-orange rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={11} className="text-white fill-white" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="font-golos text-white text-xs font-bold">{master.rating}</span>
              </div>
            </div>
            {/* Info */}
            <div className="px-3 py-2.5 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] leading-tight">{master.name.split(" ")[0]} {master.name.split(" ")[1]?.charAt(0)}.</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] mt-0.5">{master.title}</p>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <Icon name="Clock" size={10} className="text-[hsl(var(--primary))]" />
                <span className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold">{master.freeSlot}</span>
              </div>
              <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-bold mt-1.5">Профиль →</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
