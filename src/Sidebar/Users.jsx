import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Component/Modal/UserModal.jsx";
const Users = ({ userId, active, setActive, setChatRoomId }) => {
 // 친구목록을 받을거다.
 const [friend, setFriend] = useState([]);
 const [userModal, setUserModal] = useState("False");
 useEffect(() => {
  setActive("False");
  const userList = async () => {
   const userData = await axios({
    url: `http://localhost:8031/friendList`,
    method: "POST",
    data: {
     myid: userId,
    },
   });
   setFriend(userData.data);
   // user{ id, useremail, username }
  };
  userList();
 }, [active]);

 return (
  <>
   <div className="mr-4 text-sm text-center">
    <button className="flex flex-shrink-0 w-20 h-20 text-gray-600 bg-gray-800 rounded-full focus:outline-none" type="button">
     <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
      <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
     </svg>
    </button>
    <p>Your Story</p>
   </div>
   {friend.map((_friend, index) => (
    <div key={index} className="mr-4 text-sm text-center ">
     <div
      className="p-1 border-4 border-blue-600 rounded-full cursor-pointer"
      onClick={() => {
       setUserModal(_friend.user.id + "True");
      }}
     >
      <div className="flex flex-shrink-0 w-16 h-16">
       <img
        className="object-cover w-full h-full rounded-full shadow-md"
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIFyGQ%2FbtrM8OsCYqS%2FkyJR43ymFXBqMiLEpTDb20%2Fimg.png"
        alt=""
       />
      </div>
     </div>
     <p>{_friend.user.username}</p>
     {userModal === _friend.user.id + "True" ? (
      <Modal setUserModal={setUserModal} friend={_friend} userId={userId} setActive={setActive} setChatRoomId={setChatRoomId} />
     ) : null}
    </div>
   ))}
  </>
 );
};

export default Users;
