import { useNavigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import Login from './pages/Login/Login.jsx';

export default function App() {
  const naviate = useNavigate();
  return (
    <>
      <main>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>

        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
