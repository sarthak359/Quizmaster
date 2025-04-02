import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

function AttemptQuiz() {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [participantInfo, setParticipantInfo] = useState({name: '', rollNo: '', phone: ''});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quizzes/${id}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(null));
        setLoading(false);
      } catch (error) {
        setError('Failed to load quiz');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.includes(null)) {
      alert('Please answer all questions before submitting');
      return;
    }

    try {
      const response = await axios.post(`/api/quizzes/${id}/submit`, { answers, participantInfo });
      navigate(`/quiz/${id}/result`, { state: response.data });
    } catch (error) {
      setError('Failed to submit quiz');
    }
  };

  if (loading) return <div className="text-center p-8 text-lg">Loading quiz...</div>;
  if (error) return <div className="text-center p-8 text-red-600 dark:text-red-400">{error}</div>;
  if (!quiz) return <div className="text-center p-8 text-gray-600 dark:text-gray-400">Quiz not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg m-16">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">{quiz.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border dark:border-gray-600 p-4 rounded-md bg-gray-50 dark:bg-gray-700 mb-4">
            <p className="font-medium mb-4 text-gray-800 dark:text-gray-200">Participant Information</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  value={participantInfo.name}
                  onChange={(e) => setParticipantInfo({...participantInfo, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Roll Number</label>
                <input
                  type="text"
                  value={participantInfo.rollNo}
                  onChange={(e) => setParticipantInfo({...participantInfo, rollNo: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input
                  type='tel'
                  value={participantInfo.phone}
                  onChange={(e) => setParticipantInfo({...participantInfo, phone: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="border dark:border-gray-600 p-4 rounded-md bg-gray-50 dark:bg-gray-700 mb-4">
            <p className="font-medium mb-4 text-gray-800 dark:text-gray-200">{question.text}</p>
            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={oIndex}
                    checked={answers[qIndex] === oIndex}
                    onChange={() => handleAnswerSelect(qIndex, oIndex)}
                    className="mr-2 text-blue-500 dark:text-blue-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                  <label className="text-gray-700 dark:text-gray-300">{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default AttemptQuiz;