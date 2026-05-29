import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface SalonScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SALON_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/b1d4ff4b-73d5-4053-83b1-50046ba5374d.jpg";
const QR_APP    = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=1a1108&bgcolor=fff8f0&data=https://modern-beauty-salon-app--preview.poehali.dev/&qzone=2";
const QR_INVITE = "https://api.qrserver.com/v1/create-qr-code/?size=140x140&color=1a1108&bgcolor=f0ede8&data=https://modern-beauty-salon-app--preview.poehali.dev/invite/00142&qzone=1";

const socials = [
  { icon: "Instagram",    label: "Instagram", handle: "@modern_gorodets",  bg: "bg-pink-50",  fg: "text-pink-500",  url: "https://instagram.com" },
  { icon: "Send",         label: "ВКонтакте", handle: "vk.com/modern",     bg: "bg-blue-50",  fg: "text-blue-500",  url: "https://vk.com"       },
  { icon: "MessageCircle", label: "Telegram", handle: "@modern_gorodets",  bg: "bg-sky-50",   fg: "text-sky-500",   url: "https://t.me"         },
  { icon: "Youtube",      label: "YouTube",   handle: "Канал «Модерн»",    bg: "bg-red-50",   fg: "text-red-500",   url: "https://youtube.com"  },
];

const services = [
  { icon: "Scissors",  label: "Стрижки" },
  { icon: "Palette",   label: "Окрашивание" },
  { icon: "Sparkles",  label: "Уход за волосами" },
  { icon: "Hand",      label: "Маникюр" },
  { icon: "Eye",       label: "Брови" },
  { icon: "Wand2",     label: "Укладки" },
];

type Tab = "contacts" | "qr" | "about";

export default function SalonScreen({ onNavigate }: SalonScreenProps) {
  const [tab, setTab] = useState<Tab>("contacts");

  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-3 animate-fade-in">

      {/* Hero — compact */}
      <div className="relative h-36 rounded-3xl overflow-hidden shrink-0 animate-fade-in-up">
        <img src={SALON_IMG} alt="Салон Модерн" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <p className="font-golos font-bold text-xl text-white leading-none">Модерн</p>
          <p className="font-golos text-white/80 text-xs">семейный салон красоты · Городец</p>
        </div>
        <button
          onClick={() => onNavigate("booking")}
          className="absolute bottom-3 right-3 gradient-orange text-white font-golos font-bold text-xs px-3 py-1.5 rounded-xl orange-glow"
        >
          Записаться
        </button>
      </div>

      {/* Tab switcher */}
      <div className="flex bg-white rounded-2xl p-1 gap-1 border border-[hsl(var(--border))] shadow-sm shrink-0">
        {([["contacts","Контакты"], ["qr","QR-коды"], ["about","О нас"]] as [Tab,string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 py-2 rounded-xl font-golos text-xs font-semibold transition-all ${
              tab === key ? "gradient-orange text-white shadow-sm" : "text-[hsl(var(--text-secondary))]"
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB: CONTACTS ── */}
      {tab === "contacts" && (
        <div className="flex flex-col gap-2 animate-fade-in">
          {[
            { icon: "MapPin", title: "Адрес", text: "Нижегородская обл., г. Городец\nПролетарская площадь, 2", btn: "Маршрут", href: "https://yandex.ru/maps/?text=Городец+Пролетарская+площадь+2", btnColor: "gradient-orange text-white orange-glow" },
            { icon: "Phone",  title: "Телефон", text: "+7 (831) 000-00-00", btn: "Позвонить", href: "tel:+78310000000", btnColor: "gradient-orange text-white orange-glow" },
            { icon: "Clock",  title: "Режим работы", text: "Пн–Сб 9:00–21:00\nВс 10:00–18:00", btn: null, href: null, btnColor: "" },
          ].map(({ icon, title, text, btn, href, btnColor }) => (
            <div key={title} className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{title}</p>
                <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] whitespace-pre-line leading-snug">{text}</p>
              </div>
              {btn && href && (
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className={`${btnColor} font-golos font-bold text-xs px-3 py-2 rounded-xl shrink-0`}>
                  {btn}
                </a>
              )}
            </div>
          ))}

          {/* Chat */}
          <button onClick={() => onNavigate("chat")}
            className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/20 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center shrink-0">
              <Icon name="MessageCircle" size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">Чат с администратором</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Ответим на любые вопросы</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-[hsl(var(--primary))] shrink-0" />
          </button>

          {/* Socials compact */}
          <div className="grid grid-cols-4 gap-2">
            {socials.map(({ icon, label, bg, fg, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                className={`${bg} rounded-2xl p-3 flex flex-col items-center gap-1`}>
                <Icon name={icon} size={18} className={fg} />
                <span className="font-golos text-[9px] font-semibold text-[hsl(var(--text-main))]">{label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: QR ── */}
      {tab === "qr" && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {/* QR салона */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 shadow-sm flex gap-4 items-center">
            <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-2 shrink-0">
              <img src={QR_APP} alt="QR салона" className="w-28 h-28" />
            </div>
            <div className="flex-1">
              <div className="gradient-orange rounded-xl px-3 py-2 mb-2">
                <p className="font-golos font-bold text-white text-sm">Покажите на кассе</p>
                <p className="font-golos text-white/80 text-[10px]">+20 Б к каждому визиту</p>
              </div>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">
                QR-код приложения для быстрой идентификации в салоне
              </p>
            </div>
          </div>

          {/* Invite QR */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 shadow-sm flex gap-4 items-center">
            <div className="bg-[hsl(var(--gray-soft))] rounded-2xl p-2 shrink-0">
              <img src={QR_INVITE} alt="Пригласить" className="w-24 h-24" />
            </div>
            <div className="flex-1">
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">Реферальный QR</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-1 leading-relaxed">
                Поделитесь с другом — вы получите{" "}
                <span className="font-bold text-[hsl(var(--primary))]">+200 Б</span>, друг —{" "}
                <span className="font-bold text-[hsl(var(--primary))]">+150 Б</span>
              </p>
              <button className="mt-2 flex items-center gap-1 font-golos text-xs font-bold text-[hsl(var(--primary))]">
                <Icon name="Share2" size={13} />
                Поделиться ссылкой
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ABOUT ── */}
      {tab === "about" && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[["6+", "лет работы"], ["4", "мастера"], ["2000+", "клиентов"]].map(([num, label]) => (
              <div key={label} className="bg-white border border-[hsl(var(--border))] rounded-2xl p-3 text-center shadow-sm">
                <p className="font-golos font-bold text-2xl text-[hsl(var(--primary))]">{num}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* About text */}
          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm">
            <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
              Салон «Модерн» — семейный салон красоты в центре Городца. Работаем с 2018 года. Мастера регулярно проходят обучение, используем Olaplex, Kerastase, Redken, Schwarzkopf.
            </p>
          </div>

          {/* Services grid */}
          <div>
            <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] mb-2">Услуги</p>
            <div className="grid grid-cols-3 gap-2">
              {services.map(({ icon, label }) => (
                <button key={label} onClick={() => onNavigate("booking")}
                  className="bg-white border border-[hsl(var(--border))] rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-sm">
                  <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center">
                    <Icon name={icon} size={15} className="text-[hsl(var(--primary))]" />
                  </div>
                  <span className="font-golos text-[10px] font-semibold text-[hsl(var(--text-main))] text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => onNavigate("booking")}
            className="w-full py-3.5 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow flex items-center justify-center gap-2">
            <Icon name="CalendarPlus" size={17} />
            Записаться онлайн
          </button>
        </div>
      )}
    </div>
  );
}
