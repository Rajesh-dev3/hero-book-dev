import { router } from './routes/PagesRoutes'
import { RouterProvider } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

function App() {
  // const notify = () => toast("Styled Toast!", {
  //   className: 'custom-toast', // Add custom class
  //   bodyClassName: 'custom-toast-body', // Add custom class to body
  //   progressClassName: 'custom-toast-progress', // Add custom class to progress bar
  // });
  return (
      <RouterProvider router={router} />
  )
}

export default App
