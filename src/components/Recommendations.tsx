import { motion } from 'framer-motion';

const industryLeaders = [
  {
    name: "Jayaram P M",
    role: "ERS LSH Practice @ HCLTech",
    date: "January 1, 2026",
    text: "We worked together on a key project for Automating attendance feature for a hybrid learning model. I was moved by his strong technical acumen and ability to own responsibilities. Any team would love to have him for sheer commitment and passion for the work he does. Beyond work, his cheerful energy and supportive nature brightens any room he enters.",
    linkedin: "https://www.linkedin.com/in/jayarampm/",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQHczPbgSf0pkw/profile-displayphoto-shrink_100_100/B56ZzYgywYJ8Ag-/0/1773159002849?e=1776297600&v=beta&t=nN07c9YDJ--sTcj-yNs4JayRGHZd8f40tlIjzObNTEc"
  },
  {
    name: "Simma Shukla",
    role: "Tourism Strategy | AI in Travel",
    date: "March 31, 2025",
    text: "I am extremely grateful to Mr. Rohit for his invaluable guidance and support in helping me shape my career path. His in-depth case study on my field provided me with clarity on the necessary skills I need to develop to achieve my career goals. His insights, expertise, and structured approach have given me a clear roadmap to enhance my knowledge and grow professionally.",
    linkedin: "https://www.linkedin.com/in/simma-shukla-97698b1a8/",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQH-hfuT3Hg1EA/profile-displayphoto-shrink_100_100/B56ZwZedwEIwAc-/0/1769953943622?e=1776297600&v=beta&t=tvJs3mvmy0nH3m90nES2CwcfmTcT2aW0tt9qzsfbcxY"
  },
  {
    name: "Likitha M",
    role: "Product Operations at Stripe",
    date: "January 4, 2024",
    text: "Rohit is an absolute star when it comes to getting things done – his knack for delivering tasks on time is truly impressive. During the merchant onboarding process, he showed an incredible talent for untangling business challenges, always going above and beyond to meet client needs. What sets Rohit apart is not just his technical wizardry in advanced Excel, QuickSight, SQL, and Power BI, but also his keen eye for recognizing patterns.",
    linkedin: "https://www.linkedin.com/in/likitha-m-8a4839196/",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQHPV5RToJeuPg/profile-displayphoto-shrink_100_100/B56ZcoRdpjHUAU-/0/1748727357364?e=1776297600&v=beta&t=l8V1Mju6grpgvVqmmbIWkDNb5eG821woL0P7f7TVIk0"
  },
  {
    name: "Abhishek Tripathy",
    role: "Category Manager",
    date: "December 26, 2023",
    text: "I highly recommend Rohit for his exceptional curiosity, resilience, and outstanding management skills. His proficiency in data and visualization tools sets him apart. Rohit consistently delivers accurate solutions and demonstrates remarkable problem-solving abilities.",
    linkedin: "https://www.linkedin.com/in/abhishek-tripathy/",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQHPV5RToJeuPg/profile-displayphoto-shrink_100_100/B56ZcoRdpjHUAU-/0/1748727357364?e=1776297600&v=beta&t=l8V1Mju6grpgvVqmmbIWkDNb5eG821woL0P7f7TVIk0"
  },
  {
    name: "Aman Chauhan",
    role: "Cyber Security Analyst | Purple Teamer",
    date: "September 30, 2020",
    text: "Enthusiastic guy with an excellent tech knowledge.",
    linkedin: "https://www.linkedin.com/in/aman31-chauhan/",
    photo: "https://media.licdn.com/dms/image/v2/D4D03AQGIYyXjs8WOew/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1683014603603?e=1776297600&v=beta&t=6gUGqowxdHst70GDaOi2svLBZ-cfvsMbli4WvAZWwb8"
  }
];

