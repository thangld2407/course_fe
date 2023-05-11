import { postRequest } from "@/api/request";
import { notification } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./login.module.css";

let cx = classNames.bind(styles);

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const { email, password } = login;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
      };
      const res = await postRequest("/auth/login", data);
      if (res.status_code === 200) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("expired_in", res.access_token_expired);
        localStorage.setItem("user", JSON.stringify(res.user));
        notification.success({
          message: "Login success",
          duration: 2,
        });
        navigate("/");
      } else {
        notification.error({
          message: res.message,
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2,
      });
    }
  };

  const token = localStorage.getItem("access_token");
  const expired_in = localStorage.getItem("expired_in");
  const current_time = new Date().getTime();

  if (token && expired_in && current_time < expired_in) {
    return <Navigate to="/" />;
  }

  return (
    <section className={cx("ftco-section")} style={{ padding: 0 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <img
              style={{ width: 300, height: 200 }}
              src="https://www.phoenixclassroom.com/logo-icon.png"
              alt="logo"
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="wrap d-md-flex">
              <div
                className={`${cx(
                  "text-wrap",
                  "order-md-last"
                )} p-4 p-lg-5 text-center d-flex align-items-center`}
              >
                <div className={`${cx("text", "w-100")} w-100`}>
                  <h2>Welcome to login</h2>
                  <p>Dont have an account?</p>
                </div>
              </div>
              <div className={`${cx("login-wrap")} p-4 p-lg-5`}>
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className={`${cx("mb-4")}`}>Sign In</h3>
                  </div>
                  <div className={`${cx("w-100")} w-100`}></div>
                </div>
                <form onSubmit={handleLogin} className={cx("signin-form")}>
                  <div className={`${cx("form-group")} mb-3`}>
                    <label className={cx("label")} htmlFor="name">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className={cx("form-control")}
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className={`${cx("form-group")} mb-3`}>
                    <label className={cx("label")} htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={password}
                      className={`${cx("form-control")} form-control`}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className={`${cx("form-group")} form-group`}>
                    <button
                      type="submit"
                      className={`${cx(
                        "form-control",
                        "submit"
                      )}form-control submit btn btn-primary  px-3`}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50 text-left"></div>
                    <div className="w-50 text-md-right">
                      <a href="#">Forgot Password</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
