import React from 'react';
import './shapes.styles.css';

// Service
import { authorizedRequest } from '../../service/API';

// Pagination
import ReactPaginate from 'react-paginate';

// Components
import ShapeItem from '../../components/shape-item/shape-item.component';
import Spinner from '../../components/spinner/spinner.component';

// Alerts
import Swal from 'sweetalert2'

class Shapes extends React.Component {
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
			const response = await authorizedRequest('game', 'get', `figure/paged?size=${perPage}&page=${currentPage}`);
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

	handleAddShape = event => {
		event.preventDefault();
		window.location.href = "/dashboard/shapes/new";
	}

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
					
					<button onClick={this.handleAddShape} className='btn btn-primary btn-shape'>Nueva +</button>
					<h2 className="shape-title">Figuras</h2>
					
					<div className='shape-container'>
						<div className='shape'>
							{
								content.map(element => 
									<ShapeItem key={element.id} item={element} />
								)
							}
						</div>
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

export default Shapes;