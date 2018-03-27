import React, {Component} from 'react';
import {
  AuctionShowPage,
  AuctionIndexPage,
  AuctionNewPage,
  SignInPage,
  SignUpPage,
  HomePage,
  NotFoundPage
} from './pages';
import {NavBar} from './NavBar';
import {AuthRoute} from './AuthRoute';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';


class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: null,
      loading: true
    };
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signOut () {
    localStorage.removeItem('jwt');
    this.setState({user: null});
  }

  signIn () {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({user: payload, loading: false});
    } else {
      this.setState({loading: false});
    }
  }

  signUp () {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({user: payload, loading: false});
    } else {
      this.setState({loading: false});
    }
  }

  componentDidMount () {
    this.signIn();
  }

  isAuth () {
    return !!this.state.user
  }

  render () {
    const {user, loading} = this.state;

    if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <Router basename="/biddr">
        <div className="App">
            <NavBar
              user={user}
              onSignOutClick={this.signOut}
            />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/sign_in" render={props => {
                return <SignInPage {...props} onSignIn={this.signIn} /> }}
              />
              <Route path="/sign_up" render={props => {
                return <SignUpPage {...props} onSignUp={this.signUp} /> }}
              />
              <AuthRoute
                isAuthenticated={this.isAuth()}
                path="/auctions"
                exact component={AuctionIndexPage}
              />
              <AuthRoute
                isAuthenticated={this.isAuth()}
                path="/auctions/new"
                component={ AuctionNewPage }
              />
              {/* <AuthRoute
                isAuthenticated={this.isAuth()}
                path="/auctions/:id"
                render={AuctionShowPage}
                {...props}
              /> */}
            <Route
              path="/auctions/:id"
              render={props => {
              return <AuctionShowPage {...props} />
             }}
           />
              <Route component={NotFoundPage} />
            </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
