import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteWorkspace,
  getWorkspaces,
  resetDeleteFail,
} from '../redux/workspaces/workspacesSlice';
import noImage from '../assets/no-image.png';

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
    <div className="flex flex-col gap-12 p-8 mx-auto">
      <h2 className="font-bold text-2xl">Workspaces</h2>
      {isDeleting && <p>Deleting Workspace....</p>}
      {success && <p className="text-green-500">{success}</p>}
      {fail && <p className="text-red-500">{fail}</p>}
      {deleteFail && <p className="text-red-500">{deleteFail}</p>}
      <ul className="flex flex-col gap-8">
        {workspaces.map((space) => (
          <li
            key={space.id}
            className="flex flex-col md:flex-row bg-green-50 p-4 rounded-lg items-center gap-8"
          >
            <div className="flex flex-col gap-4 w-32">
              <p className="text-lg font-semibold">{space.name}</p>
              <p>{space.description}</p>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                type="button"
                onClick={() => {
                  handleDelete(space.id);
                }}
              >
                Delete
              </button>
            </div>
            {space.image_url ? (
              <div
                className="h-52 w-52 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${space.image_url})` }}
              />
            ) : (
              <img className="h-52" alt="not provided" src={noImage} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveWorkspacePage;
