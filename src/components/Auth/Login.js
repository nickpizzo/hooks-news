import React, { useState } from "react";

function Login(props) {
  const [login, setlogin] = useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" action="">
        {!login && (
          <input type="text" placeholder="Your name" autoComplete="off" />
        )}
        <input type="email" placeholder="Your email" autoComplete="off" />
        <input type="password" placeholder="Choose a secure password" />
        <div className="flex mt3">
          <button className="button pointer mr2" type="submit">
            Submit
          </button>
          <button
            className="pointer button"
            type="button"
            onClick={() => setlogin(prevLogin => !prevLogin)}
          >
            {login ? "Create account" : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
