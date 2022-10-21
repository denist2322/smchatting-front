const alertModal = () => {
 return (
  <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen text-center bg-black bg-opacity-70">
   <div className="w-10/12 bg-white rounded md:w-1/3">
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
     <div className="bg-white px-16 py-14 rounded-md text-center">
      <h1 className="text-xl mb-4 font-bold text-slate-500">대화내용을 삭제하시겠습니까?</h1>
      <button className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white">확인</button>
      <button className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white">취소</button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default alertModal;
