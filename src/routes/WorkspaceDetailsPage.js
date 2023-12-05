import { useParams } from 'react-router-dom';

// VERSION 1
// import { useSelector } from 'react-redux';
// END

// VERSION 2
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkspace } from '../redux/workspaces/workspacesSlice';
// END

import styles from '../styles/WorkspaceDetails.module.css';
import noImage from '../assets/no-image.png';

const WorkspaceDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // VERSION 1
  // const { token } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getWorkspaces(token));
  // }, [dispatch, token]);

  // const { workspaces, isLoading, error } = useSelector((store) => store.workspaces);
  // const workspace = workspaces.find((space) => String(space.id) === id);
  // END

  // VERSION 2
  const { token } = useSelector((state) => state.auth);
  const { workspace, isLoading, error } = useSelector((store) => store.workspaces);

  useEffect(() => {
    dispatch(getWorkspace({ token, id }));
  }, [dispatch, token, id]);
  // END

  if (isLoading) {
    return (
      <div>Loading......</div>
    );
  }
  if (error) {
    return (
      <p>
        Something went wrong!
        <br />
        { error }
      </p>
    );
  }
  if (workspace.name) {
    return (
      <>
        <div className={styles.page}>
          <p>This is WorkspaceDetailsPage</p>
          {(workspace.image_url)
            ? <img alt={`${workspace.name}`} src={workspace.image_url} />
            : <img alt="not provided" src={noImage} />}
          <div className={workspace.workspace_info}>
            <h2 className={workspace.name}>{workspace.name}</h2>
            <p className={workspace.description}>{workspace.description}</p>
          </div>
        </div>
      </>
    );
  }

  return <p>We couldn&apos;t find details about this room.</p>;
};

export default WorkspaceDetailsPage;
