import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

export default class MyStatefulEditor extends Component {
  /*
  static propTypes = {
    onChange: PropTypes.func
  };
  */

  constructor(props) {
    super(props); 
    console.log(props.title);

  }

  onChange(value){
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }

  };

  render () {
    return (
      <RichTextEditor
        placeholder="Type the title"
        value={RichTextEditor.createValueFromString(this.props.title, 'html')}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}