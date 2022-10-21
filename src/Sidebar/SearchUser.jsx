import React, { useEffect, useState } from "react";
import axios from "axios";
import UserModal from "../Component/Modal/UserModal";
import AlertModal from "../Component/Modal/alertModal";
const SearchUser = ({ userId, setActive, setChatRoomId }) => {
  const [search, setSearch] = useState("");
  const [searchUserInfo, setSearchUserInfo] = useState("");
  const [searchModal, setSearchModal] = useState("False");
  const [onOffAlert, setOnOffAlert] = useState("False");
  // 유저를 찾는다.
  const searchSubmit = async (e, search) => {
    e.preventDefault();
    const searchUser = await axios({
      url: "http://52.79.215.19:8031/searchUser",
      method: "POST",
      data: {
        search,
      },
    });
    if (searchUser.data.length === 0) {
      // 유저가 없다면 경고창을 띄운다.
      setOnOffAlert("True");
      setSearch("");
    } else {
      // 유저 데이터를 userInfo에 담고 모달창을 띄운다.
      setSearchUserInfo(searchUser.data);
      setSearchModal("True");
      setSearch("");
    }
  };
  return (
    <form onSubmit={(e) => searchSubmit(e, search)}>
      <div className="relative">
        <label>
          <input
            className="w-full py-2 pl-10 pr-6 text-gray-200 transition duration-300 ease-in bg-gray-800 border border-gray-800 rounded-full focus:border-gray-700 focus:bg-gray-900 focus:outline-none focus:shadow-md"
            type="email"
            value={search}
            placeholder="Search Messenger"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <span className="absolute top-0 left-0 inline-block mt-2 ml-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path fill="#bbb" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </span>
        </label>
      </div>
      {searchModal === "True" ? (
        <UserModal searchUserInfo={searchUserInfo} setSearchModal={setSearchModal} userId={userId} setActive={setActive} setChatRoomId={setChatRoomId} />
      ) : null}
      {onOffAlert === "True" ? <AlertModal onOff={setOnOffAlert} content={"해당이메일의 유저가 존재하지 않습니다."} /> : null}
    </form>
  );
};

export default SearchUser;
