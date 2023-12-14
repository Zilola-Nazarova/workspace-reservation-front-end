import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noImage from '../assets/no-image.png';

const Workspaces = () => {
  const { workspaces, isLoading, error } = useSelector(
    (store) => store.workspaces,
  );
  const pageCount = Math.ceil(workspaces.length / 3);
  const [pos, setPos] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);
  const [workspacesToRender, setWorkspacesToRender] = useState([]);

  const handlePageUpChange = async () => {
    if (pos + 1 <= pageCount - 1) {
      setPos(pos + 1);
    }
  };

  const handlePageDownChange = async () => {
    if (pos - 1 >= 0) {
      setPos(pos - 1);
    }
  };

  useEffect(() => {
    const value = 3 + 3 * pos;
    if (value > workspaces.length) {
      setEndIndex(workspaces.length);
    } else {
      setEndIndex(value);
    }
  }, [pos, workspaces]);

  useEffect(() => {
    const value = 3 * pos;
    if (value < endIndex) {
      setStartIndex(value);
    }
  }, [pos, endIndex]);

  useEffect(() => {
    setWorkspacesToRender(workspaces.slice(startIndex, endIndex));
  }, [startIndex, endIndex, workspaces]);

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
  if (workspacesToRender.length > 0) {
    return (
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Workspaces</h2>
          <p>Please select your preferred option</p>
        </div>
        <div className="flex justify-evenly items-center">
          <button
            type="button"
            aria-label="Previous workspaces"
            className="m-auto h-12 w-12 rounded-full bg-green-600 text-white"
            onClick={() => handlePageDownChange()}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <ul className="flex justify-center items-center flex-col md:flex-row gap-4">
            {Array.isArray(workspacesToRender)
              && workspacesToRender.map((space) => (
                <li
                  key={space.id}
                  className="bg-green-50 p-4 rounded-lg shadow-lg  flex-1"
                >
                  <Link
                    to={`workspaces/${space.id}`}
                    className="flex flex-col justify-center items-center gap-8"
                  >
                    <div>
                      {space.image_url ? (
                        <div
                          className="h-52 w-52 bg-cover bg-center rounded-lg"
                          style={{ backgroundImage: `url(${space.image_url})` }}
                        />
                      ) : (
                        <img
                          className="h-52"
                          alt="not provided"
                          src={noImage}
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <h2 className="text-lg font-bold">{space.name}</h2>
                      <h2 className="font-bold text-green-600">
                        $
                        {space.price_per_day}
                      </h2>
                      <p>{space.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
          <button
            type="button"
            aria-label="Next workspaces"
            className="m-auto h-12 w-12 rounded-full bg-green-600  text-white"
            onClick={() => handlePageUpChange()}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
    );
  }
  return <p>No workspaces found.</p>;
};

export default Workspaces;
