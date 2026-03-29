import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from './Products';
import { AlgoArtAccent } from './AlgoArt';

export default function WebArtifacts() {
  const featured = products.slice(0, 2);
  const rest = products.slice(2);

  return (
    <section id="artifacts" className="py-32 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Algo art: pulse rings ambient */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <AlgoArtAccent variant="pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase">
            Web Artifacts
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Built for the Web</h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto font-light">Interactive projects, live deployments, and scalable systems. Click any artifact to explore its dedicated page.</p>
        </motion.div>

        {/* Featured 2 — large */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((p, i) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative rounded-3xl bg-zinc-900/40 border ${p.border} overflow-hidden p-0 hover:border-opacity-80 transition-all duration-500 h-64`}
              >
                {/* mini algo art as bg */}
                <div className="absolute inset-0">
                  <AlgoArtAccent variant={i === 0 ? 'flow' : 'web'} />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-70`} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-3xl mb-2">{p.emoji}</span>
                  <h3 className="text-white font-black text-2xl tracking-tight mb-1">{p.title}</h3>
                  <p className="text-zinc-300 text-sm font-light line-clamp-2">{p.desc}</p>
                  <div className="mt-3 flex items-center gap-2">
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-black/30 text-zinc-300 rounded-full font-mono">{t}</span>
                    ))}
                    <span className="ml-auto text-zinc-400 group-hover:text-white text-sm transition-colors">Explore →</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Rest — smaller row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {rest.map((p, i) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i + 2) * 0.1, duration: 0.6 }}
                className={`relative rounded-2xl bg-zinc-900/40 border ${p.border} p-6 hover:bg-zinc-900/80 transition-all duration-400`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{p.emoji}</span>
                  <div className="flex-1">
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${p.tagColor}`}>{p.category}</span>
                    <h3 className="text-white font-bold text-lg mt-0.5 group-hover:text-indigo-200 transition-colors">{p.title}</h3>
                    <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{p.desc}</p>
                  </div>
                  <span className="text-zinc-600 group-hover:text-indigo-400 text-lg transition-colors mt-1">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Algo art banner */}
        <AlgoArtAccent variant="flow" />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-500 text-sm mb-4">More projects in progress. Want to collaborate?</p>
          <a href="https://linktr.ee/rohit_k_" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl text-sm transition-colors">
            Get in touch ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
