import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AlgoArtProps {
  variant?: 'flow' | 'web' | 'pulse';
  className?: string;
  opacity?: number;
}

// Seeded random
function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

export default function AlgoArt({ variant = 'flow', className = '', opacity = 0.4 }: AlgoArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const rand = seededRandom(42);

    if (variant === 'flow') {
      // Perlin-like noise flow field using JS
      const particles: { x: number; y: number; vx: number; vy: number }[] = [];
      for (let i = 0; i < 200; i++) {
        particles.push({ x: rand() * canvas.width, y: rand() * canvas.height, vx: 0, vy: 0 });
      }
      let t = 0;
      const draw = () => {
        ctx.fillStyle = 'rgba(9,9,11,0.07)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = `rgba(99,102,241,${opacity})`;
        ctx.lineWidth = 0.8;
        for (const p of particles) {
          const angle = Math.sin(p.x * 0.008 + t) * Math.PI + Math.cos(p.y * 0.006 + t * 0.7) * Math.PI;
          p.vx = p.vx * 0.9 + Math.cos(angle) * 0.5;
          p.vy = p.vy * 0.9 + Math.sin(angle) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        t += 0.003;
        rafRef.current = requestAnimationFrame(draw);
      };
      ctx.fillStyle = 'rgb(9,9,11)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
    }

    if (variant === 'web') {
      // Connected node web
      const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
      for (let i = 0; i < 60; i++) {
        nodes.push({ x: rand() * canvas.width, y: rand() * canvas.height, vx: (rand() - 0.5) * 0.4, vy: (rand() - 0.5) * 0.4 });
      }
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        }
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.strokeStyle = `rgba(99,102,241,${opacity * (1 - d / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
          ctx.fillStyle = `rgba(129,140,248,${opacity})`;
          ctx.beginPath();
          ctx.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    if (variant === 'pulse') {
      // Expanding rings
      const rings: { x: number; y: number; r: number; maxR: number; age: number }[] = [];
      let frame = 0;
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (frame % 60 === 0) {
          rings.push({ x: rand() * canvas.width, y: rand() * canvas.height, r: 0, maxR: 80 + rand() * 60, age: 0 });
        }
        for (let i = rings.length - 1; i >= 0; i--) {
          const ring = rings[i];
          ring.r += 0.5; ring.age++;
          const alpha = opacity * (1 - ring.r / ring.maxR);
          ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
          ctx.stroke();
          if (ring.r >= ring.maxR) rings.splice(i, 1);
        }
        frame++;
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [variant, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}

// ───── Framed section accent ─────
export function AlgoArtAccent({ variant = 'web' }: { variant?: 'flow' | 'web' | 'pulse' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="w-full h-48 md:h-64 relative rounded-2xl overflow-hidden border border-zinc-800/50"
    >
      <AlgoArt variant={variant} opacity={0.5} />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
        Generative · {variant === 'flow' ? 'Flow Field' : variant === 'web' ? 'Node Web' : 'Pulse Rings'}
      </div>
    </motion.div>
  );
}
