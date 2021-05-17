import './App.css';
import {useState, useEffect} from 'react';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import * as d3 from 'd3'
import Chart from './Chart'




function App() {

  const[currentData, setCurrentData] = useState(false);
  const[tabValue, setTabValue]= useState(0)
  const handleTabs=(e, val) => {setTabValue(val);createPlotData(val);}

  useEffect(() => {
    createPlotData(0)
  }, []);

  async function createPlotData (tabIndex){
    let year = []
    let country = []
    let mortality = []
    let projectedWithoutWar = []
    let projectedFromRecord = []
    let miscData = []
    
      await d3.csv('/mortality4.csv', (d)=> {
        if(d.index == tabIndex){
          year.push(d.year)
          country.push(d.country)
          mortality.push(d.recordedRate) 
          projectedWithoutWar.push(d.projectedWithoutWar)
          projectedFromRecord.push(d.projectedFromRecord)
          
          miscData.push(d.misc)
        }})

    setCurrentData({
      year: year,
      country:country[0],
      mortality:mortality,
      projectedWithoutWar:projectedWithoutWar,
      projectedFromRecord:projectedFromRecord,
      height:mortality[0],
      yearsAdded:miscData[0],
      start:miscData[1],
      end:miscData[2],
      bio:miscData[3],
      bio2:miscData[4],
      bio3:miscData[5],
      conflictName:miscData[6]

    })


  }  

    return (
    <div className='container'>
        <div>
            <Tabs variant='scrollable'  centered align={'center'} value={tabValue} onChange={handleTabs}>
              <Tab style={{maxWidth:10, color:'rgb(250,0,0)'}}label='The Idea'/>
              <Tab label='Rwanda' />
              <Tab label='Syria'/>
              <Tab label='Afghanistan'/>
              <Tab label='Bosnia and Herzegovina'/>
              <Tab label='Iraq'/>
            </Tabs>
        </div>
        <div >
            <Chart plotData={currentData}/>
        </div>
    </div>
  )
}

export default App;
