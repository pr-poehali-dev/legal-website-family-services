import { useState } from "react";
import Icon from "@/components/ui/icon";

/* ─── Типы дел ─── */
const CASE_TYPES = [
  {
    id: "divorce",
    icon: "FileText",
    title: "Развод",
    desc: "Расторжение брака через суд",
    price: "1 990 ₽",
    color: "#6C8EFF",
  },
  {
    id: "alimony",
    icon: "Heart",
    title: "Алименты",
    desc: "Взыскание алиментов на ребёнка",
    price: "1 490 ₽",
    color: "#FF6C8E",
  },
  {
    id: "property",
    icon: "Home",
    title: "Раздел имущества",
    desc: "Раздел совместно нажитого",
    price: "2 490 ₽",
    color: "#6CFFB8",
  },
  {
    id: "residence",
    icon: "Users",
    title: "Место жительства",
    desc: "Определение места проживания ребёнка",
    price: "1 990 ₽",
    color: "#FFB86C",
  },
  {
    id: "paternity",
    icon: "Shield",
    title: "Отцовство",
    desc: "Оспаривание или установление отцовства",
    price: "2 990 ₽",
    color: "#C96CFF",
  },
];

/* ─── Поля по типам дел ─── */
type Field = {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "select" | "radio" | "textarea";
  options?: string[];
  hint?: string;
};

type Step = {
  title: string;
  subtitle: string;
  fields: Field[];
};

