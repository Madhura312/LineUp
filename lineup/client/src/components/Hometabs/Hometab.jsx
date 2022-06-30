import React from 'react';
import Tab from '../Tab/Tab';

const tabContent = [
    {
        title : "Qr Page",
        content : "QR here",
    },
    {
        title : "Status Page",
        content : "Status Here",
    },
];
const Hometab = () => {
  
  return (
    <>
        <Tab active={1}>
            {tabContent.map((tab, idx)=>(
                <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>{tab.content}</Tab.TabPane>
            ))}
        </Tab>
    </>
  )
}

export default Hometab