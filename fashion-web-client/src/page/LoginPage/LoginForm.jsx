import "../../assets/css/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clientAPI } from "../../api/RestClient";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({ state: "init", message: "" });
  const setIsSignUp = props.setIsSignUp;
  const navigate = useNavigate();

  // Hàm giả lập check login, thay cho API
  const checkLogin = async (e) => {
    e.preventDefault();
    setState({ ...state, state: "loading", message: "" });

    clientAPI.path = "auth/login";

    clientAPI
      .create({ username, password })
      .then((response) => {
        console.log(response);
        //Storage token
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        //Storage user and cart
        // cartApi.getCartByUsername(username).then((cart) => {
        //   dispatch(userSlice.actions.set(response.user));
        //   dispatch(itemsSlice.actions.setUserItems(cart));
        //   setState({ ...state, state: "init", message: "" });
        //   navigate("/");
        // });
        setState({ ...state, state: "init", message: "" });
        navigate("/");
      })
      .catch((err) => {
        setState({ ...state, state: "error", message: err.response.data });
      });

    // // Giả lập quá trình đăng nhập
    // setTimeout(() => {
    // 	if (username === 'test' && password === '1234') {
    // 		// Đăng nhập thành công
    // 		setState({ ...state, state: 'success', message: 'Đăng nhập thành công!' });
    // 		// Điều hướng đến trang chủ
    // 		navigate('/');
    // 	} else {
    // 		// Đăng nhập thất bại
    // 		setState({ ...state, state: 'error', message: 'Sai tên đăng nhập hoặc mật khẩu.' });
    // 	}
    // }, 1000); // Giả lập thời gian chờ
  };

  const onChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <div className="container-1139-item fillup">
      <h2 className="heading-login">ĐĂNG NHẬP</h2>
      <input
        className="login-input"
        id="tb_loginName"
        type="text"
        name="username"
        placeholder="Tên đăng nhập"
        onChange={(e) => onChangeUsername(e)}
        required
      />
      <input
        className="login-input"
        id="tb_password"
        type="password"
        name="password"
        placeholder="Mật khẩu"
        onChange={(e) => onChangePassword(e)}
        required
      />
      <button
        className="button bt_login"
        id="bt_login"
        type="button"
        onClick={checkLogin}
      >
        ĐĂNG NHẬP
      </button>
      {state.state === "loading" && (
        <div
          className="container-1139"
          style={{ justifyContent: "space-evenly" }}
        >
          <div className="login-loading"></div>
        </div>
      )}
      {state.state !== "loading" && (
        <div>
          <a href="top" className="forget-content">
            Quên mật khẩu?
          </a>
          <div className="container-item or">
            <div className="horizontal-line"></div>
            <p className="or-content">HOẶC</p>
            <div className="horizontal-line"></div>
          </div>
          <div className="container-1139 login-logo-container">
            <img src={require("../../assets/img/facebook.png")} alt="logo" />
            <img src={require("../../assets/img/google.png")} alt="logo" />
          </div>
          <div className="container-1139 signup">
            <p className="signup-content">Bạn chưa có tài khoản?</p>
            <p
              className="signup-content --heavy"
              style={{ cursor: "pointer" }}
              onClick={() => setIsSignUp(true)}
            >
              Đăng ký
            </p>
          </div>
        </div>
      )}
      <div className="login-message">{state.message}</div>
    </div>
  );
}

export default LoginForm;

// import '../../assets/css/LoginForm.css';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { userSlice } from '../../redux/slice/UserSlice';
// import { itemsSlice } from '../../redux/slice/ItemsSlice';
// import userApi from '../../api/UserApi';
// import cartApi from '../../api/CartApi';

// function LoginForm(props) {
// 	const [username, setUsername] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [state, setState] = useState({ state: 'init', message: '' });
// 	const setIsSignUp = props.setIsSignUp;
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();

// 	const checkLogin = async (e) => {
// 		e.preventDefault();
// 		setState({ ...state, state: 'loading', message: '' });
// 		userApi
// 			.login(username, password)
// 			.then((response) => {
// 				console.log(response)
// 				//Storage token
// 				localStorage.setItem('accessToken', response.accessToken);
// 				localStorage.setItem('refreshToken', response.refreshToken);

// 				//Storage user and cart
// 				cartApi.getCartByUsername(username).then((cart) => {
// 					dispatch(userSlice.actions.set(response.user));
// 					dispatch(itemsSlice.actions.setUserItems(cart));
// 					setState({ ...state, state: 'init', message: '' });
// 					navigate('/');
// 				});
// 			})
// 			.catch((err) => {
// 				setState({ ...state, state: 'error', message: err.response.data });
// 			});
// 	};

// 	const onChangeUsername = (event) => {
// 		const value = event.target.value;
// 		setUsername(value);
// 	};

// 	const onChangePassword = (event) => {
// 		const value = event.target.value;
// 		setPassword(value);
// 	};

// 	return (
// 		<div className='container-1139-item fillup'>
// 			<h2 className='heading-login'>ĐĂNG NHẬP</h2>
// 			<input
// 				className='login-input'
// 				id='tb_loginName'
// 				type='text'
// 				name='username'
// 				placeholder='Tên đăng nhập'
// 				onChange={(e) => onChangeUsername(e)}
// 				required
// 			/>
// 			<input
// 				className='login-input'
// 				id='tb_password'
// 				type='password'
// 				name='password'
// 				placeholder='Mật khẩu'
// 				onChange={(e) => onChangePassword(e)}
// 				required
// 			/>
// 			<button
// 				className='button bt_login'
// 				id='bt_login'
// 				type='button'
// 				onClick={checkLogin}>
// 				ĐĂNG NHẬP
// 			</button>
// 			{function () {
// 				if (state.state === 'loading')
// 					return (
// 						<div
// 							className='container-1139'
// 							style={{ justifyContent: 'space-evenly' }}>
// 							<div className='login-loading'></div>
// 						</div>
// 					);
// 				return (
// 					<div>
// 						<a
// 							href='top'
// 							className='forget-content'>
// 							Quên mật khẩu?
// 						</a>
// 						<div className='container-item or'>
// 							<div className='horizontal-line'></div>
// 							<p className='or-content'>HOẶC</p>
// 							<div className='horizontal-line'></div>
// 						</div>
// 						<div className='container-1139 login-logo-container'>
// 							<img
// 								src={require('../../assets/img/facebook.png').default}
// 								alt='logo'
// 							/>
// 							<img
// 								src={require('../../assets/img/google.png').default}
// 								alt='logo'
// 							/>
// 						</div>
// 						<div className='container-1139 signup'>
// 							<p className='signup-content'>Bạn chưa có tài khoản?</p>
// 							<p
// 								className='signup-content --heavy'
// 								style={{ cursor: 'pointer' }}
// 								onClick={() => setIsSignUp(true)}>
// 								Đăng ký
// 							</p>
// 						</div>
// 					</div>
// 				);
// 			}.call(this)}
// 			<div className='login-message'>{state.message}</div>
// 		</div>
// 	);
// }
// export default LoginForm;
