import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

import User from "./containers/User";
import Welcome from "./containers/Welcome";

const Posts = React.lazy(() => import("./containers/Posts"));

class App extends Component {
  state = {
    showNav: false,
  };

  toggleHandler = () => {
    this.setState(prevState => {
      return { showNav: !prevState.showNav };
    });
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.toggleHandler}>Toggle Nav</button>
        {this.state.showNav ? (
          <BrowserRouter>
            <React.Fragment>
              <nav>
                <NavLink to="/user">User Page</NavLink> |&nbsp;
                <NavLink to="/posts">Posts Page</NavLink>
              </nav>
              <Route path="/" component={Welcome} exact />
              <Route path="/user" component={User} />
              <Route
                path="/posts"
                render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Posts />
                  </Suspense>
                )}
              />
            </React.Fragment>
          </BrowserRouter>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Posts />
          </Suspense>
        )}
      </React.Fragment>
    );
  }
}

export default App;
