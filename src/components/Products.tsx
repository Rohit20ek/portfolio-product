import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const products = [
  {
    id: 'search-relevancy',
    title: "Search Relevancy Project",
    category: "AI & Backend",
    emoji: "🔍",
    color: "from-blue-500/20 to-purple-600/20",
    border: "border-blue-500/30",
    accent: "blue",
    tagColor: "text-blue-400",
    desc: "A search engine backend focused on providing accurate, algorithmically optimized relevance indexing and ranking.",
    longDesc: "An end-to-end search relevancy system leveraging BM25 ranking, TF-IDF scoring, and semantic similarity to surface the most accurate results. Built with Flask, SQLite, and a clean frontend interface — fully deployable on GitHub Pages.",
    tags: ["Python", "Flask", "SQLite", "NLP", "BM25"],
    liveUrl: "https://github.com/rohit20ek",
    image: "",
    sections: [
      { title: "Architecture", content: "Flask REST API with SQLite backend, BM25 ranking engine, and semantic vector scoring." },
      { title: "Key Features", content: "Real-time query processing, relevancy scoring dashboard, and API endpoint for integration." },
    ]
  },
  {
    id: 'email-classification',
    title: "Email Classification System",
    category: "Machine Learning",
    emoji: "📧",
    color: "from-emerald-500/20 to-teal-600/20",
    border: "border-emerald-500/30",
    accent: "emerald",
    tagColor: "text-emerald-400",
    desc: "Hugging Face Zero-Shot classification and FastAPI integrated with n8n for fully automated workflow routing.",
    longDesc: "A zero-shot email classification system using Hugging Face's transformer models, exposed via FastAPI and orchestrated with n8n workflows. Classifies incoming emails into Work, Spam, Invoice with no training data required.",
    tags: ["Hugging Face", "FastAPI", "n8n", "Python", "Zero-Shot"],
    liveUrl: "https://github.com/rohit20ek",
    image: "",
    sections: [
      { title: "ML Model", content: "facebook/bart-large-mnli for zero-shot classification with custom label sets." },
      { title: "Workflow", content: "n8n automation picks up Gmail messages, routes to FastAPI, and files them automatically." },
    ]
  },
  {
    id: '3d-ecommerce',
    title: "3D E-Commerce Template",
    category: "Frontend & WebGL",
    emoji: "🛍️",
    color: "from-orange-500/20 to-red-600/20",
    border: "border-orange-500/30",
    accent: "orange",
    tagColor: "text-orange-400",
    desc: "Next-gen interactive UI employing 3D product showcases for immersive digital shopping experiences.",
    longDesc: "A premium e-commerce template with Three.js-powered 3D product viewers, smooth GSAP animations, and real product interaction. Designed for luxury and tech brands wanting an immersive digital storefront.",
    tags: ["Three.js", "React", "GSAP", "WebGL", "TypeScript"],
    liveUrl: "https://github.com/rohit20ek",
    image: "",
    sections: [
      { title: "3D Engine", content: "Three.js with orbit controls, environment mapping, and realtime product rotation." },
      { title: "Animations", content: "GSAP-powered scroll triggers, parallax effects, and staggered product reveals." },
    ]
  },
  {
    id: 'search-engine-frontend',
    title: "Search Engine Frontend",
    category: "Fullstack Architecture",
    emoji: "⚡",
    color: "from-indigo-500/20 to-cyan-600/20",
    border: "border-indigo-500/30",
    accent: "indigo",
    tagColor: "text-indigo-400",
    desc: "Flask-powered web interface bridging complex search logics with accessible, real-time user experiences.",
    longDesc: "A fully functional search engine frontend built with Flask backend, real-time search suggestions, and a clean minimal UI. Supports complex query parsing, result ranking, and a deployable Docker setup.",
    tags: ["Flask", "HTML", "CSS", "JS", "Docker"],
    liveUrl: "https://github.com/rohit20ek",
    image: "",
    sections: [
      { title: "Backend", content: "Flask with jinja2 templates, REST API routes, and inverted index search engine." },
      { title: "Frontend", content: "Vanilla JS with debounced search, keyboard navigation, and result highlighting." },
    ]
  },
];

export default function Products() {
  return (
    <section id="products" className="relative py-32 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Algo art ambient: grid of dots */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono tracking-widest uppercase">
              Built & Shipped
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              PRODUCTS.
            </h2>
            <p className="text-zinc-400 mt-4 max-w-lg text-lg font-light leading-relaxed">
              Scalable architectures and elegant frontends. Each project has its own dedicated page — click to explore.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={`/projects/${product.id}`}
                className={`group relative flex flex-col p-8 rounded-3xl bg-zinc-900/40 border ${product.border} backdrop-blur-md overflow-hidden hover:bg-zinc-900/80 transition-all duration-500 cursor-pointer block`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl">{product.emoji}</span>
                    <span className={`text-xs font-mono uppercase tracking-widest ${product.tagColor} px-2.5 py-1 rounded-full bg-current/10 border border-current/20`}>
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3 group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-light flex-1 group-hover:text-zinc-200 transition-colors text-sm">
                    {product.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded-full font-mono">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center text-sm font-medium tracking-wide text-zinc-500 group-hover:text-indigo-300 transition-colors">
                    <span>Open Project</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
