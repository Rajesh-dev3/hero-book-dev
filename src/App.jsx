import { router } from './routes/PagesRoutes'
import { RouterProvider } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";

function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App
