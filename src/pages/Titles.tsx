import { useEffect, useState } from 'react';
import { contributions } from '../services/supabase';
import { Contribution } from '../types';
import { ContributionCard } from '../components/ContributionCard';

export function Titles() {
  const [titles, setTitles] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTitles();
  }, []);

  async function loadTitles() {
    try {
      const data = await contributions.getAll('approved');
      const titleItems = data?.filter(c => c.type === 'title') || [];
      setTitles(titleItems);
    } catch (error) {
      console.error('Error loading titles:', error);
    } finally {
      setLoading(false);
    }
  }

  const championshipYears = [
    { count: 23, label: 'אליפויות מדינת ישראל' },
    { count: 6, label: 'גביעי מדינה' },
    { count: 4, label: 'גביעי טוטו' },
    { count: 1, label: 'גביע המדינה הראשון (תר"י)' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">תארים וזכיות</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            כל התארים והזכיות של הפועל תל אביב לאורך השנים
          </p>
        </div>

        {/* Championships Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {championshipYears.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-hapoel-red mb-2">{item.count}</div>
              <div className="text-gray-600 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Notable Titles */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">הישגים נבחרים</h2>
          <div className="space-y-4">
            {[
              { year: '2024', title: 'אליפות מדינת ישראל', description: 'זכייה באליפות ה-23 בתולדות המועדון' },
              { year: '2023', title: 'גביע המדינה', description: 'ניצחון בגמר הגביע' },
              { year: '2022', title: 'דאבל', description: 'זכייה באליפות ובגביע' },
              { year: '1986', title: 'אליפות היסטורית', description: 'האליפות הראשונה בליגה הבכירה' },
            ].map((title, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-hapoel-red font-bold text-xl min-w-[80px]">{title.year}</div>
                <div>
                  <h3 className="font-bold">{title.title}</h3>
                  <p className="text-gray-600 text-sm">{title.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Contributions */}
        <h2 className="text-2xl font-bold mb-6">תרומות קהילתיות</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hapoel-red mx-auto"></div>
          </div>
        ) : titles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {titles.map((item) => (
              <ContributionCard key={item.id} contribution={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
            <p>אין תרומות עדיין. <a href="/contribute" className="text-hapoel-red hover:underline">להוספה</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
