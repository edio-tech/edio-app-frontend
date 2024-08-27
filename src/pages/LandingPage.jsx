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
      <section id='hero' className='section odd edio-hero full-height'>
        <div className="hero-content">
          <h2>Learning Made Fun</h2>
          <p>Edio leverages AI to transform educational content into an interactive learning experience</p>
          
          <div className="feature-section">
            <div className="educational-content">
              <p>Educational Content</p>
            </div>
            <div className="transformed-images">
              <img 
                src="https://res.cloudinary.com/dyjzdczw8/image/upload/v1724745175/Component_14_1_gyf6db.svg" 
                alt="Digestible Flashcards"
                className="feature-image"
              />
              <img 
                src="https://res.cloudinary.com/dyjzdczw8/image/upload/v1724745404/Group_54_rtpcyq.svg" 
                alt="Gamified Quizzes"
                className="feature-image"
              />
              <img 
                src="https://res.cloudinary.com/dyjzdczw8/image/upload/v1724745457/Component_14_2_xpwg1d.svg" 
                alt="Personalized AI Tutor"
                className="feature-image"
              />
            </div>
          </div>

          <div className="cta-container">
            <a className='demo-button' href='https://calendly.com/ross-edio/30min'>Book a Demo</a>
          </div>
        </div>
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