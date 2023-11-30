import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import noImage from '../assets/no-image.png';

// import styles from '../styles/ReservationsPage.module.css';

const WorkspaceItem = ({ spaceId }) => {
  const { workspaces } = useSelector((store) => store.workspaces);
  const workspace = workspaces.find((space) => space.ID === spaceId);

  return (
    <>
      <h3>Details about the room reserved:</h3>
      <span>Room name:</span>
      {' '}
      <span>{ workspace.name }</span>
      <div>
        {(workspace.image)
          ? <img alt={`${workspace.name}`} src={workspace.image} />
          : <img alt="not provided" src={noImage} />}
      </div>
      <span>{ workspace.description }</span>
    </>
  );
};

WorkspaceItem.propTypes = {
  spaceId: PropTypes.objectOf(PropTypes.number).isRequired,
};
export default WorkspaceItem;
