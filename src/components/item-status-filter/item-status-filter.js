import React from 'react';

import './item-status-filter.css';


export  default class ItemStatusFilter  extends React.Component {  
  
        buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'}, 
    {name: 'done', label: 'Done'}
  ]

  render () {

   const { filter,filterhHandle } =  this.props;   

   const buttons = this.buttons.map((buttons)=> {
        const {name, label} = buttons;
        const isActive = filter === name;
        const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

         return   ( 
                   <button key= {name}
                    type="button"
                    className= {`btn ${clazz}`}
                    onClick={()=>filterhHandle(name)}> {label} 
                   </button>
         )
     });
    
     return (
               <div className="btn-group">
                 {buttons} 
               </div>
       );
        }


}
 

