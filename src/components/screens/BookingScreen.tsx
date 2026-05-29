import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface BookingScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";

const categories = [
  { id: "women", label: "Женские стрижки", icon: "✂️" },
  { id: "men", label: "Мужские стрижки", icon: "💈" },
  { id: "kids", label: "Детские стрижки", icon: "🧒" },
  { id: "color", label: "Окрашивание", icon: "🎨" },
  { id: "care", label: "Уход за волосами", icon: "💆" },
  { id: "styling", label: "Укладки", icon: "💅" },
  { id: "nails", label: "Маникюр", icon: "💅" },
  { id: "brows", label: "Брови и ресницы", icon: "👁️" },
];

const services = [
  { name: "Стрижка + укладка", price: 2500, duration: 60, category: "women" },
  { name: "Женская стрижка", price: 1800, duration: 45, category: "women" },
  { name: "Мужская стрижка", price: 1200, duration: 40, category: "men" },
  { name: "Детская стрижка", price: 900, duration: 30, category: "kids" },
  { name: "Окрашивание (балаяж)", price: 7500, duration: 180, category: "color" },
  { name: "Тонирование", price: 3500, duration: 90, category: "color" },
  { name: "Маска Olaplex", price: 2200, duration: 40, category: "care" },
  { name: "Маникюр классический", price: 1500, duration: 60, category: "nails" },
  { name: "Коррекция бровей", price: 800, duration: 30, category: "brows" },
];

const masters = [
  { name: "Анастасия Романова", spec: "Колорист, стилист", rating: 4.9, reviews: 127 },
  { name: "Мария Смирнова", spec: "Мастер по стрижкам", rating: 4.8, reviews: 89 },
  { name: "Елена Козлова", spec: "Мастер маникюра", rating: 4.9, reviews: 203 },
];

const times = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "18:00"];

