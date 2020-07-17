import React from 'react'
import { Route  } from 'react-router-dom'
//import  { Route ,IndexRoute} from 'react-router'

import Home from './page/Home'
import Intro from './page/intro/Intro'
import Inference from './page/inference/Inference'
import PhotoPage from './page/photoPage/PhotoPage'
import TimeLine from './page/timeline/TimeLine'

export default function App () {
  return (
  <Route path='/' component={Home} >
  <Route path='intro' component={Intro}/>
  <Route path='inference' component={Inference}/>
  <Route path='timeline' component={TimeLine}/>
  <Route path='photopage' component={PhotoPage}/>
  </Route>
  )
}
