import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function About() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const flowDiagram = `
    <svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
        </marker>
      </defs>
      <g fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#arrowhead)">
        <path d="M100,200 L200,200" />
        <path d="M300,200 L400,200" />
        <path d="M500,200 L600,200" />
        <path d="M700,200 L750,200" />
      </g>
      <g fill="currentColor">
        <rect x="50" y="170" width="100" height="60" rx="8" fill="#3B82F6" />
        <rect x="200" y="170" width="100" height="60" rx="8" fill="#3B82F6" />
        <rect x="400" y="170" width="100" height="60" rx="8" fill="#3B82F6" />
        <rect x="600" y="170" width="100" height="60" rx="8" fill="#3B82F6" />
      </g>
      <g fill="white" text-anchor="middle" font-size="14">
        <text x="100" y="205">Create Quiz</text>
        <text x="250" y="205">Add Questions</text>
        <text x="450" y="205">Share Quiz</text>
        <text x="650" y="205">View Results</text>
      </g>
    </svg>
  `;

  return (
    <div className={`min-h-screen py-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">About QuizMaster</h1>

        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300">
              QuizMaster is a modern, user-friendly platform designed to create, share, and take quizzes effortlessly.
              Whether you're an educator, student, or quiz enthusiast, our platform provides all the tools you need
              to create engaging quiz experiences.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="mb-6 flex justify-center" dangerouslySetInnerHTML={{ __html: flowDiagram }} />
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">1. Create Quiz</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Start by creating a new quiz with a title and description. Our intuitive interface makes it easy
                  to get started.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">2. Add Questions</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Add multiple-choice questions to your quiz. Each question can have up to four options, with one
                  correct answer.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">3. Share Quiz</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Once your quiz is ready, share it with others using a unique link. Anyone with the link can take
                  the quiz.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">4. View Results</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  After completing the quiz, participants can immediately see their results and review their answers.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Modern and intuitive user interface</li>
              <li>Multiple-choice question support</li>
              <li>Instant quiz sharing capabilities</li>
              <li>Real-time results and feedback</li>
              <li>Dark mode support</li>
              <li>Mobile-responsive design</li>
              <li>Easy navigation and quiz management</li>
            </ul>
          </section>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Create Your First Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;