/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";

export default function StudentResult() {
  const { examID, userID } = useParams();
  const [userAnswers, setUserAnswers] = useState([]);
  const [examTitle, setExamTitle] = useState("Midterm Examination"); // Default title
  const [questions, setQuestions] = useState([]);

  const fetchUserAnswers = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/studentResult/${examID}/${userID}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserAnswers(data);
      } else {
        console.error("Failed to fetch user answers");
      }
    } catch (error) {
      console.error("Error fetching user answers:", error);
    }
  }, [examID, userID]);

  const fetchExamTitle = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/exams/${examID}`);
      if (response.ok) {
        const data = await response.json();
        setExamTitle(data.title);
      } else {
        console.error("Failed to fetch exam title");
      }
    } catch (error) {
      console.error("Error fetching exam title:", error);
    }
  }, [examID]);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getQuestions?examId=${examID}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        console.error("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [examID]);

  useEffect(() => {
    fetchUserAnswers();
    fetchExamTitle();
    fetchQuestions();
  }, [fetchUserAnswers, fetchExamTitle, fetchQuestions]);

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
            Result
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-4">
        {/* Title */}
        <div className="bg-red-500 text-white text-left py-3 pl-4 pr-4 flex flex-row justify-between items-center rounded-lg">
          <h1 className="font-bold text-lg">Result for {examTitle}</h1>
          <div className="flex flex-col">
            <label htmlFor="">{userAnswers.length} Questions</label>
            <label htmlFor="">
              Total Score: {userAnswers.reduce((acc, ans) => acc + ans.evaluation.finalScore, 0)}
            </label>
          </div>
        </div>

        {/* Questions Card */}
        <div className="p-6 space-y-4">
          {userAnswers.map((answer, index) => {
            const question = questions.find(q => q._id === answer.questionId);
            return (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <label className="text-gray-700 text-sm font-bold mb-3 flex items-center">
                  <p>Question: {question ? question.text : "Loading..."}</p>
                </label>
                <label className="text-gray-700 text-sm font-bold flex items-center">
                  <p>Your Answer:</p>
                </label>
                <div className="border-b border-6 border-black mb-3 mt-1"></div>
                {/* under line */}
                <p>{answer.answer}</p>
                <div className="border-b border-6 border-black mt-3 mb-1"></div>
                {/* under line */}
                <label className="text-gray-700 text-sm font-bold flex items-center mt-6 mb-3">
                  <p>Feedback:</p>
                </label>
                <div className="border-b border-6 border-black mb-3 mt-1"></div>
                {/* under line */}
                <p>{answer.evaluation.feedback}</p>
                <div className="border-b border-6 border-black mb-3 mt-3"></div>
                {/* under line */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
