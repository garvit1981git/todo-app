let Listitems = ({ task, date, id, removing, removeclickhandler }) => {
  return (
    <div className="task-row">
      <span className="task-name">{task}</span>
      <span className="task-date">{date}</span>
      <button
        disabled={removing}
        className="delete-btn"
        onClick={() => {
          removeclickhandler(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default Listitems;
