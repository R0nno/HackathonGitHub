'use client';

import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [billSummary, setBillSummary] = useState('Select a bill to view summary.');
  const tabsRef = useRef(null);
  const senatorsRef = useRef(null);
  const upArrowRef = useRef(null);
  const downArrowRef = useRef(null);
  
  
  const bills = [
    { id: "1003.SL", title: "1003.SL" },
    { id: "1006.PL", title: "1006.PL" },
    { id: "1006.SL", title: "1006.SL" },
    { id: "1007.SL", title: "1007.SL" },
    { id: "1012.PL", title: "1012.PL" },
    { id: "1013.PL", title: "1013.PL" },
    { id: "1014.E", title: "1014.E" },
    { id: "1014.PL", title: "1014.PL"},
    { id: "1018.PL", title: "1018.PL"},
    { id: "1023-S.PL", title: "1023-S.PL"},
    { id: "1024-S2.PL", title: "1024-S2.PL"},
    { id: "1024-S2.SL", title: "1024-S2.SL"},
    { id: "1028.PL", title: "1028.PL"},
    { id: "1039.PL", title: "1039.PL"},
    // etc.
  ];
  
  const handleBillClick = async (billCode) => {
    setSelectedBillId(billCode);
    try {
      const response = await fetch('/api/getBill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: billCode }),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      setBillSummary(data.bill_summary);
    } catch (error) {
      console.error('Failed to fetch bill:', error.message);
      setBillSummary('Error loading bill summary.');
    }
  };
  
  
  const senators = [
    { name: "Senator John Doe", email: "jdoe@gmail.com", phone: "425-846-9847" },
    { name: "Senator Mark Chuck", email: "mchuck@gmail.com", phone: "425-463-9374" },
    { name: "Senator Rachel Bates", email: "rbates@gmail.com", phone: "425-873-2594" },
    { name: "Senator Mark Chuck", email: "mchuck@gmail.com", phone: "425-463-9374" },    
    { name: "Senator Rachel Bates", email: "rbates@gmail.com", phone: "425-873-2594" }
  ];
  


  const scroll = (ref, amount) => {
    if (ref.current) {
      ref.current.scrollBy({ top: amount, behavior: 'smooth' });
    }
  };
  console.log('Current billSummary:', billSummary);

  return (
    <>
      {/* Main Page Content */}
      <div className="extended-wrapper">
        <ul className="legislation-containers">
          <div className="container">

            {/* Left Column - Bill Selection */}

        <div className="selection-box p-4 flex flex-col gap-2 relative" style={{ height: '700px' }}>
            <ul ref={tabsRef} className="tabs flex flex-col gap-2 overflow-y-auto">
            {bills.map((bill, index) => (
                <li
                key={bill.id}
                onClick={() => handleBillClick(bill.id)}
                className={`tab rounded-xl text-center p-3 cursor-pointer ${selectedBillId === bill.id ? 'active-glow' : ''}`}
                >
                {bill.title}
                </li>
            ))}
            </ul>
        </div>


            {/* Right Column - Simplified Text and Senators */}
            <div className="right-box flex flex-col gap-4 ">

{/* Simplified Bill Box */}
<div className="simplified-text text-white bg-[#1d4b45] p-6 px-8 rounded-lg w-full min-h-[300px] max-h-[500px] overflow-y-auto">
  {/* Simplified bill content */}
  <div className="bill-summary">
  <p>{billSummary || 'Select a bill to view the summary.'}</p>
  </div>


    
              </div>

              {/* Senator Box */}
              {/* the double scrollbar*/}
                          <div className="senators-box flex-2 " ref={senatorsRef} >
              {senators.map((senator, index) => (
                <div key={index} className="senator-pill">
                  <strong>{senator.name}</strong>
                  <span>{senator.email}</span>
                  <span>{senator.phone}</span>
                </div>
              ))}
            </div>

            </div>

          </div>
        </ul>
      </div>

      
    </>
  );
}
