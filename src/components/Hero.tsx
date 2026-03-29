import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Background abstract waterfall elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute left-[10%] top-[-20%] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-indigo-500 to-transparent blur-[1px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute right-[20%] top-[-10%] w-[2px] h-[120%] bg-gradient-to-b from-transparent via-slate-300 to-transparent blur-[2px]" 
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute left-[50%] top-[-30%] w-[1px] h-[180%] bg-gradient-to-b from-transparent via-indigo-400 to-transparent opacity-50" 
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="z-10 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-6 overflow-hidden flex flex-col items-center"
        >
          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-8"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-lg opacity-40 animate-pulse" />
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQGMk4Z8NxwMXQ/profile-displayphoto-shrink_200_200/B56ZSsPevJGQAY-/0/1738056527417?e=1776297600&v=beta&t=1mQbo1GnyoINeBaX-U_59NpmCus2Q7IItc4PKk7N3CQ"
              alt="Rohit Kumar"
              className="relative w-28 h-28 rounded-full border-2 border-zinc-700 object-cover shadow-2xl"
            />
          </motion.div>

          <h1 className="text-[clamp(4rem,10vw,10rem)] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500">
            DATA.
            <br />
            PRODUCTS.
            <br />
            <span className="text-zinc-500 italic font-light tracking-tight">VISION.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="max-w-2xl mt-8"
        >
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            I am <strong className="text-white font-medium">Rohit Kumar</strong>. An analytical mind driving strategic decisions, crafting advanced products, and transforming data into operational brilliance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
}
