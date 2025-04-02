require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// In-memory storage for quizzes
const quizzes = new Map();

// Create a new quiz
app.post('/api/quizzes', (req, res) => {
  const { title, questions } = req.body;
  const quizId = uuidv4();
  
  quizzes.set(quizId, {
    id: quizId,
    title,
    questions,
    attempts: []
  });

  res.json({ quizId });
});

// Get quiz by ID
app.get('/api/quizzes/:id', (req, res) => {
  const quiz = quizzes.get(req.params.id);
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  
  // Don't send correct answers to participants
  const quizForParticipant = {
    ...quiz,
    questions: quiz.questions.map(q => ({
      ...q,
      correctAnswer: undefined
    }))
  };
  
  res.json(quizForParticipant);
});

// Submit quiz attempt
app.post('/api/quizzes/:id/submit', (req, res) => {
  const quiz = quizzes.get(req.params.id);
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  const { answers } = req.body;
  let score = 0;

  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      score++;
    }
  });

  const attempt = {
    id: uuidv4(),
    timestamp: new Date(),
    score,
    totalQuestions: quiz.questions.length
  };

  quiz.attempts.push(attempt);
  res.json(attempt);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});