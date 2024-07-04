import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../common/MainLayout/index.jsx"
import Home from "../pages/home/Home.jsx";
import Casino from "../pages/casino/Casino.jsx";
import GameDetail from "../pages/gameDetail/GameDetail.jsx";
import AccountSatement from "../pages/accountStatement/AccountSatement.jsx";
import { accountStatement, casino, currentBet, gameDetail, home } from "./PagesUrl.jsx";
import CurrentBet from "../pages/currentBet/CurrentBet.jsx";
import Login from "../pages/login/Login.jsx"

export const router = createBrowserRouter([
    {
      path: home,
      element: <MainLayout/>,
      children: [
        {
          path: home,
          element: <Home/>,
        },
        {
          path: casino,
          element: <Casino/>,
        },
        {
          path: gameDetail,
          element: <GameDetail/>,
        },
        {
          path: accountStatement,
          element: <AccountSatement/>,
        },
        {
          path: currentBet,
          element: <CurrentBet/>,
        },
   
      ],
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);