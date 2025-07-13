import { useEffect, useState } from "react";
import type { Category, Difficulty } from "../models/quizModels";
import { fetchQuizCategory } from "../apis/quizzApi";

interface Props {
    handleCreate: (category: number, difficulty: Difficulty|'') => void;
}


const QuizzDefinition: React.FC<Props> = ({ handleCreate }) => {

    const difficulties = [
        { value: 'easy', label: 'Facile' },
        { value: 'medium', label: 'Moyenne' },
        { value: 'hard', label: 'Difficile' }
    ];

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty|''>('');

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(Number(e.target.value));
    };

    useEffect(() => {
        fetchQuizCategory().then((data) => {
            setCategories(data);
        }).catch((err) => {
            setError(err.message);
        });
    }, []);

    const handleClick = () => {
        handleCreate(selectedCategory, selectedDifficulty);
    };
    

    return (
        <div>
            {error ? (
                <p>Erreur : {error}</p>
            ) : (
                <div className="flex items-center  ">
                    <select id="categorySelect" onChange={handleChange} value={selectedCategory ?? ''} className="border rounded px-4 py-2 mr-4">
                        <option value="" > Select category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <select
                        id="difficultySelect"
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
                         className="border rounded px-4 py-2 mr-4"
                    >
                        <option value="">Select difficulty</option>
                        {difficulties.map(diff => (
                            <option key={diff.value} value={diff.value}>
                                {diff.label}
                            </option>
                        ))}
                    </select>

                    <button id="createBtn"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
                        Create
                    </button>
                </div>
            )}



        </div>
    )
}

export default QuizzDefinition;