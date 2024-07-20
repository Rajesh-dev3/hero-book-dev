import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { useEffect, useState } from "react";
import { useGetSportListMutation } from '../../services/sport/sportList';
import { useGameEventlistMutation, useGetmatchListMutation } from '../../services/sport/matchList';
import { Link } from 'react-router-dom';
//// styles
import "./styles.scss"
const CollapsibleTable = () => {
  const [listOpen, setListOpen] = useState(false)
  const [matchListOpen, setMatchListOpen] = useState(false)
  const [trigger, { data }] = useGetSportListMutation()

  const [trigge, { data: matcListData }] = useGetmatchListMutation()
  const [trigg, { data: gameListData }] = useGameEventlistMutation()

  useEffect(() => {
    trigger({ limit: 50, pageno: 1, })
  }, [])
  useEffect(() => {
    trigg({ limit: 50, pageno: 1, sport_id: listOpen, series_id: matchListOpen })
  }, [matchListOpen])
  useEffect(() => {
    trigge({ limit: 10, sport_id: listOpen, pageno: 1 })
  }, [listOpen])


  const toggleList = (sport_id) => {
    if (listOpen === sport_id) {
      setListOpen(null); // Close if clicked again
    } else {
      setListOpen(sport_id); // Open clicked item
    }
  };
  const nestedToggleList = (sport_id) => {
    if (matchListOpen === sport_id) {
      setMatchListOpen(null); // Close if clicked again
    } else {
      setMatchListOpen(sport_id); // Open clicked item
    }
  };


  return (
    <div className='match-list-accordion'>
      {data?.data?.map((item, index) => (
        <ul key={item?.name}>
          <li onClick={() => toggleList(item?.sport_id)} className='st-list'>
            <span>
              {item?.sport_id !== listOpen ? (
                <LocalHospitalOutlinedIcon />
              ) : (
                <IndeterminateCheckBoxOutlinedIcon />
              )}
              {item?.name}
            </span>
          </li>
          {matcListData?.data?.map((list) => {
            return (

              <ul className={`${item?.sport_id === listOpen ? "list3" : "list2"}`} key={list?.name}>
                {/* Render your nested list content here */}
                <li onClick={() => nestedToggleList(list?.series_id)}>
                  <span className='nd-list' >
                    {list?.series_id !== matchListOpen ? (
                      <LocalHospitalOutlinedIcon />
                    ) : (
                      <IndeterminateCheckBoxOutlinedIcon />
                    )}
                    {list?.name}
                  </span>
                  {gameListData?.data?.map((elm) => {
                    return (

                      <ul onClick={(e) => e.stopPropagation()} className={`${list?.series_id === matchListOpen ? "matchListOpen" : "matchListClose"}`} key={elm?.name}>
                        <Link to={`game-detail/${elm?.sport_id}/${elm?.match_id}/${elm?.market_id}`}>
                          <li >
                            <span className='nested-list'>
                              {elm?.name}
                            </span>
                          </li>
                        </Link>
                      </ul>
                    )
                  })}
                </li>
              </ul>
            )
          })}
        </ul>
      ))}
    </div>
  );
};

export default CollapsibleTable;


