import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import { useNavigate } from "react-router-dom";
import Chat from "../Component/Chat.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import base64 from "base-64";
import "./Messenger.css";
import SockJS from "sockjs-client";

const Messenger = () => {
  const navigate = useNavigate();
  // 채팅 화면에 사용됨
  const [chatMsg, setchatMsg] = useState([]);
  // 사이드바 채팅방 메세지 미리보기에 사용됨
  const [listMsg, setListMsg] = useState([]);
  // 입력된 대화 내용
  const [content, setContent] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");
  // 로그인 되어 있는지 체크한다.
  const isLogined = async (e) => {
    if (localStorage.getItem("Token") === null) {
      navigate("/");
      return;
    }
  };
  // 웹소캣 연결
  const socket = new SockJS("http://52.79.215.19:8031/chat/chatting");
  const client = Stomp.over(socket);
  const tmp = localStorage.getItem("Token");
  let payload = tmp.substring(tmp.indexOf(".") + 1, tmp.lastIndexOf("."));
  let dec = JSON.parse(base64.decode(payload));
  const userId = dec.id;

  useEffect(() => {
    setContent("");

    client.connect({}, () => {
      // === 1. 채팅방 셋팅 (send를 통해 웹소캣 연결) ===
      client.send(`/app/chatRoomSetting/'${userId}'`, {});
      // 1-1. 1연결로 얻은 값
      client.subscribe(`/queue/chatRoomSetting/'${userId}'`, function (Message) {
        const newMsg = JSON.parse(Message.body);
        setListMsg(newMsg);
      });
      // 1-2. 채팅방 최신 메시지를 받으면 미리보기로 출력함
      client.subscribe(`/queue/chatList/'${userId}'`, function (Message) {
        const newMsg = JSON.parse(Message.body);
        // 이전 메시지(prev) 를 가져와 새로 도착한 메시지만 출력해서 저장함.
        setListMsg(
          listMsg.map((_msg) =>
            _msg.talkSetting.talkroom_id === newMsg.talkroom_id ? { ..._msg, talkSetting: { content: newMsg.content, talkregdate: newMsg.regdate } } : _msg
          )
        );
      });

      // === 2. 대화내용 셋팅 (send는 사이드바 채팅방을 누르면 실행됨.) ===
      client.send(`/app/first/${chatRoomId}`, {});

      client.subscribe(`/queue/firstChat/${chatRoomId}`, function (Message) {
        const newMsg = JSON.parse(Message.body);
        setchatMsg(newMsg);
      });

      client.subscribe(`/queue/addChatToClient/${chatRoomId}`, function (Message) {
        const newMsg = JSON.parse(Message.body);
        setchatMsg((prev) => [...prev, newMsg]);
      });
    });

    // 연결을 끊는다 (소캣을 지운다.)

    return async () => {
      await client.disconnect();
    };
    // 채팅방이 생성되면 새로 연결이 필요함. ([]에 내용추가)
  }, [chatRoomId]);

  return (
    <div className="flex w-full h-screen overflow-hidden antialiased text-gray-200 bg-gray-900" onLoad={isLogined}>
      <div className="flex flex-col flex-1">
        <main className="flex flex-row flex-grow min-h-0">
          <Sidebar listMsg={listMsg} setChatRoomId={setChatRoomId} userId={userId} chatRoomId={chatRoomId} />
          <Chat chatMsg={chatMsg} setchatMsg={setchatMsg} client={client} content={content} setContent={setContent} chatRoomId={chatRoomId} userId={userId} />
        </main>
      </div>
    </div>
  );
};

export default Messenger;
