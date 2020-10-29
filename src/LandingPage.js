import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [dealList, setDealList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [grpByCauseList, setGrpByCauseList] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      fetch(`https://bakesaleforgood.com/api/deals?searchTerm=${searchTerm}`)
        .then((data) => data.json())
        .then((data) => {
          setDealList(data);
          setGrpByCauseList([
            ...processDataGrpBy(data, (deal) => deal.cause.name),
          ]);
        });
    } else {
      fetch(" https://bakesaleforgood.com/api/deals")
        .then((data) => data.json())
        .then((data) => {
          setDealList(data);

          setGrpByCauseList([
            ...processDataGrpBy(data, (deal) => deal.cause.name),
          ]);
        });
    }
  }, [searchTerm]);

  const processDataGrpBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  };

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  if (!dealList) {
    return null;
  }

  if (dealList.length === 0) {
    return "Loading.....";
  }

  return (
    <div className="deals-container">
      <h1>Deals</h1>
      <div className="search">
        <input
          className="search-input"
          type="search"
          placeholder="search"
          onChange={searchHandler}
        />
      </div>
      <div className="deals-section">
        <section className="deal-section deal-section-first">
          <h1>Summary view of deals</h1>
          {dealList.map((deal) => (
            <div className="deal-card" key={deal.key}>
              <Link to={{ pathname: `/details/${deal.key}` }}>
                <p> Title: {deal.title}</p>
                <p> Price: {deal.price}</p>
              </Link>
            </div>
          ))}
        </section>
        <section className="deal-section deal-section-second">
          <h1>List of available deals</h1>
          {grpByCauseList.length &&
            grpByCauseList.map((deal) => {
              return deal[1].map((data) => (
                <div className="deal-card" key={data.key}>
                  GRP BY : {deal[0]}
                  <Link to={{ pathname: `/details/${data.key}` }}>
                    <p> Title: {data.title}</p>
                    <p> Price: {data.price}</p>
                  </Link>
                </div>
              ));
            })}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
