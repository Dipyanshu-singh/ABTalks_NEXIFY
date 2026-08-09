import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/transitions.css";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [overlay, setOverlay] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Trigger the circular reveal on route change
    setOverlay(true);

    // After the circle covers the screen, swap content
    const t1 = setTimeout(() => {
      setDisplayChildren(children);
    }, 340);

    // Uncover (shrink away) the circle
    const t2 = setTimeout(() => {
      setOverlay(false);
    }, 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={overlay ? "page-transition-overlay active" : "page-transition-overlay"}>
        <div className="transition-circle" />
        <div className="transition-content" />
        <div className="transition-spinner">
          <div className="ring" />
          <span>AI is thinking...</span>
        </div>
      </div>
      <div className="route-fade-in">{displayChildren}</div>
    </>
  );
};

export default PageTransition;
