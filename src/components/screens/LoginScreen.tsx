import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCodeSent(true);
    }, 1000);
  };

  const handleLogin = () => {
    if (code.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 1) return digits;
    let result = "+7 ";
    if (digits.length > 1) result += "(" + digits.slice(1, 4);
    if (digits.length >= 4) result += ") " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/b1d4ff4b-73d5-4053-83b1-50046ba5374d.jpg"
          alt="Салон Модерн"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 gradient-orange rounded-xl flex items-center justify-center">
              <span className="text-white font-bold font-golos">М</span>
            </div>
            <span className="text-white font-golos font-bold text-xl">Модерн</span>
          </div>
          <p className="text-white/80 font-golos text-sm">Семейный салон красоты</p>
        </div>
      </div>

      <div className="flex-1 px-6 pt-8 animate-fade-in-up">
        <h2 className="font-golos font-bold text-2xl text-[hsl(var(--text-main))] mb-2">
          Вход в приложение
        </h2>
        <p className="font-golos text-[hsl(var(--text-secondary))] text-sm mb-8">
          Введите номер телефона, чтобы войти или зарегистрироваться
        </p>

        <div className="space-y-4">
          <div>
            <label className="font-golos text-sm font-medium text-[hsl(var(--text-main))] mb-2 block">
              Номер телефона
            </label>
            <div className="relative">
              <Icon name="Phone" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--text-secondary))]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="+7 (___) ___-__-__"
                className="w-full pl-11 pr-4 py-4 border-2 border-[hsl(var(--border))] rounded-2xl font-golos text-base focus:border-[hsl(var(--primary))] focus:outline-none transition-colors bg-[hsl(var(--gray-soft))]"
              />
            </div>
          </div>

          {!codeSent ? (
            <button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full py-4 gradient-orange text-white font-golos font-semibold text-base rounded-2xl transition-all active:scale-98 orange-glow disabled:opacity-70"
            >
              {loading ? "Отправляем..." : "Получить SMS-код"}
            </button>
          ) : (
            <>
              <div className="animate-fade-in-up">
                <label className="font-golos text-sm font-medium text-[hsl(var(--text-main))] mb-2 block">
                  Код из SMS
                </label>
                <div className="relative">
                  <Icon name="KeyRound" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--text-secondary))]" />
                  <input
                    type="number"
                    value={code}
                    onChange={(e) => setCode(e.target.value.slice(0, 6))}
                    placeholder="Введите код"
                    className="w-full pl-11 pr-4 py-4 border-2 border-[hsl(var(--primary))] rounded-2xl font-golos text-base focus:outline-none bg-[hsl(var(--orange-light))] text-center text-xl tracking-widest font-bold"
                  />
                </div>
                <p className="text-xs text-[hsl(var(--text-secondary))] font-golos mt-2 text-center">
                  Код отправлен на {phone}
                </p>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-4 gradient-orange text-white font-golos font-semibold text-base rounded-2xl transition-all active:scale-98 orange-glow disabled:opacity-70"
              >
                {loading ? "Входим..." : "Войти"}
              </button>
            </>
          )}
        </div>

        {/* VK ID */}
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[hsl(var(--border))]" />
            <span className="text-xs text-[hsl(var(--text-secondary))] font-golos">или</span>
            <div className="flex-1 h-px bg-[hsl(var(--border))]" />
          </div>
          <button className="w-full py-3.5 border-2 border-[hsl(var(--border))] rounded-2xl flex items-center justify-center gap-3 font-golos font-medium text-[hsl(var(--text-main))] transition-all active:bg-[hsl(var(--gray-soft))]">
            <div className="w-6 h-6 bg-[#0077FF] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">VK</span>
            </div>
            Войти через VK ID
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[hsl(var(--text-secondary))] font-golos">
            Входя, вы соглашаетесь с{" "}
            <button className="text-[hsl(var(--primary))] underline">политикой конфиденциальности</button>
            {" "}и{" "}
            <button className="text-[hsl(var(--primary))] underline">пользовательским соглашением</button>
          </p>
        </div>
      </div>
    </div>
  );
}
