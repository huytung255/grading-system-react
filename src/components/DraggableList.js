import React, { useRef } from "react";
import clamp from "lodash-es/clamp";
import swap from "lodash-move";
import { useGesture } from "react-with-gesture";
import { useSprings, animated, interpolate, to } from "react-spring";
import { Paper, Stack, TextField } from "@mui/material";

// WHEN dragging, this function will be fed with all arguments.
// OTHERWISE, only the list order is relevant.
const fn = (order, down, originalIndex, curIndex, y) => (index) =>
  down && index === originalIndex
    ? {
        y: curIndex * 135 + y,
        scale: 1.1,
        zIndex: "1",
        shadow: 15,
        immediate: (n) => n === "y" || n === "zIndex",
      }
    : {
        y: order.indexOf(index) * 135,
        scale: 1,
        zIndex: "0",
        shadow: 1,
        immediate: false,
      };
const GradeEditor = () => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <Paper
      sx={{
        p: 3,
        width: "100%",
        height: "100%",
      }}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          variant="filled"
          label="Title"
          onClick={handleClick}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Percentage"
          onClick={handleClick}
        />
      </Stack>
    </Paper>
  );
};

export default function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)); // Store indices as a local ref, this represents the item order
  /*
    Curries the default order for the initial, "rested" list state.
    Only the order array is relevant when the items aren't being dragged, thus
    the other arguments from fn don't need to be supplied initially.
  */
  const [springs, setSprings] = useSprings(items.length, fn(order.current));
  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 135 + y) / 135),
      0,
      items.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    /*
      Curry all variables needed for the truthy clause of the ternary expression from fn,
      so that new objects are fed to the springs without triggering a re-render.
    */
    setSprings(fn(newOrder, down, originalIndex, curIndex, y));
    // Settles the new order on the end of the drag gesture (when down is false)
    if (!down) order.current = newOrder;
  });
  return (
    <div className="content">
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            transform: to(
              [y, scale],
              (y, s) => `translate3d(0,${y}px,0) scale(${s})`
            ),
          }}
          children={<GradeEditor />}
        />
      ))}
    </div>
  );
}
