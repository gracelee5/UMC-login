import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import axios from "axios";

const LOGIN_API_KEY = "http://localhost:8000/user/login";

function Login() {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loginFunc = async (e) => {
    e.preventDefault();
    setMsg("Loading...");

    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true); // 로딩 시작
      const response = await axios.post(LOGIN_API_KEY, { id, pw: password });
      const { code, token, userId } = response.data;
      console.log(response.data); // 확인용 로그

      if (code === 400) {
        setTimeout(() => setMsg("비어있는 내용입니다."), 1500);
      } else if (code === 401) {
        setTimeout(() => setMsg("존재하지 않는 id입니다."), 1500);
      } else if (code === 402) {
        setTimeout(() => setMsg("비밀번호가 일치하지 않습니다."), 1500);
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        dispatch(loginUser({ id: userId, token }));
        setTimeout(() => setMsg("Login successful!"), 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      setTimeout(() => setMsg("Login failed. Please try again."), 1500);
    } finally {
      setLoading(false);
      // `setTimeout`을 제거합니다. 상태 변경은 `then` 또는 `catch` 내부에서 처리합니다.
    }
  };

  return (
    <>
      <form onSubmit={loginFunc} className="login-wrap">
        <div>
          <p>ID : </p>
          <input
            type="text"
            placeholder="아이디"
            className="id"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <br />
        <div>
          <p>PW : </p>
          <input
            type="password"
            placeholder="비밀번호"
            className="pw"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />
        <button disabled={loading} type="submit" className="btn">
          로그인
        </button>
        <div className="msg">{msg}</div>
      </form>
    </>
  );
}

export default Login;
