import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Building, Calendar, FileText, Link, Trash2 } from 'lucide-react'
import { deleteApplication } from '../services/supabase'
import { toast } from 'react-toastify'

interface Application {
  id: string
  company: string
  role: string
  platform: string
  applied_date: string
  follow_up_date?: string
  notes?: string
  resume_url?: string
  jd_url?: string
  status: string
  created_at: string
}

interface ApplicationCardProps {
  application: Application
  index: number
  onDelete: (id: string) => void
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, index, onDelete }) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await deleteApplication(application.id)
      onDelete(application.id)
      toast.success('Application deleted successfully')
    } catch (error) {
      toast.error('Failed to delete application')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Draggable draggableId={application.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
            snapshot.isDragging ? 'rotate-2 shadow-2xl' : ''
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-gray-800 truncate">{application.company}</h3>
            </div>
            <button
              onClick={handleDelete}
              className="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-2 font-medium">{application.role}</p>
          
          <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
            <Calendar className="h-3 w-3" />
            <span>Applied: {formatDate(application.applied_date)}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {application.platform}
            </span>
          </div>

          {application.notes && (
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{application.notes}</p>
          )}

          <div className="flex space-x-2">
            {application.resume_url && (
              <a
                href={application.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FileText className="h-3 w-3" />
                <span>Resume</span>
              </a>
            )}
            {application.jd_url && (
              <a
                href={application.jd_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Link className="h-3 w-3" />
                <span>Job Description</span>
              </a>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default ApplicationCard