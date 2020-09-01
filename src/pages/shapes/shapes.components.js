import React from 'react';
import './shapes.styles.css';

// axios
import axios from 'axios';

// Pagination
import ReactPaginate from 'react-paginate';

class Shapes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			content: [],
			perPage: 10,
			currentPage: 0,
			pageCount: undefined,
			loading: true,
		};
	}
	
	receivedData() {
		const { perPage, currentPage } = this.state;
		var config = {
			method: 'get',
			url: `https://java.bocetos.co/gamered-0.0.1-SNAPSHOT/figure/paged?size=${perPage}&page=${currentPage}`,
			headers: { 
				'content-type': 'application/json',
				'Authorization': localStorage.getItem('token'),
			}
		};
		
		axios(config)
		.then(response => {
			console.log(response.data)
			this.setState({ 
				pageCount : response.data.data.totalPages,
				content : response.data.data.content,
				loading : false
			});
		})
		.catch(function (error) {
			alert(error);
		});
	}

	handlePageClick = (e) => {
		const selectedPage = e.selected;
		this.setState({ currentPage: selectedPage }, () => {
			this.receivedData()
		});
	};

	componentDidMount() {
		this.receivedData();
	}

	render() {
		if (this.state.loading) {
			return(
				<div>...Loading</div>
			);
		} else {
			const { content, pageCount } = this.state;
			return (
				<div>
					<div>
						{content.map(element => 
							<div key={element.id}>{element.name}</div>)
						}
					</div>
					<div className='pagination-container'>
						<ReactPaginate
							previousLabel={"prev"}
							nextLabel={"next"}
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