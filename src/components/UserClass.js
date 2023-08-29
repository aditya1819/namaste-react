import React, { Component } from 'react';

class UserClass extends Component {
  // receiving props in the constructor
  // constructor called when instance of class component is create
  constructor(props) {
    super(props);

    // state is reserved variable
    // a big object containing all the state variables
    this.state = {
      userInfo: {
        name: 'Dummy Name',
        location: 'Dummy localtion'
      }
    };
  }

  async componentDidMount() {
    let data = await fetch(' https://api.github.com/users/aditya1819');
    data = await data.json();
    console.log(data);

    // set state variable:
    this.setState({
      userInfo: data
    });

    // Make API Call here :D
    console.log('Child Component mounted');
  }

  componentDidUpdate() {
    // re render logic
  }

  componentWillUnmount() {
    // clean up code
  }

  render() {
    console.log('Child Component render');

    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div>
        <img src={avatar_url} />
        <h1>{name}</h1>
        <h2>{location}</h2>
        <h2>{this.state.count}</h2>
      </div>
    );
  }
}

export default UserClass;
