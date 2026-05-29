import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { screen: "home" as Screen, icon: "Home", label: "Главная" },
  { screen: "booking" as Screen, icon: "CalendarPlus", label: "Запись" },
  { screen: "history" as Screen, icon: "Clock", label: "История" },
  { screen: "loyalty" as Screen, icon: "Star", label: "Бонусы" },
  { screen: "profile" as Screen, icon: "User", label: "Профиль" },
];

export default function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[hsl(var(--border))] z-30 pb-safe">
      <div className="flex items-center justify-around px-2 pt-2 pb-6">
        {navItems.map((item) => {
          const isActive = activeScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-2xl transition-all active:scale-90"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "gradient-orange orange-glow scale-105"
                  : "bg-transparent"
              }`}>
                <Icon
                  name={item.icon}
                  size={20}
                  className={isActive ? "text-white" : "text-[hsl(var(--text-secondary))]"}
                />
              </div>
              <span className={`text-[10px] font-golos font-medium transition-colors ${
                isActive ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
