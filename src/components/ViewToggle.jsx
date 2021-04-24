import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

/*
 * Updates user view to be either list or card based
 */
const ViewToggle = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") history.replace(`/card${location.search}`);
  });

  return (
    <ToggleButtonGroup
      value={location.pathname} //set highlighted button
      exclusive
      onChange={(event, value) => {
        //send selected button value
        if (value !== null) {
          history.push(`${value}${location.search}`);
        }
      }}
    >
      <ToggleButton value="/card">Card</ToggleButton>
      <ToggleButton value="/list">List</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
