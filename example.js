import { ScrollDetect } from "./scrollbar.js";

// Init ScrollBar Class
const scrollDetect = new ScrollDetect();

// scroll detect function
scrollDetect.onScroll((dir) => {
  // 1 is scrolling down
  if (dir === 1) {
    //...
  }

  // 0 is initial place
  if (dir === 0) {
    //...
  }

  // -1 is scrolling up
  if (dir === -1) {
    //...
  }
});

// get scroll Y positon
scrollDetect.getScrollPosY();

// get scroll X position
scrollDetect.getScrollPosY();

// set scroll position
scrollDetect.scrollTo(
  /** x or y */ "x",
  110,
  /** smooth or auto (default smooth) */ "smooth"
);

// remove scroll listener
scrollDetect.removeScrollBarAction();