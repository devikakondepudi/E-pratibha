import {  Routes,Route } from 'react-router-dom';
import Registration from './components/Register';
import VerifyEmailPage from './components/VerifyEmail';
import LoginPage from './components/Login';
import ExamList from './components/FreeExam';
import Questions from './components/Questions';
import FinishExamPage from './components/FinishExam';



function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Registration/>} />
      <Route path="/verifyEmail" element={<VerifyEmailPage/>} />
      <Route path="/Login" element={<LoginPage/>} />
      <Route path="/FreeExam" element={<ExamList/>} />
      <Route path="/Questions/24" element={<Questions/>}/>
      <Route path="/Questions/25" element={<Questions/>}/>
      <Route path="/Questions/1480" element={<Questions/>}/>
      <Route path="/Questions/1535" element={<Questions/>}/>
      <Route path="/Questions/1536" element={<Questions/>}/>
      <Route path="/Questions/1550" element={<Questions/>}/>
      <Route path="/Questions/1504" element={<Questions/>}/>
      <Route path="/Questions/1502" element={<Questions/>}/>
      <Route path="/Questions/1551" element={<Questions/>}/>
      <Route path="/Questions/1506" element={<Questions/>}/>
      <Route path="/Questions/1541" element={<Questions/>}/>
      <Route path="/Questions/1547" element={<Questions/>}/>
      <Route path="/Questions/1465" element={<Questions/>}/>
      <Route path="/Questions/1466" element={<Questions/>}/>
      <Route path="/Questions/1468" element={<Questions/>}/>
      <Route path="/Questions/1474" element={<Questions/>}/>
      <Route path="/FinishExam" element={<FinishExamPage/>} />
  
      </Routes>
    
  );
}

export default App;
