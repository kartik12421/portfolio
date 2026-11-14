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
      if (data && Array.isArray(data.comments)) {
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
  try {
    const stored = localStorage.getItem('kartik_portfolio_comments');
    if (stored) {
      const parsed = JSON.parse(stored);
      const cleaned = cleanLocalCache(parsed);
      localStorage.setItem('kartik_portfolio_comments', JSON.stringify(cleaned));
      return {
        success: true,
        comments: cleaned,
        source: 'local_storage',
      };
    }
  } catch {
    // ignore JSON parse error
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
    name: commentData.name || 'Visitor',
    role: 'Visitor',
    message: commentData.message,
    avatarSeed: encodeURIComponent(commentData.name || 'Visitor'),
    createdAt: new Date().toISOString(),
  };

  try {
    const stored = localStorage.getItem('kartik_portfolio_comments');
    let currentList: CommentItem[] = [];
    if (stored) {
      currentList = cleanLocalCache(JSON.parse(stored));
    }
    currentList = [fallbackComment, ...currentList];
    localStorage.setItem('kartik_portfolio_comments', JSON.stringify(currentList));
  } catch {
    // ignore storage error
  }

  return {
    success: true,
    comment: fallbackComment,
    source: 'local_storage',
  };
}

/**
 * Send Contact Message to kartikjoshi842@gmail.com.
 * Tries the serverless endpoint first (it has the Web3Forms key), then falls
 * back to a direct browser -> FormSubmit call, then Netlify's native form.
 * Returns success:false if nothing actually delivered, so the UI never
 * shows a fake confirmation.
 */
export async function sendContactMessage(formData: ContactFormData): Promise<{
  success: boolean;
  message: string;
  method?: string;
}> {
  // Option 1: Serverless Netlify endpoint (Web3Forms -> Resend -> FormSubmit)
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json().catch(() => null);
    if (res.ok && data?.success) {
      return {
        success: true,
        message: data.message || 'Thank you! Your message was delivered to Kartik.',
        method: data.method,
      };
    }
  } catch (err) {
    console.info('Serverless contact endpoint unreachable, trying direct FormSubmit...');
  }

  // Option 2: Direct FormSubmit.co browser call (browser sends Origin/Referer itself)
  try {
    const fsResponse = await fetch('https://formsubmit.co/ajax/kartikjoshi842@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        _subject: formData.subject || `New message from ${formData.name} via Portfolio`,
        message: formData.message,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (fsResponse.ok) {
      const result = await fsResponse.json();
      if (result.success === 'true' || result.success === true) {
        return {
          success: true,
          message: 'Thank you! Your message was delivered directly to Kartik\'s email.',
          method: 'formsubmit_direct',
        };
      }
    }
  } catch (fsErr) {
    console.info('Direct FormSubmit attempt bypassed, trying Netlify form...');
  }

  // Option 3: Netlify native form submission fallback
  try {
    const nf = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'contact',
        name: formData.name,
        email: formData.email,
        subject: formData.subject || `Portfolio message from ${formData.name}`,
        message: formData.message,
      }).toString(),
    });

    if (nf.ok) {
      return {
        success: true,
        message: 'Thank you! Your message has been sent to Kartik Joshi.',
        method: 'netlify_form',
      };
    }
  } catch {
    // ignore
  }

  return {
    success: false,
    message: 'Unable to send your message right now. Please email directly at kartikjoshi842@gmail.com.',
    method: 'failed',
  };
}
