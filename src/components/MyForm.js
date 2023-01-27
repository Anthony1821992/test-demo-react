import { useState } from "react";

const MyForm = (props) => {
  const [name, setName] = useState("");
  const handleOnChangeInput = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <label>
        Enter your name:
        <input
          type="text"
          value={name}
          onChange={(event) => {
            handleOnChangeInput(event);
          }}
        />
      </label>
    </form>
  );
};
export default MyForm;
