import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface CatalogScreenProps {
  onNavigate: (screen: Screen) => void;
}

const IMG_SHAMPOO    = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/2f6d37da-361e-4c0d-969f-1e6260de7c1a.jpg";
const IMG_MASK       = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/c3137b70-76ac-47cd-9c6a-b23e69a6dea2.jpg";
const IMG_SPRAY      = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/4b3b269f-f535-4871-a4b2-ffac3046fcc4.jpg";
const IMG_OIL        = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/20abd534-42a8-4157-aef8-1095af75d14a.jpg";
const IMG_CONDITIONER= "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/cb9e0266-a2ac-4c5d-8f13-de672af9eee8.jpg";
const MASTER_IMG     = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/e3ed684a-5b91-442d-bbef-325e47bc1166.jpg";

const categories = [
  { id: "all",     label: "Все",          icon: "✨" },
  { id: "shampoo", label: "Шампуни",      icon: "🧴" },
  { id: "mask",    label: "Маски",        icon: "🫙" },
  { id: "cond",    label: "Кондиционеры", icon: "💧" },
  { id: "spray",   label: "Спреи",        icon: "🌿" },
  { id: "oil",     label: "Масла",        icon: "✨" },
  { id: "color",   label: "Для окраш.",   icon: "🎨" },
];

const products = [
  { id: 1, name: "Шампунь восстанавливающий Olaplex No.4", brand: "Olaplex", price: 2890, bonus: 145, category: "shampoo", inStock: true,  recommended: true,  img: IMG_SHAMPOO,     desc: "Восстанавливает повреждённые связи волоса, подходит для всех типов, особенно окрашенных.",        masterTip: "Рекомендую использовать раз в неделю для поддержания блеска" },
  { id: 2, name: "Питательная маска Kerastase Nutritive",  brand: "Kerastase", price: 3200, bonus: 160, category: "mask",    inStock: true,  recommended: true,  img: IMG_MASK,        desc: "Интенсивное питание и восстановление для сухих и повреждённых волос.",                           masterTip: "Нанесите на 10–15 минут после шампуня, смойте тёплой водой" },
  { id: 3, name: "Кондиционер Redken All Soft",            brand: "Redken",    price: 1650, bonus: 83,  category: "cond",    inStock: true,  recommended: false, img: IMG_CONDITIONER, desc: "Увлажняет и разглаживает волосы, облегчает расчёсывание.",                                        masterTip: null },
  { id: 4, name: "Термозащитный спрей Schwarzkopf",        brand: "Schwarzkopf", price: 980, bonus: 49, category: "spray",  inStock: false, recommended: false, img: IMG_SPRAY,       desc: "Защита до 230°C, придаёт блеск, облегчает укладку.",                                             masterTip: "Наносите перед феном или утюжком на влажные волосы" },
  { id: 5, name: "Аргановое масло L'Oreal Mythic",         brand: "L'Oreal",   price: 2100, bonus: 105, category: "oil",    inStock: true,  recommended: false, img: IMG_OIL,         desc: "Придаёт невероятный блеск, устраняет пушистость, питает кончики.",                                masterTip: "2–3 капли на сухие волосы — идеальный финиш укладки" },
  { id: 6, name: "Маска для окрашенных Olaplex No.8",      brand: "Olaplex",   price: 3500, bonus: 175, category: "color",  inStock: true,  recommended: true,  img: IMG_MASK,        desc: "Специально для окрашенных волос — сохраняет цвет, восстанавливает структуру.",                   masterTip: "Используйте после каждого окрашивания для поддержания цвета" },
  { id: 7, name: "Спрей-кондиционер Kerastase Elixir",     brand: "Kerastase", price: 2400, bonus: 120, category: "spray",  inStock: true,  recommended: false, img: IMG_SPRAY,       desc: "Несмываемый уход, питание и защита для ослабленных волос.",                                       masterTip: null },
  { id: 8, name: "Масло-блеск Redken Diamond Oil",         brand: "Redken",    price: 1900, bonus: 95,  category: "oil",    inStock: true,  recommended: false, img: IMG_OIL,         desc: "Лёгкое масло для невероятного блеска и гладкости без утяжеления.",                               masterTip: null },
];

