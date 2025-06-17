import React, { useState } from 'react'
import { X, Upload, FileText, Link } from 'lucide-react'
import { addApplication, uploadFile } from '../services/supabase'
import { toast } from 'react-toastify'

interface AddApplicationFormProps {
  onClose: () => void
  onApplicationAdded: (application: any) => void
}

const AddApplicationForm: React.FC<AddApplicationFormProps> = ({ onClose, onApplicationAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    platform: '',
    applied_date: new Date().toISOString().split('T')[0],
    follow_up_date: '',
    notes: '',
    status: 'Applied'
  })
  
  const [files, setFiles] = useState<{
    resume: File | null
    jd: File | null
  }>({
    resume: null,
    jd: null
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'jd') => {
    const file = e.target.files?.[0]
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let resumeUrl = ''
      let jdUrl = ''

      // Upload resume if provided
      if (files.resume) {
        const resumePath = `${Date.now()}-${files.resume.name}`
        resumeUrl = await uploadFile(files.resume, 'resumes', resumePath)
      }

      // Upload job description if provided
      if (files.jd) {
        const jdPath = `${Date.now()}-${files.jd.name}`
        jdUrl = await uploadFile(files.jd, 'jds', jdPath)
      }

      const applicationData = {
        ...formData,
        resume_url: resumeUrl,
        jd_url: jdUrl
      }

      const newApplication = await addApplication(applicationData)
      onApplicationAdded(newApplication)
      toast.success('Application added successfully!')
      onClose()
    } catch (error) {
      console.error('Error adding application:', error)
      toast.error('Failed to add application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-lg rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Application</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter job role"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform *
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select platform</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Indeed">Indeed</option>
                <option value="Company Website">Company Website</option>
                <option value="Glassdoor">Glassdoor</option>
                <option value="AngelList">AngelList</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Applied Date *
              </label>
              <input
                type="date"
                name="applied_date"
                value={formData.applied_date}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow-up Date
              </label>
              <input
                type="date"
                name="follow_up_date"
                value={formData.follow_up_date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any additional notes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume
              </label>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg cursor-pointer transition-colors">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-700">Choose File</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'resume')}
                    className="hidden"
                  />
                </label>
                {files.resume && (
                  <span className="text-sm text-gray-600">{files.resume.name}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 border border-green-300 rounded-lg cursor-pointer transition-colors">
                  <Link className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Choose File</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => handleFileChange(e, 'jd')}
                    className="hidden"
                  />
                </label>
                {files.jd && (
                  <span className="text-sm text-gray-600">{files.jd.name}</span>
                )}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddApplicationForm