import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import noImage from "../assets/no-image.png";

const WorkspaceItem = ({ spaceId }) => {
  const { workspaces } = useSelector((store) => store.workspaces);
  const workspace = workspaces.find((space) => Number(space.id) === spaceId);

  if (workspace) {
    return (
      <div className="flex flex-col gap-4 bg-white rounded-lg p-2">
        <h3 className="font-bold">Details</h3>
        <p>Room name: {workspace.name}</p>
        <p>Description: {workspace.description}</p>
        {workspace.image_url ? (
          <div
            className={`h-96 w-96 bg-cover bg-center rounded-lg`}
            style={{ backgroundImage: `url(${workspace.image_url})` }}
          ></div>
        ) : (
          <img className="h-96" alt="not provided" src={noImage} />
        )}
        {/* <div>
          {workspace.image_url ? (
            <img alt={`${workspace.name}`} src={workspace.image_url} />
          ) : (
            <img alt="not provided" src={noImage} />
          )}
        </div> */}
      </div>
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
