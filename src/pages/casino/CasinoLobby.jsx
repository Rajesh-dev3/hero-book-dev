import  { useEffect } from 'react'
import { useAviatorMutation } from '../../services/casino/casino'
import { useParams } from 'react-router-dom'

const CasinoLobby = () => {
  const [trigger,{data}]=useAviatorMutation()
  const {id} = useParams()
    useEffect(() => {
     trigger({"gameId": String(id) })
    }, [])
  return (
    <div>
    <iframe
          width="100%"
          height="660"
          src={data?.data?.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
</div>
  )
}

export default CasinoLobby