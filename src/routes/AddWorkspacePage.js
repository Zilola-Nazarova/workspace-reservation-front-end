import styles from '../styles/AddWorkspacePage.module.css';

const AddWorkspacePage = () => {
  const handleSubmit = () => { };
  return (
    <div className={styles.page}>
      <p>Create New Workspace</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" />
        </label>
        <br />
        <br />
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            rows="4" // Set the number of visible lines
            cols="50"
          />
        </label>
        <br />
        <br />
        <label htmlFor="image">
          Image
          <input type="file" name="image" id="image" />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddWorkspacePage;
