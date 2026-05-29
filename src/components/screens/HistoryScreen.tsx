import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface HistoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";
const WORK_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/c78ea4e6-a248-4ca1-b12c-b68ff0e40c63.jpg";

const history = [
  {
    client: "Анна Петрова",
    service: "Балаяж + стрижка",
    master: "Анастасия Романова",
    date: "12 мая 2026",
    time: "14:00",
    price: 8500,
    points: 425,
    pointsExpiry: "12 ноября 2026",
    hasPhoto: true,
    recommendation: "Рекомендую маску Olaplex раз в 2 недели для поддержания цвета",
    rated: false,
  },
  {
    client: "Маша (дочь)",
    service: "Детская стрижка",
    master: "Мария Смирнова",
    date: "1 мая 2026",
    time: "11:00",
    price: 900,
    points: 70,
    pointsExpiry: "1 ноября 2026",
    hasPhoto: false,
    recommendation: null,
    rated: true,
  },
  {
    client: "Анна Петрова",
    service: "Маникюр классический",
    master: "Елена Козлова",
    date: "20 апреля 2026",
    time: "16:30",
    price: 1500,
    points: 75,
    pointsExpiry: "20 октября 2026",
    hasPhoto: true,
    recommendation: null,
    rated: false,
  },
];

type ReviewState = { visitIndex: number; stars: number; text: string; withPhoto: boolean } | null;

