import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import noImage from '../assets/no-image.png';

const WorkspaceItem = ({ spaceId }) => {
  const { workspaces } = useSelector((store) => store.workspaces);
  const workspace = workspaces.find((space) => Number(space.id) === spaceId);

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
