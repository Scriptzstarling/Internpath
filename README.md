# InternPath - Job Application Tracker

A modern, beautiful job application tracking system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Modern UI**: Glassmorphism design with gradient backgrounds and smooth animations
- **Drag & Drop**: Intuitive Kanban board to move applications between stages
- **File Upload**: Upload resumes and job descriptions to Supabase Storage
- **Real-time Updates**: Live updates across all connected clients
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Toast Notifications**: User-friendly feedback for all actions

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database + Storage + Real-time)
- **UI Components**: Lucide React Icons
- **Drag & Drop**: react-beautiful-dnd
- **Notifications**: react-toastify

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and anon key
3. Update `src/services/supabase.js` with your credentials:
   ```javascript
   const supabaseUrl = 'YOUR_SUPABASE_URL'
   const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
   ```

### 2. Database Setup

1. Go to the SQL Editor in your Supabase dashboard
2. Run the migration script from `supabase/migrations/create_applications_table.sql`
3. This will create:
   - Applications table with all required fields
   - Storage buckets for resumes and job descriptions
   - Row Level Security policies
   - Real-time subscriptions

### 3. Storage Setup

The migration script automatically creates two storage buckets:
- `resumes` - for storing resume files
- `jds` - for storing job description files

Both buckets are configured with public read access and appropriate policies.

### 4. Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── AddApplicationForm.tsx    # Form to add new applications
│   ├── ApplicationCard.tsx       # Individual application card
│   ├── Column.tsx               # Status column component
│   ├── Dashboard.tsx            # Main dashboard with Kanban board
│   ├── Footer.tsx               # Footer component
│   └── Navbar.tsx               # Navigation header
├── pages/
│   └── Dashboard.tsx            # Dashboard page wrapper
├── services/
│   └── supabase.js              # Supabase client and database operations
└── App.tsx                      # Main application component
```

## Usage

1. **Add Application**: Click "Add Application" to create a new job application entry
2. **Upload Files**: Attach your resume and job description files
3. **Track Progress**: Drag applications between columns (Applied → Interview → Rejected/Offer)
4. **Manage Applications**: View details, access uploaded files, or delete applications
5. **Real-time Sync**: Changes are automatically synced across all connected devices

## Application Statuses

- **Applied**: Initial status when you submit an application
- **Interview**: Moved here when you get interview calls/emails
- **Rejected**: Applications that didn't move forward
- **Offer**: Successful applications with job offers

## File Upload

- **Supported Formats**: PDF, DOC, DOCX for resumes; PDF, DOC, DOCX, TXT for job descriptions
- **Storage**: Files are stored securely in Supabase Storage
- **Access**: Direct links to view/download uploaded files

## Customization

### Styling
- Colors and themes can be customized in the Tailwind classes
- Gradient backgrounds and glassmorphism effects are easily adjustable
- Component styles are modular and easy to modify

### Features
- Add new application statuses by updating the status enum in the database
- Extend the form with additional fields as needed
- Add email notifications or reminders for follow-ups

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting platform:
   - Netlify
   - Vercel
   - Firebase Hosting
   - GitHub Pages

Make sure to set up environment variables for your Supabase credentials if needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own job search!

## Support

If you encounter any issues or have questions:
1. Check the Supabase documentation for database/storage issues
2. Review the React Beautiful DND docs for drag-and-drop problems
3. Open an issue on GitHub for bugs or feature requests

Good luck with your job search! 🚀