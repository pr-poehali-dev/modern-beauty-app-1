import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface CatalogScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PRODUCT_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/b582f537-ce2c-4a12-b311-dd1086ac0976.jpg";

const categories = ["Все", "Уход за волосами", "Маски и сыворотки", "Стайлинг", "Маникюр", "Уход за кожей"];

const products = [
  { name: "Маска Olaplex No.3", brand: "Olaplex", price: 2890, bonus: 145, category: "Маски и сыворотки", inStock: true, recommended: true },
  { name: "Шампунь восстанавливающий", brand: "Redken", price: 1650, bonus: 83, category: "Уход за волосами", inStock: true, recommended: false },
  { name: "Кондиционер питательный", brand: "Kerastase", price: 3200, bonus: 160, category: "Уход за волосами", inStock: true, recommended: true },
  { name: "Спрей для укладки", brand: "Schwarzkopf", price: 980, bonus: 49, category: "Стайлинг", inStock: false, recommended: false },
  { name: "Гель-лак OPI", brand: "OPI", price: 1200, bonus: 60, category: "Маникюр", inStock: true, recommended: false },
  { name: "Сыворотка для волос", brand: "L'Oreal", price: 2100, bonus: 105, category: "Маски и сыворотки", inStock: true, recommended: false },
];

type CartItem = { name: string; price: number; bonus: number; qty: number };

