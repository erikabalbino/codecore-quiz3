import React, {Component} from 'react';
import {Token} from '../../requests/tokens';
import {User} from '../../requests/users';

class SignUpPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      }
    };

    this.signUp = this.signUp.bind(this);
    this.createToken = this.createToken.bind(this);
  }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      this.setState({[name]: currentTarget.value});
    };
  }

  createToken (event) {
    event.preventDefault();
    const {onSignUp = () => {}} = this.props;
    const {email, password} = this.state;
    Token
      .create({email, password})
      .then(data => {
        if (!data.error) {
          const {jwt} = data;
          localStorage.setItem('jwt', jwt);
          this.props.history.push("/");
          onSignUp();
          this.setState({email: "", password: ""});
        }
      });
  }

  signUp (event) {
    event.preventDefault();
    const {first_name, last_name, email, password} = this.state;
    const user = {
      user: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      }
    }

  User
    .create(user)
    .then (data => {
      this.createToken(event)
    });
  }

  render () {
    return (
      <main
        className="SignUpPage"
        style={{
          padding: '0 20px'
        }}
      >
        <h2>Sign Up</h2>
        <form onSubmit={this.signUp}>
          <div>
            <label htmlFor='first_name'>First Name</label> <br/>
            <input
              onChange={this.handleChange('first_name')}
              type='text'
              id='first_name'
              name='first_name'
            />
          </div>

          <div>
            <label htmlFor='last_name'>Last Name</label> <br/>
            <input
              onChange={this.handleChange('last_name')}
              type='text'
              id='last_name'
              name='last_name'
            />
          </div>

          <div>
            <label htmlFor='email'>Email</label> <br/>
            <input
              onChange={this.handleChange('email')}
              type='email'
              id='email'
              name='email'
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label> <br />
            <input
              onChange={this.handleChange('password')}
              type='password'
              id='password'
              name='password'
            />
          </div>

          <div>
            <input type='submit' value='Sign Up'/>
          </div>
        </form>
      </main>
    )
  }
}

export {SignUpPage};
