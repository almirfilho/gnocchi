import React from 'react';
import GnocchiIcon from './icon';
import propsfilter from '../helpers/propsfilter';
import keys from '../helpers/keycodes';


export default class GnocchiSelect extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
      focusedOption: null,
      selectedOption: this.getOptionIndex(props.selected)
    };
  }

  getOptionValue(option){
    return option.value === undefined ? option : option.value;
  }

  getOptionLabel(option){
    return option.label === undefined ? option : option.label;
  }

  getOptionIndex(str){
    if(str){
      let idx = this.props.options.findIndex(o => o === str || o.value === str);
      if(idx !== -1) return idx;
    }

    return null;
  }

  isValidOption(optionIndex){
    return optionIndex >= 0 && optionIndex < this.props.options.length;
  }

  onkeydown(event){
    let key = event.which;

    if(key === keys.ESC || key === keys.UP || key === keys.DOWN ||
       key === keys.ENTER || key === keys.SPACE){

      if(this.state.open){
        if(key === keys.ESC) this.close();
        else if(key === keys.UP) this.focusPrev();
        else if(key === keys.DOWN) this.focusNext();
        else if(key === keys.ENTER || key === keys.SPACE)
          this.selectOption(this.state.focusedOption);
      } else if(key === keys.DOWN || key === keys.ENTER || key === keys.SPACE){
        this.open();
      }

      event.preventDefault();
    }
  }

  open(){
    if(!this.state.open) this.setState({ open: true });
  }

  close(){
    if(this.state.open){
      this.setState({ open: false });
      this.unfocusOption();
    }
  }

  toggle(){
    this.state.open ? this.close() : this.open();
  }

  focusPrev(){
    if(this.state.focusedOption > 0)
      this.focusOption(this.state.focusedOption - 1);
    else if(this.props.empty)
      this.focusOption('empty');
  }

  focusNext(){
    if(this.state.focusedOption === null)
      this.props.empty ? this.focusOption('empty') : this.focusOption(0);
    else if(this.state.focusedOption === 'empty')
      this.focusOption(0);
    else if(this.state.focusedOption < this.props.options.length - 1)
      this.focusOption(this.state.focusedOption + 1);
  }

  focusOption(optionIndex){
    if(this.isValidOption(optionIndex) || optionIndex === null || optionIndex === 'empty')
      this.setState({ focusedOption: optionIndex });
  }

  unfocusOption(){
    this.setState({ focusedOption: null });
  }

  selectOption(optionIndex){
    if(this.isValidOption(optionIndex) || optionIndex === null || optionIndex === 'empty'){
      this.triggerChange(this.state.selectedOption, optionIndex);
      this.setState({ selectedOption: optionIndex });
      this.close();
    }
  }

  triggerChange(oldOptionIndex, newOptionIndex){
    if(this.props.onChange && oldOptionIndex !== newOptionIndex){
      let selectedValue = null;

      if(newOptionIndex !== null){
        let selected = this.props.options[newOptionIndex];
        selectedValue = this.getOptionValue(selected);
      }

      this.props.onChange(selectedValue);
    }
  }

  render(){
    const otherAttrs = propsfilter(this.props, GnocchiSelect.propTypes);
    let className = 'gnocchi-select';
    if(this.state.open) className += ' gnocchi--is-open';

    return (
      <div {...otherAttrs}
        className={className}
        tabIndex='0'
        onBlur={this.close.bind(this)}
        onKeyDown={this.onkeydown.bind(this)}
        onMouseLeave={this.unfocusOption.bind(this)}>
        <div className='gnocchi-text' onClick={this.toggle.bind(this)}>
          <div className='gnocchi-select-display'>
            {this.renderDisplay(this.state.selectedOption)}
          </div>
          <div className='gnocchi-select-button'>
            <GnocchiIcon type={this.state.open ? 'arrow-up' : 'arrow-down'}/>
          </div>
        </div>
        <ul className='gnocchi-select-list'>
          {this.renderEmptyOption(this.props.empty)}
          {this.props.options.map(this.renderOption.bind(this))}
        </ul>
      </div>
    );
  }

  renderDisplay(optionIndex){
    let selected = this.props.options[optionIndex];
    if(selected) return this.getOptionLabel(selected);
    return <span className='gnocchi-placeholder'>{this.props.placeholder}</span>;
  }

  renderOption(option, i){
    let className = 'gnocchi-select-option';
    if(i === this.state.focusedOption) className += ' gnocchi--is-focused';
    if(i === this.state.selectedOption) className += ' gnocchi--is-selected';

    return (
      <li
        key={i}
        className={className}
        data-value={this.getOptionValue(option)}
        onMouseEnter={this.focusOption.bind(this, i)}
        onClick={this.selectOption.bind(this, i)}>
        {this.getOptionLabel(option)}
        {i === this.state.selectedOption ? <GnocchiIcon type='check'/> : ''}
      </li>
    );
  }

  renderEmptyOption(emptyOption){
    if(emptyOption){
      let className = 'gnocchi-select-option gnocchi-select-option-empty';
      if(this.state.focusedOption === 'empty')
        className += ' gnocchi--is-focused';

      return (
        <li
          className={className}
          onMouseEnter={this.focusOption.bind(this, 'empty')}
          onClick={this.selectOption.bind(this, null)}>
          {emptyOption}
        </li>
      );
    }
  }
}

GnocchiSelect.propTypes = {
  empty: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  placeholder: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  options: React.PropTypes.arrayOf(
    React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.shape({
        value: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ]),
        label: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ])
      })
    ])
  )
};

GnocchiSelect.defaultProps = {
  empty: false,
  options: [],
  placeholder: 'Select something'
};
