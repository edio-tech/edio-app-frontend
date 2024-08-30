import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Users, DollarSign, AlertCircle, Check, Flame, Plus } from 'lucide-react';
import '../styles/pages/creatorportal.css';

const CreatorPortal = () => {
  const performanceData = [
    { name: 'Rivers', score: 93 },
    { name: 'Mountains', score: 72 },
    { name: 'Mapwork', score: 35 },
    { name: 'Climate', score: 78 },
    { name: 'Geopolitics', score: 64 },
  ];

  const signUpTrendData = [
    { date: '2025-08-18', signUps: 100 },
    { date: '2025-08-20', signUps: 150 },
    { date: '2025-08-22', signUps: 200 },
    { date: '2025-08-24', signUps: 180 },
    { date: '2025-08-26', signUps: 250 },
  ];

  const detailedPerformanceData = [
    { topic: 'Landforms', correctRate: 75, avgTimeSpent: 120 },
    { topic: 'Population', correctRate: 68, avgTimeSpent: 150 },
    { topic: 'Ecosystems', correctRate: 62, avgTimeSpent: 180 },
    { topic: 'Urban Geography', correctRate: 80, avgTimeSpent: 100 },
  ];

  const questionHotspots = [
    
    { id: 2, question: "How do you determine the contour interval on a topographic map?", topic: "Physical Geography", successRate: 42 },
    { id: 3, question: "What term describes the climate phenomenon where ocean temperatures rise and cause changes in weather patterns?", topic: "Climate Geography", successRate: 45 },
    { id: 4, question: "What is the study of human settlements and how they interact with the environment called?", topic: "Human Geography", successRate: 47 },
    { id: 5, question: "What is the technique called that uses satellite images to map and analyze the Earth's surface?", topic: "Cartography", successRate: 50 },
  ];

  return (
    <div className="content-wrapper">
      <main className="creator-portal-content">
        <div className="channel-insights-title">
          <h2>Channel Insights</h2>
        </div>
        <div className="grid-layout">
          <section className="metrics-overview card">
            <h2>Overview</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <Users className="metric-icon" />
                <div className="metric-info">
                  <h3>Total Sign-ups</h3>
                  <p className="metric-value">1,234</p>
                  <p className="metric-trend positive">+5% this week</p>
                </div>
              </div>
              <div className="metric-card">
                <TrendingUp className="metric-icon" />
                <div className="metric-info">
                  <h3>User Engagement</h3>
                  <p className="metric-value">87%</p>
                  <p className="metric-trend positive">+2% this month</p>
                </div>
              </div>
              <div className="metric-card">
                <DollarSign className="metric-icon" />
                <div className="metric-info">
                  <h3>Total Income</h3>
                  <p className="metric-value">$5,678</p>
                  <p className="metric-trend positive">+10% this quarter</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="sign-up-trend card">
            <h2>Sign-up Trend</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signUpTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="signUps" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
          
          <section className="performance-analysis card">
            <h2>Content Performance</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8884d8" maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          
          <section className="detailed-performance card">
            <h2>Detailed Performance Insights</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={305}>
                <BarChart data={detailedPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="correctRate" fill="#8884d8" name="Correct Rate (%)" />
                  <Bar yAxisId="right" dataKey="avgTimeSpent" fill="#82ca9d" name="Avg. Time Spent (s)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          
          <section className="insights card">
            <h2>Insights</h2>
            <div className="insight-card">
              <h3>Content Improvement Opportunity</h3>
              <p>
                Based on the performance data, users seem to be struggling the most with Mapwork. 
                Consider creating more explanatory content or practice exercises in this area to boost engagement and understanding.
              </p>
            </div>
            <div className="insight-card">
              <h3>High Performer</h3>
              <p>
                Your audience is performing very well with Rivers. You might want to explore creating more advanced 
                or specialized content on Rivers to cater to this highly engaged audience segment.
              </p>
            </div>
          </section>
          
          <section className="question-hotspots card">
            <h2>Question Hotspots</h2>
            <p>These are the top 5 MCQ questions that users are struggling with:</p>
            <div className="hotspot-list">
              {questionHotspots.map((question) => (
                <div key={question.id} className="hotspot-item">
                  <AlertCircle className="hotspot-icon" />
                  <div className="hotspot-content">
                    <h3>{question.question}</h3>
                    <p>Topic: {question.topic}</p>
                    <p>Success Rate: {question.successRate}%</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className='flexible-pricing card'>
            <h2>Flexible Pricing</h2>
            <p>Set your own pricing tiers, from free to premium. As your content grows, easily add new tiers to match your expanding offerings.</p>
            <div className="pricing-tiers">
              <div className="pricing-card free-tier">
                <h3>Free Tier</h3>
                <Flame size={70} color='red' />
                <p className="price">€0</p>
                <ul>
                  <li className='tier-item'><Check size={18} color='green' /><span>Basic access to content</span></li>
                  <li className='tier-item'><Check size={18} color='green' /><span>Limited features</span></li>
                  <li className='tier-item'><Check size={18} color='green' /><span>Ad-supported experience</span></li>
                </ul>
              </div>
              <div className="pricing-card beginner-tier">
                <h3>Beginner Tier</h3>
                <Flame size={70} color='blue' />
                <p className="price">€10</p>
                <ul>
                  <li className='tier-item'><Check size={18} color='green' /><span>Full access to content</span></li>
                  <li className='tier-item'><Check size={18} color='green' /><span>Access to Chatbot</span></li>
                  <li className='tier-item'><Check size={18} color='green' /><span>Basic analytics</span></li>
                  <li className='tier-item'><Check size={18} color='green' /><span>Ad-free experience</span></li>
                </ul>
              </div>
              <div className="pricing-card create-tier" title="Create Tier">
                <Plus size={70} color='black' />
                <p>Create Tier</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CreatorPortal;