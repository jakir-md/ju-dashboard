import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { HelpPage } from './pages/HelpPage'
import { OverviewPage } from './pages/OverviewPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { SchedulePage } from './pages/SchedulePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'schedule', element: <SchedulePage /> },
      { path: 'help', element: <HelpPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
