// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function StudentQuestion() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/questions");
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        console.error("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const submitAnswers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/submit-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([questionId, answer]) => ({
            questionId,
            answer,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Answers submitted successfully! User ID: ${data.userId}`);
      } else {
        alert("Failed to submit answers");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("An error occurred while submitting answers");
    }
  };
  return (
    <div className="bg-red-100 min-h-screen min-w-screen w-full h-full ">
      {/* Header */}
      <div className="bg-white p-2 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AddIcon className="mr-2" />
            <h1 className="text-2xl font-bold">AI Form</h1>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <p href="#" className={"underline font-bold text-red-500"}>
            Questions
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-4">
        {/* Title */}
        <div className="bg-red-500 text-white text-left py-3 pl-4 pr-4 flex justify-between items-center rounded-lg">
          <h1 className="font-bold text-lg">Midterm Examination</h1>
        </div>

        {/* Questions Card */}
        <div className="p-6 space-y-4">
        {questions.map((question) => (
          <div key={question._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <label className="text-gray-700 text-sm font-bold mb-3 flex items-center">
              <p>{question.text}</p>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Type your answer here..."
              value={answers[question._id] || ''}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            ></textarea>
          </div>
        ))}
        <div className="flex justify-end px-6 pb-5">
          <button onClick={submitAnswers} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
        </div>
      </div>
    </div>
  );
}
