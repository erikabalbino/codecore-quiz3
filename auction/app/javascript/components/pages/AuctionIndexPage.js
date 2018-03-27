import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import {Field} from '../Field';
import {Auction} from '../../requests/auctions';

class AuctionIndexPage extends Component {

  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      auctions: []
    };
    this.deleteAuction = this.deleteAuction.bind(this);
  }
  deleteAuction (auctionId) {
    const {auctions} = this.state;

    // - make request to server

    Auction
    .delete(auctionId)
    .then(() => {
      this.setState({
        auctions: auctions
        .filter(auction => auction.id !== auctionId)
      });
    });

    // - update the page to remove the auction

  }

  // deleteAuction (auctionId) {
  //   return () => {
  //
  //     const {auctions} = this.state;
  //     this.setState({
  //       auctions: auctions
  //         .filter(auction => auction.id !== auctionId)
  //     });
  //   }
  // }

  componentDidMount () {
    Auction
    .all()
    .then(auctions => {
      this.setState({auctions, loading: false});
    });
  }

  render () {
    const {loading, auctions} = this.state;

    if (loading) {
      return (
        <main
          className="AuctionIndexPage"
          style={{padding: '0  20px'}}
        >
          <h3>Loading auctions...</h3>
        </main>
      )
    }

    return (
      <main
        className="AuctionIndexPage"
        style={{
          padding: '0 20px',
        }}
      >
        <h2>Auctions</h2>
        <ul style={{paddingLeft: '30px'}}>
          {
            this.state.auctions.map(auction => (
              <li key={auction.id}
                style={{padding: '30px'}}
              >
                <Link to={`/auctions/${auction.id}`}>
                  {auction.title}
                </Link>
                <Field name="Author" value={auction.author.full_name} />
                <button
                onClick={() => this.deleteAuction(auction.id)}
                >Delete</button>
              </li>
            ))
          }
        </ul>
      </main>
    );
  }
}

export {AuctionIndexPage};
