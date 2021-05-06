import { Grid } from "@material-ui/core";
import PlayerCard from "./PlayerCard";

/*
 * Card format for player data
 */
const PlayerCardGrid = ({ players }) => {
  return (
    <Grid container alignItems="center" justify="center" spacing={4}>
      {players.map((player) => {
        return (
          <Grid item sm={6} md={4} key={player.id}>
            <PlayerCard player={player} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PlayerCardGrid;
