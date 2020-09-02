import React from 'react';
import './groups.styles.css';

// Service
import { authorizedRequest } from '../../service/API';

// Pagination
import ReactPaginate from 'react-paginate';
import Spinner from '../../components/spinner/spinner.component';

// Alerts
import Swal from 'sweetalert2'

class Groups extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			content: [],
			perPage: 9,
			currentPage: 0,
			pageCount: undefined,
			loading: true,
		};
	}

	async receivedData() {
		const { perPage, currentPage } = this.state;

		try {
			const response = await authorizedRequest('game', 'get', `groupfigure/paged?size=${perPage}&page=${currentPage}`);
			this.setState({ 
				pageCount : response.data.data.totalPages,
				content : response.data.data.content,
				loading : false
			});
		} catch (error) {
			Swal.fire({ icon: 'error', title: 'Oops...', text: 'Error de autenticación'})
			.then(result => { 
				if (result.value) window.location.href = "/";
			})
		}
	}

	handlePageClick = e => {
		this.setState({ currentPage: e.selected }, () => {
			this.receivedData()
		});
	};

	componentDidMount() {
		this.receivedData();
	}

	render() {
		if (this.state.loading) {
			return <Spinner />
		} else {
			const { content, pageCount } = this.state;
			return (
				<div>

					<div className='groups'>
						<table className="table">
							<thead className="thead-light">
								<tr>
									<th scope="col">Nombre</th>
									<th scope="col">Oportunidad</th>
									<th scope="col">Cerrar al lanzar</th>
								</tr>
							</thead>
							<tbody>
								{
									content.map(element => {
										return (
											<tr key={element.id}>
												<th scope="row">{element.name}</th>
												<td>{element.opportunity}</td>
												<td>{element.closeAt}</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>

					<div className='pagination-container'>
						<ReactPaginate
							previousLabel={"<"}
							nextLabel={">"}
							breakLabel={"..."}
							breakClassName={"break-me"}
							pageCount={pageCount}
							marginPagesDisplayed={1}
							pageRangeDisplayed={2}
							onPageChange={this.handlePageClick}
							containerClassName={"pagination"}
							subContainerClassName={"pages pagination"}
							activeClassName={"active"}
						/>
					</div>

				</div>
			);
		}
	}
}

export default Groups;