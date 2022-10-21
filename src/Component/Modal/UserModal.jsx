import axios from "axios";
import { useEffect, useState } from "react";

const UserModal = ({ setChatRoomId, setUserModal, friend, userId, setActive, searchUserInfo, setSearchModal }) => {
  const [friendConfirm, setFriendConfirm] = useState("");
  // 상대의 아이디를 가져온다. (friend : 친구 목록에서 받아온 정보,  SearchInfo : 검색으로 받아온 정보)
  const otherOne = friend != null ? friend.user.id : searchUserInfo.id;

  useEffect(() => {
    // 친구인지 아닌지 확인한다.
    const ifFriend = async () => {
      const ifFriendData = await axios({
        url: `http://localhost:8031/isFriend`,
        method: "POST",
        data: {
          otherOne,
          myid: userId,
        },
      });
      // 친구여부의 결과를 저장
      setFriendConfirm(ifFriendData.data);
    };
    ifFriend();
  }, []);

  // 모달창을 닫을 때 사용한다.
  const closeModal = () => {
    setUserModal != null ? setUserModal("False") : setSearchModal("False");
  };
  // 친구를 삭제할 때 사용한다.
  const deleteFriend = async (e) => {
    e.preventDefault();
    const delData = await axios({
      url: `http://localhost:8031/delFriend`,
      method: "POST",
      data: {
        otherOne,
        myid: userId,
      },
    });
    // 성공적으로 작동하면 삭제한 친구를 빼고 화면을 다시 그려줘야한다.
    if (delData.data === "success") {
      setActive("True");
      closeModal();
    }
  };

  // 친구를 추가할 때 사용한다.
  const addFriend = async (e) => {
    e.preventDefault();
    const addFriendData = await axios({
      url: `http://localhost:8031/addFriend`,
      method: "POST",
      data: {
        otherOne,
        myid: userId,
      },
    });
    // 성공적으로 작동하면 추가한 친구를 화면에 다시 그려줘야한다.
    if (addFriendData.data === "success") {
      setActive("True");
      closeModal();
    }
  };

  // 대화방 생성
  const talkking = async (e) => {
    e.preventDefault();
    const addTalkroom = await axios({
      url: `http://localhost:8031/addTalkroom`,
      method: "POST",
      data: {
        otherOne,
        myid: userId,
      },
    });
    if (addTalkroom.data != null) {
      closeModal();
      setChatRoomId(addTalkroom.data);
    }
  };

  // ======
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen text-center bg-black bg-opacity-70">
      <div className="w-10/12 bg-white rounded md:w-1/3">
        <div className="flex flex-col p-6 bg-gray-800 border-b">
          <span className="flex justify-start -mt-5 text-2xl cursor-pointer" onClick={closeModal}>
            x
          </span>
          <div className="flex flex-shrink-0 w-32 h-32 mx-auto">
            <img
              className="object-cover w-full h-full rounded-full shadow-md"
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIFyGQ%2FbtrM8OsCYqS%2FkyJR43ymFXBqMiLEpTDb20%2Fimg.png"
              alt=""
            />
          </div>
          <p className="pt-2 mt-3 text-xl font-semibold text-gray-50">{friend != null ? friend.user.username : searchUserInfo.username}</p>
          <p className="mt-1 text-base text-gray-100">{friend != null ? friend.user.useremail : searchUserInfo.useremail}</p>
        </div>

        <div className="flex justify-between">
          <div
            className="p-5 text-base text-black cursor-pointer mx"
            onClick={(e) => {
              talkking(e);
            }}
          >
            1:1 채팅
          </div>
          <div
            className="p-5 text-base text-black cursor-pointer"
            onClick={(e) => {
              friendConfirm === "True" ? deleteFriend(e) : addFriend(e);
            }}
          >
            {friendConfirm === "True" ? "친구 삭제" : "친구 추가"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
