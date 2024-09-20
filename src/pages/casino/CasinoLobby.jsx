import { useEffect, useState } from 'react'
import { useAviatorMutation } from '../../services/casino/casino'
import { useParams } from 'react-router-dom'

const CasinoLobby = () => {
  const [url, setUrl] = useState("")
  const [trigger, { data }] = useAviatorMutation()
  const { id ,name} = useParams()
  let count = 0
  useEffect(() => {
    if(count ==0){

      trigger({ "gameId": String(id),
        // "providerName":name, 
       })
      count++
    }
  }, [])
  useEffect(() => {
    if (data?.data?.url) {
      setUrl(data?.data?.url)
    }
  }, [data])
  return (
    <div>
      <iframe
        width="100%"
        height="660"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  )
}

export default CasinoLobby