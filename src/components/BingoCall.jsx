import React from 'react'

function BingoCall(props) {

	return (
		<div className='bingo-call-container'>
				<div className='call-num'>{props.randNum}</div>
			<div className='call-controls'>
				<button onClick={props.start}>Start Calls</button>
				<button onClick={props.stop}>Stop Calls</button>
			</div>
			<div>Calls so far: {JSON.stringify(props.callsSoFar.filter(value => value != null))}</div>
		</div>
	)
}

export default BingoCall