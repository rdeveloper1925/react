import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  //state only valid for components that extend component
  state={
    persons:[
      {id:1,name:"Rick", age:30},
      {id:2,name:"Daisy", age:90},
      {id:3,name:"Stephany",age:90}
    ],
    showPersons:false
  };
  

  nameChangedHandler=(event,id)=>{
    const personIndex=this.state.persons.find((p=>{
      return p.id===id;
    }));
    const person={...this.state.persons[personIndex]};

    person.name=event.target.value;
    const persons=[...this.state.persons];//creating new copy
    persons[personIndex]=person;
    this.setState({persons:persons});
  }

  deletePersonHandler=(personIndex)=>{
    const persons=[...this.state.persons];//spreading the array
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  togglePersonsHandler=()=>{
    const current=this.state.showPersons;
    this.setState({showPersons:!current});
  }


  render() {
    const style={
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding:'8px'
    }
    
    
    let persons=null;

    if(this.state.showPersons){      
      persons=(
        <div>
          {this.state.persons.map((person,index)=>{
            return <Person 
                    click={()=>this.deletePersonHandler(index)} 
                    name={person.name} 
                    age={person.age}
                    changed={(event)=>this.nameChangedHandler(event,person.id)}
                    key={person.id}/>
          })}
        </div>
        
      );
      style.backgroundColor='red';
    }else{
      persons=(<div>Click to toggle persons</div>)
    }

    let classes=['bold','red'];
    if(this.state.persons.length<=2){
      classes.push('red'); //clsasse will be red
    }
    if(this.state.persons.length<=1){
      classes.push('bold','red');
    }

    return (
      <div className="App">
        <h1>Hi I'm a react app</h1>
        <p className={classes.join(' ')}>Aperntly working</p>
        <button style={style} 
        onClick={this.togglePersonsHandler}>Show/Hide persons</button>
        {persons};
      </div> 
    );
  }
}

export default App;
