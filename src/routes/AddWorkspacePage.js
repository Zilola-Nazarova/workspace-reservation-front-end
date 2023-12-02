import { useDispatch } from 'react-redux';
import { postWorkspace } from '../redux/workspaces/workspacesSlice';
import styles from '../styles/AddWorkspacePage.module.css';

const AddWorkspacePage = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('workspace[name]', e.target.name.value);
    data.append('workspace[description]', e.target.description.value);

    if (e.target.image.files.length > 0) {
      data.append('workspace[image]', e.target.image.files[0]);
    }

    console.log(data);

    try {
      const resultAction = await dispatch(postWorkspace(data));
      console.log('Workspace created successfully:', resultAction.payload);
    } catch (error) {
      console.error('Failed to create workspace:', error);
    }
  };

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
            rows="4"
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
