import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthPage from './components/Auth/AuthPage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddApplicationForm from './components/AddApplicationForm';
import Footer from './components/Footer';
import { onAuthStateChange, getCurrentUser } from './services/supabase';

interface Application {
  id: string;
  company: string;
  role: string;
  platform: string;
  applied_date: string;
  follow_up_date?: string;
  notes?: string;
  resume_url?: string;
  jd_url?: string;
  status: string;
  created_at: string;
}

interface User {
  id: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Check current user on app load
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setApplications([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleApplicationAdded = (newApplication: Application) => {
    setApplications((prev) => [newApplication, ...prev]);
  };

  const handleApplicationsUpdate = (updatedApplications: Application[]) => {
    setApplications(updatedApplications);
  };

  const handleAuthSuccess = () => {
    // Auth state change will be handled by the listener
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthPage onAuthSuccess={handleAuthSuccess} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative">
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg%20width='60'%20height='60'%20viewBox='0%200%2060%2060'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cg%20fill='none'%20fill-rule='evenodd'%3E%3Cg%20fill='%23ffffff'%20fill-opacity='0.05'%3E%3Ccircle%20cx='30'%20cy='30'%20r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20 pointer-events-none`}
      ></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar 
          onAddApplication={() => setShowAddForm(true)} 
          userEmail={user.email}
        />

        {/* Main Dashboard */}
        <main className="flex-grow">
          <Dashboard
            applications={applications}
            onApplicationsUpdate={handleApplicationsUpdate}
          />
        </main>

        {/* Footer */}
        <Footer />

        {/* Add Application Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-auto">
              <AddApplicationForm
                onClose={() => setShowAddForm(false)}
                onApplicationAdded={handleApplicationAdded}
              />
            </div>
          </div>
        )}

        {/* Toasts */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}

export default App;