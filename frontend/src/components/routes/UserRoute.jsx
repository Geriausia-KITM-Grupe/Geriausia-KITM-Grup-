const UserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }
  return children;
};

export default UserRoute;
