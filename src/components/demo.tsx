import { useHistory, useLocation } from "react-router-dom";
import "./demo.css";

type demoProps = {
  title: string;
  description: string;
  iconImage: string;
  hashtags: string[];
  link: string
};

export default function Demo({
  title,
  iconImage,
  description,
  hashtags,
  link
}: demoProps) {
  const history = useHistory()

  const Hashtag = (props: any) => <h6 className="hashtag">#{props.text}</h6>;
  const hashtagElements: JSX.Element[] = [];

  for (const hashtag of hashtags) {
    hashtagElements.push(<Hashtag text={hashtag}></Hashtag>);
  }

  return (
    <div id="demo-container" onClick={() => history.push(`/demo/${link}`)}>
      <h3>{title}</h3>
      <div>
        <img src={iconImage} alt="Hey there" id="demo-logo"></img>
      </div>
      <div className="bottom-bar">
        <p id="demo-hashtags">{description}</p>
        <p id="demo-description">{hashtagElements}</p>
      </div>
    </div>
  );
}
