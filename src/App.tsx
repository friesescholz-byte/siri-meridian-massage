import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Star,
  CheckCircle2,
  ShieldCheck,
  Award,
  Menu,
  X,
  Gift,
  Feather,
  Sun,
  Flame,
  Droplet,
  Flower2,
  Check,
  Send,
  User,
  ChevronDown,
  BookOpen,
  Compass
} from 'lucide-react';

// Direct Cloudflare R2 Base Path & Image Manifest
const R2_BASE = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/siri-meridian-massage';

const IMAGES = {
  logo: `${R2_BASE}/asset-32-m5K8M355ogCOkXDy_ergebnis.webp`,
  siriPortrait: `${R2_BASE}/552519648_4109763072628878_2841843641757232199_n-Aq2GbMKQnaTJjp20_ergebnis.webp`,
  certificateSutep: `${R2_BASE}/550328497_4109224312682754_4469992358228469831_n-mv0PbwRKrBiBy1DL_ergebnis.webp`,
  meridianModel: `${R2_BASE}/1437-Aq2GbwREzaujQL24_ergebnis.webp`,
  roomMain: `${R2_BASE}/1433-Awv8bwVqMDuOkZ63_ergebnis.webp`,
  roomSecondary: `${R2_BASE}/1434-YBgjwG6pBGSaJWED_ergebnis.webp`,
  roomPanorama: `${R2_BASE}/asset-54-mv0PbwEkVoiLOGkR_ergebnis.webp`,
  voucher: `${R2_BASE}/gutschein-vor-YKb8jzOy4lu9OngO_ergebnis.webp`,
  treatmentSolution: `${R2_BASE}/Thai%20Solution%20Massage_ergebnis.webp`,
  treatmentRuudsen: `${R2_BASE}/Thai%20Ruudsen%20Massage_ergebnis.webp`,
  treatmentLymph: `${R2_BASE}/Thai%20Lymphdrainage%20Massage_ergebnis.webp`,
  treatmentBenja: `${R2_BASE}/Nuad%20Thai%20Benja%20Phakhi%20(Thai-K%C3%B6nigs-Massage)_ergebnis.webp`,
};

// Official Contact Details
const CONTACT = {
  name: 'Siri Meridian Massage',
  owner: 'Siriwan Pössel',
  street: 'An der Breiten Riede 26',
  zipCity: '31582 Nienburg',
  fullAddress: 'An der Breiten Riede 26, 31582 Nienburg',
  phone: '+49 157 56311739',
  phoneDisplay: '0157 / 563 117 39',
  phoneTel: 'tel:+4915756311739',
  email: 'siri.meridianmassage@gmail.com'
};

// Framer Motion Animation Constants
const easeCustom = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeCustom }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Treatments Data from Real Website
interface Treatment {
  id: string;
  name: string;
  category: 'solution' | 'ruudsen' | 'lymph' | 'benja';
  subtitle: string;
  description: string;
  benefits: string[];
  durations: { minutes: number; price: number }[];
  image: string;
  tag?: string;
  icon: React.ElementType;
}

