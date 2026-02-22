import { useEffect, useState } from 'react';
import { contributions } from '../services/supabase';
import { Contribution } from '../types';
import { ContributionCard } from '../components/ContributionCard';

export function Seasons() {
  const [seasons, setSeasons] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSeasons();
  }, []);

  async function loadSeasons() {
    try {
      const data = await contributions.getAll('approved');
      const seasonItems = data?.filter(c => c.type === 'season') || [];
      setSeasons(seasonItems);
    } catch (error) {
      console.error('Error loading seasons:', error);
    } finally {
      setLoading(false);
    }
  }

  const recentSeasons = [
    { year: '2024/25', position: '1st', notes: 'אליפות' },
    { year: '2023/24', position: '1st', notes: 'אליפות' },
    { year: '2022/23', position: '2nd', notes: 'גביע' },
    { year: '2021/22', position: '1st', notes: 'דאבל' },
    { year: '2020/21', position: '4th', notes: '' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">עונות היסטוריות</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            סקירת העונות של הפועל תל אביב לאורך השנים
          </p>
        </div>

        {/* Recent Seasons */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-hapoel-red text-white p-4">
            <h2 className="text-xl font-bold">העונות האחרונות</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right font-semibold">עונה</th>
                  <th className="px-4 py-3 text-right font-semibold">מיקום</th>
                  <th className="px-4 py-3 text-right font-semibold">הערות</th>
                </tr>
              </thead>
              <tbody>
                {recentSeasons.map((season, index) => (
                  <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{season.year}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        season.position === '1st' ? 'bg-yellow-100 text-yellow-800' :
                        season.position === '2nd' ? 'bg-gray-100 text-gray-800' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {season.position}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{season.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Community Contributions */}
        <h2 className="text-2xl font-bold mb-6">תרומות מהקהילה</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hapoel-red mx-auto"></div>
          </div>
        ) : seasons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasons.map((item) => (
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
