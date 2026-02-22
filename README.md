# Hapoel TLV Fan Archive

ארכיון האוהדים של הפועל תל אביב - פלטפורמה קהילתית לשימור ההיסטוריה של המועדון.

## 🚀 התחלה מהירה

### 1. התקנת תלויות
```bash
npm install
```

### 2. הגדרת משתני סביבה
צור קובץ `.env` עם הפרטים שלך מ-Supabase:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. הרצה בסביבה מקומית
```bash
npm run dev
```

### 4. בנייה לייצור
```bash
npm run build
```

## 📋 הגדרת Supabase

### שלב 1: יצירת פרויקט
1. עבור ל-[Supabase](https://supabase.com)
2. צור פרויקט חדש

### שלב 2: הרצת הסכמה
1. פתח את SQL Editor ב-Supabase
2. העתק את התוכן מ-`supabase/schema.sql`
3. הרץ את ה-SQL

### שלב 3: הגדרת Auth
1. עבור ל-Authentication > Providers
2. הפעל את "Email"

## 🛠️ פיצ'רים

- **דפים ציבוריים**: ראשי, היסטוריה, תארים, אגדות, עונות
- **אימות**: הרשמה והתחברות עם אימייל וסיסמה
- **תרומות**: משתמשים רשומים יכולים להגיש תוכן
- **ניהול**: מנהלים יכולים לאשר/לדחות תרומות

## 👤 תפקידי משתמש

- **User**: יכול לגלוש ולהגיש תרומות
- **Admin**: יכול לנהל את כל התרומות

כדי להיות מנהל, השתמש באימייל:
- `admin@hapoeltlv.fan`
- `shay@example.com`

## 🌐 פריסה

האפליקציה מותאמת לפריסה על Netlify:

```bash
npm run build
# הפלט יהיה בתיקיית dist/
```

העלה את תוכן התיקייה `dist/` ל-Netlify.

## 📁 מבנה הפרויקט

```
src/
├── components/   # רכיבים משותפים
├── context/      # React Context
├── pages/        # דפי האפליקציה
├── services/     # קריאות ל-Supabase
├── types/        # הגדרות TypeScript
└── App.tsx       # נקודת כניסה ראשית
```

## 📄 רישיון

MIT
