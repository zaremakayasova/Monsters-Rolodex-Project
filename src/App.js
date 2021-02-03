import React, { Component } from "react";
import './App.css';

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    // In React, constructors are mainly used for two purposes: 
    // It used for initializing the local state of the component by assigning an object to this.state. 
    // It used for binding event handler methods that occur in your component.
    super();
    // super(); this is bound to lifecycle methods when we call super.
    // React has a very weird interaction with classes. 
    // You don't need to use super and you will be fine to just use arrow functions all the time.
    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value })
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
    monster.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
        placeholder="search monsters"
        handleChange= {this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}


export default App;
