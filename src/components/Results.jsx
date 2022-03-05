import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";

const Results = () => {
  const {
    results,
    query,
    setQuery,
    loading,
    error,
    fetchResults,
  } = useResultContext();

  const location = useLocation();

  useEffect(() => {
    if (query) {
      if (location.pathname === "/videos") {
        fetchResults(`/search/q=${query} videos`);
      } else {
        fetchResults(
          `${location.pathname}/q=${query}&num=40`
        );
      }
    }
  }, [location.pathname, query]);

  if (loading) return <Loading />;
  console.log(location.pathname);
  switch (location.pathname) {
    case "/search":
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.results?.map(
            ({ link, title, description }, index) => (
              <div
                key={index}
                className='w-full md:w-2/5 space-y-3'
              >
                <a
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <p className='text-sm'>
                    {link.length > 30
                      ? link.substring(0, 30) + "..."
                      : link}
                  </p>
                  <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                    {title}
                  </p>
                </a>
                <p className='text-sm'>
                  {description.length > 200
                    ? description.substring(0, 200) + "..."
                    : description}
                </p>
              </div>
            )
          )}
        </div>
      );

    case "/images":
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {results?.image_results?.map(
            ({ image, link: { href, title } }, index) => (
              <a
                href={href}
                key={index}
                target='_blank'
                rel='noreferrer'
                className='sm:p-3 p-5 hover:text-blue-500 hover:dark:text-blue-300 hover:underline'
              >
                <img
                  src={image?.src}
                  alt={title}
                  loading='lazy'
                />
                <p className='w-36 break-words text-sm mt-2'>
                  {title}
                </p>
              </a>
            )
          )}
        </div>
      );

    case "/news":
      return "news";

    case "/videos":
      return "videos";

    default:
      return error;
  }
};

export default Results;
