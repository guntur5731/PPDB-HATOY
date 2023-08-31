import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row, TabContent, TabPane } from 'reactstrap'
import DataDiri from "./dataDiri"
export default function detail() {
   // ** States
   const [activeTab, setActiveTab] = useState('1')
   const [data, setData] = useState(null)
 
   const toggleTab = tab => {
     setActiveTab(tab)
   }
 
   useEffect(() => {
     axios.get('/account-setting/data').then(response => setData(response.data))
   }, [])
 
   return (
     <Fragment>
       {data !== null ? (
         <Row>
           <Col xs={12}>
             <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
 
             <TabContent activeTab={activeTab}>
               <TabPane tabId='1'>
                 <DataDiri data={data.general} />
               </TabPane>
             </TabContent>
           </Col>
         </Row>
       ) : null}
     </Fragment>
   )
}
