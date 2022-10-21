import { useEffect, useState } from "react";
import axios from "axios";
const Header = ({ chatRoomId, userId }) => {
  const [otherOneName, setOtherOneName] = useState("");

  useEffect(() => {
    const getOtherOneName = async () => {
      const otherOne = await axios({
        url: `http://52.79.215.19:8031/otherOneName`,
        method: "POST",
        data: {
          myId: userId,
          chatRoomId,
        },
      });
      setOtherOneName(otherOne.data);
    };
    getOtherOneName();
  }, [chatRoomId]);

  return (
    <>
      <div className="flex">
        <div className="w-12 h-12 mr-4 flex flex-shrink-0">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIFyGQ%2FbtrM8OsCYqS%2FkyJR43ymFXBqMiLEpTDb20%2Fimg.png"
            alt=""
          />
        </div>
        <div className="text-sm">
          <p className="flex font-bold text-base py-3">{otherOneName}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
