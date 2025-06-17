import React, { useState } from 'react'
import { Briefcase, Sparkles } from 'lucide-react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

interface AuthPageProps {
  onAuthSuccess: () => void
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* ✅ Fixed Background Pattern */}
      <div
        className={`absolute inset-0 bg-[url(data:image/svg+xml,%3Csvg%20width='60'%20height='60'%20viewBox='0%200%2060%2060'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cg%20fill='none'%20fill-rule='evenodd'%3E%3Cg%20fill='%23ffffff'%20fill-opacity='0.05'%3E%3Ccircle%20cx='30'%20cy='30'%20r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)] opacity-20`}
      ></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo and Branding */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">InternPath</h1>
              <div className="flex items-center space-x-1 text-blue-200">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">Job Application Tracker</span>
              </div>
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-md mx-auto">
            Track your job applications with style. Organize, manage, and succeed in your career journey.
          </p>
        </div>

        {/* Auth Form Container */}
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            {isLogin ? (
              <LoginForm
                onSuccess={onAuthSuccess}
                onSwitchToSignup={() => setIsLogin(false)}
              />
            ) : (
              <SignupForm
                onSuccess={onAuthSuccess}
                onSwitchToLogin={() => setIsLogin(true)}
              />
            )}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Track Applications</h3>
            <p className="text-blue-100 text-sm">Organize all your job applications in one place</p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Drag & Drop</h3>
            <p className="text-blue-100 text-sm">Move applications between status columns easily</p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">File Upload</h3>
            <p className="text-blue-100 text-sm">Store resumes and job descriptions securely</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
