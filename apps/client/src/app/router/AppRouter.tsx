import { Route, Routes } from "react-router-dom";

import ExamPage from "../../pages/ExamPage.tsx";
import LoginPage from "../../pages/LoginPage.tsx";
import ResultPage from "../../pages/ResultPage.tsx";
import TutorialPage from "../../pages/TutorialPage.tsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/tutorial" element={<TutorialPage />} />
      <Route path="/exam" element={<ExamPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default AppRouter;
