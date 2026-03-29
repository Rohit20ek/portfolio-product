import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface Comment {
  id: number;
  product_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  body: string;
  created_at: string;
}

export default function FeedbackPanel({ productId }: { productId: string }) {
  const { user, login } = useAuth();
  const [upvotes, setUpvotes] = useState(0);
  const [userUpvoted, setUserUpvoted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [authRequired, setAuthRequired] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchFeedback = () => {
    fetch(`/api/feedback/${productId}`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        setUpvotes(data.upvotes || 0);
        setComments(data.comments || []);
        setUserUpvoted(data.userUpvoted || false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchFeedback();
    fetch('/api/settings').then(r => r.json()).then(s => {
      setAuthRequired(s.auth_required === 'true');
    }).catch(() => {});
  }, [productId]);

  const handleUpvote = async () => {
    if (authRequired && !user) { login(); return; }
    const res = await fetch(`/api/feedback/${productId}/upvote`, { method: 'POST', credentials: 'include' });
    const data = await res.json();
    if (res.status === 401) { login(); return; }
    setUserUpvoted(data.upvoted);
    setUpvotes(prev => data.upvoted ? prev + 1 : prev - 1);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    if (authRequired && !user) { login(); return; }
    setSubmitting(true);
    const res = await fetch(`/api/feedback/${productId}/comment`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: commentText })
    });
    if (res.status === 401) { login(); setSubmitting(false); return; }
    const data = await res.json();
    if (data.comment) setComments(prev => [data.comment, ...prev]);
    setCommentText('');
    setSubmitting(false);
  };

  const handleDelete = async (commentId: number) => {
    await fetch(`/api/feedback/${productId}/comment/${commentId}`, { method: 'DELETE', credentials: 'include' });
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">

      {/* Header with upvote */}
      <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-sm">Feedback</h3>
          <p className="text-zinc-500 text-xs mt-0.5">{upvotes} upvote{upvotes !== 1 ? 's' : ''} · {comments.length} comment{comments.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={handleUpvote}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            userUpvoted
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
          }`}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          {upvotes}
        </button>
      </div>

      {/* Comment input */}
      <div className="px-6 py-4 border-b border-zinc-800/50">
        <div className="flex gap-3">
          {user?.avatar ? (
            <img src={user.avatar} className="w-8 h-8 rounded-full shrink-0" alt="" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs shrink-0">?</div>
          )}
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder={authRequired && !user ? 'Login to comment...' : 'Share your thoughts...'}
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-indigo-500 transition-colors"
              rows={2}
              disabled={authRequired && !user}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleComment(); } }}
            />
            <div className="flex justify-between items-center mt-2">
              {authRequired && !user ? (
                <button onClick={login} className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors">
                  Sign in with Google to comment
                </button>
              ) : <span />}
              <button onClick={handleComment} disabled={!commentText.trim() || submitting}
                className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-lg hover:bg-indigo-500/30 disabled:opacity-40 transition-colors">
                {submitting ? '...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="max-h-80 overflow-y-auto">
        <AnimatePresence>
          {comments.map(c => (
            <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-6 py-3 border-b border-zinc-800/30 last:border-0 group">
              <div className="flex items-start gap-3">
                {c.user_avatar ? (
                  <img src={c.user_avatar} className="w-7 h-7 rounded-full shrink-0" alt="" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-[10px] shrink-0">
                    {c.user_name?.[0] || '?'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-zinc-300 text-xs font-medium">{c.user_name}</span>
                    <span className="text-zinc-600 text-[10px]">{formatDate(c.created_at)}</span>
                  </div>
                  <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{c.body}</p>
                </div>
                {user && String(c.user_id) === String(user.id) && (
                  <button onClick={() => handleDelete(c.id)}
                    className="text-zinc-700 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all shrink-0">✕</button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {comments.length === 0 && (
          <div className="px-6 py-8 text-center text-zinc-600 text-xs">No comments yet. Be the first!</div>
        )}
      </div>
    </motion.div>
  );
}
