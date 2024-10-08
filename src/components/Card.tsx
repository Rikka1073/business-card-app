import { useParams } from "react-router-dom";

const Card = () => {
  const { id } = useParams();
  return <div>id:{id}</div>;
};

export default Card;