const TREATMENTS: Treatment[] = [
  {
    id: 'thai-solution',
    name: 'Thai Solution Massage',
    category: 'solution',
    subtitle: 'Gezielte Schmerzlinderung & Befreiung von Blockaden',
    description: 'Die Thai Solution Massage vereint traditionelle thailändische Akupressur mit modernen anatomischen Entspannungsmethoden. Sie wurde speziell entwickelt, um hartnäckige Verspannungen und Bewegungseinschränkungen effektiv zu lösen.',
    benefits: [
      'Gezielte Linderung bei Nacken- & Rückenbeschwerden',
      'Verbindung traditioneller & moderner Techniken',
      'Tiefe physische und mentale Entlastung'
    ],
    durations: [
      { minutes: 60, price: 69 },
      { minutes: 90, price: 95 },
      { minutes: 120, price: 125 }
    ],
    image: IMAGES.treatmentSolution,
    tag: 'Empfohlen bei Schmerzen',
    icon: Sparkles
  },
  {
    id: 'thai-ruudsen',
    name: 'Thai Ruudsen Massage',
    category: 'ruudsen',
    subtitle: 'Tiefe Regeneration & Harmonisierung der 12 Meridiane',
    description: 'Eine Kombination aus rhythmischer Druckpunktmassage, Dehnungen und samtigem Öl. Die Thai Ruudsen Massage stimuliert die Sen-Linien und fördert innere Ruhe, emotionale Balance sowie völlige Regeneration.',
    benefits: [
      'Stärkt den Fluss der Lebensenergie (Prana)',
      'Intensive Muskelentspannung mit warmem Öl',
      'Fördert tiefen, erholsamen Schlaf'
    ],
    durations: [
      { minutes: 60, price: 65 },
      { minutes: 90, price: 89 },
      { minutes: 120, price: 119 }
    ],
    image: IMAGES.treatmentRuudsen,
    tag: 'Bestseller',
    icon: Feather
  },
  {
    id: 'thai-lymphdrainage',
    name: 'Thai Lymphdrainage Massage',
    category: 'lymph',
    subtitle: 'Sanfte Entgiftung & Aktivierung des Lymphflusses',
    description: 'Mit sanften, gezielten Streichungen wird der Lymphfluss sanft angeregt. Toxine und angestauchte Flüssigkeiten im Gewebe werden abtransportiert – für ein unvergleichliches Gefühl der Leichtigkeit im gesamten Körper.',
    benefits: [
      'Entlastet schwere Beine & Schwellungen',
      'Unterstützt das Immunsystem & die Entgiftung',
      'Besonders sanft & hautpflegend'
    ],
    durations: [
      { minutes: 60, price: 72 },
      { minutes: 90, price: 99 }
    ],
    image: IMAGES.treatmentLymph,
    icon: Droplet
  },
  {
    id: 'benja-phakhi',
    name: 'Nuad Thai Benja Phakhi',
    category: 'benja',
    subtitle: 'Original Thai-Königs-Massage • Meister-Methode',
    description: 'Die seltene Benja Phakhi Königs-Massage vereint 5 traditionelle Heilkünste: Wat Po Thaimassage, gezielte Akupressur, japanisches Shiatsu und chinesisches Tuina. Ausgebildet an der THAIBOOST Akademie.',
    benefits: [
      'Ganzheitlicher Ausgleich der 12 Meridiane',
      'Meisterhafte Technik für höchste Ansprüche',
      'Maximale Vitalisierung & Geschmeidigkeit'
    ],
    durations: [
      { minutes: 90, price: 105 },
      { minutes: 120, price: 135 }
    ],
    image: IMAGES.treatmentBenja,
    tag: 'Meisterklasse',
    icon: Award
  }
];

