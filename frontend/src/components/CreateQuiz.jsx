import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';

function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  }]);
  const [alertVisible, setAlertVisible] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'option') {
      const [, optionIndex] = value.target.name.split('-');
      newQuestions[index].options[optionIndex] = value.target.value;
    } else if (field === 'correctAnswer') {
      newQuestions[index].correctAnswer = parseInt(value.target.value);
    } else {
      newQuestions[index][field] = value.target.value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/quizzes', { title, questions });
      const quizId = response.data.quizId;
      const quizLink = `${window.location.origin}/quiz/${quizId}`;
      await navigator.clipboard.writeText(quizLink);
      setAlertVisible(true);
      alert(`Quiz created! Share this link: ${quizLink}`);
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error('Error creating quiz:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(`Failed to create quiz: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert('Failed to create quiz: No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        alert(`Failed to create quiz: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="border dark:border-gray-600 p-4 rounded-md bg-gray-50 dark:bg-gray-700">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => updateQuestion(qIndex, 'text', e)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    value={oIndex}
                    checked={question.correctAnswer === oIndex}
                    onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e)}
                    className="mr-2 text-blue-500 dark:text-blue-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                  <input
                    type="text"
                    name={`option-${oIndex}`}
                    value={option}
                    onChange={(e) => updateQuestion(qIndex, 'option', e)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            Create Quiz
          </button>
        </div>
      </form>
      {alertVisible && (
        <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">Link copied to clipboard!</span>
        </div>
      )}
    </div>
  </div>
  </div>
  );
}

export default CreateQuiz;