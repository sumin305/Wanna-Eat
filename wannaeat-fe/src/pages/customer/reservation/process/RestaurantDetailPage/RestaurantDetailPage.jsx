import { useParams } from 'react-router-dom';

const RestaurantDetailPage = () => {
  const params = useParams();

  return <div> {params.id}번 가게 상세페이지</div>;
};

export default RestaurantDetailPage;
