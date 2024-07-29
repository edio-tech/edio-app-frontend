import { useNavigate } from 'react-router-dom';
import { Book, Brain, BarChart2, MessageCircle } from 'lucide-react';

import { FeatureCard } from "components";

import EdioText from "assets/edio-animation-first-frame.png"
import 'styles/pages/landingpage.css'


const LandingPage = () => {

  const navigate = useNavigate();

  const RedirectLogin = () => {
    navigate('/login')
  }


   return (
      <div className="edio-landing-page">
      <section className="edio-hero">
        <img className = "edio-text" src={EdioText} />
        <h2>Learning, Gamified and Personalized</h2>
        <p>Edio harnesses the power of generative AI to transforms educational content into an interactive learning experience</p>
        <div className="button-row-landing-page-hero">
          <button className="edio-cta-button" type="button" onClick={RedirectLogin}>Get Started</button>
          <a className='edio-cta-button calendly-link' href='https://calendly.com/ross-edio/30min'>Book a Demo</a>
        </div>
      </section>

      <section id="edio-features">
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
            description="24/7 chatbot assistant with course context"
          />
        </div>
      </section>

      <section id="edio-about">
        <h3>About Edio</h3>
        <p>
          Edio is revolutionizing education by harnessing the power of AI to create engaging, personalized learning experiences. 
          Our platform turns any educational content into fun, interactive games while providing deep insights into your learning journey.
        </p>
      </section>
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