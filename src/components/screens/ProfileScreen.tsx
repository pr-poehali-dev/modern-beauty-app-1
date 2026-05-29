import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PROFILE_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/16cbc8c4-ea9d-4083-9fff-12c510e31a77.jpg";
const MASTER_IMG  = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";
const MASHA_IMG   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/db101f73-ed27-44e6-bb2f-9ee28ae6fb24.jpg";
const MISHA_IMG   = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/c1c9acb8-c2e4-4a05-8839-4413faf268b3.jpg";

type SubScreen = null | "notifications" | "payments" | "settings" | "privacy" | "agreement";
type Tab = "profile" | "family" | "settings";

const notifHistory = [
  { icon: "Calendar",      bg: "bg-[hsl(var(--orange-light))]", fg: "text-[hsl(var(--primary))]", title: "Напоминание о записи",  desc: "Стрижка — завтра 14:30",           time: "2 ч назад",    read: false },
  { icon: "AlertTriangle", bg: "bg-yellow-50",                  fg: "text-yellow-500",              title: "Баллы сгорают!",        desc: "320 баллов сгорят через 7 дней",   time: "5 ч назад",    read: false },
  { icon: "Sparkles",      bg: "bg-[hsl(var(--orange-light))]", fg: "text-[hsl(var(--primary))]", title: "Начислены бонусы",      desc: "+425 баллов за визит 12 мая",      time: "Вчера",        read: true  },
  { icon: "Gift",          bg: "bg-pink-50",                    fg: "text-pink-500",                title: "Акция для вас",         desc: "Скидка 20% на окрашивание",        time: "2 дня назад",  read: true  },
  { icon: "MessageCircle", bg: "bg-sky-50",                     fg: "text-sky-500",                 title: "Ответ мастера",         desc: "Анастасия: «Жду вас завтра!»",     time: "3 дня назад",  read: true  },
];

