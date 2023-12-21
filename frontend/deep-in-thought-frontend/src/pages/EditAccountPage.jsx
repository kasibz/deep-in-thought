import { useEffect, useState } from "react";
import UserAccountComponent from "../components/user/UserAccountComponent";
import { UserContext } from "../context/UserContext";

function EditAccountPage() {
  const { user } = UserContext();
  const userType = Object.keys(user[0])[0].slice(0, -2); // getting the type of user from context as string for url
  const userId = Object.entries(user[0])[0][1]; // getting Id dynamically
  const [userData, setUserData] = useState(null);

  // get the user information based on kind of id and pass that to the user Account Component
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:8080/${userType}/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    };
    fetchUser();
  }, [userId, userType]);

  return (
    <div>
      <h2>Edit Account</h2>
      {userData ? (
        <UserAccountComponent userData={userData} userType={userType} />
      ) : (
        <p>Data loading...</p>
      )}
    </div>
  );
}

export default EditAccountPage;
