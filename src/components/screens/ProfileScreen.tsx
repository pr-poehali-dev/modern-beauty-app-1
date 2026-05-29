import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";

const family = [
  { name: "Маша", relation: "Дочь", age: "8 лет", avatar: "👧" },
  { name: "Миша", relation: "Сын", age: "12 лет", avatar: "👦" },
];

const notifications = [
  { icon: "Calendar", color: "text-[hsl(var(--primary))]", bg: "bg-[hsl(var(--orange-light))]", title: "Напоминание о записи", desc: "Стрижка + укладка — завтра 14:30", time: "2 ч назад", read: false },
  { icon: "AlertTriangle", color: "text-yellow-500", bg: "bg-yellow-50", title: "Баллы сгорают!", desc: "320 баллов сгорят через 7 дней", time: "5 ч назад", read: false },
  { icon: "Sparkles", color: "text-[hsl(var(--primary))]", bg: "bg-[hsl(var(--orange-light))]", title: "Начислены бонусы", desc: "+425 баллов за визит 12 мая", time: "Вчера", read: true },
  { icon: "Gift", color: "text-pink-500", bg: "bg-pink-50", title: "Акция для вас", desc: "Скидка 20% на окрашивание до 31 мая", time: "2 дня назад", read: true },
  { icon: "MessageCircle", color: "text-blue-500", bg: "bg-blue-50", title: "Новое сообщение", desc: "Анастасия: Добрый день!", time: "3 дня назад", read: true },
];

const payments = [
  { date: "12 мая 2026", service: "Балаяж + стрижка", amount: 8500, method: "Карта", points: "+425 б", status: "Оплачено" },
  { date: "1 мая 2026", service: "Детская стрижка (Маша)", amount: 900, method: "Карта", points: "+70 б", status: "Оплачено" },
  { date: "20 апр. 2026", service: "Маникюр классический", amount: 1500, method: "Баллы + карта", points: "+75 б", status: "Оплачено" },
  { date: "5 апр. 2026", service: "Стрижка + укладка", amount: 2500, method: "Карта", points: "+125 б", status: "Оплачено" },
];

