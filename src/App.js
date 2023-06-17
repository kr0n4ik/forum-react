import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/login/login';
import Header from './components/header/header';
import Register from './components/register/register';
import Home from './components/home/home';
import Category from './components/category/category';

function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/category/:cid' element={<Category/>} />
        <Route path='*' element={'Error'} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
