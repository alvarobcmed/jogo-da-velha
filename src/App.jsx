import React, { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;
    
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? '✦' : '◉';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner === '✦' ? 'Captain Marvel' : 'Iron Man'}`
    : board.every(cell => cell)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'Captain Marvel' : 'Iron Man'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Space Avengers Tic-tac-toe
      </motion.h1>
      
      <motion.div 
        className="status"
        animate={{ scale: winner ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {status}
      </motion.div>

      <div className="board">
        {board.map((cell, index) => (
          <motion.div
            key={index}
            className={`cell ${cell === '✦' ? 'x' : cell === '◉' ? 'o' : ''}`}
            onClick={() => handleClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {cell}
          </motion.div>
        ))}
      </div>

      <motion.button
        className="reset-btn"
        onClick={resetGame}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        New Game
      </motion.button>
    </div>
  );
}

export default App;
