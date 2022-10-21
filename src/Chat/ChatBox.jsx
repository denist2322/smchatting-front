import { useRef, useEffect } from "react";
import Main from "./Main";

const ChatBox = ({ chatMsg, userId }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    // scrollRef의 element위치로 스크롤 이동 behavior는 전환 에니메이션의 정의
  }, [chatMsg]);

  return (
    <>
      {<Main chatMsg={chatMsg} userId={userId} />}
      <div ref={scrollRef} />
    </>
  );
};

export default ChatBox;
