import React, { useState } from "react";
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
  //Use Hooks here
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };
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
