import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import PhotoResult from "./pages/PhotoResult";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-load heavy visualisation pages so the main bundle stays small
const Charts = lazy(() => import("./pages/Charts"));
const OfficeMap = lazy(() => import("./pages/Map"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected routes — require sign-in */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/:id"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />
        <Route
          path="/photo-result"
          element={
            <ProtectedRoute>
              <PhotoResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/charts"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader fullScreen />}>
                <Charts />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader fullScreen />}>
                <OfficeMap />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
