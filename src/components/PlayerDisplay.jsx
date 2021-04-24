import PlayerCardGrid from "./PlayerCardGrid";
import PlayerList from "./PlayerList";
import axios from "axios";
import { Link, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { mw, errorLoadingDisplayStyle } from "../consts";
/*
 * Displays current directory of players via search parameters provided by URI
 */
const PlayerDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerData, setPlayerData] = useState({});
  const location = useLocation(); //retrieve current URI data
  const searchParam = new URLSearchParams(location.search); //convert to proper param dictionary
  const page = parseInt(searchParam.get("page") || "1"); //pagination parameter
  const search = searchParam.get("search") || ""; //search bar input parameter
  useEffect(() => {
    //API call to retrieve player data
    setLoading(true); //Set loading state to true while making API call
    const searchParam = new URLSearchParams(location.search);
    const page = parseInt(searchParam.get("page") || "1");
    const search = encodeURIComponent(searchParam.get("search") || "");
    const searchStr = search.length !== 0 ? `&search=${search}` : "";
    axios
      .get(
        `https://www.balldontlie.io/api/v1/players?per_page=24&page=${page}${searchStr}`
      )
      .then(
        (result) => {
          //If succeed, set data state to received data
          setPlayerData(result);
          setLoading(false);
        },
        (err) => {
          //If error, set error state to true
          setError(err);
          setLoading(false);
        }
      );
  }, [location]);
  if (loading) {
    //While loading
    return <CircularProgress style={errorLoadingDisplayStyle} />;
  }
  if (error) {
    //When error
    return <div style={errorLoadingDisplayStyle}>{`${error}`}</div>;
  }
  //When data received
  const players = playerData.data.data;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: mw,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 20,
        }}
      >
        <Pagination //Pagination feature
          page={page}
          count={playerData.data.meta.total_pages}
          renderItem={(item) => {
            return page === item.page ? (
              <PaginationItem {...item} />
            ) : (
              <PaginationItem //Links to different pages (update page param in URI)
                component={Link}
                to={
                  search !== ""
                    ? `${location.pathname}?search=${search}${
                        item.page === 1 ? "" : `&page=${item.page}`
                      }`
                    : `${location.pathname}${
                        item.page === 1 ? "" : `?page=${item.page}`
                      }`
                }
                {...item}
              />
            );
          }}
        />
      </div>
      <div
        style={{
          maxWidth: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          minHeight: "15rem",
        }}
      >
        <div style={{ maxWidth: mw, margin: "auto" }}>
          <Route path="/list">
            <PlayerList players={players} />
          </Route>
          <Route path="/card">
            <PlayerCardGrid players={players} />
          </Route>
        </div>
      </div>
    </>
  );
};
export default PlayerDisplay;
