// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export default function Form() {
  const [questions, setQuestions] = useState([
    { text: "", keywords: "", answer: "" ,score : 0}
  ]);

  const [examTitle, setExamTitle] = useState("Exam Title");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isQuestions, setIsQuestions] = useState(true);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", keywords: "", answer: ""}]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'keywords') {
      newQuestions[index][field] = value.split(',').map(keyword => keyword.trim());
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleTitleChange = (event) => {
    setExamTitle(event.target.value);
  };

  const toggleEditTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  const toggleQuestions = () => {
    setIsQuestions(true);
  };

  const toggleResponses = () => {
    setIsQuestions(false);
  };

  const publishExam = async () => {
    // Validation checks
    if (!examTitle.trim()) {
      alert("Exam title cannot be empty.");
      return;
    }

    for (const question of questions) {
      if (!question.text.trim() || !question.answer.trim()) {
        alert("All fields (question, answer, keywords) must be filled out.");
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: examTitle, questions }),
      });

      if (response.ok) {
        alert("Exam published successfully!");
      } else {
        alert("Failed to publish exam");
      }
    } catch (error) {
      console.error("Error publishing exam:", error);
      alert("An error occurred while publishing the exam");
    }
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={publishExam}
          >
            Publish
          </button>
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          <a
            href="#"
            className={isQuestions ? "underline font-bold text-red-500" : ""}
            onClick={toggleQuestions}
          >
            Questions
          </a>
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
        {/* Title */}
        <div className="bg-red-500 text-white text-left py-3 pl-4 pr-4 flex justify-between items-center rounded-lg">
          <div className="flex items-center">
            {isEditingTitle ? (
              <input
                type="text"
                value={examTitle}
                onChange={handleTitleChange}
                onBlur={toggleEditTitle}
                className="text-2xl font-bold bg-red-500 text-white"
              />
            ) : (
              <h1 className="text-2xl font-bold">{examTitle}</h1>
            )}
            <EditIcon
              onClick={toggleEditTitle}
              className="cursor-pointer ml-2"
            />
          </div>
          <AddIcon onClick={addQuestion} className="cursor-pointer" />
        </div>

        {/* Questions Card */}
        <div className="p-6 space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <label className="text-gray-700 text-sm font-bold mb-2 flex items-center">
                <textarea
                  className="w-full pl-2"
                  placeholder="Type your question here..."
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                ></textarea>
              </label>
              <div className="border-b border-6 border-black my-4"></div>
              <label htmlFor="answer">Answer</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                placeholder="Type your answer here..."
                value={question.answer}
                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
              ></textarea>
              <label htmlFor="keywords">Keywords</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                rows="2"
                placeholder="Type your keywords here..."
                value={question.keywords}
                onChange={(e) => handleQuestionChange(index, 'keywords', e.target.value)}
              ></textarea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
