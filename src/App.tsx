
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AddEventPage } from "./pages/AddEventPage";
import { AddHomeworkPage } from "./pages/AddHomeworkPage";
import { AddResultPage } from "./pages/AddResultPage";
import { AddStudentPage } from "./pages/AddStudentPage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/add-event" element={
              <ProtectedRoute>
                <AddEventPage />
              </ProtectedRoute>
            } />
            <Route path="/add-homework" element={
              <ProtectedRoute>
                <AddHomeworkPage />
              </ProtectedRoute>
            } />
            <Route path="/add-result" element={
              <ProtectedRoute>
                <AddResultPage />
              </ProtectedRoute>
            } />
            <Route path="/add-student" element={
              <ProtectedRoute>
                <AddStudentPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
