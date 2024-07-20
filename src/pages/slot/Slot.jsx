import CasinoCard from "../../components/casinoCard/CasinoCard"
import { SlotCasinoArray } from './SlotCasinoArray'
const Slot = () => {

  return (
    <div>
      <div className="casino-container">
        {SlotCasinoArray?.map((item, index) => {
          return (
            <CasinoCard item={item} key={index + item?.url} />
          )
        })}

      </div>
    </div>
  )
}

export default Slot