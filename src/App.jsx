import { Routes, Route } from 'react-router-dom'
import Homepage from './components/pages/Homepage'
import FavouritesPage from './components/pages/FavouritesPage'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/favourites' element={<FavouritesPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
