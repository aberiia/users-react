import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage/MainPage";
import ThemeButton from "./components/Buttons/ThemeButton";
import "./App.css";

function App() {
  const theme = useSelector((state) => state.theme);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
      <QueryClientProvider client={queryClient}>
        <div className={theme === 'light' ? 'App': 'App-dark'}>
          <ThemeButton theme={theme}/>
          <MainPage />
        </div>
      </QueryClientProvider>
      
  );
}

export default App;
