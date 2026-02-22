import { useEffect, useState } from 'react';
import { contributions } from '../services/supabase';
import { Contribution } from '../types';
import { ContributionCard } from '../components/ContributionCard';

export function Legends() {
  const [legends, setLegends] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLegends();
  }, []);

  async function loadLegends() {
    try {
      const data = await contributions.getAll('approved');
      const legendItems = data?.filter(c => c.type === 'legend') || [];
      setLegends(legendItems);
    } catch (error) {
      console.error('Error loading legends:', error);
    } finally {
      setLoading(false);
    }
  }

  const greatLegends = [
    { name: 'מרקוס מוסקוביץ', years: '1950-1964', role: 'שוער', description: 'אגדת השוערים של הפועל' },
    { name: 'נסים אלקייס', years: '1950-1962', role: 'חלוץ', description: 'מלך השערים של כל הזמנים' },
    { name: 'משה ברמן', years: '1961-1975', role: 'קשר', description: 'קפטן הקבוצה בשנות הזהב' },
    { name: 'יוסי ברקוביץ', years: '1980-1995', role: 'חלוץ', description: 'אחד החלוצים הגדולים בתולדות המועדון' },
    { name: 'אבי נמני', years: '1979-1993', role: 'שוער', description: 'שוער הנצח עם הכי הרבה הופעות' },
    { name: 'טלי תבין', years: '1994-2010', role: 'מאמן', description: 'המאמן המצליח ביותר בתולדות המועדון' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">אגדות המועדון</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            השחקנים והאישים שהפכו את הפועל תל אביב לאגדה
          </p>
        </div>

        {/* Great Legends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {greatLegends.map((legend, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-hapoel-red rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{legend.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{legend.name}</h3>
                  <p className="text-sm text-gray-500">{legend.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{legend.description}</p>
              <div className="text-xs text-hapoel-red font-semibold">{legend.years}</div>
            </div>
          ))}
        </div>

        {/* Community Contributions */}
        <h2 className="text-2xl font-bold mb-6">תרומות מהקהילה</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hapoel-red mx-auto"></div>
          </div>
        ) : legends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legends.map((item) => (
              <ContributionCard key={item.id} contribution={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
            <p>אין תרומות עדיין. <a href="/contribute" className="text-hapoel-red hover:underline">להוספת אגדה</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
