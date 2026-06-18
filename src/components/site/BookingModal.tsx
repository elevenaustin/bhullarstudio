import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone, Mail, User, MapPin, Sparkles, Check, ChevronDown, Camera, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    eventType: "wedding",
    location: "",
    notes: "",
  });

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const message = `✨ *New Slot Booking Request - Bhullar Studio* ✨\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email}\n` +
      `📅 *Date:* ${formData.date}\n` +
      `🎥 *Category:* ${formData.eventType.toUpperCase()}\n` +
      `📍 *Location:* ${formData.location}\n` +
      `📝 *Notes/Vision:* ${formData.notes || 'N/A'}`;

    const whatsappUrl = `https://wa.me/919814944201?text=${encodeURIComponent(message)}`;

    // Wait a brief moment to show status change, then open tab
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setSending(false);
      setSuccess(true);
      toast.success("Redirecting to WhatsApp to complete your booking...");
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "",
      eventType: "wedding",
      location: "",
      notes: "",
    });
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white text-foreground rounded-3xl w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 border border-border"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-foreground/80 hover:text-foreground shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="size-4" />
            </button>

            {/* Left Side: Visual/Branding Panel */}
            <div className="hidden md:flex md:w-[38%] relative bg-black flex-col justify-between p-8 text-white">
              {/* background image */}
              <div className="absolute inset-0 opacity-70">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Cinematic couple photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
              </div>

              {/* Logo / Top section */}
              <div className="relative z-10 flex items-center gap-2">
                <div className="size-7 rounded-full border border-gold/40 text-gold flex items-center justify-center bg-gold/10">
                  <Camera className="size-3.5" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-lg leading-none" style={{ fontFamily: "'Pinyon Script', cursive" }}>
                    Bhullar
                  </span>
                  <span className="text-[6px] tracking-[0.3em] uppercase text-white/60">
                    Photography
                  </span>
                </div>
              </div>

              {/* Tagline / Bottom section */}
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[8px] tracking-[0.2em] uppercase text-gold">
                  <Sparkles className="size-2.5" />
                  <span>Reserve Session</span>
                </div>
                <h3 className="text-display text-2xl leading-tight text-white">
                  Capturing <br />
                  <em className="text-gold font-normal">timeless beauty</em> <br />
                  in every details.
                </h3>
                <p className="text-[10px] text-white/60 leading-relaxed font-sans tracking-wide">
                  Chandigarh · Delhi · International
                </p>
              </div>
            </div>

            {/* Right Side: Form / Success Panel */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[80vh] md:max-h-none flex flex-col justify-center bg-white">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <span className="text-[9px] tracking-[0.4em] uppercase text-gold font-semibold block mb-1">
                        Online Reservation
                      </span>
                      <h2 className="text-display text-2xl sm:text-3xl text-foreground">
                        Book Your <em className="text-gold">Slot</em>
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Fill out your information and we will contact you to customize your session.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                            Your Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Kabir Singh"
                              className="w-full bg-transparent border border-border focus:border-gold rounded-full pl-9 pr-4 py-2.5 text-xs outline-none text-foreground transition-all placeholder:text-muted-foreground/40"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                            Contact Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="e.g. +91 98765 43210"
                              className="w-full bg-transparent border border-border focus:border-gold rounded-full pl-9 pr-4 py-2.5 text-xs outline-none text-foreground transition-all placeholder:text-muted-foreground/40"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email & Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="e.g. info@domain.com"
                              className="w-full bg-transparent border border-border focus:border-gold rounded-full pl-9 pr-4 py-2.5 text-xs outline-none text-foreground transition-all placeholder:text-muted-foreground/40"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                            Preferred Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                            <input
                              type="date"
                              required
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                              className="w-full bg-transparent border border-border focus:border-gold rounded-full pl-9 pr-4 py-2.5 text-xs outline-none text-foreground transition-all placeholder:text-muted-foreground/40 [color-scheme:light]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Event Type & Location */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                            Event Type
                          </label>
                          <div className="relative">
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none" />
                            <select
                              value={formData.eventType}
                              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                              className="w-full bg-transparent border border-border focus:border-gold rounded-full px-4 py-2.5 text-xs outline-none text-foreground transition-all appearance-none cursor-pointer"
                            >
                              <option value="wedding">Wedding Shoot</option>
                              <option value="pre-wedding">Pre-Wedding Shoot</option>
                              <option value="portrait">Portrait / Editorial</option>
                              <option value="commercial">Commercial / Brand</option>
                              <option value="events">Corporate / Events</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                            Shoot Location / City
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                            <input
                              type="text"
                              required
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              placeholder="e.g. Chandigarh, India"
                              className="w-full bg-transparent border border-border focus:border-gold rounded-full pl-9 pr-4 py-2.5 text-xs outline-none text-foreground transition-all placeholder:text-muted-foreground/40"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Vision / Notes */}
                      <div>
                        <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                          Tell Us About Your Vision (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Themes, number of days, expected duration..."
                          className="w-full bg-transparent border border-border focus:border-gold rounded-2xl px-4 py-2.5 text-xs outline-none text-foreground transition-all resize-none placeholder:text-muted-foreground/40"
                        />
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3.5 mt-2 rounded-full bg-foreground text-background text-[10px] tracking-[0.25em] font-semibold uppercase hover:bg-foreground/90 active:scale-[0.99] transition-all disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        {sending ? "Verifying Availability..." : "Request Slot Booking"}
                        {!sending && <Sparkles className="size-3.5 text-gold" />}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-8 flex flex-col items-center justify-center"
                  >
                    <div className="size-16 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-6 animate-pulse">
                      <Check className="size-8" />
                    </div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold mb-2 block">
                      Booking Confirmed
                    </span>
                    <h2 className="text-display text-3xl text-foreground">
                      Slot Requested!
                    </h2>
                    <div className="h-px w-20 bg-gold/30 my-4" />
                    <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-8">
                      Thank you, <strong className="text-foreground">{formData.name}</strong>. We've generated your booking details.
                      WhatsApp has been launched to send this directly to the studio. If the window did not open, click the button below to send manually.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                      <a
                        href={`https://wa.me/919814944201?text=${encodeURIComponent(
                          `✨ *New Slot Booking Request - Bhullar Studio* ✨\n\n` +
                          `👤 *Name:* ${formData.name}\n` +
                          `📞 *Phone:* ${formData.phone}\n` +
                          `✉️ *Email:* ${formData.email}\n` +
                          `📅 *Date:* ${formData.date}\n` +
                          `🎥 *Category:* ${formData.eventType.toUpperCase()}\n` +
                          `📍 *Location:* ${formData.location}\n` +
                          `📝 *Notes/Vision:* ${formData.notes || 'N/A'}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 rounded-full bg-gold text-white text-[10px] tracking-[0.2em] font-semibold uppercase hover:bg-foreground hover:scale-105 border border-gold/15 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <MessageCircle className="size-3.5" />
                        Send on WhatsApp
                      </a>
                      <button
                        onClick={handleReset}
                        className="px-8 py-3.5 rounded-full border border-foreground/20 text-foreground text-[10px] tracking-[0.2em] font-semibold uppercase hover:bg-foreground hover:text-background transition-all cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
