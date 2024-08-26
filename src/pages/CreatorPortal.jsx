import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import '../styles/pages/creatorportal.css';

const CreatorPortal = () => {
  const performanceData = [
    { name: 'Math', score: 85 },
    { name: 'Science', score: 72 },
    { name: 'History', score: 90 },
    { name: 'Literature', score: 78 },
    { name: 'Art', score: 95 },
  ];

  return (
    <div className="content-wrapper">
      <main className="creator-portal-content">
        <h1 className="portal-title">Creator Portal</h1>
        
        <section className="metrics-overview">
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
        
        <section className="performance-analysis">
          <h2>Content Performance</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        
        <section className="insights">
          <h2>Insights</h2>
          <div className="insight-card">
            <h3>Content Improvement Opportunity</h3>
            <p>
              Based on the performance data, users seem to be struggling the most with Science content. 
              Consider creating more explanatory content or practice exercises in this area to boost engagement and understanding.
            </p>
          </div>
          <div className="insight-card">
            <h3>High Performer</h3>
            <p>
              Art content is performing exceptionally well. You might want to explore creating more advanced 
              or specialized Art courses to cater to this highly engaged audience segment.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreatorPortal;