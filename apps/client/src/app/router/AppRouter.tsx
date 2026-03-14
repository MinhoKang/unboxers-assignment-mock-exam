import { Route, Routes } from "react-router-dom";

import ExamPage from "../../features/exam/pages/ExamPage.tsx";
import LoginPage from "../../features/exam/pages/LoginPage.tsx";
import TutorialPage from "../../features/exam/pages/TutorialPage.tsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/exam" element={<ExamPage />} />
      <Route path="/tutorial" element={<TutorialPage />} />
    </Routes>
  );
}

export default AppRouter;
