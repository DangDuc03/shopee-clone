import { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import { localStorageeEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElement = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageeEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageeEventTarget.removeEventListener('clearLS', reset) // Clean up the event listener
    }
  }, [reset])
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
