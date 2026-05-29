import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface PaymentScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";

type PayMethod = "card" | "points" | "mixed";

export default function PaymentScreen({ onNavigate }: PaymentScreenProps) {
  const [method, setMethod] = useState<PayMethod>("card");
  const [pointsToUse, setPointsToUse] = useState(0);
  const [paid, setPaid] = useState(false);

  const servicePrice = 2500;
  const availablePoints = 1240;
  const maxPointsPercent = 7; // уровень «Постоянный гость»
  const maxPoints = Math.floor(servicePrice * maxPointsPercent / 100);
  const earnedPoints = Math.round(servicePrice * 0.05);

  const pointsDiscount = method === "points" ? maxPoints : method === "mixed" ? pointsToUse : 0;
  const toPay = servicePrice - pointsDiscount;

  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 animate-scale-in">
        <div className="w-20 h-20 gradient-orange rounded-full flex items-center justify-center mb-5 orange-glow animate-pulse-ring">
          <Icon name="CheckCheck" size={36} className="text-white" />
        </div>
        <h2 className="font-golos font-bold text-2xl text-[hsl(var(--text-main))] text-center mb-2">
          Оплата прошла!
        </h2>
        <p className="font-golos text-[hsl(var(--text-secondary))] text-center text-sm mb-1">
          {toPay.toLocaleString()} ₽ списано с карты
        </p>
        {pointsDiscount > 0 && (
          <p className="font-golos text-[hsl(var(--text-secondary))] text-center text-sm mb-1">
            {pointsDiscount} баллов списано
          </p>
        )}
        <p className="font-golos text-[hsl(var(--text-secondary))] text-center text-sm mb-6">
          Чек отправлен на anna.petrova@mail.ru
        </p>

        <div className="w-full bg-[hsl(var(--orange-light))] rounded-2xl px-5 py-4 mb-8 space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-golos text-sm text-[hsl(var(--primary))] font-medium flex items-center gap-1.5">
              <Icon name="Sparkles" size={15} />
              Начислено баллов
            </p>
            <span className="font-golos font-bold text-[hsl(var(--primary))]">+{earnedPoints} Б</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-golos text-sm text-[hsl(var(--primary))] font-medium flex items-center gap-1.5">
              <Icon name="Receipt" size={15} />
              Чек сохранён
            </p>
            <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">В истории платежей</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={() => onNavigate("history")}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
          >
            Посмотреть историю
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="w-full py-3.5 bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] font-golos font-semibold rounded-2xl"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-pulse" />
          <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-wide">Требуется оплата</span>
        </div>
        <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">Оплата услуги</h2>
      </div>

      {/* Service card */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 card-shadow mb-5 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <img src={MASTER1} alt="Мастер" className="w-14 h-14 rounded-2xl object-cover shrink-0" />
          <div className="flex-1">
            <p className="font-golos font-semibold text-[hsl(var(--text-main))]">Стрижка + укладка</p>
            <p className="font-golos text-sm text-[hsl(var(--text-secondary))]">Анастасия Романова</p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">5 июня 2026, 14:30</p>
          </div>
          <p className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">{servicePrice.toLocaleString()} ₽</p>
        </div>
      </div>

      {/* Client level info */}
      <div className="gradient-orange rounded-2xl p-4 mb-5 animate-fade-in-up delay-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-golos text-white/70 text-xs">Уровень клиента</p>
            <p className="font-golos font-bold text-white">⭐ Постоянный гость</p>
          </div>
          <div className="text-right">
            <p className="font-golos text-white/70 text-xs">Баланс баллов</p>
            <p className="font-golos font-bold text-white text-lg">{availablePoints} Б</p>
          </div>
        </div>
        <div className="bg-white/15 rounded-xl px-3 py-2">
          <p className="font-golos text-xs text-white/90">
            Можно списать до <span className="font-bold text-yellow-200">{maxPointsPercent}%</span> от суммы — максимум{" "}
            <span className="font-bold text-yellow-200">{maxPoints} Б ({maxPoints} ₽)</span>
          </p>
        </div>
      </div>

      {/* Payment methods */}
      <div className="mb-5 animate-fade-in-up delay-200">
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Способ оплаты</p>
        <div className="space-y-2">
          {[
            {
              key: "card" as PayMethod,
              icon: "CreditCard",
              label: "Оплата картой",
              desc: `${servicePrice.toLocaleString()} ₽`,
              sub: "Visa •••• 4821",
            },
            {
              key: "points" as PayMethod,
              icon: "Sparkles",
              label: "Списать баллы + карта",
              desc: `${(servicePrice - maxPoints).toLocaleString()} ₽ + ${maxPoints} Б`,
              sub: `Экономия ${maxPoints} ₽`,
            },
            {
              key: "mixed" as PayMethod,
              icon: "Layers",
              label: "Выбрать сумму баллов",
              desc: "Частичное списание",
              sub: "Укажите нужное количество",
            },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setMethod(opt.key)}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                method === opt.key
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]"
                  : "border-[hsl(var(--border))] bg-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                method === opt.key ? "gradient-orange" : "bg-[hsl(var(--gray-soft))]"
              }`}>
                <Icon name={opt.icon} size={18} className={method === opt.key ? "text-white" : "text-[hsl(var(--text-secondary))]"} />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-golos font-semibold text-sm ${method === opt.key ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>
                  {opt.label}
                </p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{opt.sub}</p>
              </div>
              <p className={`font-golos font-bold text-sm ${method === opt.key ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"}`}>
                {opt.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Slider for mixed */}
        {method === "mixed" && (
          <div className="mt-3 bg-white border border-[hsl(var(--border))] rounded-2xl p-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Списать баллов</p>
              <p className="font-golos font-bold text-[hsl(var(--primary))]">{pointsToUse} Б</p>
            </div>
            <input
              type="range"
              min={0}
              max={maxPoints}
              value={pointsToUse}
              onChange={(e) => setPointsToUse(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
            <div className="flex justify-between mt-1">
              <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">0 Б</span>
              <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">{maxPoints} Б (макс.)</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-[hsl(var(--gray-soft))] rounded-2xl p-4 mb-5 animate-fade-in-up delay-300">
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Итого к оплате</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-golos text-sm text-[hsl(var(--text-secondary))]">Стоимость услуги</span>
            <span className="font-golos text-sm">{servicePrice.toLocaleString()} ₽</span>
          </div>
          {pointsDiscount > 0 && (
            <div className="flex justify-between">
              <span className="font-golos text-sm text-[hsl(var(--text-secondary))]">Списание баллами</span>
              <span className="font-golos text-sm font-semibold text-[hsl(var(--primary))]">−{pointsDiscount} ₽</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-golos text-sm text-[hsl(var(--text-secondary))]">Начислим баллов</span>
            <span className="font-golos text-sm font-semibold text-[hsl(var(--primary))]">+{earnedPoints} Б</span>
          </div>
          <div className="pt-2 border-t border-[hsl(var(--border))] flex justify-between">
            <span className="font-golos font-bold text-[hsl(var(--text-main))]">К оплате картой</span>
            <span className="font-golos font-bold text-2xl text-[hsl(var(--text-main))]">{toPay.toLocaleString()} ₽</span>
          </div>
        </div>
      </div>

      {/* Pay button */}
      <button
        onClick={() => setPaid(true)}
        className="w-full py-4 gradient-orange text-white font-golos font-bold text-lg rounded-2xl orange-glow animate-fade-in-up delay-300"
      >
        Оплатить {toPay.toLocaleString()} ₽
      </button>
      <p className="font-golos text-xs text-[hsl(var(--text-secondary))] text-center mt-3">
        Чек будет отправлен на anna.petrova@mail.ru
      </p>
    </div>
  );
}