type Product = typeof products[0];
type CartItem = { id: number; name: string; price: number; bonus: number; qty: number; img: string };

export default function CatalogScreen({ onNavigate }: CatalogScreenProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);
  const [booked, setBooked] = useState<number[]>([]);
  const [ordered, setOrdered] = useState(false);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (p: Product) => setCart(prev => {
    const ex = prev.find(i => i.id === p.id);
    if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { id: p.id, name: p.name, price: p.price, bonus: p.bonus, qty: 1, img: p.img }];
  });
  const removeFromCart = (id: number) => setCart(prev => {
    const item = prev.find(i => i.id === id);
    if (!item) return prev;
    return item.qty === 1 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartBonus = cart.reduce((s, i) => s + i.bonus * i.qty, 0);

  /* SUCCESS */
  if (ordered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 animate-scale-in">
        <div className="w-20 h-20 gradient-orange rounded-full flex items-center justify-center mb-5 orange-glow animate-pulse-ring">
          <Icon name="Package" size={36} className="text-white" />
        </div>
        <h2 className="font-golos font-bold text-2xl text-[hsl(var(--text-main))] text-center mb-2">Заказ оформлен!</h2>
        <p className="font-golos text-[hsl(var(--text-secondary))] text-center text-sm mb-5">Товары будут готовы к выдаче в салоне или доставлены в течение 2–3 дней</p>
        <div className="bg-[hsl(var(--orange-light))] rounded-2xl px-5 py-3 mb-8">
          <p className="font-golos text-sm text-[hsl(var(--primary))] font-medium text-center">✨ +{cartBonus} баллов начислится после выкупа</p>
        </div>
        <button onClick={() => { setOrdered(false); setCart([]); setShowCart(false); }} className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow">
          Продолжить покупки
        </button>
      </div>
    );
  }

  /* DETAIL */
  if (detail) {
    const inCart = cart.find(c => c.id === detail.id);
    const isBooked = booked.includes(detail.id);
    return (
      <div className="pb-4 animate-slide-in-right">
        <button onClick={() => setDetail(null)} className="flex items-center gap-1 px-5 pt-4 pb-3 font-golos text-sm text-[hsl(var(--text-secondary))]">
          <Icon name="ChevronLeft" size={18} /> Каталог
        </button>
        <div className="h-56 overflow-hidden mx-5 rounded-3xl mb-4">
          <img src={detail.img} alt={detail.name} className="w-full h-full object-cover" />
        </div>
        <div className="px-5 space-y-4">
          <div>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{detail.brand}</p>
            <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">{detail.name}</h2>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="font-golos font-bold text-2xl">{detail.price.toLocaleString()} ₽</span>
              <span className="font-golos text-sm font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--orange-light))] px-3 py-1 rounded-xl">+{detail.bonus} Б</span>
              {detail.recommended && <span className="font-golos text-xs font-bold bg-[hsl(var(--primary))] text-white px-2.5 py-1 rounded-xl">Рекомендуем</span>}
            </div>
          </div>
          <div className="bg-[hsl(var(--gray-soft))] rounded-2xl p-4">
            <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] mb-1">Описание</p>
            <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{detail.desc}</p>
          </div>
          {detail.masterTip && (
            <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-4 flex gap-3">
              <img src={MASTER_IMG} alt="Мастер" className="w-10 h-10 rounded-xl object-cover shrink-0" />
              <div>
                <p className="font-golos text-xs font-semibold text-[hsl(var(--primary))] mb-0.5">Рекомендация мастера</p>
                <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">{detail.masterTip}</p>
              </div>
            </div>
          )}
          <div className={`rounded-xl px-4 py-2.5 flex items-center gap-2 ${detail.inStock ? "bg-green-50" : "bg-red-50"}`}>
            <Icon name={detail.inStock ? "CheckCircle" : "XCircle"} size={16} className={detail.inStock ? "text-green-500" : "text-red-400"} />
            <span className={`font-golos text-sm font-medium ${detail.inStock ? "text-green-600" : "text-red-500"}`}>
              {detail.inStock ? "В наличии в салоне" : "Нет в наличии"}
            </span>
          </div>
          {detail.inStock && (
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setBooked(p => p.includes(detail.id) ? p : [...p, detail.id])}
                className={`w-full py-4 rounded-2xl font-golos font-semibold flex items-center justify-center gap-2 transition-all ${isBooked ? "bg-green-50 border border-green-200 text-green-600" : "gradient-orange text-white orange-glow"}`}
              >
                <Icon name={isBooked ? "CheckCheck" : "Bookmark"} size={18} />
                {isBooked ? "Забронировано! (+20 Б после выкупа)" : "Забронировать без предоплаты"}
              </button>
              {inCart ? (
                <div className="flex items-center justify-between bg-[hsl(var(--gray-soft))] rounded-2xl px-4 py-3">
                  <span className="font-golos text-sm font-medium">В корзине</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(detail.id)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="font-golos font-bold text-base w-5 text-center">{inCart.qty}</span>
                    <button onClick={() => addToCart(detail)} className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center">
                      <Icon name="Plus" size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => addToCart(detail)} className="w-full py-3.5 bg-[hsl(var(--gray-soft))] font-golos font-semibold rounded-2xl flex items-center justify-center gap-2">
                  <Icon name="ShoppingCart" size={18} />
                  Добавить в корзину
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* CART */
  if (showCart) {
    return (
      <div className="px-5 pt-2 pb-4 animate-slide-in-right">
        <button onClick={() => setShowCart(false)} className="flex items-center gap-1 font-golos text-sm text-[hsl(var(--text-secondary))] mb-4">
          <Icon name="ChevronLeft" size={18} /> Каталог
        </button>
        <h2 className="font-golos font-bold text-xl mb-1">Корзина</h2>
        <p className="font-golos text-xs text-[hsl(var(--text-secondary))] mb-5">{cartCount} товар{cartCount === 1 ? "" : "а"}</p>
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
              {cart.map(item => (
                <div key={item.id} className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 flex items-center gap-3 card-shadow">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-golos font-semibold text-sm leading-tight truncate">{item.name}</p>
                    <p className="font-golos font-bold mt-1">{(item.price * item.qty).toLocaleString()} ₽</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center">
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="font-golos font-bold w-5 text-center">{item.qty}</span>
                    <button onClick={() => addToCart(products.find(p => p.id === item.id)!)} className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center">
                      <Icon name="Plus" size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[hsl(var(--orange-light))] rounded-2xl p-3.5 flex items-center gap-3 mb-4">
              <Icon name="Sparkles" size={18} className="text-[hsl(var(--primary))] shrink-0" />
              <div className="flex-1">
                <p className="font-golos text-sm font-semibold text-[hsl(var(--primary))]">Списать баллы</p>
                <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Доступно 1 240 баллов (до 7%)</p>
              </div>
              <button className="font-golos text-xs font-bold text-[hsl(var(--primary))]">Применить</button>
            </div>
            <div className="bg-white border border-[hsl(var(--border))] rounded-2xl p-4 mb-5 card-shadow">
              <div className="flex justify-between mb-2">
                <span className="font-golos text-sm text-[hsl(var(--text-secondary))]">Товары ({cartCount})</span>
                <span className="font-golos text-sm">{cartTotal.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-golos text-sm text-[hsl(var(--text-secondary))]">Начислим баллов</span>
                <span className="font-golos text-sm font-semibold text-[hsl(var(--primary))]">+{cartBonus} Б</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[hsl(var(--border))]">
                <span className="font-golos font-bold">Итого</span>
                <span className="font-golos font-bold text-xl">{cartTotal.toLocaleString()} ₽</span>
              </div>
            </div>
            <div className="mb-5 space-y-2">
              {[
                { icon: "Store", label: "Забрать в салоне", desc: "ул. Ленина, 45 · Бесплатно", active: true },
                { icon: "Truck", label: "Доставка", desc: "2–3 рабочих дня · 350 ₽", active: false },
              ].map(({ icon, label, desc, active }) => (
                <button key={label} className={`w-full p-3.5 border-2 rounded-2xl flex items-center gap-3 ${active ? "border-[hsl(var(--primary))] bg-[hsl(var(--orange-light))]" : "border-[hsl(var(--border))] bg-white"}`}>
                  <Icon name={icon} size={20} className={active ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-secondary))]"} />
                  <div className="text-left flex-1">
                    <p className={`font-golos font-semibold text-sm ${active ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--text-main))]"}`}>{label}</p>
                    <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">{desc}</p>
                  </div>
                  {active && <Icon name="Check" size={16} className="text-[hsl(var(--primary))]" />}
                </button>
              ))}
            </div>
            <button onClick={() => setOrdered(true)} className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow">
              Оформить заказ · {cartTotal.toLocaleString()} ₽
            </button>
          </>
        )}
      </div>
    );
  }

  /* LIST */
  return (
    <div className="px-5 pt-2 pb-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-golos font-bold text-xl text-[hsl(var(--text-main))]">Каталог товаров</h2>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Профессиональная косметика</p>
        </div>
        <button onClick={() => setShowCart(true)} className="relative w-10 h-10 gradient-orange rounded-xl flex items-center justify-center orange-glow">
          <Icon name="ShoppingCart" size={18} className="text-white" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(var(--text-main))] rounded-full text-white text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>

      <div className="relative mb-4">
        <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--text-secondary))]" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск товаров..." className="w-full pl-10 pr-4 py-3 bg-[hsl(var(--gray-soft))] rounded-xl font-golos text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/30" />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 mb-4">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap font-golos text-sm font-medium transition-all shrink-0 ${activeCategory === cat.id ? "gradient-orange text-white" : "bg-[hsl(var(--gray-soft))] text-[hsl(var(--text-secondary))]"}`}>
            <span>{cat.icon}</span><span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product, i) => {
          const inCart = cart.find(c => c.id === product.id);
          const isBooked = booked.includes(product.id);
          return (
            <div key={product.id} className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden card-shadow animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <button className="w-full" onClick={() => setDetail(product)}>
                <div className="relative h-36 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  {product.recommended && <div className="absolute top-2 left-2 bg-[hsl(var(--primary))] text-white text-[10px] font-golos font-bold px-2 py-0.5 rounded-lg">Рекомендуем</div>}
                  {!product.inStock && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><span className="font-golos text-xs font-semibold text-[hsl(var(--text-secondary))]">Нет в наличии</span></div>}
                  {isBooked && <div className="absolute top-2 right-2 w-7 h-7 bg-green-400 rounded-lg flex items-center justify-center"><Icon name="Bookmark" size={14} className="text-white fill-white" /></div>}
                </div>
              </button>
              <div className="p-3">
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{product.brand}</p>
                <button onClick={() => setDetail(product)} className="text-left w-full">
                  <p className="font-golos font-semibold text-sm text-[hsl(var(--text-main))] leading-tight mt-0.5">{product.name}</p>
                </button>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="font-golos font-bold text-[hsl(var(--text-main))] text-base">{product.price.toLocaleString()} ₽</p>
                    <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-medium">+{product.bonus} Б</p>
                  </div>
                  {product.inStock && (
                    inCart ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => removeFromCart(product.id)} className="w-7 h-7 bg-[hsl(var(--gray-soft))] rounded-lg flex items-center justify-center"><Icon name="Minus" size={12} /></button>
                        <span className="font-golos font-bold text-sm w-4 text-center">{inCart.qty}</span>
                        <button onClick={() => addToCart(product)} className="w-7 h-7 gradient-orange rounded-lg flex items-center justify-center"><Icon name="Plus" size={12} className="text-white" /></button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(product)} className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center transition-all active:scale-90">
                        <Icon name="Plus" size={16} className="text-[hsl(var(--primary))]" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-[hsl(var(--orange-light))] rounded-2xl p-4 flex items-center gap-3">
        <Icon name="Sparkles" size={20} className="text-[hsl(var(--primary))] shrink-0" />
        <p className="font-golos text-sm text-[hsl(var(--primary))]">За покупку начисляется <span className="font-bold">+5% от суммы</span> баллами</p>
      </div>

      {cartCount > 0 && (
        <button onClick={() => setShowCart(true)} className="fixed bottom-24 left-1/2 -translate-x-1/2 gradient-orange text-white font-golos font-semibold text-sm px-6 py-3.5 rounded-2xl orange-glow flex items-center gap-2 animate-scale-in z-10">
          <Icon name="ShoppingCart" size={18} />
          Корзина · {cartCount} · {cartTotal.toLocaleString()} ₽
        </button>
      )}
    </div>
  );
}
