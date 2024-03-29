import { BrowserRouter, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import {AuthContextProvider} from './contexts/AuthContext'
import {Room} from './pages/Room'
import { AdminRoom } from "./pages/adminRoom";
function App() {
  

    return (
    <BrowserRouter>
    <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new"  component={NewRoom} /> 
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
     </AuthContextProvider>       
    </BrowserRouter>
  );
}

export default App;
