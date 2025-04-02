import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function QuizResult() {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const result = location.state;

  if (!result) {
    return <div className="text-center p-8 text-gray-600 dark:text-gray-400">No result data available</div>;
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Quiz Results</h2>
      
      <div className="mb-8 text-center">
        <div className="text-6xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          {percentage}%
        </div>
        <p className="text-xl text-gray-800 dark:text-gray-200">
          Score: {result.score} / {result.totalQuestions}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Completed on: {new Date(result.timestamp).toLocaleString()}
        </p>
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
        >
          Create Your Own Quiz
        </Link>
      </div>
      </div>
    </div>
  </div>
  );
}


export default QuizResult;