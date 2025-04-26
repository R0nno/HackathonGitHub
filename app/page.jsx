'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/framework.js'; // load JS interactions
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#232323] p-5">
      {/* Dropdown */}
      <div className="dropdown mb-10">
        <div className="select">
          <span className="selected">WA</span>
          <div className="caret" />
        </div>
        <ul className="menu">
          {[
            "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
            "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
            "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
            "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
          ].map(state => (
            <li key={state} className={state === 'WA' ? "active" : ""}>
              {state}
            </li>
          ))}
        </ul>
      </div>

      {/* Slider */}
      <div className="slider relative w-72 h-[60vh] bg-[#262c56] text-white rounded-lg p-4 flex flex-col justify-between">
        
        {/* Up Arrow */}
        <div className="icon hide">
          <span className="up-arrow">↑</span>
        </div>

        <ul className="tabs flex-1 my-6 overflow-y-auto flex flex-col gap-2">
          {[
            "Bill #1: Stop Logging",
            "Bill #2: Provide Healthcare",
            "Bill #3: Lower Taxes",
            "Bill #4: Provide Housing",
            "Bill #5: Address Substance Abuse",
            "Bill #6: Enforce Littering Penalties",
            "Bill #7: Free School Lunches",
            "Bill #8: Create Affordable Housing",
            "Bill #9: Build Sustainable Infrastructure",
            "Bill #10: Support Right to Abortion",
            "Bill #11: Help Children with Disabilities"
          ].map((bill, index) => (
            <li key={index} className={`tab ${index === 0 ? "active" : ""}`}>
              {bill}
            </li>
          ))}
        </ul>

        {/* Down Arrow */}
        <div className="icon">
          <span className="down-arrow">↓</span>
        </div>

      </div>
    </div>
  );
}
