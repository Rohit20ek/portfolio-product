import { useState, useRef, useEffect } from 'react';
import { useAdmin, Experience, Recommendation, Certification } from '../context/AdminContext';

const API_BASE = import.meta.env.VITE_API_URL || '';

function EditField({ value, onChange, multiline = false, className = '' }: {
  value: string; onChange: (v: string) => void; multiline?: boolean; className?: string;
}) {
  if (multiline) return (
    <textarea value={value} onChange={e => onChange(e.target.value)}
      className={`w-full bg-zinc-800 border border-indigo-500/40 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-indigo-500 ${className}`} rows={3} />
  );
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)}
      className={`w-full bg-zinc-800 border border-indigo-500/40 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 ${className}`} />
  );
}

function ImageUpload({ label, current, onUpload }: { label: string; current: string; onUpload: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onUpload(ev.target?.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex items-center gap-3 mt-1">
      {current && <img src={current} alt={label} className="w-10 h-10 rounded-lg object-contain bg-white p-1 shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
      <div className="flex-1 min-w-0">
        <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">{label} URL</p>
        <input type="text" value={current} onChange={e => onUpload(e.target.value)} placeholder="https://..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500" />
      </div>
      <button onClick={() => fileRef.current?.click()} className="shrink-0 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400 text-xs hover:bg-zinc-700 hover:text-white transition-colors">↑ Upload</button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

function ExpCard({ exp }: { exp: Experience }) {
  const { updateExperience, removeExperience } = useAdmin();
  const [open, setOpen] = useState(false);
  const upd = (k: keyof Experience) => (v: string) => updateExperience(exp.id, { [k]: v });
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors">
        <img src={exp.logo} alt={exp.company} className="w-8 h-8 rounded bg-white object-contain p-0.5"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${exp.company}&background=333&color=fff&size=32`; }} />
        <div className="flex-1 min-w-0"><p className="text-white font-semibold text-sm truncate">{exp.company}</p><p className="text-zinc-500 text-xs truncate">{exp.role}</p></div>
        <span className="text-zinc-600 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-zinc-800">
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Company</p><EditField value={exp.company} onChange={upd('company')} /></div>
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Role</p><EditField value={exp.role} onChange={upd('role')} /></div>
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Date</p><EditField value={exp.date} onChange={upd('date')} /></div>
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Achievement</p><EditField value={exp.achievement} onChange={upd('achievement')} /></div>
          </div>
          <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Description</p><EditField value={exp.desc} onChange={upd('desc')} multiline /></div>
          <ImageUpload label="Company Logo" current={exp.logo} onUpload={upd('logo')} />
          <button onClick={() => removeExperience(exp.id)} className="mt-1 text-red-500/70 hover:text-red-400 text-xs transition-colors">✕ Remove</button>
        </div>
      )}
    </div>
  );
}

function RecCard({ rec }: { rec: Recommendation }) {
  const { updateRecommendation, removeRecommendation } = useAdmin();
  const [open, setOpen] = useState(false);
  const upd = (k: keyof Recommendation) => (v: string) => updateRecommendation(rec.id, { [k]: v });
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors">
        <img src={rec.photo} alt={rec.name} className="w-8 h-8 rounded-full object-cover border border-zinc-700"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${rec.name}&background=333&color=fff&size=32&rounded=true`; }} />
        <div className="flex-1 min-w-0"><p className="text-white font-semibold text-sm truncate">{rec.name}</p><p className="text-zinc-500 text-xs truncate">{rec.role}</p></div>
        <span className="text-zinc-600 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-zinc-800">
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Name</p><EditField value={rec.name} onChange={upd('name')} /></div>
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Role</p><EditField value={rec.role} onChange={upd('role')} /></div>
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Date</p><EditField value={rec.date} onChange={upd('date')} /></div>
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">LinkedIn</p><EditField value={rec.linkedin} onChange={upd('linkedin')} /></div>
          </div>
          <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Text</p><EditField value={rec.text} onChange={upd('text')} multiline className="min-h-[80px]" /></div>
          <ImageUpload label="Profile Photo" current={rec.photo} onUpload={upd('photo')} />
          <button onClick={() => removeRecommendation(rec.id)} className="mt-1 text-red-500/70 hover:text-red-400 text-xs transition-colors">✕ Remove</button>
        </div>
      )}
    </div>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const { updateCertification, removeCertification } = useAdmin();
  const [open, setOpen] = useState(false);
  const upd = (k: keyof Certification) => (v: string) => updateCertification(cert.id, { [k]: v });
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors">
        <img src={cert.logo} alt={cert.issuer} className="w-8 h-8 rounded bg-white object-contain p-0.5"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${cert.issuer}&background=4f46e5&color=fff&size=32`; }} />
        <div className="flex-1 min-w-0"><p className="text-white font-semibold text-sm truncate">{cert.name}</p><p className="text-zinc-500 text-xs truncate">{cert.issuer} · {cert.date}</p></div>
        <span className="text-zinc-600 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-zinc-800">
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="col-span-2"><p className="text-zinc-500 text-[10px] uppercase mb-1">Name</p><EditField value={cert.name} onChange={upd('name')} /></div>
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Issuer</p><EditField value={cert.issuer} onChange={upd('issuer')} /></div>
            <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Date</p><EditField value={cert.date} onChange={upd('date')} /></div>
          </div>
          <div><p className="text-zinc-500 text-[10px] uppercase mb-1">Description</p><EditField value={cert.desc} onChange={upd('desc')} multiline /></div>
          <ImageUpload label="Issuer Logo" current={cert.logo} onUpload={upd('logo')} />
          <button onClick={() => removeCertification(cert.id)} className="mt-1 text-red-500/70 hover:text-red-400 text-xs transition-colors">✕ Remove</button>
        </div>
      )}
    </div>
  );
}

type Tab = 'experience' | 'recommendations' | 'certifications' | 'settings';

export default function AdminPanel() {
  const { isAdmin, toggleAdmin, experiences, recommendations, certifications, addExperience, addRecommendation, addCertification, resetAll } = useAdmin();
  const [tab, setTab] = useState<Tab>('experience');
  const [confirmReset, setConfirmReset] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [notionUrl, setNotionUrl] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/settings`).then(r => r.json()).then(s => {
      setAuthRequired(s.auth_required === 'true');
      setNotionUrl(s.notion_url || '');
    }).catch(() => {
      setAuthRequired(localStorage.getItem('port_auth_required') === 'true');
      setNotionUrl(localStorage.getItem('port_notion_url') || '');
    });
  }, []);

  const saveSetting = (key: string, value: string) => {
    localStorage.setItem(`port_${key}`, value);
    fetch(`${API_BASE}/api/settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, value }) }).catch(() => {});
  };

  if (!isAdmin) return null;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'experience', label: `Work (${experiences.length})` },
    { key: 'recommendations', label: `Recs (${recommendations.length})` },
    { key: 'certifications', label: `Certs (${certifications.length})` },
    { key: 'settings', label: '⚙ Settings' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" onClick={toggleAdmin} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] z-[201] bg-zinc-950 border-l border-zinc-800 flex flex-col shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">Admin Mode</span>
            </div>
            <h2 className="text-white font-bold text-lg">Portfolio Editor</h2>
          </div>
          <button onClick={toggleAdmin} className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 transition-colors text-sm">✕</button>
        </div>
        <div className="flex border-b border-zinc-800 shrink-0">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 py-3 text-xs font-medium transition-colors ${tab === t.key ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {tab === 'experience' && (<>
            {experiences.map(exp => <ExpCard key={exp.id} exp={exp} />)}
            <button onClick={addExperience} className="w-full py-3 border border-dashed border-zinc-700 text-zinc-500 text-sm rounded-xl hover:border-indigo-500/50 hover:text-indigo-400 transition-colors">+ Add Experience</button>
          </>)}
          {tab === 'recommendations' && (<>
            {recommendations.map(rec => <RecCard key={rec.id} rec={rec} />)}
            <button onClick={addRecommendation} className="w-full py-3 border border-dashed border-zinc-700 text-zinc-500 text-sm rounded-xl hover:border-indigo-500/50 hover:text-indigo-400 transition-colors">+ Add Recommendation</button>
          </>)}
          {tab === 'certifications' && (<>
            {certifications.map(cert => <CertCard key={cert.id} cert={cert} />)}
            <button onClick={addCertification} className="w-full py-3 border border-dashed border-zinc-700 text-zinc-500 text-sm rounded-xl hover:border-indigo-500/50 hover:text-indigo-400 transition-colors">+ Add Certification</button>
          </>)}
          {tab === 'settings' && (
            <div className="space-y-6">
              {/* Auth toggle */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-semibold text-sm">Require Google Login</p>
                    <p className="text-zinc-500 text-xs mt-0.5">Users must sign in to upvote or comment on products</p>
                  </div>
                  <button
                    onClick={() => { const v = !authRequired; setAuthRequired(v); saveSetting('auth_required', String(v)); }}
                    className={`w-12 h-6 rounded-full transition-colors relative ${authRequired ? 'bg-indigo-500' : 'bg-zinc-700'}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${authRequired ? 'left-[26px]' : 'left-0.5'}`} />
                  </button>
                </div>
                <p className="text-zinc-600 text-[10px]">When off, anonymous feedback is allowed.</p>
              </div>

              {/* Notion URL */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-white font-semibold text-sm mb-2">Case Studies — Notion URL</p>
                <p className="text-zinc-500 text-xs mb-3">Paste a public Notion page URL to embed your case studies. Leave empty to show placeholder cards.</p>
                <input
                  type="text"
                  value={notionUrl}
                  onChange={e => { setNotionUrl(e.target.value); saveSetting('notion_url', e.target.value); }}
                  placeholder="https://your-notion-page.notion.site/..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Google OAuth status */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-white font-semibold text-sm mb-1">Google OAuth Setup</p>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  To enable Google login, create OAuth 2.0 credentials at{' '}
                  <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Google Cloud Console</a>{' '}
                  and set <code className="text-indigo-300 text-[10px]">GOOGLE_CLIENT_ID</code> and <code className="text-indigo-300 text-[10px]">GOOGLE_CLIENT_SECRET</code> in <code className="text-indigo-300 text-[10px]">backend/.env</code>.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="px-4 py-3 border-t border-zinc-800 shrink-0 flex items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">Auto-saved to localStorage</p>
          {!confirmReset ? (
            <button onClick={() => setConfirmReset(true)} className="text-red-500/60 hover:text-red-400 text-xs transition-colors">Reset all</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => { resetAll(); setConfirmReset(false); }} className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded hover:bg-red-500/20 transition-colors">Confirm</button>
              <button onClick={() => setConfirmReset(false)} className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
