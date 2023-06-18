import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/login/login';
import Header from './components/header/header';
import Register from './components/register/register';
import Home from './components/home/home';
import Category from './components/category/category';
import TopicAdd from './components/category/topic.add';
import Topic from './components/topic/topic';

function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/topic/:tid' element={<Topic/>} />
        <Route path='/topic/add/:cid' element={<TopicAdd/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/category/:cid' element={<Category/>} />
        <Route path='*' element={'Error'} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
