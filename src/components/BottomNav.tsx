import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { screen: "home" as Screen,    icon: "Home",         label: "Главная" },
  { screen: "booking" as Screen, icon: "CalendarPlus", label: "Запись" },
  { screen: "loyalty" as Screen, icon: "Star",         label: "Баллы" },
  { screen: "catalog" as Screen, icon: "ShoppingBag",  label: "Каталог" },
  { screen: "salon" as Screen,   icon: "Store",        label: "Салон" },
];

export default function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 pb-safe">
      {/* White card that floats above the grey background */}
      <div className="mx-3 mb-3 bg-white rounded-3xl shadow-lg border border-[hsl(var(--border))]">
        <div className="flex items-center justify-around px-1 pt-2 pb-2">
          {navItems.map((item) => {
            const isActive = activeScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className="flex flex-col items-center gap-1 px-2 py-1 transition-all active:scale-90"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "gradient-orange orange-glow scale-110"
                    : "bg-[hsl(var(--gray-soft))]"
                }`}>
                  <Icon
                    name={item.icon}
                    size={21}
                    className={isActive ? "text-white" : "text-[hsl(var(--text-secondary))]"}
                  />
                </div>
                <span className={`text-[10px] font-golos font-semibold transition-colors ${
                  isActive ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
