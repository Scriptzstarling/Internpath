import React, { useState, useEffect } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import { getApplications, updateApplicationStatus, subscribeToApplications } from '../services/supabase'
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

interface DashboardProps {
  applications: Application[]
  onApplicationsUpdate: (applications: Application[]) => void
}

const Dashboard: React.FC<DashboardProps> = ({ applications, onApplicationsUpdate }) => {
  const [loading, setLoading] = useState(true)

  const columns = [
    { title: 'Applied', status: 'Applied' },
    { title: 'Interview', status: 'Interview' },
    { title: 'Rejected', status: 'Rejected' },
    { title: 'Offer', status: 'Offer' }
  ]

  useEffect(() => {
    loadApplications()
    
    // Subscribe to real-time updates
    const subscription = subscribeToApplications((payload) => {
      console.log('Real-time update:', payload)
      loadApplications()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadApplications = async () => {
    try {
      const data = await getApplications()
      onApplicationsUpdate(data)
    } catch (error) {
      console.error('Error loading applications:', error)
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    try {
      await updateApplicationStatus(draggableId, destination.droppableId)
      
      // Update local state
      const updatedApplications = applications.map(app =>
        app.id === draggableId
          ? { ...app, status: destination.droppableId }
          : app
      )
      onApplicationsUpdate(updatedApplications)
      
      toast.success('Application status updated successfully!')
    } catch (error) {
      console.error('Error updating application status:', error)
      toast.error('Failed to update application status')
    }
  }

  const handleDeleteApplication = (id: string) => {
    const updatedApplications = applications.filter(app => app.id !== id)
    onApplicationsUpdate(updatedApplications)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Your Applications</h1>
        <p className="text-blue-100">
          Track your job applications across different stages
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {columns.map(column => (
            <Column
              key={column.status}
              title={column.title}
              status={column.status}
              applications={applications.filter(app => app.status === column.status)}
              onDeleteApplication={handleDeleteApplication}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default Dashboard