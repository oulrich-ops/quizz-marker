import type { QuestionWithAnswers } from "./QuizzGaming";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  questions: QuestionWithAnswers[],
  userAnswers: string[]
}



const QuizzResult: React.FC = () => {

  const location = useLocation();
  const { questions, userAnswers }: LocationState = location.state || {};

  const navigate = useNavigate();

  const handleNewQuiz = () => {
    navigate('/');
  }
  const score = userAnswers.filter((answr, i) => answr === questions[i].correct_answer).length
  const scoreBgStyle = score <= 2 ? 'bg-red-500' : score <= 3 && score >= 2 ? 'bg-yellow-500' : 'bg-green-200';



  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <h1 className="text-2xl mb-4">Results</h1>
      <p className="mb-4">Yours answers :</p>
      <div className="space-y-6 mx-12">
        {questions!.map((q, index) => (
          <div key={index} className="p-4">
            <p className="font-semibold mb-2" dangerouslySetInnerHTML={{ __html: q.question }} />
            <div className="flex gap-2">
              {q.shuffledAnswers.map((answer) => {
                const isCorrectAnswer = answer === q.correct_answer;
                const isUserWrongAnswer = answer === userAnswers[index] && userAnswers[index] !== q.correct_answer;



                return (
                  <button
                    key={answer}
                    className={`py-2 px-4 border rounded font-semibold
        ${isCorrectAnswer ? 'bg-green-200 text-green-800 border-green-600' : ''}
        ${isUserWrongAnswer ? 'bg-red-200 text-red-800 border-red-600' : ''}
      `}
                    disabled
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />

                );
              })}
            </div>
          </div>
        ))}

        <p className={`text-center text-white ` + scoreBgStyle}>Votre score : {score} sur {questions.length}</p>

        <button
          onClick={handleNewQuiz}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-blue-700 w-full"
        >
          Create a new quizz
        </button>
      </div>
    </div>
  );
}

export default QuizzResult;
