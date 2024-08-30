import { Route, Routes } from 'react-router-dom';

// Layouts
import Layout from 'layouts/Layout';
import AdminNavbar from 'layouts/admin/AdminNavbar';

// Generic Pages
import {
  LandingPage,
  Login,
  Support,
  Privacy,
  AccountSettings,
  Logout
} from "pages";

// ADmin Pages
import ListModules from 'creators/pages/ListModules';
import {
  AdminCreators, 
  AdminAddCreator,
  AdminModules, 
  AdminAddModule, 
  AdminModule, 
  AdminBuildOutModule, 
  AdminAddFirstPart,
  AdminAddGoalsAndQuestions, 
  AdminAddQuestions, 
  AdminAddContent, 
  AdminAddCleanedContent, 
  AdminDeleteModule, 
  DemoHome, 
  CreateDemo, 
  CreateDemoSuccess,
  CreateSmallDemo,
  AddQuestionsToSection,
  Test
} from "admin";

// Learner Pages
import {
  Explore, Chat
 } from "learners/pages";

 // Components
import { 
  RequireAuth, RequireAdmin, RequireCreator, WebSock
} from "components"
import Leaderboard from 'admin/pages/Leaderboard';
import DeleteAccountSteps from 'pages/DeleteAccountSteps';
import NotFound from 'pages/NotFound';
import CreatorPortal from './pages/CreatorPortal';
import ViewQuestions from 'pages/ViewQuestions';
import RegisterInterest from 'pages/RegisterInterest';



function App() {
  
  return (
    <Routes>
      <Route 
        path="/google08bed264bf48f942.html" 
        element={
          <div dangerouslySetInnerHTML={{ __html: 'google-site-verification: google08bed264bf48f942.html' }} />
        } 
      />
      <Route 
        path="/google08bed264bf48f942.html" 
        element={
          <div dangerouslySetInnerHTML={{ __html: 'google-site-verification: google0a6dedae1a53f95f.html' }} />
        } 
      />
      <Route path = "/" element = {<Layout />}>
        <Route path = '/' element = {<LandingPage />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/support" element = {<Support />} />
        <Route path = "/privacy" element = {<Privacy />} />
        <Route path = "/delete-account" element = {<DeleteAccountSteps />} />

        <Route path = '/websock' element = {<WebSock />} />
      
        <Route element = {<RequireAdmin />}>
            <Route path = "/leaderboard" element = {<Leaderboard />} />
            <Route path="/creator-portal" element={<CreatorPortal />} />

            <Route path = "/admin" element = {<AdminNavbar />}>
            <Route path = "/admin/all-creators" element = {<AdminCreators />} />
            <Route path = "/admin/all-creators/add-creator" element = {<AdminAddCreator />} />
            <Route path = "/admin/all-modules/:creator_id" element = {<AdminModules />} />
            <Route path = "/admin/add-module/:creator_id" element = {<AdminAddModule />} />
            <Route path = "/admin/module/:creator_id/:module_id" element = {<AdminModule />} />
            <Route path = "/admin/module/:creator_id/:module_id/delete" element = {<AdminDeleteModule />} />
            <Route path = "/admin/add-module-part/:creator_id/:module_id" element = {<AdminAddFirstPart />} />
            <Route path = "/admin/build-out-module/:creator_id/:module_id" element = {<AdminBuildOutModule />} />
            <Route path = "/admin/module/:creator_id/:module_id/add-goals-and-questions/:section_id" element = {<AdminAddGoalsAndQuestions />} />
            <Route path = "/admin/module/:creator_id/:module_id/add-questions/:section_id" element = {<AdminAddQuestions />} />
            <Route path = "/admin/module/:creator_id/:module_id/add-content/:section_id" element = {<AdminAddContent />} />
            <Route path = "/admin/module/:creator_id/:module_id/add-cleaned-content/:section_id" element = {<AdminAddCleanedContent />} />

            <Route path = "/admin/test" element = {<Test />} />

      

            <Route path = "/admin/demo" element = {<DemoHome />} />
            <Route path = "/admin/demo/create-small-demo" element = {<CreateSmallDemo />} />
            <Route path = "/admin/demo/create-demo" element = {<CreateDemo />} />
            <Route path = "/admin/demo/:module_id/success" element = {<CreateDemoSuccess />} />
            <Route path = "/admin/demo/add-questions-demo/:module_id/:section_id" element = {<AddQuestionsToSection />} />            
          </Route>
        </Route>

        <Route element = {<RequireCreator />}>
          <Route path = "/all-modules" element = {<ListModules />} />
        </Route>

        <Route element = {<RequireAuth />}>
          <Route path = "/explore-creators" element = {<Explore />} />
          <Route path = "/chat" element = {<Chat />} />

          <Route path = "/account-settings" element = {<AccountSettings />} />
          <Route path = "/logout" element = {<Logout />} />
        </Route>
      
        <Route path = "/view-all-poker-questions" element = {<ViewQuestions />} />
        <Route path = "/register-interest" element = {<RegisterInterest />} />
      </Route>
      <Route path = "/*" element = {<NotFound />} />
    </Routes>
  )
}

export default App;