const payments = [
  { date: "12 мая", service: "Балаяж + стрижка",      amount: 8500, points: "+425 Б" },
  { date: "1 мая",  service: "Детская стрижка (Маша)", amount: 900,  points: "+70 Б"  },
  { date: "20 апр.", service: "Маникюр",               amount: 1500, points: "+75 Б"  },
  { date: "5 апр.", service: "Стрижка + укладка",      amount: 2500, points: "+125 Б" },
];

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [sub, setSub] = useState<SubScreen>(null);
  const [tab, setTab] = useState<Tab>("profile");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Анна Петрова");
  const [email, setEmail] = useState("anna.petrova@mail.ru");
  const [bday, setBday] = useState("15 марта 1988");
  const [notes, setNotes] = useState("Аллергия на миндальное масло");

  // Notification toggles
  const [notifBooking, setNotifBooking] = useState(true);
  const [notifBonus, setNotifBonus] = useState(true);
  const [notifPromo, setNotifPromo] = useState(true);
  const [notifChat, setNotifChat] = useState(true);
  const [notifBirthday, setNotifBirthday] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSms, setNotifSms] = useState(false);

  const unread = notifHistory.filter(n => !n.read).length;

  /* ── NOTIFICATIONS SCREEN ── */
  if (sub === "notifications") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-2 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setSub(null)} className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <div>
            <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Уведомления</h2>
            {unread > 0 && <p className="font-golos text-[10px] text-[hsl(var(--primary))]">{unread} непрочитанных</p>}
          </div>
        </div>

        {/* Toggle settings */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm shrink-0">
          <p className="font-golos font-semibold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Каналы</p>
          {[
            { label: "Push-уведомления",   desc: "В приложении",      val: notifPush,     set: setNotifPush     },
            { label: "SMS-уведомления",     desc: "На номер телефона", val: notifSms,      set: setNotifSms      },
          ].map(({ label, desc, val, set }, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 ${i === 0 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div>
                <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
              </div>
              <button onClick={() => set(!val)}
                className={`relative w-11 h-6 rounded-full transition-colors ${val ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${val ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
          <p className="font-golos font-semibold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Типы уведомлений</p>
          {[
            { label: "Записи и напоминания", val: notifBooking, set: setNotifBooking },
            { label: "Баллы и бонусы",        val: notifBonus,   set: setNotifBonus   },
            { label: "Акции и предложения",   val: notifPromo,   set: setNotifPromo   },
            { label: "Сообщения мастеров",    val: notifChat,    set: setNotifChat    },
            { label: "День рождения",          val: notifBirthday,set: setNotifBirthday},
          ].map(({ label, val, set }, i, arr) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
              <button onClick={() => set(!val)}
                className={`relative w-11 h-6 rounded-full transition-colors ${val ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${val ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Notification history */}
        <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] shrink-0">История</p>
        <div className="space-y-2">
          {notifHistory.map((n, i) => (
            <div key={i} className={`flex items-start gap-3 p-3.5 rounded-2xl border ${n.read ? "border-[hsl(var(--border))] bg-white" : "border-[hsl(var(--primary))]/20 bg-[hsl(var(--orange-light))]"}`}>
              <div className={`w-8 h-8 ${n.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon name={n.icon} size={15} className={n.fg} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full shrink-0 mt-1" />}
                </div>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{n.desc}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── PAYMENTS SCREEN ── */
  if (sub === "payments") {
    const total = payments.reduce((s, p) => s + p.amount, 0);
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-2 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setSub(null)} className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">История платежей</h2>
        </div>
        <div className="gradient-orange rounded-2xl px-4 py-3 text-white flex justify-between items-center shrink-0">
          <div>
            <p className="font-golos text-white/70 text-[10px]">Потрачено всего</p>
            <p className="font-golos font-bold text-2xl">{total.toLocaleString()} ₽</p>
          </div>
          <div className="text-right">
            <p className="font-golos text-white/70 text-[10px]">Визитов</p>
            <p className="font-golos font-bold text-2xl">{payments.length}</p>
          </div>
        </div>
        <div className="space-y-2">
          {payments.map((p, i) => (
            <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm">
              <div>
                <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">{p.service}</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{p.date}</p>
              </div>
              <div className="text-right">
                <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">{p.amount.toLocaleString()} ₽</p>
                <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold">{p.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── SETTINGS SCREEN ── */
  if (sub === "settings") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-2 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setSub(null)} className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Настройки</h2>
        </div>

        {/* Payment */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          <p className="font-golos font-semibold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Оплата</p>
          <div className="border-b border-[hsl(var(--border))] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={15} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div className="flex-1">
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Привязанная карта</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">•••• •••• •••• 4242 · Visa</p>
            </div>
            <button className="font-golos text-xs font-bold text-red-400">Отвязать</button>
          </div>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={15} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <p className="font-golos text-sm font-medium text-[hsl(var(--primary))]">Добавить карту</p>
          </button>
        </div>

        {/* Notifications shortcut */}
        <button onClick={() => setSub("notifications")} className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm w-full text-left">
          <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center relative">
            <Icon name="Bell" size={15} className="text-[hsl(var(--text-secondary))]" />
            {unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[hsl(var(--primary))] rounded-full text-white text-[9px] font-bold flex items-center justify-center">{unread}</span>}
          </div>
          <div className="flex-1">
            <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Уведомления</p>
            <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Push и SMS настройки</p>
          </div>
          <Icon name="ChevronRight" size={16} className="text-[hsl(var(--text-secondary))]" />
        </button>

        {/* Legal */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          <p className="font-golos font-semibold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Документы</p>
          {[
            { icon: "Lock",     label: "Политика конфиденциальности", desc: "Как мы используем ваши данные", action: () => setSub("privacy")    },
            { icon: "FileText", label: "Пользовательское соглашение",  desc: "Условия использования сервиса", action: () => setSub("agreement")  },
            { icon: "Shield",   label: "Согласие на обработку данных", desc: "Ваши права и наши обязательства", action: () => {}                  },
          ].map(({ icon, label, desc, action }, i, arr) => (
            <button key={i} onClick={action} className={`w-full px-4 py-3 flex items-center gap-3 text-left ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center shrink-0">
                <Icon name={icon} size={14} className="text-[hsl(var(--text-secondary))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
              </div>
              <Icon name="ChevronRight" size={14} className="text-[hsl(var(--text-secondary))] shrink-0" />
            </button>
          ))}
        </div>

        {/* App info */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          {[
            { icon: "Info",      label: "О приложении",     desc: "Версия 1.0.0", action: () => {} },
            { icon: "Star",      label: "Оценить приложение", desc: "App Store / Google Play", action: () => {} },
            { icon: "MessageSquare", label: "Написать в поддержку", desc: "support@modern-salon.ru", action: () => onNavigate("chat") },
          ].map(({ icon, label, desc, action }, i, arr) => (
            <button key={i} onClick={action} className={`w-full px-4 py-3 flex items-center gap-3 text-left ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center shrink-0">
                <Icon name={icon} size={14} className="text-[hsl(var(--text-secondary))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
              </div>
              <Icon name="ChevronRight" size={14} className="text-[hsl(var(--text-secondary))] shrink-0" />
            </button>
          ))}
        </div>

        <button className="w-full py-3.5 border border-red-100 bg-red-50 rounded-2xl font-golos font-medium text-red-500 text-sm flex items-center justify-center gap-2">
          <Icon name="LogOut" size={15} />
          Выйти из аккаунта
        </button>
        <button className="w-full py-3 font-golos text-xs text-[hsl(var(--text-secondary))] text-center">
          Удалить аккаунт и все данные
        </button>
      </div>
    );
  }

  /* ── PRIVACY / AGREEMENT ── */
  if (sub === "privacy" || sub === "agreement") {
    const isPrivacy = sub === "privacy";
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-2 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setSub("settings")} className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <h2 className="font-golos font-bold text-base text-[hsl(var(--text-main))]">
            {isPrivacy ? "Политика конфиденциальности" : "Пользовательское соглашение"}
          </h2>
        </div>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-4 shadow-sm space-y-3">
          {isPrivacy ? (
            <>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">1. Сбор информации</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">Мы собираем имя, email, номер телефона и дату рождения для предоставления услуг записи и программы лояльности.</p>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">2. Использование данных</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">Данные используются исключительно для оказания услуг, отправки уведомлений и улучшения качества сервиса.</p>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">3. Хранение</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">Данные хранятся на защищённых серверах и не передаются третьим лицам без вашего согласия.</p>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">4. Ваши права</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">Вы вправе запросить удаление, изменение или выгрузку всех ваших данных. Для этого напишите в поддержку.</p>
            </>
          ) : (
            <>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">1. Предмет соглашения</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">Настоящее соглашение регулирует использование мобильного приложения салона красоты «Модерн».</p>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">2. Программа лояльности</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">1 балл = 0,5 рубля. Баллы начисляются за услуги и покупки. Срок действия — 6 месяцев с момента начисления.</p>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">3. Запись и отмена</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">Отмена записи возможна не позднее чем за 2 часа до визита. При более позднем отказе баллы за запись могут быть аннулированы.</p>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">4. Ответственность</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">Администрация оставляет за собой право изменять условия программы лояльности с уведомлением пользователей.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── MAIN PROFILE ── */
  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-2.5 animate-fade-in">

      {/* Avatar row */}
      <div className="flex items-center gap-3 bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm animate-fade-in-up shrink-0">
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))]">
            <img src={PROFILE_IMG} alt="Профиль" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-5 h-5 gradient-orange rounded-lg flex items-center justify-center">
            <Icon name="Camera" size={10} className="text-white" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-golos font-bold text-base text-[hsl(var(--text-main))] truncate">{name}</p>
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">⭐ Постоянный гость · +7 (916) 123-45-67</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-golos text-[10px] font-bold text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] px-2 py-0.5 rounded-lg">1 240 Б = 620 ₽</span>
            <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Скидка 10%</span>
          </div>
        </div>
        <button onClick={() => setEditing(!editing)}
          className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
          <Icon name={editing ? "Check" : "Pencil"} size={15} className="text-[hsl(var(--text-secondary))]" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-2xl p-1 gap-1 border border-[hsl(var(--border))] shadow-sm shrink-0">
        {([["profile","Данные"], ["family","Семья"], ["settings","Настройки"]] as [Tab,string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 py-2 rounded-xl font-golos text-xs font-semibold transition-all ${tab === key ? "gradient-orange text-white shadow-sm" : "text-[hsl(var(--text-secondary))]"}`}>
            {label}
            {key === "settings" && unread > 0 && (
              <span className="ml-1 inline-flex w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold items-center justify-center">{unread}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── PROFILE DATA ── */}
      {tab === "profile" && (
        <div className="flex flex-col gap-2 animate-fade-in flex-1 overflow-y-auto scrollbar-hide min-h-0">
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
            {[
              { label: "Имя",          value: name,  setter: setName,  icon: "User"        },
              { label: "Email",        value: email, setter: setEmail, icon: "Mail"        },
              { label: "День рождения",value: bday,  setter: setBday,  icon: "Gift"        },
              { label: "Особенности",  value: notes, setter: setNotes, icon: "AlertCircle" },
            ].map(({ label, value, setter, icon }, i) => (
              <div key={i} className={`px-4 py-3 flex items-center gap-3 ${i < 3 ? "border-b border-[hsl(var(--border))]" : ""}`}>
                <div className="w-7 h-7 bg-[hsl(var(--orange-light))] rounded-lg flex items-center justify-center shrink-0">
                  <Icon name={icon} size={13} className="text-[hsl(var(--primary))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{label}</p>
                  {editing
                    ? <input value={value} onChange={e => setter(e.target.value)} className="font-golos text-sm font-medium text-[hsl(var(--text-main))] w-full border-b border-[hsl(var(--primary))] outline-none bg-transparent pb-0.5" />
                    : <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))] truncate">{value}</p>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-center gap-3">
            <img src={MASTER_IMG} alt="Мастер" className="w-10 h-10 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Любимый мастер</p>
              <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] truncate">Анастасия Романова</p>
            </div>
            <button onClick={() => onNavigate("masters")} className="font-golos text-xs font-bold text-[hsl(var(--primary))] shrink-0">Изменить</button>
          </div>
        </div>
      )}

      {/* ── FAMILY ── */}
      {tab === "family" && (
        <div className="flex flex-col gap-2 animate-fade-in flex-1 overflow-y-auto scrollbar-hide min-h-0">
          {[
            { name: "Маша", relation: "Дочь", age: "8 лет",  img: MASHA_IMG, lastVisit: "1 мая",   nextVisit: null,            phone: null,              note: "Любит короткие стрижки" },
            { name: "Миша", relation: "Сын",  age: "12 лет", img: MISHA_IMG, lastVisit: "15 апр.", nextVisit: "12 июня 11:00", phone: null,              note: "Обычная стрижка, не короче 2 см" },
          ].map((m, i) => (
            <div key={i} className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 py-3.5 flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))]/30 shrink-0">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">{m.name}</p>
                  <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{m.relation} · {m.age}</p>
                  {m.note && <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] mt-0.5 italic">«{m.note}»</p>}
                </div>
                <button onClick={() => onNavigate("booking")} className="gradient-orange text-white font-golos font-bold text-xs px-3 py-2 rounded-xl shrink-0">Записать</button>
              </div>
              <div className="px-4 pb-3 flex items-center gap-3 border-t border-[hsl(var(--border))]">
                <div className="flex-1">
                  <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Последний визит</p>
                  <p className="font-golos text-xs font-semibold text-[hsl(var(--text-main))]">{m.lastVisit}</p>
                </div>
                {m.nextVisit && (
                  <div className="flex-1">
                    <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Запись</p>
                    <p className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">{m.nextVisit}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button className="bg-white border-2 border-dashed border-[hsl(var(--border))] rounded-2xl py-4 flex items-center justify-center gap-2 font-golos text-sm text-[hsl(var(--text-secondary))]">
            <Icon name="Plus" size={16} />
            Добавить члена семьи (+70 Б)
          </button>
        </div>
      )}

      {/* ── SETTINGS (quick links) ── */}
      {tab === "settings" && (
        <div className="flex flex-col gap-2 animate-fade-in flex-1 overflow-y-auto scrollbar-hide min-h-0">
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
            {[
              { icon: "Bell",       label: "Уведомления",       desc: "Push и SMS",         badge: unread > 0 ? String(unread) : null, action: () => setSub("notifications") },
              { icon: "CreditCard", label: "История платежей",  desc: "Все транзакции",     badge: null, action: () => setSub("payments")      },
              { icon: "Settings",   label: "Настройки",         desc: "Карта, документы",   badge: null, action: () => setSub("settings")      },
            ].map(({ icon, label, desc, badge, action }, i) => (
              <button key={i} onClick={action} className={`w-full px-4 py-3.5 flex items-center gap-3 text-left ${i < 2 ? "border-b border-[hsl(var(--border))]" : ""}`}>
                <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center relative shrink-0">
                  <Icon name={icon} size={14} className="text-[hsl(var(--text-secondary))]" />
                  {badge && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[hsl(var(--primary))] rounded-full text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                  <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
                </div>
                <Icon name="ChevronRight" size={15} className="text-[hsl(var(--text-secondary))] shrink-0" />
              </button>
            ))}
          </div>
          <button className="w-full py-3.5 border border-red-100 bg-red-50 rounded-2xl font-golos font-medium text-red-500 text-sm flex items-center justify-center gap-2">
            <Icon name="LogOut" size={15} />
            Выйти из аккаунта
          </button>
        </div>
      )}
    </div>
  );
}