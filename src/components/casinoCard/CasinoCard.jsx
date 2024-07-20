
import { Link } from "react-router-dom";
///styles
import "./styles.scss"
const CasinoCard = ({ item }) => {
  const url = item?.casinoName == "Aviator" ? "/aviator-lobby" : `/casino-lobby/${item?.id}/${item?.name}`
  return (
    <>

      <div className="casino-list-item" key={item?.id + item?.url}>
        <Link to={url}>
          <div
            className="casino-list-item-banner"
            style={{ backgroundImage: `url(${item?.url})` }}
          ></div>
        </Link>
      </div>

    </>
  );
};

export default CasinoCard;
