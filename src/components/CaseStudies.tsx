import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CaseStudies() {
  const [notionUrl, setNotionUrl] = useState('');

  useEffect(() => {
    // Read from localStorage (admin-configured)
    const saved = localStorage.getItem('port_notion_url');
    if (saved) setNotionUrl(saved);
    // Also try backend
    fetch('/api/settings').then(r => r.json()).then(s => {
      if (s.notion_url) { setNotionUrl(s.notion_url); localStorage.setItem('port_notion_url', s.notion_url); }
    }).catch(() => {});
  }, []);

  return (
    <section id="case-studies" className="py-28 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-900/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase">
            Deep Dives
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Case Studies</h2>
          <p className="text-zinc-400 mt-3 max-w-lg font-light">
            In‑depth analyses, frameworks, and strategic breakdowns — hosted on Notion.
          </p>
        </motion.div>

        {notionUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-zinc-800 bg-white"
          >
            <iframe
              src={notionUrl.includes('notion.site') ? notionUrl : notionUrl}
              className="w-full border-0"
              style={{ height: '70vh', minHeight: '500px' }}
              title="Case Studies — Notion"
              allow="fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'Data‑Driven Product Strategy', tag: 'Product Management', desc: 'Framework for translating raw data signals into product roadmap decisions.' },
              { title: 'Search Relevancy Optimisation', tag: 'ML / NLP', desc: 'BM25 + semantic scoring pipeline for a high‑accuracy search engine.' },
              { title: 'Operational Automation at Scale', tag: 'Operations', desc: 'How ChatGPT integration boosted course completion by 20% at Simplilearn.' },
            ].map((cs, i) => (
              <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500/40 transition-colors group">
                <span className="text-purple-400 text-[10px] font-mono uppercase tracking-widest">{cs.tag}</span>
                <h3 className="text-white font-bold text-lg mt-2 group-hover:text-purple-200 transition-colors">{cs.title}</h3>
                <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{cs.desc}</p>
                <p className="text-zinc-600 text-[10px] mt-4 italic">Set Notion URL in Admin panel to embed full case studies</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
