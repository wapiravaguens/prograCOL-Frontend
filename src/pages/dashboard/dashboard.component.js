import React from 'react';
import './dashboard.styles.css';

// react-router-dom
import { Switch, Route, Link } from 'react-router-dom';

// Components
import Profile from '../profile/profile.component';
import Figures from '../figures/figures.components';
import FigureNew from '../../components/figure-new/figure-new.component';
import Groups from '../groups/groups.components';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			toggled: false
		}
	}

	toggle = event => {
		event.preventDefault();
		this.setState((prevState) => ({ toggled: !prevState.toggled }));
	}

	logout = event => {
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
						<Link to={`${match.url}`} className='list-group-item list-group-item-action bg-light'>
							<ion-icon name="person"></ion-icon> Perfil
						</Link>
						<Link to={`${match.url}/figures`} className='list-group-item list-group-item-action bg-light'>
							<ion-icon name="triangle"></ion-icon> Figuras
						</Link>
						<Link to={`${match.url}/groups`} className='list-group-item list-group-item-action bg-light'>
							<ion-icon name="layers"></ion-icon> Grupos
						</Link>
					</div>
				</div>

				<div id='page-content-wrapper'>
				
					<nav className='navbar navbar-light bg-light'>
						<button onClick={this.toggle} className='navbar-toggler' type='button' data-toggle='collapse'>
							<span className='navbar-toggler-icon'></span>
						</button>
						<button onClick={this.logout} className='btn btn-primary'>Salir</button>
					</nav>

					<div className='container-fluid'>
						<Switch>
							<Route exact path={`${match.path}`} component={Profile} />
							<Route exact path={`${match.path}/figures`} component={Figures} />
							<Route exact path={`${match.path}/groups`} component={Groups} />
							<Route exact path={`${match.path}/figures/new`} component={FigureNew} />
						</Switch>
					</div>
					
				</div>

			</div>
		);
	}
}

export default Dashboard;