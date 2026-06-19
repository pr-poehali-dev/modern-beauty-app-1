import { useState, useRef, useCallback } from "react";

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
import FamilyScreen from "@/components/screens/FamilyScreen";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/ui/icon";

export type Screen =
  | "home" | "booking" | "history" | "loyalty" | "profile"
  | "masters" | "catalog" | "chat" | "login"
  | "my-bookings" | "payment" | "salon" | "settings" | "promos" | "family";

export default function Index() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigateTo = useCallback((screen: Screen) => {
    setScreenHistory(prev => [...prev, activeScreen]);
    setActiveScreen(screen);
  }, [activeScreen]);

  const goBack = useCallback(() => {
    setScreenHistory(prev => {
      if (prev.length === 0) return prev;
      const history = [...prev];
      const last = history.pop()!;
      setActiveScreen(last);
      return history;
    });
  }, []);

  // Swipe right to go back
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (dx > 60 && dy < 80 && screenHistory.length > 0) {
      goBack();
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":        return <HomeScreen onNavigate={navigateTo} />;
      case "booking":     return <BookingScreen onNavigate={navigateTo} />;
      case "history":     return <HistoryScreen onNavigate={navigateTo} />;
      case "loyalty":     return <LoyaltyScreen onNavigate={navigateTo} />;
      case "profile":     return <ProfileScreen onNavigate={navigateTo} />;
      case "masters":     return <MastersScreen onNavigate={navigateTo} />;
      case "catalog":     return <CatalogScreen onNavigate={navigateTo} />;
      case "chat":        return <ChatScreen onNavigate={navigateTo} />;
      case "my-bookings": return <MyBookingsScreen onNavigate={navigateTo} />;
      case "payment":     return <PaymentScreen onNavigate={navigateTo} />;
      case "salon":       return <SalonScreen onNavigate={navigateTo} />;
      case "settings":    return <SettingsScreen onNavigate={navigateTo} />;
      case "promos":      return <PromoScreen onNavigate={navigateTo} />;
      case "family":      return <FamilyScreen onNavigate={navigateTo} onBack={goBack} />;
      default:            return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  // Уведомление об оплате — показываем как плашку
  const showPaymentBadge = true;

  return (
    <div className="min-h-screen bg-[hsl(var(--gray-soft))] flex justify-center items-start">
      <div
        className="w-full max-w-[430px] min-h-screen bg-[hsl(var(--gray-soft))] relative flex flex-col overflow-hidden shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* Header */}
        <header className="flex items-center justify-between px-4 pt-12 pb-3 bg-[hsl(var(--gray-soft))] z-20 sticky top-0">
          <div className="flex items-center gap-2">
            {screenHistory.length > 0 && activeScreen !== "home" && (
              <button
                onClick={goBack}
                className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm transition-all active:scale-95"
              >
                <Icon name="ChevronLeft" size={20} className="text-[hsl(var(--text-secondary))]" />
              </button>
            )}
            <button
              onClick={() => navigateTo(activeScreen === "salon" ? "home" : "salon")}
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
          </div>
          <div className="flex items-center gap-2">
            {/* Мои записи */}
            <button
              onClick={() => navigateTo("my-bookings")}
              className="w-11 h-11 rounded-2xl bg-white border border-[hsl(var(--border))] flex items-center justify-center transition-all active:scale-95 relative shadow-sm"
            >
              <Icon name="CalendarDays" size={20} className="text-[hsl(var(--text-secondary))]" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[hsl(var(--primary))] rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
            </button>
            {/* Уведомления */}
            <button
              onClick={() => navigateTo("chat")}
              className="w-11 h-11 rounded-2xl bg-white border border-[hsl(var(--border))] flex items-center justify-center transition-all active:scale-95 relative shadow-sm"
            >
              <Icon name="Bell" size={20} className="text-[hsl(var(--text-secondary))]" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[hsl(var(--primary))] rounded-full border-2 border-[hsl(var(--gray-soft))]" />
            </button>
            {/* Настройки */}
            <button
              onClick={() => navigateTo("settings")}
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