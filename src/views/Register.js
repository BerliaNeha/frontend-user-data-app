import React, { useState } from "react";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Function to update the value of an input
  const updateData = (event) => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      default:
        break;
    }
  };

  // Function to register a new user
  const registerUser = async (event) => {
    event.preventDefault();

  
    const newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
    };

    
    const settings = {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
         
      },
      credentials:"include"
    };

    
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/register",
      settings
    );
    const parsedRes = await response.json();

    try {
      // If the request was successful...
      if (response.ok) {
        const now = new Date();

        props.login(parsedRes.token, parsedRes.id);
       
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Function to update the "showLogin" state variable in App.js
  const updateShowLogin = () => {
    props.setShowLogin(true);
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <div>
          <label>Username</label>
          <input name="username" onChange={updateData} value={username} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" onChange={updateData} value={password} />
        </div>
        <div>
          <label>First Name</label>
          <input name="firstName" onChange={updateData} value={firstName} />
        </div>
        <div>
          <label>Last Name</label>
          <input name="lastName" onChange={updateData} value={lastName} />
        </div>
        <div>
          <label>Email Address</label>
          <input name="email" onChange={updateData} value={email} />
        </div>

        <button>Register an account</button>
      </form>

      <button onClick={updateShowLogin}>
        Already registered? Log in to your account!
      </button>
    </div>
  );
};

export default Register;
