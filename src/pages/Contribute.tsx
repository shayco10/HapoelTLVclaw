import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { contributions } from '../services/supabase';
import { ContributionFormData } from '../types';

const contributionTypes = [
  { value: 'story', label: 'סיפור' },
  { value: 'correction', label: 'תיקון' },
  { value: 'title', label: 'תואר' },
  { value: 'legend', label: 'אגדה' },
  { value: 'season', label: 'עונה' },
  { value: 'event', label: 'אירוע' },
];

export function Contribute() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContributionFormData>({
    type: 'story',
    title: '',
    content: '',
    year: undefined,
    source_url: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">נדרשת התחברות</h2>
            <p className="text-gray-600 mb-6">יש להתחבר כדי להוסיף תוכן לארכיון.</p>
            <button
              onClick={() => navigate('/auth')}
              className="btn-primary"
            >
              התחברות
            </button>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.title || !formData.content) {
      setError('נא למלא כותרת ותוכן');
      return;
    }

    if (!user) return;

    setLoading(true);

    try {
      await contributions.create({
        user_id: user.id,
        type: formData.type,
        title: formData.title,
        content: formData.content,
        year: formData.year || null,
        source_url: formData.source_url || null,
        image_url: formData.image_url || null,
        status: 'pending',
      });
      
      setSuccess(true);
      setFormData({
        type: 'story',
        title: '',
        content: '',
        year: undefined,
        source_url: '',
        image_url: '',
      });
    } catch (err: any) {
      setError(err.message || 'שגיאה בשליחה. נסה שוב.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">הוספת תוכן חדש</h1>
              <p className="text-gray-500 mt-2">
                שתף את הידע שלך על הפועל תל אביב עם הקהילה
              </p>
            </div>

            {success && (
              <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
                ✓ התרומה נשלחה בהצלחה! היא תיבדק על ידי מנהל לפני הפרסום.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  סוג התרומה
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="input-field"
                >
                  {contributionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  כותרת *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="כותרת התרומה"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תוכן *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input-field min-h-[150px]"
                  placeholder="פרט את התוכן שלך כאן..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    שנה (אופציונלי)
                  </label>
                  <input
                    type="number"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="input-field"
                    placeholder="2024"
                    min="1900"
                    max="2030"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    קישור למקור
                  </label>
                  <input
                    type="url"
                    value={formData.source_url || ''}
                    onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                    className="input-field"
                    placeholder="https://..."
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  קישור לתמונה
                </label>
                <input
                  type="url"
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="input-field"
                  placeholder="https://... (jpg, png)"
                  dir="ltr"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'שולח...' : 'שלח לבקרה'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              כל התרומות עוברות בקרה לפני הפרסום. זה לוקח עד 48 שעות.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
