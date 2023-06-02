import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyJobs from "./CompanyJobs";
import Jobs from "./Jobs";
import NotFoundError from "./NotFoundError";
import UnauthorizedError from "./UnauthorizedError";
import BadRequestError from "./BadRequestError";
import ServerError from "./SeverError";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

/** RoutesList component for all Routes
 *
 * BrowserRouter -> RoutesList -> { Routes, [Route, ...] }
 */

export default function RoutesList({ login, signup, updateProfile }) {
  // TODO: use context for user and guard against unauthorized route access
  const storedToken = localStorage.getItem('token');

  return (
    <Routes >
      <Route path="/" element={<Homepage />} />

      <Route path="/404" element={<NotFoundError />} />
      <Route path="/401" element={<UnauthorizedError />} />
      <Route path="/403" element={<BadRequestError />} />
      <Route path="/500" element={<ServerError />} />

      <Route path="*" element={<Navigate to="/" />} />

      {storedToken &&
        <>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyJobs />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<ProfileForm updateProfile={updateProfile} />} />
        </>
      }
      {!storedToken &&
        < >
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
        </ >
      }
    </Routes>
  );
}
