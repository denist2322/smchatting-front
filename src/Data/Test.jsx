import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useState, useEffect } from "react";
// import Modal from "../Component/Modal/UserModal.jsx";
import Modal from "../Component/Modal/alertModal.jsx";

const Test = () => {
 const socket = new SockJS("http:/localhost:8031/chat/chatting");
 const client = Stomp.over(socket);
 const [msg, setMsg] = useState("");
 const [content, setContent] = useState("");
 const [auserModal, setAuserModal] = useState("False");

 const handleSubmit = (e, content) => {
  e.preventDefault();
  client.send(`/app/chat/'1'과'3'`, {}, JSON.stringify({ content, userId: "3" }));
  setContent("");
 };

 useEffect(() => {
  client.connect({}, () => {
   // 연결시 jwt를 보냄
   // client.send("/app/join", {} ,JSON.stringify(localStorage.getItem("Token")))

   // (초기 셋팅)처음 들어오면 DB에 있는 메시지를 추출함
   client.send(`/app/first/'1'과'3'`, {}, JSON.stringify("success"));

   client.subscribe("/queue/firstChat/'1'과'3'", function (Message) {
    const newMsg = JSON.parse(Message.body).map((a) => a.content);
    setMsg(newMsg);
   });

   client.subscribe("/queue/chatList/'3'", function (Message) {
    const newMsg = JSON.parse(Message.body).content;
    setMsg(newMsg);
   });
  });
 }, []);

 return (
  <>
   <div>
    <div>채팅</div>
    <form onSubmit={(e) => handleSubmit(e, content)}>
     <div>
      <input
       type="text"
       placeholder="내용을 입력하세요."
       value={content}
       onChange={(e) => {
        setContent(e.target.value);
       }}
      />
     </div>
     <button type="submit">제출</button>
     <div>내용</div>
     <div>
      <ul>{msg}</ul>
     </div>
    </form>
   </div>
   {auserModal == "True" ? <Modal setAuserModal={setAuserModal} /> : null}
   <button
    type="button"
    onClick={() => {
     auserModal == "False" ? setAuserModal("True") : setAuserModal("False");
    }}
    className="text-xl"
   >
    모달
   </button>
  </>
 );
};

export default Test;
