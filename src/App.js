import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/login/login';
import Header from './components/header/header';
import Register from './components/register/register';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={'Error'} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
