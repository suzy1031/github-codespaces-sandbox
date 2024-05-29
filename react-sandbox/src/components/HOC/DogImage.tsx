import React from "react";
import useHover from "./useHover";
import withLoader from "./withLoader";

// eslint-disable-next-line react-refresh/only-export-components
const DogImages = (props: {
  data: { message: string[] };
  hovering: boolean;
}) => {
  const [hoverRef, hovering] = useHover();
  return (
    <div ref={hoverRef as React.RefObject<HTMLDivElement>} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
};

const EnhancedDogImages = withLoader(
  DogImages,
  "https://dog.ceo/api/breed/labrador/images/random/6"
);

export default EnhancedDogImages;
