import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference"
    >
      <div className="text-xl font-bold tracking-tighter uppercase">
        Rohit<span className="text-indigo-400">Kumar</span>
      </div>
      <div className="flex gap-8 text-sm font-medium tracking-wide uppercase">
        <a href="#experience" className="hover:text-indigo-400 transition-colors">Experience</a>
        <a href="#products" className="hover:text-indigo-400 transition-colors">Products</a>
        <a href="#recommendations" className="hover:text-indigo-400 transition-colors">Testimonials</a>
      </div>
    </motion.nav>
  );
}
