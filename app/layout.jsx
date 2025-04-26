import '../globals.css';
import './main.css'; // Your new main styling
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'ClarifyAI',
  description: 'Simplify Legislation with AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <div className="waves"></div>
        {/* Waves Background */}
        <div className="waves"></div>

        {/* Main Site Structure */}
        <div className="site">
          
          {/* Header */}
          <div className="header-wrapper">
            <div className="wrapper">
              <header>
                <a href="#" className="logo flex items-center gap-2">
                  <img
                    src="/images/clarifylogo3.svg"
                    alt="ClarifyAI Logo"
                    className="h-10"
                  />
                  <span className="text-5xl font-bold relative bottom-2 left-1">
                    ClarifyAI
                  </span>
                </a>
              </header>
            </div>

            {/* State Button */}
            <div className="state-dropdown">
                <select className='state-select'>
                    {[
                        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
                        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
                        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
                        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
                        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
                    ].map(state => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>
          </div>

          {/* Main Page Content */}
          {children}

          {/* About Section */}
          <div className="about">
            <div className="about-box">
              <div className="about-box-text p-10">
                <h1 className="text-4xl font-bold mb-4">About ClarifyAI</h1>
                <div className="ClarifyAI-text">
                  <p className="text-lg leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Quisque faucibus ex sapien vitae pellentesque sem placerat. 
                    In id cursus mi pretium tellus duis convallis. 
                    Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </body>
    </html>
  );
}
