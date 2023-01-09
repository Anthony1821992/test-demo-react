// class component 
// function component

import React from 'react';

class MyComponent extends React.Component {
    state = {
        name: 'Anthony',
        age: 30,
        address: 'USA'
    }
    // JSX
    render(){
        return(
            <div>
                My name is {this.state.name} and my address is {this.state.address}
            </div>
        )
    }
}
export default MyComponent;