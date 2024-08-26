import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Users, DollarSign, AlertCircle } from 'lucide-react';
import '../styles/pages/creatorportal.css';

const CreatorPortal = () => {
  const performanceData = [
    { name: 'Math', score: 85 },
    { name: 'Science', score: 72 },
    { name: 'History', score: 90 },
    { name: 'Literature', score: 78 },
    { name: 'Art', score: 95 },
  ];

  const signUpTrendData = [
    { date: '2023-01-01', signUps: 100 },
    { date: '2023-02-01', signUps: 150 },
    { date: '2023-03-01', signUps: 200 },
    { date: '2023-04-01', signUps: 180 },
    { date: '2023-05-01', signUps: 250 },
  ];

  const detailedPerformanceData = [
    { topic: 'Algebra', correctRate: 75, avgTimeSpent: 120 },
    { topic: 'Geometry', correctRate: 68, avgTimeSpent: 150 },
    { topic: 'Calculus', correctRate: 62, avgTimeSpent: 180 },
    { topic: 'Statistics', correctRate: 80, avgTimeSpent: 100 },
  ];

  const questionHotspots = [
    { id: 1, question: "What is the capital of France?", topic: "Geography", successRate: 45 },
    { id: 2, question: "What is the square root of 144?", topic: "Mathematics", successRate: 52 },
    { id: 3, question: "Who wrote 'To Kill a Mockingbird'?", topic: "Literature", successRate: 58 },
    { id: 4, question: "What is the chemical symbol for gold?", topic: "Chemistry", successRate: 60 },
    { id: 5, question: "In which year did World War II end?", topic: "History", successRate: 63 },
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
        
        <section className="sign-up-trend">
          <h2>Sign-up Trend</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
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
        
        <section className="detailed-performance">
          <h2>Detailed Performance Insights</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
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
        
        <section className="question-hotspots">
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
      </main>
    </div>
  );
};

export default CreatorPortal;