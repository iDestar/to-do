import { render } from '@testing-library/react';
import React from 'react';

import './add-item.css';

export default class AddItem extends React.Component {

    state = {
        label: 'to do',
    };
     
    onLabelChange = (evt)=> {
      this.setState({
          label: evt.target.value
      });   
    };
    onSubmit = (evt)=> {
       evt.preventDefault()
       this.props.addNewItem(this.state.label);
    };
    render () {
        return (
        <form className="add-item d-flex"
        onSubmit={this.onSubmit}>
            <input type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="to do"
                    value={this.state.label}/>
          <button 
           className="btn btn-outline-secondary"> 
          Add 
          </button>
         </form>
        );
    };
};
