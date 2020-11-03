import React from 'react';

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import ToDoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import AddItem from '../add-item'
import './app.css';

export default class App extends React.Component {

  maxId = 100;
  
  state = {
    todoData:[
      this.greateTodoItem('drink Coffee'),
      this.greateTodoItem('bild react app'),
      this.greateTodoItem('have a lanch')
    ],
    term: '',
    filter: 'all'
  };

  
   
  greateTodoItem(label) {
    return {
          id: this.maxId++,
          label,
          done: false,
          important: false,
    }
  }

  deleteItem = (id) => {
   this.setState(({ todoData }) => {
      
      const idx = todoData.findIndex((el)=> el.id === id);
      
      const newArr = [
        ... todoData.slice(0, idx), 
        ... todoData.slice(idx + 1)
      ];
      
      return { 
        todoData: newArr,
      }
   }); 
  };
   
  addNewItem = (text) => {
    this.setState(({todoData}) => {
      const newArr = todoData.slice();
      const last =  todoData[todoData.length - 1];

      if (last === undefined) {
        const newEl = {
          id: 0,
          label: text,
          done: false,
          important: false,
         };
         newArr.push(newEl);
      } else { 
        const id = last.id + 1;
        const newEl = {
          id: id,
          label: text,
          done: false,
          important: false,
         };
         newArr.push(newEl);
      }

    
      return {
        todoData: newArr
      }
    })
  }

toggleProperty (arr, id, propName) {
  const idx = arr.findIndex((el)=> el.id === id);
      const oldItem = arr[idx];
      const newItem = {... oldItem, [propName]: !oldItem.[propName]};
      
      return  [
        ... arr.slice(0, idx), 
        newItem,
        ... arr.slice(idx + 1)
      ];
}
 
  onToggleImportant = (id) => {
    
    this.setState(({ todoData })=> {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        }
      });

  };
  

  onToggleDone = (id) => {
    this.setState(({ todoData })=> {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  search (items, term) {
    return  items.filter((item)=> {
      if(item.label.toLowerCase().includes(term)) {
        return true
      }
    })
  }

  searchHandle = (evt) => {
    const target = evt.target.value.toLowerCase();
    this.setState(() => {
      const newTerm = target;
      return {
        term: newTerm
      }
    })
  };

  filterhHandle = (name) => {
    this.setState(() => {
      const newFilter = name;
      return {
        filter: newFilter
      }
    })
  };

  filter (items, filter) {
    switch(filter) {
       case 'all':
         return items;
       case 'active':
         return items.filter((item)=> !item.done);
       case 'done': 
         return items.filter((item)=> item.done);
       default: 
         return items;

    };
  }

  
  render() {

    const { todoData, term, filter } = this.state;

    const doneCount = todoData.
                      filter((el)=> el.done).length;

    const todoCount = todoData.length - doneCount;   
    
    const visibleItems = this.filter(
      this.search(todoData,term),filter);

    return (
      <div className="todo-app">
       <AppHeader toDo={todoCount} done={doneCount} />
       <div className="top-panel d-flex">
         <SearchPanel searchHandle={ this.searchHandle }/>
         <ItemStatusFilter 
         filter={this.state.filter}
         filterhHandle={this.filterhHandle} />
       </div>
 
       <ToDoList 
         todos={ visibleItems } 
         onDeleted={ this.deleteItem }
         onToggleDone={ this.onToggleDone }
         onToggleImportant={ this.onToggleImportant }
         />
         <AddItem addNewItem = { this.addNewItem }/>
     </div>
   );
 };
  }
  

