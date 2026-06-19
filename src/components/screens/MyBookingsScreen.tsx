import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface MyBookingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";
const MASTER2 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";
const MASTER3 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/ebd24705-5d23-4a30-b95a-a058766b8e3f.jpg";
const WORK1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/7c69e209-43ba-4185-b561-0b5a8cff492d.jpg";
const WORK2 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/074f6916-0888-4bbb-a368-79f2886fb8e8.jpg";
const CLIENT1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/16cbc8c4-ea9d-4083-9fff-12c510e31a77.jpg";

const upcoming = [
  {
    id: 0,
    client: "Петрова Анна Николаевна",
    service: "Окрашивание корней + уход",
    master: "Анастасия Романова",
    masterAvatar: MASTER1,
    date: "29 июня 2026",
    time: "12:00",
    duration: 90,
    price: 4200,
    status: "confirmed",
    address: "г. Городец, Пролетарская площадь, 2",
    needsPayment: true,
    maxBonusPercent: 10,
  },
  {
    id: 1,
    client: "Петрова Анна Николаевна",
    service: "Стрижка + укладка",
    master: "Анастасия Романова",
    masterAvatar: MASTER1,
    date: "29 июня 2026",
    time: "14:30",
    duration: 60,
    price: 2500,
    status: "confirmed",
    address: "г. Городец, Пролетарская площадь, 2",
  },
  {
    id: 2,
    client: "Маша (дочь)",
    service: "Детская стрижка",
    master: "Мария Смирнова",
    masterAvatar: MASTER2,
    date: "5 июля 2026",
    time: "11:00",
    duration: 30,
    price: 900,
    status: "confirmed",
    address: "г. Городец, Пролетарская площадь, 2",
  },
  {
    id: 3,
    client: "Петрова Анна Николаевна",
    service: "Маникюр + покрытие гель-лак",
    master: "Елена Козлова",
    masterAvatar: MASTER3,
    date: "12 июля 2026",
    time: "16:00",
    duration: 60,
    price: 1800,
    status: "pending",
    address: "г. Городец, Пролетарская площадь, 2",
  },
];

const past = [
  {
    id: 4,
    client: "Петрова Анна Николаевна",
    service: "Балаяж + стрижка",
    master: "Анастасия Романова",
    masterAvatar: MASTER1,
    date: "12 мая 2026",
    time: "14:00",
    price: 8500,
    points: 425,
    hasWorkPhoto: true,
    workPhoto: WORK1,
    hasBeforeAfter: true,
    beforeAfterPhoto: WORK2,
    rated: false,
  },
  {
    id: 5,
    client: "Маша (дочь)",
    service: "Детская стрижка",
    master: "Мария Смирнова",
    masterAvatar: MASTER2,
    date: "1 мая 2026",
    time: "11:00",
    price: 900,
    points: 70,
    hasWorkPhoto: true,
    workPhoto: CLIENT1,
    hasBeforeAfter: false,
    rated: true,
  },
  {
    id: 6,
    client: "Петрова Анна Николаевна",
    service: "Маникюр классический",
    master: "Елена Козлова",
    masterAvatar: MASTER3,
    date: "20 апреля 2026",
    time: "16:30",
    price: 1500,
    points: 75,
    hasWorkPhoto: false,
    workPhoto: null,
    hasBeforeAfter: false,
    rated: false,
  },
];

type CancelModal = { id: number; service: string; isUrgent: boolean } | null;
type ReviewModal = { id: number; service: string; withPhoto: boolean } | null;

