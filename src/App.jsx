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
  Logout,
  SelectReviewQuestions,
  ViewQuestions
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
  RequireAuth, RequireAdmin, RequireCreator, RequireReviewer, WebSock
} from "components"

import Leaderboard from 'admin/pages/Leaderboard';
import DeleteAccountSteps from 'pages/DeleteAccountSteps';
import NotFound from 'pages/NotFound';
import CreatorPortal from './pages/CreatorPortal';
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

        <Route path = "/register-interest" element = {<RegisterInterest />} />

        <Route path = '/websock' element = {<WebSock />} />


        {/* Admin Only Routes */}
      
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



        {/* Creator Only Routes */}

        <Route element = {<RequireCreator />}>
          <Route path = "/all-modules" element = {<ListModules />} />
        </Route>



        {/* Reviewer Only Routes */}

        <Route element = {<RequireReviewer />}>
          <Route path = "/review-questions" element = {<SelectReviewQuestions />} />
          
        </Route>

      <Route path = "/review-all-poker-questions" element = {<ViewQuestions />} />
      <Route path = "/view-all-poker-questions" element = {<ViewQuestions />} />



        {/* Auth Routes */}

        <Route element = {<RequireAuth />}>
          <Route path = "/explore-creators" element = {<Explore />} />
          <Route path = "/chat" element = {<Chat />} />

          <Route path = "/account-settings" element = {<AccountSettings />} />
          <Route path = "/logout" element = {<Logout />} />
        </Route>


        
      </Route>
      <Route path = "/*" element = {<NotFound />} />
    </Routes>
  )
}

export default App;