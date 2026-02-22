import { useEffect, useState } from 'react';
import { contributions } from '../services/supabase';
import { Contribution } from '../types';
import { ContributionCard } from '../components/ContributionCard';

export function History() {
  const [historyItems, setHistoryItems] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await contributions.getAll('approved');
      const history = data?.filter(c => 
        c.type === 'story' || c.type === 'event' || c.type === 'title'
      ) || [];
      setHistoryItems(history);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">היסטוריה</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            צעדו איתנו במסע عبر השנים - מימי הקמת המועדון ועד היום
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <div className="border-r-4 border-hapoel-red mr-4 md:mr-1/2 space-y-8 pr-8">
            {[
              { year: 1923, title: 'שנת הקמה', description: 'הפועל תל אביב נוסדה בתל אביב' },
              { year: 1928, title: 'האליפות הראשונה', description: 'זכייה באליפות ארץ ישראל הראשונה' },
              { year: 1950, title: 'עידן הזהב', description: 'תקופת השיא של המועדון בשנות ה-50' },
              { year: 1992, title: 'חזרה לליגה הראשונה', description: 'הקמת ליגת העל' },
              { year: 2020, title: 'עידן מודרני', description: 'המועדון בעידן החדש' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -right-12 md:-right-9 w-6 h-6 bg-hapoel-red rounded-full border-4 border-white shadow-lg"></div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="text-hapoel-red font-bold text-xl mb-1">{item.year}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Contributions */}
        <h2 className="text-2xl font-bold mb-6">תרומות מהקהילה</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hapoel-red mx-auto"></div>
          </div>
        ) : historyItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyItems.map((item) => (
              <ContributionCard key={item.id} contribution={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
            <p>אין תרומות היסטוריות עדיין.</p>
          </div>
        )}
      </div>
    </div>
  );
}
