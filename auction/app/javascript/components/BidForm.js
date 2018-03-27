import React from 'react';

function BidForm (props) {
  const {
    bid = {
      price: 0
    },
    onSubmit = () => {},
    onChange = () => {},
    errors = []
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    console.log('handle Submit')
    onSubmit();

  };

  const handleChange = name => event => {
    onChange({[name]: event.currentTarget.value
    });
  };

  const renderError = () => errors.length > 0 ? (
    <ul>{
      errors
        .filter(e => e.field === 'bid')
        .map(e => <li>{e.message}</li>)
    }</ul>
  ) : (
    null
  );

  return (
    <form
      className="BidForm"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          onChange={handleChange("bid")}
          value={bid.bid}
          name="bid"
          type="number"
          id="bid"
        /> <input type="submit" value="Bid"/>
      </div>
      { renderError() }
    </form>
  );
}

export {BidForm};
