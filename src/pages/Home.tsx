import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contributions } from '../services/supabase';
import { Contribution } from '../types';
import { ContributionCard } from '../components/ContributionCard';

export function Home() {
  const [latestContributions, setLatestContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatest();
  }, []);

  async function loadLatest() {
    try {
      const data = await contributions.getAll('approved');
      setLatestContributions(data?.slice(0, 6) || []);
    } catch (error) {
      console.error('Error loading contributions:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hapoel-red to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ארכיון האוהדים
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-red-100">
            הפועל תל אביב - כל ההיסטוריה במקום אחד
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/history" 
              className="bg-white text-hapoel-red px-6 py-3 rounded-lg font-semibold hover:bg-red-100 transition-colors"
            >
              לגלות את ההיסטוריה
            </Link>
            <Link 
              to="/contribute" 
              className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-hapoel-red transition-colors"
            >
              להוסיף תוכן
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { to: '/history', label: 'היסטוריה', emoji: '📜' },
              { to: '/titles', label: 'תארים', emoji: '🏆' },
              { to: '/legends', label: 'אגדות', emoji: '⭐' },
              { to: '/seasons', label: 'עונות', emoji: '📊' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block bg-gray-50 hover:bg-gray-100 rounded-xl p-6 text-center transition-colors"
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <div className="font-semibold text-gray-800">{item.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Contributions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">עדכונים אחרונים</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hapoel-red mx-auto"></div>
            </div>
          ) : latestContributions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestContributions.map((contribution) => (
                <ContributionCard key={contribution.id} contribution={contribution} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">אין תוכן ציבורי עדיין.</p>
              <Link to="/contribute" className="text-hapoel-red hover:underline">
                הוסף תוכן ראשון →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">על הארכיון</h2>
            <p className="text-gray-600 leading-relaxed">
              ארכיון האוהדים של הפועל תל אביב הוא פלטפורמה קהילתית שמטרתה לשמר את כל 
              הזיכרונות, הסיפורים וההיסטוריה של המועדון האגדי. כל אוהד יכול לתרום תוכן, 
              וכל התרומות עוברות בקרה לפני שמתפרסמות.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
