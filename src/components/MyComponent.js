// class component
// function component

import React from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponent extends React.Component {
  handleAddNewUser = (userObj) => {
    this.setState({
      listUsers: [userObj, ...this.state.listUsers],
    });
  };

  state = {
    listUsers: [
      { id: "1", name: "John", email: "John@example.com", age: "30" },
      { id: "2", name: "Eric", email: "Eric@example.com", age: "35" },
      { id: "3", name: "Marry", email: "Marry@example.com", age: "19" },
      { id: "4", name: "Lucas", email: "Lucas@example.com", age: "50" },
    ],
  };
  render() {
    return (
      <>
        <AddUserInfo handleAddNewUser={this.handleAddNewUser}></AddUserInfo>
        <br />
        <br />
        <DisplayInfo listUsers={this.state.listUsers} />
      </>
    );
  }
}
export default MyComponent;
