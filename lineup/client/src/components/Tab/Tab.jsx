import React,{useState,useEffect} from 'react'
import './Tab.scss';
const Tab = ({children, active = 0}) => {
  const [activeTab,setActiveTab] = useState(active);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    let data = [];

    React.Children.forEach(children,element => {
        if(!React.isValidElement(element)) return;

        const {props:{tab, children}} = element;
        data.push({tab,children});
    })

    setTabsData(data);

  },[children])
  return (
    <div className='navbar'>
        <ul className='nav nav-tabs'>
            {
                tabsData.map(({tab},idx)=>{
                    <li className="nav-item">
                        <a  href='#' 
                        className={`nav-link ${idx === activeTab ? "active" : ""}`}
                        onClick={()=>setActiveTab(idx)}>
                            {tab}
                        </a>
                    </li>
                })
            }
        </ul>
    </div>
  )
}
const TabPane = ({children}) => {
    return children;
}
Tab.TabPane = TabPane;
export default Tab