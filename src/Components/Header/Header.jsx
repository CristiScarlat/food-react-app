import React from "react";
import "./Header.css";

const Header = props => {
  const { getSearch, updateSearch, search } = props;
  return (
    <div>
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          placeholder="pasta"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;
