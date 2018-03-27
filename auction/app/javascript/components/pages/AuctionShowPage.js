import React, {Component} from 'react';
import {AuctionDetails} from '../AuctionDetails';
import {Auction} from '../../requests/auctions';
import {BidList} from '../BidList';
import {BidForm} from '../BidForm';
import {Bid} from '../../requests/bids';
import moment from 'moment';

class AuctionShowPage extends Component {
  constructor(props) {

    super(props);

    this.state = {
      startDate: moment(),
      loading: true,
      auction: {
        title: ""
      },
      bids: [],
      bid: {}
    };
    // this.handleChange = this.handleChange.bind(this);
    this.createBid = this.createBid.bind(this);
    this.updateNewBid = this.updateNewBid.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
  }

  delete() {
    this.setState({auction: {}});
  }

  deleteBid(bidId) {
    const {auction} = this.state;
    const {bids} = auction;

    this.setState({
      auction: {
        ...auction,
        bids: bids.filter(bid => bid.id !== bidId)
      }
    })
  }

  componentDidMount() {
    const {params} = this.props.match;
    Auction.get(params.id).then(auction => {
      this.setState({auction, loading: false})
    });

    Bid.all(params.id).then(bids => {
      this.setState({bids: bids, loading: false})
    });
  }

  createBid() {
    // console.log('start of create bid')
    const {params} = this.props.match;
    const {history} = this.props;
    const {newBid, bids} = this.state;
    // console.log('params.id',params.id)
    Bid.create(params.id, newBid).then((bid) => {
      this.setState({bids: bids.concat(bid)})
    });
  }

  updateNewBid(data) {
    const {newBid} = this.state;
    this.setState({
      newBid: {
        ...newBid,
        ...data
      }
    });
  }

  render() {
    const {auction, loading} = this.state;
    const {
      bids = [],
      newBid
    } = this.state.auction;

    if (loading) {
      return (<main className="AuctionShowPage" style={{
          padding: '0 20px'
        }}>
        <h3>Loading auction...</h3>
      </main>)
    }
    return (<main className="AuctionShowPage" style={{
        padding: '0 20px'
      }}>
      <AuctionDetails {...auction}/>
      <button onClick={this.delete}>Delete</button>
      <h3>Bid</h3>
      <BidForm bid={newBid} onChange={this.updateNewBid} onSubmit={this.createBid}/>
      <BidList bids={bids} onBidDeleteClick={this.deleteBid}/>
    </main>);
  }
}

export {
  AuctionShowPage
};
