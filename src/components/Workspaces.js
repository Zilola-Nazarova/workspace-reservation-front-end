import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import styles from '../styles/Workspaces.module.css';
import noImage from "../assets/no-image.png";

const Workspaces = () => {
  const { workspaces, isLoading, error } = useSelector(
    (store) => store.workspaces
  );
  const pageCount = Math.ceil(workspaces.length / 3);
  const [pos, setPos] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);
  const [workspacesToRender, setWorkspacesToRender] = useState([]);

  const handlePageUpChange = async () => {
    if (pos + 1 <= pageCount - 1) {
      setPos(pos + 1)
    }
  };

  const handlePageDownChange = async () => {
    if (pos - 1 >= 0) {
      setPos(pos - 1)
    }
  }
  
  useEffect(() => {
    const value = 3 + 3*pos
    if (value > workspaces.length) {
      setEndIndex(workspaces.length);
    } else {
      setEndIndex(value);
    }
  }, [pos, workspaces]);

  useEffect(() => {
    const value = 3*pos
    if (value < endIndex) {
      setStartIndex(value);
    }
  }, [endIndex]);

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
      <div className="flex justify-evenly items-center rounde">
        <button className="p-4 rounded-lg bg-green-600" onClick={() => handlePageDownChange()}>Page down</button>
        <ul className="flex justify-center items-center gap-4">
          {Array.isArray(workspacesToRender) && workspacesToRender.map((space) => {
            return (
              <li key={space.id} className="bg-red-500">
                <Link to={`workspaces/${space.id}`}>
                  <div>
                    {space.image_url ? (
                      <div
                        className={`h-52 w-52 bg-cover bg-center rounded-lg`}
                        style={{ backgroundImage: `url(${space.image_url})` }}
                      ></div>
                    ) : (
                      <img className="h-52" alt="not provided" src={noImage} />
                    )}
                  </div>
                  <div className=" text-center">
                    <h2 className={space.name}>{space.name}</h2>
                    <p className={space.description}>{space.description}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <button className="p-4 rounded-lg bg-green-600" onClick={() => handlePageUpChange()}>Page up</button>
      </div>
    );
  }
  return <p>No workspaces found.</p>;
};

export default Workspaces;
