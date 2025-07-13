import { useEffect, useState } from "react";
import type { Question } from "../models/quizModels";
import { shuffleArray } from "../utils";
import { useNavigate } from "react-router-dom";

interface Props {
    quizz: Question[]
}

export interface QuestionWithAnswers extends Question {
    shuffledAnswers: string[];
}

const Quizz: React.FC<Props>=(props: Props) => {

    const [questions, setQuestions] = useState<QuestionWithAnswers[]>([]);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        const withShuffled = props.quizz.map((q) => ({
            ...q,
            shuffledAnswers: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
        }));
        setQuestions(withShuffled);
        setUserAnswers(new Array(withShuffled.length).fill(''));
    }, [props.quizz])


    const handleAnswer = (index: number, answer: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[index] = answer;
        setUserAnswers(newAnswers);
    };

    const handleSubmit = () => {
       navigate("/quizz-result", { state: { questions, userAnswers } });
  };

  const allAnswered = userAnswers.length>0 && userAnswers.every(ans => ans !== '');
   


    return (
    <div className="space-y-6">
      {questions.map((q, index) => (
        <div key={index} className="p-2">
          <p className="font-semibold mb-2" dangerouslySetInnerHTML={{ __html: q.question }}/>
          <div className="flex gap-2">
            {q.shuffledAnswers.map((answer) => {
              const isSelected = userAnswers[index] === answer;

              return (
                <button
                  key={answer}
                  className={` hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded
                    ${isSelected ? 'bg-blue-200' : ''}
                  
                  `}
                  onClick={() => handleAnswer(index, answer)}
                  >
                    {answer}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {allAnswered && (<button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>)}
    </div>
  );
}

export default Quizz;
