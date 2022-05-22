const UserCard = ({ id, name, mobileNumber }) => {
  return (
    <>
      <div key={id} className="card">
        <p>Id={id}</p>
        <p>Name={name}</p>
        <p>Mobile={mobileNumber}</p>
      </div>
    </>
  );
};
export default UserCard;
