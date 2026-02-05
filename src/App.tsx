import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { BoardPage } from './pages/Board/Board';
import { Home } from './pages/Home/Home';

function App() {
  



  // useEffect(() => {
  //   const newContacts = boards.filter(board =>
  //   board.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase()),
  //   );

  //   setFilteredBoards(newContacts);
  // }, [searchTerm])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/board/:id' element={<BoardPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
