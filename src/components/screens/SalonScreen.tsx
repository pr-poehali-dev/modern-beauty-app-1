import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface SalonScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SALON_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/b1d4ff4b-73d5-4053-83b1-50046ba5374d.jpg";

// QR-код на приложение (ссылка на текущий сайт)
const QR_URL = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=1a1a1a&bgcolor=f7f5f2&data=https://modern-beauty-salon-app--preview.poehali.dev/&qzone=2";

const socials = [
  { icon: "Instagram", label: "Instagram", handle: "@modern_gorodets", color: "bg-pink-50", iconColor: "text-pink-500", url: "https://instagram.com" },
  { icon: "Send",      label: "ВКонтакте", handle: "vk.com/modern_salon", color: "bg-blue-50", iconColor: "text-blue-500", url: "https://vk.com" },
  { icon: "MessageCircle", label: "Telegram", handle: "@modern_gorodets", color: "bg-sky-50", iconColor: "text-sky-500", url: "https://t.me" },
  { icon: "Youtube",   label: "YouTube",   handle: "Канал «Модерн»", color: "bg-red-50", iconColor: "text-red-500", url: "https://youtube.com" },
];

const services = [
  { icon: "Scissors",   label: "Стрижки женские / мужские / детские" },
  { icon: "Palette",    label: "Окрашивание: балаяж, омбре, шатуш" },
  { icon: "Sparkles",   label: "Уход за волосами, маски, кератин" },
  { icon: "Hand",       label: "Маникюр и педикюр" },
  { icon: "Eye",        label: "Брови и ресницы" },
  { icon: "Wand2",      label: "Укладки и праздничные причёски" },
];

