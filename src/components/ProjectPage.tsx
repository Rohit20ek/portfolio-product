import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { products } from './Products';
import AlgoArt from './AlgoArt';
import Navbar from './Navbar';
import FeedbackPanel from './FeedbackPanel';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  const [embedUrl, setEmbedUrl] = useState(product?.liveUrl || '');
  const [apiUrl, setApiUrl] = useState('');
  const [customImage, setCustomImage] = useState(product?.image || '');
  const [showEmbed, setShowEmbed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 text-xl mb-4">Project not found</p>
          <Link to="/" className="text-indigo-400 hover:text-indigo-300">← Back to portfolio</Link>
        </div>
      </div>
    );
  }

  const algoVariants: Array<'flow' | 'web' | 'pulse'> = ['flow', 'web', 'pulse'];
  const variant = algoVariants[products.indexOf(product) % 3];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setCustomImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Hero with algo art background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AlgoArt variant={variant} opacity={0.25} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/#products" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-8 transition-colors">
              ← Back to all projects
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{product.emoji}</span>
              <span className={`text-xs font-mono uppercase tracking-widest ${product.tagColor} px-3 py-1 rounded-full bg-current/10 border border-current/20`}>
                {product.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">{product.title}</h1>
            <p className="text-zinc-300 text-xl font-light leading-relaxed max-w-2xl">{product.longDesc}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full font-mono border border-zinc-700">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: project info */}
          <div className="lg:col-span-2 space-y-8">

            {/* Project image or placeholder */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-video bg-zinc-900/50">
              {customImage ? (
                <img src={customImage} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0">
                  <AlgoArt variant={variant} opacity={0.6} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{product.emoji}</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sections */}
            {product.sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-mono">{i + 1}</span>
                  {section.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}

            {/* Live embed */}
            {showEmbed && embedUrl && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl overflow-hidden border border-indigo-500/30 aspect-video">
                <iframe src={embedUrl} className="w-full h-full" title={product.title} allow="fullscreen" />
              </motion.div>
            )}
          </div>

          {/* Right: sidebar controls */}
          <div className="space-y-6">

            {/* Launch / Demo */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-bold">Launch Project</h3>
              <a href={product.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors">
                Open on GitHub ↗
              </a>
              <button onClick={() => setShowEmbed(s => !s)}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-xl transition-colors">
                {showEmbed ? 'Hide' : 'Embed'} Live Preview
              </button>
            </motion.div>

            {/* Upload Project Image */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-bold">Project Image</h3>
              <label className="flex flex-col items-center justify-center w-full py-6 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-indigo-500/50 transition-colors">
                <span className="text-zinc-500 text-sm text-center">Click to upload screenshot</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              {customImage && (
                <button onClick={() => setCustomImage('')} className="text-red-500/60 hover:text-red-400 text-xs transition-colors w-full text-center">
                  Remove image
                </button>
              )}
            </motion.div>

            {/* API Integration */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-bold">API / Embed URL</h3>
              <input
                type="text"
                value={embedUrl}
                onChange={e => setEmbedUrl(e.target.value)}
                placeholder="https://your-project-url.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                value={apiUrl}
                onChange={e => setApiUrl(e.target.value)}
                placeholder="API endpoint: https://api.yourproject.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-zinc-600 text-[10px]">URLs are saved locally in your browser session.</p>
            </motion.div>

            {/* Algo art mini */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 h-48">
              <AlgoArt variant={algoVariants[(products.indexOf(product) + 1) % 3]} opacity={0.5} />
            </div>

            {/* Feedback: upvote & comments */}
            <FeedbackPanel productId={product.id} />
          </div>
        </div>
      </section>
    </div>
  );
}
