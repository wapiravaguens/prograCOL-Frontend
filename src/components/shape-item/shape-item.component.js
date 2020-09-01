import React from 'react';
import './shape-item.styles.css';

const ShapeItem = ({ item }) => {
	return (
		<div className='shape-item'>
			<div className='shape-item__name'>{item.name}</div>
			<div className='shape-item__grid'>
				<div className='shape-item__grid-container'>
					{
						item.positionsWinner.map((pos, i) => {
							if (pos) {
								return (<div key={i} className="shape-item__value active"></div>);
							} else {
								return (<div key={i} className="shape-item__value"></div>);
							}
						})
					}
				</div>
			</div>
		</div>
	)
}

export default ShapeItem;
