import { Contribution } from '../types';

interface ContributionCardProps {
  contribution: Contribution;
  showStatus?: boolean;
}

const typeLabels: Record<string, string> = {
  story: 'סיפור',
  correction: 'תיקון',
  title: 'תואר',
  legend: 'אגדה',
  season: 'עונה',
  event: 'אירוע'
};

export function ContributionCard({ contribution, showStatus = false }: ContributionCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {contribution.image_url && (
        <img 
          src={contribution.image_url} 
          alt={contribution.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
          {typeLabels[contribution.type] || contribution.type}
        </span>
        {contribution.year && (
          <span className="text-xs text-gray-500">{contribution.year}</span>
        )}
        {showStatus && (
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[contribution.status]}`}>
            {contribution.status === 'pending' ? 'ממתין' : 
             contribution.status === 'approved' ? 'אושר' : 'נדחה'}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold mb-2">{contribution.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{contribution.content}</p>
      
      {contribution.source_url && (
        <a 
          href={contribution.source_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-hapoel-red text-sm hover:underline mt-2 inline-block"
        >
          מקור
        </a>
      )}
      
      <div className="text-xs text-gray-400 mt-3">
        {new Date(contribution.created_at).toLocaleDateString('he-IL')}
      </div>
    </div>
  );
}
