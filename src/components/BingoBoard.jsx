
import BoardCell from './BoardCell';

function BingoBoard({board, toggleCell, gridStyle}) {

	const boardMap = board.map( el => {
		return (
			<BoardCell 
				key={el.id}
				value={el.value}
				held={el.held}
				called={el.called}
				handleToggle={() => toggleCell(el.id)}
			/>
		)
	})

	return (
		<div className='bingo-board' style={gridStyle}>
			{boardMap}
		</div>
	)
}

export default BingoBoard