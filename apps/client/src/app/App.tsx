import { Toaster } from "react-hot-toast";

import QueryProvider from "./providers/QueryProvider.tsx";
import AppRouter from "./router/AppRouter.tsx";

function App() {
  return (
    <QueryProvider>
      <AppRouter />
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#111827",
          },
        }}
      />
    </QueryProvider>
  );
}

export default App;
