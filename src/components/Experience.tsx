import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  { company: "Findem", logo: "https://media.licdn.com/dms/image/v2/D4E0BAQEk3cLH6qIKlw/company-logo_100_100/B4EZz3EsEyIsAQ-/0/1773671727972/findeminc_logo?e=1776297600&v=beta&t=4lxChnxm7xnxqF_gnc4uLVbPllvX0LmZVVgi3GEkXyI", role: "Analyst – Search Engine", date: "Jul 2025 – Present", achievement: "Product & Data Strategy", desc: "Driving strategic decision-making and operational efficiency using data analysis and ETL tools at a leading talent intelligence company.", color: "indigo" },
  { company: "Deloitte", logo: "https://media.licdn.com/dms/image/v2/C560BAQGNtpblgQpJoQ/company-logo_100_100/company-logo_100_100/0/1662120928214/deloitte_logo?e=1776297600&v=beta&t=wKlrTLNhO-lnI0fsBHXagoGAaxKbRpOAzFtCE523klg", role: "Analyst", date: "Sep 2024 – May 2025", achievement: "Instant Impact Award", desc: "Consulting role analyzing business processes and transforming complex data into actionable strategic insights for enterprise clients.", color: "green" },
  { company: "topmate.io", logo: "https://media.licdn.com/dms/image/v2/D560BAQGsl1Ab9W3R7A/company-logo_100_100/company-logo_100_100/0/1731241647690/topmate_io_logo?e=1776297600&v=beta&t=GNOlLFNzdNES_gIQ5HzF0MoLo2N9UhxF019E0HzUV8E", role: "Data Analyst Consultant", date: "Jan 2024 – Present", achievement: "Verified Creator", desc: "Spearheaded 10+ consulting projects improving operational efficiency by 30%. Designed lead gen frameworks increasing conversion rates by 25–40%.", color: "purple" },
  { company: "Simplilearn", logo: "https://media.licdn.com/dms/image/v2/D560BAQGrNBFNEIlxNg/company-logo_100_100/B56ZzhMj53KYAQ-/0/1773304692834/simplilearn_logo?e=1776297600&v=beta&t=2UW7XhVHyK1_aMfqX93-xnn0LEJcEXrb3q0H2EO9ApE", role: "Project Manager", date: "Jan 2023 – Mar 2024", achievement: "Consistent Performer · 2 Qtrs", desc: "Led initiatives integrating ChatGPT across platforms, boosting course completion rates by 20%. Resolved 250+ tickets with CSAT 4.5/5.", color: "orange" },
  { company: "Cashfree", logo: "https://media.licdn.com/dms/image/v2/C560BAQF4u3uIRgM6Cg/company-logo_100_100/company-logo_100_100/0/1632367052546/cashfree_logo?e=1776297600&v=beta&t=zs0n88POohX92ytu0ZI1_NUzyd1XapKrrApTkyocm18", role: "Product Analyst", date: "Apr 2022 – Dec 2022", achievement: "GEM — Going Extra Mile", desc: "Boosted revenue for Retail Bank products using data-driven Python insights. Detected 100+ non-transacting merchants and enhanced CX.", color: "yellow" },
  { company: "iScholar", logo: "https://logo.clearbit.com/ischolar.in", role: "Business Operation & Analytics", date: "Nov 2021 – May 2022", achievement: "Conversion +20%", desc: "Created advanced Power BI dashboards and automated Zoom attendance tracking; reduced customer acquisition costs by 15%.", color: "teal" },
];

const skills = ["Findem Talent Data Cloud", "Machine Learning", "Python", "Power BI", "SQL", "Technical SEO", "Data Strategy", "Canvas", "Frontend", "Web Testing"];

