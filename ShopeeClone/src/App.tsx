import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'

function App() {
  const routeElement = useRouteElement()
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
