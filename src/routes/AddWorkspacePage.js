import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postWorkspace } from '../redux/workspaces/workspacesSlice';
import styles from '../styles/AddWorkspacePage.module.css';

const AddWorkspacePage = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('workspace[name]', e.target.name.value);
    data.append('workspace[description]', e.target.description.value);

    if (e.target.image.files.length > 0) {
      data.append('workspace[image]', e.target.image.files[0]);
    }

    try {
      const sendData = {
        data,
        token
      }
      const resultAction = await dispatch(postWorkspace(sendData));
      if (resultAction.payload.success) {
        setSuccess(resultAction.payload.success);
      }
      if (resultAction.payload.error) {
        setFail(resultAction.payload.error);
      }
    } catch (error) {
      setFail(error);
    }
  };

  const resetform = () => {
    formRef.current.reset();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(null);
      setFail(null);
    }, 3000);

    if (success) {
      resetform();
    }
    return () => clearTimeout(timer);
  }, [success, fail]);

  return (
    <div className={styles.page}>
      {success && <p>{success}</p>}
      {fail && <p>{fail}</p>}
      <p>Create New Workspace</p>
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" required />
        </label>
        <br />
        <br />
        <label htmlFor="description">
          Description
          <textarea name="description" id="description" rows="4" cols="50" required />
        </label>
        <br />
        <br />
        <label htmlFor="image">
          Image
          <input type="file" name="image" id="image" required />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddWorkspacePage;
