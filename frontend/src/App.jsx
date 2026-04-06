import AppRoutes from './routes'
import { SearchProvider } from './context/SearchContext';
import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
        <Toaster position="bottom-right" />
      </div>
    </SearchProvider>
  )
}

export default App;