export default function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const [review, setReview] = useState<ReviewState>(null);
  const [submitted, setSubmitted] = useState<number[]>([]);
  const [filter, setFilter] = useState<"all" | "self" | "family">("all");

  const filtered = history.filter(v => {
    if (filter === "self") return v.client === "Анна Петрова";
    if (filter === "family") return v.client !== "Анна Петрова";
    return true;
  });

  if (review !== null) {
    return (
      <div className="px-5 pt-2 pb-4 animate-slide-in-right">
        <button onClick={() => setReview(null)} className="flex items-center gap-1 font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">
          <Icon name="ChevronLeft" size={18} /> Назад
        </button>
        <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Оставить отзыв</h2>
        <p className="font-golos text-sm text-[hsl(var(--text-secondary))] mb-5">
          {history[review.visitIndex].service} · {history[review.visitIndex].master}
        </p>

        {/* Stars */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-5 card-shadow mb-4">
          <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-4 text-center">Ваша оценка</p>
          <div className="flex justify-center gap-3 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setReview({ ...review, stars: star })}
                className="transition-all active:scale-90"
              >
                <Icon
                  name="Star"
                  size={36}
                  className={star <= review.stars ? "text-yellow-400 fill-yellow-400" : "text-[hsl(var(--border))]"}
                />
              </button>
            ))}
          </div>
          <p className="font-golos text-center text-sm font-medium text-[hsl(var(--text-secondary))]">
            {review.stars === 0 && "Нажмите на звезду"}
            {review.stars === 1 && "Плохо"}
            {review.stars === 2 && "Ниже ожиданий"}
            {review.stars === 3 && "Нормально"}
            {review.stars === 4 && "Хорошо"}
            {review.stars === 5 && "Отлично! ⭐"}
          </p>
        </div>

        {/* Text */}
        <div className="mb-4">
          <label className="font-golos text-sm font-semibold text-[hsl(var(--text-main))] mb-2 block">Комментарий</label>
          <textarea
            value={review.text}
            onChange={(e) => setReview({ ...review, text: e.target.value })}
            placeholder="Поделитесь впечатлениями о визите..."
            rows={4}
            className="w-full px-4 py-3 bg-[hsl(var(--gray-soft))] rounded-2xl font-golos text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/30"
          />
        </div>

        {/* Photo option */}
        <button
          onClick={() => setReview({ ...review, withPhoto: !review.withPhoto })}
          className={`w-full py-3 rounded-2xl border-2 flex items-center gap-3 px-4 mb-5 transition-all ${
            review.withPhoto
              ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]"
              : "border-[hsl(var(--border))] bg-white"
          }`}
        >
          <Icon name="Camera" size={18} className={review.withPhoto ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"} />
          <div className="text-left flex-1">
            <p className={`font-golos text-sm font-medium ${review.withPhoto ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>
              Добавить фото результата
            </p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">За фото-отзыв начисляется +50 баллов</p>
          </div>
          {review.withPhoto && <Icon name="Check" size={18} className="text-[hsl(var(--primary))]" />}
        </button>

        {/* Bonus info */}
        <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-3.5 flex items-center gap-2 mb-5">
          <Icon name="Sparkles" size={16} className="text-[hsl(var(--primary))]" />
          <p className="font-golos text-sm text-[hsl(var(--primary))]">
            За отзыв: <span className="font-bold">{review.withPhoto ? "+50 баллов" : "+30 баллов"}</span>
          </p>
        </div>

        <button
          onClick={() => {
            setSubmitted(prev => [...prev, review.visitIndex]);
            setReview(null);
          }}
          disabled={review.stars === 0}
          className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow disabled:opacity-50"
        >
          Отправить отзыв
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">История визитов</h2>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Вы и члены семьи</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {[
          { key: "all", label: "Все" },
          { key: "self", label: "Я" },
          { key: "family", label: "Семья" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as typeof filter)}
            className={`px-4 py-2 rounded-xl font-golos text-sm font-medium transition-all ${
              filter === key
                ? "gradient-orange text-white"
                : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-secondary))]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((visit, i) => (
          <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            {/* Header */}
            <div className="p-4 pb-3">
              <div className="flex items-start gap-3">
                <img src={MASTER_IMG} alt="Мастер" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-golos font-semibold text-[hsl(var(--text-main))] text-sm">{visit.service}</p>
                      <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.master}</p>
                    </div>
                    <span className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">{visit.price.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Icon name="User" size={11} className="text-[hsl(var(--text-secondary))]" />
                      <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.client}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={11} className="text-[hsl(var(--text-secondary))]" />
                      <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo */}
            {visit.hasPhoto && (
              <div className="px-4 mb-3">
                <div className="relative rounded-xl overflow-hidden h-28">
                  <img src={WORK_IMG} alt="Результат" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center">
                    <span className="text-white font-golos text-xs font-semibold px-3">Результат работы</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendation */}
            {visit.recommendation && (
              <div className="px-4 mb-3">
                <div className="bg-[hsl(var(--gray-soft))] rounded-xl p-3 flex gap-2">
                  <Icon name="Lightbulb" size={14} className="text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                  <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">{visit.recommendation}</p>
                </div>
              </div>
            )}

            {/* Bonuses */}
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between bg-[hsl(var(--orange-light))] rounded-xl px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <Icon name="Sparkles" size={13} className="text-[hsl(var(--primary))]" />
                  <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">+{visit.points} баллов</span>
                </div>
                <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">до {visit.pointsExpiry}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() => onNavigate("booking")}
                className="flex-1 py-2.5 gradient-orange text-white font-golos font-medium text-sm rounded-xl"
              >
                Повторить
              </button>
              {submitted.includes(i) || visit.rated ? (
                <div className="flex-1 py-2.5 bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))] font-golos font-medium text-sm rounded-xl flex items-center justify-center gap-1">
                  <Icon name="Star" size={13} className="fill-[hsl(var(--primary))]" />
                  Оценено
                </div>
              ) : (
                <button
                  onClick={() => setReview({ visitIndex: history.indexOf(visit), stars: 0, text: "", withPhoto: false })}
                  className="flex-1 py-2.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-medium text-sm rounded-xl"
                >
                  Оценить
                </button>
              )}
              <button
                onClick={() => onNavigate("catalog")}
                className="flex-1 py-2.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-medium text-sm rounded-xl"
              >
                Товары
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
