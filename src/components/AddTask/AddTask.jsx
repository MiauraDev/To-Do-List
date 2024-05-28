import styles from "./styles.module.css";

function CreateTodoButton() {
  return (
    <div className={styles.AddTaskContainer}>
      <button></button>
      <p>Add a new Task</p>
    </div>
  );
}

export { CreateTodoButton };
