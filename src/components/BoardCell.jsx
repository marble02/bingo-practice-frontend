import React from 'react'

function BoardCell(props) {
	return (
		<div 
			className={`cell ${props.held ? 'held' : ''} ${props.called ? 'called': ''}`}
			onClick={props.handleToggle}
		>
			{props.value}
		</div>
	)
}

export default BoardCell