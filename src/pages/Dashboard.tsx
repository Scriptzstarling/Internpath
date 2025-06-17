import React from 'react'
import Dashboard from '../components/Dashboard'

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

interface DashboardPageProps {
  applications: Application[]
  onApplicationsUpdate: (applications: Application[]) => void
}

const DashboardPage: React.FC<DashboardPageProps> = ({ applications, onApplicationsUpdate }) => {
  return (
    <Dashboard 
      applications={applications}
      onApplicationsUpdate={onApplicationsUpdate}
    />
  )
}

export default DashboardPage