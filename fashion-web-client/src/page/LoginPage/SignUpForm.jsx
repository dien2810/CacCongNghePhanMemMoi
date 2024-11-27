import "../../assets/css/LoginForm.css";
import { useState } from "react";
import { clientAPI } from "../../api/RestClient";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [state, setState] = useState({ state: "init", message: "" });
  const setIsSignUp = props.setIsSignUp;

  const checkSignUp = () => {
    setState({ ...state, state: "loading" });
    clientAPI.path = "auth/signup";
    clientAPI
      .create({ username, password, repassword })
      .then((response) => {
        console.log(`response: ${response}`);
        console.log(`response: ${response.status}`);
        if (response) {
          console.log("Vo setState");
          setState({ ...state, state: "init", message: "Đăng ký thành công" });
          setTimeout(() => {
            console.log("Đợi 2 giây");
            setIsSignUp(false);
          }, 4000);
        }
      })
      .catch((error) => {
        if (error.response) {
          // Kiểm tra mã lỗi từ server
          if (error.response.status === 400) {
            console.error("Lỗi 400:", error.response.data);
            alert(error.response.data); // Hiển thị thông báo lỗi
            setState({ ...state, state: "init", message: "" });
          } else {
            console.error("Lỗi khác:", error.response.data);
            setState({ ...state, state: "init", message: "" });
          }
        } else {
          console.error("Không thể kết nối đến server:", error.message);
          setState({ ...state, state: "init", message: "" });
        }
      });
    // axios
    // 	.post(`${process.env.REACT_APP_API_AUTH_SERVER_URL}/signup`, {
    // 		username: username,
    // 		password: password,
    // 		repassword: repassword,
    // 	})
    // 	.then((data) => {
    // 		if (data.status === 200) {
    // 			setIsSignUp(false);
    // 			setState({ ...state, state: 'init', message: '' });
    // 		}
    // 	})
    // 	.catch((err) => setState({ ...state, state: 'init', message: err.response.data }));
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeRepassword = (e) => {
    setRepassword(e.target.value);
  };

  return (
    <form className="container-1139-item fillup">
      <h2 className="heading-login">ĐĂNG KÝ</h2>
      <input
        className="login-input"
        type="text"
        value={username}
        onChange={(e) => onChangeUsername(e)}
        placeholder="Tên đăng nhập"
        required
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => onChangePassword(e)}
        placeholder="Mật khẩu"
        required
      />
      <input
        className="login-input"
        type="password"
        value={repassword}
        onChange={(e) => onChangeRepassword(e)}
        placeholder="Nhập lại mật khẩu"
        required
      />
      <button
        className="button bt_login"
        type="button"
        onClick={() => checkSignUp()}
      >
        ĐĂNG KÝ
      </button>
      <div className="container-1139 signup">
        <p className="signup-content">Đã có tài khoản?</p>
        <p
          className="signup-content --heavy"
          style={{ cursor: "pointer" }}
          onClick={() => setIsSignUp(false)}
        >
          Đăng nhập
        </p>
      </div>
      {function () {
        if (state.state === "loading")
          return (
            <div
              className="login-loading container-1139"
              style={{ marginTop: "20px" }}
            ></div>
          );
      }.call(this)}
      <div className="login-message">{state.message}</div>
    </form>
  );
}
export default SignUpForm;
