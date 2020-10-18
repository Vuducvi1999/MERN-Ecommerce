import React from "react";
import Menu from "./Menu";
import Banner from "./Banner.jpg";

function Layout({ title, description, children, className }) {
  return (
    <>
      <Menu />
      <div className="jumbotron row no-gutters p-0 text-center">
        <div
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
        </div>
        <div
          style={{
            flexGrow: "1",
            backgroundImage: "url(" + Banner + ")",
            padding: "2rem 1rem",
            backgroundSize: "contain",
            backgroundPosition: "top left",
          }}
        ></div>
      </div>
      <div className={className}>{children}</div>
    </>
  );
}

export default Layout;
