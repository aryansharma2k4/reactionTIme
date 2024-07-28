import React from 'react'

function Results() {
  return (
    <>
    <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
    <p className="text-lg mb-4">Your score: {score} out of {questions.length}</p>
    <p className="text-lg mb-4">Total time: {totalTime.toFixed(2)} seconds</p>
  </>
  )
}

export default Results