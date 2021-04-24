import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import person from "../assets/person.png";
import {
  getPlayerName,
  getPlayerHeight,
  getPlayerPosition,
  getPlayerTeam,
} from "./playerUtils";

/*
 * List item based off of player data
 */
const PlayerListItem = ({ player }) => {
  return (
    <ListItem key={player.id}>
      <ListItemAvatar>
        <Avatar alt="NBA Player Placeholder" src={person} />
      </ListItemAvatar>
      <ListItemText
        primary={getPlayerName(player)}
        secondary={
          <>
            <Typography component="span">{getPlayerHeight(player)}</Typography>
            <br />
            <Typography component="span">
              {getPlayerPosition(player)}
            </Typography>
            <br />
            <Typography component="span">{getPlayerTeam(player)}</Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default PlayerListItem;
