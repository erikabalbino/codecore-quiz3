import React from 'react';
import {Field} from './Field';

function BidDetails (props) {
  const {onDeleteClick = () => {}} = props;
  return (
    <div className="BidDetails">
      <p>
        {props.bid} <Field name="at" value={props.created_at} />
      </p>
      <button onClick={() => onDeleteClick(props.id)}>
        Delete
      </button>
    </div>
  );
}

export {BidDetails};
