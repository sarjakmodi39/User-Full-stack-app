import { useEffect, useState } from "react";
import AddUsersModal from "../modal/addUser";
import axios from "axios";
import UserCard from "./usercard";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState("");
  const [id, setId] = useState();
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

  const changeName = (user) => {
    setIsEdit(true);
    setCurrentUser(user);
    setName(user.name);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const handleChangeName = () => {
    fetch("http://localhost:3000/users/updateUser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, id: currentUser.id }),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        getUserDetails();
        alert(response.message);
        setIsEdit(false);
      });
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDeleteUser = (user) => {
    console.log("hee");
    fetch("http://localhost:3000/users/deleteUser", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id }),
    })
      .then((result) => result.json())
      .then((response) => {
        getUserDetails();
        alert(response.message);
      });
  };

  return (
    <>
      <div className="container">
        {users.map((user) => {
          return (
            <>
              <div key={user.id} className="card">
                <UserCard
                  name={user.name}
                  id={user.id}
                  mobileNumber={user.mobileNumber}
                ></UserCard>
                <button
                  onClick={() => {
                    changeName(user);
                  }}
                >
                  Edit
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    handleDeleteUser(user);
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          );
        })}
      </div>
      {isEdit && (
        <div>
          <input type="text" onChange={handleNameChange} value={name} />
          <button type="submit" onClick={handleChangeName}>
            submit
          </button>
        </div>
      )}
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
