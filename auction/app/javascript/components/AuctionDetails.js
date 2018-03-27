import React from 'react';
import {Field} from './Field';

function AuctionDetails (props = {}) {
  const {author = {}} = props;
  const containerStyle = {
  paddingLeft: "10px"
}
  const priceMet = () => (props.reserve_price <= props.bid) ? (
    <h4>Reserve Price ok! </h4>
) : (
  <p>Reserve Price not ok! </p>
);

  return (
    <div className="AuctionDetails">
      <div className="minValue"
        style={{
          float: 'right'
        }} >
        <h4>Current Price ${props.reserve_price + (0.10*props.reserve_price)}</h4>
      </div>
      <h2> {props.title} </h2>
      <div style={containerStyle}>
        <p>{props.details}</p>
        <Field name="Ends on: " value={props.ends_on}/>
      </div>
      <div className="status"
        style={{
          float: 'right'
        }} >
        {priceMet()}
      </div>
    </div>
  );
}

export {AuctionDetails};