const colorMap: Record<string, { dot: string; badge: string; line: string }> = {
  indigo: { dot: "bg-indigo-500 shadow-indigo-500/50", badge: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400", line: "from-indigo-500/60" },
  green:  { dot: "bg-emerald-500 shadow-emerald-500/50", badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400", line: "from-emerald-500/60" },
  purple: { dot: "bg-purple-500 shadow-purple-500/50", badge: "bg-purple-500/10 border-purple-500/30 text-purple-400", line: "from-purple-500/60" },
  orange: { dot: "bg-orange-500 shadow-orange-500/50", badge: "bg-orange-500/10 border-orange-500/30 text-orange-400", line: "from-orange-500/60" },
  yellow: { dot: "bg-amber-500 shadow-amber-500/50", badge: "bg-amber-500/10 border-amber-500/30 text-amber-400", line: "from-amber-500/60" },
  teal:   { dot: "bg-teal-500 shadow-teal-500/50", badge: "bg-teal-500/10 border-teal-500/30 text-teal-400", line: "from-teal-500/60" },
};

function TimelineItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const colors = colorMap[exp.color];
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-x-6 md:gap-x-10 mb-16 last:mb-0">
      {/* LEFT content */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`${isLeft ? 'col-start-1' : 'col-start-3'} ${isLeft ? '' : 'row-start-1'}`}
      >
        {isLeft && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-all duration-300 group hover:bg-zinc-900/90 text-right">
            <LogoBlock exp={exp} colors={colors} right />
          </div>
        )}
      </motion.div>

      {/* CENTER dot + line */}
      <div className="col-start-2 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={`w-4 h-4 rounded-full ${colors.dot} shadow-lg mt-6 shrink-0 z-10`}
        />
        {index < experiences.length - 1 && (
          <div className={`w-px flex-1 bg-gradient-to-b ${colors.line} to-transparent mt-2`} />
        )}
      </div>

      {/* RIGHT content */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`${!isLeft ? 'col-start-3' : 'col-start-3'} row-start-1`}
      >
        {!isLeft && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-all duration-300 group hover:bg-zinc-900/90">
            <LogoBlock exp={exp} colors={colors} right={false} />
          </div>
        )}
        {isLeft && (
          <div className="pt-4">
            <span className={`text-[10px] font-mono uppercase tracking-widest text-zinc-600`}>{exp.date}</span>
          </div>
        )}
      </motion.div>

      {/* Date on left when right side card */}
      {!isLeft && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-start-1 row-start-1 flex items-start justify-end pt-4"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 text-right">{exp.date}</span>
        </motion.div>
      )}
    </div>
  );
}

function LogoBlock({ exp, colors, right }: { exp: typeof experiences[0]; colors: typeof colorMap['indigo']; right: boolean }) {
  return (
    <>
      <div className={`flex items-center gap-3 mb-4 ${right ? 'justify-end' : 'justify-start'}`}>
        <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-md shrink-0 ${right ? 'order-last' : 'order-first'}`}>
          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${exp.company}&background=333&color=fff&size=40`; }} />
        </div>
        <div className={right ? 'text-right' : 'text-left'}>
          <h3 className="text-white font-bold text-base">{exp.company}</h3>
          <p className="text-zinc-400 text-xs">{exp.role}</p>
        </div>
      </div>
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider mb-3 ${colors.badge}`}>
        <span>★</span> {exp.achievement}
      </div>
      <p className={`text-zinc-500 text-xs leading-relaxed ${right ? 'text-right' : 'text-left'}`}>{exp.desc}</p>
    </>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 bg-zinc-950 overflow-hidden">
      {/* Subtle mesh gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono tracking-widest uppercase">
            Career Timeline
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Journey</h2>
          <p className="text-zinc-500 mt-4 text-lg font-light">From analytics intern to product strategist across 4 cities.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line baseline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800/50 -translate-x-1/2" />
          {experiences.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} />
          ))}
        </div>

        {/* Skills row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-16 border-t border-zinc-900"
        >
          <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest text-center mb-6">Toolkit</p>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 text-xs tracking-wider hover:border-indigo-500/40 hover:text-zinc-300 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
