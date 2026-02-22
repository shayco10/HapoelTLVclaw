import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  return (
    <header className="bg-hapoel-red text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-hapoel-red font-bold text-2xl">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">הפועל תל אביב</h1>
              <p className="text-xs text-red-200">ארכיון האוהדים</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-red-200 transition-colors">ראשי</Link>
            <Link to="/history" className="hover:text-red-200 transition-colors">היסטוריה</Link>
            <Link to="/titles" className="hover:text-red-200 transition-colors">תארים</Link>
            <Link to="/legends" className="hover:text-red-200 transition-colors">אגדות</Link>
            <Link to="/seasons" className="hover:text-red-200 transition-colors">עונות</Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link 
                  to="/contribute" 
                  className="bg-white text-hapoel-red px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                >
                  להוספה
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    ניהול
                  </Link>
                )}
                <button 
                  onClick={handleSignOut}
                  className="text-sm hover:text-red-200 transition-colors"
                >
                  התנתק
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="bg-white text-hapoel-red px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
              >
                התחברות
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
