import type { Question } from '../types';

export interface ShuffledQuestion extends Question {
  originalCorrectAnswer: number;
}

export function shuffleOptions(question: Question): ShuffledQuestion {
  const optionsWithIndex = question.options.map((option, index) => ({
    option,
    originalIndex: index
  }));

  for (let i = optionsWithIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
  }

  const newCorrectAnswerIndex = optionsWithIndex.findIndex(
    item => item.originalIndex === question.correctAnswer
  );

  return {
    ...question,
    options: optionsWithIndex.map(item => item.option),
    correctAnswer: newCorrectAnswerIndex,
    originalCorrectAnswer: question.correctAnswer
  };
}

export function shuffleQuestions(questions: Question[]): ShuffledQuestion[] {
  return questions.map(question => shuffleOptions(question));
}
