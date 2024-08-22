import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../common/MainLayout/index.jsx"
import Home from "../pages/home/Home.jsx";
import Casino from "../pages/casino/Casino.jsx";
import CasinoLobby from "../pages/casino/CasinoLobby.jsx";
import GameDetail from "../pages/gameDetail/GameDetail.jsx";
import AccountSatement from "../pages/accountStatement/AccountSatement.jsx";
import AllSport from "../pages/allSport/AllSport.jsx";
import { accountStatement, allSport, aviatorLobby, casino, casinoLobby, casinoResultsPage, changePasswordPage, currentBet, fantasyCasinoPage, gameDetail, home, liveCasinoBet, liveCasinoPage, secureAuth, slotCasinoPage } from "./PagesUrl.jsx";
import CurrentBet from "../pages/currentBet/CurrentBet.jsx";
import Login from "../pages/login/Login.jsx"
import ChangePassword from "../pages/changePassword/ChangePassword.jsx"
import Aviator from "../components/casino/Aviator.jsx";
import LiveCasino from "../pages/livecasino/LiveCasino.jsx";
import Slot from "../pages/slot/Slot.jsx";
import Fantasy from "../pages/fantasy/Fantasy.jsx";
import Telegram from "../pages/telegram/Telegram.jsx";
import AuthSecure from "../pages/authSecure/Auth.jsx";
import CasinoResult from "../pages/casinoResult/CasinoResult.jsx";
import LiveCasinoBet from "../pages/liveCasinoBet/LiveCasinoBet.jsx";


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
        {
          path: liveCasinoPage,
          element: <LiveCasino/>,
        },
        {
          path: fantasyCasinoPage,
          element: <Fantasy/>,
        },
        {
          path: slotCasinoPage,
          element: <Slot/>,
        },
        {
          path: aviatorLobby,
          element: <Aviator/>,
        },
        {
          path: casinoLobby,
          element: <CasinoLobby/>,
        },
        {
          path: allSport,
          element: <AllSport/>,
        },
        {
          path: changePasswordPage,
          element: <ChangePassword/>,
        },
        {
          path: secureAuth,
          element: <AuthSecure/>,
        },
        {
          path: casinoResultsPage,
          element: <CasinoResult/>,
        },
        {
          path: liveCasinoBet,
          element: <LiveCasinoBet/>,
        },
        
        {
          path: "*",
          element: "Not Found",
        },
      ],
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/otp",
      element:<Telegram/>
    }
  ]);