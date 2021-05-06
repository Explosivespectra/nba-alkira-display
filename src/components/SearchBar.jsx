import { useCallback, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useState } from "react";
import Search from "@material-ui/icons/Search";
/*
 * Takes user input and updates URI with value
 */
const SearchBar = () => {
  const location = useLocation(); //retrieve current URI data
  const searchParam = new URLSearchParams(location.search); //convert to proper param dictionary
  const history = useHistory(); //history stack
  const [content, setContent] = useState(searchParam.get("search") || ""); //set state to initial URI value of search

  const makeDebounce = () => {
    let timer;
    return (input) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        history.push(
          `${location.pathname}${
            input !== "" ? `?search=${encodeURIComponent(input)}` : ""
          }`
        );
      }, 500);
    };
  };

  const debounce = useCallback(makeDebounce(), []);

  useEffect(() => {
    //Whenever location is updated...
    const searchParam = new URLSearchParams(location.search);
    setContent(searchParam.get("search") || ""); //Update state to URI value of search
  }, [location, setContent]);

  //function to handle submission of input
  const handleSearch = () => {
    history.push(
      `${location.pathname}${
        content !== "" ? `?search=${encodeURIComponent(content)}` : ""
      }`
    ); //push new URI onto stack based on user input
  };

  //component for submission button
  const SubmitButton = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={() => {
            //button press listener
            handleSearch();
          }}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <FormControl>
      <OutlinedInput
        placeholder="Search"
        onKeyDown={(event) => {
          //"enter" key listener
          if (event.key === "Enter") handleSearch();
        }}
        endAdornment={<SubmitButton />}
        value={content} //value in searchbar is equivalent to state
        onChange={(event) => {
          setContent(event.target.value); //update current state to value inputted
          debounce(event.target.value);
        }}
      />
    </FormControl>
  );
};

export default SearchBar;
