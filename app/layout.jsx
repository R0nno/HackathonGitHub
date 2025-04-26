import './background.css'

export const metadata = {
    title: 'ClarifyAI',
    description: 'Simplifying legislation for everyone',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }
  