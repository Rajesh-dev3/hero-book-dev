import { useEffect, useState } from 'react'
import { useAviatorMutation } from "../../services/casino/casino"
import { liveCasino } from "./LiveCasinoArray"
////styles
import "./styles.scss"
const LiveCasino = () => {
  const [activeCasino, setActiveCasino] = useState("200215")
  const [url, setUrl] = useState("")
  const [trigger, { data }] = useAviatorMutation()

  useEffect(() => {
    trigger({ gameId: activeCasino })

  }, [activeCasino])

  useEffect(() => {
    if (data) setUrl(data?.data?.url)
  }, [data])
  return (
    <>
      <div className='liveCasino-filter-container'>
        <ul>
          {liveCasino?.map((item) => <li key={item?.name + item?.id} className={`${item?.id == activeCasino ? "active" : ""}`} onClick={() => setActiveCasino(item?.id)}>{item?.name}</li>)}

        </ul>
      </div>
      <iframe
        width="100%"
        height="660"
        src={url || data?.data?.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </>
  )
}

export default LiveCasino