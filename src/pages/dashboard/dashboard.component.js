import React from 'react';
import './dashboard.styles.css';

// react-router-dom
import { Switch, Route, Link } from 'react-router-dom';

// Components
import Profile from '../profile/profile.component';
import Shapes from '../shapes/shapes.components';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			toggled: false
		}
	}

	toggle = (event) => {
		event.preventDefault();
		this.setState((prevState) => ({
			toggled: !prevState.toggled
		}))
	}

	logout = (event) => {
		event.preventDefault();
		localStorage.removeItem('token');
		window.location.href = "/";
	}

	render() {
		const { match } = this.props;
		const { toggled } = this.state;
		return (
			<div className={`d-flex ${toggled ? 'toggled' : ''}`} id='wrapper'>

				<div className='bg-light border-right' id='sidebar-wrapper'>
					<div className='sidebar-heading'>Bingo</div>
					<div className='list-group list-group-flush'>
						<Link to={`${match.url}`} className='list-group-item list-group-item-action bg-light'>Tablero</Link>
						<Link to={`${match.url}/profile`} className='list-group-item list-group-item-action bg-light'>Perfil</Link>
						<Link to={`${match.url}/shapes`} className='list-group-item list-group-item-action bg-light'>Figuras</Link>
					</div>
				</div>

				<div id='page-content-wrapper'>
					<nav class='navbar navbar-light bg-light'>
						<button onClick={this.toggle} class='navbar-toggler' type='button' data-toggle='collapse'>
							<span class='navbar-toggler-icon'></span>
						</button>
						<button onClick={this.logout} className='btn btn-primary'>Salir</button>
					</nav>
					<div className='container-fluid'>
						<Switch>
							<Route exact path={`${match.path}/profile`} component={Profile} />
							<Route exact path={`${match.path}/shapes`} component={Shapes} />
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;