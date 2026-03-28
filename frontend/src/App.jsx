import AppRoutes from './routes'
import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppRoutes />
      <Toaster position="bottom-right" />
    </div>
  )
}

export default App;

