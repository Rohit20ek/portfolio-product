import { motion } from 'framer-motion';

const certifications = [
  {
    name: "Generative AI for Project Managers",
    issuer: "Project Management Institute (PMI)",
    date: "Jun 2025",
    desc: "Practical implementation of capacity planning, risk mitigation, scope creep management, Earned Value Management, and User Stories using Generative AI.",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHJZGa_G2gwUg/company-logo_100_100/company-logo_100_100/0/1631333024279?e=1776297600&v=beta&t=K1eblxuBqcDpvU1gl0J54A7cvapFpOCxcwo3yNZbq6U",
  },
  {
    name: "Jira Fundamentals Badge",
    issuer: "Atlassian",
    date: "Nov 2023",
    desc: "Core proficiency in Jira for project tracking, sprint management, backlog grooming, and agile team workflows.",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAGeyLL6crkJKg/company-logo_100_100/company-logo_100_100/0/1735593604612/atlassian_logo?e=1776297600&v=beta&t=ljD8Cu4yFrnD8mqbWXTHs5MY7Qw4FyQljQ4nEE4HqT0",
  },
  {
    name: "Problem Solving",
    issuer: "HackerRank",
    date: "Sep 2022",
    desc: "Certified in algorithmic problem-solving, data structures, and computational thinking through verified coding challenges.",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQE8MivsmbT7Ig/company-logo_100_100/company-logo_100_100/0/1705561459405/hackerrank_logo?e=1776297600&v=beta&t=NktDP0RQ5PHPn3BnR-B6Z52mS5gIwraDIezW5A2LiGU",
  },
  {
    name: "Learn Linux from Scratch",
    issuer: "EDUONIX",
    date: "Nov 2021",
    desc: "Comprehensive hands-on Linux training covering shell scripting, file systems, process management, and system administration.",
    logo: "https://media.licdn.com/dms/image/v2/C510BAQF3Hs1scElacA/company-logo_100_100/company-logo_100_100/0/1630567253611?e=1776297600&v=beta&t=CRcd7GriEsfdcz6mRx7tfInoak_QJNUt3Tq03gSdmZM",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono tracking-widest uppercase">
            Verified Learning
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all duration-400 overflow-hidden"
            >
              {/* subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 mb-5 shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10">
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cert.issuer)}&background=4f46e5&color=fff&bold=true`;
                  }}
                />
              </div>

              <div className="relative z-10">
                <p className="text-indigo-400 text-[10px] font-mono uppercase tracking-widest mb-1">{cert.issuer}</p>
                <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-indigo-200 transition-colors">{cert.name}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">{cert.desc}</p>
                <div className="flex items-center gap-1.5 text-zinc-600 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 bg-indigo-500/40 rounded-full" />
                  Issued {cert.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
