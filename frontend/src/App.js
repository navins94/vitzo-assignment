import { Route, Switch } from 'react-router-dom';
import './App.css';
import ListUsers from './pages/ListUsers';
import AddEditUser from './pages/AddEditUser';
import Header from './components/header/Header';

function App() {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route exact path="/" component={ListUsers} />
				<Route exact path="/add-user" component={AddEditUser} />
				<Route exact path="/edit-user/:id" component={AddEditUser} />
			</Switch>
		</div>
	);
}

export default App;
