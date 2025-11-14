import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';
import EditUserPage from './pages/EditUserPage';

function App() {


  return (


    <BrowserRouter>
    <Navbar></Navbar>

      <Routes>
        {/* Route Pubblic  */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* route priv juste pour pers enregistrer/admin*/}
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/edit/:id' element={<EditUserPage/>}/>

      </Routes>
    </BrowserRouter>


  )
}

export default App
