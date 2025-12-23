import { Route, Routes } from 'react-router-dom';
import BasicInfo from './BasicInfo/BasicInfo';

export default function SignUp() {
  return (
    <>
      <Routes>
        <Route path='/basic-info' element={<BasicInfo />} />
      </Routes>
    </>
  );
}
