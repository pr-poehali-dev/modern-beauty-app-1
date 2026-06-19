import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PROFILE_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/16cbc8c4-ea9d-4083-9fff-12c510e31a77.jpg";

type Sub = null | "notifications" | "privacy" | "agreement" | "account";

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [sub, setSub] = useState<Sub>(null);

  // Account fields
  const [name, setName]   = useState("Петрова Анна Николаевна");
  const [phone, setPhone] = useState("+7 (916) 123-45-67");
  const [email, setEmail] = useState("anna.petrova@mail.ru");
  const [bday, setBday]   = useState("15 марта 1988");
  const [notes, setNotes] = useState("Аллергия на миндальное масло");

  // Notification toggles
  const [notifPush,     setNotifPush]     = useState(true);
  const [notifSms,      setNotifSms]      = useState(false);
  const [notifBooking,  setNotifBooking]  = useState(true);
  const [notifBonus,    setNotifBonus]    = useState(true);
  const [notifPromo,    setNotifPromo]    = useState(true);
  const [notifChat,     setNotifChat]     = useState(true);
  const [notifBirthday, setNotifBirthday] = useState(true);

  const Toggle = ({ val, set }: { val: boolean; set: (v: boolean) => void }) => (
    <button onClick={() => set(!val)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${val ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${val ? "right-0.5" : "left-0.5"}`} />
    </button>
  );

  const BackBtn = ({ to }: { to: Sub }) => (
    <button onClick={() => setSub(to)}
      className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm shrink-0">
      <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
    </button>
  );

  /* ── ACCOUNT ── */
  if (sub === "account") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Данные аккаунта</h2>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm shrink-0">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))]">
              <img src={PROFILE_IMG} alt="Фото" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 gradient-orange rounded-lg flex items-center justify-center orange-glow">
              <Icon name="Camera" size={12} className="text-white" />
            </button>
          </div>
          <div>
            <p className="font-golos font-bold text-base text-[hsl(var(--text-main))]">{name}</p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">⭐ Постоянный гость</p>
            <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold mt-0.5">Нажмите на фото, чтобы изменить</p>
          </div>
        </div>

        {/* Fields */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          {[
            { label: "Имя и фамилия", value: name,  setter: setName,  icon: "User",        type: "text"  },
            { label: "Телефон",       value: phone, setter: setPhone, icon: "Phone",       type: "tel"   },
            { label: "Email",         value: email, setter: setEmail, icon: "Mail",        type: "email" },
            { label: "День рождения", value: bday,  setter: setBday,  icon: "Gift",        type: "text"  },
            { label: "Особенности",   value: notes, setter: setNotes, icon: "AlertCircle", type: "text"  },
          ].map(({ label, value, setter, icon, type }, i, arr) => (
            <div key={i} className={`px-4 py-3.5 flex items-center gap-3 ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={14} className="text-[hsl(var(--primary))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{label}</p>
                <input
                  type={type}
                  value={value}
                  onChange={e => setter(e.target.value)}
                  className="font-golos text-sm font-medium text-[hsl(var(--text-main))] w-full outline-none bg-transparent border-b border-transparent focus:border-[hsl(var(--primary))] transition-colors pb-0.5 mt-0.5"
                />
              </div>
              <Icon name="Pencil" size={13} className="text-[hsl(var(--text-secondary))] shrink-0" />
            </div>
          ))}
        </div>

        <button className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow">
          Сохранить изменения
        </button>

        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          <button className="w-full px-4 py-3.5 flex items-center gap-3 border-b border-[hsl(var(--border))]">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center">
              <Icon name="Lock" size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))] flex-1 text-left">Изменить пароль</p>
            <Icon name="ChevronRight" size={15} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <button className="w-full px-4 py-3.5 flex items-center gap-3">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center">
              <Icon name="CreditCard" size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Привязанная карта</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">•••• •••• •••• 4242 · Visa</p>
            </div>
            <button className="font-golos text-xs font-bold text-red-400">Отвязать</button>
          </button>
        </div>

        <button className="w-full py-3 font-golos text-xs text-red-400 text-center">
          Удалить аккаунт и все данные
        </button>
      </div>
    );
  }

  /* ── NOTIFICATIONS ── */
  if (sub === "notifications") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Уведомления и напоминания</h2>
        </div>

        {/* Channels */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-2">Каналы доставки</p>
          {[
            { label: "Push-уведомления", desc: "Всплывающие уведомления на телефоне", val: notifPush, set: setNotifPush },
            { label: "SMS-сообщения",    desc: "На привязанный номер телефона",        val: notifSms,  set: setNotifSms  },
          ].map(({ label, desc, val, set }, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3.5 ${i === 0 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div>
                <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
              </div>
              <Toggle val={val} set={set} />
            </div>
          ))}
        </div>

        {/* Types */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-2">Типы уведомлений</p>
          {[
            { icon: "Calendar",      label: "Записи и напоминания",  desc: "За 1 день и 1 час до визита",  val: notifBooking,  set: setNotifBooking  },
            { icon: "Sparkles",      label: "Баллы и бонусы",        desc: "Начисление и сгорание баллов", val: notifBonus,    set: setNotifBonus    },
            { icon: "Gift",          label: "Акции и предложения",   desc: "Персональные скидки",          val: notifPromo,    set: setNotifPromo    },
            { icon: "MessageCircle", label: "Сообщения мастеров",    desc: "Ответы в чате",                val: notifChat,     set: setNotifChat     },
            { icon: "Cake",          label: "День рождения",          desc: "+200 Б в ваш праздник",        val: notifBirthday, set: setNotifBirthday },
          ].map(({ icon, label, desc, val, set }, i, arr) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={14} className="text-[hsl(var(--primary))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
              </div>
              <Toggle val={val} set={set} />
            </div>
          ))}
        </div>

        <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-start gap-3">
          <Icon name="Info" size={14} className="text-[hsl(var(--primary))] shrink-0 mt-0.5" />
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">
            Напоминания о записи нельзя отключить полностью — это важная функция безопасности, чтобы вы не пропустили визит.
          </p>
        </div>
      </div>
    );
  }

  /* ── PRIVACY ── */
  if (sub === "privacy") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-base text-[hsl(var(--text-main))]">Политика конфиденциальности</h2>
        </div>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-4 shadow-sm space-y-4">
          {[
            ["1. Сбор информации", "Мы собираем имя, email, номер телефона и дату рождения для предоставления услуг записи и программы лояльности."],
            ["2. Использование данных", "Данные используются исключительно для оказания услуг, отправки уведомлений и улучшения качества сервиса. Мы не продаём данные третьим лицам."],
            ["3. Хранение", "Данные хранятся на защищённых серверах. Передача данных третьим лицам возможна только с вашего явного согласия."],
            ["4. Куки и аналитика", "Приложение использует анонимную аналитику для улучшения пользовательского опыта. Личные данные в аналитике не используются."],
            ["5. Ваши права", "Вы вправе запросить удаление, изменение или выгрузку всех ваших данных. Для этого напишите в поддержку или удалите аккаунт в настройках."],
          ].map(([title, text]) => (
            <div key={title as string}>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] mb-1">{title}</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{text}</p>
            </div>
          ))}
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] pt-2 border-t border-[hsl(var(--border))]">Последнее обновление: 1 января 2025 г.</p>
        </div>
      </div>
    );
  }

  /* ── AGREEMENT ── */
  if (sub === "agreement") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-base text-[hsl(var(--text-main))]">Пользовательское соглашение</h2>
        </div>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-4 shadow-sm space-y-4">
          {[
            ["1. Предмет соглашения", "Настоящее соглашение регулирует использование мобильного приложения салона красоты «Модерн», основанного 28 августа 1998 года."],
            ["2. Программа лояльности", "1 балл = 0,5 рубля. Баллы начисляются за услуги и покупки товаров. Срок действия баллов — 6 месяцев с момента начисления. Баллы не переводятся в наличные."],
            ["3. Запись и отмена", "Онлайн-запись доступна 24/7. Отмена возможна не позднее чем за 2 часа до визита. При более позднем отказе баллы за запись через приложение аннулируются."],
            ["4. Каталог товаров", "Товары из каталога можно забронировать для получения в салоне. Цены и наличие могут меняться. Бронирование действует 48 часов."],
            ["5. Ответственность", "Администрация оставляет за собой право изменять условия программы лояльности с уведомлением пользователей не менее чем за 7 дней."],
          ].map(([title, text]) => (
            <div key={title as string}>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] mb-1">{title}</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{text}</p>
            </div>
          ))}
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] pt-2 border-t border-[hsl(var(--border))]">Редакция от 1 января 2025 г.</p>
        </div>
      </div>
    );
  }

  /* ── MAIN SETTINGS ── */
  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-4 gap-3 animate-fade-in overflow-y-auto scrollbar-hide">

      <p className="font-golos font-bold text-lg text-[hsl(var(--text-main))] shrink-0">Настройки</p>

      {/* Account block */}
      <button onClick={() => setSub("account")}
        className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm w-full text-left">
        <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))] shrink-0">
          <img src={PROFILE_IMG} alt="Аккаунт" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] truncate">{name}</p>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Данные аккаунта и карта</p>
        </div>
        <Icon name="ChevronRight" size={18} className="text-[hsl(var(--text-secondary))] shrink-0" />
      </button>

      {/* Notifications */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
        <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Уведомления</p>
        <button onClick={() => setSub("notifications")}
          className="w-full px-4 py-3.5 flex items-center gap-3 text-left border-b border-[hsl(var(--border))]">
          <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
            <Icon name="Bell" size={15} className="text-[hsl(var(--primary))]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Уведомления и напоминания</p>
            <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Push, SMS, типы уведомлений</p>
          </div>
          <Icon name="ChevronRight" size={15} className="text-[hsl(var(--text-secondary))] shrink-0" />
        </button>
        {/* Quick toggles */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
              <Icon name="Smartphone" size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div>
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Push-уведомления</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Включены</p>
            </div>
          </div>
          <button onClick={() => setNotifPush(!notifPush)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifPush ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifPush ? "right-0.5" : "left-0.5"}`} />
          </button>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
              <Icon name="MessageSquare" size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div>
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">SMS-напоминания</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Отключены</p>
            </div>
          </div>
          <button onClick={() => setNotifSms(!notifSms)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifSms ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifSms ? "right-0.5" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
        <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Документы</p>
        {[
          { icon: "Lock",     label: "Политика конфиденциальности", desc: "Как мы храним ваши данные",       action: () => setSub("privacy")   },
          { icon: "FileText", label: "Пользовательское соглашение",  desc: "Условия использования сервиса",  action: () => setSub("agreement") },
          { icon: "Shield",   label: "Согласие на обработку данных", desc: "Ваши права и наши обязательства", action: () => {}                  },
        ].map(({ icon, label, desc, action }, i, arr) => (
          <button key={i} onClick={action}
            className={`w-full px-4 py-3.5 flex items-center gap-3 text-left ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
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

      {/* App */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
        <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Приложение</p>
        {[
          { icon: "Star",          label: "Оценить приложение",      desc: "App Store / Google Play",        action: () => {} },
          { icon: "MessageSquare", label: "Написать в поддержку",    desc: "support@modern-salon.ru",        action: () => onNavigate("chat") },
          { icon: "Info",          label: "О приложении",            desc: "Версия 1.0.0 · Салон «Модерн»",  action: () => {} },
        ].map(({ icon, label, desc, action }, i, arr) => (
          <button key={i} onClick={action}
            className={`w-full px-4 py-3.5 flex items-center gap-3 text-left ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
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

      {/* Logout */}
      <button className="w-full py-3.5 border border-red-100 bg-red-50 rounded-2xl font-golos font-medium text-red-500 text-sm flex items-center justify-center gap-2">
        <Icon name="LogOut" size={15} />
        Выйти из аккаунта
      </button>

      <button className="font-golos text-xs text-[hsl(var(--text-secondary))] text-center pb-2">
        Удалить аккаунт и все данные
      </button>
    </div>
  );
}