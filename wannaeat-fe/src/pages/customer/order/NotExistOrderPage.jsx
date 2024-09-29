import { useLocation } from 'react-router-dom';

const NotExistOrderPage = () => {
  const location = useLocation();
  console.log(location.state.message);
  return <div>{location.state.message}</div>;
};

export default NotExistOrderPage;
