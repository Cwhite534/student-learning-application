import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './components/helpers/AuthenticatedRoute'
import LoadingGif from './assets/images/LoadingScreenGif.gif'
import './assets/css/LoadingStyles.css'
import LandScape from './components/helpers/LandScape'

const Home = lazy(() => import('./components/Home'))
const StudentLogin = lazy(() => import('./components/login/StudentLogin'))
const StudentView = lazy(() => import('./components/students/StudentView'))
const InstructorView = lazy(() => import('./components/instructor/InstructorView'))
const InstructorLogin = lazy(() => import('./components/login/InstructorLogin'))
const StudentSignup = lazy(() => import('./components/login/StudentSignup'))
const InstructorSignup = lazy(() => import('./components/login/InstructorSignup'))
const ErrorScreen = lazy(() => import('./components/helpers/ErrorScreen'))
const centerStyle = { top: 0, bottom: 0, left: 0, right: 0 }

/**
 * This class is the base component that contains all other components in this application
 */
class App extends Component {
  render () {
    return (
      <Browser>
        <Suspense fallback={<img src={LoadingGif} alt='Loading...' className='img-fluid position-absolute m-auto fade-in' style={centerStyle} />}>
          <LandScape />
          <Switch>
            <Route exact path='/' render={(props) => <Home {...props} />} />
            <AuthenticatedRoute path='/instructor' lazyComponent={InstructorView} />
            <AuthenticatedRoute path='/student' lazyComponent={StudentView} />
            <Route path='/login/instructor' render={(props) => <InstructorLogin {...props} />} />
            <Route path='/login/student' render={(props) => <StudentLogin {...props} />} />
            <Route path='/signup/instructor' render={(props) => <InstructorSignup {...props} />} />
            <Route path='/signup/student' render={(props) => <StudentSignup {...props} />} />
            <Route path='/error' render={(props) => <ErrorScreen {...props} />} />
          </Switch>
        </Suspense>
      </Browser>
    )
  }
}

export default App
