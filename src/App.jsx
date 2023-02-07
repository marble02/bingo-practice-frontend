import { useState, useRef, useEffect } from 'react'
import BingoBoard from './components/BingoBoard'
import BingoCall from './components/BingoCall'
import { nanoid } from 'nanoid';
import winnerCheck from './winnerCheck';
import Confetti from 'react-confetti';

function App() {
	const nSize = 5;
	const callMax = 99;
	const [board, setBoard] = useState(generateRandomBoard(nSize));
	const [callsSoFar, setCallsSoFar] = useState([]);
	// const [calledSet, setCalledSet] = useState(new Set())
	const timerRef = useRef(null);
	const [randNum, setRandNum] = useState();
	const [win, setWin] = useState(false);

	const gridStyle = {
		gridTemplateColumns: `repeat(${nSize}, 1fr)`,
		gridTemplateRows: `repeat(${nSize}, 1fr)`
	}

	useEffect(() => {
		setCallsSoFar(prevCalls => [...prevCalls, randNum])
		// setCalledSet(prevSet => prevSet.add(randNum))
		setBoard(prevBoard => prevBoard.map(item => {
			return (
				(item.value === randNum) ? 
				{...item, called: true} : item
			)
		}))
		// console.log(calledSet)
	}, [randNum])

	useEffect(() => {
		let win = winnerCheck(board, nSize);
		// console.log(win);
		if (win) {
			stop();
			setWin(true);
		} else {
			if (!win) {
				setWin(false);
			}
		}
	}, [board])

	const start = () => {
		timerRef.current = setInterval(() => {
			// not currently checking for duplicates getting called
			setRandNum(getRandNum());
		}, 2000)
	}

	const stop = () => {
		clearInterval(timerRef.current);
		timerRef.current = null;
	}
	
	function getRandNum() {
		return Math.floor(Math.random() * callMax);
	}

	function generateCell (val) {
		return {
			id: nanoid(),
			value: val,
			held: false,
			called: false
		}
	}

	function generateRandomBoard(n) {
		let numSet = new Set();
		let randBoard = [];
		while (randBoard.length < n * n) {
			const tmpRandNum = getRandNum();
			if (!numSet.has(tmpRandNum)) {
				numSet.add(tmpRandNum);
				randBoard.push(generateCell(tmpRandNum));
			}
		}
		return randBoard
	}

	const toggleCell = (id) => {
		setBoard(prevBoard => prevBoard.map( cell => {
			return (cell.id === id && cell.called) ? {...cell, held: !cell.held} : cell
		}));
	}

	// console.log(board)

	return (
		<div className="App">
			<h1>Let's Play Bingo!</h1>
			{win && <Confetti/>}
			<BingoCall 
				randNum={randNum}
				start={start}
				stop={stop}
				callsSoFar={callsSoFar}
			/>
			<BingoBoard 
				board={board}
				toggleCell={toggleCell}
				gridStyle={gridStyle}
			/>
		</div>
	)
}

export default App