type SubScreen = null | "notifications" | "payments";

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Анна Петрова");
  const [email, setEmail] = useState("anna.petrova@mail.ru");
  const [bday, setBday] = useState("15 марта 1988");
  const [notes, setNotes] = useState("Аллергия на миндальное масло");
  const [sub, setSub] = useState<SubScreen>(null);
  const [notifSettings, setNotifSettings] = useState({ sms: true, push: true, promo: false, birthday: true });
  const unread = notifications.filter(n => !n.read).length;

  if (sub === "notifications") {
    return (
      <div className="px-5 pt-2 pb-4 animate-slide-in-right">
        <button onClick={() => setSub(null)} className="flex items-center gap-1 font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">
          <Icon name="ChevronLeft" size={18} /> Профиль
        </button>
        <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Уведомления</h2>
        <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mb-5">{unread} непрочитанных</p>

        {/* Settings */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow mb-5">
          {[
            { key: "sms", label: "SMS-уведомления", desc: "Напоминания о записях" },
            { key: "push", label: "Push-уведомления", desc: "Мгновенные оповещения" },
            { key: "promo", label: "Акции и новости", desc: "Специальные предложения" },
            { key: "birthday", label: "День рождения", desc: "Бонусы в ваш праздник" },
          ].map(({ key, label, desc }, i) => (
            <div key={key} className={`px-4 py-3.5 flex items-center gap-3 ${i < 3 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div className="flex-1">
                <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{desc}</p>
              </div>
              <button
                onClick={() => setNotifSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={`w-11 h-6 rounded-full transition-all relative ${
                  notifSettings[key as keyof typeof notifSettings] ? "gradient-orange" : "bg-[hsl(var(--border))]"
                }`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                  notifSettings[key as keyof typeof notifSettings] ? "left-5.5 translate-x-0.5" : "left-0.5"
                }`} />
              </button>
            </div>
          ))}
        </div>

        {/* Notification list */}
        <p className="font-golos font-semibold text-[hsl(var(--text-main))] mb-3">Все уведомления</p>
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <div key={i} className={`flex items-start gap-3 p-3.5 rounded-2xl border ${n.read ? "border-[hsl(var(--border))] bg-white" : "border-[hsl(var(--primary))]/20 bg-[hsl(var(--orange-light))]"}`}>
              <div className={`w-9 h-9 ${n.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon name={n.icon} size={16} className={n.color} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-1 shrink-0" />}
                </div>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">{n.desc}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sub === "payments") {
    return (
      <div className="px-5 pt-2 pb-4 animate-slide-in-right">
        <button onClick={() => setSub(null)} className="flex items-center gap-1 font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">
          <Icon name="ChevronLeft" size={18} /> Профиль
        </button>
        <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">История платежей</h2>
        <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mb-5">Все транзакции</p>

        {/* Total */}
        <div className="gradient-orange rounded-2xl p-4 mb-5 text-white">
          <p className="font-golos text-white/70 text-xs mb-1">Потрачено всего</p>
          <p className="font-golos font-bold text-3xl mb-1">13 400 ₽</p>
          <p className="font-golos text-white/70 text-xs">4 визита · накоплено +695 б</p>
        </div>

        <div className="space-y-3">
          {payments.map((p, i) => (
            <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 card-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">{p.service}</p>
                  <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">{p.date} · {p.method}</p>
                </div>
                <p className="font-golos font-bold text-[hsl(var(--text-main))]">{p.amount.toLocaleString()} ₽</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] px-2 py-0.5 rounded-lg">{p.points}</span>
                <span className="font-golos text-xs text-green-500 font-medium">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      {/* Avatar + Info */}
      <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))]">
            <img src={MASTER_IMG} alt="Профиль" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 gradient-orange rounded-lg flex items-center justify-center">
            <Icon name="Camera" size={13} className="text-white" />
          </button>
        </div>
        <div>
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">{name}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">⭐ Постоянный гость</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Icon name="Phone" size={12} className="text-[hsl(var(--text-secondary))]" />
            <span className="font-golos text-xs text-[hsl(var(--text-secondary))]">+7 (916) 123-45-67</span>
          </div>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="ml-auto w-9 h-9 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center"
        >
          <Icon name={editing ? "Check" : "Pencil"} size={16} className="text-[hsl(var(--text-secondary))]" />
        </button>
      </div>

      {/* Profile fields */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow mb-4 animate-fade-in-up delay-100">
        {[
          { label: "Имя", value: name, setter: setName, icon: "User" },
          { label: "Email", value: email, setter: setEmail, icon: "Mail" },
          { label: "День рождения", value: bday, setter: setBday, icon: "Gift" },
          { label: "Особенности", value: notes, setter: setNotes, icon: "AlertCircle" },
        ].map(({ label, value, setter, icon }, i) => (
          <div key={i} className={`px-4 py-3.5 ${i < 3 ? "border-b border-[hsl(var(--border))]" : ""}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-lg flex items-center justify-center shrink-0">
                <Icon name={icon} size={15} className="text-[hsl(var(--primary))]" />
              </div>
              <div className="flex-1">
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{label}</p>
                {editing ? (
                  <input
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="font-golos text-sm text-[hsl(var(--text-main))] font-medium w-full border-b border-[hsl(var(--primary))] outline-none bg-transparent mt-0.5 pb-0.5"
                  />
                ) : (
                  <p className="font-golos text-sm text-[hsl(var(--text-main))] font-medium">{value}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Favorite master */}
      <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-4 flex items-center gap-3 mb-4 animate-fade-in-up delay-200">
        <img src={MASTER_IMG} alt="Мастер" className="w-12 h-12 rounded-xl object-cover" />
        <div className="flex-1">
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Любимый мастер</p>
          <p className="font-golos font-semibold text-[hsl(var(--text-main))] text-sm">Анастасия Романова</p>
        </div>
        <button onClick={() => onNavigate("masters")} className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">
          Изменить
        </button>
      </div>

      {/* Family */}
      <div className="mb-4 animate-fade-in-up delay-200">
        <div className="flex items-center justify-between mb-3">
          <p className="font-golos font-semibold text-[hsl(var(--text-main))]">Семейные профили</p>
          <button className="flex items-center gap-1 font-golos text-xs font-semibold text-[hsl(var(--primary))]">
            <Icon name="Plus" size={14} />
            Добавить
          </button>
        </div>
        <div className="space-y-2">
          {family.map((member, i) => (
            <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl p-3.5 flex items-center gap-3 card-shadow">
              <div className="w-10 h-10 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center text-xl">
                {member.avatar}
              </div>
              <div className="flex-1">
                <p className="font-golos font-semibold text-[hsl(var(--text-main))] text-sm">{member.name}</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{member.relation} · {member.age}</p>
              </div>
              <button onClick={() => onNavigate("booking")} className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">
                Записать
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow animate-fade-in-up delay-300">
        {[
          { icon: "Bell", label: "Уведомления", desc: "SMS и push-уведомления", badge: unread > 0 ? String(unread) : null, action: () => setSub("notifications") },
          { icon: "CreditCard", label: "История платежей", desc: "Все транзакции", badge: null, action: () => setSub("payments") },
          { icon: "Shield", label: "Политика конфиденциальности", desc: "", badge: null, action: () => {} },
          { icon: "FileText", label: "Пользовательское соглашение", desc: "", badge: null, action: () => {} },
        ].map(({ icon, label, desc, badge, action }, i) => (
          <button key={i} onClick={action} className={`w-full px-4 py-3.5 flex items-center gap-3 text-left ${i < 3 ? "border-b border-[hsl(var(--border))]" : ""}`}>
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center relative">
              <Icon name={icon} size={15} className="text-[hsl(var(--text-secondary))]" />
              {badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[hsl(var(--primary))] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
              {desc && <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{desc}</p>}
            </div>
            <Icon name="ChevronRight" size={16} className="text-[hsl(var(--text-secondary))]" />
          </button>
        ))}
      </div>

      <button className="w-full mt-4 py-3.5 border border-red-100 bg-red-50 rounded-2xl font-golos font-medium text-red-500 text-sm flex items-center justify-center gap-2">
        <Icon name="LogOut" size={16} />
        Выйти из аккаунта
      </button>
    </div>
  );
}
