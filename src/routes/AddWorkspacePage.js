import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  postWorkspace,
  resetPostFail,
} from '../redux/workspaces/workspacesSlice';

const AddWorkspacePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { isPosting, postFail } = useSelector((store) => store.workspaces);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const formRef = useRef(null);

  const handlePriceValidation = (e) => {
    const price = e.target.value;
    setIsValid(/^\d+(\.\d{1,2})?$/.test(price));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('workspace[name]', e.target.name.value);
    data.append('workspace[description]', e.target.description.value);
    data.append('workspace[price_per_day]', e.target.price_per_day.value);

    if (e.target.image.files.length > 0) {
      data.append('workspace[image]', e.target.image.files[0]);
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
      {fail
        && fail.map((error) => (
          <p key={uuidv4()} className="text-red-500">
            {error}
          </p>
        ))}
      {isPosting && <p className="text-green-500">Creating...</p>}
      <h2 className="font-bold text-2xl">Create New Workspace</h2>
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label
          aria-label="name field"
          htmlFor="name"
          className="flex flex-col gap-2 text-lg font-semibold"
        >
          Name:
          <input
            className="p-4 rounded-lg border border-gray-300"
            type="text"
            name="name"
            id="name"
            required
          />
        </label>
        <label
          aria-label="description field"
          htmlFor="description"
          className="flex flex-col gap-2 text-lg font-semibold"
        >
          Description:
          <textarea
            className='p-4 rounded-lg border border-gray-300'
            name='description'
            id='description'
            required
          />
        </label>
        <label
          aria-label='price_per_day field'
          htmlFor='price_per_day'
          className='flex flex-col gap-2 text-lg font-semibold'
        >
          Price per day:
          {isValid == false && (
            <p>Please enter a valid price with up to two decimal places</p>
          )}
          <input
            className='p-2 rounded-lg border border-gray-300'
            type='number'
            step='0.01'
            name='price_per_day'
            id='price_per_day'
            placeholder='540.99'
            onChange={handlePriceValidation}
            required
          />
        </label>
        <label
          aria-label="image field"
          htmlFor="image"
          className="flex flex-col gap-2"
        >
          Image:
          <input
            className="file:p-4 file:rounded-full file:bg-green-500 file:border-none"
            type="file"
            accept=".png"
            name="image"
            id="image"
            required
          />
        </label>
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
