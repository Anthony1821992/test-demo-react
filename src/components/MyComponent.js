// class component
// function component

import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";
class MyComponent extends React.Component {
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
      <div>
        <UserInfo></UserInfo>
        <br />
        <br />
        <DisplayInfo listUsers={this.state.listUsers} />
      </div>
    );
  }
}
export default MyComponent;
