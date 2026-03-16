import { useState } from "react";
import { MAIL, PWD } from "../../constant.js";
import login_bg from "../../assets/login_bg.png";
import styles from "./style_login.module.css";
import promobilelogo from "../../assets/promobilelogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let c = 0;

    if (gmailRegex.test(email) && email === MAIL) {
      c++;
    } else {
      alert("Entered incorrect email");
    }

    if (passRegex.test(password) && password === PWD) {
      c++;
    } else {
      alert("Entered incorrect password");
    }

    if (c === 2) {
      alert("Login Successful");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.nav}>
        <div className={styles.nav__con}>
          <img className={styles.im__s} src={promobilelogo} />
        </div>
      </header>

      <main>
        <div className={styles.main__div}>
          <div className={styles.form__div}>
            <div className={styles.form__div1}>
              <p className={styles.loginTitle}>Login</p>

              <form onSubmit={handleSubmit}>
                <div>
                  <label className={styles.label_f}>
                    Mobile number / Email ID
                  </label>

                  <input
                    className={styles.input_f}
                    placeholder="Enter your Number or Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={styles.label_f}>Password</label>

                  <input
                    className={styles.input_f}
                    placeholder="Enter your Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div>
                    <input
                      style={{ marginLeft: "50px" }}
                      type="checkbox"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label>Show Password</label>
                  </div>
                </div>

                <button type="submit" className={styles.btn}>
                  Login
                </button>
              </form>
            </div>
          </div>

          <div className={styles.img__div}>
            <img className={styles.im__s1} src={login_bg} />
            <p className={styles.text}>Welcome to Promobile!</p>
            <p className={styles.text1}>
              Log in to manage your mobile plans, track usage, and access
              exclusive offers.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        © 2026 Sirius Telecoms Africa SAU. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;