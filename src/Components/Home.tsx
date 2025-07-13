import { useState } from "react"
import Quizz from "../Components/QuizzGaming"
import QuizzDefinition from "../Components/QuizzDefinition"      
import  { type Question, type Difficulty } from "../models/quizModels"
import { fetchQuestions } from "../apis/quizzApi"


const Home:React.FC=()=> {
const [quizz,setQuizz] = useState<Question[]>([])

const createQuizz = (category:number,difficulty:Difficulty|'') =>{
  if (category === 0 || difficulty === '') {
    alert("Veuillez sélectionner une catégorie et une difficulté.");
    return;
  }
  fetchQuestions(category, difficulty).then((data) => {
    setQuizz(data);
  }).catch((error) => {
    console.error("Erreur lors de la récupération des questions :", error);
  });

}


  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <p className="text-2xl mb-2">Quizz marker</p>
     <QuizzDefinition handleCreate={createQuizz}/>
      <Quizz  quizz={quizz} />
    </div>
  )
}

export default Home
