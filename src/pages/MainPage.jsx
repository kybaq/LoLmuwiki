import { useNavigate } from 'react-router-dom';

const Mainpage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/mypage');
  };

  return (
    <div>
      <button onClick={handleButtonClick}>마이페이지</button>
    </div>
  );
};

export default Mainpage;
