import { useEffect, useState } from 'react'
import { useStakeUpdateMutation } from '../../services/stakeUpdate/stakeUpdate'
import { formatCompactNumber } from '../betPlaceModule/BetPlaceModule'
import { useParams } from 'react-router-dom'
import { useGetEventDetailsMutation } from '../../services/sport/eventDetail'
import { toast } from 'react-toastify'
// style css
import "./style.scss"
const EditStack = ({ closeModa2 }) => {
    const [trigger, { data, isLoading }] = useGetEventDetailsMutation()
    const [matchStackArray, setMatchStackArray] = useState({})
    const { sportId, matchId } = useParams()
    const [stakeData, setStakeData] = useState({ one_click_stack: "0", sport_id: "4" })
    const [trig, { data: stakeUpdateResponse }] = useStakeUpdateMutation()
    const stakeUpdateHandler = () => {
        const convertValueArray = Object.values(matchStackArray)
        const stakeString = convertValueArray.join(",");
        const updateRequestData = {
            ...stakeData, match_stack: stakeString
        }
        trig(updateRequestData)
    }
    useEffect(() => {

const requestData = matchId?{ "match_id": matchId, "sport_id": sportId }:{"match_id":"0","sport_id":"4"}
        trigger(requestData)
    }, [])

    const updateMatchStack = (e) => {
        const { name, value } = e.target
        setMatchStackArray((prev) => {
            return {
                ...prev, [name]: value
            }
        })

    };


    useEffect(() => {
        let stakeArray = data?.data?.UserSportSettings[0]?.match_stack
        const stake = stakeArray?.split(",")
        stake?.map((item, index) => {

            setMatchStackArray((prev) => {
                return {
                    ...prev, [`stake${index + 1}`]: item
                }
            })
        })
    }, [data])

    useEffect(() => {
        if (stakeUpdateResponse?.error == false) {
            toast.success(stakeUpdateResponse?.message)
            closeModa2()
        } else if (stakeUpdateResponse?.error == true) {
            toast.error(stakeUpdateResponse?.message)
        }
    }, [stakeUpdateResponse])
    return (
        <section className='edit-stack'>
            <div className="heading">

                <h4>
                    Set Button Value
                </h4>
            </div>
            <div className="detail-sec">
                <div className="button-sec">
                    <button className='btn'>Game Button</button>
                    <button className='btn'>Casino Button</button>
                </div>
            </div>
            {isLoading ? "Loading..." :
                <div className="price-sec">
                    <div className="list-name">
                        <p>Price Label:</p>
                        <p>Price Value:</p>
                    </div>
                    {Object.keys(matchStackArray).map((elm, index) => {
                        return (

                            <div className="edit-inputs" key={matchStackArray[elm] + index}>
                                <input type="text" value={formatCompactNumber(matchStackArray[elm])} />
                                <input type="text" autoFocus name={elm} value={matchStackArray[elm]} onChange={updateMatchStack} />
                            </div>
                        )
                    })}


                </div>
            }

            <div className="submit">
                <button onClick={stakeUpdateHandler} className='btn'>Update</button>
            </div>
        </section>
    )
}

export default EditStack