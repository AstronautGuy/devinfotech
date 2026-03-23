"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    try {
      const { submitContactForm } = await import("@/actions/ContactAction");
      
      const result = await submitContactForm(formData);
      
      if (result?.error) {
        setFormStatus("error");
        alert(result.error);
      } else {
        setFormStatus("success");
        formElement.reset();
      }
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    } finally {
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden flex items-center justify-center py-28">
      {/* Dynamic Floating Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--primary-accent)]/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-[5%] max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Header & Contact Grid (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-transparent mb-4">
                Let&apos;s Build Together
              </h1>
              <p className="text-lg text-slate-600 max-w-md">
                We answer every inquiry promptly. Send us a message or find our locations directly.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Mail, title: "Email Us", detail: "info@devinfotech.net", link: "mailto:info@devinfotech.net" },
                { icon: Phone, title: "Call Direct", detail: "+91 98250 39020", link: "tel:9825039020" },
                { icon: MapPin, title: "Visit Office", detail: "TF 63, Earth Eon, New Sama, Vadodara" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 bg-white/75 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group"
                  >
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--primary-accent)] to-blue-500 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.title}</p>
                      {item.link ? (
                        <a href={item.link} className="text-slate-800 font-bold hover:text-[var(--primary-accent)] transition-colors">
                          {item.detail}
                        </a>
                      ) : (
                        <p className="text-slate-800 font-bold">{item.detail}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>


          </div>

          {/* RIGHT COLUMN: Glass Form (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-2xl space-y-8 flex flex-col justify-center"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">Send a Message</h3>
              <p className="text-sm text-slate-500">We respond to all tickets in under 2 working hours.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-slate-200 p-2 text-slate-900 focus:outline-none focus:border-[var(--primary-accent)] transition-colors"
                  />
                  <label className="absolute left-0 -top-4 text-slate-400 text-xs transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--primary-accent)] cursor-text">
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-slate-200 p-2 text-slate-900 focus:outline-none focus:border-[var(--primary-accent)] transition-colors"
                  />
                  <label className="absolute left-0 -top-4 text-slate-400 text-xs transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--primary-accent)] cursor-text">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input
                  name="subject"
                  type="text"
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-slate-200 p-2 text-slate-900 focus:outline-none focus:border-[var(--primary-accent)] transition-colors"
                />
                <label className="absolute left-0 -top-4 text-slate-400 text-xs transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--primary-accent)] cursor-text">
                  Subject
                </label>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-slate-200 p-2 text-slate-900 focus:outline-none focus:border-[var(--primary-accent)] transition-colors resize-none"
                ></textarea>
                <label className="absolute left-0 -top-4 text-slate-400 text-xs transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--primary-accent)] cursor-text">
                  Message Details
                </label>
              </div>

              <div className="pt-2 flex justify-center w-full">
                <Turnstile siteKey={process.env.TURNSTILE_SITE_KEY!} />
              </div>

              <div className="pt-4">
                {formStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center justify-center gap-2 font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent Successfully!
                  </motion.div>
                ) : (
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="group relative w-full overflow-hidden p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--primary-accent)] to-cyan-400 group-hover:h-full transition-all duration-300 -z-10" />
                    {formStatus === "sending" ? "Sending..." : "Submit Inquiry"}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* Full-width Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 w-full rounded-3xl overflow-hidden border border-slate-200/50 shadow-2xl relative"
        >
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-900/5 to-transparent pointer-events-none z-10" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.344640743591!2d73.20148427586726!3d22.340612041431918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf29b911c9d1%3A0x8452f3f2f53bf791!2sDev%20Infotech!5e0!3m2!1sen!2sin!4v1757838840866!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="w-full h-[450px] md:h-[500px]"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}
