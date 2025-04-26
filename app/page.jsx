'use client';

import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [selectedBill, setSelectedBill] = useState(0);
  const tabsRef = useRef(null);
  const senatorsRef = useRef(null);
  const upArrowRef = useRef(null);
  const downArrowRef = useRef(null);
  const senatorUpArrowRef = useRef(null);
  const senatorDownArrowRef = useRef(null);

  const bills = [
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
  ];

  const senators = [
    { name: "Senator John Doe", email: "jdoe@gmail.com", phone: "425-846-9847" },
    { name: "Senator Mark Chuck", email: "mchuck@gmail.com", phone: "425-463-9374" },
    { name: "Senator Rachel Bates", email: "rbates@gmail.com", phone: "425-873-2594" },
    { name: "Senator Mark Chuck", email: "mchuck@gmail.com", phone: "425-463-9374" },    
    { name: "Senator Rachel Bates", email: "rbates@gmail.com", phone: "425-873-2594" }
  ];
  

  useEffect(() => {
    const updateArrows = (container, upArrow, downArrow) => {
      if (!container) return;
      upArrow.style.display = container.scrollTop > 0 ? 'block' : 'none';
      downArrow.style.display = container.scrollTop + container.clientHeight < container.scrollHeight ? 'block' : 'none';
    };

    const tabs = tabsRef.current;
    const senatorsList = senatorsRef.current;

    if (tabs) {
      tabs.addEventListener('scroll', () => updateArrows(tabs, upArrowRef.current, downArrowRef.current));
      updateArrows(tabs, upArrowRef.current, downArrowRef.current);
    }
    if (senatorsList) {
      senatorsList.addEventListener('scroll', () => updateArrows(senatorsList, senatorUpArrowRef.current, senatorDownArrowRef.current));
      updateArrows(senatorsList, senatorUpArrowRef.current, senatorDownArrowRef.current);
    }

    return () => {
      if (tabs) tabs.removeEventListener('scroll', () => {});
      if (senatorsList) senatorsList.removeEventListener('scroll', () => {});
    };
  }, []);

  const scroll = (ref, amount) => {
    if (ref.current) {
      ref.current.scrollBy({ top: amount, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Page Content */}
      <div className="extended-wrapper">
        <ul className="legislation-containers">
          <div className="container">

            {/* Left Column - Bill Selection */}
            <div className="selection-box p-4 flex flex-col gap-2 relative">
              <div className="slider relative">

                {/* Up Arrow */}
                <div ref={upArrowRef} className="arrow-button" style={{ top: '10px' }} onClick={() => scroll(tabsRef, -150)}>
                  ↑
                </div>

                {/* Bill List */}
                <div className="bill-list-container overflow-y-auto no-scrollbar mt-12 mb-12 w-full px-2" style={{ maxHeight: 'calc(100% - 100px)' }}>
                  <ul ref={tabsRef} className="tabs flex flex-col gap-2">
                    {bills.map((bill, index) => (
                      <li
                        key={index}
                        onClick={() => setSelectedBill(index)}
                        className={`tab rounded-xl text-center p-3 cursor-pointer ${selectedBill === index ? 'active-glow' : ''}`}
                      >
                        {bill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Down Arrow */}
                <div ref={downArrowRef} className="arrow-button" style={{ bottom: '10px' }} onClick={() => scroll(tabsRef, 150)}>
                  ↓
                </div>

              </div>
            </div>

            {/* Right Column - Simplified Text and Senators */}
            <div className="right-box flex flex-col gap-4">

              {/* Simplified Bill Box */}
              <div className="simplified-bill-box bg-[#1d4b45] p-6 rounded-lg">
                <div className="simplified-text text-white">
                  {/* Simplified bill content */}
                  <p>Summary of the bill will appear here after selection.</p>
                </div>
              </div>

              {/* Senator Box */}
              <div className="senator-box relative p-4 bg-[#1d4b45] rounded-lg flex-1 overflow-y-auto">

                {/* Up Arrow */}
                <div ref={senatorUpArrowRef} className="arrow-button" style={{ top: '10px' }} onClick={() => scroll(senatorsRef, -150)}>
                  ↑
                </div>

                {/* Senator List */}
                    <div className="senators-box" ref={senatorsRef}>
                        {senators.map((senator, index) => (
                        <div key={index} className="senator-pill">
                        <strong>{senator.name}</strong>
                        <span>{senator.email}</span>
                        <span>{senator.phone}</span>
                    </div>
                 ))}
                </div>



                {/* Down Arrow */}
                <div ref={senatorDownArrowRef} className="arrow-button" style={{ bottom: '10px' }} onClick={() => scroll(senatorsRef, 150)}>
                  ↓
                </div>

              </div>

            </div>

          </div>
        </ul>
      </div>

      
    </>
  );
}
