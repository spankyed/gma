import { h , app } from 'hyperapp'
import { location, Route,  Switch, Link } from "@hyperapp/router"

import './style.scss'
import  data  from './data'
import  Alert  from './components/alert'
import  Nav  from './pages/nav'
import  Dash  from './pages/dash'
import  Tasks  from './pages/tasks/tasks'
import  Messages  from './pages/messages/messages'
import  Products  from './pages/products/products'
import  Collections  from './pages/collections/collections'

const messages = Messages(data.messages)
const tasks = Tasks(data.tasks) 
const products = Products(data.products)
const collections = Collections(data.collections)

const state = {
  location: location.state, 
  nav: Nav.state,
  alert: Alert.state,
  messages: messages.state,
  tasks: tasks.state,
  products: products.state,
  collections: collections.state
}

const actions = {
  location: location.actions,
  nav: Nav.actions,
  alert: Alert.actions,
  messages: messages.actions,
  tasks: tasks.actions,
  products: products.actions,
  collections: collections.actions
}

const view = ( state, actions ) => {
  const Navbar = Nav.view(state.nav, actions.nav)
  const AlertView = Alert.view(state.alert, actions.alert)
  const index = {
    messages: messages.view(state.messages, actions.messages),
    tasks: tasks.view(state.tasks, actions.tasks),
    products: products.view(state.products, actions.products),
    collections: collections.view(state.collections, actions.collections)
  };
  
  return (
    <div>
      <Navbar path={ state.location.pathname }></Navbar>
      <Switch>    
        <Route path="/" render={ Dash } />   
        <Route path="/dash" render={ Dash } /> 
        <Route parent path="/messages" render={ index.messages } />   
        <Route parent path="/tasks" render={ index.tasks } />    
        <Route parent path="/products" render={ index.products } />  
        {/* <Route parent path="/products/?collection_id" render={ index.products } />  */}
        <Route parent path="/collections" render={ index.collections } />       
      </Switch>
      <AlertView  path={ state.location.pathname }></AlertView>
    </div>
  )
}

const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)