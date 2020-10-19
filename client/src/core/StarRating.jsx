import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { uuid } from "./uuid";

function StarRating({
  className,
  childClassName,
  childStyle,
  size,
  hover = false,
  color = "#ffd700",
  onChange,
  rate = 2,
}) {
  const [CurrentStar, setCurrentStar] = useState(0);
  useEffect(() => setCurrentStar(rate), []);

  const mouseOverLeft = (star) => {
    setCurrentStar(star + 0.5);
  };
  const mouseOverRight = (star) => {
    setCurrentStar(star + 1);
  };
  const mouseOut = () => {
    setCurrentStar(rate);
  };

  return (
    <div
      className={`d-flex ${className}`}
      style={{ fontSize: `${size}`, color: `${color}` }}
    >
      {[0, 1, 2, 3, 4].map((star) =>
        star + 0.5 < CurrentStar ? (
          <span key={uuid()}>
            <i
              style={{ ...childStyle }}
              className={`fa fa-star container-star ${childClassName}`}
              aria-hidden="true"
            >
              <div
                className="left-star"
                onMouseOver={() => (hover ? mouseOverLeft(star) : null)}
                onMouseOut={hover ? mouseOut : null}
                onClick={
                  hover
                    ? () => {
                        onChange(CurrentStar);
                        setCurrentStar(CurrentStar);
                      }
                    : null
                }
              ></div>
              <div
                className="right-star"
                onMouseOver={() => (hover ? mouseOverRight(star) : null)}
                onMouseOut={mouseOut}
                onClick={
                  hover
                    ? () => {
                        onChange(CurrentStar);
                        setCurrentStar(CurrentStar);
                      }
                    : null
                }
              ></div>
            </i>
          </span>
        ) : star + 0.5 >= CurrentStar && CurrentStar > star ? (
          <span key={uuid()}>
            <i
              style={{ ...childStyle }}
              className={`fa fa-star-half-o container-star ${childClassName}`}
              aria-hidden="true"
            >
              <div
                className="left-star"
                onMouseOver={() => (hover ? mouseOverLeft(star) : null)}
                onMouseOut={hover ? mouseOut : null}
                onClick={
                  hover
                    ? () => {
                        onChange(CurrentStar);
                        setCurrentStar(CurrentStar);
                      }
                    : null
                }
              ></div>
              <div
                className="right-star"
                onMouseOver={() => (hover ? mouseOverRight(star) : null)}
                onMouseOut={hover ? mouseOut : null}
                onClick={
                  hover
                    ? () => {
                        onChange(CurrentStar);
                        setCurrentStar(CurrentStar);
                      }
                    : null
                }
              ></div>
            </i>
          </span>
        ) : (
          <span key={uuid()}>
            <i
              style={{ ...childStyle }}
              className={`fa fa-star-o container-star ${childClassName}`}
              aria-hidden="true"
            >
              <div
                className="left-star"
                onMouseOver={() => (hover ? mouseOverLeft(star) : null)}
                onMouseOut={hover ? mouseOut : null}
                onClick={
                  hover
                    ? () => {
                        onChange(CurrentStar);
                        setCurrentStar(CurrentStar);
                      }
                    : null
                }
              ></div>
              <div
                className="right-star"
                onMouseOver={() => (hover ? mouseOverRight(star) : null)}
                onMouseOut={hover ? mouseOut : null}
                onClick={
                  hover
                    ? () => {
                        onChange(CurrentStar);
                        setCurrentStar(CurrentStar);
                      }
                    : null
                }
              ></div>
            </i>
          </span>
        )
      )}
    </div>
  );
}

export default StarRating;
