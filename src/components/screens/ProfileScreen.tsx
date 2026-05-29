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

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Анна Петрова");
  const [email, setEmail] = useState("anna.petrova@mail.ru");
  const [bday, setBday] = useState("15 марта 1988");
  const [notes, setNotes] = useState("Аллергия на миндальное масло");

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
          { icon: "Bell", label: "Уведомления", desc: "SMS и push-уведомления" },
          { icon: "CreditCard", label: "История платежей", desc: "Все транзакции" },
          { icon: "Shield", label: "Политика конфиденциальности", desc: "" },
          { icon: "FileText", label: "Пользовательское соглашение", desc: "" },
        ].map(({ icon, label, desc }, i) => (
          <button key={i} className={`w-full px-4 py-3.5 flex items-center gap-3 text-left ${i < 3 ? "border-b border-[hsl(var(--border))]" : ""}`}>
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center">
              <Icon name={icon} size={15} className="text-[hsl(var(--text-secondary))]" />
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
