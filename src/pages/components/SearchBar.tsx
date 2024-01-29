import React, { Component, ChangeEvent } from "react";
import { Character, State, Props } from "../types/types";
import SearchResults from "./SearchResults";
import "../../StyleSheets/search.css";

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: "",
      data: [],
    };
  }

  fetchData = async (id: number): Promise<Character | undefined> => {
    const url = `https://swapi.dev/api/people/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result as Character;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error,
      );
      return undefined;
    }
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  componentDidMount() {
    const fetchDataForIds = async () => {
      const ids = Array.from({ length: 14 }, (_, i) => i + 1);

      try {
        const fetchPromises = ids.map((id) => this.fetchData(id));
        const fetchDataArr = await Promise.all(fetchPromises);

        const validData: Character[] = fetchDataArr.filter(
          (item): item is Character => item !== undefined,
        );
        this.setState({ data: validData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForIds();
  }

  render() {
    const { input, data } = this.state;
    return (
      <div className="search_wrapper">
        <input
          placeholder="Начните вводить имя или фамилию персонажа"
          value={input}
          onChange={this.handleChange}
        />
        <SearchResults input={input} data={data} />
      </div>
    );
  }
}

export default SearchBar;
