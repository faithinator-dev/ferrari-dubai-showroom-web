import { useEffect, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FERRARI_MODELS } from '../data/showroomData';

export type ConsultationType =
  | 'Private Gallery Viewing'
  | 'Tailor Made Atelier'
  | 'Autodrome Track Drive'
  | 'Live Virtual Walkthrough';

interface ContactSectionProps {
  preselectedModel: string;
  preselectedFormat: ConsultationType;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
}

const CONSULTATION_TYPES: ConsultationType[] = [
  'Private Gallery Viewing',
  'Tailor Made Atelier',
  'Autodrome Track Drive',
  'Live Virtual Walkthrough',
];

function getTomorrowIsoDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function ContactSection({
  preselectedModel,
  preselectedFormat,
}: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedModel, setSelectedModel] = useState(preselectedModel || FERRARI_MODELS[0].name);
  const [consultationType, setConsultationType] = useState<ConsultationType>(preselectedFormat);
  const [preferredDate, setPreferredDate] = useState(getTomorrowIsoDate);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedModel) {
      setSelectedModel(preselectedModel);
    }
  }, [preselectedModel]);

  useEffect(() => {
    if (preselectedFormat) {
      setConsultationType(preselectedFormat);
    }
  }, [preselectedFormat]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    const digitsOnly = phone.replace(/[^\d]/g, '');
    if (digitsOnly.length < 7) {
      nextErrors.phone = 'Please enter a valid UAE or international telephone number.';
    }
    if (!preferredDate) {
      nextErrors.preferredDate = 'Please select a preferred appointment date.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setSubmittedRef(`DXB-26-${randomCode}`);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setErrors({});
  };

  return (
    <section
      id="concierge"
      className="border-t border-white/10 bg-[#09090B] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Concierge Coordinates */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-sm font-medium text-[#DC0000]">03. Private Concierge</p>
              <h2
                className="mt-2 font-display text-3xl font-medium tracking-tight text-[#F4F1EA] sm:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                Arrange Your Private Dubai Viewing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Appointments are hosted discreetly at our Sheikh Zayed Road flagship or via live
                private video link from our Tailor Made suite.
              </p>

              <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
                <div className="flex items-start gap-4 py-5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#DC0000]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-zinc-500">Flagship Location</dt>
                    <dd className="mt-1 text-sm text-[#F4F1EA]">
                      Al Manara Tower, Sheikh Zayed Road, Exit 43 · Dubai, UAE
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#DC0000]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-zinc-500">Private Salon Hours</dt>
                    <dd className="mt-1 font-mono text-sm tabular-nums text-[#F4F1EA]">
                      Daily · 09:30 – 21:00 GST
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#DC0000]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-zinc-500">Direct Concierge Desk</dt>
                    <dd className="mt-1 font-mono text-sm tabular-nums text-[#F4F1EA]">
                      +971 4 384 0000
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#DC0000]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-zinc-500">Bespoke Desk</dt>
                    <dd className="mt-1 text-sm text-[#F4F1EA]">concierge@ferrari-dubai.ae</dd>
                  </div>
                </div>
              </dl>
            </div>

            <p className="mt-8 text-xs leading-relaxed text-zinc-500">
              Chauffeur transfer from DIFC, Downtown Dubai, or Palm Jumeirah is available upon
              appointment confirmation.
            </p>
          </div>

          {/* Right Form Card (Single-level elevation) */}
          <div className="border border-white/10 bg-[#121215] p-6 sm:p-10 lg:col-span-7">
            {submittedRef ? (
              <div className="flex h-full flex-col justify-between py-4" role="status">
                <div>
                  <div className="flex items-center gap-3 text-[#F4F1EA]">
                    <CheckCircle2
                      className="h-6 w-6 shrink-0 text-[#DC0000]"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">
                      Concierge Dossier Confirmed
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-medium text-[#F4F1EA] sm:text-4xl">
                    We Await Your Arrival, {fullName.trim().split(' ')[0]}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    Your dedicated Dubai Client Specialist has received your request and will send
                    private entry credentials and valet instructions to{' '}
                    <span className="text-white">{email}</span>.
                  </p>

                  <dl className="mt-8 grid grid-cols-1 gap-4 border-y border-white/10 py-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-zinc-500">Reference Number</dt>
                      <dd className="mt-1 font-mono text-sm font-medium tabular-nums text-[#F4F1EA]">
                        {submittedRef}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">Preferred Date</dt>
                      <dd className="mt-1 font-mono text-sm tabular-nums text-[#F4F1EA]">
                        {preferredDate}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">Selected Model</dt>
                      <dd className="mt-1 text-sm text-[#F4F1EA]">{selectedModel}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-zinc-500">Appointment Format</dt>
                      <dd className="mt-1 text-sm text-[#F4F1EA]">{consultationType}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="min-h-[44px] border border-white/20 px-6 py-2.5 text-xs font-medium text-[#F4F1EA] transition-colors hover:border-white/45 hover:bg-white/5 cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-medium text-[#F4F1EA]">
                    Private Viewing &amp; Commission Request
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Select your preferred vehicle and consultation format below.
                  </p>
                </div>

                {/* Consultation Type Selector */}
                <div>
                  <span className="block text-xs font-medium text-zinc-300">
                    Consultation Format
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {CONSULTATION_TYPES.map((type) => {
                      const active = consultationType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setConsultationType(type)}
                          aria-pressed={active}
                          className={`min-h-[44px] border px-4 py-2.5 text-left text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#DC0000] ${
                            active
                              ? 'border-[#DC0000] bg-[#DC0000]/15 text-white'
                              : 'border-white/10 bg-[#0D0D10] text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="concierge-name"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Full Name
                    </label>
                    <input
                      id="concierge-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      placeholder="Tariq Al Mansoori"
                      className={`mt-2 w-full min-h-[44px] border bg-[#0D0D10] px-4 py-2.5 text-sm text-[#F4F1EA] placeholder:text-zinc-600 focus:outline-none ${
                        errors.fullName
                          ? 'border-[#DC0000]'
                          : 'border-white/15 focus:border-[#F4F1EA]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#FF5A5A]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-email"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="concierge-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="tariq@domain.ae"
                      className={`mt-2 w-full min-h-[44px] border bg-[#0D0D10] px-4 py-2.5 text-sm text-[#F4F1EA] placeholder:text-zinc-600 focus:outline-none ${
                        errors.email
                          ? 'border-[#DC0000]'
                          : 'border-white/15 focus:border-[#F4F1EA]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#FF5A5A]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone, Model & Preferred Date */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="concierge-phone"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Telephone
                    </label>
                    <input
                      id="concierge-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="+971 50 000 0000"
                      className={`mt-2 w-full min-h-[44px] border bg-[#0D0D10] px-4 py-2.5 font-mono text-sm tabular-nums text-[#F4F1EA] placeholder:text-zinc-600 focus:outline-none ${
                        errors.phone
                          ? 'border-[#DC0000]'
                          : 'border-white/15 focus:border-[#F4F1EA]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#FF5A5A]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-model"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Model of Interest
                    </label>
                    <select
                      id="concierge-model"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="mt-2 w-full min-h-[44px] border border-white/15 bg-[#0D0D10] px-3.5 py-2.5 text-sm text-[#F4F1EA] focus:border-[#F4F1EA] focus:outline-none"
                    >
                      {FERRARI_MODELS.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                      <option value="Tailor Made Bespoke Program">
                        Tailor Made Bespoke Program
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-date"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="concierge-date"
                      type="date"
                      min={getTomorrowIsoDate()}
                      value={preferredDate}
                      onChange={(e) => {
                        setPreferredDate(e.target.value);
                        if (errors.preferredDate)
                          setErrors((prev) => ({ ...prev, preferredDate: undefined }));
                      }}
                      className={`mt-2 w-full min-h-[44px] border bg-[#0D0D10] px-3.5 py-2.5 font-mono text-sm tabular-nums text-[#F4F1EA] focus:outline-none ${
                        errors.preferredDate
                          ? 'border-[#DC0000]'
                          : 'border-white/15 focus:border-[#F4F1EA]'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#FF5A5A]">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Bespoke Notes */}
                <div>
                  <label
                    htmlFor="concierge-notes"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Specification Preferences or Chauffeur Request (Optional)
                  </label>
                  <textarea
                    id="concierge-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Preferred exterior finish, Tailor Made materials, or DIFC transfer details..."
                    className="mt-2 w-full border border-white/15 bg-[#0D0D10] px-4 py-3 text-sm text-[#F4F1EA] placeholder:text-zinc-600 focus:border-[#F4F1EA] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
                  <p className="text-xs text-zinc-500">
                    All inquiries are handled exclusively by our Dubai client relations team.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex min-h-[48px] items-center justify-center bg-[#DC0000] px-8 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#B80000] cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                  >
                    Confirm Viewing Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
