import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-hapoel-dark text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ארכיון הפועל תל אביב</h3>
            <p className="text-gray-400 text-sm">
              ארכיון האוהדים של הפועל תל אביב - כל ההיסטוריה, הזכרונות והאגדות של המועדון האהוב.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">ניווט מהיר</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">ראשי</Link></li>
              <li><Link to="/history" className="hover:text-white">היסטוריה</Link></li>
              <li><Link to="/titles" className="hover:text-white">תארים</Link></li>
              <li><Link to="/legends" className="hover:text-white">אגדות</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">הצטרפו אלינו</h4>
            <p className="text-gray-400 text-sm mb-4">
              הצטרפו לארכיון ועזרו לשמר את ההיסטוריה של הפועל תל אביב לדורות הבאים.
            </p>
            <Link 
              to="/auth" 
              className="inline-block bg-hapoel-red px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              הרשמה
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ארכיון האוהדים הפועל תל אביב. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
