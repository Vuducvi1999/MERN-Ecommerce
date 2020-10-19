import React from "react";
import Menu from "./Menu";
// import Banner from "./Banner.jpg";
import Banner from "./banner-book.jpg";
import Footer from "./Footer";
import { useRef } from "react";
import { useEffect } from "react";

function Layout({
  banner = false,
  marginTop = true,
  title,
  description,
  children,
  className,
}) {
  const menuRef = useRef();
  useEffect(() => {
    console.log(menuRef.current.offsetHeight);
  }, []);

  return (
    <>
      <div className="" ref={menuRef}>
        <Menu />
      </div>
      {/* <div className="jumbotron row no-gutters p-0 text-center"> */}
      {/* <div
        className="d-inline-block rounded col-4"
        style={{
          textShadow: "5px 5px 5px rgba(0,0,0,.5)",
          backgroundColor: "#fff",
        }}
      >
        <h1 className="display-4">{title}</h1>
        <p className="blockquote m-0" style={{ fontSize: "2rem" }}>
          {description}
        </p>
      </div> */}
      {banner ? (
        <div
          className="text-center banner"
          style={{
            backgroundImage: "url(" + Banner + ")",
            backgroundSize: "cover",
            backgroundPosition: "top left",
            paddingTop: "20vh",
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          <h1 className="title-banner">{title}</h1>
          <span
            className="title-banner"
            style={{
              padding: "0 2rem 1rem 2rem",
              borderBottom: "2px solid #fff",
              fontSize: "2rem",
            }}
          >
            {description}
          </span>
        </div>
      ) : (
        ""
      )}
      {/* </div> */}
      <div
        style={
          marginTop
            ? {
                paddingTop: "2rem",
                minHeight: `calc(100vh - ${
                  menuRef.current ? menuRef.current.offsetHeight : 0
                }px)`,
              }
            : {}
        }
        className={className}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
