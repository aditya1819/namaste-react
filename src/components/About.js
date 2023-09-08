import User from './User';
import UserClass from './UserClass';
import { Component } from 'react';
import UserContext from '../utils/context/User';
class About extends Component {
  constructor(props) {
    super(props);
    // console.log('Parent Component constructor');
  }

  componentDidMount() {
    // console.log('Parent Component did mount');
  }

  render() {
    // console.log('Parent Component render');

    return (
      <div>
        <div className="w-6/12 mx-auto p-4 my-4 text-center">
          <div className="text-xl font-medium">About Us</div>

          {/* Code to read context data */}
          {/* <div>
            <UserContext.Consumer>
              {({ loggedInUser }) => <h1>{loggedInUser}</h1>}
            </UserContext.Consumer>
          </div> */}
          <UserClass name={UserContext.loggedInUser} />
        </div>
      </div>
    );
  }
}

export default About;
