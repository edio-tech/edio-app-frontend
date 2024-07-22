import { Route, Routes } from 'react-router-dom';

import Layout from 'layouts/Layout';

import {
  LandingPage,
  Login,
  Support,
  Privacy
} from "pages";

import ListModules from 'creators/pages/ListModules';
import {
  AdminCreators, AdminModules, AdminAddModule, AdminModule, AdminBuildOutModule, AdminAddQuestions, AdminAddContent, AdminAddSummary, AdminDeleteModule, DemoHome, CreateDemo, AddQuestionsToSection
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
        <Route path = "/support" element = {<Support />} />
        <Route path = "privacy" element = {<Privacy />} />

        <Route path = '/websock' element = {<WebSock />} />
      
        <Route element = {<RequireAdmin />}>
          <Route path = "/admin/all-creators" element = {<AdminCreators />} />
          <Route path = "/admin/all-modules/:creator_id" element = {<AdminModules />} />
          <Route path = "/admin/add-module/:creator_id" element = {<AdminAddModule />} />
          <Route path = "/admin/module/:creator_id/:module_id" element = {<AdminModule />} />
          <Route path = "/admin/module/:creator_id/:module_id/delete" element = {<AdminDeleteModule />} />
          <Route path = "/admin/build-out-module/:creator_id/:module_id" element = {<AdminBuildOutModule />} />
          <Route path = "/admin/module/:creator_id/:module_id/add-questions/:section_id" element = {<AdminAddQuestions />} />
          <Route path = "/admin/module/:creator_id/:module_id/add-content/:section_id" element = {<AdminAddContent />} />
          <Route path = "/admin/module/:creator_id/:module_id/add-summary/:section_id" element = {<AdminAddSummary />} />

          <Route path = "/admin/demo" element = {<DemoHome />} />
          <Route path = "admin/demo/create-demo" element = {<CreateDemo />} />
          <Route path = "admin/demo/add-questions-demo/:module_id/:section_id" element = {<AddQuestionsToSection />} />
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
