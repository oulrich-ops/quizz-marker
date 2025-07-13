export interface Category {
    id: number;
    name: string;
}

export interface TriviaCategoriesResponse {
  trivia_categories: Category[];
}

export type Difficulty = 'easy' | 'medium' | 'hard';


export interface Question {
  type: 'multiple'; 
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

