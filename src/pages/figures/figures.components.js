import React from 'react';
import './figures.styles.css';

// Service
import { authorizedRequest } from '../../service/API';

// Pagination
import ReactPaginate from 'react-paginate';

// Components
import FigureItem from '../../components/figure-item/figure-item.component';
import Spinner from '../../components/spinner/spinner.component';

// Alerts
import Swal from 'sweetalert2'

class Figures extends React.Component {
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

	handleAddFigure = event => {
		event.preventDefault();
		window.location.href = "/dashboard/figures/new";
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
					
					<button onClick={this.handleAddFigure} className='btn btn-primary btn-figure'>Nueva +</button>
					<h2 className="figure-title">Figuras</h2>
					
					<div className='figure-container'>
						<div className='figure'>
							{
								content.map(element => 
									<FigureItem key={element.id} item={element} />
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

export default Figures;