import { Route, Routes } from "react-router-dom";

import ExamPage from "../../pages/ExamPage.tsx";
import LoginPage from "../../pages/LoginPage.tsx";
import TutorialPage from "../../pages/TutorialPage.tsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/tutorial" element={<TutorialPage />} />
      <Route path="/exam" element={<ExamPage />} />
    </Routes>
  );
}

export default AppRouter;
