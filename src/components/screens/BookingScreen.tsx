import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface BookingScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";
const MASTER2 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";
const MASTER3 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/ebd24705-5d23-4a30-b95a-a058766b8e3f.jpg";
const MASTER4 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/8c5a4941-6d8d-445a-908c-537218ec19c5.jpg";

const mastersList = [
  { name: "Анастасия Романова", spec: "Стилист-колорист",    rating: 4.9, reviews: 127, img: MASTER1, freeSlot: "29 июля, 10:00" },
  { name: "Мария Смирнова",     spec: "Мастер по стрижкам",  rating: 4.8, reviews: 89,  img: MASTER2, freeSlot: "29 июля, 16:00" },
  { name: "Елена Козлова",      spec: "Мастер маникюра",     rating: 4.9, reviews: 203, img: MASTER3, freeSlot: "30 июля, 14:30" },

];

const serviceCats = [
  { id: "all",     label: "Все"      },
  { id: "women",   label: "Женские"  },
  { id: "men",     label: "Мужские"  },
  { id: "kids",    label: "Детские"  },
  { id: "color",   label: "Окраш."   },
  { id: "care",    label: "Уход"     },
  { id: "nails",   label: "Маникюр"  },
  { id: "brows",   label: "Брови"    },
];

const servicesList = [
  { name: "Стрижка женская",          price: 1800, duration: 60,  bonus: 36,  category: "women" },
  { name: "Стрижка + укладка",        price: 2500, duration: 75,  bonus: 50,  category: "women" },
  { name: "Мужская стрижка",          price: 1200, duration: 40,  bonus: 24,  category: "men"   },
  { name: "Детская стрижка",          price: 900,  duration: 30,  bonus: 18,  category: "kids"  },
  { name: "Окрашивание (балаяж)",     price: 7500, duration: 180, bonus: 150, category: "color" },
  { name: "Тонирование",              price: 3500, duration: 90,  bonus: 70,  category: "color" },
  { name: "Укладка",                  price: 1200, duration: 45,  bonus: 24,  category: "women" },
  { name: "Маска Olaplex",            price: 2200, duration: 40,  bonus: 44,  category: "care"  },
  { name: "Маникюр классический",     price: 1500, duration: 60,  bonus: 30,  category: "nails" },
  { name: "Маникюр с покрытием",      price: 2200, duration: 90,  bonus: 44,  category: "nails" },
  { name: "Коррекция бровей",         price: 800,  duration: 30,  bonus: 16,  category: "brows" },
];

const days = [
  { label: "Пн", date: "7" }, { label: "Вт", date: "8" }, { label: "Ср", date: "9" },
  { label: "Чт", date: "10" }, { label: "Пт", date: "11" }, { label: "Сб", date: "12" }, { label: "Вс", date: "13" },
];

const times = ["09:00","10:00","11:30","13:00","14:30","16:00","17:30","18:00","19:00"];

type Master = typeof mastersList[0];
type Service = typeof servicesList[0];

