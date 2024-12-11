// eslint-disable-next-line no-unused-vars
import React, { useState ,useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
export default function Response() {
   
  const [questions, setQuestions] = useState([]);
  
  const [isQuestions, setIsQuestions] = useState(false);

  const toggleQuestions = () => {
    setIsQuestions(true);
  };
  const toggleResponses = () => {
    setIsQuestions(false);
  };


  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched questions:', data);
        setQuestions(data); // Update state with fetched questions
      } else {
        console.error('Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []); 

  return (
    <div className="bg-red-100 min-h-screen min-w-screen w-full h-full ">
      {/* Header */}
      <div className="bg-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AddIcon className="mr-2" />
            <h1 className="text-2xl font-bold">AI Form</h1>
          </div>
          <div className="w-32 h-10"></div>
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          <Link
            to="/"
            className={isQuestions ? "underline font-bold text-red-500" : ""}
            onClick={toggleQuestions}
          >
            Questions
          </Link>
          <Link
            to="/responses"
            className={!isQuestions ? "underline font-bold text-red-500" : ""}
            onClick={toggleResponses}
          >
            Responses
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-4">
        {/* Response List */}
        {questions.map((question, index) => (
          <div key={index} className="bg-pink-100 shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <p className="text-lg">{question.text}</p>
              <span className="text-sm">Average Score: {index + 6}</span> {/* Example score */}
            </div>
            <Link to={`/overview/${question._id}`} className="text-blue-500 underline">Overview</Link> {/* Pass question ID */}
          </div>
        ))}
      </div>
    </div>
  );
}
