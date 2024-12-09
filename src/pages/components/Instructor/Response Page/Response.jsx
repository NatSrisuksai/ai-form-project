// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
export default function Response() {
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useState([
    {
      text: "What is Different between Array and Linked list?",
      required: false,
    },
    { text: "Describe about Dijkstra's Algorithm briefly.", required: false },
  ]);
  
  const [isQuestions, setIsQuestions] = useState(false);

  const toggleQuestions = () => {
    setIsQuestions(true);
  };
  const toggleResponses = () => {
    setIsQuestions(false);
  };

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
            <Link to="/overview" className="text-blue-500 underline">Overview</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
