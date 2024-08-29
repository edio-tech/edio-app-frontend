import { useNavigate } from 'react-router-dom';
import { Book, Brain, BarChart2, MessageCircle, ChevronRight, Cog, FileStack, MoveRight } from 'lucide-react';

import { FeatureCard } from "components";

import 'styles/pages/landingpage.css'
import { useState } from 'react';


// SECTIONS

// Home (Hero)

// About

// Creators

// Learners

// Contact

const LandingPage = () => {

  const [currentIndex, setCurrentIndex] = useState(1);
  const navigate = useNavigate();

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const RedirectLogin = () => {
    navigate('/login')
  }


   return (
      <div className="edio-landing-page">
      <section id='hero' className='section odd edio-hero full-height'>
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
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-text">
              <h2>Learning Made Fun</h2>
              <p>Edio leverages AI to transform educational content into an interactive learning experience</p>
            </div>
            <div className="hero-content-transform">
              <div className="document-section">
                <FileStack size={100} color='#000000' />
                <span>Content</span>
              </div>
              <MoveRight size={100} color='#000000' />
              <div className="ai-section">
                <Cog size={100} color='#000000' />
                <span>Transformed by AI</span>
              </div>
              <MoveRight size={100} color='#000000' />
            </div>
          </div>
          
          <div className="carousel">
            <div className="carousel-container">
              {['https://res.cloudinary.com/dyjzdczw8/image/upload/v1724745175/Component_14_1_gyf6db.svg', 
                'https://res.cloudinary.com/dyjzdczw8/image/upload/v1724745404/Group_54_rtpcyq.svg', 
                'https://res.cloudinary.com/dyjzdczw8/image/upload/v1724745457/Component_14_2_xpwg1d.svg'].map((src, index) => (
                <div 
                  className="carousel-slide" 
                  key={index} 
                  onClick={() => handleImageClick(index)} // Add click handler
                >
                  <img 
                    src={src} 
                    alt={`Image ${index + 1}`} 
                    className={`feature-image ${currentIndex === index ? 'selected-feature-image' : ''}`} 
                  />
                </div>
              ))}
            </div>
            <div className="dots-container">
              {['1', '2', '3'].map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${currentIndex === index ? 'active' : ''}`} 
                  onClick={() => handleDotClick(index)} // Add click handler for dots
                />
              ))}
            </div>
          </div>


        </div>
        <div className="cta-container">
          <a className='demo-button' href='https://calendly.com/ross-edio/30min'>Book a Demo</a>
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