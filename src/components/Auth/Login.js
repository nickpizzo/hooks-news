import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);

  async function authenticateUser() {
    const { name, email, password } = values;
    const response = login
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password);
    console.log({ response });
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            placeholder="Your name"
            autoComplete="off"
          />
        )}
        <input
          name="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          type="email"
          className={errors.email && "error-input"}
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          name="password"
          onBlur={handleBlur}
          value={values.password}
          onChange={handleChange}
          className={errors.password && "error-input"}
          type="password"
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button
            className="button pointer mr2"
            type="submit"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            className="pointer button"
            type="button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "Create account" : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
