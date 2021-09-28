import "./navbar.css";

export default function Navbar() {
  return (
    <div id="navbar">
      <div id="left">
        <img
          src="/logo.png"
          alt="A purple brain logo"
          id="logo"
        />
        <h4 id="logo-text">AV AI</h4>
      </div>
      <div id="right">
          <p id="view-on-github">
              <img src="/github.png" alt="link to github" id="github-image"/>
              View on Github
            </p>
      </div>
    </div>
  );
}
