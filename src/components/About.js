import User from './User';
import UserClass from './UserClass';
import { Component } from 'react';
class About extends Component {
  constructor(props) {
    super(props);

    console.log('Parent Component constructor');
  }

  componentDidMount() {
    console.log('Parent Component did mount');
  }

  render() {
    console.log('Parent Component render');

    return (
      <div>
        <h1> About us page</h1>
        <div className="about-us-user-cards">
          <UserClass name="aditya (class)" />
        </div>
      </div>
    );
  }
}

export default About;
