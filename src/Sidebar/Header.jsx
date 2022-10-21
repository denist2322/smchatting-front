import { useNavigate } from "react-router-dom";

const Header = () => {
 const navigate = useNavigate();
 const ImgSize = {
  width: "80px",
  height: "64px",
 };

 const Logout = (e) => {
  e.preventDefault();
  localStorage.removeItem("Token");
  navigate("/");
 };

 return (
  <>
   <div className="relative flex flex-shrink-0" style={ImgSize}>
    <img
     alt=""
     src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbvlK8S%2FbtrLQog5d4O%2FZrKWnmHMkH50xmLXJ0J0sk%2Fimg.png"
    />
   </div>
   <p className="text-xl font-bold hidden md:block group-hover:block mr-1">SMhopeTalk</p>
   <button onClick={Logout} className="text-white">
    로그아웃
   </button>
  </>
 );
};

export default Header;