const STEPS: Record<string, Step[]> = {
  divorce: [
    {
      title: "Стороны дела",
      subtitle: "Данные об истце и ответчике",
      fields: [
        { id: "plaintiff_name", label: "Ваши ФИО (полностью)", placeholder: "Иванова Мария Сергеевна", type: "text" },
        { id: "plaintiff_address", label: "Ваш адрес проживания", placeholder: "г. Москва, ул. Ленина, д. 1, кв. 5", type: "text" },
        { id: "defendant_name", label: "ФИО супруга/супруги", placeholder: "Иванов Алексей Петрович", type: "text" },
        { id: "defendant_address", label: "Адрес супруга/супруги", placeholder: "г. Москва, ул. Мира, д. 2, кв. 10", type: "text" },
      ],
    },
    {
      title: "Сведения о браке",
      subtitle: "Информация о заключении и браке",
      fields: [
        { id: "marriage_date", label: "Дата регистрации брака", placeholder: "15.06.2015", type: "text" },
        { id: "marriage_place", label: "Орган ЗАГС, где зарегистрирован брак", placeholder: "Отдел ЗАГС Пресненского района г. Москвы", type: "text" },
        { id: "separation_date", label: "Дата фактического прекращения совместного проживания", placeholder: "01.01.2024", type: "text" },
        {
          id: "divorce_reason",
          label: "Основная причина расторжения брака",
          placeholder: "",
          type: "select",
          options: [
            "Несходство характеров",
            "Злоупотребление алкоголем / наркотиками",
            "Измена",
            "Домашнее насилие",
            "Другое",
          ],
        },
      ],
    },
    {
      title: "Дети и имущество",
      subtitle: "Уточните наличие детей и споров",
      fields: [
        {
          id: "has_children",
          label: "Есть ли несовершеннолетние дети?",
          placeholder: "",
          type: "radio",
          options: ["Да", "Нет"],
        },
        { id: "children_info", label: "ФИО и дата рождения детей (если есть)", placeholder: "Иванов Никита Алексеевич, 12.03.2018", type: "text" },
        {
          id: "property_dispute",
          label: "Есть спор о разделе имущества?",
          placeholder: "",
          type: "radio",
          options: ["Да, нужно включить в иск", "Нет, решим отдельно", "Нет имущества"],
        },
        { id: "property_desc", label: "Краткое описание имущества (если есть спор)", placeholder: "Квартира по адресу..., автомобиль...", type: "textarea" },
      ],
    },
    {
      title: "Требования и суд",
      subtitle: "Что вы просите суд решить",
      fields: [
        { id: "court_name", label: "Наименование суда", placeholder: "Пресненский районный суд г. Москвы", type: "text", hint: "Как правило — районный суд по месту жительства ответчика" },
        {
          id: "alimony_claim",
          label: "Заявить требование об алиментах?",
          placeholder: "",
          type: "radio",
          options: ["Да", "Нет"],
        },
        { id: "contact_email", label: "Ваш email для получения документа", placeholder: "example@mail.ru", type: "text" },
        { id: "contact_phone", label: "Телефон для связи", placeholder: "+7 (___) ___-__-__", type: "text" },
      ],
    },
  ],

  alimony: [
    {
      title: "Стороны дела",
      subtitle: "Данные об истце и ответчике",
      fields: [
        { id: "plaintiff_name", label: "Ваши ФИО (полностью)", placeholder: "Иванова Мария Сергеевна", type: "text" },
        { id: "plaintiff_address", label: "Ваш адрес проживания", placeholder: "г. Москва, ул. Ленина, д. 1, кв. 5", type: "text" },
        { id: "defendant_name", label: "ФИО плательщика алиментов", placeholder: "Иванов Алексей Петрович", type: "text" },
        { id: "defendant_address", label: "Адрес плательщика", placeholder: "г. Москва, ул. Мира, д. 2, кв. 10", type: "text" },
      ],
    },
    {
      title: "Сведения о детях",
      subtitle: "Информация о детях",
      fields: [
        { id: "children_info", label: "ФИО и дата рождения детей", placeholder: "Иванов Никита Алексеевич, 12.03.2018", type: "textarea" },
        { id: "children_with", label: "С кем фактически проживают дети?", placeholder: "С матерью, истцом", type: "text" },
        {
          id: "alimony_type",
          label: "Форма взыскания алиментов",
          placeholder: "",
          type: "radio",
          options: ["Доля от дохода (1/4, 1/3, 1/2)", "Твёрдая денежная сумма", "Смешанная форма"],
        },
        { id: "alimony_amount", label: "Желаемый размер алиментов", placeholder: "1/4 дохода или 15 000 ₽/мес", type: "text" },
      ],
    },
    {
      title: "Трудоустройство и суд",
      subtitle: "Сведения о доходах и суде",
      fields: [
        {
          id: "defendant_job",
          label: "Трудоустроен ли ответчик официально?",
          placeholder: "",
          type: "radio",
          options: ["Да, официально", "Нет / неизвестно", "Самозанятый / ИП"],
        },
        { id: "defendant_employer", label: "Место работы ответчика (если известно)", placeholder: "ООО «Ромашка», г. Москва", type: "text" },
        { id: "court_name", label: "Наименование суда", placeholder: "Пресненский районный суд г. Москвы", type: "text" },
        { id: "contact_email", label: "Email для получения документа", placeholder: "example@mail.ru", type: "text" },
      ],
    },
  ],

  property: [
    {
      title: "Стороны дела",
      subtitle: "Данные об истце и ответчике",
      fields: [
        { id: "plaintiff_name", label: "Ваши ФИО", placeholder: "Иванова Мария Сергеевна", type: "text" },
        { id: "plaintiff_address", label: "Ваш адрес", placeholder: "г. Москва, ул. Ленина, д. 1, кв. 5", type: "text" },
        { id: "defendant_name", label: "ФИО супруга/супруги", placeholder: "Иванов Алексей Петрович", type: "text" },
        { id: "defendant_address", label: "Адрес супруга/супруги", placeholder: "г. Москва, ул. Мира, д. 2, кв. 10", type: "text" },
      ],
    },
    {
      title: "Имущество",
      subtitle: "Опишите совместно нажитое имущество",
      fields: [
        { id: "marriage_date", label: "Дата регистрации брака", placeholder: "15.06.2015", type: "text" },
        { id: "property_real_estate", label: "Недвижимость (адрес, площадь, стоимость)", placeholder: "Квартира: г. Москва, ул. Ленина, 1, кв. 5, 65 кв.м., ~7 млн руб.", type: "textarea" },
        { id: "property_vehicles", label: "Транспортные средства", placeholder: "Toyota Camry 2019 г., гос. номер А123БВ, ~1.5 млн руб.", type: "textarea" },
        { id: "property_other", label: "Иное имущество (вклады, бизнес и пр.)", placeholder: "Вклад в Сбербанке — 500 000 руб.", type: "textarea" },
      ],
    },
    {
      title: "Требования",
      subtitle: "Что вы хотите получить",
      fields: [
        { id: "share_claim", label: "Какую долю вы требуете?", placeholder: "1/2 от всего имущества", type: "text" },
        { id: "share_reason", label: "Обоснование (если отступаете от равенства долей)", placeholder: "Дети проживают со мной, я вкладывала личные средства...", type: "textarea" },
        { id: "court_name", label: "Наименование суда", placeholder: "Пресненский районный суд г. Москвы", type: "text" },
        { id: "contact_email", label: "Email для получения документа", placeholder: "example@mail.ru", type: "text" },
      ],
    },
  ],

  residence: [
    {
      title: "Стороны дела",
      subtitle: "Данные об истце и ответчике",
      fields: [
        { id: "plaintiff_name", label: "Ваши ФИО", placeholder: "Иванова Мария Сергеевна", type: "text" },
        { id: "plaintiff_address", label: "Ваш адрес", placeholder: "г. Москва, ул. Ленина, д. 1, кв. 5", type: "text" },
        { id: "defendant_name", label: "ФИО второго родителя", placeholder: "Иванов Алексей Петрович", type: "text" },
        { id: "defendant_address", label: "Адрес второго родителя", placeholder: "г. Москва, ул. Мира, д. 2, кв. 10", type: "text" },
      ],
    },
    {
      title: "Дети",
      subtitle: "Сведения о детях",
      fields: [
        { id: "children_info", label: "ФИО и дата рождения детей", placeholder: "Иванов Никита Алексеевич, 12.03.2018", type: "textarea" },
        { id: "children_current", label: "С кем сейчас проживают дети?", placeholder: "Фактически с матерью (истцом)", type: "text" },
        { id: "claim_type", label: "Что вы просите суд определить?", placeholder: "", type: "radio", options: ["Место жительства ребёнка", "Порядок общения с ребёнком", "Оба вопроса"] },
        { id: "schedule", label: "Желаемый график общения (если актуально)", placeholder: "Каждые выходные с пятницы по воскресенье", type: "text" },
      ],
    },
    {
      title: "Условия и суд",
      subtitle: "Дополнительные сведения",
      fields: [
        { id: "living_conditions", label: "Опишите ваши жилищные условия", placeholder: "Двухкомнатная квартира, отдельная комната для ребёнка...", type: "textarea" },
        { id: "plaintiff_income", label: "Ваш доход и занятость", placeholder: "Работаю официально, доход 80 000 ₽/мес", type: "text" },
        { id: "court_name", label: "Наименование суда", placeholder: "Пресненский районный суд г. Москвы", type: "text" },
        { id: "contact_email", label: "Email для получения документа", placeholder: "example@mail.ru", type: "text" },
      ],
    },
  ],

  paternity: [
    {
      title: "Стороны дела",
      subtitle: "Данные об истце и ответчике",
      fields: [
        { id: "plaintiff_name", label: "Ваши ФИО", placeholder: "Иванова Мария Сергеевна", type: "text" },
        { id: "plaintiff_address", label: "Ваш адрес", placeholder: "г. Москва, ул. Ленина, д. 1, кв. 5", type: "text" },
        { id: "defendant_name", label: "ФИО ответчика", placeholder: "Иванов Алексей Петрович", type: "text" },
        { id: "defendant_address", label: "Адрес ответчика", placeholder: "г. Москва, ул. Мира, д. 2, кв. 10", type: "text" },
      ],
    },
    {
      title: "Сведения о ребёнке",
      subtitle: "Информация о ребёнке и записи об отцовстве",
      fields: [
        { id: "child_info", label: "ФИО и дата рождения ребёнка", placeholder: "Иванов Никита Алексеевич, 12.03.2018", type: "text" },
        { id: "claim_type", label: "Цель заявления", placeholder: "", type: "radio", options: ["Установить отцовство", "Оспорить запись об отцовстве"] },
        { id: "registry_info", label: "Запись в свидетельстве о рождении (кто указан отцом)", placeholder: "Иванов Алексей Петрович", type: "text" },
        { id: "dna_test", label: "Готовы ли к ДНК-экспертизе?", placeholder: "", type: "radio", options: ["Да", "Нет", "Уже проведена"] },
      ],
    },
    {
      title: "Доказательства и суд",
      subtitle: "Дополнительные сведения",
      fields: [
        { id: "evidence", label: "Имеющиеся доказательства", placeholder: "Переписка, фото, свидетели, результат ДНК-теста...", type: "textarea" },
        { id: "court_name", label: "Наименование суда", placeholder: "Пресненский районный суд г. Москвы", type: "text" },
        { id: "contact_email", label: "Email для получения документа", placeholder: "example@mail.ru", type: "text" },
        { id: "contact_phone", label: "Телефон для связи", placeholder: "+7 (___) ___-__-__", type: "text" },
      ],
    },
  ],
};