const topmateTestimonials = [
  { name: "Bommakanti v s rohith", date: "21st Apr, 2025", rating: "5/5", text: "Understandable person and also makes others comfortable" },
  { name: "Anjali Bhatt", date: "12th Mar, 2025", rating: "5/5", text: "Great session, highly recommended 👍" },
  { name: "Mehtab Alam", date: "9th Mar, 2025", rating: "5/5", text: "Very helpful and good nature and very kind personality given all answer of doubts and query in good Manner and understandable." },
  { name: "Praveen Kumar", date: "23rd Feb, 2025", rating: "5/5", text: "I had Career Guidance session with Rohit, the way he responded to my questions was too friendly. One of the most valuable Corporate Person with helping minded." },
  { name: "Omkar Amrutansu Dash", date: "6th Apr, 2025", rating: "5/5", text: "Had a great time" },
  { name: "Anonymous", date: "1st Apr, 2025", rating: "5/5", text: "It was a good conversation regarding the career guidance. Good guidance is provided." },
  { name: "Kaustuk choudhary", date: "27th Feb, 2025", rating: "5/5", text: "Supportive" },
  { name: "Anonymous", date: "5th Apr, 2025", rating: "5/5", text: "It was a good experience" },
];

export default function Recommendations() {
  return (
    <section id="recommendations" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[100vw] mx-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-mono tracking-widest uppercase">
              Endorsements
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Trust &amp; Recognition</h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-lg font-light">Feedback from industry leaders, managers, and mentees.</p>
          </motion.div>
        </div>

        {/* Industry Leaders — horizontal infinite marquee */}
        <div className="relative mb-32 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: [0, -3000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            className="flex items-stretch gap-6 px-4 cursor-pointer"
            whileHover={{ animationPlayState: 'paused' } as any}
          >
            {[...industryLeaders, ...industryLeaders, ...industryLeaders].map((leader, i) => (
              <div
                key={i}
                className="w-[420px] shrink-0 bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl hover:bg-zinc-900 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="relative group/avatar shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-0 group-hover/avatar:opacity-60 transition duration-300" />
                      <img
                        src={leader.photo}
                        alt={leader.name}
                        className="relative w-14 h-14 rounded-full border-2 border-zinc-700 object-cover group-hover/avatar:border-indigo-400 transition-colors"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=333&color=fff&rounded=true&size=128&bold=true`;
                        }}
                      />
                    </a>
                    <div>
                      <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="group/name">
                        <h4 className="text-white font-bold text-lg group-hover/name:text-indigo-400 transition-colors flex items-center gap-2">
                          {leader.name}
                          <span className="text-indigo-500/50 text-xs font-normal">in ↗</span>
                        </h4>
                      </a>
                      <p className="text-zinc-500 text-xs mt-0.5 font-mono">{leader.role}</p>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-[14px] leading-relaxed font-light italic relative pl-4 border-l border-zinc-700">
                    {leader.text}
                  </p>
                </div>
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-6 pt-4 border-t border-zinc-800/50">{leader.date}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Topmate Mentee Reverse Marquee */}
        <div className="relative border-t border-zinc-900 pt-20">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-zinc-300 mb-12 flex items-center gap-4">
              Topmate Mentoring
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/20 flex items-center gap-1">
                ★ 5.0 / 5 Rating
              </span>
            </h3>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={{ x: [-2000, 0] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              className="flex items-center gap-4 px-4"
            >
              {[...topmateTestimonials, ...topmateTestimonials, ...topmateTestimonials].map((t, i) => (
                <div key={i} className="w-[300px] bg-zinc-900/20 border border-zinc-800/50 px-6 py-5 rounded-2xl shrink-0">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=27272a&color=a1a1aa&rounded=true&size=64&bold=true`}
                        alt={t.name}
                        className="w-7 h-7 rounded-full"
                      />
                      <span className="text-zinc-300 font-medium text-sm truncate max-w-[120px]">{t.name}</span>
                    </div>
                    <span className="text-yellow-500/80 text-[10px] font-bold tracking-widest">★ {t.rating}</span>
                  </div>
                  <p className="text-zinc-500 text-sm font-light mb-4 line-clamp-3">"{t.text}"</p>
                  <p className="text-zinc-700 text-[10px] uppercase font-mono tracking-wider">{t.date}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
