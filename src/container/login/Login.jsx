import { Button } from "components";
import { useLogin } from "./useLogin";
import "./login.styles.css";

function Login() {
  const { message, onSubmit } = useLogin();

  return (
    <section className="login">
      <h2>Login To Get Started</h2>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <label>
          Username
          <input
            required
            minLength="4"
            name="username"
            className="form-input"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength="7"
            name="password"
            className="form-input"
          />
        </label>
        <Button className="form-button" text="Login" />
      </form>
      {message !== "" ? (
        <div className="form-message">{message}</div>
      ) : null}
    </section>
  );
}

export { Login };
