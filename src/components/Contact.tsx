import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  RotateCw,
  ExternalLink,
  MessageSquare,
  Database,
  Clock,
  AlertCircle
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { SectionHeading } from './SectionHeading';
import { personalInfo } from '../data/portfolioData';
import { CommentItem } from '../types/portfolio';
import { sendContactMessage, fetchComments, submitComment } from '../services/api';

export const Contact: React.FC = () => {
  // Email Form State
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Copy Buttons State
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Comments State
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Load real comments from MongoDB Atlas
  const loadComments = async () => {
    setCommentsLoading(true);
    try {
      const res = await fetchComments();
      if (res && Array.isArray(res.comments)) {
        setComments(res.comments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  // Handle Copy Email / Phone
  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Submit Direct Email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.name.trim() || !emailForm.email.trim() || !emailForm.message.trim()) {
      setEmailStatus({
        type: 'error',
        text: 'Please fill in your name, email, and message.',
      });
      return;
    }

    setEmailSubmitting(true);
    setEmailStatus(null);

    try {
      const result = await sendContactMessage({
        name: emailForm.name.trim(),
        email: emailForm.email.trim(),
        subject: emailForm.subject.trim() || `Portfolio inquiry from ${emailForm.name}`,
        message: emailForm.message.trim(),
      });

      if (result.success) {
        setEmailStatus({
          type: 'success',
          text: result.message || 'Thank you! Your email has been delivered to Kartik.',
        });

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#38bdf8', '#818cf8', '#34d399'],
        });

        setEmailForm({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setEmailStatus({
          type: 'error',
          text: 'Unable to send message right now. Please email directly at kartikjoshi842@gmail.com.',
        });
      }
    } catch (err: any) {
      setEmailStatus({
        type: 'error',
        text: err.message || 'An unexpected error occurred.',
      });
    } finally {
      setEmailSubmitting(false);
    }
  };

  // Submit Public Comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      setCommentStatus({
        type: 'error',
        text: 'Please provide both your name and a comment.',
      });
      return;
    }

    setCommentSubmitting(true);
    setCommentStatus(null);

    try {
      const res = await submitComment({
        name: commentName.trim(),
        message: commentText.trim(),
      });

      if (res.success && res.comment) {
        setComments((prev) => [res.comment!, ...prev]);
        setCommentName('');
        setCommentText('');
        setCommentStatus({
          type: 'success',
          text: 'Your comment has been posted and is now visible to everyone!',
        });

        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#38bdf8', '#c084fc', '#34d399'],
        });
      } else {
        setCommentStatus({
          type: 'error',
          text: res.error || 'Failed to post comment. Please try again.',
        });
      }
    } catch (err: any) {
      setCommentStatus({
        type: 'error',
        text: err.message || 'An unexpected error occurred.',
      });
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Format relative timestamp
  const formatTime = (isoString?: string) => {
    if (!isoString) return 'Just now';
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Just now';
    }
  };

  // Deterministic avatar gradient
  const getAvatarGradient = (seed: string) => {
    const code = (seed || 'User').charCodeAt(0);
    const gradients = [
      'from-cyan-500 to-blue-600',
      'from-indigo-500 to-purple-600',
      'from-violet-500 to-pink-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
    ];
    return gradients[code % gradients.length];
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Let's Connect"
          title="Get In Touch &amp; Comments"
          subtitle="Send me a direct email for opportunities, or leave a public comment that will be seen by everyone."
          accent="cyan"
        />

        {/* Direct Contacts Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {/* Email Pill */}
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-between group hover:border-cyan-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="text-xs font-semibold text-white hover:text-cyan-300 transition-colors truncate block">
                  {personalInfo.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              title="Copy Email"
              className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-slate-400 hover:text-white transition-colors shrink-0"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Pill */}
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-between group hover:border-cyan-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Phone</span>
                <a href={`tel:${personalInfo.phone}`} className="text-xs font-semibold text-white hover:text-indigo-300 transition-colors">
                  {personalInfo.phoneFormatted}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.phone, 'phone')}
              title="Copy Phone"
              className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-slate-400 hover:text-white transition-colors shrink-0"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Location Pill */}
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Location</span>
              <span className="text-xs font-semibold text-white">
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-around gap-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </motion.div>

        {/* SIDE-BY-SIDE: Send Email (Left) & Comments (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: SEND EMAIL (Direct & Private)               */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Send Me an Email</h3>
                  <p className="text-xs font-mono text-cyan-400">Private message to kartikjoshi842@gmail.com</p>
                </div>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Direct Inbox
              </span>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Subject <span className="text-slate-500 text-[10px]">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Internship opportunity / Collaboration / Hiring"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Hi Kartik, I came across your portfolio and wanted to discuss..."
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                />
              </div>

              {/* Status Alert */}
              {emailStatus && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
                    emailStatus.type === 'success'
                      ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/40 border border-red-500/30 text-red-300'
                  }`}
                >
                  {emailStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  )}
                  <span>{emailStatus.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={emailSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-95 disabled:opacity-50"
              >
                {emailSubmitting ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Delivering email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Email to Kartik</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: PUBLIC COMMENTS (Visible to Everyone)       */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Public Comments</h3>
                    <p className="text-xs font-mono text-slate-400">Written by visitors &bull; Seen by everyone</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadComments}
                    disabled={commentsLoading}
                    title="Refresh comments"
                    className="p-2 rounded-lg bg-surface-100 hover:bg-surface-50 text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${commentsLoading ? 'animate-spin text-cyan-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Database Status Strip */}
              <div className="mb-4 p-2.5 rounded-xl bg-surface-100/60 border border-white/5 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Database className="w-3.5 h-3.5" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>MongoDB Atlas</span>
                </div>
                <span className="text-slate-400">
                  {comments.length} comment{comments.length === 1 ? '' : 's'}
                </span>
              </div>

              {/* Comment Input Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-3 mb-6">
                <div>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Your Name or @username *"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-100 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                  />
                </div>

                <div className="relative">
                  <textarea
                    required
                    maxLength={500}
                    rows={3}
                    placeholder="Write a comment here... (will be seen by everyone who visits this portfolio)"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"
                  />
                  <span className="absolute right-3 bottom-3 text-[10px] font-mono text-slate-500">
                    {commentText.length}/500
                  </span>
                </div>

                {/* Status Alert */}
                {commentStatus && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      commentStatus.type === 'success'
                        ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                        : 'bg-red-950/40 border border-red-500/30 text-red-300'
                    }`}
                  >
                    {commentStatus.type === 'success' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                    )}
                    <span>{commentStatus.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={commentSubmitting}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 shadow-md shadow-violet-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {commentSubmitting ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Posting to Atlas...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Comment</span>
                    </>
                  )}
                </button>
              </form>

              {/* Public Comments Feed List */}
              <div className="pt-2 border-t border-white/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  All Comments
                </span>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {commentsLoading ? (
                    <div className="py-8 flex flex-col items-center justify-center text-slate-400 text-xs font-mono gap-2">
                      <RotateCw className="w-5 h-5 animate-spin text-violet-400" />
                      <span>Loading comments from Atlas...</span>
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="py-8 px-4 text-center rounded-2xl bg-surface-100/40 border border-white/5">
                      <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-400 font-mono">
                        No comments yet. Write the first comment above!
                      </p>
                    </div>
                  ) : (
                    comments.map((c, i) => (
                      <div
                        key={c._id || i}
                        className="p-3 rounded-xl bg-surface-100/80 border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-md bg-gradient-to-tr ${getAvatarGradient(c.name)} flex items-center justify-center text-white text-[10px] font-bold uppercase`}>
                              {c.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-white text-xs sm:text-sm">
                              {c.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(c.createdAt)}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed pl-8 break-words">
                          {c.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
