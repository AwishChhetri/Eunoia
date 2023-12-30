import { Route } from 'react-router-dom';
import { HomePage } from "./pages/HomePage.jsx";
import { Dash } from "./pages/Dash.jsx";
import { Questions } from "./pages/Questions.jsx";
import { IntakeForm } from "./pages/IntakeForm.jsx";
import { Appointment } from "./pages/Appointment.jsx";
const App=()=>{
  return (
      <div className="App">
      <Route path='/' component={HomePage} exact />
      <Route path='/dash' component={Dash} />
      <Route path='/personality-test' component={Questions} />
      <Route path='/intake-form' component={IntakeForm} />
      <Route path='/appointment' component={Appointment} />
      </div>
  )
  }
export default App
