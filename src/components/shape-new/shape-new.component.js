import React from 'react';
import './shape-new.styles.css';

// axios
import axios from 'axios';

// Components
import FormInput from '../form-input/form-input.component';
import Spinner from '../spinner/spinner.component';

// Alerts
import Swal from 'sweetalert2'

class ShapeNew extends React.Component {
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

	handleClick = i => {
		const newpositionsWinner  = this.state.positionsWinner;
		newpositionsWinner[i] = !newpositionsWinner[i];
		this.setState({ positionsWinner: newpositionsWinner });
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name] : value });
	}

	handleSelectChange = (event) => {
    this.setState({
      idFigureGroup: event.target.value
    })
  }

	fetchGroupFigures() {
		var config = {
			method: 'get',
			url: `https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/groupfigure`,
			headers: { 
				'content-type': 'application/json',
				'Authorization': localStorage.getItem('token'),
			}
		};
		
		axios(config)
		.then(response => {
			this.setState({ 
				groupFigures : response.data.data,
				loading: false
			});
		})
		.catch(function (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error de autenticación',
			}).then((result) => {
				if (result.value) {
					window.location.href = "/";
				}
			})
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		const	{ figureName, idFigureGroup, positionsWinner } = this.state;

		const data = JSON.stringify({
			"figureName": figureName,
			"idFigureGroup": idFigureGroup,
			"positions": positionsWinner
		});

		const config = {
			method: 'post',
			url: 'https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/figure',
			headers: { 
				"content-type": "application/json",
				'Authorization': localStorage.getItem('token'),
			},
			data : data
		};

		axios(config)
		.then(response => {
			Swal.fire({
				icon: 'success',
				text: 'Figura creada exitosamete',
			}).then((result) => {
				if (result.value) {
					window.location.href = "/dashboard/shapes";
				}
			})
		})
		.catch(error => {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Error de autenticación',
			}).then((result) => {
				if (result.value) {
					window.location.href = "/";
				}
			})
		});
	}

	componentDidMount() {
		this.fetchGroupFigures();
	}

	render() {
		if (this.state.loading) {
			return (
				<Spinner />
			);
		} else {
			const { positionsWinner, figureName, groupFigures } = this.state;
			return (
				<div >
						<form className="shape-new" onSubmit={this.handleSubmit}>
							<div className="shape-new__input">
								<label htmlFor="inputState">Grupo</label>
								<select onChange={this.handleSelectChange} required id="inputState" className="form-control">
									<option value="">Elegir Grupo</option>
									{groupFigures.map((ele, i) => <option key={ele.id} value={ele.id}>{ele.name}</option>)}
								</select>
							</div>
							<div className="shape-new__input">
								<FormInput 
									name='figureName'  
									type='text' 
									value={figureName} 
									onChange={this.handleChange}
									label='Nombre figura'
									required 
								/>
							</div>
							<div className='shape-item'>
								<div className='shape-item__name'>{figureName}</div>
								<div className='shape-item__grid'>
									<div className='shape-item__grid-container'>
										{
											positionsWinner.map((pos, i) => {
												if (pos) {
													return (<div key={i} onClick={() => this.handleClick(i)} className="shape-item__value active"></div>);
												} else {
													return (<div key={i} onClick={() => this.handleClick(i)} className="shape-item__value"></div>);
												}
											})
										}
									</div>
								</div>
							</div>
							<button type='submit' className='btn btn-primary btn-lg btn-block'>Crear</button>
						</form>
				</div>
			);
		}
	}
}

export default ShapeNew;