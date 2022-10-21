const Main = ({ chatMsg, userId }) => {
  return (
    <>
      {chatMsg.map((_msg, index) =>
        _msg.senduserid === 0 ? null : _msg.senduserid === userId ? (
          <div key={index} className="flex flex-row justify-end mt-1">
            <div className="messages text-sm text-white grid grid-flow-row gap-2">
              <div className="flex items-center flex-row-reverse group">
                {_msg.content !== null ? (
                  <p className="px-4 py-2 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md"> {_msg.content} </p>
                ) : (
                  <img src={`http://52.79.215.19:8031/upload_file/${_msg.files}`} alt="이미지를 불러올 수 없습니다." className="w-60 h-60" />
                )}

                <button
                  type="button"
                  className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                >
                  <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path
                      d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
                    />
                    삭제
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} className="flex flex-row justify-start mt-1">
            <div className="w-8 h-8 flex flex-shrink-0 mr-4">
              <img
                className="shadow-md rounded-full w-full h-full object-cover"
                src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIFyGQ%2FbtrM8OsCYqS%2FkyJR43ymFXBqMiLEpTDb20%2Fimg.png"
                alt=""
              />
            </div>
            <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
              <div className="flex items-center group">
                {_msg.content !== null ? (
                  <p className="px-4 py-2 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">{_msg.content} </p>
                ) : (
                  <img src={`http://52.79.215.19:8031/upload_file/${_msg.files}`} alt="이미지를 불러올 수 없습니다." className="w-60 h-60" />
                )}

                <button
                  type="button"
                  className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                >
                  <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path
                      d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Main;
