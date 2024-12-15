// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
export default function Overview_page() {
  const { questionId } = useParams(); // Get the question ID from the URL
  const [question, setQuestion] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [keywordScore, setKeywordScore] = useState(0);
  const [relevanceScore, setRelevanceScore] = useState(0);
  const [grammarScore, setGrammarScore] = useState(0);

  const fetchQuestion = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/questions/${questionId}`
      );
      if (response.ok) {
        const data = await response.json();
        setQuestion(data);
      } else {
        console.error("Failed to fetch question");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  }, [questionId]);

  const fetchSubmissions = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/submissions/${questionId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        console.error("Failed to fetch submissions");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  }, [questionId]);

  useEffect(() => {
    fetchQuestion();
    fetchSubmissions();
  }, [fetchQuestion, fetchSubmissions]);

  useEffect(() => {
    // Fetch the current submission data
    const fetchSubmission = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/submissions/${questionId}`
        );
        if (response.ok) {
          const data = await response.json();
    
          if (Array.isArray(data)) {
            // Assuming you want the first item in the array
            const submission = data[0];
    
            if (submission && submission.evaluation) {
              setCurrentSubmission(submission);
              setKeywordScore(submission.evaluation.keyword.score);
              setRelevanceScore(submission.evaluation.reference.score);
              setGrammarScore(submission.evaluation.grammar.score);
            } else {
              console.error("Invalid submission structure");
            }
          } else {
            console.error("Expected data to be an array");
          }
        } else {
          console.error("Failed to fetch submission");
        }
      } catch (error) {
        console.error("Error fetching submission:", error);
      }
    };
    

    fetchSubmission();
  }, [questionId]);

  const [isQuestions, setIsQuestions] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleQuestions = () => {
    setIsQuestions(true);
  };
  const toggleResponses = () => {
    setIsQuestions(false);
  };

  const openModal = (submission) => {
    setCurrentSubmission(submission);
    // Initialize input values with the actual scores from the submission
    setKeywordScore(submission.evaluation.keyword.score);
    setRelevanceScore(submission.evaluation.reference.score);
    setGrammarScore(submission.evaluation.grammar.score);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    
    setIsModalOpen(false);
  };

  const handleScoreChange = (setter) => (e) => {
    const value = Math.max(0, Math.min(10, Number(e.target.value)));
    setter(value);
  };

  const handleSave = () => {
    // Implement save logic here, e.g., send data to a server or update state
    console.log("Scores saved:", {
      keywordScore,
      relevanceScore,
      grammarScore,
    });
  };

  const handleApply = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/updateScores/${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keywordScore,
            relevanceScore,
            grammarScore,
          }),
        }
      );

      if (response.ok) {
        alert("Scores updated successfully!");
      } else {
        alert("Failed to update scores");
      }
    } catch (error) {
      console.error("Error updating scores:", error);
      alert("An error occurred while updating scores");
    }
  };

  return (
    <div className="bg-red-100 min-h-screen min-w-screen w-full h-full">
      <div className={`${isModalOpen ? "blur" : ""}`}>
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
          {question ? (
            <div className="bg-red-500 text-white text-left py-3 pl-4 pr-4 flex justify-between items-center rounded-lg">
              <div className="flex items-center justify-center w-full">
                <h1 className="text-xl font-bold text-center w-full">
                  {question.text} {/* Display the question text */}
                </h1>
              </div>
            </div>
          ) : (
            <p>Loading question...</p> // Loading state
          )}
        </div>

        {/* Response List */}
        <div className="max-w-2xl mx-auto mt-4 ">
          {submissions.map((submission, index) => (
            <div
              key={index}
              className="bg-pink-100 shadow-md rounded-lg p-4 mb-4"
            >
              <h2 className="text-lg font-bold">
                User ID: {submission.userId}
              </h2>
              <p className="mt-2">{submission.answer}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => openModal(submission)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Details
                </button>
                <div>Score: {parseFloat(submission.evaluation.finalScore).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && currentSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Submission Details</h2>
            <div className="flex gap-4">
              <div className="bg-gray-100 p-6 rounded mb-6 flex-[3]">
                <p className="text-gray-800 text-m">
                  {currentSubmission.answer}
                </p>
              </div>
              <div className="flex-1">
                <div className="flex justify-end">
                  <p className="text-m mb-2">
                    Keyword Score:
                    <input
                      type="number"
                      max={10}
                      value={keywordScore} // Use the state value
                      onChange={(e) => setKeywordScore(Number(e.target.value))}
                      className="ml-2 border rounded"
                    />
                  </p>
                </div>
                <div className="flex justify-end">
                  <p className="text-m mb-2">
                    Relevance Score:
                    <input
                      type="number"
                      max={10}
                      value={relevanceScore} // Use the state value
                      onChange={(e) =>
                        setRelevanceScore(Number(e.target.value))
                      }
                      className="ml-2 border rounded"
                    />
                  </p>
                </div>
                <div className="flex justify-end">
                  <p className="text-m mb-2">
                    Grammar Score:
                    <input
                      type="number"
                      max={10}
                      value={grammarScore} // Use the state value
                      onChange={(e) => setGrammarScore(Number(e.target.value))}
                      className="ml-2 border rounded"
                    />
                  </p>
                </div>

                <div className="flex justify-end">
                  <button className="bg-blue-500 rounded" onClick={handleApply}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-6 space-x-8">
              <div className="text-green-500 flex-1">
                <p className="text-m mb-2">
                  Keyword Score: {currentSubmission.evaluation.keyword.score}
                </p>
                <p className="text-m font-semibold mb-2">Keywords Found:</p>
                <ul className="list-disc ml-6 text-base space-y-1">
                  {currentSubmission.evaluation.keyword.detail.matched_keywords.map(
                    (keyword, index) => (
                      <li key={index}>{keyword}</li>
                    )
                  )}
                </ul>
                <p className="text-m font-semibold mt-4 mb-2">
                  Keywords Missing:
                </p>
                <div>
                  <ul className="list-disc ml-6 text-base">
                    {currentSubmission.evaluation.keyword.detail.unmatched_keywords.map(
                      (keyword, index) => (
                        <li key={index}>{keyword}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="text-blue-500 flex-1">
                <p className="text-m mb-2">
                  Relevance Score:{" "}
                  {currentSubmission.evaluation.reference.score}
                </p>
                <p className="text-base">
                  {currentSubmission.evaluation.reference.detail}
                </p>
              </div>
              <div className="text-red-500 flex-1">
                <p className="text-m mb-2">
                  Grammar Score: {currentSubmission.evaluation.grammar.score}
                </p>
                <p className="text-base">
                  {currentSubmission.evaluation.grammar.detail}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