export default function BookingScreen({ onNavigate }: BookingScreenProps) {
  const [forSelf, setForSelf] = useState(true);
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);
  const [serviceCat, setServiceCat] = useState("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDay, setSelectedDay] = useState("7");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [useBonus, setUseBonus] = useState(false);

  const filteredServices = serviceCat === "all"
    ? servicesList
    : servicesList.filter(s => s.category === serviceCat);

  const totalBonus = selectedService ? selectedService.bonus : 0;
  const bonusDiscount = useBonus && selectedService ? Math.floor(selectedService.price * 0.07) : 0;

  /* ── CONFIRMED ── */
  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 gap-4 animate-scale-in">
        <div className="w-20 h-20 gradient-orange rounded-full flex items-center justify-center orange-glow">
          <Icon name="Check" size={36} className="text-white" />
        </div>
        <h2 className="font-golos font-bold text-2xl text-[hsl(var(--text-main))] text-center">Запись подтверждена!</h2>
        <div className="text-center space-y-1">
          <p className="font-golos text-[hsl(var(--text-secondary))] text-sm">{selectedService?.name}</p>
          <p className="font-golos font-bold text-[hsl(var(--primary))]">
            {selectedMaster?.name ?? "Любой мастер"} · {selectedDay} июля, {selectedTime}
          </p>
        </div>
        <div className="bg-[hsl(var(--orange-light))] rounded-2xl px-5 py-3 w-full text-center border border-[hsl(var(--primary))]/15">
          <p className="font-golos text-sm text-[hsl(var(--primary))] font-semibold">
            ✨ +50 баллов начислено за запись через приложение
          </p>
        </div>
        <button
          onClick={() => { setConfirmed(false); setSelectedService(null); setSelectedTime(""); setSelectedMaster(null); }}
          className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-3 animate-fade-in overflow-y-auto scrollbar-hide">

      {/* ── FOR WHOM ── */}
      <div>
        <p className="font-golos text-[10px] font-bold text-[hsl(var(--text-secondary))] uppercase tracking-wider mb-2">Для кого запись</p>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setForSelf(true)}
            className={`py-3 rounded-2xl font-golos font-semibold text-sm transition-all border-2 ${forSelf ? "gradient-orange text-white border-transparent orange-glow" : "bg-white border-[hsl(var(--border))] text-[hsl(var(--text-main))]"}`}>
            Для себя
          </button>
          <button onClick={() => setForSelf(false)}
            className={`py-3 rounded-2xl font-golos font-semibold text-sm transition-all border-2 ${!forSelf ? "gradient-orange text-white border-transparent orange-glow" : "bg-white border-[hsl(var(--border))] text-[hsl(var(--text-main))]"}`}>
            Член семьи
          </button>
        </div>
        {!forSelf && (
          <div className="flex gap-2 mt-2">
            {[{ name: "Маша", emoji: "👧" }, { name: "Миша", emoji: "👦" }].map(m => (
              <button key={m.name} className="flex items-center gap-2 px-3 py-2 bg-white border border-[hsl(var(--border))] rounded-xl font-golos text-sm shadow-sm">
                <span>{m.emoji}</span><span>{m.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MASTER SELECTION ── */}
      <div>
        <p className="font-golos text-[10px] font-bold text-[hsl(var(--text-secondary))] uppercase tracking-wider mb-2">Выберите мастера</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {/* Any master */}
          <button
            onClick={() => setSelectedMaster(null)}
            className={`flex flex-col items-center gap-1.5 shrink-0 transition-all`}
          >
            <div className={`w-20 h-20 rounded-2xl overflow-hidden border-3 transition-all ${!selectedMaster ? "border-[hsl(var(--primary))] ring-2 ring-[hsl(var(--primary))]/30" : "border-transparent"}`}>
              <div className="w-full h-full bg-[hsl(var(--gray-soft))] flex items-center justify-center">
                <Icon name="Users" size={28} className="text-[hsl(var(--text-secondary))]" />
              </div>
            </div>
            <p className={`font-golos text-[10px] font-semibold text-center w-20 leading-tight ${!selectedMaster ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"}`}>Любой свободный</p>
            {!selectedMaster && <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]" />}
          </button>

          {mastersList.map((m) => {
            const isSelected = selectedMaster?.name === m.name;
            return (
              <button key={m.name} onClick={() => setSelectedMaster(m)}
                className="flex flex-col items-center gap-1.5 shrink-0 transition-all">
                <div className={`w-20 h-20 rounded-2xl overflow-hidden transition-all ${isSelected ? "ring-2 ring-[hsl(var(--primary))]/50 border-2 border-[hsl(var(--primary))]" : "border-2 border-transparent"}`}>
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" />
                </div>
                <p className={`font-golos text-[10px] font-semibold text-center w-20 leading-tight ${isSelected ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>
                  {m.name.split(" ")[0]}
                </p>
                <div className="flex items-center gap-0.5">
                  <Icon name="Star" size={9} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-golos text-[9px] text-[hsl(var(--text-secondary))]">{m.rating}</span>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]" />}
              </button>
            );
          })}
        </div>
        {selectedMaster && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-[hsl(var(--orange-light))] rounded-xl border border-[hsl(var(--primary))]/15">
            <Icon name="Clock" size={12} className="text-[hsl(var(--primary))] shrink-0" />
            <p className="font-golos text-xs text-[hsl(var(--primary))]">
              Ближайшее окно: <span className="font-bold">{selectedMaster.freeSlot}</span> · {selectedMaster.spec}
            </p>
          </div>
        )}
      </div>

      {/* ── SERVICE SELECTION ── */}
      <div>
        <p className="font-golos text-[10px] font-bold text-[hsl(var(--text-secondary))] uppercase tracking-wider mb-2">Выберите услугу</p>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 mb-2">
          {serviceCats.map(cat => (
            <button key={cat.id} onClick={() => setServiceCat(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-golos text-xs font-semibold shrink-0 transition-all ${serviceCat === cat.id ? "gradient-orange text-white shadow-sm" : "bg-white border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))]"}`}>
              {cat.label}
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          {filteredServices.map((service, i) => {
            const isSelected = selectedService?.name === service.name;
            return (
              <button key={i} onClick={() => setSelectedService(isSelected ? null : service)}
                className={`w-full px-4 py-3 rounded-2xl border flex items-center justify-between text-left transition-all ${isSelected ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]" : "border-[hsl(var(--border))] bg-white shadow-sm"}`}>
                <div className="flex-1 min-w-0">
                  <p className={`font-golos font-semibold text-sm ${isSelected ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>{service.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">⏱ {service.duration} мин</span>
                    <span className="font-golos text-[10px] text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] px-1.5 py-0.5 rounded-lg font-semibold">+{service.bonus} Б</span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className={`font-golos font-bold text-base ${isSelected ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>{service.price.toLocaleString()} ₽</p>
                  {isSelected && <Icon name="Check" size={14} className="text-[hsl(var(--primary))] ml-auto mt-0.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DATE & TIME ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="font-golos text-[10px] font-bold text-[hsl(var(--text-secondary))] uppercase tracking-wider">Дата и время</p>
          <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">Июль 2026</span>
        </div>
        {/* Days */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3">
          {days.map(d => {
            const isActive = selectedDay === d.date;
            return (
              <button key={d.date} onClick={() => setSelectedDay(d.date)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl shrink-0 transition-all ${isActive ? "gradient-orange text-white shadow-sm" : "bg-white border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))]"}`}>
                <span className="font-golos text-[10px] font-semibold">{d.label}</span>
                <span className="font-golos font-bold text-sm">{d.date}</span>
              </button>
            );
          })}
        </div>
        {/* Times */}
        <div className="grid grid-cols-4 gap-2">
          {times.map(t => {
            const isActive = selectedTime === t;
            return (
              <button key={t} onClick={() => setSelectedTime(t)}
                className={`py-2.5 rounded-xl font-golos text-sm font-semibold transition-all ${isActive ? "gradient-orange text-white shadow-sm" : "bg-white border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))]"}`}>
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SUMMARY & CONFIRM ── */}
      {selectedService && selectedTime && (
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 shadow-sm space-y-3">
          <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">Итог записи</p>
          <div className="space-y-1.5 text-sm font-golos">
            <div className="flex justify-between">
              <span className="text-[hsl(var(--text-secondary))]">{selectedService.name}</span>
              <span className="font-semibold">{selectedService.price.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--text-secondary))]">Мастер</span>
              <span className="font-semibold">{selectedMaster?.name.split(" ")[0] ?? "Любой"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--text-secondary))]">{selectedDay} июня, {selectedTime}</span>
              <span className="text-[hsl(var(--primary))] font-bold">+{totalBonus} Б</span>
            </div>
          </div>
          {/* Use bonus */}
          <button onClick={() => setUseBonus(!useBonus)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${useBonus ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]" : "border-[hsl(var(--border))] bg-[hsl(var(--gray-soft))]"}`}>
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${useBonus ? "gradient-orange border-transparent" : "border-[hsl(var(--border))]"}`}>
              {useBonus && <Icon name="Check" size={12} className="text-white" />}
            </div>
            <div className="flex-1 text-left">
              <p className={`font-golos text-xs font-semibold ${useBonus ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>
                Списать баллы — доступно 1 240 Б = 620 ₽
              </p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Скидка до 7% = {bonusDiscount} ₽</p>
            </div>
          </button>
          {bonusDiscount > 0 && (
            <div className="flex justify-between font-golos pt-1 border-t border-[hsl(var(--border))]">
              <span className="font-bold text-sm text-[hsl(var(--text-main))]">Итого</span>
              <span className="font-bold text-base text-[hsl(var(--text-main))]">{(selectedService.price - bonusDiscount).toLocaleString()} ₽</span>
            </div>
          )}
          <button
            onClick={() => setConfirmed(true)}
            className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow flex items-center justify-center gap-2"
          >
            <Icon name="CalendarCheck" size={18} />
            Подтвердить запись
          </button>
        </div>
      )}

      {/* Prompt if no service selected */}
      {!selectedService && (
        <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-center gap-2">
          <Icon name="Info" size={14} className="text-[hsl(var(--primary))] shrink-0" />
          <p className="font-golos text-xs text-[hsl(var(--primary))]">Выберите услугу и время, чтобы записаться</p>
        </div>
      )}
    </div>
  );
}