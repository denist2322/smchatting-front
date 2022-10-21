import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// MainPage 컴포넌트 시작
const MainPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  let errorLog = null;
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  // 메인화면 이미지를 주기위한 변수
  const mainImage = {
    backgroundImage: "url(https://blog.kakaocdn.net/dn/d7DG5p/btrNcWQpqsn/cilKTwEV4rj6hj0kvzazDk/img.gif)",
  };

  // 비밀번호 숨기기 보이기 로직 (visible를 가지고 type을 정해준다.)
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  // 제출버튼을 누르면 통신(login 진행)
  const onSubmit = async (e) => {
    e.preventDefault();
    let loginData = "";

    // 이메일 혹은 비밀번호가 공백이면 서버와 통신하기 전 사전에 차단한다.
    if (userEmail !== "" && userPassword !== "") {
      loginData = await axios({
        url: "http://localhost:8031/login",
        method: "POST",
        data: {
          userEmail,
          userPassword,
        },
      });
    } else if (userEmail === "") {
      setErrorLogin("noEmail");
      return;
    } else if (userPassword === "") {
      setErrorLogin("noPw");
      return;
    }

    if (loginData.data !== "emailFalse" && loginData.data !== "pwFalse") {
      localStorage.setItem("Token", loginData.data);
      navigate("/MessengerPage");
    } else {
      setErrorLogin(loginData.data);
    }
  };

  if (errorLogin === "noEmail") {
    errorLog = <span className="text-xs text-red-400">이메일을 입력해주세요.</span>;
  } else if (errorLogin === "noPw") {
    errorLog = <span className="text-xs text-red-400">비밀번호를 입력해주세요.</span>;
  } else if (errorLogin === "emailFalse" || errorLogin === "pwFalse") {
    errorLog = <span className="text-xs text-red-400">이메일 혹은 비밀번호가 일치하지 않습니다.</span>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3" style={mainImage}>
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">SMhopeTalk</h2>

              <p className="max-w-xl mt-3 text-gray-300">블로그를 넘어서 메신저에 도전하는 smHope!</p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">SMhopeTalk</h2>
            </div>

            <div className="mt-8">
              <form onSubmit={onSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
                      비밀번호
                    </label>
                    {/* <a className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">비밀번호를 잊으셨나요?</a> */}
                  </div>

                  <input
                    type={passwordType.type}
                    name="userPassword"
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={userPassword}
                    onChange={(e) => {
                      setUserPassword(e.target.value);
                    }}
                  />
                  <span onClick={handlePasswordType}>
                    {passwordType.visible ? (
                      <FontAwesomeIcon icon={faEye} className="mt-1 cursor-pointer" />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} className="mt-1 cursor-pointer" />
                    )}
                  </span>
                </div>
                {errorLog}
                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    type="submit"
                  >
                    로그인
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                계정이 없으신가요?{" "}
                <Link to="/joinPage" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                  회원가입
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
