import React from 'react';
import {CurrentDateTime} from './CurrentDateTime';
import {Link} from 'react-router-dom';

function NavBar (props) {
  const {user, onSignOutClick = () => {}} = props;

  const handleSignOut = event => {
    event.preventDefault();
    onSignOutClick();
  };

  return (
    <nav
      style={{
        padding: '10px',
        display: 'flex',
      }}
    >
      <Link style={{marginRight: '20px'}} to="/">Home</Link>
      <Link style={{marginRight: '20px'}} to="/auctions/new">New Auction</Link>
      <Link to="/auctions">Auctions</Link>
      {
        user ? ([
          <span
            key='1'
            style={{marginLeft: 'auto', marginRight: '20px'}}
          >
            Hello, {user.full_name}
          </span>,
          <a
            onClick={handleSignOut}
            key='2'
            href="#"
            style={{marginRight: '20px'}}
          >
            Sign Out
          </a>
        ]) : (
          <div>
            <Link
              style={{marginLeft: '30px', marginRight: '20px'}}
              to="/sign_in"
            >
                Sign In
            </Link>
            <Link
              style={{marginLeft: '10', marginRight: '20px'}}
              to="/sign_up"
            >
              |  Sign up
            </Link>
          </div>
        )
      }

      <CurrentDateTime />
    </nav>
  );
}

export {NavBar};
