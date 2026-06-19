import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PROFILE_IMG = "https://cdn.poehali.dev/projects/c62f3c86-4f40-47f9-a8bf-18e3ff8689ae/files/16cbc8c4-ea9d-4083-9fff-12c510e31a77.jpg";

type Sub = null | "notifications" | "privacy" | "agreement" | "consent" | "account";

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [sub, setSub] = useState<Sub>(null);

  // Account fields
  const [name, setName]   = useState("Петрова Анна Николаевна");
  const [phone, setPhone] = useState("+7 (916) 123-45-67");
  const [email, setEmail] = useState("anna.petrova@mail.ru");
  const [bday, setBday]   = useState("15 марта 1988");
  const [notes, setNotes] = useState("Аллергия на миндальное масло");

  // Notification toggles
  const [notifPush,     setNotifPush]     = useState(true);
  const [notifSms,      setNotifSms]      = useState(false);
  const [notifBooking,  setNotifBooking]  = useState(true);
  const [notifBonus,    setNotifBonus]    = useState(true);
  const [notifPromo,    setNotifPromo]    = useState(true);
  const [notifChat,     setNotifChat]     = useState(true);
  const [notifBirthday, setNotifBirthday] = useState(true);

  const Toggle = ({ val, set }: { val: boolean; set: (v: boolean) => void }) => (
    <button onClick={() => set(!val)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${val ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${val ? "right-0.5" : "left-0.5"}`} />
    </button>
  );

  const BackBtn = ({ to }: { to: Sub }) => (
    <button onClick={() => setSub(to)}
      className="w-9 h-9 bg-white border border-[hsl(var(--border))] rounded-xl flex items-center justify-center shadow-sm shrink-0">
      <Icon name="ChevronLeft" size={18} className="text-[hsl(var(--text-secondary))]" />
    </button>
  );

  /* ── ACCOUNT ── */
  if (sub === "account") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Данные аккаунта</h2>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3 shadow-sm shrink-0">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))]">
              <img src={PROFILE_IMG} alt="Фото" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 gradient-orange rounded-lg flex items-center justify-center orange-glow">
              <Icon name="Camera" size={12} className="text-white" />
            </button>
          </div>
          <div>
            <p className="font-golos font-bold text-base text-[hsl(var(--text-main))]">{name}</p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">⭐ Постоянный гость</p>
            <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold mt-0.5">Нажмите на фото, чтобы изменить</p>
          </div>
        </div>

        {/* Fields */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          {[
            { label: "Имя и фамилия", value: name,  setter: setName,  icon: "User",        type: "text"  },
            { label: "Телефон",       value: phone, setter: setPhone, icon: "Phone",       type: "tel"   },
            { label: "Email",         value: email, setter: setEmail, icon: "Mail",        type: "email" },
            { label: "День рождения", value: bday,  setter: setBday,  icon: "Gift",        type: "text"  },
            { label: "Особенности",   value: notes, setter: setNotes, icon: "AlertCircle", type: "text"  },
          ].map(({ label, value, setter, icon, type }, i, arr) => (
            <div key={i} className={`px-4 py-3.5 flex items-center gap-3 ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={14} className="text-[hsl(var(--primary))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{label}</p>
                <input
                  type={type}
                  value={value}
                  onChange={e => setter(e.target.value)}
                  className="font-golos text-sm font-medium text-[hsl(var(--text-main))] w-full outline-none bg-transparent border-b border-transparent focus:border-[hsl(var(--primary))] transition-colors pb-0.5 mt-0.5"
                />
              </div>
              <Icon name="Pencil" size={13} className="text-[hsl(var(--text-secondary))] shrink-0" />
            </div>
          ))}
        </div>

        <button className="w-full py-4 gradient-orange text-white font-golos font-semibold rounded-2xl orange-glow">
          Сохранить изменения
        </button>

        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          <button className="w-full px-4 py-3.5 flex items-center gap-3 border-b border-[hsl(var(--border))]">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center">
              <Icon name="Lock" size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))] flex-1 text-left">Изменить пароль</p>
            <Icon name="ChevronRight" size={15} className="text-[hsl(var(--text-secondary))]" />
          </button>
          <button className="w-full px-4 py-3.5 flex items-center gap-3">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center">
              <Icon name="CreditCard" size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Привязанная карта</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">•••• •••• •••• 4242 · Visa</p>
            </div>
            <button className="font-golos text-xs font-bold text-red-400">Отвязать</button>
          </button>
        </div>

        <button className="w-full py-3 font-golos text-xs text-red-400 text-center">
          Удалить аккаунт и все данные
        </button>
      </div>
    );
  }

  /* ── NOTIFICATIONS ── */
  if (sub === "notifications") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-lg text-[hsl(var(--text-main))]">Уведомления и напоминания</h2>
        </div>

        {/* Channels */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-2">Каналы доставки</p>
          {[
            { label: "Push-уведомления", desc: "Всплывающие уведомления на телефоне", val: notifPush, set: setNotifPush },
            { label: "SMS-сообщения",    desc: "На привязанный номер телефона",        val: notifSms,  set: setNotifSms  },
          ].map(({ label, desc, val, set }, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3.5 ${i === 0 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div>
                <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
              </div>
              <Toggle val={val} set={set} />
            </div>
          ))}
        </div>

        {/* Types */}
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-2">Типы уведомлений</p>
          {[
            { icon: "Calendar",      label: "Записи и напоминания",  desc: "За 1 день и 1 час до визита",  val: notifBooking,  set: setNotifBooking  },
            { icon: "Sparkles",      label: "Баллы и бонусы",        desc: "Начисление и сгорание баллов", val: notifBonus,    set: setNotifBonus    },
            { icon: "Gift",          label: "Акции и предложения",   desc: "Персональные скидки",          val: notifPromo,    set: setNotifPromo    },
            { icon: "MessageCircle", label: "Сообщения мастеров",    desc: "Ответы в чате",                val: notifChat,     set: setNotifChat     },
            { icon: "Cake",          label: "День рождения",          desc: "+200 Б в ваш праздник",        val: notifBirthday, set: setNotifBirthday },
          ].map(({ icon, label, desc, val, set }, i, arr) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
              <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
                <Icon name={icon} size={14} className="text-[hsl(var(--primary))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
                <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
              </div>
              <Toggle val={val} set={set} />
            </div>
          ))}
        </div>

        <div className="bg-[hsl(var(--orange-light))] border border-[hsl(var(--primary))]/15 rounded-2xl px-4 py-3 flex items-start gap-3">
          <Icon name="Info" size={14} className="text-[hsl(var(--primary))] shrink-0 mt-0.5" />
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">
            Напоминания о записи нельзя отключить полностью — это важная функция безопасности, чтобы вы не пропустили визит.
          </p>
        </div>
      </div>
    );
  }

  /* ── PRIVACY ── */
  if (sub === "privacy") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-base text-[hsl(var(--text-main))]">Политика конфиденциальности</h2>
        </div>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-4 shadow-sm space-y-4">
          <div className="bg-[hsl(var(--orange-light))] rounded-xl px-3 py-2.5">
            <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold leading-relaxed">Основание: п. 2 ч. 1 ст. 18.1, ст. 3, 6, 9, 10, 11, 14, 18, 19, 21 Федерального закона от 27.07.2006 № 152-ФЗ; ст. 149-ФЗ; ст. 152.1 ГК РФ; Постановление Правительства РФ № 1514.</p>
          </div>
          {[
            ["1. Общие положения", "Оператор: ЧПОУ «ППП» (ИНН 5248012152, ОГРН 1025201678875). Юридический адрес: 606503, Нижегородская область, Городецкий район, г. Городец, ул. Фурманова, д. 19.\n\nПолитика регулирует обработку данных всех пользователей мобильного приложения салона красоты «Модерн» и является публичным документом."],
            ["2. Перечень обрабатываемых данных (ст. 3, 10, 11 152-ФЗ)", "• Идентификационные: Фамилия, Имя, Отчество.\n• Контактные: Номер телефона, адрес эл. почты.\n• Сервисные: История записей, услуги, мастера, комментарии, аллергии и медицинские ограничения.\n• Финансовые (лояльность): Баланс баллов, история начислений/списаний, уровень клиента.\n• Семейные: Имя, возраст, особенности членов семьи.\n• Изображения: Фото профиля и фото-отзывы «до/после» (не являются биометрическими по ст. 11 152-ФЗ, так как не используются для установления личности).\n• Технические: IP-адрес, тип устройства, версия ОС, идентификаторы cookie."],
            ["3. Цели обработки (ст. 6 152-ФЗ)", "1. Исполнение договора: идентификация клиента при записи, ведение расписания, история визитов.\n2. Программа лояльности: расчёт бонусов, присвоение статусов.\n3. Коммуникация: сервисные уведомления (подтверждение, напоминания за сутки и за 2 часа, перенос/отмена). Маркетинговые сообщения — только с отдельного согласия (ст. 18 Закона о рекламе).\n4. Публикация контента: фото-отзывы в галерее на основании отдельного согласия (ст. 152.1 ГК РФ).\n5. Улучшение сервиса: персонализация предложений и рекомендации.\n6. Техническое обеспечение: поддержка работоспособности и защита от несанкционированного доступа."],
            ["4. Правовые основания и сроки (ст. 5, 9 152-ФЗ)", "Основания: согласие пользователя и исполнение договора.\n\nСрок хранения: до отзыва согласия или до истечения сроков исковой давности (3 года), но не более 5 лет с даты последнего визита. По истечении данные уничтожаются (ст. 21 152-ФЗ).\n\nЛокализация: базы хранятся исключительно на серверах в РФ (ст. 18 152-ФЗ). Трансграничная передача не осуществляется."],
            ["5. Права пользователя (ст. 14, 17 152-ФЗ)", "• Требовать уточнения, блокировки или уничтожения своих данных.\n• Отозвать согласие в любой момент (письменно на юрадрес или через форму в приложении).\n• Удалить учётную запись через «Настройки» → «Удалить аккаунт» (данные стираются в течение 30 дней).\n• Обжаловать действия оператора в Роскомнадзор или суд."],
            ["6. Меры защиты (ст. 19 152-ФЗ)", "Применяются: шифрование SSL/TLS, разграничение прав доступа сотрудников, двухфакторная аутентификация при входе в админ-панель, регулярное резервное копирование и антивирусный контроль."],
            ["7. Изменения", "Оператор вправе изменять Политику. Новая редакция публикуется в приложении за 10 дней до вступления в силу. Продолжение использования означает согласие."],
          ].map(([title, text]) => (
            <div key={title as string}>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] mb-1">{title}</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed whitespace-pre-line">{text}</p>
            </div>
          ))}
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] pt-2 border-t border-[hsl(var(--border))]">Расширенная редакция · 19 июня 2026 г.</p>
        </div>
      </div>
    );
  }

  /* ── AGREEMENT ── */
  if (sub === "agreement") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-base text-[hsl(var(--text-main))]">Пользовательское соглашение</h2>
        </div>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-4 shadow-sm space-y-4">
          <div className="bg-[hsl(var(--orange-light))] rounded-xl px-3 py-2.5">
            <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold leading-relaxed">Основание: ст. 435, 438, 779, 781 ГК РФ; Закон РФ № 2300-1 «О защите прав потребителей»; Постановление Правительства № 1514; ст. 1225, 1252 ГК РФ; 54-ФЗ.</p>
          </div>
          {[
            ["1. Предмет соглашения", "Оператор (ЧПОУ «ППП») предоставляет пользователю доступ к функционалу приложения на условиях безвозмездного использования (лицензия).\n\nПриложение является инструментом для дистанционного заказа услуг салона красоты «Модерн» (онлайн-запись), участия в бонусной программе, покупки товаров из каталога.\n\nАкцепт: нажатие «Зарегистрироваться» или «Принимаю» при первом запуске означает полное согласие с текстом соглашения (ст. 438 ГК РФ)."],
            ["2. Регистрация и достоверность данных", "Регистрация обязательна по номеру телефона с подтверждением через SMS-код.\n\nПользователь обязуется указывать актуальное ФИО и контактные данные. Предоставление заведомо ложных сведений является основанием для блокировки учётной записи.\n\nПользователь несёт полную ответственность за сохранность пароля и за все действия под его учётной записью."],
            ["3. Порядок записи, отмены и переноса (Правила № 1514)", "Запись считается оформленной после получения уведомления со статусом «Подтверждено» в разделе «Мои записи».\n\nПеренос и отмена: не позднее чем за 2 часа до визита. При более позднем отказе услуга считается оказанной и подлежит оплате либо списываются штрафные бонусы.\n\nОпоздание: функция «Я опаздываю» уведомляет администратора. Время ожидания мастера — не более 15 минут. При опоздании свыше 15 минут запись аннулируется с удержанием бонусов или полной стоимости."],
            ["4. Интеллектуальная собственность (ст. 1225, 1252 ГК РФ)", "Дизайн, интерфейс, логотип, тексты и программный код приложения являются интеллектуальной собственностью Оператора. Копирование, декомпиляция или перепродажа запрещены.\n\nЗагружая фото-отзывы, пользователь предоставляет Оператору неисключительную лицензию на публичный показ в галерее и социальных сетях с указанием авторства."],
            ["5. Программа лояльности и бонусы", "Бонусы начисляются в рублёвом эквиваленте (1 балл = 1 рубль) за визиты, покупки товаров, отзывы и в рамках акций.\n\nБонусы можно списать на оплату до 100% стоимости услуги или товара.\n\nСгорание: при отсутствии посещений более 180 дней неиспользованные бонусы аннулируются. Уведомление приходит за 30 дней."],
            ["6. Оплата услуг и товаров (54-ФЗ)", "Оплата через приложение осуществляется с помощью интегрированного платёжного модуля. Факт оплаты фиксируется электронным чеком, который направляется на e-mail или в личный кабинет.\n\nПредоплата (депозит) может взиматься при записи на дорогостоящие процедуры (от 5 000 руб.). Отмена позднее 2 часов влечёт возврат за вычетом фактически понесённых расходов (ст. 32 Закона о защите прав потребителей)."],
            ["7. Ответственность сторон (ст. 401 ГК РФ)", "Оператор не несёт ответственности за качество работы мастера. Претензии по качеству принимаются в порядке Закона о защите прав потребителей (ст. 29).\n\nОператор освобождается от ответственности за перебои, вызванные сбоями провайдеров, хакерскими атаками или обстоятельствами непреодолимой силы.\n\nПользователь несёт ответственность за убытки, причинённые предоставлением недостоверных данных или нарушением правил отмены."],
            ["8. Заключительные положения", "Соглашение регулируется законодательством РФ. Споры рассматриваются в Арбитражном суде Нижегородской области или суде общей юрисдикции по месту нахождения Оператора (досудебный претензионный порядок — 30 дней).\n\nОператор вправе изменять условия с публикацией изменений в приложении. Продолжение использования является акцептом изменений."],
          ].map(([title, text]) => (
            <div key={title as string}>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] mb-1">{title}</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed whitespace-pre-line">{text}</p>
            </div>
          ))}
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] pt-2 border-t border-[hsl(var(--border))]">Расширенная редакция (оферта) · 19 июня 2026 г.</p>
        </div>
      </div>
    );
  }

  /* ── CONSENT ── */
  if (sub === "consent") {
    return (
      <div className="flex flex-col h-full px-4 pt-2 pb-4 gap-3 animate-slide-in-right overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 shrink-0">
          <BackBtn to={null} />
          <h2 className="font-golos font-bold text-base text-[hsl(var(--text-main))]">Согласие на обработку данных</h2>
        </div>
        <div className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-4 shadow-sm space-y-4">
          <div className="bg-[hsl(var(--orange-light))] rounded-xl px-3 py-2.5">
            <p className="font-golos text-[10px] text-[hsl(var(--primary))] font-semibold leading-relaxed">Отдельный обязательный документ · ст. 9 Федерального закона № 152-ФЗ от 27.07.2006</p>
          </div>
          <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
            Действуя свободно, своей волей и в своём интересе (ст. 9 152-ФЗ), я даю согласие <span className="font-semibold text-[hsl(var(--text-main))]">ЧПОУ «ППП»</span> (ИНН 5248012152, ОГРН 1025201678875, адрес: 606503, г. Городец, ул. Фурманова, д. 19) на смешанную обработку (с использованием средств автоматизации и без) моих персональных данных (ст. 3 152-ФЗ), включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, обезличивание, блокирование, удаление и уничтожение для следующих целей:
          </p>
          {[
            ["Цели обработки", "1. Предоставление услуг салона «Модерн» (онлайн-запись, выбор мастера, история визитов).\n2. Участие в программе лояльности и начисление бонусов.\n3. Информирование о статусе записей, акциях и предложениях (SMS и push-уведомления; право отписаться от рекламных рассылок в любое время).\n4. Публикация отзывов в галерее приложения."],
            ["Перечень передаваемых данных", "ФИО, номер телефона, e-mail, история записей, услуги, предпочтения, аллергии/медицинские ограничения, данные членов семьи (имя, возраст), фото профиля, фото-отзывы, IP-адрес, данные об устройстве."],
            ["Срок действия", "С момента регистрации до момента отзыва согласия, либо до истечения 5 лет с последнего взаимодействия."],
            ["Порядок отзыва", "Письменное заявление на юридический адрес оператора или через кнопку «Удалить аккаунт» в настройках приложения. При отзыве оператор обязан прекратить обработку и уничтожить данные в срок не более 30 (тридцати) рабочих дней (ст. 21 152-ФЗ)."],
            ["Ваши права", "Вам разъяснены права на доступ к данным, их уточнение и блокировку, а также право обжалования действий оператора в Роскомнадзор (ст. 14, 17 152-ФЗ)."],
          ].map(([title, text]) => (
            <div key={title as string}>
              <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] mb-1">{title}</p>
              <p className="font-golos text-sm text-[hsl(var(--text-secondary))] leading-relaxed whitespace-pre-line">{text}</p>
            </div>
          ))}
          <div className="border border-[hsl(var(--primary))]/30 bg-[hsl(var(--orange-light))] rounded-xl px-3 py-3 space-y-2">
            <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))]">Отдельное согласие на публикацию фотоизображений</p>
            <p className="font-golos text-xs text-[hsl(var(--text-secondary))] leading-relaxed">Я даю отдельное согласие на публикацию моих фотоизображений (включая фото «до/после») в открытой галерее приложения и социальных сетях салона. Я подтверждаю, что изображённые лица дали согласие, и использование фото не нарушает их прав (ст. 152.1 ГК РФ). Согласие может быть отозвано путём удаления фото-отзыва из приложения.</p>
          </div>
          <div className="border border-[hsl(var(--border))] rounded-xl px-3 py-3">
            <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] leading-relaxed">При регистрации в приложении проставление галочек и нажатие кнопки «Подтверждаю» приравнивается к собственноручной подписи (ст. 438 ГК РФ).</p>
          </div>
          <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))] pt-2 border-t border-[hsl(var(--border))]">Обязательный документ · ст. 9 152-ФЗ · 19 июня 2026 г.</p>
        </div>
      </div>
    );
  }

  /* ── MAIN SETTINGS ── */
  return (
    <div className="flex flex-col h-full px-4 pt-1 pb-4 gap-3 animate-fade-in overflow-y-auto scrollbar-hide">

      <p className="font-golos font-bold text-lg text-[hsl(var(--text-main))] shrink-0">Настройки</p>

      {/* Account block */}
      <button onClick={() => setSub("account")}
        className="bg-white border border-[hsl(var(--border))] rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm w-full text-left">
        <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-[hsl(var(--primary))] shrink-0">
          <img src={PROFILE_IMG} alt="Аккаунт" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-golos font-bold text-sm text-[hsl(var(--text-main))] truncate">{name}</p>
          <p className="font-golos text-xs text-[hsl(var(--text-secondary))]">Данные аккаунта и карта</p>
        </div>
        <Icon name="ChevronRight" size={18} className="text-[hsl(var(--text-secondary))] shrink-0" />
      </button>

      {/* Notifications */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
        <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Уведомления</p>
        <button onClick={() => setSub("notifications")}
          className="w-full px-4 py-3.5 flex items-center gap-3 text-left border-b border-[hsl(var(--border))]">
          <div className="w-8 h-8 bg-[hsl(var(--orange-light))] rounded-xl flex items-center justify-center shrink-0">
            <Icon name="Bell" size={15} className="text-[hsl(var(--primary))]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Уведомления и напоминания</p>
            <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Push, SMS, типы уведомлений</p>
          </div>
          <Icon name="ChevronRight" size={15} className="text-[hsl(var(--text-secondary))] shrink-0" />
        </button>
        {/* Quick toggles */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
              <Icon name="Smartphone" size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div>
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">Push-уведомления</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Включены</p>
            </div>
          </div>
          <button onClick={() => setNotifPush(!notifPush)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifPush ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifPush ? "right-0.5" : "left-0.5"}`} />
          </button>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
              <Icon name="MessageSquare" size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div>
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">SMS-напоминания</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">Отключены</p>
            </div>
          </div>
          <button onClick={() => setNotifSms(!notifSms)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifSms ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifSms ? "right-0.5" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
        <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Документы</p>
        {[
          { icon: "Lock",     label: "Политика конфиденциальности", desc: "Как мы храним ваши данные",        action: () => setSub("privacy")   },
          { icon: "FileText", label: "Пользовательское соглашение",  desc: "Условия использования сервиса",   action: () => setSub("agreement") },
          { icon: "Shield",   label: "Согласие на обработку данных", desc: "Ваши права и наши обязательства", action: () => setSub("consent")   },
        ].map(({ icon, label, desc, action }, i, arr) => (
          <button key={i} onClick={action}
            className={`w-full px-4 py-3.5 flex items-center gap-3 text-left ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
              <Icon name={icon} size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
            </div>
            <Icon name="ChevronRight" size={14} className="text-[hsl(var(--text-secondary))] shrink-0" />
          </button>
        ))}
      </div>

      {/* App */}
      <div className="bg-white border border-[hsl(var(--border))] rounded-2xl overflow-hidden shadow-sm">
        <p className="font-golos font-bold text-xs text-[hsl(var(--text-secondary))] uppercase tracking-wider px-4 pt-3 pb-1">Приложение</p>
        {[
          { icon: "Star",          label: "Оценить приложение",      desc: "App Store / Google Play",        action: () => {} },
          { icon: "MessageSquare", label: "Написать в поддержку",    desc: "support@modern-salon.ru",        action: () => onNavigate("chat") },
          { icon: "Info",          label: "О приложении",            desc: "Версия 1.0.0 · Салон «Модерн»",  action: () => {} },
        ].map(({ icon, label, desc, action }, i, arr) => (
          <button key={i} onClick={action}
            className={`w-full px-4 py-3.5 flex items-center gap-3 text-left ${i < arr.length - 1 ? "border-b border-[hsl(var(--border))]" : ""}`}>
            <div className="w-8 h-8 bg-[hsl(var(--gray-soft))] rounded-xl flex items-center justify-center shrink-0">
              <Icon name={icon} size={14} className="text-[hsl(var(--text-secondary))]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-golos text-sm font-medium text-[hsl(var(--text-main))]">{label}</p>
              <p className="font-golos text-[10px] text-[hsl(var(--text-secondary))]">{desc}</p>
            </div>
            <Icon name="ChevronRight" size={14} className="text-[hsl(var(--text-secondary))] shrink-0" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full py-3.5 border border-red-100 bg-red-50 rounded-2xl font-golos font-medium text-red-500 text-sm flex items-center justify-center gap-2">
        <Icon name="LogOut" size={15} />
        Выйти из аккаунта
      </button>

      <button className="font-golos text-xs text-[hsl(var(--text-secondary))] text-center pb-2">
        Удалить аккаунт и все данные
      </button>
    </div>
  );
}