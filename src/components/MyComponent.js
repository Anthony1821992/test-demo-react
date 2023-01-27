// class component
// function component

import React, { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";
// class MyComponent extends React.Component {
//   handleAddNewUser = (userObj) => {
//     this.setState({
//       listUsers: [userObj, ...this.state.listUsers],
//     });
//     console.log(this.state.listUsers);
//   };

//   handleDeleteUsers = (userId) => {
//     let listUsersClone = [...this.state.listUsers];

//     listUsersClone = listUsersClone.filter((item) => item.id !== userId);
//     this.setState({ listUsers: listUsersClone });
//   };

//   state = {
//     listUsers: [
//       { id: "1", name: "John", email: "John@example.com", age: "30" },
//       { id: "2", name: "Eric", email: "Eric@example.com", age: "35" },
//       { id: "3", name: "Marry", email: "Marry@example.com", age: "19" },
//       { id: "4", name: "Lucas", email: "Lucas@example.com", age: "50" },
//     ],
//   };
//   render() {
//     return (
//       <>
//         <AddUserInfo handleAddNewUser={this.handleAddNewUser}></AddUserInfo>
//         <br />
//         <br />
//         <DisplayInfo
//           listUsers={this.state.listUsers}
//           handleDeleteUsers={this.handleDeleteUsers}
//         />
//       </>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: "1", name: "John", email: "John@example.com", age: "30" },
    { id: "2", name: "Eric", email: "Eric@example.com", age: "35" },
    { id: "3", name: "Marry", email: "Marry@example.com", age: "19" },
    { id: "4", name: "Lucas", email: "Lucas@example.com", age: "50" },
  ]);

  const handleAddNewUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };

  const handleDeleteUsers = (userId) => {
    let listUsersClone = [...listUsers];
    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
    setListUsers(listUsersClone);
  };

  return (
    <>
      <AddUserInfo handleAddNewUser={handleAddNewUser}></AddUserInfo>
      <br />
      <br />
      <DisplayInfo
        listUsers={listUsers}
        handleDeleteUsers={handleDeleteUsers}
      />
    </>
  );
};

export default MyComponent;