export default function SalonScreen({ onNavigate }: SalonScreenProps) {
  return (
    <div className="pb-4 animate-fade-in">

      {/* Hero */}
      <div className="relative h-56 overflow-hidden mx-4 mt-2 rounded-3xl animate-fade-in-up">
        <img src={SALON_IMG} alt="Салон Модерн" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <h2 className="font-golos font-bold text-2xl text-white">Модерн</h2>
          <p className="font-golos text-white/80 text-sm">семейный салон красоты</p>
        </div>
      </div>

      {/* Контакты и адрес */}
      <div className="mx-4 mt-4 bg-[hsl(var(--card))] rounded-3xl p-5 card-shadow animate-fade-in-up delay-100">
        <p className="font-golos font-bold text-lg text-[hsl(var(--text-main))] mb-4">Контакты и адрес</p>

        {/* Адрес */}
        <div className="flex items-center gap-4 bg-white rounded-2xl p-4 mb-3">
          <div className="w-11 h-11 gradient-orange rounded-2xl flex items-center justify-center shrink-0 orange-glow">
            <Icon name="MapPin" size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Адрес</p>
            <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] mt-0.5">
              Нижегородская обл., г. Городец<br />
              Пролетарская площадь, 2
            </p>
          </div>
          <a
            href="https://yandex.ru/maps/?text=Городец+Пролетарская+площадь+2"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-orange text-white font-golos font-semibold text-sm px-4 py-2 rounded-xl orange-glow shrink-0"
          >
            Маршрут
          </a>
        </div>

        {/* Телефон */}
        <div className="flex items-center gap-4 bg-white rounded-2xl p-4 mb-3">
          <div className="w-11 h-11 gradient-orange rounded-2xl flex items-center justify-center shrink-0 orange-glow">
            <Icon name="Phone" size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Телефон</p>
            <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] mt-0.5">+7 (831) 000-00-00</p>
          </div>
          <a
            href="tel:+78310000000"
            className="gradient-orange text-white font-golos font-semibold text-sm px-4 py-2 rounded-xl orange-glow shrink-0"
          >
            Позвонить
          </a>
        </div>

        {/* Режим работы */}
        <div className="flex items-center gap-4 bg-white rounded-2xl p-4 mb-3">
          <div className="w-11 h-11 gradient-orange rounded-2xl flex items-center justify-center shrink-0 orange-glow">
            <Icon name="Clock" size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Режим работы</p>
            <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] mt-0.5">Пн–Сб 9:00–21:00</p>
            <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Вс 10:00–18:00</p>
          </div>
        </div>

        {/* Чат */}
        <button
          onClick={() => onNavigate("chat")}
          className="flex items-center gap-4 bg-[hsl(var(--orange-light))] rounded-2xl p-4 w-full text-left"
        >
          <div className="w-11 h-11 gradient-orange rounded-2xl flex items-center justify-center shrink-0 orange-glow">
            <Icon name="MessageCircle" size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">Чат с салоном</p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">Напишите администратору — ответим на ваши вопросы</p>
          </div>
          <Icon name="ChevronRight" size={18} className="text-[hsl(var(--primary))] shrink-0" />
        </button>
      </div>

      {/* QR-код */}
      <div className="mx-4 mt-4 bg-[hsl(var(--card))] rounded-3xl p-5 card-shadow animate-fade-in-up delay-200">
        <p className="font-golos font-bold text-lg text-[hsl(var(--text-main))] mb-1">QR-код салона</p>
        <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mb-4">Покажите на кассе для получения бонусов или поделитесь с друзьями</p>

        <div className="flex items-start gap-4">
          {/* QR */}
          <div className="bg-white rounded-2xl p-3 border border-[hsl(var(--border))] shrink-0">
            <img
              src={QR_URL}
              alt="QR-код приложения"
              className="w-28 h-28"
            />
          </div>

          <div className="flex-1 space-y-3">
            {/* Бонус за QR */}
            <div className="gradient-orange rounded-2xl p-3 orange-glow">
              <p className="font-golos font-bold text-white text-sm">Покажите QR на кассе</p>
              <p className="font-golos text-white/80 text-xs mt-0.5">+20 баллов к каждому визиту за запись через приложение</p>
            </div>

            {/* Поделиться */}
            <div className="bg-white rounded-2xl p-3 border border-[hsl(var(--border))]">
              <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Реферальная программа</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">Пригласи друга — получи +200 баллов</p>
              <button className="mt-2 font-golos text-xs font-bold text-[hsl(var(--primary))] flex items-center gap-1">
                <Icon name="Share2" size={12} />
                Поделиться
              </button>
            </div>
          </div>
        </div>

        {/* Личный QR клиента */}
        <div className="mt-4 bg-white rounded-2xl p-4 border border-[hsl(var(--border))]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-lg flex items-center justify-center">
              <Icon name="User" size={16} className="text-[hsl(var(--primary))]" />
            </div>
            <div>
              <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">Ваш персональный QR</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Анна Петрова · ID: 00142</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[hsl(var(--gray-soft))] rounded-xl p-2">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&color=1a1a1a&bgcolor=f0ede8&data=client:00142&qzone=2"
                alt="Мой QR"
                className="w-20 h-20"
              />
            </div>
            <div>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">
                Покажите этот QR мастеру при записи или оплате для автоматического начисления баллов
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="w-1.5 h-1.5 bg-[hsl(var(--primary))] rounded-full" />
                <span className="font-golos text-xs font-semibold text-[hsl(var(--primary))]">⭐ Постоянный гость · 1 240 Б</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Социальные сети */}
      <div className="mx-4 mt-4 bg-[hsl(var(--card))] rounded-3xl p-5 card-shadow animate-fade-in-up delay-300">
        <p className="font-golos font-bold text-lg text-[hsl(var(--text-main))] mb-4">Мы в соцсетях</p>
        <div className="grid grid-cols-2 gap-2">
          {socials.map(({ icon, label, handle, color, iconColor, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${color} rounded-2xl p-3.5 flex items-center gap-3`}
            >
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={18} className={iconColor} />
              </div>
              <div className="min-w-0">
                <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] truncate">{handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Услуги */}
      <div className="mx-4 mt-4 bg-[hsl(var(--card))] rounded-3xl p-5 card-shadow animate-fade-in-up delay-300">
        <p className="font-golos font-bold text-lg text-[hsl(var(--text-main))] mb-4">Наши услуги</p>
        <div className="space-y-2">
          {services.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => onNavigate("booking")}
              className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3 text-left"
            >
              <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={15} className="text-[hsl(var(--primary))]" />
              </div>
              <span className="font-golos text-sm text-[hsl(var(--text-main))] flex-1">{label}</span>
              <Icon name="ChevronRight" size={15} className="text-[hsl(var(--text-secondary))] shrink-0" />
            </button>
          ))}
        </div>
        <button
          onClick={() => onNavigate("booking")}
          className="w-full mt-4 py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
        >
          Записаться онлайн
        </button>
      </div>

      {/* О нас */}
      <div className="mx-4 mt-4 mb-2 bg-[hsl(var(--card))] rounded-3xl p-5 card-shadow animate-fade-in-up delay-400">
        <p className="font-golos font-bold text-lg text-[hsl(var(--text-main))] mb-3">О нас</p>
        <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
          Салон «Модерн» — это семейный салон красоты в самом сердце Городца. Мы работаем с 2018 года и принимаем клиентов всех возрастов: от детей до взрослых.
        </p>
        <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed mt-3">
          Наши мастера регулярно проходят обучение, участвуют в профессиональных конкурсах и используют только проверенные профессиональные марки: Olaplex, Kerastase, Redken, Schwarzkopf.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { num: "6+", label: "лет работы" },
            { num: "4", label: "мастера" },
            { num: "2000+", label: "клиентов" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-white rounded-2xl p-3 text-center">
              <p className="font-golos font-bold text-xl text-[hsl(var(--primary))]">{num}</p>
              <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
