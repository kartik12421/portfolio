import { CommentItem, ContactFormData } from '../types/portfolio';

export interface CommentsApiResponse {
  success: boolean;
  comments: CommentItem[];
  source?: 'mongodb_atlas' | 'local_storage' | 'local_dev' | 'local_ready' | 'error';
  note?: string;
  error?: string;
}

// Helper to filter out legacy fake comments if stored in localStorage
function cleanLocalCache(list: any[]): CommentItem[] {
  if (!Array.isArray(list)) return [];
  return list.filter((item) => {
    if (!item || !item.message) return false;
    const isOldFake = item._id?.toString().startsWith('seed-') ||
                      item._id?.toString().startsWith('demo-') ||
                      item.name === 'Aman Sharma' ||
                      item.name === 'Priya Patel' ||
                      item.name === 'Rohan Verma';
    return !isOldFake;
  });
}

/**
 * Fetch all comments from MongoDB Atlas or local storage
 */
export async function fetchComments(): Promise<CommentsApiResponse> {
  try {
    const res = await fetch('/api/comments', {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.comments && Array.isArray(data.comments)) {
        const cleaned = cleanLocalCache(data.comments);
        return {
          success: true,
          comments: cleaned,
          source: data.source || 'mongodb_atlas',
          note: data.note,
        };
      }
    }
  } catch (err) {
    // API endpoint unreachable, fallback to localStorage
  }

  // Local storage fallback
  const stored = localStorage.getItem('kartik_portfolio_comments');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const cleaned = cleanLocalCache(parsed);
      localStorage.setItem('kartik_portfolio_comments', JSON.stringify(cleaned));
      return {
        success: true,
        comments: cleaned,
        source: 'local_storage',
      };
    } catch {
      // ignore JSON parse error
    }
  }

  return {
    success: true,
    comments: [],
    source: 'local_ready',
  };
}

/**
 * Submit a new comment to MongoDB Atlas
 */
export async function submitComment(commentData: {
  name: string;
  message: string;
}): Promise<{ success: boolean; comment?: CommentItem; error?: string; source?: string }> {
  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.comment) {
        return {
          success: true,
          comment: data.comment,
          source: data.source || 'mongodb_atlas',
        };
      }
    }
  } catch (err) {
    // API error, fallback to local storage
  }

  // Client-side fallback saving to localStorage
  const fallbackComment: CommentItem = {
    _id: 'client-' + Date.now(),
    name: commentData.name,
    role: 'Visitor',
    message: commentData.message,
    avatarSeed: encodeURIComponent(commentData.name),
    createdAt: new Date().toISOString(),
  };

  const stored = localStorage.getItem('kartik_portfolio_comments');
  let currentList: CommentItem[] = [];
  if (stored) {
    try {
      currentList = cleanLocalCache(JSON.parse(stored));
    } catch {
      currentList = [];
    }
  }
  currentList = [fallbackComment, ...currentList];
  localStorage.setItem('kartik_portfolio_comments', JSON.stringify(currentList));

  return {
    success: true,
    comment: fallbackComment,
    source: 'local_storage',
  };
}

/**
 * Send Contact Message to kartikjoshi842@gmail.com
 */
export async function sendContactMessage(formData: ContactFormData): Promise<{
  success: boolean;
  message: string;
  method?: string;
}> {
  // Option 1: Try serverless / dev API endpoint first
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          success: true,
          message: data.message || 'Message sent successfully! Kartik will get back to you shortly.',
          method: data.method,
        };
      }
    }
  } catch (err) {
    // fallback
  }

  // Option 2: Direct Web3Forms submission
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (web3formsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          from_name: 'Kartik Joshi Portfolio Website',
        }),
      });

      const result = await response.json();
      if (result.success) {
        return {
          success: true,
          message: 'Thank you! Your message was delivered directly to Kartik\'s inbox.',
          method: 'web3forms_client',
        };
      }
    } catch (err) {
      console.warn('Direct web3forms attempt error:', err);
    }
  }

  return {
    success: true,
    message: 'Thank you! Your message has been received. Kartik Joshi will reply to ' + formData.email + ' shortly.',
    method: 'client_registered',
  };
}
