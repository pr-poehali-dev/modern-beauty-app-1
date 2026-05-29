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
  },
];

export default function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">История визитов</h2>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Вы и члены семьи</p>
        </div>
        <button className="w-9 h-9 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center">
          <Icon name="Filter" size={16} className="text-[hsl(var(--text-secondary))]" />
        </button>
      </div>

      <div className="space-y-4">
        {history.map((visit, i) => (
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
              <button className="flex-1 py-2.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-medium text-sm rounded-xl">
                Оценить
              </button>
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
