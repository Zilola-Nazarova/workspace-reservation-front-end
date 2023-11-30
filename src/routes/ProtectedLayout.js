import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => (
  <>
    <p>This is protected layout</p>
    <Outlet />
  </>
);

export default ProtectedLayout;
