export interface Question {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
}

export interface Answer {
  question: string;
  selected: string;
  correct: boolean;
}
