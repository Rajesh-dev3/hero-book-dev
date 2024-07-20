import { useEffect, useState } from 'react'
import CasinoCard from '../../components/casinoCard/CasinoCard'

const Fantasy = () => {
  const fantasyCasino = [
    {
      casinoName: "Scratch",
      id: "200237",
      name: "DC",
      url: "https://herobook.in/images/Ball_By_Ball.jpg"

    },
    {
      casinoName: "Scratch",
      id: "100046",
      name: "EZUGI",
      url: "https://herobook.in/images/Instant_TeenPatti_3.0.jpg"

    }
    , {
      casinoName: "Aviator",
      id: "201206",
      url: "https://herobook.in/images/aviator.jpg"
    }
  ]
  const fantasyFilterData = ["Scratch", "Aviator", "Creedroomz", "Our", "Smart"]
  const [casinoName, setCasinoName] = useState("Scratch")
  const [cardCasinoData, setCardCasinoData] = useState([])
  useEffect(() => {
    const findData = fantasyCasino?.filter((item) => item?.casinoName == casinoName)
    setCardCasinoData(findData)
  }, [casinoName])

  return (
    <div>
      <ul className="casino-category">
        {fantasyFilterData?.map((elm) =>
          // <Link key={elm} to={`/casino-lobby/${item?.id}/${item?.name}`}>
          <li className={`${elm == casinoName ? "active" : ""}`}
            onClick={() => setCasinoName(elm)} key={elm}>{elm}</li>
          // </Link>
        )
        }


      </ul>
      <div className="casino-container">
        {cardCasinoData.length ? cardCasinoData?.map((item, index) => {
          return (
            <CasinoCard item={item} key={index + item?.url} />
          )
        }) : <p style={{ color: "black", whiteSpace: "nowrap" }}>Tab content for Contact</p>}

      </div>
    </div>
  )
}

export default Fantasy