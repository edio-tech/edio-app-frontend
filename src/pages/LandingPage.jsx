import { useNavigate } from 'react-router-dom';
import { Book, Brain, BarChart2, MessageCircle, ChevronRight } from 'lucide-react';

import { FeatureCard } from "components";

import 'styles/pages/landingpage.css'


// SECTIONS

// Home (Hero)

// About

// Creators

// Learners

// Contact

const LandingPage = () => {

  const navigate = useNavigate();

  const RedirectLogin = () => {
    navigate('/login')
  }


   return (
      <div className="edio-landing-page">
      <section id='hero' className='section odd edio-hero'>
        {/* <a
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            border: '1px solid black',
            padding: '2px 20px',
            borderRadius: 100,
            textDecoration: 'none',
            color: 'black'
          }}
          href='https://www.ycombinator.com/apply'
        >
          <img src={'https://cdn.prod.website-files.com/6663a47b46313d7251a0c908/666b624f2e0b455fde127556_yc_logo.png'}
            style={{
              width: 150,
            }}
          />
          <span>F24 Batch</span>
          <ChevronRight />
        </a> */}
        <h2>Learning Made Fun</h2>
        <p>Edio harnesses the power of generative AI to transform educational content into an interactive learning experience</p>
        <div className="button-row-landing-page-hero">
          <button className="edio-cta-button" type="button" onClick={RedirectLogin}>Get Started</button>
          <a className='edio-cta-button calendly-link' href='https://calendly.com/ross-edio/30min'>Book a Demo</a>
        </div>


        <h3 style={{marginTop: 100}}>About Edio</h3>
      </section>

      {/* <section id="creators" className='section even'>
        <h3>Our Features</h3>
        <div className="edio-feature-grid">
          <FeatureCard 
            icon={<Book size={48} />}
            title="Content Gamification"
            description="Transform boring lessons into exciting games"
          />
          <FeatureCard 
            icon={<Brain size={48} />}
            title="AI-Powered Learning"
            description="Adaptive learning paths tailored to you"
          />
          <FeatureCard 
            icon={<BarChart2 size={48} />}
            title="Advanced Analytics"
            description="Insights on your progress and areas to improve"
          />
          <FeatureCard 
            icon={<MessageCircle size={48} />}
            title="AI Study Buddy"
            description="AI Chatbot with context on your performance and course material"
          />
        </div>
      </section> */}

      <section id="creators" className='section even'>
        <h3>Creators</h3>
      </section>

      <section id="learners" className='section odd'>
        <h3>Learners</h3>
      </section>

      <section id="contact" className='section even'>
        <h3>Contact</h3>
      </section>

      {/* <section id="learners" className='section odd'>
        <h3>About Edio</h3>
        <p>
          Edio is revolutionizing education by harnessing the power of AI to create engaging, personalized learning experiences. 
          Our platform turns any educational content into fun, interactive games while providing deep insights into your learning journey.
        </p>
      </section> */}
      {/* 
      <section id="edio-contact">
        <h3>Ready to Transform Your Learning?</h3>
        <button className="edio-cta-button">Contact Us</button>
      </section>
      */}

      <footer className="edio-footer">
        <p>&copy; 2024 Edio. All rights reserved.</p>
      </footer>
    </div>
   )
}


export default LandingPage;