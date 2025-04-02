import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const quotes = [
    {text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams"},
    {text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss"},
    {text: "Education is not preparation for life; education is life itself.", author: "John Dewey"},
    {text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King"},
    {text: "Knowledge is power. Information is liberating. Education is the premise of progress.", author: "Kofi Annan"}
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 m-0 p-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1647249696855-a59fb79ed943?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
          width: '100vw',
          height: '100vh'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in">
          Welcome to QuizMaster
        </h1>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-xl md:text-2xl italic mb-2">
            "{randomQuote.text}"
          </p>
          <p className="text-sm text-gray-300 text-center">
            - {randomQuote.author}
          </p>
        </div>

        <button
          onClick={() => navigate('/create')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
}

export default Home;