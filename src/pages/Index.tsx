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
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/ui/icon";

export type Screen = "home" | "booking" | "history" | "loyalty" | "profile" | "masters" | "catalog" | "chat" | "login";

export default function Index() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case "home": return <HomeScreen onNavigate={setActiveScreen} />;
      case "booking": return <BookingScreen onNavigate={setActiveScreen} />;
      case "history": return <HistoryScreen onNavigate={setActiveScreen} />;
      case "loyalty": return <LoyaltyScreen onNavigate={setActiveScreen} />;
      case "profile": return <ProfileScreen onNavigate={setActiveScreen} />;
      case "masters": return <MastersScreen onNavigate={setActiveScreen} />;
      case "catalog": return <CatalogScreen onNavigate={setActiveScreen} />;
      case "chat": return <ChatScreen onNavigate={setActiveScreen} />;
      default: return <HomeScreen onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--gray-soft))] flex justify-center items-start">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between px-5 pt-12 pb-3 bg-white z-20 sticky top-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-orange rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold font-golos">М</span>
            </div>
            <span className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Модерн</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveScreen("catalog")}
              className="w-9 h-9 rounded-xl bg-[hsl(var(--gray-soft))] flex items-center justify-center transition-all active:scale-95"
            >
              <Icon name="ShoppingBag" size={18} className="text-[hsl(var(--text-secondary))]" />
            </button>
            <button
              onClick={() => setActiveScreen("chat")}
              className="w-9 h-9 rounded-xl bg-[hsl(var(--orange-light))] flex items-center justify-center transition-all active:scale-95 relative"
            >
              <Icon name="MessageCircle" size={18} className="text-[hsl(var(--primary))]" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[hsl(var(--primary))] rounded-full border-2 border-white" />
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