import { useState, useRef, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
}

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
    id: 0, name: "Администратор «Модерн»", role: "Запись, вопросы, оплата",
    avatar: SALON_IMG, online: true, lastMessage: "✅ Ваша запись подтверждена! 29 июня 14:30",
    lastTime: "10:00", unread: 1,
    messages: [
      { id: 1, from: "master", name: "Модерн", text: "✅ Ваша запись подтверждена!\n\nСтрижка + укладка\n📅 29 июня, 14:30\n👩‍🎨 Анастасия Романова\n📍 г. Городец, Пролетарская площадь, 2", time: "10:00", avatar: SALON_IMG, isNotification: true },
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

type Tab = "messages" | "notifications";

const notifications = [
  { id: 1, icon: "CalendarCheck", color: "bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))]", title: "Запись подтверждена", text: "Стрижка + укладка · 29 июня, 14:30 · Анастасия", time: "10:00", date: "Сегодня", unread: true },
  { id: 2, icon: "Sparkles",      color: "bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))]", title: "Начислено 170 баллов", text: "За балаяж + стрижку от 12 мая · Баланс: 1 240 Б", time: "12 мая", date: "12 мая", unread: true },
  { id: 3, icon: "AlertTriangle", color: "bg-yellow-50 text-yellow-500",                             title: "Баллы сгорают!", text: "320 баллов сгорят 15 июля — успейте использовать", time: "9:00", date: "Вчера", unread: false },
  { id: 4, icon: "Calendar",      color: "bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))]", title: "Напоминание о записи", text: "Завтра в 14:30 — Стрижка + укладка у Анастасии", time: "19:00", date: "Вчера", unread: false },
  { id: 5, icon: "Percent",       color: "bg-green-50 text-green-500",                               title: "Акция: Маникюр + педикюр", text: "−15% если записаться в один день · до 15 июля", time: "11:00", date: "26 июня", unread: false },
  { id: 6, icon: "Gift",          color: "bg-purple-50 text-purple-500",                             title: "Семейный бонус", text: "Михаил записан — начислено +50 Б за запись через приложение", time: "15:30", date: "24 июня", unread: false },
];

export default function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [tab, setTab] = useState<Tab>("messages");
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
    const notifUnread = notifications.filter(n => n.unread).length;
    return (
      <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-2.5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Сообщения</h2>
          {(totalUnread + notifUnread) > 0 && (
            <span className="gradient-orange text-white text-xs font-bold px-3 py-1 rounded-xl">{totalUnread + notifUnread} новых</span>
          )}
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1 gap-1 border border-[hsl(var(--border))] shadow-sm shrink-0">
          {([["messages", "Чат", totalUnread], ["notifications", "Уведомления", notifUnread]] as [Tab, string, number][]).map(([key, label, cnt]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex-1 py-2 rounded-xl font-golos text-xs font-semibold transition-all flex items-center justify-center gap-1 ${tab === key ? "gradient-orange text-white shadow-sm" : "text-[hsl(var(--text-secondary))]"}`}>
              {label}
              {cnt > 0 && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tab === key ? "bg-white/30 text-white" : "bg-[hsl(var(--primary))] text-white"}`}>{cnt}</span>}
            </button>
          ))}
        </div>

        {/* ── MESSAGES TAB ── */}
        {tab === "messages" && (
          <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 space-y-2">
            {[...dialogs].sort((a, b) => b.unread - a.unread).map((dialog) => (
              <button key={dialog.id} onClick={() => setActiveDialog(dialog)}
                className="w-full bg-white border border-[hsl(var(--border))] rounded-2xl p-3 flex items-center gap-3 shadow-sm text-left transition-all active:scale-98">
                <div className="relative shrink-0">
                  <img src={dialog.avatar} alt={dialog.name} className="w-12 h-12 rounded-2xl object-cover" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${dialog.online ? "bg-green-400" : "bg-gray-300"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] truncate flex-1 pr-2">{dialog.name}</p>
                    <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] shrink-0">{dialog.lastTime}</span>
                  </div>
                  <p className={`font-golos text-xs truncate ${dialog.unread > 0 ? "font-medium text-[hsl(var(--text-main))]" : "text-[hsl(var(--text-secondary))]"}`}>{dialog.lastMessage}</p>
                </div>
                {dialog.unread > 0 && (
                  <span className="w-5 h-5 gradient-orange rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0">{dialog.unread}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── NOTIFICATIONS TAB ── */}
        {tab === "notifications" && (
          <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 space-y-2">
            {(() => {
              let lastDate = "";
              return notifications.map((n) => (
                <div key={n.id}>
                  {n.date !== lastDate && (() => { lastDate = n.date; return (
                    <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] font-semibold uppercase tracking-wider px-1 pt-1 pb-0.5">{n.date}</p>
                  ); })()}
                  <div className={`bg-white border rounded-2xl p-3.5 flex items-start gap-3 shadow-sm ${n.unread ? "border-[hsl(var(--primary))]/30" : "border-[hsl(var(--border))]"}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color.split(" ")[0]}`}>
                      <Icon name={n.icon} size={16} className={n.color.split(" ")[1]} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`font-golos font-semibold text-sm text-[hsl(var(--text-main))] truncate flex-1 pr-2 ${n.unread ? "font-bold" : ""}`}>{n.title}</p>
                        <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] shrink-0">{n.time}</span>
                      </div>
                      <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">{n.text}</p>
                    </div>
                    {n.unread && <span className="w-2 h-2 gradient-orange rounded-full shrink-0 mt-1" />}
                  </div>
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    );
  }

  /* ── CHAT VIEW ── */
  return (
    <div className="flex flex-col h-full animate-fade-in">
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