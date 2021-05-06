import React from "react";
import { List, Divider } from "@material-ui/core";
import PlayerListItem from "./PlayerListItem";

/*
 * List format for player data
 */
const PlayerList = ({ players }) => {
  return (
    <List>
      {players.map((player, ind) => {
        return (
          <React.Fragment key={player.id}>
            <PlayerListItem player={player} />
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default PlayerList;
