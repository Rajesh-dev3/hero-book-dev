import  { useEffect, useState } from 'react'
import {useAviatorMutation} from "../../services/casino/casino"

const Aviator = () => {
const id  = 201206
const [url, setUrl] = useState("")
const [trigger,{data}]=useAviatorMutation()
    useEffect(() => {
     trigger({"gameId": String(id) })
    }, [])

    useEffect(() => {
     if(data)
      setUrl(data?.data?.url)
    }, [data])
    
  return (
    <div>
          <iframe
                width="100%"
                height="660"
                src={url|| data?.data?.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
    </div>
  )
}

export default Aviator