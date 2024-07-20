import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEventGameMutation } from '../../services/sport/matchList'
import OddsRow from '../../components/odds/OddsRow'
import OddsRowHeading from '../../components/odds/OddsRowHeading'
import Loader from '../../components/loader/Loader'
import { useMediaQuery } from '../../useMediaQuery'

const AllSport = () => {

  const [trigger, { data, isLoading }] = useEventGameMutation()
  const { id } = useParams()
  useEffect(() => {
    trigger({ limit: 50, pageno: 1, sport_id: String(id), series_id: 0, type: "home" })
  }, [id])
  const [gameList, setGameList] = useState([])
  useEffect(() => {
    if (data) {

      const { InplayMatches, UpCommingMatches } = data?.data;

      // Combine them into a single array
      const combinedMatches = [...InplayMatches, ...UpCommingMatches];
      setGameList(combinedMatches)
    }
  }, [data])
  const isMobile = useMediaQuery("(max-width:780px)")
  return (
    <>
      {isLoading ? <Loader /> :
        <>
          {!isMobile &&
            <OddsRowHeading />
          }
          {gameList?.map((item) => {
            return (

              <OddsRow item={item} key={item?.name} />
            )
          })
          }
        </>

      }
    </>
  )
}

export default AllSport