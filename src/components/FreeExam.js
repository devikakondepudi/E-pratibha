
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ExamsList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const storedId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');
        const storedServerKey = localStorage.getItem('server_key');

        if (storedId && storedServerKey && storedToken) {
          const response = await fetch("https://test.e-prathibha.com/apis/test_free_exam", {
            method: 'POST',
            headers: { id: storedId, server_key: storedServerKey, tokenu: storedToken },
            body: JSON.stringify({})
          });

          const responseData = await response.json();
          console.log('Response Data', responseData);

          if (responseData.data && responseData.data.exams) {
            setExams(responseData.data.exams);
          }
        } else {
          console.log('Values not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  if (!Array.isArray(exams)) {
    return <div>No exams found.</div>;
  }

  return (
    <div>
      <Link to="/Questions/24"></Link>
      {exams.map((data, index) => (
        <div key={index}>
          <h3>{Object.keys(data)[0]}</h3>
          {data[Object.keys(data)[0]].map((res, idx) => (
            <div key={idx}>
              <Link to={`/questions/${res.Exam.id}`}>
                {`${res.Exam.name}`}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Set the values in localStorage
localStorage.setItem('userId', '2944');
localStorage.setItem('token', 'Qz6ejBq1Mqu9K5bnsb57');
localStorage.setItem('server_key', '3w99V63pW7tJ7vavGXtCKo8cp');

export default ExamsList;
