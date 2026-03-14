import QueryProvider from "./providers/QueryProvider.tsx";
import AppRouter from "./router/AppRouter.tsx";

function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
