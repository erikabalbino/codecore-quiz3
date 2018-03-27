import {BASE_URL} from './config';

function getJwt () {
  return `JWT ${localStorage.getItem('jwt')}`;
}

// HTTP REQUESTS

export const Bid = {
  all (auctionId) {
    return fetch(
      `${BASE_URL}/api/v1/auction1s/${auctionId}/bids`,
      {
        headers: {
          'Authorization': getJwt()
        }
      }
    )
    .then(res => res.json())
  },
  get (id) {
    return fetch(
      `${BASE_URL}/api/v1/bids/${id}`,
      {
        headers: {
          'Authorization': getJwt()
        }
      }
    )
      .then(res => res.json())
  },
  create (auctionId, params) {
    // console.log(auctionId)
    return fetch(
      `${BASE_URL}/api/v1/auction1s/${auctionId}/bids`,
      {
        method: 'POST',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
    .then(res => res.json());
  }
}
