import PropTypes from 'prop-types';

// VERSION 1
import { useSelector } from 'react-redux';

// VERSION 2
// import { React, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getWorkspace } from '../redux/workspaces/workspacesSlice';

import noImage from '../assets/no-image.png';

const WorkspaceItem = ({ spaceId }) => {
  // VERSION 1
  const { workspaces } = useSelector((store) => store.workspaces);
  const workspace = workspaces.find((space) => Number(space.id) === spaceId);

  // VERSION 2
  // const id = spaceId;
  // const { token } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getWorkspace({ token, id }));
  // }, [dispatch, token, id]);
  // const { workspace } = useSelector((store) => store.workspaces);

  if (workspace) {
    return (
      <>
        <h3>Details about the room reserved:</h3>
        <span>Room name:</span>
        {' '}
        <span>{ workspace.name }</span>
        <div>
          {(workspace.image_url)
            ? <img alt={`${workspace.name}`} src={workspace.image_url} />
            : <img alt="not provided" src={noImage} />}
        </div>
        <span>{ workspace.description }</span>
      </>
    );
  }
  return (
    <p>
      Ooops! Something went wrong.
      <br />
      We couldn&apos;t find information about this room.
    </p>
  );
};

WorkspaceItem.propTypes = {
  spaceId: PropTypes.number.isRequired,
};

export default WorkspaceItem;
