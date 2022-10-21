const ChatList = ({ listMsg, setChatRoomId, chatRoomId }) => {
 const changeChatRoomId = (id) => {
  if (id !== chatRoomId && id !== undefined) {
   setChatRoomId(id);
  }
  return;
 };
 return (
  <>
   {listMsg.map((_msg, index) => (
    <div
     key={index}
     className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800"
     onClick={() => {
      changeChatRoomId(_msg.talkSetting.talkroom_id);
     }}
    >
     <div className="flex flex-shrink-0 w-16 h-16">
      <img
       className="object-cover w-full h-full rounded-full shadow-md"
       src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIFyGQ%2FbtrM8OsCYqS%2FkyJR43ymFXBqMiLEpTDb20%2Fimg.png"
       alt=""
      />
     </div>
     <div className="flex-auto hidden min-w-0 ml-4 mr-6 md:block group-hover:block">
      <p>{_msg.userInfo.username}</p>
      <div className="flex items-center text-sm text-gray-600">
       <div className="min-w-0">
        <p className="truncate">{_msg.talkSetting.content === null ? (_msg.talkSetting.files !== null ? "이미지" : null) : _msg.talkSetting.content}</p>
       </div>
      </div>
     </div>
    </div>
   ))}
  </>
 );
};

export default ChatList;
