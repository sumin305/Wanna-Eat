import React, { useRef, useState, useEffect } from 'react';
import { TabContainer, Tab, TabUnderline } from './WETab.js';

const WETab = ({ tabs, activeTab, setActiveTab }) => {
  const [underlineProps, setUnderlineProps] = useState({ width: 0, offset: 0 });
  const tabRefs = useRef([]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      const tabRect = activeTabElement.getBoundingClientRect();
      const containerRect = activeTabElement.parentElement.getBoundingClientRect();

      setUnderlineProps({
        width: tabRect.width,
        offset: activeTabElement.offsetLeft - containerRect.left,
      });

      activeTabElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab, tabs]);

  return (
    <div style={{ position: 'relative' }}>
      <TabContainer>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            active={activeTab === index}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </Tab>
        ))}

        <TabUnderline width={underlineProps.width} offset={underlineProps.offset} />
      </TabContainer>

      
    </div>
  );
};

export default WETab;
