// UI gate only. ASP.NET MUST also authenticate and authorize every private API request.
export default function ProtectedRoute({ isAuthenticated, fallback, children }) {
  return isAuthenticated ? children : fallback;
}
