import React from 'react'
import { Route } from 'react-router-dom'

import Home from './page/Home'

export default function App () {
  return <Route path='/' component={Home} />
}
