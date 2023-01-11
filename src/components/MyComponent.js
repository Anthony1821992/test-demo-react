// class component 
// function component

import React from 'react';

class MyComponent extends React.Component {
    state = {
        name: 'Anthony',
        age: 30,
        address: 'USA'
    }
    // handleClick(event){
    //     console.log('Click me my button');
    //     console.log('My name is ', this.state.name)
    //     this.setState({name: 'Andy',age: 25});
    // }
    // Arrow functions:
    handleClick=(event)=>{
        console.log('Click me my button');
        console.log('My name is ', this.state.name)
        this.setState({name: 'Andy',age: 25});
    }
    
    handleOnMouseOver(event){
        console.log(event.pageX)  
    }
    // JSX
    render(){
        return(
            <div>
                My name is {this.state.name} and I'm {this.state.age} years old
                <button onClick={(event)=>{this.handleClick(event)}}>Click me</button>
                <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
            </div>
        )
    }
}
export default MyComponent;