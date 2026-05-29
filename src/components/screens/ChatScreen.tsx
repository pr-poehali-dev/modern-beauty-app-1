import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MASTER_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/071bff46-8350-48ce-b930-d2203794d5d2.jpg";

type Message = {
  id: number;
  from: "master" | "me";
  name?: string;
  text: string;
  time: string;
  avatar?: string;
};

const initialMessages: Message[] = [
  { id: 1, from: "master", name: "Анастасия", text: "Добрый день, Анна! Чем могу помочь?", time: "14:02", avatar: MASTER_IMG },
  { id: 2, from: "me", text: "Добрый день! Хочу уточнить — мне нужна маска до или после шампуня?", time: "14:05" },
  { id: 3, from: "master", name: "Анастасия", text: "Маску Olaplex нужно наносить после шампуня на влажные волосы, оставить на 10 минут и смыть 😊 Если есть ещё вопросы — пишите!", time: "14:06", avatar: MASTER_IMG },
];

const quickReplies = ["Записаться", "Узнать о скидках", "Спросить мастера", "Проверить запись"];

export default function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const newMsg: Message = {
      id: Date.now(),
      from: "me",
      text: msg,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: "master",
        name: "Анастасия",
        text: "Спасибо за вопрос! Я отвечу вам в ближайшее время 😊",
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
        avatar: MASTER_IMG,
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-fade-in">
      {/* Chat header */}
      <div className="px-5 pb-3 border-b border-[hsl(var(--border))]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={MASTER_IMG} alt="Мастер" className="w-10 h-10 rounded-xl object-cover" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <p className="font-golos font-semibold text-[hsl(var(--text-main))] text-sm">Анастасия Романова</p>
            <p className="font-golos text-xs text-green-500">В сети</p>
          </div>
          <button
            onClick={() => onNavigate("masters")}
            className="ml-auto w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center"
          >
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
            <div className={`max-w-[75%] ${msg.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              {msg.from === "master" && (
                <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] ml-1">{msg.name}</span>
              )}
              <div className={`px-4 py-2.5 rounded-2xl ${
                msg.from === "me"
                  ? "gradient-orange text-white rounded-br-sm"
                  : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-main))] rounded-bl-sm"
              }`}>
                <p className="font-golos text-sm leading-relaxed">{msg.text}</p>
              </div>
              <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="px-5 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {quickReplies.map((reply) => (
          <button
            key={reply}
            onClick={() => sendMessage(reply)}
            className="shrink-0 px-3 py-1.5 border border-[hsl(var(--primary))]/30 rounded-xl font-golos text-xs font-medium text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] whitespace-nowrap"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-5 pb-4 pt-2 border-t border-[hsl(var(--border))]">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-[hsl(var(--gray-soft))] rounded-2xl px-4 py-2.5 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Написать сообщение..."
              className="flex-1 bg-transparent font-golos text-sm text-[hsl(var(--text-main))] outline-none placeholder:text-[hsl(var(--text-secondary))]"
            />
            <button>
              <Icon name="Smile" size={18} className="text-[hsl(var(--text-secondary))]" />
            </button>
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="w-11 h-11 gradient-orange rounded-2xl flex items-center justify-center orange-glow disabled:opacity-50 transition-all active:scale-95"
          >
            <Icon name="Send" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
