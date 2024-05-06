import { useParams } from "react-router-dom";

const About = () => {
  const { type } = useParams();
  return (
    <div>About: {type}</div>
  )
};
export default About;