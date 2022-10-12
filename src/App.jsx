import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main/Main';
import Home from './pages/Home/Home';
import Cadastrar from './pages/Cadastrar/Cadastrar';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import Listas from './pages/Listas/Listas';
import './App.css';
import Lista from './pages/Lista/Lista';

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>

          <Route exact path='/' element={<Home/>} />
          <Route path='/cadastrar' element={<Cadastrar/>}/>

          <Route element={<ProtectRoute />}>
            <Route path='/listas' element={<Listas/>} />
            <Route path='/lista/:id' element={<Lista />} />
          </Route>
          

        </Routes>
      </Main>
    </BrowserRouter>
  );
}

export default App;
