import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import AttemptQuiz from './components/AttemptQuiz';
import QuizResult from './components/QuizResult';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateQuiz />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quiz/:id" element={<AttemptQuiz />} />
              <Route path="/quiz/:id/result" element={<QuizResult />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;