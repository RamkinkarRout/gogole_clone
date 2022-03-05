import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";

const Results = () => {
  const { results, query, loading, error, fetchResults } =
    useResultContext();

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
          {results?.map(
            ({ link, title, description }, index) => (
              <div
                key={index}
                className='w-full md:w-2/5 space-y-2'
              >
                {link && (
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
                )}

                {description && (
                  <p className='text-sm'>
                    {description.length > 200
                      ? description.substring(0, 200) +
                        "..."
                      : description}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      );

    case "/images":
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {results?.map(
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
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
          {results?.map(
            ({
              links,
              id,
              source,
              title,
              title_detail,
            }) => (
              <div
                key={id}
                className='w-full md:w-2/5 space-y-2'
              >
                <a
                  href={links?.[0].href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  {title && (
                    <p className='text-lg dark:text-blue-300 text-blue-700'>
                      {title}
                    </p>
                  )}
                </a>
                <div className='flex gap-4'>
                  <a
                    href={source?.href}
                    target='_blank'
                    rel='noreferrer'
                    className='hover:underline hover:text-blue-300'
                  >
                    {source?.href}
                  </a>
                </div>
                {title_detail && (
                  <div>
                    <p className='text-sm'>
                      {title_detail.value}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      );

    case "/videos":
      return (
        <div className='flex flex-wrap '>
          {results?.map((video, index) => (
            <div key={index} className='p-2 space-y-3'>
              {video.title && (
                <h2 className='text-lg font-semibold'>
                  {video.title.length > 40
                    ? video.title.substring(0, 40) + "..."
                    : video.title}
                </h2>
              )}
              <ReactPlayer
                url={video?.link}
                controls
                width='335px'
                height='200px'
              />
            </div>
          ))}
        </div>
      );

    default:
      return error;
  }
};

export default Results;
