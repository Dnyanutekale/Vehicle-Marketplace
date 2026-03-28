import React, { useState } from 'react';
import { Award, ArrowRight, RefreshCcw } from 'lucide-react';
import './Quiz.css';

const questions = [
  {
    question: "Which brand produces the Phantom V12?",
    options: ["Bentley", "Rolls-Royce", "Mercedes-Maybach", "Aston Martin"],
    answer: 1
  },
  {
    question: "What is the primary benefit of a Solid State battery in future EVs?",
    options: ["Cheaper to produce", "Higher energy density & safety", "Makes the car heavier", "Uses more water"],
    answer: 1
  },
  {
    question: "Which vehicle is considered the quickest accelerating production car?",
    options: ["Bugatti Chiron", "Rimac Nevera", "Tesla Roadster 2.0", "Porsche 918"],
    answer: 2
  },
  {
    question: "What does 'Bespoke' mean in luxury automotive manufacturing?",
    options: ["Mass-produced", "Custom-made to buyer specifications", "Imported from Europe", "Electric powered"],
    answer: 1
  }
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (idx) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQ].answer) {
      setScore(score + 1);
    }
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <div className="quiz-container container animate-fade-in">
      <div className="quiz-header text-center">
        <h1>The Motor Knowledge Quiz</h1>
        <p>Test your expertise in luxury mobility and automotive engineering.</p>
      </div>

      <div className="quiz-card glass">
        {showResult ? (
          <div className="quiz-result text-center animate-fade-in">
            <Award size={64} className="result-icon pulse-animation" />
            <h2>Quiz Complete!</h2>
            <p className="score-text">You scored <strong>{score}</strong> out of {questions.length}</p>
            <p className="score-msg">
              {score === questions.length ? 'Perfect score! You are a true automotive connoisseur.' : 
               score > questions.length / 2 ? 'Great job! You know your luxury vehicles.' : 
               'Keep exploring our EV Hub and Showrooms to learn more!'}
            </p>
            <button className="primary-btn mt-4" onClick={restartQuiz}>
              <RefreshCcw size={18} style={{marginRight: '8px', display: 'inline'}} /> Retake Quiz
            </button>
          </div>
        ) : (
          <div className="quiz-question-container animate-fade-in" key={currentQ}>
            <div className="quiz-progress">
              Question {currentQ + 1} of {questions.length}
            </div>
            
            <h2 className="question-text">{questions[currentQ].question}</h2>
            
            <div className="options-grid">
              {questions[currentQ].options.map((opt, idx) => (
                <button 
                  key={idx} 
                  className={`quiz-option ${selectedOption === idx ? 'selected' : ''}`}
                  onClick={() => handleSelect(idx)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  {opt}
                </button>
              ))}
            </div>

            <div className="quiz-footer">
              <button 
                className="primary-btn" 
                onClick={handleNext} 
                disabled={selectedOption === null}
              >
                {currentQ === questions.length - 1 ? 'Finish' : 'Next Question'} <ArrowRight size={18} style={{marginLeft: '8px', display:'inline'}}/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
