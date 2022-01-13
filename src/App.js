import React from 'react';
import MainPage from './pages/MainPage/MainPage';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <MainPage />
    </div>
    </QueryClientProvider>
  );
}

export default App;
