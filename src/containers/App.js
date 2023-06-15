import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            searchfield: ''
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ users: users}))
    }
    // If you don't turn the function below into a function
    // with '=' and '=>', 'this' will mean the input instead of this object.
    onSearchChange = (event) => {
        // If you want to set a state (update it) in React, you always
        // have to use the 'this.setState' React method.
        this.setState({ searchfield: event.target.value })
    }
    render() {
        const { users, searchfield } = this.state;
        const filteredUsers = users.filter(user => {
            return user.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !users.length ?
        <h1 className='tc'>Loading...</h1> :
        (
                <div className='tc container'>
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList users={filteredUsers}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
        );
        
    }
}

export default App;