import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEventGameMutation } from '../../services/sport/matchList'
import OddsRow from '../../components/odds/OddsRow'
import OddsRowHeading from '../../components/odds/OddsRowHeading'
import Loader from '../../components/loader/Loader'
import { useMediaQuery } from '../../useMediaQuery'
import BetLoader from '../../components/loader/BetLoader'

const AllSport = () => {

  const [trigger, { data, isLoading }] = useEventGameMutation()
  const { id } = useParams()
  useEffect(() => {
    trigger({ limit: 50, pageno: 1, sport_id: String(id), series_id: 0, type: "home" })
  }, [id])
  const [gameList, setGameList] = useState([])
  const [liveMatch, setLiveMatch] = useState({})
  useEffect(() => {
    if (data) {
      const { InplayMatches, UpCommingMatches } = data?.data;


      const extractMatchId = InplayMatches?.map((list)=>{return{marketId:list?.market_id}})
      // Combine them into a single array
      setLiveMatch(extractMatchId)
      const combinedMatches = [...InplayMatches, ...UpCommingMatches];
      setGameList(combinedMatches)
    }
  }, [data])
  const isMobile = useMediaQuery("(max-width:780px)")
  return (
    <>
      {isLoading ? <div style={{display:"flex",width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>

        <BetLoader />
      </div>
        :
        <>
          {!isMobile &&
            <OddsRowHeading />
          }
          {gameList?.map((item) => {
            return (

              <OddsRow item={item} key={item?.name} inPlayMarketId={liveMatch}/>
            )
          })
          }
        </>

      }
    </>
  )
}

export default AllSport