import { useState } from "react"
import Quizz from "../Components/QuizzGaming"
import QuizzDefinition from "../Components/QuizzDefinition"      
import  { type Question, type Difficulty } from "../models/quizModels"
import { fetchQuestions } from "../apis/quizzApi"


const Home:React.FC=()=> {
const [quizz,setQuizz] = useState<Question[]>([])

const createQuizz = (category:number,difficulty:Difficulty|'') =>{
  if (category === 0 || difficulty === '') {
    alert("Please select category and difficulty.");
    return;
  }
  fetchQuestions(category, difficulty).then((data) => {
    setQuizz(data);
  }).catch((error) => {
    console.error("Error :", error);
  });

}


  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <p className="text-2xl mb-2">Quizz maker</p>
     <QuizzDefinition handleCreate={createQuizz}/>
      <Quizz  quizz={quizz} />
    </div>
  )
}

export default Home
