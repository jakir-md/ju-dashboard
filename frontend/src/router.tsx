import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { AnnouncementsPage } from './pages/AnnouncementsPage'
import { CampusPage } from './pages/CampusPage'
import { DormitoriesPage } from './pages/DormitoriesPage'
import { DirectoryPage } from './pages/DirectoryPage'
import { ExtracurricularPage } from './pages/ExtracurricularPage'
import { HelpPage } from './pages/HelpPage'
import { OverviewPage } from './pages/OverviewPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { SchedulePage } from './pages/SchedulePage'
import { UniversityActivitiesPage } from './pages/UniversityActivitiesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'schedule', element: <SchedulePage /> },
      { path: 'campus', element: <CampusPage /> },
      { path: 'dormitories', element: <DormitoriesPage /> },
      { path: 'extracurricular', element: <ExtracurricularPage /> },
      { path: 'university-activities', element: <UniversityActivitiesPage /> },
      { path: 'directory', element: <DirectoryPage /> },
      { path: 'announcements', element: <AnnouncementsPage /> },
      { path: 'help', element: <HelpPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
