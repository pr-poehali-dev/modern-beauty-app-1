import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface CatalogScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PRODUCT_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/b582f537-ce2c-4a12-b311-dd1086ac0976.jpg";

const categories = ["Все", "Уход за волосами", "Маски и сыворотки", "Стайлинг", "Маникюр", "Уход за кожей"];

const products = [
  { name: "Маска Olaplex No.3", brand: "Olaplex", price: 2890, bonus: "+145 б", category: "Маски и сыворотки", inStock: true, recommended: true },
  { name: "Шампунь восстанавливающий", brand: "Redken", price: 1650, bonus: "+83 б", category: "Уход за волосами", inStock: true, recommended: false },
  { name: "Кондиционер питательный", brand: "Kerastase", price: 3200, bonus: "+160 б", category: "Уход за волосами", inStock: true, recommended: true },
  { name: "Спрей для укладки", brand: "Schwarzkopf", price: 980, bonus: "+49 б", category: "Стайлинг", inStock: false, recommended: false },
  { name: "Гель-лак OPI", brand: "OPI", price: 1200, bonus: "+60 б", category: "Маникюр", inStock: true, recommended: false },
  { name: "Сыворотка для волос", brand: "L'Oreal", price: 2100, bonus: "+105 б", category: "Маски и сыворотки", inStock: true, recommended: false },
];

export default function CatalogScreen({ onNavigate }: CatalogScreenProps) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cart, setCart] = useState<string[]>([]);

  const filtered = activeCategory === "Все" ? products : products.filter(p => p.category === activeCategory);

  const toggleCart = (name: string) => {
    setCart(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">Каталог товаров</h2>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Профессиональная косметика</p>
        </div>
        {cart.length > 0 && (
          <button className="relative w-10 h-10 gradient-orange rounded-xl flex items-center justify-center orange-glow">
            <Icon name="ShoppingCart" size={18} className="text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(var(--text-main))] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
              {cart.length}
            </span>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--text-secondary))]" />
        <input
          type="text"
          placeholder="Поиск товаров..."
          className="w-full pl-10 pr-4 py-3 bg-[hsl(var(--gray-soft))] rounded-xl font-golos text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/30"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-golos text-sm font-medium transition-all shrink-0 ${
              activeCategory === cat
                ? "gradient-orange text-white"
                : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-secondary))]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product, i) => (
          <div
            key={i}
            className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="relative">
              <div className="h-36 overflow-hidden">
                <img src={PRODUCT_IMG} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {product.recommended && (
                <div className="absolute top-2 left-2 bg-[hsl(var(--primary))] text-white text-[10px] font-golos font-bold px-2 py-0.5 rounded-lg">
                  Рекомендуем
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <span className="font-golos text-xs font-semibold text-[hsl(var(--text-secondary))]">Нет в наличии</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{product.brand}</p>
              <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] leading-tight mt-0.5">{product.name}</p>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="font-golos font-bold text-[hsl(var(--text-main))] text-base">{product.price.toLocaleString()} ₽</p>
                  <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-medium">{product.bonus}</p>
                </div>
                <button
                  onClick={() => toggleCart(product.name)}
                  disabled={!product.inStock}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90 ${
                    cart.includes(product.name)
                      ? "gradient-orange"
                      : "bg-[hsl(var(--orange-light))]"
                  } disabled:opacity-40`}
                >
                  <Icon
                    name={cart.includes(product.name) ? "Check" : "Plus"}
                    size={16}
                    className={cart.includes(product.name) ? "text-white" : "text-[hsl(var(--primary))]"}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bonus info */}
      <div className="mt-4 bg-[hsl(var(--orange-light))] rounded-2xl p-4 flex items-center gap-3">
        <Icon name="Sparkles" size={20} className="text-[hsl(var(--primary))] shrink-0" />
        <p className="font-golos text-sm text-[hsl(var(--primary))]">
          За покупку косметики начисляется <span className="font-bold">+5% от суммы</span> бонусными баллами
        </p>
      </div>
    </div>
  );
}
