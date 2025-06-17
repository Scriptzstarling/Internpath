import React from 'react'
import { Briefcase, Plus, LogOut } from 'lucide-react'
import { signOut } from '../services/supabase'
import { toast } from 'react-toastify'

interface NavbarProps {
  onAddApplication: () => void
  userEmail?: string
}

const Navbar: React.FC<NavbarProps> = ({ onAddApplication, userEmail }) => {
  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  return (
    <nav className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 backdrop-blur-lg shadow-lg border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-xl"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">InternPath</h1>
              <p className="text-sm text-blue-100">Job Application Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {userEmail && (
              <span className="text-blue-100 text-sm hidden sm:block">
                Welcome, {userEmail}
              </span>
            )}
            
            <button
              onClick={onAddApplication}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 text-white transition-all duration-200 hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              <span>Add Application</span>
            </button>
            
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-lg border border-red-400/20 text-white transition-all duration-200 hover:scale-105"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar