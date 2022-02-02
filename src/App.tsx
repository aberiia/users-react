import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ThemeButton from "./components/Buttons/ThemeButton";
import { history } from "./helpers/history";

import "./App.css";
import SignUpPage from "./pages/LoginPage/SignUpPage";

function App() {
  const theme = useSelector((state: RootState) => state.theme);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

//   history.listen((location, action) => {
//     // clear alert on location change
//     dispatch(alertActions.clear());
// });

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className={theme === "light" ? "App" : "App-dark"}>
          <ThemeButton {...theme} />
          <Routes>
            <Route path="/" element={<PrivateRoute component={MainPage} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
