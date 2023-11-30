import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { ... } from '../redux/.../...Slice';
import { getGreetings } from '../redux/greetings/greetingsSlice';

import ErrorPage from './ErrorPage';
import Home from './Home';
import Layout from './Layout';
import Page1 from '../components/Page1';
import Page2 from '../components/Page2';
import Page3 from '../components/Page3';
import Greeting from '../components/Greeting';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGreetings());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="greeting" element={<Greeting />} />
        <Route path="page3" element={<Page3 />} />
        <Route path="page2" element={<Page2 />} />
        <Route path="page1" element={<Page1 />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Root;
