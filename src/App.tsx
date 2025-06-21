
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AddEventPage } from "./pages/AddEventPage";
import { AddHomeworkPage } from "./pages/AddHomeworkPage";
import { AddResultPage } from "./pages/AddResultPage";
import { AddStudentPage } from "./pages/AddStudentPage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/add-homework" element={<AddHomeworkPage />} />
          <Route path="/add-result" element={<AddResultPage />} />
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
