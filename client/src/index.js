import { h , app } from 'hyperapp'
import { location, Route,  Switch, Link } from "@hyperapp/router"
import './style.scss'

import  Nav  from './pages/nav'
import  Dash  from './pages/dash'
import  Tasks  from './pages/tasks/tasks'
//import  Messages  from './pages/messages/messages'
import  Products  from './pages/products/products'
//import  Analytics  from './pages/analytics/analytics'

import  data  from './data'

const tasks = Tasks(data.tasks) 
const products = Products(data.products)

const state = {
  location: location.state, 
  nav: Nav.state,
  tasks: tasks.state,
  products: products.state
}

const actions = {
  location: location.actions,
  nav: Nav.actions,
  tasks: tasks.actions,
  products: products.actions
}

const view = ( state, actions ) => {
  const Navbar = Nav.view(state.nav, actions.nav)
  const index = {
    tasks: tasks.view(state.tasks, actions.tasks),
    products: products.view(state.products, actions.products)
  };
  
  return (
    <div>
      <Navbar path={ state.location.pathname }></Navbar>
      <Switch>    
        <Route path="/" render={ Dash } />   
        <Route path="/dash" render={ Dash } /> 
        <Route parent path="/tasks" render={ index.tasks } />    
        <Route parent path="/products" render={ index.products } />        
      </Switch>
    </div>
  )
}

const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)