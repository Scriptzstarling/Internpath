import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import ApplicationCard from './ApplicationCard'

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

interface ColumnProps {
  title: string
  status: string
  applications: Application[]
  onDeleteApplication: (id: string) => void
}

const Column: React.FC<ColumnProps> = ({ title, status, applications, onDeleteApplication }) => {
  const getColumnColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'from-blue-500 to-blue-600'
      case 'Interview':
        return 'from-yellow-500 to-orange-500'
      case 'Rejected':
        return 'from-red-500 to-red-600'
      case 'Offer':
        return 'from-green-500 to-green-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-h-[600px] border border-white/20">
      <div className={`bg-gradient-to-r ${getColumnColor(status)} text-white rounded-lg p-3 mb-4`}>
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm opacity-90">{applications.length} applications</p>
      </div>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[400px] rounded-lg transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-white/5' : ''
            }`}
          >
            {applications.map((application, index) => (
              <ApplicationCard
                key={application.id}
                application={application}
                index={index}
                onDelete={onDeleteApplication}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column