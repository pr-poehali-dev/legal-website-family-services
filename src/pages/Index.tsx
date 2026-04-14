import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8dedaca7-973e-4a17-a304-9351a817434b/files/651ce42a-b399-4e0c-addc-a013cc38b007.jpg";

const services = [
  {
    icon: "FileText",
    title: "Исковое заявление о разводе",
    desc: "Составим заявление в суд с учётом раздела имущества, детей и места проживания",
    price: "от 1 990 ₽",
    tag: "Популярно",
  },
  {
    icon: "Heart",
    title: "Взыскание алиментов",
    desc: "Подготовим исковое на алименты в твёрдой сумме или долевом соотношении",
    price: "от 1 490 ₽",
    tag: null,
  },
  {
    icon: "Home",
    title: "Раздел имущества",
    desc: "Исковое заявление о разделе совместно нажитого имущества супругов",
    price: "от 2 490 ₽",
    tag: null,
  },
  {
    icon: "Users",
    title: "Определение места жительства",
    desc: "Заявление об определении порядка общения с ребёнком или места его проживания",
    price: "от 1 990 ₽",
    tag: null,
  },
  {
    icon: "Shield",
    title: "Оспаривание отцовства",
    desc: "Юридически грамотное заявление для оспаривания или установления отцовства",
    price: "от 2 990 ₽",
    tag: null,
  },
  {
    icon: "MessageSquare",
    title: "Личная консультация юриста",
    desc: "Персональная консультация по вашей ситуации — юрист свяжется с вами лично",
    price: "2 000 ₽",
    tag: "Срочно",
  },
];

const steps = [
  {
    num: "01",
    title: "Заполните анкету",
    desc: "Пошаговая форма с вопросами о вашей ситуации. Занимает 10–15 минут",
    icon: "ClipboardList",
  },
  {
    num: "02",
    title: "Оплатите заявку",
    desc: "Безопасная оплата онлайн. Сразу после оплаты начинается обработка",
    icon: "CreditCard",
  },
  {
    num: "03",
    title: "Получите документ",
    desc: "Готовое исковое заявление в формате Word — на вашу почту в течение часа",
    icon: "Download",
  },
];

const faqs = [
  {
    q: "Насколько юридически грамотны заявления?",
    a: "Все шаблоны разработаны практикующими юристами и соответствуют актуальным нормам ГПК РФ (ст. 131–132). Заявления регулярно обновляются при изменении законодательства.",
  },
  {
    q: "Можно ли подать такое заявление самостоятельно?",
    a: "Да. Готовое заявление вы просто распечатываете, подписываете и подаёте в суд. Мы прилагаем краткую инструкцию по подаче.",
  },
  {
    q: "Как быстро я получу документ?",
    a: "Обычно в течение 1 часа после оплаты. В сложных случаях — до 24 часов. Пришлём документ на указанный email.",
  },
  {
    q: "Что если мне нужна личная помощь?",
    a: "Закажите консультацию юриста за 2 000 ₽ — специалист свяжется с вами лично, изучит вашу ситуацию и ответит на все вопросы.",
  },
  {
    q: "Возможен ли возврат средств?",
    a: "Если вы не удовлетворены результатом, мы вернём деньги или бесплатно доработаем заявление.",
  },
  {
    q: "Мои данные в безопасности?",
    a: "Все данные передаются по защищённому соединению и не передаются третьим лицам. Хранение в соответствии с 152-ФЗ.",
  },
];

