import React from "react";
import { Puff } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
      <Puff
        type='ThreeDots'
        color='#0061cf'
        height={550}
        width={80}
      />
    </div>
  );
};

export default Loading;