export default function CatalogScreen({ onNavigate }: CatalogScreenProps) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const filtered = activeCategory === "Все" ? products : products.filter(p => p.category === activeCategory);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === product.name);
      if (existing) return prev.map(i => i.name === product.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name: product.name, price: product.price, bonus: product.bonus, qty: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart(prev => {
      const item = prev.find(i => i.name === name);
      if (!item) return prev;
      if (item.qty === 1) return prev.filter(i => i.name !== name);
      return prev.map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartBonus = cart.reduce((sum, i) => sum + i.bonus * i.qty, 0);

  if (ordered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 animate-scale-in">
        <div className="w-20 h-20 gradient-orange rounded-full flex items-center justify-center mb-5 orange-glow animate-pulse-ring">
          <Icon name="Package" size={36} className="text-white" />
        </div>
        <h2 className="font-golos font-bold text-2xl text-[hsl(var(--text-main))] text-center mb-2">Заказ оформлен!</h2>
        <p className="font-golos text-[hsl(var(--text-secondary))] text-center text-sm mb-1">Товары будут готовы к выдаче в салоне</p>
        <p className="font-golos text-[hsl(var(--text-secondary))] text-center text-sm mb-5">или доставлены в течение 2–3 дней</p>
        <div className="bg-[hsl(var(--orange-light))] rounded-2xl px-5 py-3 mb-8">
          <p className="font-golos text-sm text-[hsl(var(--primary))] font-medium text-center">
            ✨ +{cartBonus} баллов будет начислено после выкупа
          </p>
        </div>
        <button
          onClick={() => { setOrdered(false); setCart([]); setShowCart(false); }}
          className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
        >
          Продолжить покупки
        </button>
      </div>
    );
  }

  if (showCart) {
    return (
      <div className="px-5 pt-2 pb-4 animate-slide-in-right">
        <button onClick={() => setShowCart(false)} className="flex items-center gap-1 font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">
          <Icon name="ChevronLeft" size={18} /> Каталог
        </button>
        <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))] mb-1">Корзина</h2>
        <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mb-5">{cartCount} товар{cartCount > 1 ? "а" : ""}</p>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[hsl(var(--gray-soft))] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Icon name="ShoppingCart" size={28} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <p className="font-golos text-[hsl(var(--text-secondary))]">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-5">
              {cart.map((item) => (
                <div key={item.name} className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 flex items-center gap-3 card-shadow">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={PRODUCT_IMG} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] leading-tight">{item.name}</p>
                    <p className="font-golos font-bold text-[hsl(var(--text-main))] mt-1">{item.price.toLocaleString()} ₽</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center"
                    >
                      <Icon name="Minus" size={14} className="text-[hsl(var(--text-main))]" />
                    </button>
                    <span className="font-golos font-bold text-base w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => addToCart(products.find(p => p.name === item.name)!)}
                      className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center"
                    >
                      <Icon name="Plus" size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="flex gap-2 mb-4">
              <input
                placeholder="Промокод"
                className="flex-1 px-4 py-3 bg-[hsl(var(--gray-soft))] rounded-xl font-golos text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/30"
              />
              <button className="px-4 py-3 bg-[hsl(var(--orange-light))] text-[hsl(var(--primary))] font-golos font-semibold text-sm rounded-xl">
                Применить
              </button>
            </div>

            {/* Use points */}
            <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-3.5 flex items-center gap-3 mb-5">
              <Icon name="Sparkles" size={18} className="text-[hsl(var(--primary))] shrink-0" />
              <div className="flex-1">
                <p className="font-golos text-sm font-semibold text-[hsl(var(--primary))]">Списать баллы</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Доступно 1 240 баллов (до 7%)</p>
              </div>
              <button className="font-golos text-xs font-bold text-[hsl(var(--primary))]">Применить</button>
            </div>

            {/* Summary */}
            <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 mb-5 card-shadow">
              <div className="flex justify-between mb-2">
                <span className="font-golos text-sm text-[hsl(var(--text-secondary))]">Товары ({cartCount})</span>
                <span className="font-golos text-sm font-medium">{cartTotal.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-golos text-sm text-[hsl(var(--text-secondary))]">Начислим баллов</span>
                <span className="font-golos text-sm font-semibold text-[hsl(var(--primary))]">+{cartBonus} б</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[hsl(var(--border))]">
                <span className="font-golos font-bold text-[hsl(var(--text-main))]">Итого</span>
                <span className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">{cartTotal.toLocaleString()} ₽</span>
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-5 space-y-2">
              <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] mb-2">Способ получения</p>
              {[
                { icon: "Store", label: "Забрать в салоне", desc: "ул. Ленина, 45 · Бесплатно" },
                { icon: "Truck", label: "Доставка", desc: "2–3 рабочих дня · 350 ₽" },
              ].map(({ icon, label, desc }, i) => (
                <button key={i} className={`w-full p-3.5 border-2 rounded-2xl flex items-center gap-3 ${i === 0 ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]" : "border-[hsl(var(--border))] bg-white"}`}>
                  <Icon name={icon} size={20} className={i === 0 ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"} />
                  <div className="text-left">
                    <p className={`font-golos font-semibold text-sm ${i === 0 ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>{label}</p>
                    <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{desc}</p>
                  </div>
                  {i === 0 && <Icon name="Check" size={16} className="ml-auto text-[hsl(var(--primary))]" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOrdered(true)}
              className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow"
            >
              Оформить заказ · {cartTotal.toLocaleString()} ₽
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">Каталог товаров</h2>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Профессиональная косметика</p>
        </div>
        <button
          onClick={() => setShowCart(true)}
          className="relative w-10 h-10 gradient-orange rounded-xl flex items-center justify-center orange-glow"
        >
          <Icon name="ShoppingCart" size={18} className="text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(var(--text-main))] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
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
        {filtered.map((product, i) => {
          const inCart = cart.find(c => c.name === product.name);
          return (
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
                    <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-medium">+{product.bonus} б</p>
                  </div>
                  {inCart ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => removeFromCart(product.name)}
                        className="w-7 h-7 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center"
                      >
                        <Icon name="Minus" size={12} className="text-[hsl(var(--text-main))]" />
                      </button>
                      <span className="font-golos font-bold text-sm w-4 text-center">{inCart.qty}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-7 h-7 gradient-orange rounded-lg flex items-center justify-center"
                      >
                        <Icon name="Plus" size={12} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
                    >
                      <Icon name="Plus" size={16} className="text-[hsl(var(--primary))]" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bonus info */}
      <div className="mt-4 bg-[hsl(var(--orange-light))] rounded-2xl p-4 flex items-center gap-3">
        <Icon name="Sparkles" size={20} className="text-[hsl(var(--primary))] shrink-0" />
        <p className="font-golos text-sm text-[hsl(var(--primary))]">
          За покупку косметики начисляется <span className="font-bold">+5% от суммы</span> бонусными баллами
        </p>
      </div>

      {/* Cart button if items */}
      {cartCount > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 gradient-orange text-white font-golos font-semibold text-sm px-6 py-3.5 rounded-2xl orange-glow flex items-center gap-2 animate-scale-in"
        >
          <Icon name="ShoppingCart" size={18} />
          Корзина · {cartCount} · {cartTotal.toLocaleString()} ₽
        </button>
      )}
    </div>
  );
}
