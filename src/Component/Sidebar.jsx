import { useState } from "react";
import SideHeader from "../Sidebar/Header.jsx";
import SearchUser from "../Sidebar/SearchUser.jsx";
import ChatList from "../Sidebar/ChatList";
import Users from "../Sidebar/Users.jsx";

const Sidebar = ({ listMsg, setChatRoomId, userId, chatRoomId }) => {
 const [active, setActive] = useState("False");
 return (
  <section className="flex flex-col flex-none w-24 overflow-auto transition-all duration-300 ease-in-out hover:w-64 group lg:max-w-sm md:w-2/5">
   <div className="flex flex-row items-center justify-between flex-none p-4 shadow">{<SideHeader />}</div>
   <div className="flex-none p-4 search-box">{<SearchUser userId={userId} setActive={setActive} setChatRoomId={setChatRoomId} />}</div>
   <div className="flex flex-row w-0 min-w-full p-2 overflow-auto active-users">
    {<Users userId={userId} active={active} setActive={setActive} setChatRoomId={setChatRoomId} />}
   </div>
   <div className="flex-1 p-2 overflow-y-scroll contacts">{<ChatList listMsg={listMsg} setChatRoomId={setChatRoomId} chatRoomId={chatRoomId} />}</div>
  </section>
 );
};

export default Sidebar;
