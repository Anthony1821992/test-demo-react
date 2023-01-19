import React, { useState, useEffect } from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

// class DisplayInfo extends React.Component {
//   state = {
//     isShowListUser: true,
//   };
//   handleShowHide = () => {
//     this.setState({ isShowListUser: !this.state.isShowListUser });
//   };
//   render() {
//     const { listUsers } = this.props;
//     return (
//       <div className="display-info-container">
//         <img src={logo} />
//         <div>
//           <span
//             onClick={() => {
//               this.handleShowHide();
//             }}
//           >
//             {this.state.isShowListUser === true
//               ? "Hide list users:"
//               : "Show list users:"}
//           </span>
//         </div>
//         {this.state.isShowListUser && (
//           <>
//             {listUsers.map((user) => {
//               // console.log(user);
//               return (
//                 <div key={user.id} className={+user.age > 30 ? "green" : "red"}>
//                   <div> My name is {user.name}</div>
//                   <div> My age is {user.age}</div>
//                   <div> My email is {user.email}</div>
//                   <button onClick={() => this.props.handleDeleteUsers(user.id)}>
//                     Delete
//                   </button>
//                   <hr />
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }
const DisplayInfo = (props) => {
  const { listUsers } = props;
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };

  // Truong hop [] empty thi useEffect chi goi duy nhat 1 lan cho du component co re-render lai bao nhieu lan
  useEffect(() => {
    setTimeout(() => {
      document.title = "Hoi Dan It";
    }, 3000);
    console.log("Call me useEffect");
  }, []);

  // Truong hop [listUsers] thi useEffect se duoc goi lai de theo doi gia tri ma ta bo vao [] moi khi Component re-render lai.
  useEffect(() => {
    listUsers.length === 0 && alert("You deleted all users");
  }, [listUsers]);
  return (
    <div className="display-info-container">
      <div>
        <span
          onClick={() => {
            handleShowHideListUser();
          }}
        >
          {isShowHideListUser === true
            ? "Hide list users:"
            : "Show list users:"}
        </span>
      </div>

      {isShowHideListUser && (
        <>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age > 30 ? "green" : "red"}>
                <div> My name is {user.name}</div>
                <div> My age is {user.age}</div>
                <div> My email is {user.email}</div>
                <button onClick={() => props.handleDeleteUsers(user.id)}>
                  Delete
                </button>
                <hr />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
export default DisplayInfo;
