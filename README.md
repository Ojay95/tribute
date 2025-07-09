# Uncle Robert Memorial Website

A beautiful, responsive tribute website built with Next.js to honor the memory of Uncle Robert.

## Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Modern Styling**: Beautiful gradient backgrounds with animated elements
- **Tribute System**: Users can submit and view heartfelt tributes
- **Admin Panel**: Manage tributes with easy-to-use controls
- **Local Storage**: All data persists in browser storage

## Data Storage for Netlify Deployment

### Current Storage Method
The website currently uses **browser localStorage** to store tribute data. This means:
- Data is stored locally in each user's browser
- Data persists between sessions on the same device/browser
- Data is not shared between different users or devices
- Data will be lost if the user clears their browser data

### For Production Deployment on Netlify

For a production website where you want to share tributes between all visitors, you'll need to implement a backend database. Here are the recommended options:

#### Option 1: Supabase (Recommended)
- **Free tier available** with generous limits
- **Easy setup** with built-in authentication
- **Real-time updates** for new tributes
- **PostgreSQL database** with REST API

#### Option 2: Firebase Firestore
- **Google's NoSQL database**
- **Real-time synchronization**
- **Free tier available**

#### Option 3: Netlify Functions + External Database
- **Serverless functions** for API endpoints
- **Connect to any database** (MongoDB, PostgreSQL, etc.)
- **Scales automatically**

#### Option 4: Airtable
- **Simple setup** for non-technical users
- **Spreadsheet-like interface** for data management
- **API access** for website integration

### Implementation Steps for Database Integration

1. **Choose a database service** (Supabase recommended)
2. **Create database tables** for tributes
3. **Replace localStorage functions** with API calls
4. **Add environment variables** for database credentials
5. **Update deployment settings** in Netlify

### Current File Structure for Data
```
lib/tribute-storage.ts - Contains all data management functions
```

To upgrade to a database, you would primarily modify this file to replace localStorage calls with API calls to your chosen database service.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Deployment

The website is configured for static export and can be deployed to Netlify:

```bash
npm run build
```

The `out` folder contains the static files ready for deployment.

## Font

The website uses **Montserrat** font family for a modern, elegant appearance.

## Technologies Used

- **Next.js 13** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful UI components
- **Lucide React** - Icon library
- **TypeScript** - Type safety