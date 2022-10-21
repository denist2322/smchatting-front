import ChatFooter from "../Chat/Footer";
import ChatHeader from "../Chat/Header.jsx";
import ChatBox from "../Chat/ChatBox.jsx";

const Chat = ({ chatMsg, client, content, setContent, chatRoomId, userId }) => {
  return (
    <>
      {chatRoomId !== "" ? (
        <section className="flex flex-col flex-auto border-l border-gray-800">
          <div className="chat-header px-6 py-6 flex flex-row flex-none justify-between items-center shadow">
            {<ChatHeader chatRoomId={chatRoomId} userId={userId} />}
          </div>
          <div className="chat-body p-4 flex-1 overflow-y-scroll">{<ChatBox chatMsg={chatMsg} userId={userId} />}</div>
          <div className="chat-footer flex-none">
            {<ChatFooter client={client} content={content} setContent={setContent} chatRoomId={chatRoomId} userId={userId} />}
          </div>
        </section>
      ) : (
        <section className="flex flex-auto border-l border-gray-800 justify-center items-center text-3xl">안녕하세요</section>
      )}
    </>
  );
};

export default Chat;
