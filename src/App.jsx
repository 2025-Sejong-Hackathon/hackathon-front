import { Routes, Route } from 'react-router-dom';
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
import NewsList from './pages/News/NewsList.jsx';
import NewsDetail from './pages/News/NewsDetail.jsx';
import GroupBuyList from './pages/GroupBuy/GroupBuyList.jsx';
import GroupBuyDetail from './pages/GroupBuy/GroupBuyDetail.jsx';
import GroupBuyCreate from './pages/GroupBuy/GroupBuyCreate.jsx';
import GroupBuyChatList from './pages/GroupBuy/GroupBuyChatList.jsx';
import Mypage from './pages/Mypage/Mypage.jsx';
import RoommateEvaluation from './pages/Mypage/RoommateEvaluation.jsx';

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/news' element={<NewsList />} />
            <Route path='/news/:id' element={<NewsDetail />} />
            <Route path='/laundry' element={<Placeholder title='세탁' />} />
            <Route path='/group-buy' element={<GroupBuyList />} />
            <Route path='/group-buy/create' element={<GroupBuyCreate />} />
            <Route path='/group-buy/chats' element={<GroupBuyChatList />} />
            <Route path='/group-buy/:id' element={<GroupBuyDetail />} />
            <Route path='/mypage' element={<Mypage />} />
            <Route
              path='/mypage/roommate-evaluation'
              element={<RoommateEvaluation />}
            />
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
