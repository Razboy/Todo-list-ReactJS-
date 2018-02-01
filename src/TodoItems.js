import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class TodoItems extends Component {
    constructor(props, context) {
      super(props, context);

      this.createTasks = this.createTasks.bind(this);
    }

    _handleDelete(id) {
      this.props._handleDelete(id);
    }

    searchDelete(id) {
      this.props.searchDelete(id);
    }

    swapUp(id) {
      this.props.swapUp(id);
    }

    swapDown(id) {
      this.props.swapDown(id);
    }

    createTasks(value,i) {
      var now = moment();
      return <li key={value.key}>{value.text}
        <span className="posted-date">{now.format('MMMM DD YYYY')}</span>
        {
          this.props.input_val !== '' ? null:
              <div>
                <button onClick={() => this.swapUp(i)} className="up-button">&#9652;</button>
                <button onClick={() => this.swapDown(i)} className="down-button">&#9662;</button>
              </div>
        }
        {
          this.props.input_val !== ''?
          <button onClick={() => this.searchDelete(value.key)} className="close-button">&#10008;</button>:
          <button onClick={() => this._handleDelete(value.key)} className="close-button">&#10008;</button>
        }
      </li>
    }

    render() {
      var todoEntries=[];
      if(this.props.input_val.length!==0){
        todoEntries = this.props.searchEntries;
      }else {
        todoEntries = this.props.entries;
      }
      var listItems = todoEntries.map(
        (value,i)=>this.createTasks(value,i)
      );

      return (
        <ul className="theList">
            {listItems}
        </ul>
      );
    }
  };

  export default TodoItems;
