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
const WORK4   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/2be3e3de-8a61-40c6-b1ec-f14e8efa4bba.jpg";
const MANI_B1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/adfc4523-64c1-4d11-8b15-aac3676977d4.jpg";
const MANI_A1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/163e42f3-3bf1-43b8-8eef-8f85a73c696c.jpg";
const MANI_A2 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/48937ed0-5556-4ace-979d-c44c50919a56.jpg";

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
    reviewsList: [
      { name: "Ольга М.", rating: 5, date: "12 июня 2026", text: "Анастасия — настоящий волшебник! Просила мягкий балаяж на тёмных волосах, а получила шедевр. Цвет держится уже второй месяц, волосы живые и блестящие. Однозначно только к ней!" },
      { name: "Светлана К.", rating: 5, date: "3 июня 2026", text: "Делала омбре первый раз в жизни и очень боялась. Настя всё объяснила, подобрала оттенки под тон кожи. Результат превзошёл ожидания — подруги засыпали комплиментами." },
      { name: "Дарья Р.", rating: 5, date: "21 мая 2026", text: "Сложное многоуровневое окрашивание за один сеанс — казалось нереальным, но Анастасия справилась блестяще. Очень аккуратная работа, ни одного лишнего движения." },
      { name: "Наталья В.", rating: 4, date: "10 мая 2026", text: "Прекрасный мастер с тонким чувством цвета. Чуть дольше ожидала результата, чем планировала, но итог того стоил — балаяж получился натуральным и свежим." },
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
    reviewsList: [
      { name: "Алина Т.", rating: 5, date: "15 июня 2026", text: "Пришла с длинными волосами без формы — ушла с идеальным каре. Мария умеет слушать и делает именно то, что хочешь. Стрижка лежит сама по себе, даже без укладки." },
      { name: "Игорь С.", rating: 5, date: "8 июня 2026", text: "Хожу к Марии уже год на мужскую стрижку. Чёткий контур, аккуратный вид, ничего лишнего. Рекомендую всем коллегам — реально лучший мастер по стрижкам в городе." },
      { name: "Татьяна Л.", rating: 5, date: "28 мая 2026", text: "Привела дочку 6 лет — боялась, что будет капризничать. Мария нашла подход моментально, ребёнок сидел спокойно и доволен. Стрижка аккуратная, детский опыт чувствуется." },
      { name: "Виктория Н.", rating: 4, date: "15 мая 2026", text: "Отличная стрижка с текстурой и слоями — именно то, что просила. Единственное — немного долго ждала в очереди, но мастер стоит своего времени." },
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
      { before: MANI_B1, after: MANI_A1, desc: "Маникюр гель-лак, нюд" },
      { before: MANI_B1, after: MANI_A2, desc: "Маникюр гель-лак, красный" },
    ],
    certs: [
      "Nail Art Professional 2024",
      "Brovi Master, Академия красоты 2022",
    ],
    reviewsList: [
      { name: "Анна П.", rating: 5, date: "17 июня 2026", text: "Лена — лучший мастер маникюра, которого я встречала! Покрытие держится три недели без сколов. Руки выглядят ухоженно и аккуратно. Уже записалась на следующий раз." },
      { name: "Марина Ф.", rating: 5, date: "9 июня 2026", text: "Делала брови впервые — Елена подобрала форму идеально под мой тип лица. Объяснила как ухаживать дома. Результат держится дольше, чем ожидала. Очень рекомендую!" },
      { name: "Ксения Д.", rating: 5, date: "1 июня 2026", text: "Педикюр на высшем уровне — и массаж, и покрытие, и уход. Лена работает быстро, чисто, без лишних движений. Ноги выглядят великолепно, иду к ней уже полгода." },
      { name: "Людмила О.", rating: 5, date: "20 мая 2026", text: "Сделала маникюр с дизайном — тонкие линии, градиент. Сложная работа, но Елена справилась за разумное время. Такого аккуратного nail art в нашем городе больше не найти." },
    ],
  },
];

const filters = ["Все", "Стрижки", "Окрашивание", "Маникюр", "Брови", "Укладки"];

type DetailTab = "works" | "certs" | "reviews";

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
            {([["works","Работы"], ["reviews","Отзывы"], ["certs","Образование"]] as [DetailTab, string][]).map(([key, label]) => (
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

        {/* ── REVIEWS TAB ── */}
        {detailTab === "reviews" && (
          <div className="px-4 pb-4 space-y-3 animate-fade-in">
            <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="gradient-orange w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0">
                <span className="font-golos font-bold text-white text-lg leading-none">{selected.rating}</span>
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Icon key={s} name="Star" size={8} className={s <= Math.floor(selected.rating) ? "text-white fill-white" : "text-white/40"} />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">{selected.reviews} отзывов</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Средняя оценка клиентов</p>
              </div>
            </div>
            {selected.reviewsList.map((r, i) => (
              <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 gradient-orange rounded-xl flex items-center justify-center shrink-0">
                      <span className="font-golos font-bold text-white text-sm">{r.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">{r.name}</p>
                      <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Icon key={s} name="Star" size={11} className={s <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-[hsl(var(--border))]"} />
                    ))}
                  </div>
                </div>
                <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{r.text}</p>
              </div>
            ))}
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