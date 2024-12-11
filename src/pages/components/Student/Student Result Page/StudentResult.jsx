// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function StudentResult() {
  const [questions, setQuestions] = useState([
    {
      text: "What is Different between Array and Linked list?",
      answer:
        "Dijkstra's Algorithm helps find the shortest way between places on a map or points in a network. It starts from one point and checks the shortest path to each connected point. It keeps track of the smallest distance and moves to the next closest point, repeating this until it has found the shortest routes.",
      feedback:
        "Your explanation of Dijkstra's Algorithm is a good start, but it can be improved. Try to mention key terms like 'shortest path,' 'graph,' 'non-negative edge weights,' and 'priority queue' to make your answer more precise and complete. Here's an example of a refined version: 'Dijkstra's Algorithm finds the shortest path in a graph with non-negative edge weights, using a priority queue to select the next closest node.' Keep practicing!",
    },
  ]);

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
          <h1 className="font-bold text-lg ">Result for Midterm Examination</h1>
          <div className="flex flex-col">
            <label htmlFor="">2 Question</label>
            <label htmlFor="">Total Score : 17</label>
          </div>
        </div>

        {/* Questions Card */}
        <div className="p-6 space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <label className=" text-gray-700 text-sm font-bold mb-3 flex items-center">
                <p>{question.text} </p>
              </label>
              <label className=" text-gray-700 text-sm font-bold  flex items-center">
                <p>Your Answer : </p>
              </label>
              <div className="border-b border-6 border-black mb-3 mt-1"></div>
              {/* under line */}
              <p>{question.answer}</p>
              <div className="border-b border-6 border-black mt-3 mb-1"></div>
              {/* under line */}
              <label className=" text-gray-700 text-sm font-bold  flex items-center mt-6 mb-3">
                <p>Feedback : </p>
              </label>
              <div className="border-b border-6 border-black mb-3 mt-1"></div>
              {/* under line */}
              <p>{question.feedback}</p>
              <div className="border-b border-6 border-black mb-3 mt-3"></div>
              {/* under line */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
