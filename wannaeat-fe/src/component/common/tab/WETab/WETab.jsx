import React, { useRef, useState, useEffect } from 'react';
import { TabContainer, Tab, TabUnderline } from './WETab.js';

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

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      const tabRect = activeTabElement.getBoundingClientRect();
      const containerRect =
        activeTabElement.parentElement.getBoundingClientRect();

      const scrollLeft = tabContainerRef.current.scrollLeft;

      setUnderlineProps({
        width: tabRect.width,
        offset: activeTabElement.offsetLeft - containerRect.left + scrollLeft,
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
      <TabContainer ref={tabContainerRef} onWheel={handleWheelAxis}>
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

        <TabUnderline
          width={underlineProps.width}
          offset={underlineProps.offset}
        />
      </TabContainer>
    </div>
  );
};

export default WETab;
