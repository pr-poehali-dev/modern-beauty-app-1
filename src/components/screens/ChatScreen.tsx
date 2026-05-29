import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
}

const M1 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";
const M2 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";
const M3 = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/ebd24705-5d23-4a30-b95a-a058766b8e3f.jpg";
const SALON_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/fab8dc1d-5f2d-41f2-bb61-e473dcfdb243.jpg";

type Message = {
  id: number;
  from: "master" | "me";
  name?: string;
  text: string;
  time: string;
  avatar?: string;
  photo?: string;
  isNotification?: boolean;
};

type Dialog = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
};

const dialogs: Dialog[] = [
  {
    id: 1, name: "Анастасия Романова", role: "Колорист, стилист",
    avatar: M1, online: true, lastMessage: "Маску Olaplex нужно наносить после шампуня 😊",
    lastTime: "14:06", unread: 0,
    messages: [
      { id: 1, from: "master", name: "Анастасия", text: "Добрый день, Анна! 👋 Чем могу помочь?", time: "14:02", avatar: M1 },
      { id: 2, from: "me", text: "Добрый день! Мне нужна маска до или после шампуня?", time: "14:05" },
      { id: 3, from: "master", name: "Анастасия", text: "Маску Olaplex нужно наносить после шампуня на влажные волосы, оставить на 10 минут и смыть 😊", time: "14:06", avatar: M1 },
    ],
  },
  {
    id: 2, name: "Мария Смирнова", role: "Мастер по стрижкам",
    avatar: M2, online: false, lastMessage: "Маша выглядела замечательно после стрижки!",
    lastTime: "Вчера", unread: 2,
    messages: [
      { id: 1, from: "master", name: "Мария", text: "Добрый день! Маша выглядела замечательно после стрижки 💛 Буду рада видеть вас снова!", time: "11:30", avatar: M2 },
      { id: 2, from: "master", name: "Мария", text: "Кстати, скоро привезут новую коллекцию детских аксессуаров для волос — расскажу подробнее на следующем визите 🎀", time: "11:31", avatar: M2 },
    ],
  },
  {
    id: 3, name: "Елена Козлова", role: "Мастер маникюра и бровей",
    avatar: M3, online: false, lastMessage: "Для поддержания маникюра рекомендую масло для кутикулы",
    lastTime: "2 дня назад", unread: 0,
    messages: [
      { id: 1, from: "master", name: "Елена", text: "Для поддержания маникюра рекомендую масло для кутикулы Orly. Используйте каждый вечер перед сном 💅", time: "16:00", avatar: M3 },
      { id: 2, from: "master", name: "Елена", text: "", time: "16:01", avatar: M3, photo: M3 },
    ],
  },
  {
    id: 0, name: "Администратор «Модерн»", role: "Запись, вопросы, оплата",
    avatar: SALON_IMG, online: true, lastMessage: "✅ Ваша запись подтверждена! 5 июня 14:30",
    lastTime: "10:00", unread: 1,
    messages: [
      { id: 1, from: "master", name: "Модерн", text: "✅ Ваша запись подтверждена!\n\nСтрижка + укладка\n📅 5 июня, 14:30\n👩‍🎨 Анастасия Романова\n📍 ул. Ленина, 45", time: "10:00", avatar: SALON_IMG, isNotification: true },
    ],
  },
];

const quickActions = [
  { icon: "CalendarClock", label: "Перенести запись",   text: "Хочу перенести мою запись на другое время" },
  { icon: "RussianRuble",  label: "Уточнить цену",      text: "Сколько стоит " },
  { icon: "MessageSquare", label: "Вопрос мастеру",     text: "Хочу задать вопрос мастеру: " },
  { icon: "Package",       label: "Узнать о товаре",    text: "Расскажите подробнее о товаре " },
  { icon: "Clock",         label: "Свободные окна",     text: "Какие есть свободные окна на этой неделе?" },
  { icon: "Star",          label: "Узнать о бонусах",   text: "Расскажите об акциях и бонусах" },
];