function BonusPaymentBlock({ price, maxBonusPercent }: { price: number; maxBonusPercent: number }) {
  const maxBonus = Math.floor(price * (maxBonusPercent / 100));
  const availableBonus = Math.min(1240, maxBonus);
  const [bonus, setBonus] = useState(0);
  const toPay = price - bonus;
  return (
    <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/20 rounded-2xl p-3.5 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Icon name="Sparkles" size={14} className="text-[hsl(var(--primary))]" />
          <p className="font-golos font-semibold text-sm text-[hsl(var(--primary))]">Списать баллами</p>
        </div>
        <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">до {maxBonusPercent}% от суммы</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">Доступно: 1 240 Б</span>
        <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">Макс: {availableBonus} Б</span>
      </div>
      <input
        type="range" min={0} max={availableBonus} step={10}
        value={bonus}
        onChange={e => setBonus(Number(e.target.value))}
        className="w-full accent-[hsl(var(--primary))] mb-2"
      />
      <div className="flex items-center justify-between bg-white rounded-xl px-3 py-2">
        <div>
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Списать баллов</p>
          <p className="font-golos font-bold text-base text-[hsl(var(--primary))]">{bonus} Б</p>
        </div>
        <Icon name="ArrowRight" size={14} className="text-[hsl(var(--text-secondary))]" />
        <div className="text-right">
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">К оплате</p>
          <p className="font-golos font-bold text-base text-[hsl(var(--text-main))]">{toPay.toLocaleString()} ₽</p>
        </div>
      </div>
      <button className="w-full mt-2.5 py-2.5 gradient-orange text-white font-golos font-semibold text-sm rounded-xl orange-glow">
        Оплатить {toPay.toLocaleString()} ₽{bonus > 0 ? ` + ${bonus} Б` : ""}
      </button>
    </div>
  );
}