// FAQ Data from Scraped Content
const FAQS = [
  {
    question: 'Was ist die Thai Solution Massage?',
    answer: 'Die Thai Solution Massage kombiniert traditionelle thailändische Heilelemente mit modernen physiotherapeutischen Entspannungsmethoden. Sie konzentriert sich auf Schmerzpunkte und hartnäckige Verspannungen im Muskelgewebe.'
  },
  {
    question: 'Welche Vorteile bietet die Thai Ruudsen Massage?',
    answer: 'Die Thai Ruudsen Massage fördert die körperliche Regeneration und innere Ruhe durch eine abgestimmte Kombination aus Druckpunktmassage, Dehnungen und samtigen Ölen.'
  },
  {
    question: 'Wie funktioniert die Thai Lymphdrainage?',
    answer: 'Die Lymphdrainage arbeitet mit sanften, gewebeschonenden Streicheleinheiten. Sie regt das Lymphsystem an, unterstützt den Entgiftungsprozess und erzeugt sofort ein spürbares Gefühl der Leichtigkeit.'
  },
  {
    question: 'Sind die Massagen schmerzhaft?',
    answer: 'Unsere Massagen sind grundsätzlich darauf ausgelegt, wohltuend und entspannend zu sein. Je nach Grad Ihrer Verspannung können einzelne Druckpunkte intensiv spürbar sein – der Druck wird jedoch immer individuell auf Ihr Wohlbefinden abgestimmt.'
  },
  {
    question: 'Wie lange dauern die Massagen?',
    answer: 'Je nach gewählter Behandlung bieten wir Sitzungen von 60, 90 bis 120 Minuten an. Für eine tiefgehende Meridian-Harmonisierung empfehlen wir 90 Minuten.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'solution' | 'ruudsen' | 'lymph' | 'benja'>('all');
  const [selectedBookingTreatmentId, setSelectedBookingTreatmentId] = useState<string>(TREATMENTS[0].id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTreatments = selectedCategory === 'all' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.category === selectedCategory);

  const activeModalTreatment = TREATMENTS.find(t => t.id === selectedBookingTreatmentId) || TREATMENTS[0];

  const handleOpenBooking = (treatment?: Treatment) => {
    if (treatment) {
      setSelectedBookingTreatmentId(treatment.id);
    } else {
      setSelectedBookingTreatmentId(TREATMENTS[0].id);
    }
    setBookingModalOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-400 selection:text-dark-900">
      
      {/* BACKGROUND DECORATIVE GLOWS WITH DEEP EMERALD & GOLD ACCENTS */}
      <div className="fixed top-0 left-1/4 w-[650px] h-[650px] bg-emerald-700/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[550px] h-[550px] bg-brand-400/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* HEADER / NAVIGATION */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-900/95 backdrop-blur-md border-b border-brand-400/30 shadow-2xl shadow-black/80 py-2.5'
            : 'bg-dark-900/90 backdrop-blur-md border-b border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* OFFICIAL LOGO */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className={`rounded-full overflow-hidden border border-brand-400/40 shadow-lg shadow-brand-400/15 group-hover:scale-105 transition-all bg-emerald-950 flex items-center justify-center p-0.5 shrink-0 ${isScrolled ? 'w-10 h-10 sm:w-11 sm:h-11' : 'w-12 h-12 sm:w-14 sm:h-14'}`}>
              <img
                src={IMAGES.logo}
                alt="Siri Meridian Massage Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-brand-300 transition-colors leading-none whitespace-nowrap">
                SIRI <span className="font-light italic text-brand-400">Meridian</span>
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-slate-300 font-medium whitespace-nowrap mt-1">
                Thai & Meridian Massage Nienburg
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden xl:flex items-center gap-6 xl:gap-8 text-sm sm:text-base font-medium text-slate-200">
            <a href="#uber-mich" className="hover:text-brand-300 transition-colors whitespace-nowrap py-1">Über Siriwan</a>
            <a href="#behandlungen" className="hover:text-brand-300 transition-colors whitespace-nowrap py-1">Preis & Leistungen</a>
            <a href="#gutscheine" className="hover:text-brand-300 transition-colors flex items-center gap-1.5 text-brand-300 whitespace-nowrap py-1">
              <Gift className="w-4 h-4" /> Gutscheine
            </a>
            <a href="#faq" className="hover:text-brand-300 transition-colors whitespace-nowrap py-1">FAQ</a>
            <a href="#kontakt" className="hover:text-brand-300 transition-colors whitespace-nowrap py-1">Kontakt</a>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={CONTACT.phoneTel}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-brand-300 transition-colors px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>
            <button
              onClick={() => handleOpenBooking()}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold text-dark-900 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:to-brand-600 transition-all shadow-md shadow-brand-400/25 hover:shadow-brand-400/35 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Termin Buchen</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white shrink-0"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden z-30 bg-dark-800 border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-4 text-lg font-medium text-slate-200">
              <a href="#uber-mich" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-brand-400">
                Über Siriwan Pössel
              </a>
              <a href="#behandlungen" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-brand-400">
                Preis & Leistungen
              </a>
              <a href="#gutscheine" onClick={() => setMobileMenuOpen(false)} className="py-1 text-brand-300 flex items-center gap-2">
                <Gift className="w-5 h-5" /> Geschenkgutscheine
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-brand-400">
                Häufige Fragen
              </a>
              <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-brand-400">
                Kontakt & Anfahrt
              </a>
            </nav>
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenBooking();
                }}
                className="w-full text-center py-3.5 rounded-full font-semibold text-dark-900 bg-brand-400 hover:bg-brand-300 transition-colors shadow-lg text-base"
              >
                Termin Online Buchen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION WITH SIRIWAN PORTRAIT & OFFICIAL LOGO EMBLEM */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO LEFT CONTENT */}
            <motion.div 
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* EYEBROW */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-950/90 via-dark-800 to-emerald-950/90 border border-brand-400/40 text-brand-300 text-sm sm:text-base font-medium tracking-wide shadow-lg backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="whitespace-nowrap">Siri Meridian Massage • {CONTACT.zipCity}</span>
              </motion.div>

              {/* HEADLINE */}
              <motion.h1 
                variants={fadeUp}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.18] tracking-tight text-white"
              >
                Neue Energie & innere Ruhe durch <br className="hidden sm:inline" />
                <span className="text-gold-gradient italic font-normal">Achtsame Meridian-Therapie</span>
              </motion.h1>

              {/* SUBLINE */}
              <motion.p 
                variants={fadeUp}
                className="text-slate-200 text-lg sm:text-xl max-w-2xl leading-relaxed font-light mx-auto lg:mx-0"
              >
                Willkommen bei Siriwan Pössel in Nienburg. Erleben Sie in harmonischer Atmosphäre die <strong className="font-semibold text-white">Nuad Thai Benja Phakhi Methode</strong> (originale Thai-Königs-Massage) sowie gezielte <strong className="font-semibold text-white">Thai Solution & Ruudsen Massagen</strong> zur vollkommenen Regeneration der 12 Meridiane.
              </motion.p>

              {/* CTA GROUP */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleOpenBooking()}
                  className="w-full sm:w-auto px-9 py-4 rounded-full text-lg font-semibold text-dark-900 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:to-brand-600 transition-all shadow-xl shadow-brand-400/25 hover:shadow-brand-400/40 hover:scale-[1.02] flex items-center justify-center gap-2.5 group"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Wunschtermin Online Buchen</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#behandlungen"
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center"
                >
                  Preis & Leistungen
                </a>
              </motion.div>

              {/* TRUST BADGES / METRICS */}
              <motion.div variants={fadeUp} className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="font-serif text-xl font-bold text-brand-300">THAIBOOST</div>
                  <div className="text-sm text-slate-300">Zertifizierte Akademie</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-serif text-xl font-bold text-white">12 Meridiane</div>
                  <div className="text-sm text-slate-300">Ganzheitliche Arbeit</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-serif text-xl font-bold text-white">Königs-Massage</div>
                  <div className="text-sm text-slate-300">Wat Po & Shiatsu Kunst</div>
                </div>
              </motion.div>
            </motion.div>

            {/* HERO RIGHT VISUAL SHOWCASE: SIRIWAN PORTRAIT IMAGE */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                <div className="relative rounded-3xl overflow-hidden border border-brand-400/40 shadow-2xl bg-dark-800 aspect-[3/4] group">
                  <img
                    src={IMAGES.siriPortrait}
                    alt="Siriwan Pössel - Inhaberin von Siri Meridian Massage"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-6 left-6 right-6 p-4.5 rounded-2xl glass-panel text-slate-200">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-950 border border-brand-400/40 shrink-0 p-0.5 shadow-md">
                        <img src={IMAGES.logo} alt="Logo Emblem" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-white">Siriwan Pössel</h3>
                        <p className="text-xs font-semibold text-brand-300">Inhaberin & Dipl.-Meridian-Therapeutin</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ÜBER MICH & SIRIWAN POESSEL STORY */}
      <section id="uber-mich" className="py-24 bg-dark-800/50 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT CERTIFICATE & PHOTO SHOWCASE */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* TOP CARD: CERTIFICATE HANDOVER PHOTO */}
              <div className="relative rounded-3xl overflow-hidden border border-brand-400/35 shadow-2xl bg-dark-900 aspect-[16/10] group">
                <img
                  src={IMAGES.certificateSutep}
                  alt="Siriwan Pössel mit Lehrer Sutep Mevattana bei der Zertifikatsübergabe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-85" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-panel border border-brand-400/30 text-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-950 border border-brand-400/40 flex items-center justify-center text-brand-300 shrink-0">
                      <Award className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white leading-tight">
                        Zertifizierte THAIBOOST Akademie
                      </h4>
                      <p className="text-xs text-slate-300 font-light mt-0.5">
                        Siriwan Pössel & Meister Sutep Mevattana bei der Zertifikatsübergabe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM CARD: UNIFIED 12 HAUPTMERIDIANE FEATURE SHOWCASE */}
              <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-brand-400/30 shadow-xl bg-gradient-to-br from-emerald-950/40 via-dark-800 to-dark-900 group">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-full sm:w-36 h-40 rounded-2xl overflow-hidden border border-brand-400/30 shadow-md shrink-0 bg-dark-900">
                    <img
                      src={IMAGES.meridianModel}
                      alt="Meridian Modell und dtv-Atlas Akupunktur"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-2.5 text-center sm:text-left flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Energielinien & Balance</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Die 12 Hauptmeridiane
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      Achtsame Arbeit entlang der Sen-Linien zur gezielten Lösung tiefsitzender energetischer und muskulärer Verspannungen.
                    </p>
                    <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-medium text-brand-300">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">✦ Wat Po Tradition</span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">✦ Shiatsu & Tuina</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIRIWAN TEXT CONTENT */}
            <motion.div 
              className="lg:col-span-6 space-y-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-brand-400/10 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Über Siriwan Pössel</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.2]">
                Mit Herz, Achtsamkeit & <br />
                <span className="text-gold-gradient italic font-normal">traditionellem Wissen</span>
              </h2>

              <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-light">
                <p>
                  Mein Name ist <strong className="font-semibold text-white">Siriwan Pössel</strong>. Früher arbeitete ich als Pflegehelferin und habe mit großer Freude und Hingabe ältere Menschen betreut. Ich bin glücklich, wenn ich anderen Menschen helfen und zu ihrem Wohlbefinden beitragen kann.
                </p>
                <p>
                  Da ich selbst großen Wert auf Gesundheit und innere Balance lege, wuchs in mir der Wunsch, Menschen auf eine ganzheitliche Weise zu unterstützen. So begann ich meine Ausbildung in Thaimassage in den Niederlanden – und entdeckte meine Leidenschaft, Körper und Geist durch achtsame Berührung in Einklang zu bringen.
                </p>
              </div>

              {/* BENJA PHAKHI METHOD CARD */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-dark-800 to-dark-800 border-l-4 border-brand-400 border-y border-r border-brand-400/25 space-y-3 shadow-lg">
                <div className="flex items-center gap-3 text-brand-300 font-serif font-bold text-xl">
                  <div className="w-9 h-9 rounded-xl bg-brand-400/15 border border-brand-400/30 flex items-center justify-center text-brand-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <span>Die Nuad Thai Benja Phakhi Methode</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                  Ich habe meine Weiterbildung an der <strong className="font-semibold text-white">THAIBOOST Akademie</strong> unter der persönlichen Leitung von Meister <strong className="font-semibold text-white">Sutep Mevattana</strong> absolviert. Diese originale <strong className="font-semibold text-white">Thai-Königs-Massage</strong> vereint 5 ostasiatische Heilmethoden: Wat Po Thaimassage, Akupressur, Shiatsu und Tuina.
                </p>
              </div>

              {/* QUOTE BLOCK */}
              <blockquote className="relative p-6 rounded-2xl glass-card border border-white/10 space-y-2">
                <p className="italic text-slate-200 text-base sm:text-lg font-light leading-relaxed">
                  „Jede Massage ist für mich eine Herzensarbeit – eine Einladung, loszulassen, aufzutanken und sich wieder mit der eigenen Lebensenergie zu verbinden.“
                </p>
                <footer className="font-medium text-brand-300 text-sm flex items-center gap-2 pt-1">
                  <div className="w-2 h-2 rounded-full bg-brand-400" />
                  <span>Siriwan Pössel</span>
                  <span className="text-slate-400 font-light text-xs">• Inhaberin & Meridian-Therapeutin</span>
                </footer>
              </blockquote>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TREATMENTS & PRICING SECTION */}
      <section id="behandlungen" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-300 text-xs font-bold uppercase tracking-wider">
              Angebote & Tarife
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Unsere <span className="text-gold-gradient italic font-normal">Preis- & Leistungsübersicht</span>
            </h2>
            <p className="text-slate-200 text-base sm:text-lg font-light">
              Wählen Sie die passende Heilanwendung für Ihr Wohlbefinden. Alle Massagen werden individuell an Ihren Gesundheitszustand angepasst.
            </p>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: 'all', label: 'Alle Massagen' },
              { id: 'solution', label: 'Thai Solution' },
              { id: 'ruudsen', label: 'Thai Ruudsen' },
              { id: 'lymph', label: 'Lymphdrainage' },
              { id: 'benja', label: 'Thai-Königs-Massage' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-brand-400 text-dark-900 font-semibold shadow-lg shadow-brand-400/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TREATMENTS CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredTreatments.map((treatment) => {
              const IconComp = treatment.icon;
              return (
                <motion.div
                  key={treatment.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between group border border-brand-400/20 hover:border-brand-400/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-400/10"
                >
                  {/* CARD TOP LANDSCAPE HEADER BANNER */}
                  <div className="h-56 sm:h-64 relative overflow-hidden bg-dark-900">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    {/* GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

                    {/* TOP BADGES */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      {treatment.tag ? (
                        <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-400 to-brand-500 text-dark-900 font-bold text-xs shadow-lg uppercase tracking-wider">
                          {treatment.tag}
                        </span>
                      ) : (
                        <div />
                      )}
                      <div className="w-10 h-10 rounded-full glass-panel border border-brand-400/30 flex items-center justify-center text-brand-300 shadow-md">
                        <IconComp className="w-5 h-5 text-brand-400" />
                      </div>
                    </div>

                    {/* TITLE OVERLAY AT BOTTOM OF BANNER */}
                    <div className="absolute bottom-4 left-6 right-6 space-y-1">
                      <span className="text-xs font-bold uppercase text-brand-300 tracking-wider block">
                        {treatment.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-brand-300 transition-colors drop-shadow-md">
                        {treatment.name}
                      </h3>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                      {treatment.description}
                    </p>

                    {/* BENEFITS LIST */}
                    <div className="space-y-2.5 py-3 border-y border-white/10">
                      {treatment.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4.5 h-4.5 text-brand-400 shrink-0 mt-0.5" />
                          <span className="font-light">{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* DURATIONS & PRICES FOOTER */}
                    <div className="pt-2 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium mr-1">Dauer & Tarif:</span>
                        {treatment.durations.map((d, i) => (
                          <div
                            key={i}
                            className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-brand-400/30 flex items-center gap-2 text-xs sm:text-sm font-semibold"
                          >
                            <Clock className="w-3.5 h-3.5 text-brand-400" />
                            <span className="text-slate-200">{d.minutes} Min</span>
                            <span className="text-brand-300 font-bold ml-1">{d.price} €</span>
                          </div>
                        ))}
                      </div>

                      {/* BOOKING BUTTON */}
                      <button
                        onClick={() => handleOpenBooking(treatment)}
                        className="w-full py-3.5 rounded-2xl text-sm sm:text-base font-semibold text-dark-900 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:to-brand-600 transition-all shadow-lg shadow-brand-400/20 hover:shadow-brand-400/35 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5"
                      >
                        <Calendar className="w-4.5 h-4.5" />
                        <span>Jetzt Wunschtermin Online Anfragen</span>
                        <ChevronRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ATMOSPHERE GALLERY SHOWCASE WITH REAL PHOTOS */}
      <section className="py-24 bg-dark-800/40 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-300 text-xs font-bold uppercase tracking-wider">
              Einblicke
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Impressionen unserer <span className="text-gold-gradient italic font-normal">Wohlfühloase</span>
            </h2>
            <p className="text-slate-200 text-base font-light">
              Hier erwartet Sie absolute Stille, angenehme Wärme, der Duft frischer Kräuter und höchste Sauberkeit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] bg-dark-900 group relative">
              <img
                src={IMAGES.roomMain}
                alt="Behandlungsraum mit Lotosblüte und Handtüchern"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 text-sm text-white font-medium">
                Haupt-Behandlungsraum & Wohlfühl-Ambiente
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] bg-dark-900 group relative">
              <img
                src={IMAGES.roomSecondary}
                alt="Zweiter Behandlungsraum mit Schwanen-Handtuch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 text-sm text-white font-medium">
                Diskrete Ruheoase unter sanftem Licht
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] bg-dark-900 group relative">
              <img
                src={IMAGES.roomPanorama}
                alt="Behandlungsraum Panoramablick"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 text-sm text-white font-medium">
                Erwärmte Behandlungsliege & Naturholz
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* GIFT VOUCHER SECTION (WITH AUTHENTIC GUTSCHEIN CARD IMAGE) */}
      <section id="gutscheine" className="py-20 bg-gradient-to-br from-dark-800 via-dark-900 to-emerald-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-brand-400/30 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-400/20 text-brand-300 text-xs font-semibold">
                  <Gift className="w-4 h-4" />
                  <span>Das perfekte Geschenk</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  Verschenken Sie Freude & tiefgehende Entspannung!
                </h2>
                <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed">
                  Perfekt für jeden Anlass – von Geburtstagen bis hin zu besonderen Feierlichkeiten. Machen Sie Ihren Liebsten eine besondere Freude: Sie entscheiden selbst, wie sie den Gutschein vor Ort einlösen möchten.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-400" />
                    <span>Beliebiger Wunschbetrag oder spezifische Anwendung</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-400" />
                    <span>Vor Ort edel verpackt oder digital verfügbar</span>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setGiftModalOpen(true)}
                    className="px-8 py-4 rounded-full font-semibold text-dark-900 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:to-brand-600 transition-all shadow-xl shadow-brand-400/20 hover:scale-105 text-base"
                  >
                    Jetzt Gutschein Anfragen
                  </button>
                </div>
              </div>

              {/* VOUCHER CARD IMAGE SHOWCASE */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden border border-brand-400/40 shadow-2xl bg-dark-900 hover:scale-105 transition-transform duration-500">
                  <img
                    src={IMAGES.voucher}
                    alt="Siri Meridian Massage Geschenkgutschein"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION FROM SCRAPED WEBSITE */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-300 text-xs font-bold uppercase tracking-wider">
              Wissenswertes
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Häufig gestellte <span className="text-gold-gradient italic font-normal">Fragen (FAQ)</span>
            </h2>
            <p className="text-slate-200 text-base font-light">
              Hier finden Sie Antworten auf die wichtigsten Fragen rund um unsere Behandlungen.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-white/5 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-xl font-bold text-white hover:text-brand-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-400 shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-200 text-base font-light leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LOCATION & STUDIO PHOTO SHOWCASE WITH EXACT ADDRESS & IMAGE */}
      <section id="kontakt" className="py-24 bg-dark-800/50 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT CONTACT INFO WITH REAL STUDIO IMAGE */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
                  Kontakt & Anfahrt
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  Besuchen Sie unser <span className="text-gold-gradient italic font-normal">Studio in Nienburg</span>
                </h2>
                <p className="text-slate-200 text-base font-light leading-relaxed mt-2">
                  Wir freuen uns darauf, Sie persönlich bei Siri Meridian Massage zu begrüßen.
                </p>
              </div>

              {/* Real Studio Interior Image for Location Showcase */}
              <div className="rounded-2xl overflow-hidden border border-brand-400/30 aspect-[4/3] bg-dark-900 relative group shadow-xl">
                <img
                  src={IMAGES.roomMain}
                  alt="Siri Meridian Massage Studio An der Breiten Riede 26 Nienburg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4 text-sm text-slate-200">
                  <div className="font-bold text-brand-300 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>{CONTACT.fullAddress}</span>
                  </div>
                  <span className="text-xs text-slate-300 block pl-5">Ruhige Wohlfühloase mit Parkplatzmöglichkeiten</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-400/10 border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Adresse</h4>
                    <p className="text-base text-slate-200 mt-0.5">{CONTACT.street}</p>
                    <p className="text-base text-slate-200">{CONTACT.zipCity}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-400/10 border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Telefon & WhatsApp</h4>
                    <a href={CONTACT.phoneTel} className="text-base text-brand-300 font-semibold hover:underline block mt-0.5">
                      {CONTACT.phone}
                    </a>
                    <span className="text-xs text-slate-300">Schnelle Terminvereinbarung per WhatsApp</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-400/10 border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">E-Mail</h4>
                    <a href={`mailto:${CONTACT.email}`} className="text-base text-brand-300 hover:underline block mt-0.5">
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-400/10 border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Öffnungszeiten</h4>
                    <div className="text-base text-slate-200 mt-0.5 space-y-0.5">
                      <div>Montag – Samstag: 09:00 – 19:30 Uhr</div>
                      <div>Sonn- & Feiertage: Nach Vereinbarung</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT APPOINTMENT REQUEST FORM */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-brand-400/20">
                <h3 className="font-serif text-2xl font-bold text-white mb-2">Terminanfrage Senden</h3>
                <p className="text-sm text-slate-300 mb-6">Senden Sie uns Ihren Terminwunsch – Siriwan Pössel meldet sich persönlich bei Ihnen.</p>
                
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Ihr Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="z. B. Maria Muster"
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Telefonnummer *</label>
                      <input
                        type="tel"
                        required
                        placeholder={CONTACT.phoneDisplay}
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Wunschbehandlung</label>
                      <select
                        value={selectedBookingTreatmentId}
                        onChange={(e) => setSelectedBookingTreatmentId(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900/80 border border-white/10 text-white focus:outline-none focus:border-brand-400 text-base font-medium"
                      >
                        {TREATMENTS.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Wunschdatum & Uhrzeit</label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900/80 border border-white/10 text-white focus:outline-none focus:border-brand-400 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Anmerkungen oder Beschwerden</label>
                    <textarea
                      rows={3}
                      placeholder="z. B. Nackenverspannungen, Allergien oder Terminwünsche..."
                      className="w-full px-4 py-3.5 rounded-xl bg-dark-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 text-base"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-semibold text-dark-900 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:to-brand-600 transition-all shadow-lg shadow-brand-400/20 text-base flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Terminanfrage Absenden</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-900 border-t border-white/10 pt-16 pb-12 text-slate-300 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-400/40 bg-emerald-950 p-0.5 shrink-0">
                  <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-serif text-xl font-bold text-white">{CONTACT.name}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-light">
                Inhaberin {CONTACT.owner}.<br />
                {CONTACT.street}<br />
                {CONTACT.zipCity}
              </p>
              <div className="space-y-1 pt-1 text-slate-200">
                <div>Tel: <a href={CONTACT.phoneTel} className="hover:text-brand-400 font-semibold">{CONTACT.phone}</a></div>
                <div>E-Mail: <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-400 font-semibold">{CONTACT.email}</a></div>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-4">Behandlungen</h4>
              <ul className="space-y-2.5 font-light">
                {TREATMENTS.map(t => (
                  <li key={t.id}>
                    <button
                      onClick={() => handleOpenBooking(t)}
                      className="hover:text-brand-400 text-left transition-colors"
                    >
                      {t.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-4">Navigation</h4>
              <ul className="space-y-2.5 font-light">
                <li><a href="#uber-mich" className="hover:text-brand-400">Über Siriwan Pössel</a></li>
                <li><a href="#gutscheine" className="hover:text-brand-400">Geschenkgutscheine</a></li>
                <li><a href="#faq" className="hover:text-brand-400">Häufige Fragen</a></li>
                <li><a href="#kontakt" className="hover:text-brand-400">Anfahrt & Kontakt</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-4">Rechtliches</h4>
              <ul className="space-y-2.5 font-light">
                <li>
                  <button onClick={() => setImpressumOpen(true)} className="hover:text-brand-400">
                    Impressum
                  </button>
                </li>
                <li>
                  <button onClick={() => setDatenschutzOpen(true)} className="hover:text-brand-400">
                    Datenschutzerklärung
                  </button>
                </li>
              </ul>
              <div className="pt-4">
                <p className="text-xs text-slate-400">
                  Gestaltet von der Webdesign-Agentur <br />
                  <strong className="text-slate-200 font-semibold">Scholz & Friese</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-xs sm:text-sm">
            <div>
              © {new Date().getFullYear()} {CONTACT.name}. Alle Rechte vorbehalten.
            </div>
            <div>
              Massagen dienen der Prävention & Entspannung. Keine medizinischen Heilversprechen.
            </div>
          </div>

        </div>
      </footer>

      {/* DYNAMIC BOOKING MODAL WITH INTERACTIVE TREATMENT SELECTOR */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-800 border border-brand-400/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-400/20 text-brand-400 flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Vielen Dank für Ihre Anfrage!</h3>
                  <p className="text-base text-slate-200">
                    Wir haben Ihre Buchungsanfrage für <strong>{activeModalTreatment.name}</strong> erhalten. Siriwan Pössel meldet sich in Kürze zur Bestätigung.
                  </p>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="px-6 py-3 rounded-full bg-brand-400 text-dark-900 font-semibold text-base"
                  >
                    Fenster Schließen
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-400/40 bg-emerald-950 p-0.5 shrink-0">
                      <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-xs uppercase text-brand-400 font-bold tracking-wider">Online Terminbuchen</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                        Termin Anfragen
                      </h3>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    
                    {/* INTERACTIVE TREATMENT SELECTOR IN MODAL */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                        1. Massage-Art Auswählen *
                      </label>
                      <select
                        value={selectedBookingTreatmentId}
                        onChange={(e) => setSelectedBookingTreatmentId(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-brand-400/50 text-white font-medium text-base focus:outline-none focus:border-brand-400 shadow-sm"
                      >
                        {TREATMENTS.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.name} – {t.subtitle}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* DYNAMIC DURATION BASED ON SELECTED TREATMENT */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        2. Behandlungsdauer & Tarif *
                      </label>
                      <select className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-white text-base font-medium focus:outline-none focus:border-brand-400">
                        {activeModalTreatment.durations.map((d, i) => (
                          <option key={i} value={d.minutes}>
                            {d.minutes} Minuten – {d.price} €
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">3. Ihr Name *</label>
                      <input type="text" required placeholder="Vor- und Nachname" className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-base focus:outline-none focus:border-brand-400" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Telefon *</label>
                        <input type="tel" required placeholder={CONTACT.phoneDisplay} className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-base focus:outline-none focus:border-brand-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Wunschdatum</label>
                        <input type="datetime-local" required className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-base focus:outline-none focus:border-brand-400" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full font-semibold text-dark-900 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:to-brand-600 transition-all shadow-lg text-base"
                    >
                      Verbindlich Anfragen
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GIFT MODAL */}
      <AnimatePresence>
        {giftModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-800 border border-brand-400/40 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-4"
            >
              <button
                onClick={() => setGiftModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-brand-400/40 bg-emerald-950 p-0.5 mx-auto shadow-md">
                  <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Geschenkgutschein Bestellen</h3>
                <p className="text-sm text-slate-300">Rufen Sie Siriwan Pössel direkt an oder schreiben Sie per WhatsApp:</p>
              </div>

              <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Hotline & WhatsApp:</div>
                <a href={CONTACT.phoneTel} className="font-serif text-2xl font-bold text-brand-300 hover:underline block">
                  {CONTACT.phone}
                </a>
              </div>

              <button
                onClick={() => setGiftModalOpen(false)}
                className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base"
              >
                Schließen
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* IMPRESSUM MODAL */}
      <AnimatePresence>
        {impressumOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-dark-800 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative text-slate-200 text-base space-y-4"
            >
              <button
                onClick={() => setImpressumOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-serif text-2xl font-bold text-white">Impressum</h2>
              <div>
                <h4 className="font-bold text-white">Angaben gemäß § 5 TMG</h4>
                <p>{CONTACT.name}<br />Inhaberin: {CONTACT.owner}<br />{CONTACT.street}<br />{CONTACT.zipCity}</p>
              </div>
              <div>
                <h4 className="font-bold text-white">Kontakt</h4>
                <p>Telefon: {CONTACT.phone}<br />E-Mail: {CONTACT.email}</p>
              </div>
              <div>
                <h4 className="font-bold text-white">Haftungsausschluss</h4>
                <p className="text-sm text-slate-300">Unsere Massagen dienen ausschließlich dem Wohlbefinden und der Prävention. Sie stellen keine medizinische Behandlung dar.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DATENSCHUTZ MODAL */}
      <AnimatePresence>
        {datenschutzOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-dark-800 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative text-slate-200 text-base space-y-4"
            >
              <button
                onClick={() => setDatenschutzOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-serif text-2xl font-bold text-white">Datenschutzerklärung</h2>
              <p>Wir verarbeiten Ihre Daten ausschließlich zur Bearbeitung von Termin- und Gutscheinanfragen gemäß DSGVO.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
