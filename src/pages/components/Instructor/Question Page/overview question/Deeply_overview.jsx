// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
export default function Deeply_overview() {
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

  const responses = [
    {
      name: "Peter Griffin",
      response:
        "Dijkstra's Algorithm finds the shortest path between nodes in a graph, where the edges have non-negative weights. It starts from a selected source node and explores the paths to other nodes. As it goes, it updates the shortest distances it finds. By using a priority queue, the algorithm picks the node with the smallest distance and continues until the shortest paths to all nodes are discovered. It's used in things like network routing and GPS navigation.",
      score: 10,
    }
  ];

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
      {/* Response List */}
      <div className="max-w-2xl mx-auto mt-4">
        {responses.map((response, index) => (
          <div
            key={index}
            className="bg-pink-100 shadow-md rounded-lg p-4 mb-4"
          >
            <h2 className="text-lg font-bold">{response.name}</h2>
            <p className="mt-2">{response.response}</p>
            <div className="flex justify-between items-center mt-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Details</button>
              <div>Score: {response.score}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
