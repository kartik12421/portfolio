import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Copy, RotateCw, Mail, Phone, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from './SectionHeading';
import { personalInfo } from '../data/portfolioData';
import { CommentItem } from '../types/portfolio';
import { sendContactMessage, fetchComments, submitComment } from '../services/api';

export const Contact: React.FC = () => {
  const [emailForm, setEmailForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadComments = async () => {
    setCommentsLoading(true);
    try {
      const res = await fetchComments();
      setComments(res && Array.isArray(res.comments) ? res.comments : []);
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.name.trim() || !emailForm.email.trim() || !emailForm.message.trim()) {
      setEmailStatus({ type: 'error', text: 'Please fill in your name, email and message.' });
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
        setEmailStatus({ type: 'success', text: result.message || 'Thanks — your message is on its way to Kartik.' });
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.75 },
          colors: ['#0669a9', '#67d2f5', '#1a1816'],
        });
        setEmailForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setEmailStatus({
          type: 'error',
          text: 'Couldn\u2019t send that right now — please email directly at kartikjoshi842@gmail.com.',
        });
      }
    } catch (err: any) {
      setEmailStatus({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setEmailSubmitting(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      setCommentStatus({ type: 'error', text: 'Add both a name and a comment.' });
      return;
    }

    setCommentSubmitting(true);
    setCommentStatus(null);

    try {
      const res = await submitComment({ name: commentName.trim(), message: commentText.trim() });

      if (res.success && res.comment) {
        setComments((prev) => [res.comment!, ...prev]);
        setCommentName('');
        setCommentText('');
        setCommentStatus({ type: 'success', text: 'Posted — it\u2019s visible to everyone now.' });
        confetti({
          particleCount: 35,
          spread: 55,
          origin: { y: 0.75 },
          colors: ['#0669a9', '#67d2f5', '#1a1816'],
        });
      } else {
        setCommentStatus({ type: 'error', text: res.error || 'Couldn\u2019t post that. Try again.' });
      }
    } catch (err: any) {
      setCommentStatus({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setCommentSubmitting(false);
    }
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return 'now';
    try {
      const date = new Date(isoString);
      const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMinutes < 1) return 'now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'now';
    }
  };

  return (
    <section id="contact" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07"
          badge="Contact"
          title="Say hello"
          subtitle="Hiring, collaboration or just a question — the form goes straight to my inbox. The guestbook below is public."
        />

        {/* Contact details as a ruled list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3"
        >
          <div className="flex items-start justify-between gap-3 bg-bg p-5">
            <div className="min-w-0">
              <div className="kicker flex items-center gap-1.5">
                <Mail className="h-3 w-3" strokeWidth={2} /> Email
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="mt-2 block truncate text-sm text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {personalInfo.email}
              </a>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              aria-label="Copy email address"
              className="shrink-0 text-faint transition-colors hover:text-ink"
            >
              {copiedEmail ? (
                <Check className="h-4 w-4 text-accent" strokeWidth={2} />
              ) : (
                <Copy className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>
          </div>

          <div className="flex items-start justify-between gap-3 bg-bg p-5">
            <div>
              <div className="kicker flex items-center gap-1.5">
                <Phone className="h-3 w-3" strokeWidth={2} /> Phone
              </div>
              <a
                href={`tel:${personalInfo.phone}`}
                className="mt-2 block text-sm text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {personalInfo.phoneFormatted}
              </a>
            </div>
            <button
              onClick={() => handleCopy(personalInfo.phone, 'phone')}
              aria-label="Copy phone number"
              className="shrink-0 text-faint transition-colors hover:text-ink"
            >
              {copiedPhone ? (
                <Check className="h-4 w-4 text-accent" strokeWidth={2} />
              ) : (
                <Copy className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>
          </div>

          <div className="bg-bg p-5">
            <div className="kicker flex items-center gap-1.5">
              <MapPin className="h-3 w-3" strokeWidth={2} /> Location
            </div>
            <div className="mt-2 text-sm text-ink">{personalInfo.location}</div>
          </div>
        </motion.div>

        {/* Two columns: form + guestbook */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Email form */}
          <div>
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="font-display text-2xl font-normal tracking-tight text-ink">
                Write to me
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Direct inbox
              </span>
            </div>

            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="kicker block">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                    className="field mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className="kicker block">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    className="field mt-2"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cf-subject" className="kicker block">
                  Subject <span className="text-faint">(optional)</span>
                </label>
                <input
                  id="cf-subject"
                  type="text"
                  placeholder="Role, project, or question"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  className="field mt-2"
                />
              </div>

              <div>
                <label htmlFor="cf-message" className="kicker block">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="cf-message"
                  required
                  rows={6}
                  placeholder="Hi Kartik, I came across your portfolio and…"
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  className="field mt-2 resize-none"
                />
              </div>

              {emailStatus && (
                <p
                  className={`border-l-2 py-1.5 pl-3 text-sm leading-relaxed ${
                    emailStatus.type === 'success'
                      ? 'border-accent text-ink'
                      : 'border-red-600 text-red-700 dark:border-red-400 dark:text-red-400'
                  }`}
                >
                  {emailStatus.text}
                </p>
              )}

              <button
                type="submit"
                disabled={emailSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-on transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {emailSubmitting ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Guestbook */}
          <div>
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <h3 className="font-display text-2xl font-normal tracking-tight text-ink">
                Guestbook
              </h3>
              <button
                onClick={loadComments}
                disabled={commentsLoading}
                aria-label="Refresh comments"
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint transition-colors hover:text-ink disabled:opacity-50"
              >
                <RotateCw className={`h-3 w-3 ${commentsLoading ? 'animate-spin' : ''}`} />
                {comments.length} note{comments.length === 1 ? '' : 's'}
              </button>
            </div>

            <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                required
                maxLength={50}
                placeholder="Your name"
                aria-label="Your name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="field"
              />
              <div className="relative">
                <textarea
                  required
                  maxLength={500}
                  rows={3}
                  placeholder="Leave a note — it's public."
                  aria-label="Your comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="field resize-none pb-7"
                />
                <span className="pointer-events-none absolute bottom-2.5 right-3 font-mono text-[10px] tabular-nums text-faint">
                  {commentText.length}/500
                </span>
              </div>

              {commentStatus && (
                <p
                  className={`border-l-2 py-1.5 pl-3 text-sm leading-relaxed ${
                    commentStatus.type === 'success'
                      ? 'border-accent text-ink'
                      : 'border-red-600 text-red-700 dark:border-red-400 dark:text-red-400'
                  }`}
                >
                  {commentStatus.text}
                </p>
              )}

              <button
                type="submit"
                disabled={commentSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-50"
              >
                {commentSubmitting ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    Posting…
                  </>
                ) : (
                  <>
                    Post note
                    <Send className="h-4 w-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </form>

            {/* Notes feed */}
            <div className="mt-8 border-t border-line pt-5">
              <span className="kicker">Recent notes</span>

              <div className="mt-4 max-h-[22rem] space-y-px overflow-y-auto border border-line bg-line pr-1">
                {commentsLoading ? (
                  <div className="flex flex-col items-center gap-2 bg-bg px-4 py-10 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    <RotateCw className="h-4 w-4 animate-spin text-accent" />
                    Loading notes…
                  </div>
                ) : comments.length === 0 ? (
                  <div className="bg-bg px-4 py-10 text-center">
                    <p className="font-display text-base text-ink">No notes yet</p>
                    <p className="mt-1.5 text-sm text-muted">Be the first to sign the guestbook.</p>
                  </div>
                ) : (
                  comments.map((c, i) => (
                    <div key={c._id || i} className="bg-bg px-4 py-3.5 transition-colors hover:bg-elev">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="truncate text-sm font-medium text-ink">{c.name}</span>
                        <span className="shrink-0 font-mono text-[10px] tabular-nums text-faint">
                          {formatTime(c.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1.5 break-words text-sm leading-relaxed text-muted">
                        {c.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
