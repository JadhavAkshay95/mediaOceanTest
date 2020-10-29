import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  let { key } = useParams();

  const [dealDetails, setDealDetails] = useState();

  useEffect(() => {
    fetch(`https://bakesaleforgood.com/api/deals/${key}`)
      .then((data) => data.json())
      .then((data) => {
        setDealDetails(data);
      });
  }, [key]);

  if (!dealDetails) {
    return null;
  }

  return (
    <div className="deal-details-page">
      <h1>Deal details page</h1>
      <div>
        <p>Title :{dealDetails.title}</p>
        <p>Price :{dealDetails.price}</p>
        <p>Cause :{dealDetails.cause.name}</p>
        <p >Media Images :</p>
        <p className="media">
          {dealDetails.media.map((link) => (
            <img className="media-image" src={link}></img>
          ))}
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;
