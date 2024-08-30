import React from 'react';
import { Check, X } from 'lucide-react';
import '../styles/pages/creatorportal.css';

const PricingTiers = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      features: [
        'Access to basic content',
        'Limited quizzes',
        'Community forum access',
        'Ad-supported experience',
      ],
      notIncluded: [
        'Premium content',
        'Personalized learning paths',
        'Direct instructor support',
        'Ad-free experience',
      ],
    },
    {
      name: 'Basic',
      price: '$9.99/month',
      features: [
        'All Free tier features',
        'Access to intermediate content',
        'Unlimited quizzes',
        'Progress tracking',
        'Ad-free experience',
      ],
      notIncluded: [
        'Advanced content',
        'Personalized learning paths',
        'Direct instructor support',
      ],
    },
    {
      name: 'Premium',
      price: '$19.99/month',
      features: [
        'All Basic tier features',
        'Access to all content (including advanced)',
        'Personalized learning paths',
        'Direct instructor support',
        'Exclusive webinars and live Q&A sessions',
        'Downloadable resources',
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="content-wrapper">
      <main className="creator-portal-content">
        <div className="channel-insights-title">
          <h2>Pricing Tiers</h2>
        </div>
        <div className="grid-layout">
          {tiers.map((tier, index) => (
            <section key={index} className="card pricing-tier">
              <h2>{tier.name}</h2>
              <p className="price">{tier.price}</p>
              <div className="features">
                <h3>Features:</h3>
                <ul>
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <Check className="feature-icon positive" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {tier.notIncluded.length > 0 && (
                <div className="not-included">
                  <h3>Not Included:</h3>
                  <ul>
                    {tier.notIncluded.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <X className="feature-icon negative" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button className="cta-button">Select Plan</button>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PricingTiers;
