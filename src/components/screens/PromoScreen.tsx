import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface PromoScreenProps {
  onNavigate: (screen: Screen) => void;
}

const IMG_BALAYAGE = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/2a71cf36-ef14-4642-a32f-81282187d3b6.jpg";
const IMG_MANICURE = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/30b28bb0-68c2-4272-93d3-50c7df7caf50.jpg";
const IMG_BIRTHDAY = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/0b73d1cb-f6a8-4b1a-93a5-f579713ca38d.jpg";
const IMG_FAMILY   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/7a13fc64-ff3b-4746-9d22-09b0621e2904.jpg";

const filters = ["Все", "Скидки", "Акции", "Спецпредложения"];

const promos = [
  {
    id: 1,
    tag: "Скидки",
    badge: "-20%",
    badgeColor: "bg-[hsl(var(--primary))]",
    title: "Окрашивание + стрижка",
    desc: "Балаяж, омбре или однотонное окрашивание вместе со стрижкой — скидка 20% на весь комплекс.",
    img: IMG_BALAYAGE,
    until: "до 31 июля",
    cta: "Записаться со скидкой",
    highlight: true,
  },
  {
    id: 2,
    tag: "Спецпредложения",
    badge: "3 = 2",
    badgeColor: "bg-purple-500",
    title: "Семейный визит",
    desc: "Приходите втроём — третья стрижка в подарок. Плюс +250 бонусных баллов на карту.",
    img: IMG_FAMILY,
    until: "Постоянная акция",
    cta: "Записать семью",
    highlight: false,
  },
  {
    id: 3,
    tag: "Акции",
    badge: "+200 Б",
    badgeColor: "bg-yellow-500",
    title: "День рождения",
    desc: "В месяц вашего дня рождения — скидка 15% на любую услугу и +200 бонусных баллов в подарок.",
    img: IMG_BIRTHDAY,
    until: "Постоянная акция",
    cta: "Узнать подробнее",
    highlight: false,
  },
  {
    id: 4,
    tag: "Скидки",
    badge: "-15%",
    badgeColor: "bg-green-500",
    title: "Маникюр + педикюр",
    desc: "Запишитесь на маникюр и педикюр в один день — скидка 15% на второю процедуру.",
    img: IMG_MANICURE,
    until: "до 15 июля",
    cta: "Записаться",
    highlight: false,
  },
  {
    id: 5,
    tag: "Спецпредложения",
    badge: "Новый клиент",
    badgeColor: "bg-sky-500",
    title: "Первый визит",
    desc: "Впервые у нас? Скидка 10% на первую услугу и +150 баллов за регистрацию в приложении.",
    img: IMG_BALAYAGE,
    until: "Постоянная акция",
    cta: "Записаться впервые",
    highlight: false,
  },
  {
    id: 6,
    tag: "Акции",
    badge: "Утро",
    badgeColor: "bg-orange-400",
    title: "Утренние часы",
    desc: "Записи на 9:00–11:00 в будни — скидка 10% на стрижки и укладки. Приходите с утра!",
    img: IMG_FAMILY,
    until: "По будням",
    cta: "Выбрать время",
    highlight: false,
  },
];

