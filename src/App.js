import SearchBar from "./components/SearchBar";
import PlayerDisplay from "./components/PlayerDisplay";
import ViewToggle from "./components/ViewToggle";
import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mw } from "./consts";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    maxWidth: mw,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2rem",
    marginTop: "2rem",
  },
});
/*
 * Main body of application, binds different features together
 */
const NbaApp = () => {
  const classes = useStyles();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Toolbar className={classes.toolbar}>
        <div style={{ paddingRight: 10 }}>
          <SearchBar />
        </div>
        <ViewToggle />
      </Toolbar>
      <PlayerDisplay />
    </div>
  );
};

export default NbaApp;
