import React from 'react';
import Login from './components/auth/Login'
import NewAccount from './components/auth/NewAccount'
import Projects from './components/projects/Projects'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ProjectState from './context/projectState'
import TasksState from './context/tasks/tasksState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/authorization/authState';
import authToken from './config/authToken'
import PrivateRoute from './components/routes/PrivateRoute'

//Check if theres a token
const token = localStorage.getItem('token')

if(token) authToken(token)

function App() {
  return (
    <ProjectState>
      <TasksState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/new-account' component={NewAccount} />
                <PrivateRoute exact path='/projects' component={Projects} />
              </Switch>
            </Router>  
          </AuthState> 
        </AlertState>
      </TasksState>
    </ProjectState>
  );
}

export default App;
