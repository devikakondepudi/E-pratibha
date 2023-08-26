
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Questions = ({ examId }) => {
  const [questions, setQuestions] = useState([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const fetchQuestions = async () => {
    try {
      const storedId = localStorage.getItem('userId');
      const storedServerKey = localStorage.getItem('serverKey');
      const storedToken = localStorage.getItem('token');

      const response = await fetch(`https://test.e-prathibha.com/apis/start_exam?examId=${24}`, {
        method: 'GET',
        headers: {
          id: storedId,
          server_key: storedServerKey,
          tokenu: storedToken,
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Questions data:', data);
        setQuestions(data.data.exam);
      } else {
        throw new Error('Error fetching questions');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchFinishExamData = async () => {
    try {
      const storedId = localStorage.getItem('userId');
      const storedServerKey = localStorage.getItem('serverKey');
      const storedToken = localStorage.getItem('token');

      const data = { examId: 24, qno: 1 };
      const headers = { id: storedId, server_key: storedServerKey, tokenu: storedToken };

      const response = await fetch("https://test.e-prathibha.com/apis/finishExam", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const finishData = await response.json();
        console.log('Finish exam data:', finishData);
      } else {
        throw new Error('Error finishing exam');
      }
    } catch (error) {
      console.error("Error finishing exam:", error);
    }
  };

  function handleSubmitAnswers() {
    console.log('Submitting answers...');
    setIsAnswerSubmitted(true);
  }

  function handleFinishExam() {
    fetchFinishExamData();
  }

  if (!Array.isArray(questions)) {
    return <div>No questions found.</div>;
  }

  return (
    <div>
      {questions.map((data, idx) => {
        return (
          <div key={idx}>
            <div dangerouslySetInnerHTML={{ __html: data.Question.question.above }}></div>
            <br />
            <ul>
              Option  {data.Question.option1}
              <br />
              Option {data.Question.option2}
              <br />
              Option  {data.Question.option3}
              <br />
              Option {data.Question.option4}
              <br />
            </ul>
            <button onClick={handleSubmitAnswers}>Submit Answer</button> 
            {isAnswerSubmitted && <p>Your answer has been submitted.</p>}
          </div>
        );
      })}
      <Link to="/FinishExam">
        <button onClick={handleFinishExam}>Finish Exam</button>
      </Link>
    </div>
  );
};

// Set the values in localStorage
localStorage.setItem('userId', '2944');
localStorage.setItem('serverKey', '3w99V63pW7tJ7vavGXtCKo8cp');
localStorage.setItem('token', 'Qz6ejBq1Mqu9K5bnsb57');

export default Questions;
