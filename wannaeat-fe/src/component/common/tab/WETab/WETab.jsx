import React, { useRef, useState, useEffect } from 'react';
import { TabContainer, Tab, TabUnderline, TabHr, TabWrapper } from './WETab.js';

const WETab = ({ tabs, activeTab, setActiveTab }) => {
  const [underlineProps, setUnderlineProps] = useState({ width: 0, offset: 0 });
  const tabRefs = useRef([]);
  const tabContainerRef = useRef(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleWheelAxis = (event) => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <TabContainer ref={tabContainerRef} onWheel={handleWheelAxis}>
        {tabs.map((tab, index) => (
          <TabWrapper key={index}>
            <Tab
              active={activeTab === index}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </Tab>
            <TabHr active={activeTab === index} />
          </TabWrapper>
        ))}
      </TabContainer>
    </div>
  );
};

export default WETab;
