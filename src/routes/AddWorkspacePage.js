import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postWorkspace,
  resetPostFail,
} from "../redux/workspaces/workspacesSlice";
import styles from "../styles/AddWorkspacePage.module.css";

const AddWorkspacePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { isPosting, postFail } = useSelector((store) => store.workspaces);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("workspace[name]", e.target.name.value);
    data.append("workspace[description]", e.target.description.value);

    if (e.target.image.files.length > 0) {
      data.append("workspace[image]", e.target.image.files[0]);
    }

    try {
      const sendData = {
        data,
        token,
      };
      const actionResult = await dispatch(postWorkspace(sendData));
      if (actionResult.payload.success) {
        setSuccess(actionResult.payload.success);
      }
      if (actionResult.payload.error) {
        setFail(actionResult.payload.error);
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
      if (postFail) {
        dispatch(resetPostFail);
      }
    }, 3000);

    if (success) {
      resetform();
    }
    return () => clearTimeout(timer);
  }, [success, fail, dispatch, postFail]);

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      {success && <p className="text-green-500">{success}</p>}
      {fail &&
        fail.map((error) => (
          <p key={uuidv4()} className="text-red-500">
            {error}
          </p>
        ))}
      <h2 className="font-bold text-2xl">Create New Workspace</h2>
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg font-semibold">
            Name:
          </label>
          <input
            className="p-4 rounded-lg border border-gray-300"
            type="text"
            name="name"
            id="name"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg font-semibold">
            Description:
          </label>
          <textarea
            className="p-4 rounded-lg border border-gray-300"
            name="description"
            id="description"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-lg font-semibold">
            Image:
          </label>
          <input
            className="file:p-4 file:rounded-full file:bg-green-500 file:border-none"
            type="file"
            accept=".png"
            name="image"
            id="image"
            required
          />
        </div>
        <button
          className="bg-green-500 p-4 px-4 rounded-full hover:bg-green-600"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddWorkspacePage;