/* ─── Компонент ─── */
export default function Constructor() {
  const [caseType, setCaseType] = useState<string | null>(null);
  const [step, setStep] = useState(0); // 0 = выбор типа, 1..N = шаги, N+1 = итог
  const [formData, setFormData] = useState<Record<string, string>>({});

  const selectedCase = CASE_TYPES.find((c) => c.id === caseType);
  const steps = caseType ? STEPS[caseType] : [];
  const currentStep = step > 0 ? steps[step - 1] : null;
  const isLastStep = step === steps.length;
  const isDone = step > steps.length;

  const totalSteps = steps.length;
  const progress = step === 0 ? 0 : Math.round((step / totalSteps) * 100);

  const handleField = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (step === 0 && caseType) { setStep(1); return; }
    if (isLastStep) { setStep(step + 1); return; }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    if (step === 1) { setStep(0); return; }
    setStep((s) => s - 1);
  };

  const canProceed = step === 0 ? !!caseType : true;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080E1C", fontFamily: "'Golos Text', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)" }}>
              <Icon name="Scale" size={16} style={{ color: "#080E1C" }} />
            </div>
            <span className="font-cormorant text-xl font-bold" style={{ color: "#D4A843" }}>ЮрДок</span>
          </a>

          {/* Progress bar */}
          {step > 0 && !isDone && (
            <div className="flex items-center gap-4 flex-1 mx-10">
              <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg, #D4A843, #F0C96A)" }} />
              </div>
              <span className="text-sm whitespace-nowrap" style={{ color: "rgba(255,255,255,0.4)" }}>
                Шаг {step} из {totalSteps}
              </span>
            </div>
          )}

          <a href="/" className="text-sm flex items-center gap-1 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D4A843")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
            <Icon name="X" size={14} /> Выйти
          </a>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-3xl">

          {/* ── STEP 0: Выбор типа дела ── */}
          {step === 0 && (
            <div style={{ animation: "fadeIn 0.5s ease" }}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5"
                  style={{ borderColor: "rgba(212,168,67,0.35)", background: "rgba(212,168,67,0.1)", color: "#D4A843", fontSize: "13px" }}>
                  <Icon name="ClipboardList" size={13} />
                  <span>Шаг 1 из 1 — выбор типа дела</span>
                </div>
                <h1 className="font-cormorant text-4xl md:text-5xl font-bold text-white mb-3">
                  Какой документ составить?
                </h1>
                <p style={{ color: "rgba(255,255,255,0.45)" }}>Выберите тип искового заявления</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {CASE_TYPES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCaseType(c.id)}
                    className="text-left rounded-2xl p-5 transition-all hover-lift"
                    style={{
                      background: caseType === c.id
                        ? `linear-gradient(145deg, rgba(${hexToRgb(c.color)},0.15), rgba(${hexToRgb(c.color)},0.05))`
                        : "linear-gradient(145deg, #141C2E, #0F1520)",
                      border: caseType === c.id
                        ? `1.5px solid ${c.color}60`
                        : "1px solid rgba(255,255,255,0.07)",
                      boxShadow: caseType === c.id ? `0 0 20px rgba(${hexToRgb(c.color)},0.15)` : "none",
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `rgba(${hexToRgb(c.color)},0.15)`, border: `1px solid rgba(${hexToRgb(c.color)},0.3)` }}>
                      <Icon name={c.icon} size={20} style={{ color: c.color }} />
                    </div>
                    <div className="font-semibold text-white mb-1">{c.title}</div>
                    <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{c.desc}</div>
                    <div className="text-sm font-bold" style={{ color: "#D4A843" }}>{c.price}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="font-bold px-8 py-4 rounded-xl text-base transition-all"
                  style={{
                    background: canProceed ? "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)" : "rgba(255,255,255,0.08)",
                    color: canProceed ? "#080E1C" : "rgba(255,255,255,0.3)",
                    boxShadow: canProceed ? "0 0 25px rgba(212,168,67,0.25)" : "none",
                    cursor: canProceed ? "pointer" : "not-allowed",
                  }}
                >
                  Продолжить →
                </button>
              </div>
            </div>
          )}

          {/* ── STEPS 1..N: Поля анкеты ── */}
          {step > 0 && currentStep && !isDone && (
            <div key={step} style={{ animation: "fadeIn 0.4s ease" }}>
              {/* Step header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  {selectedCase && (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `rgba(${hexToRgb(selectedCase.color)},0.15)`, border: `1px solid rgba(${hexToRgb(selectedCase.color)},0.3)` }}>
                      <Icon name={selectedCase.icon} size={16} style={{ color: selectedCase.color }} />
                    </div>
                  )}
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {selectedCase?.title} · Шаг {step} из {totalSteps}
                  </span>
                </div>
                <h2 className="font-cormorant text-4xl font-bold text-white">{currentStep.title}</h2>
                <p className="mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{currentStep.subtitle}</p>
              </div>

              {/* Fields */}
              <div className="rounded-2xl p-6 md:p-8 mb-6 space-y-6"
                style={{ background: "linear-gradient(145deg, #141C2E, #0F1520)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {currentStep.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium mb-2 text-white">{field.label}</label>
                    {field.hint && (
                      <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>💡 {field.hint}</p>
                    )}

                    {field.type === "text" && (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={e => handleField(field.id, e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    )}

                    {field.type === "textarea" && (
                      <textarea
                        placeholder={field.placeholder}
                        rows={3}
                        value={formData[field.id] || ""}
                        onChange={e => handleField(field.id, e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    )}

                    {field.type === "select" && field.options && (
                      <select
                        value={formData[field.id] || ""}
                        onChange={e => handleField(field.id, e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        style={{
                          background: "rgba(20,28,46,0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: formData[field.id] ? "white" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        <option value="" disabled>Выберите вариант...</option>
                        {field.options.map(opt => (
                          <option key={opt} value={opt} style={{ background: "#141C2E", color: "white" }}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {field.type === "radio" && field.options && (
                      <div className="flex flex-wrap gap-3 mt-1">
                        {field.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => handleField(field.id, opt)}
                            className="px-4 py-2.5 rounded-xl text-sm transition-all"
                            style={{
                              background: formData[field.id] === opt ? "rgba(212,168,67,0.15)" : "rgba(255,255,255,0.04)",
                              border: formData[field.id] === opt ? "1.5px solid rgba(212,168,67,0.5)" : "1px solid rgba(255,255,255,0.1)",
                              color: formData[field.id] === opt ? "#D4A843" : "rgba(255,255,255,0.6)",
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button onClick={handleBack} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm transition-all"
                  style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                  <Icon name="ArrowLeft" size={14} /> Назад
                </button>

                <button onClick={handleNext} className="font-bold px-8 py-3 rounded-xl text-base transition-all hover-lift"
                  style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)", color: "#080E1C", boxShadow: "0 0 20px rgba(212,168,67,0.25)" }}>
                  {isLastStep ? "Проверить и оплатить →" : "Следующий шаг →"}
                </button>
              </div>
            </div>
          )}

          {/* ── ИТОГ: Сводка перед оплатой ── */}
          {isDone && selectedCase && (
            <div style={{ animation: "fadeIn 0.5s ease" }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A)", boxShadow: "0 0 30px rgba(212,168,67,0.4)" }}>
                  <Icon name="CheckCircle" size={30} style={{ color: "#080E1C" }} />
                </div>
                <h2 className="font-cormorant text-4xl font-bold text-white mb-2">Анкета заполнена!</h2>
                <p style={{ color: "rgba(255,255,255,0.45)" }}>Проверьте данные и перейдите к оплате</p>
              </div>

              {/* Summary card */}
              <div className="rounded-2xl p-6 mb-6"
                style={{ background: "linear-gradient(145deg, #141C2E, #0F1520)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `rgba(${hexToRgb(selectedCase.color)},0.15)`, border: `1px solid rgba(${hexToRgb(selectedCase.color)},0.3)` }}>
                    <Icon name={selectedCase.icon} size={20} style={{ color: selectedCase.color }} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{selectedCase.title}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Исковое заявление</div>
                  </div>
                  <div className="ml-auto font-bold text-xl" style={{ color: "#D4A843" }}>{selectedCase.price}</div>
                </div>

                <div className="space-y-3">
                  {Object.entries(formData).filter(([, v]) => v).map(([key, value]) => {
                    const allFields = steps.flatMap(s => s.fields);
                    const field = allFields.find(f => f.id === key);
                    return field ? (
                      <div key={key} className="flex justify-between gap-4 text-sm">
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>{field.label}</span>
                        <span className="text-white text-right max-w-xs truncate">{value}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="rounded-xl p-4 mb-6 flex gap-3"
                style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.2)" }}>
                <Icon name="Info" size={16} className="shrink-0 mt-0.5" style={{ color: "#D4A843" }} />
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Сервис оказывает помощь в составлении документов и не является адвокатским бюро.
                  Готовый файл вы получите на email в течение 1 часа после оплаты. Данные обрабатываются согласно 152-ФЗ.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setStep(totalSteps)} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm transition-all"
                  style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                  <Icon name="ArrowLeft" size={14} /> Изменить данные
                </button>
                <button className="flex-1 font-bold py-4 rounded-xl text-base hover-lift transition-all"
                  style={{ background: "linear-gradient(135deg, #D4A843, #F0C96A, #C49030)", color: "#080E1C", boxShadow: "0 0 25px rgba(212,168,67,0.3)" }}>
                  Оплатить {selectedCase.price} и получить документ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* helper */
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
