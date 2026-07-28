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

// Official SVG WhatsApp Icon Component
const WhatsappIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`${className} shrink-0`} style={{ width: '1rem', height: '1rem' }} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
  specialBg: `${R2_BASE}/Siri-Websiten%20hintergrund_ergebnis.webp`,
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

// Treatment Data with Marketing Benefit Bullet Points
const TREATMENTS = [
  {
    id: 'solution',
    name: 'Thai Solution Massage',
    category: 'solution',
    subtitle: 'Gezielte Schmerztherapie & Linderung bei Verspannungen',
    description: 'Spezifische Tiefenbehandlung für chronisch verspannte Nacken-, Schulter- und Rückenmuskeln. Kombiniert Punkt-Akupressur mit traditionellen thai-medizinischen Grifftechniken.',
    benefits: [
      'Schnelle Schmerzlinderung bei Rücken & Nacken',
      'Lösung tiefsitzender verhärteter Muskelknoten',
      'Verbesserte Durchblutung & Beweglichkeit'
    ],
    durations: [
      { minutes: 60, price: 60 },
      { minutes: 90, price: 90 },
      { minutes: 120, price: 120 }
    ],
    image: IMAGES.treatmentSolution,
    tag: 'Empfehlung bei Schmerzen',
    icon: Flame
  },
  {
    id: 'ruudsen',
    name: 'Thai Ruudsen Massage',
    category: 'ruudsen',
    subtitle: 'Dynamische Mobilisierung & Sehnen-Entlastung',
    description: 'Traditionelle Sehnen- und Gelenkmassage nach alter Thailändischer Schule. Gezielte Dehnung und Streckung zur Befreiung von Steifheit und Förderung der Bewegungsfreiheit.',
    benefits: [
      'Gelenkmobilisierung & tiefenwirksame Dehnung',
      'Befreiung von Bewegungseinschränkungen',
      'Nachhaltige Regeneration für Sehnen & Bänder'
    ],
    durations: [
      { minutes: 60, price: 60 },
      { minutes: 90, price: 90 },
      { minutes: 120, price: 120 }
    ],
    image: IMAGES.treatmentRuudsen,
    tag: 'Mehr Beweglichkeit',
    icon: Sun
  },
  {
    id: 'lymph',
    name: 'Thai Lymphdrainage Massage',
    category: 'lymph',
    subtitle: 'Sanfte Entgiftung & Aktivierung des Stoffwechsels',
    description: 'Rhythmisch-sanfte Behandlung zur Anregung des Lymphsystems. Fördert den Abtransport von Stoffwechselabbauprodukten und entlastet müde, schwere Beine.',
    benefits: [
      'Aktivierung des natürlichen Lymphflusses',
      'Entlastung geschwollener Beine & Arme',
      'Stärkung des körpereigenen Immunsystems'
    ],
    durations: [
      { minutes: 60, price: 60 },
      { minutes: 90, price: 90 },
      { minutes: 120, price: 120 }
    ],
    image: IMAGES.treatmentLymph,
    tag: 'Sanfte Vitalisierung',
    icon: Droplet
  },
  {
    id: 'benja-phakhi',
    name: 'Nuad Thai Benja Phakhi',
    category: 'benja',
    subtitle: 'Original Thai-Königs-Massage • Meister-Methode',
    description: 'Die seltene Benja Phakhi Königs-Massage vereint 5 traditionelle Heilkünste: Wat Po Thaimassage, gezielte Akupressur, japanisches Shiatsu und chinesisches Tuina.',
    benefits: [
      'Ganzheitlicher Ausgleich aller 12 Meridiane',
      'Meisterhafte Technik für höchste Ansprüche',
      'Maximale Lebensenergie & innere Ruhe'
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

// Concise FAQ Data
const FAQS = [
  {
    question: 'Welche Massage ist die richtige für meine Beschwerden?',
    answer: 'Bei chronischen Nacken- und Rückenschmerzen empfehlen wir die Thai Solution Massage. Für maximale Tiefenentspannung und den Ausgleich der 12 Meridiane ist die Nuad Thai Benja Phakhi ideal. Siriwan Pössel berät Sie vor Ort persönlich.'
  },
  {
    question: 'Muss ich Handtücher oder Kleidung mitbringen?',
    answer: 'Nein, wir stellen Ihnen frische Handtücher, bequeme Behandlungskleidung und hochwertige Bio-Öle komplett zur Verfügung. Sie können sich bei uns entspannt zurücklehnen.'
  },
  {
    question: 'Wie kann ich einen Termin buchen oder stornieren?',
    answer: 'Sie können Ihren Wunschtermin direkt über unser Online-Formular anfragen oder eine kurze WhatsApp-Nachricht an 0157 / 563 117 39 senden. Terminabsagen sind bis 24 Stunden vorher kostenfrei.'
  },
  {
    question: 'Wie lange dauern die Massagen?',
    answer: 'Wir bieten Behandlungen von 60, 90 bis 120 Minuten an. Für eine tiefgehende Meridian-Harmonisierung empfehlen wir 90 Minuten.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBookingTreatmentId, setSelectedBookingTreatmentId] = useState<string>(TREATMENTS[0].id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);
  const [barrierefreiheitOpen, setBarrierefreiheitOpen] = useState(false);
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

  const handleOpenBooking = (treatment?: typeof TREATMENTS[0]) => {
    if (treatment) {
      setSelectedBookingTreatmentId(treatment.id);
    }
    setBookingSuccess(false);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const activeModalTreatment = TREATMENTS.find(t => t.id === selectedBookingTreatmentId) || TREATMENTS[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0A1C16] selection:bg-emerald-800 selection:text-white font-sans antialiased">
      
      {/* NAVIGATION HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm py-2.5' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LOGO BRANDING */}
            <a href="#" className="flex items-center gap-3 group">
              <div className={`rounded-full overflow-hidden border border-emerald-800/20 bg-emerald-950 p-0.5 transition-all duration-300 shrink-0 ${
                isScrolled ? 'w-10 sm:w-11 h-10 sm:h-11' : 'w-12 sm:w-14 h-12 sm:h-14'
              }`}>
                <img src={IMAGES.logo} alt="Siri Meridian Massage Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 group-hover:text-emerald-700 transition-colors">
                  Siri <span className="text-gold-gradient italic font-normal">Meridian</span>
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-emerald-800 uppercase font-semibold">
                  Thai & Meridian Massage Nienburg
                </span>
              </div>
            </a>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-emerald-950">
              <a href="#uber-mich" className="hover:text-emerald-700 transition-colors">Über Siriwan</a>
              <a href="#behandlungen" className="hover:text-emerald-700 transition-colors">Preis & Leistungen</a>
              <a href="#gutscheine" className="hover:text-emerald-700 transition-colors">Gutscheine</a>
              <a href="#faq" className="hover:text-emerald-700 transition-colors">FAQ</a>
              <a href="#kontakt" className="hover:text-emerald-700 transition-colors">Kontakt</a>
            </nav>

            {/* HEADER ACTIONS */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href={CONTACT.phoneTel}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/10 border border-emerald-900/15 text-emerald-900 text-xs sm:text-sm font-semibold hover:bg-emerald-900/20 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>

              <button
                onClick={() => handleOpenBooking()}
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-md shadow-emerald-900/15 hover:scale-[1.02] active:scale-[0.98]"
              >
                Termin Buchen
              </button>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white border border-emerald-900/15 text-emerald-950 hover:bg-emerald-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-30 bg-white border-b border-emerald-900/10 shadow-xl lg:hidden p-6 space-y-4"
          >
            <div className="flex flex-col space-y-3 font-semibold text-base text-emerald-950">
              <a href="#uber-mich" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Über Siriwan</a>
              <a href="#behandlungen" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Preis & Leistungen</a>
              <a href="#gutscheine" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Gutscheine</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">FAQ</a>
              <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="py-2">Kontakt & Anfahrt</a>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); handleOpenBooking(); }}
                className="w-full py-3.5 rounded-full font-bold text-white bg-emerald-800 text-sm shadow-md"
              >
                Termin Buchen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 relative overflow-hidden bg-[#FAF8F5]">
        {/* FESTSTEHENDES SPECIAL HINTERGRUNDBILD (99% DECKKRAFT) */}
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-right-top pointer-events-none z-0 opacity-[0.99]"
          style={{ backgroundImage: `url(${IMAGES.specialBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/40 via-transparent to-[#FAF8F5] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* LEFT HERO TEXT CONTENT */}
            <motion.div 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* EYEBROW BADGE */}
              <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-emerald-900 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span>Thai & Meridian Massage Nienburg</span>
              </div>

              {/* MAIN MARKETING HEADLINE */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-950 leading-[1.12] tracking-tight">
                Tiefenentspannung & Schmerzbefreiung durch <br />
                <span className="text-emerald-gradient italic font-normal">meisterhafte Thai-Meridian-Technik.</span>
              </h1>

              {/* SUBLINE */}
              <p className="text-slate-700 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                Erleben Sie die einzigartige Symbiose aus Wat Po Thaimassage, gezielter Akupressur und 12-Meridian-Harmonisierung – <strong className="font-semibold text-emerald-950">individuell abgestimmt auf Ihren Körper.</strong>
              </p>

              {/* HERO CTA BUTTONS */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleOpenBooking()}
                  className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-900/20 text-base flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="w-5 h-5 text-brand-300" />
                  <span>Wunschtermin Jetzt Anfragen</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <a
                  href="#behandlungen"
                  className="px-7 py-4 rounded-full font-semibold text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-900/15 transition-all text-base shadow-sm"
                >
                  Angebote & Preise
                </a>
              </div>

              {/* TRUST SIGNALS BAR */}
              <div className="pt-6 border-t border-emerald-900/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-emerald-900 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-400 shrink-0" />
                  <span>Ausgebildet an der THAIBOOST Akademie</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-400 shrink-0" />
                  <span>Benja Phakhi Königs-Methode</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-400 shrink-0" />
                  <span>Ruhige Wohlfühloase mit Parkplätzen</span>
                </div>
              </div>

            </motion.div>

            {/* RIGHT HERO PORTRAIT IMAGE */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden border border-emerald-900/15 shadow-2xl bg-white p-2">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src={IMAGES.siriPortrait}
                    alt="Siriwan Pössel Inhaberin Siri Meridian Massage Nienburg"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                  
                  {/* OVERLAY BADGE ON HERO IMAGE */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-900/15 text-emerald-950 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-800/30 bg-emerald-950 p-0.5 shrink-0">
                        <img src={IMAGES.logo} alt="Emblem" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-emerald-950 leading-tight">
                          Siriwan Pössel
                        </h4>
                        <p className="text-xs text-slate-600 font-light mt-0.5">
                          Zertifizierte Masseurin & Meridian-Expertin
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ABOUT & 12 MERIDIANE SECTION */}
      <section id="uber-mich" className="py-24 bg-white relative border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT CARDS SHOWCASE */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* CERTIFICATE PHOTO CARD */}
              <div className="relative rounded-3xl overflow-hidden border border-emerald-900/15 shadow-xl bg-white aspect-[16/10] group">
                <img
                  src={IMAGES.certificateSutep}
                  alt="Siriwan Pössel mit Lehrer Sutep Mevattana bei der Zertifikatsübergabe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-900/15 text-emerald-950">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-800/20 flex items-center justify-center text-emerald-900 shrink-0">
                      <Award className="w-5 h-5 text-emerald-800" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-emerald-950 leading-tight">
                        Zertifizierte THAIBOOST Akademie
                      </h4>
                      <p className="text-xs text-slate-600 font-light mt-0.5">
                        Siriwan Pössel & Meister Sutep Mevattana bei der Zertifikatsübergabe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 12 HAUPTMERIDIANE CARD (9:16 PORTRAIT FORMAT) */}
              <div className="p-6 sm:p-7 rounded-3xl glass-card border border-emerald-900/15 shadow-xl bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 group">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  
                  {/* 9:16 Portrait Image Container */}
                  <div className="w-full sm:w-48 md:w-56 aspect-[9/16] rounded-2xl overflow-hidden border border-emerald-900/15 shadow-md shrink-0 bg-slate-900 relative">
                    <img
                      src={IMAGES.meridianModel}
                      alt="Meridian Modell und dtv-Atlas Akupunktur"
                      className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-2.5 right-2.5 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 border border-emerald-900/15 text-[11px] text-emerald-950 font-bold backdrop-blur-md">
                        Anatomisches Meridian-Modell
                      </span>
                    </div>
                  </div>

                  {/* Text Description */}
                  <div className="space-y-3.5 text-center sm:text-left flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-800/20 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                      <Compass className="w-4 h-4 text-emerald-800" />
                      <span>Energielinien & Balance</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                      Die 12 Hauptmeridiane
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed">
                      Achtsame Arbeit entlang der Sen-Linien zur gezielten Lösung tiefsitzender energetischer und muskulärer Verspannungen.
                    </p>
                    <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs font-semibold text-emerald-900">
                      <span className="px-3 py-1.5 rounded-xl bg-white border border-emerald-900/10 shadow-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Wat Po Tradition
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-white border border-emerald-900/10 shadow-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Shiatsu & Tuina
                      </span>
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
              <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                <Feather className="w-3.5 h-3.5 text-brand-400" />
                <span>Über Siriwan Pössel</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 leading-tight">
                Traditionelle Heilkunst trifft auf <br />
                <span className="text-emerald-gradient italic font-normal">fundierte Ganzheitlichkeit.</span>
              </h2>

              <p className="text-slate-700 text-base sm:text-lg font-light leading-relaxed">
                Siriwan Pössel verbindet die jahrhundertealte Tradition der thailändischen Heilmassage mit moderner Meridianlehre. Ihre Ausbildung an der renommieren THAIBOOST Akademie sowie die seltene Meisterqualifikation in der Nuad Thai Benja Phakhi Königs-Massage garantieren höchste Behandlungsqualität.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-emerald-900/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-base">Wat Po & Shiatsu Tradition</h4>
                    <p className="text-sm text-slate-600 font-light mt-0.5">
                      Präzise Akupressur und Dehnungen nach den Richtlinien der ältesten Thai-Massageschule Bangkoks.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-emerald-900/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-base">Individuelle Schmerzanalyse</h4>
                    <p className="text-sm text-slate-600 font-light mt-0.5">
                      Jede Behandlung wird persönlich auf Ihre spezifischen Muskelverspannungen und Wünsche abgestimmt.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* TREATMENTS & PRICING SECTION */}
      <section id="behandlungen" className="py-24 relative overflow-hidden bg-[#FAF8F5]">
        {/* FESTSTEHENDES SPECIAL HINTERGRUNDBILD (99% DECKKRAFT) */}
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-right-center pointer-events-none z-0 opacity-[0.99]"
          style={{ backgroundImage: `url(${IMAGES.specialBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-[#FAF8F5]/40 to-[#FAF8F5]/90 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* SECTION HEADER */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <Flower2 className="w-4 h-4 text-brand-400" />
              <span>Angebote & Tarife</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950">
              Unsere <span className="text-emerald-gradient italic font-normal">Preis- & Leistungsübersicht</span>
            </h2>
            <p className="text-slate-700 text-base sm:text-lg font-light">
              Wählen Sie die passende Heilanwendung für Ihr Wohlbefinden. Alle Massagen werden individuell angepasst.
            </p>
          </div>

          {/* TREATMENTS CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {TREATMENTS.map((treatment) => {
              const IconComp = treatment.icon;
              return (
                <motion.div
                  key={treatment.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between group border border-emerald-900/15 hover:border-emerald-700/40 transition-all duration-500 shadow-lg hover:shadow-xl bg-white"
                >
                  {/* CARD TOP LANDSCAPE HEADER BANNER */}
                  <div className="h-56 sm:h-64 relative overflow-hidden bg-slate-900">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent" />
                    
                    {/* TAG BADGE ON IMAGE */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-emerald-950 text-xs font-bold border border-emerald-900/10 shadow-sm flex items-center gap-1.5">
                        <IconComp className="w-3.5 h-3.5 text-brand-400" />
                        {treatment.tag}
                      </span>
                    </div>

                    {/* OVERLAY TITLE ON IMAGE */}
                    <div className="absolute bottom-5 left-5 right-5 space-y-1">
                      <span className="text-xs font-bold uppercase text-brand-300 tracking-wider block">
                        {treatment.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
                        {treatment.name}
                      </h3>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-light">
                      {treatment.description}
                    </p>

                    {/* BENEFITS LIST */}
                    <div className="space-y-2.5 py-3 border-y border-slate-100">
                      {treatment.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-800 shrink-0 mt-0.5" />
                          <span className="font-medium">{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* DURATIONS & PRICES FOOTER */}
                    <div className="pt-2 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-slate-500 font-semibold mr-1">Dauer & Tarif:</span>
                        {treatment.durations.map((d, i) => (
                          <div
                            key={i}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-900/15 flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-950"
                          >
                            <Clock className="w-3.5 h-3.5 text-emerald-800" />
                            <span>{d.minutes} Min</span>
                            <span className="text-brand-500 ml-1">{d.price} €</span>
                          </div>
                        ))}
                      </div>

                      {/* BOOKING BUTTON */}
                      <button
                        onClick={() => handleOpenBooking(treatment)}
                        className="w-full py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-md shadow-emerald-900/15 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5"
                      >
                        <Calendar className="w-4.5 h-4.5 text-brand-300" />
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

      {/* GIFT VOUCHER SECTION */}
      <section id="gutscheine" className="py-20 relative overflow-hidden bg-white border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-300 text-xs font-bold uppercase tracking-wider">
                  <Gift className="w-4 h-4 text-brand-300" />
                  <span>Das Perfekte Geschenk</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Schenken Sie unvergessliche <span className="text-brand-300 italic font-normal">Wohlfühl-Auszeiten.</span>
                </h2>
                <p className="text-slate-200 text-base sm:text-lg font-light max-w-2xl">
                  Überraschen Sie Ihre Liebsten mit einem edlen Geschenkgutschein von Siri Meridian Massage – erhältlich für jeden Wunschbetrag oder spezifische Behandlungen.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button
                  onClick={() => setGiftModalOpen(true)}
                  className="px-8 py-4 rounded-full font-bold text-emerald-950 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 hover:from-brand-400 hover:to-brand-600 transition-all shadow-xl text-base flex items-center gap-3 hover:scale-105"
                >
                  <Gift className="w-5 h-5 text-emerald-950" />
                  <span>Gutschein Bestellen</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-brand-400" />
              <span>Häufig Gestellte Fragen</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
              Wissenswertes zu <span className="text-emerald-gradient italic font-normal">Ihrer Behandlung</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-emerald-900/10 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-emerald-950 text-base sm:text-lg hover:text-emerald-700"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-800 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 text-slate-700 text-sm sm:text-base font-light leading-relaxed border-t border-slate-100 pt-4"
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

      {/* CONTACT & LOCATION SECTION */}
      <section id="kontakt" className="py-24 bg-white relative overflow-hidden border-t border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* LEFT CONTACT INFO & STUDIO SHOWCASE */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" />
                  <span>Studio & Kontakt</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 leading-tight">
                  Besuchen Sie unser <br />
                  <span className="text-emerald-gradient italic font-normal">Studio in Nienburg</span>
                </h2>
                <p className="text-slate-700 text-base sm:text-lg font-light leading-relaxed">
                  Wir freuen uns darauf, Sie persönlich in unserer harmonischen Wohlfühloase bei Siri Meridian Massage begrüßen zu dürfen.
                </p>
              </div>

              {/* Studio Interior Showcase Image */}
              <div className="rounded-3xl overflow-hidden border border-emerald-900/15 aspect-[16/10] bg-slate-900 relative group shadow-xl">
                <img
                  src={IMAGES.roomMain}
                  alt="Siri Meridian Massage Studio An der Breiten Riede 26 Nienburg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-900/15 text-sm text-emerald-950 shadow-md">
                  <div className="font-bold text-emerald-950 flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>{CONTACT.fullAddress}</span>
                  </div>
                  <span className="text-xs text-slate-600 block pl-6 mt-0.5 font-light">Ruhige Wohlfühloase mit kostenfreien Kundenparkplätzen</span>
                </div>
              </div>

              {/* Contact Information Cards (Clean 2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Studio Adresse */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-emerald-900/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Studio Adresse</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                    {CONTACT.street}<br />
                    {CONTACT.zipCity}
                  </p>
                  <span className="text-[11px] text-slate-500 block pt-0.5">Kostenfreie Kundenparkplätze</span>
                </div>

                {/* Telefon & WhatsApp mit kleinem WhatsApp-Symbol direkt neben der Nummer */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-emerald-900/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <Phone className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Telefon & WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a href={CONTACT.phoneTel} className="text-sm sm:text-base font-bold text-emerald-950 hover:text-emerald-700 transition-colors">
                      {CONTACT.phone}
                    </a>
                    <a
                      href="https://wa.me/4915756311739?text=Hallo%20Siriwan,%20ich%20möchte%20gerne%20einen%20Termin%20anfragen."
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp Chat starten"
                      className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm flex items-center justify-center shrink-0"
                    >
                      <WhatsappIcon className="w-4 h-4 shrink-0 text-white" />
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-500 block">WhatsApp Termine möglich</span>
                </div>

                {/* E-Mail-Kontakt */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-emerald-900/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <Mail className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>E-Mail-Kontakt</span>
                  </div>
                  <a href={`mailto:${CONTACT.email}`} className="text-xs sm:text-sm text-emerald-950 font-semibold hover:text-emerald-700 break-all block">
                    {CONTACT.email}
                  </a>
                </div>

                {/* Öffnungszeiten */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-emerald-900/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Öffnungszeiten</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug font-light">
                    <strong className="text-emerald-950 font-semibold">Mo – Sa:</strong> 09:00 – 19:30 Uhr<br />
                    <span className="text-[11px] text-slate-500">So & Feiertage nach Absprache</span>
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT APPOINTMENT REQUEST FORM CARD (COMPACT & LIGHT) */}
            <div className="lg:col-span-7">
              <div className="p-7 sm:p-9 rounded-3xl bg-[#FAF8F5] border border-emerald-900/15 shadow-xl space-y-6 relative overflow-hidden">
                
                {/* FORM HEADER WITH EMBLEM */}
                <div className="flex items-center gap-4 pb-4 border-b border-emerald-900/10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-800/30 bg-emerald-950 p-0.5 shrink-0 shadow-md">
                    <img src={IMAGES.logo} alt="Siri Meridian Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-emerald-800 font-bold tracking-wider block">Online Terminvereinbarung</span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                      Wunschtermin Anfragen
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-light mt-0.5">
                      Senden Sie Ihre Anfrage – Siriwan Pössel antwortet Ihnen persönlich in Kürze.
                    </p>
                  </div>
                </div>
                
                {/* FORM FIELDS */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1.5">
                          Ihr Name *
                        </label>
                        <div className="relative">
                          <User className="w-4.5 h-4.5 text-emerald-800 absolute left-4 top-4 pointer-events-none" />
                          <input
                            type="text"
                            required
                            placeholder="Vor- und Nachname"
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-emerald-900/15 text-emerald-950 placeholder-slate-400 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-sm font-medium transition-all shadow-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1.5">
                          Telefonnummer (für Rückruf/WhatsApp) *
                        </label>
                        <div className="relative">
                          <Phone className="w-4.5 h-4.5 text-emerald-800 absolute left-4 top-4 pointer-events-none" />
                          <input
                            type="tel"
                            required
                            placeholder={CONTACT.phoneDisplay}
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-emerald-900/15 text-emerald-950 placeholder-slate-400 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-sm font-medium transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1.5">
                          Wunschbehandlung *
                        </label>
                        <div className="relative">
                          <Sparkles className="w-4.5 h-4.5 text-emerald-800 absolute left-4 top-4 pointer-events-none" />
                          <select
                            value={selectedBookingTreatmentId}
                            onChange={(e) => setSelectedBookingTreatmentId(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-emerald-900/15 text-emerald-950 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-sm font-medium transition-all appearance-none cursor-pointer shadow-sm"
                          >
                            {TREATMENTS.map(t => (
                              <option key={t.id} value={t.id} className="bg-white text-emerald-950">{t.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1.5">
                          Wunschdatum & Uhrzeit
                        </label>
                        <div className="relative">
                          <Calendar className="w-4.5 h-4.5 text-emerald-800 absolute left-4 top-4 pointer-events-none" />
                          <input
                            type="datetime-local"
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-emerald-900/15 text-emerald-950 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-sm font-medium transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1.5">
                        Anmerkungen oder spezifische Beschwerden
                      </label>
                      <textarea
                        rows={3}
                        placeholder="z. B. Nacken- oder Rückenverspannungen, Wunschuhrzeit oder Fragen..."
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-emerald-900/15 text-emerald-950 placeholder-slate-400 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 text-sm font-medium transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-xl shadow-emerald-900/20 text-base flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Send className="w-5 h-5 text-brand-300" />
                      <span>Terminanfrage Jetzt Verbindlich Absenden</span>
                    </button>

                    {/* TRUST GUARANTEES */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                        <span>Schnelle Rückmeldung</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                        <span>Keine Vorkasse</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                        <span>Kostenlose Stornierung</span>
                      </div>
                    </div>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER (DEEP EMERALD DARK SLATE) */}
      <footer className="bg-[#071F17] border-t border-emerald-900/20 pt-16 pb-12 text-slate-300 text-sm">
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
                <li><a href="#behandlungen" className="hover:text-brand-400">Preis & Leistungen</a></li>
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
                <li>
                  <button onClick={() => setBarrierefreiheitOpen(true)} className="hover:text-brand-400">
                    Erklärung zur Barrierefreiheit
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

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-xs sm:text-sm">
            <div>
              © {new Date().getFullYear()} {CONTACT.name}. Alle Rechte vorbehalten.
            </div>
            <div>
              Massagen dienen der Prävention & Entspannung. Keine medizinischen Heilversprechen.
            </div>
          </div>

        </div>
      </footer>

      {/* DYNAMIC BOOKING MODAL */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-emerald-900/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-6 text-emerald-950"
            >
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-emerald-50 text-slate-500 hover:text-emerald-950"
              >
                <X className="w-6 h-6" />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-emerald-950">Vielen Dank für Ihre Anfrage!</h3>
                  <p className="text-base text-slate-700">
                    Wir haben Ihre Anfrage für <strong>{activeModalTreatment.name}</strong> erhalten. Siriwan Pössel meldet sich in Kürze persönlich bei Ihnen.
                  </p>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="px-6 py-3 rounded-full bg-emerald-800 text-white font-bold text-base shadow-md"
                  >
                    Fenster Schließen
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-800/30 bg-emerald-950 p-0.5 shrink-0">
                      <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-xs uppercase text-emerald-800 font-bold tracking-wider">Online Terminbuchen</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950">
                        Termin Anfragen
                      </h3>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1.5">
                        1. Massage-Art Auswählen *
                      </label>
                      <select
                        value={selectedBookingTreatmentId}
                        onChange={(e) => setSelectedBookingTreatmentId(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-emerald-900/15 text-emerald-950 font-medium text-base focus:outline-none focus:border-emerald-700 shadow-sm"
                      >
                        {TREATMENTS.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.name} – {t.subtitle}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        2. Behandlungsdauer & Tarif *
                      </label>
                      <select className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-emerald-900/15 text-emerald-950 text-base font-medium focus:outline-none focus:border-emerald-700">
                        {activeModalTreatment.durations.map((d, i) => (
                          <option key={i} value={d.minutes}>
                            {d.minutes} Minuten – {d.price} €
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">3. Ihr Name *</label>
                      <input type="text" required placeholder="Vor- und Nachname" className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-emerald-900/15 text-emerald-950 text-base focus:outline-none focus:border-emerald-700" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Telefon *</label>
                        <input type="tel" required placeholder={CONTACT.phoneDisplay} className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-emerald-900/15 text-emerald-950 text-base focus:outline-none focus:border-emerald-700" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Wunschdatum</label>
                        <input type="datetime-local" required className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-emerald-900/15 text-emerald-950 text-base focus:outline-none focus:border-emerald-700" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full font-bold text-white bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-lg text-base"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-emerald-900/15 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-4 text-emerald-950"
            >
              <button
                onClick={() => setGiftModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-emerald-50 text-slate-500 hover:text-emerald-950"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-emerald-800/30 bg-emerald-950 p-0.5 mx-auto shadow-md">
                  <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-emerald-950">Geschenkgutschein Bestellen</h3>
                <p className="text-sm text-slate-600">Rufen Sie Siriwan Pössel direkt an oder schreiben Sie per WhatsApp:</p>
              </div>

              <div className="p-4.5 rounded-2xl bg-emerald-50 border border-emerald-900/10 text-center space-y-2">
                <div className="text-xs text-emerald-900 uppercase font-bold tracking-wider">Hotline & WhatsApp:</div>
                <a href={CONTACT.phoneTel} className="font-serif text-2xl font-bold text-emerald-950 hover:underline block">
                  {CONTACT.phone}
                </a>
              </div>

              <button
                onClick={() => setGiftModalOpen(false)}
                className="w-full py-3.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-semibold text-base"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white border border-emerald-900/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative text-slate-800 text-base space-y-4"
            >
              <button
                onClick={() => setImpressumOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-emerald-50 text-slate-500 hover:text-emerald-950"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-serif text-2xl font-bold text-emerald-950">Impressum</h2>
              <div>
                <h4 className="font-bold text-emerald-950">Angaben gemäß § 5 TMG</h4>
                <p>{CONTACT.name}<br />Inhaberin: {CONTACT.owner}<br />{CONTACT.street}<br />{CONTACT.zipCity}</p>
              </div>
              <div>
                <h4 className="font-bold text-emerald-950">Kontakt</h4>
                <p>Telefon: {CONTACT.phone}<br />E-Mail: {CONTACT.email}</p>
              </div>
              <div>
                <h4 className="font-bold text-emerald-950">Haftungsausschluss</h4>
                <p className="text-sm text-slate-600">Unsere Massagen dienen ausschließlich dem Wohlbefinden und der Prävention. Sie stellen keine medizinische Behandlung dar.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DATENSCHUTZ MODAL */}
      <AnimatePresence>
        {datenschutzOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white border border-emerald-900/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative text-slate-800 text-base space-y-4"
            >
              <button
                onClick={() => setDatenschutzOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-emerald-50 text-slate-500 hover:text-emerald-950"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-serif text-2xl font-bold text-emerald-950">Datenschutzerklärung</h2>
              <p>Wir verarbeiten Ihre Daten ausschließlich zur Bearbeitung von Termin- und Gutscheinanfragen gemäß DSGVO.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BARRIEREFREIHEITSERKLÄRUNG MODAL */}
      <AnimatePresence>
        {barrierefreiheitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white border border-emerald-900/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative text-slate-800 text-base space-y-4"
            >
              <button
                onClick={() => setBarrierefreiheitOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-emerald-50 text-slate-500 hover:text-emerald-950"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-serif text-2xl font-bold text-emerald-950">Erklärung zur Barrierefreiheit</h2>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                Siri Meridian Massage ist bemüht, die eigene Website im Einklang mit den Bestimmungen des Barrierefreiheitsstärkungsgesetzes (BFSG) sowie den Richtlinien der Web Content Accessibility Guidelines (WCAG 2.1 – Konformitätsstufe AA) barrierefrei zugänglich zu machen.
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-emerald-950">Stand der Vereinbarkeit</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Diese Website ist mit den Vorgaben der BITV 2.0 weitestgehend vereinbar. Wir arbeiten kontinuierlich daran, Bedienbarkeit, Kontraste, Tastaturnavigation und Screenreader-Kompatibilität weiter zu optimieren.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-emerald-950">Feedback und Kontakt</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sollten Ihnen Mängel in Bezug auf die barrierefreie Gestaltung unserer Website auffallen, können Sie uns jederzeit kontaktieren:
                </p>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-900/10 text-sm space-y-1 text-slate-800">
                  <div className="font-bold text-emerald-950">Siri Meridian Massage</div>
                  <div>Inhaberin: {CONTACT.owner}</div>
                  <div>Adresse: {CONTACT.fullAddress}</div>
                  <div>Telefon: <a href={CONTACT.phoneTel} className="text-emerald-800 font-semibold hover:underline">{CONTACT.phone}</a></div>
                  <div>E-Mail: <a href={`mailto:${CONTACT.email}`} className="text-emerald-800 font-semibold hover:underline">{CONTACT.email}</a></div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
