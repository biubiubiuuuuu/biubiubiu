/**
 * Created by Nemo on 15/12/19.
 */

let React = require('react');
let DanmuContoller = React.createClass({
  getInitialState: function () {
    return {value: 'Hello!'};
  },
  send: function () {
    console.log(this.state);
  },
  handleChange: function (event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return <div>
      <input type="text" value={value} onChange={this.handleChange}/>
      <button onclick={this.send}></button>
    </div>
  }
});

module.exports = DanmuContoller;