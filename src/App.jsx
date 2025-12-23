import { useNavigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/SignUp/SingUp.jsx';
import BasicInfo from './pages/SignUp/BasicInfo/BasicInfo.jsx';
import LifeStyle from './pages/SignUp/LifeStyle/LifeStyle.jsx';
import GeekBti from './pages/SignUp/GeekBti/GeekBti.jsx';
import GeekBtiResult from './pages/SignUp/GeekBti/GeekBtiResult.jsx';
import FindingLoading from './pages/SignUp/GeekBti/FindingLoading.jsx';
import Recommendation from './pages/SignUp/Recommendation/Recommendation.jsx';
import SignUpLayout from './layouts/SignUpLayout.jsx';

import Placeholder from './pages/Placeholder.jsx';

import MutualPick from './pages/Matching/MutualPick.jsx';

export default function App() {
  const naviate = useNavigate();
  return (
    <>
      <main>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/news' element={<Placeholder title="소식" />} />
            <Route path='/laundry' element={<Placeholder title="세탁" />} />
            <Route path='/group-buy' element={<Placeholder title="공구" />} />
            <Route path='/mypage' element={<Placeholder title="마이페이지" />} />
            <Route path='/matching/mutual' element={<MutualPick />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<SignUpLayout />}>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signup/basic-info' element={<BasicInfo />} />
            <Route path='/signup/lifestyle' element={<LifeStyle />} />
            <Route path='/signup/geek-bti' element={<GeekBti />} />
            <Route path='/signup/geek-bti/result' element={<GeekBtiResult />} />
            <Route path='/signup/finding' element={<FindingLoading />} />
            <Route path='/signup/recommendation' element={<Recommendation />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
