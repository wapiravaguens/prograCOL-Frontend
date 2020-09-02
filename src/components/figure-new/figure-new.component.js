import React from 'react';
import './figure-new.styles.css';

// Service
import { authorizedRequest } from '../../service/API';

// Components
import FormInput from '../form-input/form-input.component';
import FigureItem from '../figure-item/figure-item.component';
import Spinner from '../spinner/spinner.component';

// Alerts
import Swal from 'sweetalert2'

class FigureNew extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			figureName: "",
			idFigureGroup: 0,
			groupFigures: [],
			positionsWinner: Array(25).fill(false),
			loading: true,
		}
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name] : value });
	}

	handleSelectChange = event => {
    this.setState({ idFigureGroup: event.target.value })
	}
	
	handleClick = i => {
		const newpositionsWinner  = this.state.positionsWinner;
		newpositionsWinner[i] = !newpositionsWinner[i];
		this.setState({ positionsWinner: newpositionsWinner });
	}

	handleSubmit = async event => {
		event.preventDefault();
		const	{ figureName, idFigureGroup, positionsWinner } = this.state;
		const data = JSON.stringify({
			"figureName": figureName,
			"idFigureGroup": idFigureGroup,
			"positions": positionsWinner
		});

		try {
			await authorizedRequest('game', 'post', `figure`, data);
			Swal.fire({ icon: 'success', text: 'Figura creada exitosamete' })
			.then(result => { 
				if (result.value) window.location.href = "/dashboard/figures"
			})
		} catch (error) {
			Swal.fire({ icon: 'error', title: 'Oops...', text: 'Error de autenticación'})
			.then(result => { 
				if (result.value) window.location.href = "/";
			});
		}

	}

	async fetchGroupFigures() {
		try {
			const response = await authorizedRequest('game', 'get', `groupfigure`);
			this.setState({ 
				groupFigures : response.data.data,
				loading: false
			});
		} catch (error) {
			Swal.fire({ icon: 'error', title: 'Oops...', text: 'Error de autenticación'})
			.then(result => { 
				if (result.value) window.location.href = "/";
			});
		}
	}

	componentDidMount() {
		this.fetchGroupFigures();
	}

	render() {
		if (this.state.loading) {
			return <Spinner />
		} else {
			const { positionsWinner, figureName, groupFigures } = this.state;
			return (
				<div className='figure-new'>
					<form className="figure-new__form" onSubmit={this.handleSubmit}>

						<div className="figure-new__input">
							<label htmlFor="inputState">Grupo</label>
							<select onChange={this.handleSelectChange} required id="inputState" className="form-control">
								<option value="">Elegir Grupo</option>
								{groupFigures.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
							</select>
						</div>

						<div className="figure-new__input">
							<FormInput 
								name='figureName'  
								type='text' 
								value={figureName} 
								onChange={this.handleChange}
								label='Nombre figura'
								required 
							/>
						</div>

						<FigureItem item={{name: figureName, positionsWinner: positionsWinner}} handleClick={this.handleClick} />

						<button type='submit' className='btn btn-primary btn-lg btn-block'>Crear</button>
						
					</form>
				</div>
			);
		}
	}
}

export default FigureNew;