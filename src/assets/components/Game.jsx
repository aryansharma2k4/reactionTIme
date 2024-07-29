import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUsersTime } from "../../slice/userSlice";
import { useSelector } from "react-redux";
import Leaderboard from "./Leaderboard";

export default function Component({ currentUser }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [quizSolved, setQuizSolved] = useState(false);
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users);

  useEffect(() => {
    const generateQuestion = () => {
      const operators = ['+', '-', '*', '/'];
      const operator = operators[Math.floor(Math.random() * operators.length)];
      let question = '';
      let answer = 0;
      let num1, num2;

      switch (operator) {
        case '+':
          do {
            num1 = Math.floor(Math.random() * 100);
            num2 = Math.floor(Math.random() * 100);
          } while (num1 + num2 >= 100);
          question = `What is ${num1} + ${num2}?`;
          answer = num1 + num2;
          break;
        case '-':
          num1 = Math.floor(Math.random() * 40);
          num2 = Math.floor(Math.random() * 40);
          question = `What is ${num1} - ${num2}?`;
          answer = num1 - num2;
          break;
        case '*':
          num1 = Math.floor(Math.random() * 20);
          num2 = Math.floor(Math.random() * 10);
          question = `What is ${num1} * ${num2}?`;
          answer = num1 * num2;
          break;
        case '/':
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 9) + 1;
          question = `What is ${num1} / ${num2}?`;
          answer = (num1 / num2).toFixed(2);
          break;
        default:
          break;
      }

      const options = [
        (answer - 1).toString(),
        answer.toString(),
        (parseInt(answer) + 1).toString(),
      ].sort(() => Math.random() - 0.5);

      return {
        question,
        options,
        answer: options.indexOf(answer.toString()),
      };
    };

    const generatedQuestions = [];
    for (let i = 0; i < 5; i++) {
      generatedQuestions.push(generateQuestion());
    }
    setQuestions(generatedQuestions);
    setStartTime(new Date().getTime());
  }, []);

  const handleAnswerClick = (index) => {
    if (questions.length === 0) return;

    setSelectedAnswer(index);
    if (index === questions[currentQuestion]?.answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizSolved(true);
      setEndTime(new Date().getTime());
    }
  };

  useEffect(() => {
    if (quizSolved) {
      const totalTime = endTime ? (endTime - startTime) / 1000 : 0;
      const penalty = (5 - score) * 3;
      const userRecord = {
        id: currentUser,
        time: totalTime + penalty,
      };
      dispatch(addUsersTime(userRecord));
    }
  }, [quizSolved, endTime, startTime, score, currentUser, dispatch]);

  const totalTime = endTime ? (endTime - startTime) / 1000 : 0;
  const penalty = (5 - score) * 3;
  const finalTime = totalTime + penalty;
  const thresholdTime = 8;
  const wrongAnswers = 5 - score;
  const congratsMessage =
    finalTime < thresholdTime && wrongAnswers < 2
      ? "Congratulations! Your time is faster than the threshold time of 9 seconds."
      : "Sorry, you were slower than the threshold time or had more than 2 incorrect answers.";

  if (!quizSolved) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {questions.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="text-lg mb-4">{questions[currentQuestion]?.question}</p>
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    className={`bg-gray-200 text-black hover:bg-gray-300 rounded-lg py-2 px-4 transition-colors ${
                      selectedAnswer === index ? "bg-green-400 text-white" : ""
                    }`}
                    onClick={() => handleAnswerClick(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white flex rounded-lg shadow-lg p-8 w-full max-w-3xl gap-4">
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-lg mb-4">
              Your score: {score} out of {questions.length}
            </p>
            <div className="text-lg mb-4 flex justify-center">
              <p>Total time: {((endTime - startTime) / 1000).toFixed(2)} seconds + </p>
              <p className="text-red-600">{(5 - score) * 3} seconds</p>
            </div>
            <p className="text-lg mb-4">{congratsMessage}</p>
          </div>
          <Leaderboard />
        </div>
      </div>
    );
  }
}
