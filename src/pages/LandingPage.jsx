import { useNavigate } from 'react-router-dom';
import { Book, Brain, BarChart2, MessageCircle, ChevronRight, MoveRight } from 'lucide-react';
import noteIcon from '../assets/note.png';
import paper from '../assets/slides.svg';
import React from 'react';
import Lottie from 'lottie-react';
import edioAnimation from '../assets/new_edio.json';

import { FeatureCard } from "components";

import 'styles/pages/landingpage.css'
import { useState, useRef, useEffect } from 'react';

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

  const creatorsRef = useRef(null);
  const learnersRef = useRef(null);
  const featureRow1Ref = useRef(null);
  const featureRow2Ref = useRef(null);
  const featureRow3Ref = useRef(null);
  const featureRow4Ref = useRef(null);
  const learnerRow1Ref = useRef(null);
  const learnerRow2Ref = useRef(null);
  const learnerRow3Ref = useRef(null);
  const learnerRow4Ref = useRef(null);

  useEffect(() => {
    const creatorsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInDown 1s ease-out forwards';
          }
        });
      },
      { threshold: 0.1 }
    );

    const learnersObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInDown 1s ease-out forwards';
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureRowsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate', 'visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const learnerRowsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate', 'visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (creatorsRef.current) {
      creatorsObserver.observe(creatorsRef.current);
    }

    if (learnersRef.current) {
      learnersObserver.observe(learnersRef.current);
    }

    [featureRow1Ref, featureRow2Ref, featureRow3Ref, featureRow4Ref].forEach((ref) => {
      if (ref.current) {
        featureRowsObserver.observe(ref.current);
      }
    });

    [learnerRow1Ref, learnerRow2Ref, learnerRow3Ref, learnerRow4Ref].forEach((ref) => {
      if (ref.current) {
        learnerRowsObserver.observe(ref.current);
      }
    });

    return () => {
      creatorsObserver.disconnect();
      learnersObserver.disconnect();
      featureRowsObserver.disconnect();
      learnerRowsObserver.disconnect();
    };
  }, []);

  return (
    <div className="edio-landing-page">
      <section id='hero' className='section odd edio-hero full-height'>
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-text">
              <h2>Learning Made Fun</h2>
              <p>Edio leverages AI to transform educational content into an interactive learning experience</p>
            </div>
            <div className="hero-content-transform">
              <div className="hero-content-item">
                <img src={'https://res.cloudinary.com/dyjzdczw8/image/upload/v1726057880/Component_1_idanhu.png'} alt="Note" className="hero-icon note-icon" />
              </div>
              <div className="transform-section">
                <MoveRight size={60} color='#F0EDE6' className='arrow' />
                <div className="ai-section">
                  <Lottie
                    animationData={edioAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ width: 150, height: 150 }} // Adjust size as needed
                  />
                
                </div>
                <MoveRight size={60} color='#F0EDE6' className='arrow' />
              </div>
            </div>
          </div>
          
          <div className="carousel">
            <div className="carousel-container">
              {['https://res.cloudinary.com/dyjzdczw8/image/upload/v1726057557/carousel1_yewcuf.png', 
                'https://res.cloudinary.com/dyjzdczw8/image/upload/v1726057557/carousel2_l6gqnz.png', 
                'https://res.cloudinary.com/dyjzdczw8/image/upload/v1726057557/carousel3_1_bi6jgk.png'].map((src, index) => (
                <div 
                  className="carousel-slide" 
                  key={index} 
                  onClick={() => handleImageClick(index)} // Add click handler
                >
                  <img 
                    src={src} 
                    alt={`Image ${index + 1}`} 
                    className={`hero-carousel-image ${currentIndex === index ? 'selected-hero-carousel-image' : ''}`}
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

      <section id="creators" className='section even full-height'>
        <div className="creator-portal-title-part" ref={creatorsRef}>
          <h2 className='creator-portal-title'>What creators can do</h2>
          <p className='creator-portal-description'>
            Edio empowers creators to transform their content or expertise into interactive learning experiences.
            We allow you to monetize your content, expertise and knowledge. We also provide you with data-driven insights to help you improve your content, based on what your audience needs. 
          </p>
        </div>
        
        <div className="creator-features">
          <div className="feature-row" ref={featureRow1Ref}>
            <div className="feature-text">
              <h3 style={{ fontSize: '2rem' }}>Performance Overview</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Get a bird's-eye view of your content's performance and user engagement. Track sign-ups, completions, and more in real-time.</p>
            </div>
            <div className="feature-image">
              <img src="https://res.cloudinary.com/dyjzdczw8/image/upload/v1724990653/Screenshot_2024-08-29_at_21.02.36_bnncxh.png" alt="Performance Overview Dashboard" className="creator-feature-image" />
            </div>
          </div>

          <div className="feature-row reverse" ref={featureRow2Ref}>
            <div className="feature-image feature-image-reverse">
              <img src="https://res.cloudinary.com/dyjzdczw8/image/upload/v1724992308/Screenshot_2024-08-29_at_21.30.11_fwtjvs.png" alt="Flexible Pricing Options" className="creator-feature-image" />
            </div>
            <div className="feature-text">
              <h3 style={{ fontSize: '2rem' }}>Detailed User Insights</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Dive deep into user performance across different sections of your content. Identify areas where learners excel or struggle.</p>
            </div>
          </div>

          <div className="feature-row" ref={featureRow3Ref}>
            <div className="feature-text">
              <h3 style={{ fontSize: '2rem' }}>Content Direction Insights</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Leverage unique AI-driven insights to guide your content creation. Discover what areas of the subject your audience struggles with and optimize your content to address these areas.</p>
            </div>
            <div className="feature-image">
              <img src="https://res.cloudinary.com/dyjzdczw8/image/upload/v1724992448/Screenshot_2024-08-29_at_21.32.33_z41vp7.png" alt="User Performance Insights" className="creator-feature-image" />
            </div>
          </div>

          <div className="feature-row reverse" ref={featureRow4Ref}>
            <div className="feature-image feature-image-reverse">
              <img src="https://res.cloudinary.com/dyjzdczw8/image/upload/v1725001195/Screenshot_2024-08-29_at_23.58.16_g8z0bb.png" alt="Content Direction Insights" className="creator-feature-image" />
            </div>
            <div className="feature-text">
              <h3 style={{ fontSize: '2rem' }}>You control the Pricing</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Each creator can set their own pricing structure. You can set your own prices, and define access permissions for each tier. You can also have a free tier to attract new learners.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="learners" className='section odd full-height learner-section'>
        <div className="learner-title-section" ref={learnersRef}>
          <h2 className="learner-title">For Learners</h2>
          <p className="learner-description">
            Edio transforms how you learn, making education more engaging and effective.
          </p>
        </div>

        <div className="learner-features">
          <div className="feature-row" ref={learnerRow1Ref}>
            <div className="feature-text">
              <h3 style={{ fontSize: '2rem' }}>Personalized Learning Paths</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Digestible summaries optimized for micro-learning. Swipe through notes and later take a quiz to test your knowledge.</p>
            </div>
            <div className="feature-image">
              <img src="https://res.cloudinary.com/dphekriyz/image/upload/v1724959738/edio/landing_page/Flashcard_crnvmc.png" alt="Personalized Learning" className="learner-feature-image" />
            </div>
          </div>

          <div className="feature-row reverse" ref={learnerRow2Ref}>
            <div className="feature-image">
              <img src="https://res.cloudinary.com/dphekriyz/image/upload/v1724959738/edio/landing_page/Quiz_k9wvzp.png" alt="Interactive Content" className="learner-feature-image" />
            </div>
            <div className="feature-text">
              <h3 style={{ fontSize: '2rem' }}>Gamified Learning</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Engage with dynamic, interactive content that makes learning fun and engaging. Your users can earn coins, and spend them on bonuses such as hints and AI assistance.</p>
            </div>
          </div>

          <div className="feature-row" ref={learnerRow3Ref}>
            <div className="feature-text">
              <h3 style={{ fontSize: '2rem' }}>Progress Tracking</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Monitor your learning journey with detailed analytics and insights.</p>
            </div>
            <div className="feature-image">
              <img src="https://res.cloudinary.com/dphekriyz/image/upload/v1724959738/edio/landing_page/Analytics_1_uvnpbw.png" alt="Progress Tracking" className="learner-feature-image" />
            </div>
          </div>

          <div className="feature-row reverse" ref={learnerRow4Ref}>
            <div className="feature-image">
              <img src="https://res.cloudinary.com/dphekriyz/image/upload/v1724959738/edio/landing_page/Chat_vygoul.png" alt="Community Learning" className="learner-feature-image" />
            </div>
            <div className="feature-text">
              <h3 style={{ fontSize: '2rem' }}>Personalized AI Study Buddy</h3>
              <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Consult with an AI chatbot that is trained on your creators content, and is constantly updated on your progress and performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className='section even full-height contact-section'>
        <div className="schedule-a-call">
          <h2>Get in Touch</h2>
          <p className='contact-description'>We're always eager to enhance our offerings and are open to incorporating new features or tailoring our services to meet your specific needs. If you have any particular requirements or unique scenarios in mind, feel free to reach out — we're here to make sure you get exactly what you need.</p>
          <div className="cta-container">
            <a className='demo-button' href='https://calendly.com/ross-edio/30min'>Schedule a Call</a>
          </div>
        </div>
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
        <p>Contact: <a href="mailto:ross@edio.cc">ross@edio.cc</a></p>
      </footer>
    </div>
   )
}


export default LandingPage;