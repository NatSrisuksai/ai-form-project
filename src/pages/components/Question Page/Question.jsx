// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export default function Form() {
  const [questions, setQuestions] = useState([
    { text: "What is Different between Array and Linked list?", required: false },
    { text: "Describe about Dijkstra's Algorithm briefly.", required: false }
  ]);

  const [examTitle, setExamTitle] = useState("Exam Title");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isQuestions, setIsQuestions] = useState(true);
  const addQuestion = () => {
    setQuestions([...questions, { text: "New Question", required: false }]);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const toggleRequired = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].required = !newQuestions[index].required;
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

  return (
    <div className="bg-red-100 min-h-screen min-w-screen w-full h-full ">


      {/* Header */}
      <div className="bg-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AddIcon className="mr-2" />
            <h1 className="text-2xl font-bold">AI Form</h1>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Publish
          </button>
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          <a href="#" className={isQuestions ? "underline font-bold text-red-500" : ""} onClick={toggleQuestions}>Questions</a>
          <Link to="/responses" className={!isQuestions ? "underline font-bold text-red-500" : ""} onClick={toggleResponses}>
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
            <EditIcon onClick={toggleEditTitle} className="cursor-pointer ml-2" />
          </div>
          <AddIcon onClick={addQuestion} className="cursor-pointer" />
        </div>

        {/* Questions Card */}
        <div className="p-6 space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                <textarea
                  name=""
                  id=""
                  className="w-full pl-2"
                  placeholder="Type your question here..."
                  defaultValue={question.text}
                ></textarea>
              </label>
              <div className="border-b border-6 border-black my-4"></div>
              <label htmlFor="answer">Answer</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                placeholder="Type your answer here..."
              ></textarea>
              <label htmlFor="keywords">Keywords</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                rows="4"
                placeholder="Type your keywords here..."
              ></textarea>

              <div className="flex items-center justify-end mt-2">
                <DeleteIcon onClick={() => deleteQuestion(index)} className="cursor-pointer" />
                <p className="text-sm pl-2 pr-1">required</p>
                <Switch
                  checked={question.required}
                  onChange={() => toggleRequired(index)}
                  color="primary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}