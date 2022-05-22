import { Modal, Button } from "@mui/material";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import css from "./modal.module.css";

const AddUsersModal = (props) => {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNnumber] = useState("");
  const [message, setMessage] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNnumber(event.target.value);
  };

  const handleSubmit = () => {
    fetch("http://localhost:3000/users/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        id: id,
        mobileNumber: mobileNumber,
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        props.onSave();
        alert(response.message);
        props.onClose();
      });
  };

  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <div className={css.modalContainer}>
          <div className={css.modal}>
            <header className={css.header}>Add User</header>
            <form className={css.form}>
              <div className={css.inputFieldContainer}>
                <label className={css.label}>Id:</label>
                <div className={css.inputContainer}>
                  <input
                    className={css.input}
                    type="number"
                    onChange={handleIdChange}
                    value={id}
                  />
                </div>
              </div>
              <div className={css.inputFieldContainer}>
                <label className={css.label}>Name:</label>
                <div className={css.inputContainer}>
                  <input
                    className={css.input}
                    type="text"
                    onChange={handleNameChange}
                    value={name}
                  />
                </div>
              </div>
              <div className={css.inputFieldContainer}>
                <label className={css.label}>M.No:</label>
                <div className={css.inputContainer}>
                  <input
                    className={css.input}
                    type="number"
                    onChange={handleMobileNumberChange}
                    value={mobileNumber}
                  />
                </div>
              </div>
            </form>
            <footer>
              <div className={css.buttonContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  submit
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AddUsersModal;
