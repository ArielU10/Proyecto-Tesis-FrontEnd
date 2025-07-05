import { Route } from 'react-router-dom'
import GuardLayout from '../../components/guard/GuardLayout'
import Home from './pages/Home'
import QRScan from './pages/qrScan'
import StudentDetails from './pages/studentDetails'
import ProtectedRoute from '../../components/ProtectedRoute'
import { NavigationProvider } from '../../context/NavigationContext'

const GuardRoutes = [
  <Route
    key="layout"
    path="/guard"
    element={
      <ProtectedRoute allowedRoles={['guard']}>
        <NavigationProvider>
          <GuardLayout />
        </NavigationProvider>
      </ProtectedRoute>
    }
  >
    <Route index element={<Home />} />
    <Route path="qrScan" element={<QRScan />} />
    <Route path="student/:token" element={<StudentDetails />} />
  </Route>
]

export default GuardRoutes
