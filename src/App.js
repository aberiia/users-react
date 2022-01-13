import React from 'react';
import Try from './pages/MainPage/Try';
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
      <Try />
    </div>
    </QueryClientProvider>
  );
}

export default App;
