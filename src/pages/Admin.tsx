import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { contributions } from '../services/supabase';
import { Contribution } from '../types';

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

export function Admin() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [contributionsList, setContributionsList] = useState<Contribution[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('pending');
  const [loading, setLoading] = useState(true);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadContributions();
    }
  }, [filter, isAdmin]);

  async function loadContributions() {
    setLoading(true);
    try {
      const data = await contributions.getAll(filter);
      setContributionsList(data || []);
    } catch (error) {
      console.error('Error loading contributions:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    setActionLoading(true);
    try {
      await contributions.updateStatus(id, 'approved', adminNote || undefined);
      await loadContributions();
      setSelectedContribution(null);
      setAdminNote('');
    } catch (error) {
      console.error('Error approving:', error);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReject(id: string) {
    setActionLoading(true);
    try {
      await contributions.updateStatus(id, 'rejected', adminNote || undefined);
      await loadContributions();
      setSelectedContribution(null);
      setAdminNote('');
    } catch (error) {
      console.error('Error rejecting:', error);
    } finally {
      setActionLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hapoel-red"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const pendingCount = contributionsList.filter(c => c.status === 'pending').length;

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">לוח ניהול</h1>
          <p className="text-gray-600">ניהול תרומות מהקהילה</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['pending', 'approved', 'rejected', 'all'] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-hapoel-red text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status === 'pending' ? `ממתינים (${pendingCount})` :
               status === 'approved' ? 'אושרו' :
               status === 'rejected' ? 'נדחו' : 'הכל'}
            </button>
          ))}
        </div>

        {/* Contributions List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hapoel-red mx-auto"></div>
              </div>
            ) : contributionsList.length > 0 ? (
              <div className="space-y-4">
                {contributionsList.map((contribution) => (
                  <div
                    key={contribution.id}
                    onClick={() => setSelectedContribution(contribution)}
                    className={`bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow ${
                      selectedContribution?.id === contribution.id ? 'ring-2 ring-hapoel-red' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {contribution.type}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            contribution.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            contribution.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {contribution.status === 'pending' ? 'ממתין' :
                             contribution.status === 'approved' ? 'אושר' : 'נדחה'}
                          </span>
                          {contribution.year && (
                            <span className="text-xs text-gray-500">{contribution.year}</span>
                          )}
                        </div>
                        <h3 className="font-bold">{contribution.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-1">{contribution.content}</p>
                      </div>
                    </div>
                    {contribution.users?.email && (
                      <p className="text-xs text-gray-400 mt-2">
                        {contribution.users.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                אין תרומות להצגה
              </div>
            )}
          </div>

          {/* Selected Contribution Details */}
          <div className="lg:col-span-1">
            {selectedContribution ? (
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">פרטי תרומה</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">סוג</label>
                    <p className="font-medium">{selectedContribution.type}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">כותרת</label>
                    <p className="font-medium">{selectedContribution.title}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">תוכן</label>
                    <p className="text-gray-700 text-sm">{selectedContribution.content}</p>
                  </div>

                  {selectedContribution.year && (
                    <div>
                      <label className="text-sm text-gray-500">שנה</label>
                      <p className="font-medium">{selectedContribution.year}</p>
                    </div>
                  )}

                  {selectedContribution.source_url && (
                    <div>
                      <label className="text-sm text-gray-500">מקור</label>
                      <a 
                        href={selectedContribution.source_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-hapoel-red text-sm hover:underline break-all"
                      >
                        {selectedContribution.source_url}
                      </a>
                    </div>
                  )}

                  {selectedContribution.image_url && (
                    <div>
                      <label className="text-sm text-gray-500">תמונה</label>
                      <img 
                        src={selectedContribution.image_url} 
                        alt={selectedContribution.title}
                        className="w-full rounded-lg mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm text-gray-500">הערת מנהל</label>
                    <textarea
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="input-field mt-1"
                      placeholder="הערה (אופציונלי)"
                      rows={2}
                    />
                  </div>

                  {selectedContribution.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleApprove(selectedContribution.id)}
                        disabled={actionLoading}
                        className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
                      >
                        {actionLoading ? '...' : 'אישור'}
                      </button>
                      <button
                        onClick={() => handleReject(selectedContribution.id)}
                        disabled={actionLoading}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 disabled:opacity-50"
                      >
                        {actionLoading ? '...' : 'דחייה'}
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedContribution(null);
                      setAdminNote('');
                    }}
                    className="w-full btn-secondary"
                  >
                    סגירה
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
                בחר תרומה לצפייה בפרטים
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
