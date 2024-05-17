
import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import User from './pages/User';


function App() {
  return (
    <main>
      <div className="container">
        <Routes>
          <Route exact path='/' element={<Search />} />
          <Route exact path="/user/:username" element={<User />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
