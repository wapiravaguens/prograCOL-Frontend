import React from 'react';
import './figure-item.styles.css';

const FigureItem = ({ item, handleClick }) => {
	return (
		<div className='figure-item'>
			<div className='figure-item__name'>{item.name}</div>
			<div className='figure-item__grid'>
				<div className='figure-item__grid-container'>
					{
						item.positionsWinner.map((pos, i) => {
							if (pos) {
								return (<div key={i} onClick={handleClick ? () => handleClick(i) : null} className="figure-item__value active"></div>);
							} else {
								return (<div key={i} onClick={handleClick ? () => handleClick(i) : null} className="figure-item__value"></div>);
							}
						})
					}
				</div>
			</div>
		</div>
	)
}

export default FigureItem;
