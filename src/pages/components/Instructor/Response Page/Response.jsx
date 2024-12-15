// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function Response() {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [averageScores, setAverageScores] = useState({});

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/exams");
        if (response.ok) {
          const data = await response.json();
          setExams(data);
          if (data.length > 0) {
            setSelectedExamId(data[0]._id); // Select the first exam by default
          }
        } else {
          console.error("Failed to fetch exams");
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedExamId) return;
      try {
        const response = await fetch(
          `http://localhost:5000/api/getQuestions?examId=${selectedExamId}`
        );
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
          fetchAverageScores(data);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [selectedExamId]);

  const fetchAverageScores = async (questions) => {
    const scores = {};
    for (const question of questions) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/submissions/${question._id}`
        );
        if (response.ok) {
          const submissions = await response.json();
          const totalScore = submissions.reduce((acc, submission) => {
            return acc + submission.evaluation.finalScore;
          }, 0);
          const averageScore = submissions.length > 0 ? totalScore / submissions.length : 0;
          scores[question._id] = averageScore;
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    }
    setAverageScores(scores);
  };

  return (
    <div className="bg-red-100 min-h-screen w-full">
      {/* Top Bar */}
      <div className="bg-white p-4 shadow-md">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <AddIcon className="mr-2" />
            <h1 className="text-2xl font-bold">AI Form</h1>
          </div>
          <div className="w-32 h-10"></div>
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          <Link to="/" className="">
            Questions
          </Link>
          <Link to="/responses" className="underline font-bold text-red-500">
            Responses
          </Link>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        {/* Sidebar */}
        <div className="bg-white w-full md:w-64 p-4 shadow-md min-h-screen md:sticky md:top-0">
          <h2 className="text-xl font-bold mb-4">Exams</h2>
          <ul>
            {exams.map((exam) => (
              <li key={exam._id}>
                {/* Exam Title */}
                <div
                  className={`cursor-pointer p-2 ${
                    selectedExamId === exam._id ? "bg-red-200" : ""
                  }`}
                  onClick={() =>
                    setSelectedExamId((prevId) =>
                      prevId === exam._id ? null : exam._id
                    )
                  }
                >
                  {exam.title}
                </div>

                {/* Exam Links */}
                {selectedExamId === exam._id && (
                  <ul className="pl-4 mt-1">
                    <li className="text-gray-700 hover:text-black">
                      <Link to={`/studentQuestion/${exam._id}`} className="font-black underline">Exam Link</Link>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="w-4/5 mx-auto mt-4 pl-4 pr-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-pink-100 shadow-md rounded-lg p-4 mb-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{question.text}</h2>
                  <p className="text-gray-600">Average Score: {averageScores[question._id]?.toFixed(2) || "N/A"}</p>
                </div>
                <Link
                  to={`/overview/${question._id}`}
                  className="text-blue-500 underline"
                >
                  Overview
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
