import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface NotificationsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const notifications = [
  { id: 1, icon: "CalendarCheck", color: "bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))]", title: "Запись подтверждена", text: "Стрижка + укладка · 29 июня, 14:30 · Анастасия", time: "10:00", date: "Сегодня", unread: true },
  { id: 2, icon: "Sparkles",      color: "bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))]", title: "Начислено 170 баллов", text: "За балаяж + стрижку от 12 мая · Баланс: 1 240 Б", time: "12 мая", date: "12 мая", unread: true },
  { id: 3, icon: "AlertTriangle", color: "bg-yellow-50 text-yellow-500",                             title: "Баллы сгорают!", text: "320 баллов сгорят 15 июля — успейте использовать", time: "9:00", date: "Вчера", unread: false },
  { id: 4, icon: "Calendar",      color: "bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))]", title: "Напоминание о записи", text: "Завтра в 14:30 — Стрижка + укладка у Анастасии", time: "19:00", date: "Вчера", unread: false },
  { id: 5, icon: "Percent",       color: "bg-green-50 text-green-500",                               title: "Акция: Маникюр + педикюр", text: "−15% если записаться в один день · до 15 июля", time: "11:00", date: "26 июня", unread: false },
  { id: 6, icon: "Gift",          color: "bg-purple-50 text-purple-500",                             title: "Семейный бонус", text: "Михаил записан — начислено +50 Б за запись через приложение", time: "15:30", date: "24 июня", unread: false },
];

type SettingKey = "records" | "bonuses" | "promos" | "reminders" | "family";

const settingsList: { key: SettingKey; icon: string; label: string; desc: string }[] = [
  { key: "records",   icon: "CalendarCheck", label: "Записи",          desc: "Подтверждения и изменения записей" },
  { key: "bonuses",   icon: "Sparkles",      label: "Баллы и бонусы",  desc: "Начисления, сгорание баллов" },
  { key: "promos",    icon: "Percent",       label: "Акции",           desc: "Скидки и специальные предложения" },
  { key: "reminders", icon: "Clock",         label: "Напоминания",     desc: "За день до визита" },
  { key: "family",    icon: "Users",         label: "Семья",           desc: "Записи и активность членов семьи" },
];

export default function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const [tab, setTab] = useState<"list" | "settings">("list");
  const [settings, setSettings] = useState<Record<SettingKey, boolean>>({
    records: true, bonuses: true, promos: false, reminders: true, family: true,
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const toggle = (key: SettingKey) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-2 gap-2.5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Уведомления</h2>
        {unreadCount > 0 && tab === "list" && (
          <span className="gradient-orange text-white text-xs font-bold px-3 py-1 rounded-xl">{unreadCount} новых</span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-2xl p-1 gap-1 border border-[hsl(var(--border))] shadow-sm shrink-0">
        {([["list", "Bell", "Уведомления"], ["settings", "SlidersHorizontal", "Настройки"]] as [string, string, string][]).map(([key, icon, label]) => (
          <button key={key} onClick={() => setTab(key as "list" | "settings")}
            className={`flex-1 py-2 rounded-xl font-golos text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${tab === key ? "gradient-orange text-white shadow-sm" : "text-[hsl(var(--text-secondary))]"}`}>
            <Icon name={icon} size={13} />
            {label}
            {key === "list" && unreadCount > 0 && (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tab === "list" ? "bg-white/30 text-white" : "bg-[hsl(var(--primary))] text-white"}`}>{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── LIST ── */}
      {tab === "list" && (
        <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 space-y-2">
          {(() => {
            let lastDate = "";
            return notifications.map((n) => (
              <div key={n.id}>
                {n.date !== lastDate && (() => { lastDate = n.date; return (
                  <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] font-semibold uppercase tracking-wider px-1 pt-1 pb-0.5">{n.date}</p>
                ); })()}
                <div className={`bg-white border rounded-2xl p-3.5 flex items-start gap-3 shadow-sm transition-all ${n.unread ? "border-[hsl(var(--primary))]/30" : "border-[hsl(var(--border))]"}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                    <Icon name={n.icon} size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className={`font-golos text-sm font-semibold truncate ${n.unread ? "text-[hsl(var(--text-main))]" : "text-[hsl(var(--text-secondary))]"}`}>{n.title}</p>
                      <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] shrink-0">{n.time}</span>
                    </div>
                    <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">{n.text}</p>
                  </div>
                  {n.unread && <span className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full shrink-0 mt-1.5" />}
                </div>
              </div>
            ));
          })()}
        </div>
      )}

      {/* ── SETTINGS ── */}
      {tab === "settings" && (
        <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 space-y-3">
          <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 gradient-orange rounded-xl flex items-center justify-center shrink-0">
              <Icon name="Bell" size={17} className="text-white" />
            </div>
            <p className="font-golos text-sm text-[hsl(var(--text-main))]">
              Выберите, о чём хотите получать уведомления
            </p>
          </div>

          <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
            {settingsList.map((s, i) => (
              <div key={s.key}>
                {i > 0 && <div className="h-px bg-[hsl(var(--border))] mx-4" />}
                <button
                  onClick={() => toggle(s.key)}
                  className="w-full px-4 py-3.5 flex items-center gap-3 transition-all active:bg-[hsl(var(--gray-soft))]"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${settings[s.key] ? "gradient-orange" : "bg-[hsl(var(--gray-soft))]"}`}>
                    <Icon name={s.icon} size={16} className={settings[s.key] ? "text-white" : "text-[hsl(var(--text-secondary))]"} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))]">{s.label}</p>
                    <p className="font-golos text-[11px] text-[hsl(var(--text-secondary))]">{s.desc}</p>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-all shrink-0 flex items-center px-0.5 ${settings[s.key] ? "gradient-orange" : "bg-[hsl(var(--border))]"}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings[s.key] ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
