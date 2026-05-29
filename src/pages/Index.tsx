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
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/ui/icon";

export type Screen =
  | "home" | "booking" | "history" | "loyalty" | "profile"
  | "masters" | "catalog" | "chat" | "login"
  | "my-bookings" | "payment" | "salon";

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
      default:            return <HomeScreen onNavigate={setActiveScreen} />;
    }
  };

  // Уведомление об оплате — показываем как плашку
  const showPaymentBadge = true;

  return (
    <div className="min-h-screen bg-[hsl(var(--gray-soft))] flex justify-center items-start">
      <div className="w-full max-w-[430px] min-h-screen bg-[hsl(var(--gray-soft))] relative flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-12 pb-3 bg-[hsl(var(--gray-soft))] z-20 sticky top-0">
          <button
            onClick={() => setActiveScreen("salon")}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 gradient-orange rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold font-golos">М</span>
            </div>
            <div>
              <span className="font-golos font-bold text-lg text-[hsl(var(--text-main))] leading-none block">
                {activeScreen === "salon" ? "О салоне" : "Модерн"}
              </span>
              {activeScreen !== "salon" && (
                <span className="font-golos text-[10px] text-[hsl(var(--text-secondary))] leading-none">О салоне →</span>
              )}
            </div>
          </button>
          <div className="flex items-center gap-2">
            {/* Кнопка оплаты */}
            <button
              onClick={() => setActiveScreen("payment")}
              className="relative w-9 h-9 rounded-xl bg-[hsl(var(--orange-light))] flex items-center justify-center transition-all active:scale-95"
            >
              <Icon name="CreditCard" size={17} className="text-[hsl(var(--primary))]" />
              {showPaymentBadge && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
            {/* Мои записи */}
            <button
              onClick={() => setActiveScreen("my-bookings")}
              className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center transition-all active:scale-95 relative"
            >
              <Icon name="CalendarDays" size={17} className="text-[hsl(var(--text-secondary))]" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[hsl(var(--primary))] rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
            </button>
            {/* Чат */}
            <button
              onClick={() => setActiveScreen("chat")}
              className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center transition-all active:scale-95 relative"
            >
              <Icon name="MessageCircle" size={17} className="text-[hsl(var(--text-secondary))]" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[hsl(var(--primary))] rounded-full border-2 border-[hsl(var(--gray-soft))]" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-24">
          {renderScreen()}
        </main>

        {/* Bottom Nav */}
        <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
      </div>
    </div>
  );
}