import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('נא למלא את כל השדות');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('הסיסמאות לא תואמות');
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'שגיאה בהתחברות. נסה שוב.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-hapoel-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-bold">H</span>
              </div>
              <h1 className="text-2xl font-bold">
                {isLogin ? 'התחברות' : 'הרשמה'}
              </h1>
              <p className="text-gray-500 mt-2">
                {isLogin 
                  ? 'התחבר לארכיון האוהדים' 
                  : 'צור חשבון חדש בארכיון'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  אימייל
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  סיסמה
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    אימות סיסמה
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>
              )}

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
                {loading ? 'טוען...' : isLogin ? 'התחבר' : 'הרשם'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-hapoel-red hover:underline text-sm"
              >
                {isLogin 
                  ? 'אין לך חשבון? הירשם כאן' 
                  : 'יש לך חשבון? התחבר כאן'}
              </button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p className="font-semibold mb-2">לדוגמה:</p>
              <p>אימייל: shay@example.com</p>
              <p>סיסמה: 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
