import { Route, Routes } from 'react-router-dom';

import Layout from 'layouts/Layout';
import LandingPage from 'pages/LandingPage';
import Login from 'pages/Login';

import ListModules from 'creators/pages/ListModules';
import {
  Creators, DemoHome, CreateDemo, AddQuestionsToSection
} from "admin";
import {
  Explore, Chat
 } from "learners/pages";

import { 
  RequireAuth, RequireAdmin, RequireCreator, WebSock
} from "components"

function App() {
  
  return (
    <Routes>
      <Route path = "/" element = {<Layout />}>
        <Route path = '/' element = {<LandingPage />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = '/websock' element = {<WebSock />} />
      
        <Route element = {<RequireAdmin />}>
          <Route path = "/all-creators" element = {<Creators />} />
          <Route path = "/demo" element = {<DemoHome />} />
          <Route path = "/demo/create-demo" element = {<CreateDemo />} />
          <Route path = "/demo/add-questions-demo/:module_id/:section_id" element = {<AddQuestionsToSection />} />
        </Route>

        <Route element = {<RequireCreator />}>
          <Route path = "/all-modules" element = {<ListModules />} />
        </Route>

        <Route element = {<RequireAuth />}>
          <Route path = "/explore-creators" element = {<Explore />} />
          <Route path = "/chat" element = {<Chat />} />
        </Route>
      
      </Route>
    </Routes>
  )
};

export default App;
