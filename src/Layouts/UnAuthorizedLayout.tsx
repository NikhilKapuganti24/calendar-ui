import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UnauthenticatedLayout = () => {
  return (
    <div >
     
      <Outlet />
    </div>
  );
};

export default UnauthenticatedLayout;

