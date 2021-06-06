import './App.css';
import {useState, useEffect} from 'react'
import PulseLoader from "react-spinners/PulseLoader"
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import  {UsersProvider} from "./context/UsersContext";
import {ConversationsProvider} from "./context/ConversationsContext"
import ChatMenu from "./components/ChatMenu"
import Login from './components/Login'
import Signup from "./components/Signup"

function App() {

  const [loading, setLoading] = useState(false)
  let [color, setColor] = useState("rgb(192, 62, 243)")

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
    
  }, [])

  return (
    (!loading) ? 
    (
    <UsersProvider>
      <ConversationsProvider>
        <div className="App">
          <BrowserRouter>
             
                  <Switch>
                      <Route exact path="/login" component={Login}/>
                      <Route exact path="/signup" component={Signup}/>
                      <Route exact path="/chat" render={(props) => <ChatMenu {...props}/>}/>
                      <Redirect from="/" to="/login" />
                  </Switch>
              
          </BrowserRouter>
        </div>
      </ConversationsProvider>
    </UsersProvider>) : 
    (
      <div className="loading-screen">
        <PulseLoader className="loader" loading={loading} size={20} color={color} />
      </div>
    
    )
   
  );
}

export default App;