export default function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [activeDialog, setActiveDialog] = useState<Dialog | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showQuick, setShowQuick] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDialog) setMessages([...activeDialog.messages]);
  }, [activeDialog]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const newMsg: Message = {
      id: Date.now(), from: "me", text: msg,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setShowQuick(false);
    setTimeout(() => {
      if (!activeDialog) return;
      setMessages(prev => [...prev, {
        id: Date.now() + 1, from: "master",
        name: activeDialog.name.split(" ")[0],
        text: "Принято! Отвечу в ближайшее время 😊",
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
        avatar: activeDialog.avatar,
      }]);
    }, 900);
  };

  /* ── DIALOG LIST ── */
  if (!activeDialog) {
    const totalUnread = dialogs.reduce((s, d) => s + d.unread, 0);
    return (
      <div className="px-5 pt-2 pb-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">Сообщения</h2>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Чат с мастерами и администратором</p>
          </div>
          {totalUnread > 0 && (
            <span className="gradient-orange text-white text-xs font-bold px-3 py-1 rounded-xl">
              {totalUnread} новых
            </span>
          )}
        </div>

        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--text-secondary))]" />
          <input type="text" placeholder="Поиск по мастерам..." className="w-full pl-10 pr-4 py-3 bg-[hsl(var(--gray-soft))] rounded-xl font-golos text-sm focus:outline-none" />
        </div>

        {/* Push-уведомления */}
        <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/20 rounded-2xl p-3.5 mb-4">
          <p className="font-golos text-xs font-semibold text-[hsl(var(--primary))] mb-2 flex items-center gap-1.5">
            <Icon name="Bell" size={13} /> Push-уведомления включены
          </p>
          <div className="space-y-1">
            {[
              "⏰ Напоминание за 1 день и за 1 час до записи",
              "✨ Начисление и сгорание баллов",
              "🎁 Акции и персональные предложения",
            ].map(t => (
              <p key={t} className="font-golos text-xs text-[hsl(var(--text-secondary))]">{t}</p>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {/* Сортируем: сначала с непрочитанными */}
          {[...dialogs].sort((a, b) => b.unread - a.unread).map((dialog) => (
            <button key={dialog.id} onClick={() => setActiveDialog(dialog)}
              className="w-full bg-white border border-[hsl(var(--border))] rounded-2xl p-4 flex items-center gap-3 card-shadow text-left transition-all active:scale-98">
              <div className="relative shrink-0">
                <img src={dialog.avatar} alt={dialog.name} className="w-14 h-14 rounded-2xl object-cover" />
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${dialog.online ? "bg-green-400" : "bg-gray-300"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-0.5">
                  <p className={`font-golos font-semibold text-sm ${dialog.unread > 0 ? "text-[hsl(var(--text-main))]" : "text-[hsl(var(--text-main))]"}`}>{dialog.name}</p>
                  <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] shrink-0 ml-2">{dialog.lastTime}</span>
                </div>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mb-0.5">{dialog.role}</p>
                <p className={`font-golos text-xs truncate ${dialog.unread > 0 ? "font-medium text-[hsl(var(--text-main))]" : "text-[hsl(var(--text-secondary))]"}`}>{dialog.lastMessage}</p>
              </div>
              {dialog.unread > 0 && (
                <span className="w-5 h-5 gradient-orange rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0">{dialog.unread}</span>
              )}
            </button>
          ))}
        </div>

        <button onClick={() => onNavigate("masters")} className="w-full mt-4 py-3.5 border-2 border-dashed border-[hsl(var(--border))] rounded-2xl flex items-center justify-center gap-2 font-golos text-sm text-[hsl(var(--text-secondary))]">
          <Icon name="Plus" size={16} />
          Написать другому мастеру
        </button>
      </div>
    );
  }

  /* ── CHAT VIEW ── */
  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-fade-in">
      {/* Header */}
      <div className="px-5 pb-3 border-b border-[hsl(var(--border))]">
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveDialog(null)} className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
            <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <div className="relative">
            <img src={activeDialog.avatar} alt={activeDialog.name} className="w-10 h-10 rounded-xl object-cover" />
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${activeDialog.online ? "bg-green-400" : "bg-gray-300"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-golos font-semibold text-[hsl(var(--text-main))] text-sm">{activeDialog.name}</p>
            <p className={`font-golos text-xs ${activeDialog.online ? "text-green-500" : "text-[hsl(var(--text-secondary))]"}`}>
              {activeDialog.online ? "В сети" : "Не в сети"}
            </p>
          </div>
          <button onClick={() => onNavigate("masters")} className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
            <Icon name="Info" size={15} className="text-[hsl(var(--text-secondary))]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-3 space-y-3">
        <div className="text-center">
          <span className="font-golos text-xs text-[hsl(var(--text-secondary))] bg-[hsl(var(--gray-soft))] px-3 py-1 rounded-full">Сегодня</span>
        </div>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.from === "me" ? "flex-row-reverse" : ""} animate-fade-in-up`}>
            {msg.from === "master" && (
              <img src={msg.avatar} alt="Мастер" className="w-8 h-8 rounded-xl object-cover shrink-0 self-end" />
            )}
            <div className={`max-w-[78%] flex flex-col gap-1 ${msg.from === "me" ? "items-end" : "items-start"}`}>
              {msg.from === "master" && (
                <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] ml-1">{msg.name}</span>
              )}
              {/* notification bubble */}
              {msg.isNotification ? (
                <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/20 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                  <p className="font-golos text-sm text-[hsl(var(--text-main))] whitespace-pre-line leading-relaxed">{msg.text}</p>
                </div>
              ) : msg.photo && !msg.text ? (
                <div className="rounded-2xl overflow-hidden w-40 h-40">
                  <img src={msg.photo} alt="Фото" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className={`px-4 py-2.5 rounded-2xl ${msg.from === "me" ? "gradient-orange text-white rounded-br-sm" : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] rounded-bl-sm"}`}>
                  <p className="font-golos text-sm leading-relaxed">{msg.text}</p>
                </div>
              )}
              <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick actions panel */}
      {showQuick && (
        <div className="px-4 pb-2 border-t border-[hsl(var(--border))] bg-[hsl(var(--gray-soft))]">
          <div className="pt-2 grid grid-cols-2 gap-2">
            {quickActions.map((qa) => (
              <button key={qa.label} onClick={() => { setInput(qa.text); setShowQuick(false); }}
                className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 text-left card-shadow">
                <div className="w-7 h-7 bg-[hsl(var(--orange-light))] rounded-lg flex items-center justify-center shrink-0">
                  <Icon name={qa.icon} size={14} className="text-[hsl(var(--primary))]" />
                </div>
                <span className="font-golos text-xs text-[hsl(var(--text-main))] font-medium leading-tight">{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-5 pb-4 pt-2 border-t border-[hsl(var(--border))]">
        <div className="flex items-center gap-2">
          {/* Quick actions toggle */}
          <button onClick={() => setShowQuick(v => !v)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${showQuick ? "gradient-orange" : "bg-[hsl(var(--gray-soft))]"}`}>
            <Icon name={showQuick ? "X" : "Zap"} size={18} className={showQuick ? "text-white" : "text-[hsl(var(--text-secondary))]"} />
          </button>
          {/* Photo attach */}
          <button className="w-10 h-10 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
            <Icon name="Paperclip" size={18} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <div className="flex-1 flex items-center bg-[hsl(var(--gray-soft))] rounded-2xl px-4 py-2.5 gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Написать сообщение..."
              className="flex-1 bg-transparent font-golos text-sm text-[hsl(var(--text-main))] outline-none placeholder:text-[hsl(var(--text-secondary))]" />
          </div>
          <button onClick={() => sendMessage()} disabled={!input.trim()}
            className="w-11 h-11 gradient-orange rounded-2xl flex items-center justify-center orange-glow disabled:opacity-50 transition-all active:scale-95 shrink-0">
            <Icon name="Send" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
