import React from "react";

class AddUserInfo extends React.Component {
  state = {
    name: "",
    age: "",
    email: "",
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "random",
      name: this.state.name,
      age: this.state.age,
      email: this.state.email,
    });
  };

  handleOnChangeInput = (event) => {
    this.setState({ name: event.target.value });
  };

  handleOnChangeAge = (event) => {
    this.setState({ age: event.target.value });
  };

  handleOnChangeEMail = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old
        <button
          onClick={(event) => {
            this.handleClick(event);
          }}
        >
          Click me
        </button>
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <label>Your Name:</label>
          <input
            placeholder="Enter your name"
            value={this.state.name}
            type="text"
            onChange={(event) => {
              this.handleOnChangeInput(event);
            }}
          />
          <br />
          <label>Your Age:</label>
          <input
            placeholder="Enter your age"
            value={this.state.age}
            type="text"
            onChange={(event) => {
              this.handleOnChangeAge(event);
            }}
          />
          <br />
          <label>Your Email:</label>
          <input
            placeholder="Enter your email"
            value={this.state.email}
            type="text"
            onChange={(event) => {
              this.handleOnChangeEMail(event);
            }}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default AddUserInfo;