export default function PromoScreen({ onNavigate }: PromoScreenProps) {
  const [filter, setFilter] = useState("Все");
  const [detail, setDetail] = useState<typeof promos[0] | null>(null);

  const filtered = filter === "Все" ? promos : promos.filter(p => p.tag === filter);

  /* ── DETAIL ── */
  if (detail) {
    return (
      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide animate-slide-in-right">
        {/* Hero */}
        <div className="relative h-56 shrink-0">
          <img src={detail.img} alt={detail.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
          <button onClick={() => setDetail(null)}
            className="absolute top-4 left-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Icon name="ChevronLeft" size={20} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span className={`${detail.badgeColor} text-white font-golos font-bold text-xs px-2.5 py-1 rounded-xl`}>{detail.badge}</span>
            <h2 className="font-golos font-bold text-2xl text-white mt-2 leading-tight">{detail.title}</h2>
          </div>
        </div>

        <div className="px-4 pt-4 pb-4 flex flex-col gap-3">
          {/* Tag + until */}
          <div className="flex items-center gap-2">
            <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] px-3 py-1 rounded-xl">{detail.tag}</span>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={12} className="text-[hsl(var(--text-secondary))]" />
              <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">{detail.until}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-4 shadow-sm">
            <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{detail.desc}</p>
          </div>

          {/* Conditions */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-4 shadow-sm">
            <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] mb-3">Условия</p>
            <div className="space-y-2">
              {[
                "Акция действует при записи через приложение",
                "Скидка применяется автоматически при оплате",
                "Нельзя совмещать с другими скидками",
                "Предложение действует " + detail.until,
              ].map((cond, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 gradient-orange rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="Check" size={9} className="text-white" />
                  </div>
                  <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">{cond}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate("booking")}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow flex items-center justify-center gap-2">
            <Icon name="CalendarPlus" size={18} />
            {detail.cta}
          </button>

          <button
            onClick={() => setDetail(null)}
            className="w-full py-3 bg-white border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] font-golos font-medium text-sm rounded-2xl shadow-sm">
            Назад к акциям
          </button>
        </div>
      </div>
    );
  }

  /* ── LIST ── */
  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-3 animate-fade-in">

      {/* Header */}
      <div className="shrink-0">
        <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Скидки и акции</h2>
        <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{filtered.length} предложений сейчас</p>
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

      {/* Promo list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 space-y-3">

        {/* Hero card — первая акция */}
        {filtered[0] && (
          <button onClick={() => setDetail(filtered[0])}
            className="w-full relative rounded-3xl overflow-hidden h-44 shadow-sm text-left block">
            <img src={filtered[0].img} alt={filtered[0].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={`${filtered[0].badgeColor} text-white font-golos font-bold text-sm px-3 py-1 rounded-xl`}>{filtered[0].badge}</span>
            </div>
            <div className="absolute bottom-3 left-4 right-4">
              <p className="font-golos font-bold text-xl text-white leading-tight">{filtered[0].title}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="font-golos text-white/70 text-xs">{filtered[0].until}</p>
                <span className="bg-white/20 text-white font-golos font-bold text-xs px-3 py-1 rounded-xl">
                  {filtered[0].cta} →
                </span>
              </div>
            </div>
          </button>
        )}

        {/* Remaining cards — compact rows */}
        {filtered.slice(1).map((promo) => (
          <button key={promo.id} onClick={() => setDetail(promo)}
            className="w-full bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm flex text-left transition-all active:scale-98">
            <div className="relative w-24 shrink-0">
              <img src={promo.img} alt={promo.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2">
                <span className={`${promo.badgeColor} text-white font-golos font-bold text-[9px] px-1.5 py-0.5 rounded-lg`}>{promo.badge}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-golos text-[10px] font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] px-2 py-0.5 rounded-lg">{promo.tag}</span>
                </div>
                <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] leading-tight">{promo.title}</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5 leading-relaxed line-clamp-2">{promo.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={11} className="text-[hsl(var(--text-secondary))]" />
                  <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{promo.until}</span>
                </div>
                <span className="font-golos text-[10px] font-bold text-[hsl(var(--primary))]">Подробнее →</span>
              </div>
            </div>
          </button>
        ))}

        {/* CTA bottom */}
        <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 gradient-orange rounded-xl flex items-center justify-center shrink-0">
            <Icon name="Bell" size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Не пропустите акции</p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Включите уведомления об акциях</p>
          </div>
          <button onClick={() => onNavigate("settings")}
            className="font-golos text-xs font-bold text-[hsl(var(--primary))] shrink-0">
            Настроить
          </button>
        </div>
      </div>
    </div>
  );
}