export default function MyBookingsScreen({ onNavigate }: MyBookingsScreenProps) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [cancelModal, setCancelModal] = useState<CancelModal>(null);
  const [reviewModal, setReviewModal] = useState<ReviewModal>(null);
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<number[]>([]);
  const [lateId, setLateId] = useState<number | null>(null);

  if (cancelModal) {
    return (
      <div className="px-5 pt-2 pb-4 animate-scale-in">
        <button onClick={() => setCancelModal(null)} className="flex items-center gap-1 font-golos text-sm text-[hsl(var(--text-secondary))] mb-5">
          <Icon name="ChevronLeft" size={18} /> Назад
        </button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="CalendarX" size={28} className="text-red-400" />
          </div>
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-2">Отменить запись?</h2>
          <p className="font-golos text-sm text-[hsl(var(--text-secondary))]">{cancelModal.service}</p>
        </div>

        {cancelModal.isUrgent && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 mb-5">
            <Icon name="AlertTriangle" size={18} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-golos font-semibold text-sm text-red-500">Отмена менее чем за 2 часа</p>
              <p className="font-golos text-xs text-red-400 mt-0.5">Бонусы за запись (+20 баллов) не будут возвращены по условиям отмены</p>
            </div>
          </div>
        )}

        <div className="bg-[hsl(var(--gray-soft))] rounded-2xl p-4 mb-6">
          <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
            После отмены мастер освободится и сможет принять другого клиента. Вы можете записаться снова в любое удобное время.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setCancelModal(null)}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
          >
            Не отменять
          </button>
          <button
            onClick={() => setCancelModal(null)}
            className="w-full py-3.5 border border-red-100 bg-red-50 text-red-400 font-golos font-medium rounded-2xl"
          >
            Подтвердить отмену
          </button>
        </div>
      </div>
    );
  }

  if (reviewModal) {
    return (
      <div className="px-5 pt-2 pb-4 animate-slide-in-right">
        <button onClick={() => { setReviewModal(null); setReviewStars(0); setReviewText(""); }} className="flex items-center gap-1 font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">
          <Icon name="ChevronLeft" size={18} /> Назад
        </button>
        <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Оставить отзыв</h2>
        <p className="font-golos text-sm text-[hsl(var(--text-secondary))] mb-5">{reviewModal.service}</p>

        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-5 card-shadow mb-4">
          <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-4 text-center">Ваша оценка</p>
          <div className="flex justify-center gap-3 mb-2">
            {[1,2,3,4,5].map(s => (
              <button key={s} onClick={() => setReviewStars(s)} className="transition-all active:scale-90">
                <Icon name="Star" size={38} className={s <= reviewStars ? "text-yellow-400 fill-yellow-400" : "text-[hsl(var(--border))]"} />
              </button>
            ))}
          </div>
          <p className="font-golos text-center text-sm font-medium text-[hsl(var(--text-secondary))]">
            {["Нажмите на звезду","Плохо","Ниже ожиданий","Нормально","Хорошо","Отлично! ⭐"][reviewStars]}
          </p>
        </div>

        <div className="mb-4">
          <label className="font-golos text-sm font-semibold text-[hsl(var(--text-main))] mb-2 block">Комментарий</label>
          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Поделитесь впечатлениями о визите..."
            rows={4}
            className="w-full px-4 py-3 bg-[hsl(var(--gray-soft))] rounded-2xl font-golos text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/30"
          />
        </div>

        <button
          onClick={() => setReviewModal({ ...reviewModal, withPhoto: !reviewModal.withPhoto })}
          className={`w-full py-3.5 rounded-2xl border-2 flex items-center gap-3 px-4 mb-5 transition-all ${reviewModal.withPhoto ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]" : "border-[hsl(var(--border))] bg-white"}`}
        >
          <Icon name="Camera" size={18} className={reviewModal.withPhoto ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"} />
          <div className="text-left flex-1">
            <p className={`font-golos text-sm font-medium ${reviewModal.withPhoto ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>Добавить фото результата</p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">За фото-отзыв начисляется +50 Б</p>
          </div>
          {reviewModal.withPhoto && <Icon name="Check" size={18} className="text-[hsl(var(--primary))]" />}
        </button>

        <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-3.5 flex items-center gap-2 mb-5">
          <Icon name="Sparkles" size={16} className="text-[hsl(var(--primary))]" />
          <p className="font-golos text-sm text-[hsl(var(--primary))]">За отзыв: <span className="font-bold">{reviewModal.withPhoto ? "+50 Б" : "+30 Б"}</span></p>
        </div>

        <button
          onClick={() => { setSubmittedReviews(p => [...p, reviewModal.id]); setReviewModal(null); setReviewStars(0); setReviewText(""); }}
          disabled={reviewStars === 0}
          className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow disabled:opacity-50"
        >
          Отправить отзыв
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      <div className="mb-4">
        <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">Мои записи</h2>
        <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Все ваши визиты</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[hsl(var(--gray-soft))] rounded-2xl p-1 mb-5">
        {[
          { key: "upcoming", label: `Предстоящие (${upcoming.length})` },
          { key: "past", label: "Прошедшие" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className={`flex-1 py-2.5 rounded-xl font-golos text-sm font-semibold transition-all ${
              tab === key ? "bg-white text-[hsl(var(--text-main))] card-shadow" : "text-[hsl(var(--text-secondary))]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* UPCOMING */}
      {tab === "upcoming" && (
        <div className="space-y-4">
          {upcoming.map((visit, i) => (
            <div key={visit.id} className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              {/* Status bar */}
              <div className={`px-4 py-2 flex items-center gap-2 ${visit.status === "confirmed" ? "bg-green-50" : "bg-yellow-50"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${visit.status === "confirmed" ? "bg-green-400" : "bg-yellow-400"}`} />
                <span className={`font-golos text-xs font-semibold ${visit.status === "confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                  {visit.status === "confirmed" ? "Подтверждена" : "Ожидает подтверждения"}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <img src={visit.masterAvatar} alt={visit.master} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1">
                    <p className="font-golos font-semibold text-[hsl(var(--text-main))]">{visit.service}</p>
                    <p className="font-golos text-sm text-[hsl(var(--text-secondary))]">{visit.master}</p>
                    {visit.client !== "Анна Петрова" && (
                      <span className="inline-block font-golos text-xs bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))] px-2 py-0.5 rounded-lg mt-1 font-medium">
                        👧 {visit.client}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-[hsl(var(--gray-soft))] rounded-xl p-3">
                    <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] mb-0.5">Дата и время</p>
                    <p className="font-golos font-semibold text-sm text-[hsl(var(--primary))]">{visit.date}</p>
                    <p className="font-golos text-sm text-[hsl(var(--text-main))]">{visit.time} · {visit.duration} мин</p>
                  </div>
                  <div className="bg-[hsl(var(--gray-soft))] rounded-xl p-3">
                    <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] mb-0.5">Стоимость</p>
                    <p className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">{visit.price.toLocaleString()} ₽</p>
                    <p className="font-golos text-[10px] text-[hsl(var(--primary))]">+{Math.round(visit.price * 0.05)} баллов</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[hsl(var(--text-secondary))] mb-4">
                  <Icon name="MapPin" size={13} />
                  <span className="font-golos text-xs">{visit.address}</span>
                </div>

                {/* Bonus payment block */}
                {visit.needsPayment && (
                  <BonusPaymentBlock price={visit.price} maxBonusPercent={visit.maxBonusPercent!} />
                )}

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate("booking")}
                    className="py-2.5 bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))] font-golos font-medium text-sm rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Icon name="CalendarClock" size={15} />
                    Перенести
                  </button>
                  <button
                    onClick={() => onNavigate("chat")}
                    className="py-2.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-medium text-sm rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Icon name="MessageCircle" size={15} />
                    Написать
                  </button>
                  <button
                    onClick={() => setLateId(lateId === visit.id ? null : visit.id)}
                    className={`py-2.5 font-golos font-medium text-sm rounded-xl flex items-center justify-center gap-1.5 ${lateId === visit.id ? "bg-yellow-100 text-yellow-600" : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))]"}`}
                  >
                    <Icon name="Clock" size={15} />
                    {lateId === visit.id ? "Отправлено!" : "Я опаздываю"}
                  </button>
                  <button
                    onClick={() => setCancelModal({ id: visit.id, service: visit.service, isUrgent: false })}
                    className="py-2.5 bg-red-50 text-red-400 font-golos font-medium text-sm rounded-xl flex items-center justify-center gap-1.5 border border-red-100"
                  >
                    <Icon name="X" size={15} />
                    Отменить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAST */}
      {tab === "past" && (
        <div className="space-y-4">
          {past.map((visit, i) => (
            <div key={visit.id} className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="p-4 pb-3">
                <div className="flex items-start gap-3">
                  <img src={visit.masterAvatar} alt={visit.master} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-golos font-semibold text-[hsl(var(--text-main))] text-sm">{visit.service}</p>
                        <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.master}</p>
                      </div>
                      <span className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">{visit.price.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={11} className="text-[hsl(var(--text-secondary))]" />
                        <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.date}, {visit.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work photo */}
              {visit.hasWorkPhoto && visit.workPhoto && (
                <div className="px-4 mb-3">
                  <div className="relative rounded-xl overflow-hidden h-32">
                    <img src={visit.workPhoto} alt="Результат" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                      <span className="text-white font-golos text-xs font-semibold">Результат работы</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Before/after */}
              {visit.hasBeforeAfter && visit.beforeAfterPhoto && (
                <div className="px-4 mb-3">
                  <div className="relative rounded-xl overflow-hidden h-24">
                    <img src={visit.beforeAfterPhoto} alt="До/После" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                      <span className="text-white font-golos text-xs font-semibold px-3">До / После</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bonuses */}
              <div className="px-4 pb-3">
                <div className="flex items-center justify-between bg-[hsl(var(--orange-light))] rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Sparkles" size={13} className="text-[hsl(var(--primary))]" />
                    <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">+{visit.points} баллов начислено</span>
                  </div>
                  {visit.client !== "Анна Петрова" && (
                    <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">{visit.client}</span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-4 pb-4 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate("booking")}
                    className="py-2.5 gradient-orange text-white font-golos font-medium text-xs rounded-xl flex items-center justify-center gap-1"
                  >
                    <Icon name="RotateCcw" size={13} />
                    Записаться снова +100 Б
                  </button>
                  {submittedReviews.includes(visit.id) || visit.rated ? (
                    <div className="py-2.5 bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))] font-golos font-medium text-xs rounded-xl flex items-center justify-center gap-1">
                      <Icon name="Star" size={13} className="fill-[hsl(var(--primary))]" />
                      Оценено
                    </div>
                  ) : (
                    <button
                      onClick={() => setReviewModal({ id: visit.id, service: visit.service, withPhoto: false })}
                      className="py-2.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-medium text-xs rounded-xl flex items-center justify-center gap-1"
                    >
                      <Icon name="Star" size={13} />
                      Отзыв +30 Б
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {!submittedReviews.includes(visit.id) && !visit.rated && (
                    <button
                      onClick={() => setReviewModal({ id: visit.id, service: visit.service, withPhoto: true })}
                      className="py-2.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-medium text-xs rounded-xl flex items-center justify-center gap-1"
                    >
                      <Icon name="Camera" size={13} />
                      Фото-отзыв +50 Б
                    </button>
                  )}
                  <button className="py-2.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-medium text-xs rounded-xl flex items-center justify-center gap-1">
                    <Icon name="Wand2" size={13} />
                    Повторить образ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}