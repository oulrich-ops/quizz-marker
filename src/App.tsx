import {
    BrowserRouter as Router,
    Route, Routes
} from 'react-router-dom';
import Home from "./Components/Home";
import QuizzResult from './Components/QuizzResult';
import NotFound from './Components/NotFound';



function App() {
 return (
        <Router basename="/quizz-marker">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quizz-result" element={<QuizzResult />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
        </Router>
    );
}

export default App
