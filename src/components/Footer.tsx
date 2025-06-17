import React from 'react'
import { Heart, Code } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-white/80 mb-4 md:mb-0">
            <Code className="h-4 w-4" />
            <span className="text-sm">Built with React, Tailwind CSS & Supabase</span>
          </div>
          
          <div className="flex items-center space-x-2 text-white/80">
            <span className="text-sm">Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-sm">for job seekers</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-center text-xs text-white/60">
            © 2024 InternPath. Track your journey to success.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer