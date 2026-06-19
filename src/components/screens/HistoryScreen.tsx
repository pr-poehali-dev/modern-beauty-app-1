import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface HistoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";
const MASTER2 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";
const MASTER3 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/ebd24705-5d23-4a30-b95a-a058766b8e3f.jpg";
const WORK1   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/7c69e209-43ba-4185-b561-0b5a8cff492d.jpg";
const WORK2   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/16cbc8c4-ea9d-4083-9fff-12c510e31a77.jpg";

const history = [
  { client: "Анна Петрова",   service: "Балаяж + стрижка",    master: "Анастасия",  masterAvatar: MASTER1, workPhoto: WORK1, date: "12 мая 2026",   price: 8500, points: 170, recommendation: "Маска Olaplex раз в 2 недели", rated: false },
  { client: "Маша (дочь)",    service: "Детская стрижка",      master: "Мария",      masterAvatar: MASTER2, workPhoto: WORK2, date: "1 мая 2026",    price: 900,  points: 18,  recommendation: null,                           rated: true  },
  { client: "Анна Петрова",   service: "Маникюр классический", master: "Елена",      masterAvatar: MASTER3, workPhoto: WORK2, date: "20 апр. 2026",  price: 1500, points: 30,  recommendation: null,                           rated: false },
];

type ReviewModal = { idx: number; stars: number; text: string; withPhoto: boolean } | null;

export default function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const [filter, setFilter] = useState<"all"|"self"|"family">("all");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [review, setReview] = useState<ReviewModal>(null);
  const [reviewStars, setReviewStars] = useState(0);
  const [submitted, setSubmitted] = useState<number[]>([]);

  const filtered = history.filter(v =>
    filter === "all" ? true : filter === "self" ? v.client === "Анна Петрова" : v.client !== "Анна Петрова"
  );

  /* ── REVIEW ── */
  if (review !== null) {
    return (
      <div className="px-4 pt-2 pb-4 flex flex-col gap-3 animate-slide-in-right">
        <button onClick={() => { setReview(null); setReviewStars(0); }} className="flex items-center gap-1 font-golos text-sm text-[hsl(var(--text-secondary))] self-start">
          <Icon name="ChevronLeft" size={16} /> Назад
        </button>
        <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Оставить отзыв</h2>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-5 text-center shadow-sm">
          <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] mb-3">{history[review.idx].service}</p>
          <div className="flex justify-center gap-2 mb-1">
            {[1,2,3,4,5].map(s => (
              <button key={s} onClick={() => setReviewStars(s)}>
                <Icon name="Star" size={36} className={s <= reviewStars ? "text-yellow-400 fill-yellow-400" : "text-[hsl(var(--border))]"} />
              </button>
            ))}
          </div>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{["Нажмите на звезду","Плохо","Ниже ожиданий","Нормально","Хорошо","Отлично ⭐"][reviewStars]}</p>
        </div>
        <textarea value={review.text} onChange={e => setReview({ ...review, text: e.target.value })}
          placeholder="Поделитесь впечатлениями…" rows={3}
          className="w-full px-4 py-3 bg-white border border-[hsl(var(--border))] rounded-2xl font-golos text-sm resize-none focus:outline-none shadow-sm" />
        <button onClick={() => setReview({ ...review, withPhoto: !review.withPhoto })}
          className={`w-full py-3 rounded-2xl border-2 flex items-center gap-3 px-4 transition-all ${review.withPhoto ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]" : "border-[hsl(var(--border))] bg-white"}`}>
          <Icon name="Camera" size={16} className={review.withPhoto ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"} />
          <span className={`font-golos text-sm font-medium flex-1 text-left ${review.withPhoto ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>
            Добавить фото результата
          </span>
          <span className="font-golos text-xs font-bold text-[hsl(var(--primary))]">{review.withPhoto ? "+50 Б" : "+30 Б"}</span>
        </button>
        <button onClick={() => { setSubmitted(p => [...p, review.idx]); setReview(null); setReviewStars(0); }}
          disabled={reviewStars === 0}
          className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow disabled:opacity-50">
          Отправить отзыв (+{review.withPhoto ? 50 : 30} Б)
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-2.5 animate-fade-in">

      {/* Header + filters */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">История визитов</h2>
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Вы и члены семьи</p>
        </div>
        <div className="flex gap-1">
          {([["all","Все"],["self","Я"],["family","Семья"]] as [typeof filter, string][]).map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`px-3 py-1.5 rounded-xl font-golos text-xs font-semibold transition-all ${filter === k ? "gradient-orange text-white shadow-sm" : "bg-white border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))]"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Visit list — compact rows with expand */}
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 space-y-2">
        {filtered.map((visit, i) => {
          const isOpen = expanded === i;
          const isRated = submitted.includes(i) || visit.rated;
          return (
            <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.07}s` }}>
              {/* Compact row */}
              <button onClick={() => setExpanded(isOpen ? null : i)} className="w-full px-4 py-3 flex items-center gap-3 text-left">
                <img src={visit.masterAvatar} alt={visit.master} className="w-11 h-11 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] truncate">{visit.service}</p>
                  <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.master} · {visit.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">{visit.price.toLocaleString()} ₽</p>
                  <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold">+{visit.points} Б</p>
                </div>
                <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-[hsl(var(--text-secondary))] shrink-0 ml-1" />
              </button>

              {/* Expanded details */}
              {isOpen && (
                <div className="px-4 pb-3 space-y-2 border-t border-[hsl(var(--border))] pt-3 animate-fade-in">
                  {/* Work photo */}
                  <div className="relative rounded-xl overflow-hidden h-24">
                    <img src={visit.workPhoto} alt="Результат" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                      <span className="text-white font-golos text-xs font-semibold px-3">Результат работы</span>
                    </div>
                  </div>
                  {/* Recommendation */}
                  {visit.recommendation && (
                    <div className="bg-[hsl(var(--orange-light))] rounded-xl px-3 py-2 flex gap-2 items-start">
                      <Icon name="Lightbulb" size={13} className="text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                      <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.recommendation}</p>
                    </div>
                  )}
                  {/* Client badge */}
                  {visit.client !== "Анна Петрова" && (
                    <div className="flex items-center gap-1.5">
                      <Icon name="User" size={11} className="text-[hsl(var(--text-secondary))]" />
                      <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.client}</span>
                    </div>
                  )}
                  {/* Action buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => onNavigate("booking")} className="py-2 gradient-orange text-white font-golos font-semibold text-xs rounded-xl">Повторить</button>
                    {isRated ? (
                      <div className="py-2 bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))] font-golos font-semibold text-xs rounded-xl flex items-center justify-center gap-1">
                        <Icon name="Star" size={11} className="fill-[hsl(var(--primary))]" />Оценено
                      </div>
                    ) : (
                      <button onClick={() => setReview({ idx: history.indexOf(visit), stars: 0, text: "", withPhoto: false })}
                        className="py-2 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-semibold text-xs rounded-xl">
                        Оценить
                      </button>
                    )}
                    <button onClick={() => onNavigate("catalog")} className="py-2 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-semibold text-xs rounded-xl">Товары</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}