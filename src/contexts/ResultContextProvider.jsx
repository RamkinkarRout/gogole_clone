import React, { createContext, useContext } from "react";

const ResutlContext = createContext();
const BASE_URL =
  "https://google-search3.p.rapidapi.com/api/v1";

export const ResutlContextProvider = ({ children }) => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [query, setQuery] = React.useState("tesla");

  const fetchResults = async (type) => {
    setLoading(true);
    setError(false);

    // /videos /search, /images, /news
    try {
      const response = await fetch(`${BASE_URL}${type}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "google-search3.p.rapidapi.com",
          "x-rapidapi-key":
            "cf6d36c213msh74c96d1d65cd9a9p11cb79jsn9f6235f90920",
        },
      });
      const data = await response.json();

      if (type.includes("/news")) {
        setResults(data.entries);
      } else if (type.includes("/images")) {
        setResults(data.image_results);
      } else {
        setResults(data.results);
      }
      console.log(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResutlContext.Provider
      value={{
        results,
        query,
        setQuery,
        loading,
        error,
        fetchResults,
      }}
    >
      {children}
    </ResutlContext.Provider>
  );
};

export const useResultContext = () =>
  useContext(ResutlContext);
