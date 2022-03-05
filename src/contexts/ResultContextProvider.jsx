import React, { createContext, useContext } from "react";

const ResutlContext = createContext();
const BASE_URL =
  "https://google-search3.p.rapidapi.com/api/v1";

export const ResutlContextProvider = ({ children }) => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [query, setQuery] = React.useState(" ");

  const fetchResults = async (type) => {
    setLoading(true);
    setError(false);

    // /videos /search, /images, /news
    try {
      const response = await fetch(`${BASE_URL}${type}`, {
        method: "GET",
        headers: {
          "x-proxy-location": "IN",
          "x-rapidapi-host":
            "google-search3.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
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
