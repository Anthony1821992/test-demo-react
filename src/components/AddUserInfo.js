import React, { useState } from "react";

const AddUserInfo = (props) => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "random",
      name: name,
      age: age,
      email: email,
    });
  };
  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleOnChangeInput = (event) => {
    setName(event.target.value);
  };
  const handleOnChangeAge = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <form
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
      >
        <label>Your Name:</label>
        <input
          placeholder="Enter your name"
          value={name}
          type="text"
          onChange={(event) => {
            handleOnChangeInput(event);
          }}
        />
        <br />
        <label>Your Age:</label>
        <input
          placeholder="Enter your age"
          value={age}
          type="text"
          onChange={(event) => {
            handleOnChangeAge(event);
          }}
        />
        <br />
        <label>Your Email:</label>
        <input
          placeholder="Enter your email"
          value={email}
          type="text"
          onChange={(event) => {
            handleOnChangeEmail(event);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default AddUserInfo;
