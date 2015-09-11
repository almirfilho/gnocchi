/* global require, module, console */

var React = require('react');

var GnocchiSelect = React.createClass({
  getDefaultProps: function(){
    return {
      options: []
    };
  },

  getInitialState: function(){
    return {
      open: false,
      focusedOption: null,
      selectedOption: null
    };
  },

  onkeydown: function(event){
    if(this.state.open){
      switch(event.which){
        case 27: this.close();  break; // esc
        case 38: this.up();     break; // up arrow
        case 40: this.down();   break; // down arrow
        case 13:                       // enter
        case 32: this.select(this.state.focusedOption); break; // space
      }
    } else if([40, 13, 32].indexOf(event.which) !== -1){ // down, enter, space
      this.open();
    }

    if([27, 38, 40, 13, 32].indexOf(event.which) !== -1){
      event.preventDefault();
    }
  },

  open: function(){
    if(!this.state.open) this.setState({open: true});
  },

  close: function(){
    if(this.state.open){
      this.setState({open: false});
      this.focus(null);
    }
  },

  up: function(){
    if(this.state.focusedOption > 0){
      this.focus(this.state.focusedOption - 1);
    }
  },

  down: function(){
    var newFocusedOption = this.state.focusedOption;

    if(this.state.focusedOption === null){
      newFocusedOption = 0;
    } else if(this.state.focusedOption < this.props.options.length - 1){
      newFocusedOption++;
    }

    this.focus(newFocusedOption);
  },

  focus: function(optionIndex){
    this.setState({focusedOption: optionIndex});
  },

  select: function(optionIndex){
    this.setState({selectedOption: optionIndex});
    this.close();
  },

  render: function(){
    var className = 'gnocchi-select';
    if(this.state.open) className += ' gnocchi--is-open';

    var iconClassName = 'gnocchi-icon gnocchi-icon-arrow-';
    iconClassName += this.state.open ? 'up' : 'down';

    return (
      <div
        className={className}
        tabIndex='0'
        onKeyDown={this.onkeydown}
        onMouseLeave={this.focus.bind(this, null)}
        onBlur={this.close}>
        <div className='gnocchi-text' onClick={this.open}>
          <div className='gnocchi-select-display'>
            {this.renderDisplay(this.state.selectedOption)}
          </div>
          <div className='gnocchi-select-button'>
            <i className={iconClassName}></i>
          </div>
        </div>
        <ul className='gnocchi-select-options'>
          {this.props.options.map(this.renderOption)}
        </ul>
      </div>
    );
  },

  renderDisplay: function(optionIndex){
    var selected = this.props.options[optionIndex];
    return selected ? (selected.label || selected) : <span>placeholder</span>;
  },

  renderOption: function(option, i){
    var className = 'gnocchi-select-option';
    var checkIcon = '';

    if(i === this.state.focusedOption) className += ' gnocchi--is-focused';

    if(i === this.state.selectedOption){
      className += ' gnocchi--is-selected';
      checkIcon = <i className='gnocchi-icon gnocchi-icon-check'></i>;
    }

    return (
      <li
        className={className}
        data-value={option.value || option}
        onMouseEnter={this.focus.bind(this, i)}
        onClick={this.select.bind(this, i)}>
        {checkIcon}
        {option.label || option}
      </li>
    );
  }
});

module.exports = GnocchiSelect;
