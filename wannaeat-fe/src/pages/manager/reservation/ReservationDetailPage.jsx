import { useParams } from 'react-router-dom';

const ReservationDetailPage = () => {
  const { id } = useParams(); // URL에서 reservationId 가져오기

  return (
    <div>
      <h2>Reservation Details</h2>
      <p>Reservation ID: {id}</p> {/* 가져온 reservationId 표시 */}
      {/* 예약 관련 상세 정보 표시 */}
    </div>
  );
};

export default ReservationDetailPage;
