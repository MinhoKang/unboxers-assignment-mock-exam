import { Route, Routes } from "react-router-dom";

import ExamPage from "../../pages/ExamPage.tsx";
import LoginPage from "../../pages/LoginPage.tsx";
import TutorialPage from "../../pages/TutorialPage.tsx";

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
