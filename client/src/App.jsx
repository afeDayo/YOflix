import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home/Home"));

const Movies = lazy(() => import("./pages/Movies"));

const TvSeries = lazy(() => import("./pages/TvSeries"));

const SignIn = lazy(() => import("./pages/Signin"));

const SignUp = lazy(() => import("./pages/SignUp"));

const Bookmark = lazy(() => import("./pages/Bookmark"));

const Error = lazy(() => import("./pages/Error"));

const RootLayout = lazy(() => import("./layout/RootLayout"));

const AuthLayout = lazy(() => import("./layout/AuthLayout"));

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./utils/Loading";
import PrivateRoute from "./utils/PrivateRoute";

const prefetch = (importFn) => {
  importFn();
};

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tvseries" element={<TvSeries />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/bookmark" element={<Bookmark />} />
                </Route>
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

// https://techflix-backend.onrender.com
