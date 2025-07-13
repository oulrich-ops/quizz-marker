import type { Category, Question, TriviaCategoriesResponse } from "../models/quizModels";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://opentdb.com';


export const fetchQuizCategory = async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/api_category.php`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }
    const data: TriviaCategoriesResponse = await response.json();
    return data.trivia_categories;
};

export interface QuestionsResponse {
    response_code: number;
    results: Question[];
}

export const fetchQuestions = async (category: number, difficulty: string, nbr: number = 5,): Promise<Question[]> => {
    const queryParams = new URLSearchParams({
        amount: nbr.toString(),
        category: category.toString(),
        difficulty: difficulty,
        type: 'multiple',
    })

    const url = `${BASE_URL}/api.php?${queryParams.toString()}`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des questions');
        }

        const data: QuestionsResponse = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw error;
    }
};