# Blog Platform Project | פרויקט פלטפורמת בלוג

# Introduction
This project is a blog platform API built with Node.js, Express, MongoDB, and TypeScript. It features a RESTful API for managing blog posts and comments, with Swagger documentation for easy testing and integration.
Prerequisites

Node.js (v14 or later)
MongoDB
npm or yarn

# Installation

Clone the repository:
Copygit clone https://github.com/your-username/blog-platform.git
cd blog-platform

Install dependencies:
Copynpm install

# Set up environment variables:
Create a .env file in the root directory and add:
CopyMONGODB_URI=your_mongodb_connection_string
PORT=3000


# Running the Application

Start the server:
Copynpm run dev

The server will start on http://localhost:3000 (or the port specified in your .env file)

# API Documentation
Swagger UI is available at http://localhost:3000/api-docs when the server is running. Use this interface to explore and test the API endpoints.

# Main Features

CRUD operations for blog posts
Adding comments to posts
MongoDB integration for data persistence
TypeScript for type safety
Swagger for API documentation and testing

# Project Structure

src/app.ts: Main application file
src/models/: MongoDB schemas
src/controllers/: Request handlers
src/routes/: API routes
src/swagger.ts: Swagger configuration

# Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
License
This project is licensed under the MIT License.

הקדמה
פרויקט זה הוא API לפלטפורמת בלוג שנבנה באמצעות Node.js, Express, MongoDB ו-TypeScript. הוא מציע API מסוג RESTful לניהול פוסטים ותגובות בבלוג, עם תיעוד Swagger לבדיקה ואינטגרציה קלה.
דרישות מקדימות

Node.js (גרסה 14 ומעלה)
MongoDB
npm או yarn

התקנה

שכפל את המאגר:
Copygit clone https://github.com/your-username/blog-platform.git
cd blog-platform

התקן את התלויות:
Copynpm install

הגדר משתני סביבה:
צור קובץ .env בתיקיית השורש והוסף:
CopyMONGODB_URI=מחרוזת_החיבור_של_mongodb_שלך
PORT=3000


הפעלת האפליקציה

הפעל את השרת:
Copynpm run dev

השרת יופעל בכתובת http://localhost:3000 (או בפורט שצוין בקובץ ה-.env שלך)

תיעוד ה-API
ממשק Swagger UI זמין בכתובת http://localhost:3000/api-docs כאשר השרת פועל. השתמש בממשק זה כדי לחקור ולבדוק את נקודות הקצה של ה-API.
תכונות עיקריות

פעולות CRUD עבור פוסטים בבלוג
הוספת תגובות לפוסטים
אינטגרציה עם MongoDB לשמירת נתונים
שימוש ב-TypeScript לבטיחות טיפוסים
Swagger לתיעוד ובדיקת ה-API

מבנה הפרויקט

src/app.ts: קובץ האפליקציה הראשי
src/models/: סכמות MongoDB
src/controllers/: מטפלי בקשות
src/routes/: נתיבי API
src/swagger.ts: תצורת Swagger

תרומה לפרויקט
תרומות מתקבלות בברכה! אנא הרגישו חופשי להגיש Pull Request.
רישיון
פרויקט זה מורשה תחת רישיון MIT.