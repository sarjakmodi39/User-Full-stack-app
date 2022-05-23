import { useState } from "react";
const UserCard = ({ getUserDetails, user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState("");

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
      <div key={user.id} className="card">
        <p>Id={user.id}</p>
        <p>Name={user.name}</p>
        <p>Mobile={user.mobileNumber}</p>
        {isEdit && (
          <div>
            <input type="text" onChange={handleNameChange} value={name} />
            <button type="submit" onClick={handleChangeName}>
              submit
            </button>
          </div>
        )}
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
};
export default UserCard;
