import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { useAuth } from "./state/state";

import Layout from "./shared/Layout";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

function App() {
  const { user } = useAuth();

  const navigate = useNavigate();

  // If the user is not logged in, redirect to the login page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

// Simple wrapper for <Route> that redirects to the login page if you're not yet authenticated.
function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default App;
