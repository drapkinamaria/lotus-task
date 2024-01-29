import React, { Component } from "react";
import { SearchResultsProps } from "../types/types";
import "../../StyleSheets/search.css";

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { input, data } = this.props;
    const filteredData = input
      ? data.filter((character) =>
          character.name.toLowerCase().includes(input.toLowerCase()),
        )
      : [];

    let content;
    if (input === "") {
      content = <div className="search_text">Вы ещё ничего не ввели</div>;
    } else if (filteredData.length > 0) {
      content = filteredData.map((character, index) => (
        <div className="search_text" key={index}>
          {character.name}
        </div>
      ));
    } else {
      content = <div className="search_text">Ничего не найдено</div>;
    }

    return <div className="search_results">{content}</div>;
  }
}

export default SearchResults;