export default function BookingScreen({ onNavigate }: BookingScreenProps) {
  const [step, setStep] = useState(1);
  const [forSelf, setForSelf] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("women");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedMaster, setSelectedMaster] = useState<typeof masters[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState("5 июня");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const filteredServices = services.filter(s => s.category === selectedCategory);

  const days = [
    { label: "Пн", date: "2", active: false },
    { label: "Вт", date: "3", active: false },
    { label: "Ср", date: "4", active: false },
    { label: "Чт", date: "5", active: true },
    { label: "Пт", date: "6", active: false },
    { label: "Сб", date: "7", active: false },
    { label: "Вс", date: "8", active: false },
  ];

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 animate-scale-in">
        <div className="w-20 h-20 gradient-orange rounded-full flex items-center justify-center mb-5 orange-glow animate-pulse-ring">
          <Icon name="Check" size={36} className="text-white" />
        </div>
        <h2 className="font-golos font-bold text-2xl text-[hsl(var(--text-main))] text-center mb-2">Запись подтверждена!</h2>
        <p className="font-golos text-[hsl(var(--text-secondary))] text-center text-sm mb-1">
          {selectedService?.name}
        </p>
        <p className="font-golos font-semibold text-[hsl(var(--primary))] text-center mb-6">
          {selectedDate} · {selectedTime}
        </p>
        <div className="bg-[hsl(var(--orange-light))] rounded-2xl px-5 py-3 mb-8">
          <p className="font-golos text-sm text-[hsl(var(--primary))] font-medium text-center">
            ✨ +20 баллов начислено за запись через приложение
          </p>
        </div>
        <button
          onClick={() => { setStep(1); setConfirmed(false); setSelectedService(null); setSelectedTime(""); }}
          className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      {/* Steps */}
      <div className="flex items-center gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center gap-1">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${
              s <= step ? "gradient-orange" : "bg-[hsl(var(--border))]"
            } ${s === 1 ? "w-6" : "w-6"}`} />
          </div>
        ))}
        <span className="font-golos text-xs text-[hsl(var(--text-secondary))] ml-2">Шаг {step} из 5</span>
      </div>

      {/* Step 1: Who */}
      {step === 1 && (
        <div className="animate-fade-in-up">
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Для кого запись?</h2>
          <p className="font-golos text-sm text-[hsl(var(--text-secondary))] mb-5">Выберите клиента</p>
          <div className="space-y-3">
            <button
              onClick={() => setForSelf(true)}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                forSelf ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]" : "border-[hsl(var(--border))] bg-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${forSelf ? "gradient-orange" : "bg-[hsl(var(--gray-soft))]"}`}>
                <Icon name="User" size={20} className={forSelf ? "text-white" : "text-[hsl(var(--text-secondary))]"} />
              </div>
              <div className="text-left">
                <p className="font-golos font-semibold text-[hsl(var(--text-main))]">Для себя</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Анна Петрова</p>
              </div>
              {forSelf && <Icon name="Check" size={18} className="ml-auto text-[hsl(var(--primary))]" />}
            </button>
            <button
              onClick={() => setForSelf(false)}
              className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                !forSelf ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]" : "border-[hsl(var(--border))] bg-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${!forSelf ? "gradient-orange" : "bg-[hsl(var(--gray-soft))]"}`}>
                <Icon name="Users" size={20} className={!forSelf ? "text-white" : "text-[hsl(var(--text-secondary))]"} />
              </div>
              <div className="text-left">
                <p className="font-golos font-semibold text-[hsl(var(--text-main))]">Для члена семьи</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Дочь Маша · Сын Миша</p>
              </div>
              {!forSelf && <Icon name="Check" size={18} className="ml-auto text-[hsl(var(--primary))]" />}
            </button>
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl mt-6 orange-glow"
          >
            Далее
          </button>
        </div>
      )}

      {/* Step 2: Service */}
      {step === 2 && (
        <div className="animate-fade-in-up">
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Выберите услугу</h2>
          <p className="font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">Категории услуг</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap font-golos text-sm font-medium transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? "gradient-orange text-white"
                    : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-secondary))]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredServices.map((service, i) => (
              <button
                key={i}
                onClick={() => { setSelectedService(service); setStep(3); }}
                className="w-full bg-white border border-[hsl(var(--border))] rounded-2xl p-4 flex items-center gap-3 card-shadow transition-all active:scale-98"
              >
                <div className="w-12 h-12 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="Scissors" size={20} className="text-[hsl(var(--primary))]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-golos font-semibold text-[hsl(var(--text-main))]">{service.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">
                      <Icon name="Clock" size={11} className="inline mr-0.5" />{service.duration} мин
                    </span>
                    <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">{service.price.toLocaleString()} ₽</span>
                  </div>
                </div>
                <Icon name="ChevronRight" size={18} className="text-[hsl(var(--text-secondary))]" />
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="w-full py-3 font-golos text-[hsl(var(--text-secondary))] text-sm mt-4">
            ← Назад
          </button>
        </div>
      )}

      {/* Step 3: Master */}
      {step === 3 && (
        <div className="animate-fade-in-up">
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Выберите мастера</h2>
          <p className="font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">
            Услуга: <span className="font-medium text-[hsl(var(--text-main))]">{selectedService?.name}</span>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => { setSelectedMaster(null); setStep(4); }}
              className="w-full p-4 border border-[hsl(var(--border))] rounded-2xl flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center">
                <Icon name="Shuffle" size={20} className="text-[hsl(var(--text-secondary))]" />
              </div>
              <div className="text-left">
                <p className="font-golos font-semibold text-[hsl(var(--text-main))]">Любой свободный мастер</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Подберём лучшего специалиста</p>
              </div>
            </button>
            {masters.map((master, i) => (
              <button
                key={i}
                onClick={() => { setSelectedMaster(master); setStep(4); }}
                className="w-full p-4 border border-[hsl(var(--border))] rounded-2xl flex items-center gap-3 card-shadow"
              >
                <img src={MASTER_IMG} alt={master.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 text-left">
                  <p className="font-golos font-semibold text-[hsl(var(--text-main))] text-sm">{master.name}</p>
                  <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{master.spec}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-golos text-xs font-semibold">{master.rating}</span>
                    <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">({master.reviews})</span>
                  </div>
                </div>
                <Icon name="ChevronRight" size={18} className="text-[hsl(var(--text-secondary))]" />
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="w-full py-3 font-golos text-[hsl(var(--text-secondary))] text-sm mt-4">
            ← Назад
          </button>
        </div>
      )}

      {/* Step 4: Date & Time */}
      {step === 4 && (
        <div className="animate-fade-in-up">
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Дата и время</h2>
          <p className="font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">Июнь 2026</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-5">
            {days.map((day, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(`${day.date} июня`)}
                className={`flex flex-col items-center gap-1 min-w-[46px] py-2.5 px-2 rounded-2xl transition-all ${
                  selectedDate === `${day.date} июня`
                    ? "gradient-orange text-white"
                    : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-secondary))]"
                }`}
              >
                <span className="font-golos text-[10px]">{day.label}</span>
                <span className="font-golos font-bold text-base">{day.date}</span>
              </button>
            ))}
          </div>
          <p className="font-golos font-medium text-sm text-[hsl(var(--text-main))] mb-3">Свободное время</p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2.5 rounded-xl font-golos text-sm font-medium transition-all ${
                  selectedTime === time
                    ? "gradient-orange text-white orange-glow"
                    : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))]"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          <button
            className="w-full py-3 border border-[hsl(var(--border))] rounded-xl font-golos text-sm text-[hsl(var(--text-secondary))] flex items-center justify-center gap-2 mb-4"
          >
            <Icon name="BellPlus" size={15} />
            Встать в лист ожидания
          </button>
          <button
            onClick={() => selectedTime && setStep(5)}
            disabled={!selectedTime}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow disabled:opacity-50"
          >
            Далее
          </button>
          <button onClick={() => setStep(3)} className="w-full py-3 font-golos text-[hsl(var(--text-secondary))] text-sm mt-2">
            ← Назад
          </button>
        </div>
      )}

      {/* Step 5: Confirm */}
      {step === 5 && (
        <div className="animate-fade-in-up">
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Подтверждение</h2>
          <p className="font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">Проверьте детали записи</p>
          <div className="bg-[hsl(var(--gray-soft))] rounded-2xl p-4 space-y-3 mb-5">
            {[
              { label: "Клиент", value: forSelf ? "Анна Петрова" : "Маша (дочь)" },
              { label: "Услуга", value: selectedService?.name },
              { label: "Мастер", value: selectedMaster?.name || "Любой свободный" },
              { label: "Дата", value: selectedDate },
              { label: "Время", value: selectedTime },
              { label: "Длительность", value: `${selectedService?.duration} мин` },
              { label: "Стоимость", value: `${selectedService?.price.toLocaleString()} ₽` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="font-golos text-sm text-[hsl(var(--text-secondary))]">{label}</span>
                <span className="font-golos text-sm font-semibold text-[hsl(var(--text-main))]">{value}</span>
              </div>
            ))}
          </div>
          <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-3 flex items-center gap-2 mb-5">
            <Icon name="Sparkles" size={16} className="text-[hsl(var(--primary))]" />
            <p className="font-golos text-sm text-[hsl(var(--primary))] font-medium">
              Вы получите +20 баллов за запись через приложение
            </p>
          </div>
          <button
            onClick={() => setConfirmed(true)}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
          >
            Подтвердить запись
          </button>
          <button onClick={() => setStep(4)} className="w-full py-3 font-golos text-[hsl(var(--text-secondary))] text-sm mt-2">
            ← Назад
          </button>
        </div>
      )}
    </div>
  );
}
