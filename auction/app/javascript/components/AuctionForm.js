import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// import 'node_modules/react-datepicker/src/stylesheets/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';

class AuctionForm extends Component {
  constructor(props) {
    super(props)
    const {
      auction = {},
      onSubmit = () => {},
      onChange = () => {},
      errors = []
    } = props;

    this.state = {
      startDate: moment()
    };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit();

  };

  handleChange = name => event => {
    this.props.onChange(
      {[name]: event.currentTarget.value});
    this.setState({
      startDate: this.props.auction.ends_on
    });
  };

  renderError = () => this.props.errors.length > 0 ? (
    <ul>{
      this.props.errors
        .filter(e => e.field === 'auction')
        .map(e => <li>{e.message}</li>)
    }</ul>
  ) : (
    null
  );


  render() {
    return (
    <form
      className="AuctionForm"
      onSubmit={this.handleSubmit}
    >
      <div>
        <label htmlFor="title">Title</label> <br />
        <input
          onChange={this.handleChange("title")}
          value={this.props.auction.title}
          name="title"
          id="title"
        />
      </div>

     <div>
       <label htmlFor="details">Details</label> <br />
       <textarea
         onChange={this.handleChange("details")}
         value={this.props.auction.details}
         name="details"
         id="details"
       />
     </div>

     <div>
       <label htmlFor="ends_on">Ends On</label> <br />
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
       />
        <input
         onChange={this.handleChange("startDate")}
         value={this.props.auction.ends_on}
         name="ends_on"
         id="ends_on"
       />
     </div>

     <div>
       <label htmlFor="reserve_price">Reserve Price</label> <br />
       <input
         onChange={this.handleChange("reserve_price")}
         value={this.props.auction.reserve_price}
         name="reserve_price"
         id="reserve_price"
       />
     </div>

      { this.renderError() }

      <div>
        <input type="submit" value="Save"/>
      </div>
    </form>
  );
  }
}

export {AuctionForm};
