import { useEffect, useState } from "react";
import AddUsersModal from "../modal/addUser";
import axios from "axios";
import UserCard from "./usercard";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    fetch("http://localhost:3000/users/getUsers")
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        setUsers(response.users);
      });
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="container">
        {users.map((user) => {
          return (
            <>
              <div key={user.id}>
                <UserCard
                  user={user}
                  getUserDetails={getUserDetails}
                ></UserCard>
              </div>
            </>
          );
        })}
      </div>

      <button type="submit" onClick={handleOpenModal}>
        Add User
      </button>

      <AddUsersModal
        open={isModalVisible}
        onClose={handleCloseModal}
        onSave={getUserDetails}
      ></AddUsersModal>
    </>
  );
};
export default UserDetails;
