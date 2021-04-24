import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import person from "../assets/person.png";
import {
  getPlayerName,
  getPlayerHeight,
  getPlayerPosition,
  getPlayerTeam,
} from "./playerUtils";

const useStyles = makeStyles({
  card: { height: "13rem", width: "16rem", margin: "auto" },
  cardMedia: {
    maxWidth: "20%",
    height: "auto",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
  },
  cardMediaBack: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

/*
 * Card based off of player data
 */
const PlayerCard = ({ player }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMediaBack}>
        <img
          src={person}
          className={classes.cardMedia}
          alt="NBA Player Placeholder"
        />
      </CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography>{getPlayerName(player)}</Typography>
        <Typography>{getPlayerHeight(player)}</Typography>
        <Typography>{getPlayerPosition(player)}</Typography>
        <Typography>{getPlayerTeam(player)}</Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
