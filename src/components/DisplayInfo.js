import React from "react";

class DisplayInfo extends React.Component {
  state = {
    isShowListUser: true,
  };
  handleShowHide = () => {
    this.setState({ isShowListUser: !this.state.isShowListUser });
  };
  render() {
    const { listUsers } = this.props;
    return (
      <>
        <span
          onClick={() => {
            this.handleShowHide();
          }}
        >
          {this.state.isShowListUser === true
            ? "Hide list users:"
            : "Show list users:"}
        </span>
        {this.state.isShowListUser && (
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={+user.age > 30 ? "green" : "red"}>
                  <div> My name is {user.name}</div>
                  <div> My age is {user.age}</div>
                  <div> My email is {user.email}</div>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
export default DisplayInfo;
