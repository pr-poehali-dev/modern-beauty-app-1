import { useState } from "react";

import HomeScreen from "@/components/screens/HomeScreen";
import BookingScreen from "@/components/screens/BookingScreen";
import HistoryScreen from "@/components/screens/HistoryScreen";
import LoyaltyScreen from "@/components/screens/LoyaltyScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import MastersScreen from "@/components/screens/MastersScreen";
import CatalogScreen from "@/components/screens/CatalogScreen";
import ChatScreen from "@/components/screens/ChatScreen";
import LoginScreen from "@/components/screens/LoginScreen";
import MyBookingsScreen from "@/components/screens/MyBookingsScreen";
import PaymentScreen from "@/components/screens/PaymentScreen";
import SalonScreen from "@/components/screens/SalonScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import PromoScreen from "@/components/screens/PromoScreen";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/ui/icon";

export type Screen =
  | "home" | "booking" | "history" | "loyalty" | "profile"
  | "masters" | "catalog" | "chat" | "login"
  | "my-bookings" | "payment" | "salon" | "settings" | "promos";

export default function Index() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":        return <HomeScreen onNavigate={setActiveScreen} />;
      case "booking":     return <BookingScreen onNavigate={setActiveScreen} />;
      case "history":     return <HistoryScreen onNavigate={setActiveScreen} />;
      case "loyalty":     return <LoyaltyScreen onNavigate={setActiveScreen} />;
      case "profile":     return <ProfileScreen onNavigate={setActiveScreen} />;
      case "masters":     return <MastersScreen onNavigate={setActiveScreen} />;
      case "catalog":     return <CatalogScreen onNavigate={setActiveScreen} />;
      case "chat":        return <ChatScreen onNavigate={setActiveScreen} />;
      case "my-bookings": return <MyBookingsScreen onNavigate={setActiveScreen} />;
      case "payment":     return <PaymentScreen onNavigate={setActiveScreen} />;
      case "salon":       return <SalonScreen onNavigate={setActiveScreen} />;
      case "settings":    return <SettingsScreen onNavigate={setActiveScreen} />;
      case "promos":      return <PromoScreen onNavigate={setActiveScreen} />;
      default:            return <HomeScreen onNavigate={setActiveScreen} />;
    }
  };

  // Уведомление об оплате — показываем как плашку
  const showPaymentBadge = true;

  return (
    <div className="min-h-screen bg-[hsl(var(--gray-soft))] flex justify-center items-start">
      <div className="w-full max-w-[430px] min-h-screen bg-[hsl(var(--gray-soft))] relative flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <header className="flex items-center justify-between px-4 pt-12 pb-3 bg-[hsl(var(--gray-soft))] z-20 sticky top-0">
          <button
            onClick={() => setActiveScreen(activeScreen === "salon" ? "home" : "salon")}
            className="flex items-center gap-2.5"
          >
            <div className="w-10 h-10 gradient-orange rounded-2xl flex items-center justify-center orange-glow">
              <span className="text-white text-base font-bold font-golos">М</span>
            </div>
            <div>
              <span className="font-golos font-bold text-lg text-[hsl(var(--text-main))] leading-none block">
                {activeScreen === "salon" ? "О салоне" : "Модерн"}
              </span>
              <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] leading-none">
                {activeScreen === "salon" ? "← назад" : "О салоне →"}
              </span>
            </div>
          </button>
          <div className="flex items-center gap-2">
            {/* Мои записи */}
            <button
              onClick={() => setActiveScreen("my-bookings")}
              className="w-11 h-11 rounded-2xl bg-white border border-[hsl(var(--border))] flex items-center justify-center transition-all active:scale-95 relative shadow-sm"
            >
              <Icon name="CalendarDays" size={20} className="text-[hsl(var(--text-secondary))]" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[hsl(var(--primary))] rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
            </button>
            {/* Чат */}
            <button
              onClick={() => setActiveScreen("chat")}
              className="w-11 h-11 rounded-2xl bg-white border border-[hsl(var(--border))] flex items-center justify-center transition-all active:scale-95 relative shadow-sm"
            >
              <Icon name="MessageCircle" size={20} className="text-[hsl(var(--text-secondary))]" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[hsl(var(--primary))] rounded-full border-2 border-[hsl(var(--gray-soft))]" />
            </button>
            {/* Настройки */}
            <button
              onClick={() => setActiveScreen("settings")}
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all active:scale-95 shadow-sm ${
                activeScreen === "settings"
                  ? "gradient-orange border-transparent orange-glow"
                  : "bg-white border-[hsl(var(--border))]"
              }`}
            >
              <Icon
                name="Settings"
                size={20}
                className={activeScreen === "settings" ? "text-white" : "text-[hsl(var(--text-secondary))]"}
              />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-hidden pb-28 flex flex-col">
          <div className="flex-1 h-full overflow-y-auto scrollbar-hide">
            {renderScreen()}
          </div>
        </main>

        {/* Bottom Nav */}
        <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
      </div>
    </div>
  );
}