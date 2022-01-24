import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage/MainPage";
import ThemeButton from "./components/Buttons/ThemeButton";
import "./App.css";
import { RootState } from "./redux/store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const theme = useSelector((state: RootState) => state.theme);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className={theme === "light" ? "App" : "App-dark"}>
          <ThemeButton {...theme} />
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
