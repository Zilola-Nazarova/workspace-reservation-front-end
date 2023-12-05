import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkspace, getWorkspaces, resetDeleteFail } from '../redux/workspaces/workspacesSlice';
import styles from '../styles/RemoveWorkspacePage.module.css';
// import RemoveWorkspace from '../components/RemoveWorkspace';

const RemoveWorkspacePage = () => {
  const { token } = useSelector((state) => state.auth);
  const {
    workspaces, isLoading, error, isDeleting, deleteFail,
  } = useSelector(
    (store) => store.workspaces,
  );
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fail, setFail] = useState(null);

  useEffect(() => {
    dispatch(getWorkspaces(token));
  }, [dispatch, token, isSuccess]);

  const handleDelete = async (id) => {
    const sendData = {
      id,
      token,
    };
    const actionResult = await dispatch(deleteWorkspace(sendData));
    if (actionResult.payload) {
      setIsSuccess(!isSuccess);
      setSuccess(actionResult.payload.success);
    }
    if (actionResult.payload.error) {
      setFail(actionResult.payload.error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(null);
      setFail(null);
      if (deleteFail) {
        dispatch(resetDeleteFail);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [success, fail, dispatch, deleteFail]);

  if (isLoading) {
    return <div>Loading......</div>;
  }
  if (error) {
    return (
      <p>
        Something went wrong!
        <br />
        {error}
      </p>
    );
  }

  return (
    <div className={styles.page}>
      <p>List workspaces with a delete button</p>
      {isDeleting && <p>Deleting Workspace....</p>}
      {success && <p>{success}</p>}
      {fail && <p>{fail}</p>}
      {deleteFail && <p>{deleteFail}</p>}
      <ul>
        {workspaces.map((space) => (
          <li key={space.id}>
            <p>{space.name}</p>
            <img alt={`${space.name}`} src={space.image_url} />
            <button
              type="button"
              onClick={() => {
                handleDelete(space.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveWorkspacePage;
