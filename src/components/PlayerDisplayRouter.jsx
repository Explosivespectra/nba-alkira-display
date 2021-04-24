import { BrowserRouter as Router, Route } from "react-router-dom";
import PlayerDisplay from "./PlayerDisplay";
const PlayerDisplayRouter = ({ searchParam, isListView }) => {
  return <PlayerDisplay searchParam={searchParam} isListView={isListView} />;
};
export default PlayerDisplayRouter;
