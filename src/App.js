import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Header from './components/header/header';
import Register from './components/register/register';
import Home from './components/home/home';
import Category from './components/category/category';
import TopicAdd from './components/category/topic.add';
import Topic from './components/topic/topic';
import Profile from './components/profile/profile';
import Logout from './components/logout/logout';
import Footer from './components/footer/footer';

function App() {
    return (
        <div className='body h-100 p-md-3'>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/:uid' element={<Profile />} />
                    <Route path='/topic/:tid' element={<Topic />} />
                    <Route path='/topic/add/:cid' element={<TopicAdd />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/category/:cid' element={<Category />} />
                    <Route path='/logout' element={<Logout/>} />
                    <Route path='*' element={'Error'} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App;
