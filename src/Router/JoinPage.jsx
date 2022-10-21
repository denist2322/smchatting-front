import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const JoinPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const [errorJoin, setErrorJoin] = useState("");
  const navigate = useNavigate();
  let errorMsg = null;

  // 비밀번호 보이기 숨기기
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  // 비밀번호 보이기 숨기기 (visible에 따라 타입을 정해준다.)
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  // 회원가입 버튼을 누르면 실행됨
  const onSubmit = async (e) => {
    let joinData = "";
    e.preventDefault();

    // 공백상태일 경우 프론트에서 차단하여 통신을 하지 못하도록 함.
    if (userEmail !== "" && userName !== "" && userPassword !== "" && passwordComfirm !== "")
      joinData = await axios({
        url: `http://52.79.215.19:8031/join`,
        method: "POST",
        data: {
          userEmail,
          userName,
          userPassword,
          passwordComfirm,
        },
      });

    // 각 input이 공백 일 경우 혹은 비밀번호와 비밀번호 확인이 일치하지 않을 경우 에러를 셋팅
    if (userEmail === "") {
      setErrorJoin("noEmail");
      return;
    } else if (userName === "") {
      setErrorJoin("noName");
      return;
    } else if (userPassword === "" || passwordComfirm === "") {
      setErrorJoin("noPassword");
      return;
    } else if (userPassword !== passwordComfirm) {
      setErrorJoin("notMatch");
      return;
    }
    // 성공적으로 회원가입이 된 경우 success를 받고 if문에 들어간다.
    if (joinData.data === "success") {
      navigate("/");
    } else {
      setErrorJoin(joinData.data);
    }
  };

  if (errorJoin === "noEmail") {
    errorMsg = <span className="text-xs text-red-400">이메일을 입력해주세요.</span>;
  } else if (errorJoin === "existEmail") {
    errorMsg = <span className="text-xs text-red-400">이메일이 이미 존재합니다.</span>;
  } else if (errorJoin === "noName") {
    errorMsg = <span className="text-xs text-red-400">이름을 입력해주세요.</span>;
  } else if (errorJoin === "noPassword") {
    errorMsg = <span className="text-xs text-red-400">비밀번호를 입력해주세요.</span>;
  } else if (errorJoin === "notMatch") {
    errorMsg = <span className="text-xs text-red-400">비밀번호가 일치하지 않습니다.</span>;
  }

  // 너비를 고정하기 위해서 사용
  const width = {
    width: "480px",
  };

  // 아이콘 크기를 변경하기 위해 사용
  const fontSize = {
    fontSize: "14px",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3" style={width}>
        <div className="flex justify-center">
          <img
            className="w-30 h-20"
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbvlK8S%2FbtrLQog5d4O%2FZrKWnmHMkH50xmLXJ0J0sk%2Fimg.png"
            alt=""
          />
        </div>
        <h3 className="text-2xl font-bold text-center">Join us</h3>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                이메일
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="name">
                이름
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <div className="flex">
                <label className="block">비밀번호</label>
                <span className="ml-2" onClick={handlePasswordType}>
                  {passwordType.visible ? <FontAwesomeIcon icon={faEye} style={fontSize} /> : <FontAwesomeIcon icon={faEyeSlash} style={fontSize} />}
                </span>
              </div>
              <input
                type={passwordType.type}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block">비밀번호 확인</label>
              <input
                type={passwordType.type}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  setPasswordComfirm(e.target.value);
                }}
              />
            </div>
            {errorMsg}
            <div className="mt-4">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                type="submit"
              >
                회원가입
              </button>
            </div>
            <div className="flex justify-center mt-6 text-grey-dark">
              이미 계정이 있으신가요?
              <Link to="/" className="text-blue-600 hover:underline ml-4">
                로그인
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
