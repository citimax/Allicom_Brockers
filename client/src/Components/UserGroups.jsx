import React, { Component } from "react";
import Breadcumps from "./breadcumps";
class UserGroups extends Component {
  constructor() {
    super();
    this.state = {
      GroupName: "",
      Narration: ""
    };
  }
  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  onSubmit = e => {
    // e.preventDefault();
    // // get our form data out of state
    // const { GroupName, Narration } = this.state;
    // axios.post('/', { GroupName, Narration })
    //     .then((result) => {
    //         //access the results here....
    //     });
  };
  render() {
    const { GroupName, Narration } = this.state;
    return (
      <div>
        <Breadcumps tablename={"User Groups"} />
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Group name</label>
            <input
              type="text"
              className="form-control"
              name="GroupName"
              placeholder="Enter group name"
              required
              value={GroupName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Narration</label>
            <input
              type="text"
              name="Narration"
              className="form-control"
              placeholder="Narration"
              required
              value={Narration}
              onChange={this.onChange}
            />
          </div>

          <button
            onSubmit={this.onSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default UserGroups;

//
// function usersfunc() {
//   ReactDOM.render(<h1>Hello World</h1>, document.getElementById("Block"));
// }
// export default usersfunc;
