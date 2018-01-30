import React, { Component } from 'react';
import TodoItems from "./TodoItems";
import './App.css';

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      searchItems:[],
      searchInput:''
    };
    this.addItem = this.addItem.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this.swapUp = this.swapUp.bind(this);
    this.swapDown = this.swapDown.bind(this);
    this.filterList = this.filterList.bind(this);
  }

  _handleDelete(id){
    let newItems = this.state.items.filter((el)=> el.key !== id);
    this.setState({items:newItems})
    localStorage.setItem('todos', JSON.stringify(newItems));
  }

  swapUp(id) {
    let idUp = id;
    let temp;
    let newItems = this.state.items;
    if (idUp > 0 && idUp < newItems.length) {
      temp = newItems[idUp];
      newItems[idUp] = newItems[idUp-1];
      newItems[idUp-1] = temp;
    }
    this.setState({
      items:newItems
    })
    localStorage.setItem('todos', JSON.stringify(newItems));
  }

  swapDown(id) {
    let idDown = id;
    let temp;
    let newItems = this.state.items;
    if (idDown < newItems.length-1) {
      temp = newItems[idDown];
      newItems[idDown] = newItems[idDown+1];
      newItems[idDown+1] = temp;
    }
    this.setState({
      items:newItems
    })
    localStorage.setItem('todos', JSON.stringify(newItems));
  }

  filterList(e){
    let input_val = e.target.value;
    let items = this.state.items;
    let searchResult = items.filter(function(el){
        let club_arr = el.text;
        let res = club_arr.indexOf(input_val) !== -1;
        return res;
      });
      console.log(searchResult)
    this.setState({
      searchItems:searchResult,
      searchInput:input_val
    });
    console.log(searchResult);
  }

  addItem(e) {
    var itemArray = this.state.items;

   if (this._inputElement.value !== "") {
    itemArray.unshift(
      {
        // swap
        
        text: this._inputElement.value,
        key: Date.now()
      }
    );
    this.setState({
      items: itemArray
    });

    this._inputElement.value = "";
  }
    console.log(itemArray);
    e.preventDefault();
    localStorage.setItem('todos', JSON.stringify(itemArray));
  }

  componentDidMount() {
    let localItems = localStorage.getItem('todos');
    if(JSON.parse(localStorage.getItem('todos')) != null){
      if(window.confirm("Do You wanna to restore your tasks?")){
        this.setState({items:JSON.parse(localItems)});
      }else{
        localStorage.clear();
      }   
    }
  }

  render() {
    return (
      <div className="todoListMain">
            <h1>TODO LIST</h1>
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a}
              placeholder="Enter some task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <div className="filter-list">
          <input type="text" placeholder="Search" onChange={this.filterList}/>
        </div>
        <TodoItems swapDown={this.swapDown}
        swapUp={this.swapUp} 
        _handleDelete={this._handleDelete} 
        input_val = {this.state.searchInput}
        entries={this.state.items} searchEntries={this.state.searchItems}
        />
      </div>
    );
  }
}

export default TodoList;