const stats = [
  { value: "3 200+", label: "Заявлений подготовлено" },
  { value: "94%", label: "Дел выиграно в суде" },
  { value: "1 час", label: "Среднее время готовности" },
  { value: "8 лет", label: "Юридическая практика" },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const navigate = useNavigate();

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="min-h-screen" style={{ background: "#080E1C", fontFamily: "'Golos Text', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Icon name="Scale" size={16} className="text-navy" />
            </div>
            <span className="font-cormorant text-xl font-bold text-gold-DEFAULT" style={{ color: "#D4A843" }}>ЮрДок</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#services" className="hover:text-gold transition-colors" style={{ color: "inherit" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}>Услуги</a>
            <a href="#how" className="hover:text-gold transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}>Как это работает</a>
            <a href="#faq" className="hover:text-gold transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}>Вопросы</a>
            <a href="#contact" className="hover:text-gold transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}>Контакты</a>
          </div>
          <button
            className="gradient-gold font-semibold px-5 py-2.5 rounded-lg hover-lift glow-gold-sm transition-all"
            style={{ background: "linear-gradient(135deg, #D4A843 0%, #F0C96A 50%, #C49030 100%)", color: "#080E1C", fontSize: "14px" }}
            onClick={() => navigate("/constructor")}
          >
            Начать заявку
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, opacity: 0.12 }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, #080E1C 0%, rgba(8,14,28,0.88) 40%, rgba(15,20,40,0.75) 100%)"
        }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 animate-float"
          style={{ background: "radial-gradient(circle, #D4A843 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, #3B5BFF 0%, transparent 70%)", filter: "blur(80px)", opacity: 0.06 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center">
          <div style={{ animation: "fadeIn 0.8s ease forwards" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ borderColor: "rgba(212,168,67,0.35)", background: "rgba(212,168,67,0.1)", color: "#D4A843", fontSize: "14px" }}>
              <Icon name="Shield" size={14} />
              <span>Профессиональная юридическая помощь онлайн</span>
            </div>
            <h1 className="font-cormorant font-bold leading-tight text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Исковые заявления{" "}
              <span className="shimmer-text">по семейным</span>
              {" "}делам
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
              Заполните анкету — получите готовый документ Word для подачи в суд.
              Разработано практикующими юристами. Быстро, надёжно, законно.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="font-bold px-8 py-4 rounded-xl text-lg hover-lift transition-all"
                style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)", color: "#080E1C", boxShadow: "0 0 30px rgba(212,168,67,0.3)" }}
                onClick={() => navigate("/constructor")}
              >
                Составить заявление →
              </button>
              <button
                className="px-8 py-4 rounded-xl text-lg transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)"; e.currentTarget.style.color = "#D4A843"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              >
                Консультация юриста
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              {[
                { icon: "Lock", text: "Данные защищены" },
                { icon: "Clock", text: "Готово за 1 час" },
                { icon: "RotateCcw", text: "Гарантия возврата" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon name={b.icon} size={14} style={{ color: "#D4A843" }} />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4" style={{ animation: "slideUp 0.8s ease 0.3s both" }}>
            {stats.map((s, i) => (
              <div key={i} className="rounded-2xl p-6 hover-lift"
                style={{ background: "linear-gradient(145deg, #141C2E 0%, #0F1520 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="font-cormorant text-4xl font-bold mb-2 shimmer-text">{s.value}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
            <div className="w-1 h-3 rounded-full" style={{ background: "#D4A843", animation: "float 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{ borderColor: "rgba(212,168,67,0.35)", background: "rgba(212,168,67,0.1)", color: "#D4A843", fontSize: "14px" }}>
              <Icon name="Briefcase" size={14} />
              <span>Наши услуги</span>
            </div>
            <h2 className="font-cormorant text-5xl font-bold text-white mb-4">Что мы составляем</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              Все документы юридически грамотны и готовы к подаче в суд
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="rounded-2xl p-6 hover-lift group cursor-pointer relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, #141C2E 0%, #0F1520 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {s.tag && (
                  <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)", color: "#080E1C" }}>
                    {s.tag}
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ border: "1px solid rgba(212,168,67,0.3)", background: "rgba(212,168,67,0.1)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "#D4A843" }} />
                </div>
                <h3 className="font-cormorant text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg" style={{ color: "#D4A843" }}>{s.price}</span>
                  <button className="text-sm flex items-center gap-1 transition-colors" style={{ color: "rgba(255,255,255,0.35)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                    Выбрать <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(212,168,67,0.04) 0%, transparent 70%)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{ borderColor: "rgba(212,168,67,0.35)", background: "rgba(212,168,67,0.1)", color: "#D4A843", fontSize: "14px" }}>
              <Icon name="Zap" size={14} />
              <span>Как это работает</span>
            </div>
            <h2 className="font-cormorant text-5xl font-bold text-white mb-4">Три простых шага</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>От анкеты до готового документа — за один час</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px"
              style={{ background: "linear-gradient(90deg, #D4A843, #F0C96A, #D4A843)" }}
            />
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 rounded-2xl flex flex-col items-center justify-center mx-auto mb-6 transition-all hover-lift"
                  style={{ background: "linear-gradient(145deg, #141C2E, #0F1520)", border: "1px solid rgba(212,168,67,0.3)" }}>
                  <Icon name={step.icon} size={32} style={{ color: "#D4A843" }} />
                  <span className="font-cormorant text-3xl font-bold mt-1" style={{ color: "rgba(255,255,255,0.15)" }}>{step.num}</span>
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button
              className="font-bold px-10 py-4 rounded-xl text-lg hover-lift transition-all"
              style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)", color: "#080E1C", boxShadow: "0 0 30px rgba(212,168,67,0.3)" }}
              onClick={() => navigate("/constructor")}
            >
              Начать прямо сейчас →
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CONSULTATION BLOCK ── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-14"
            style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.08) 0%, rgba(20,28,46,0.9) 100%)", border: "1px solid rgba(212,168,67,0.3)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: "radial-gradient(circle, #D4A843, transparent)", filter: "blur(60px)", opacity: 0.1 }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)", boxShadow: "0 0 30px rgba(212,168,67,0.3)" }}>
                <Icon name="Phone" size={36} style={{ color: "#080E1C" }} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-cormorant text-4xl font-bold text-white mb-3">
                  Нужна личная консультация?
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Оплатите 2 000 ₽ — и с вами лично свяжется практикующий юрист.
                  Разберёт вашу ситуацию, ответит на все вопросы, поможет с тактикой.
                </p>
              </div>
              <button
                className="font-bold px-8 py-4 rounded-xl text-base hover-lift whitespace-nowrap shrink-0"
                style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)", color: "#080E1C", boxShadow: "0 0 20px rgba(212,168,67,0.25)" }}
              >
                Заказать за 2 000 ₽
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{ borderColor: "rgba(212,168,67,0.35)", background: "rgba(212,168,67,0.1)", color: "#D4A843", fontSize: "14px" }}>
              <Icon name="HelpCircle" size={14} />
              <span>Частые вопросы</span>
            </div>
            <h2 className="font-cormorant text-5xl font-bold text-white mb-4">Вопросы и ответы</h2>
            <p style={{ color: "rgba(255,255,255,0.45)" }}>Ответы на самые частые вопросы о нашем сервисе</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  border: `1px solid ${openFaq === i ? "rgba(212,168,67,0.4)" : "rgba(255,255,255,0.06)"}`,
                  background: openFaq === i ? "rgba(212,168,67,0.05)" : "rgba(20,28,46,0.6)"
                }}>
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: openFaq === i ? "linear-gradient(135deg, #D4A843, #F0C96A)" : "transparent",
                      border: openFaq === i ? "none" : "1px solid rgba(255,255,255,0.2)"
                    }}>
                    <Icon
                      name={openFaq === i ? "Minus" : "Plus"}
                      size={14}
                      style={{ color: openFaq === i ? "#080E1C" : "rgba(255,255,255,0.5)" }}
                    />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", animation: "fadeIn 0.3s ease" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{ borderColor: "rgba(212,168,67,0.35)", background: "rgba(212,168,67,0.1)", color: "#D4A843", fontSize: "14px" }}>
              <Icon name="MessageCircle" size={14} />
              <span>Контакты</span>
            </div>
            <h2 className="font-cormorant text-5xl font-bold text-white mb-6">Свяжитесь с нами</h2>
            <p className="leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
              Есть вопросы? Напишите нам — ответим в течение часа в рабочее время.
            </p>

            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00" },
                { icon: "Mail", label: "Email", value: "info@yurdok.ru" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 9:00–20:00" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "linear-gradient(145deg, #141C2E, #0F1520)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ border: "1px solid rgba(212,168,67,0.3)", background: "rgba(212,168,67,0.1)" }}>
                    <Icon name={c.icon} size={18} style={{ color: "#D4A843" }} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{c.label}</div>
                    <div className="text-sm font-medium text-white">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8"
            style={{ background: "linear-gradient(145deg, #141C2E, #0F1520)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h3 className="font-cormorant text-2xl font-bold text-white mb-6">Форма обратной связи</h3>
            <div className="space-y-4">
              {[
                { label: "Ваше имя", placeholder: "Иван Иванов", type: "text", key: "name" },
                { label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel", key: "phone" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm mb-2 block" style={{ color: "rgba(255,255,255,0.45)" }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={contactForm[field.key as keyof typeof contactForm]}
                    onChange={e => setContactForm({ ...contactForm, [field.key]: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              ))}
              <div>
                <label className="text-sm mb-2 block" style={{ color: "rgba(255,255,255,0.45)" }}>Ваш вопрос</label>
                <textarea
                  placeholder="Опишите вашу ситуацию или задайте вопрос..."
                  rows={4}
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <button
                className="w-full font-bold py-4 rounded-xl text-base hover-lift transition-all mt-2"
                style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)", color: "#080E1C", boxShadow: "0 0 20px rgba(212,168,67,0.2)" }}
              >
                Отправить сообщение
              </button>
              <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.22)" }}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)" }}>
              <Icon name="Scale" size={14} style={{ color: "#080E1C" }} />
            </div>
            <span className="font-cormorant text-lg font-bold" style={{ color: "#D4A843" }}>ЮрДок</span>
          </div>
          <div className="text-sm text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2025 ЮрДок. Все права защищены. Информация не является юридической консультацией.
          </div>
          <div className="flex gap-6 text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
            {["Политика конфиденциальности", "Оферта"].map((link) => (
              <a key={link} href="#"
                onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                className="transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}