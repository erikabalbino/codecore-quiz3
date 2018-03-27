import React from 'react';
import {BidDetails} from './BidDetails';

function BidList (props) {
  // const {bids = []} = props;
  const {bids = [], onBidDeleteClick = () => {}} = props;

  return (
    <ul className="BidList">
        {
          bids.map(bid => (
            <li key={bid.id}>
              <BidDetails {...bid}
              onDeleteClick={onBidDeleteClick} />
            </li>
          ))
        }
    </ul>

  );
}

export {BidList};
