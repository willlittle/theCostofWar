import React from 'react';
import Plot from 'react-plotly.js';
import './App.css'
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import StopIcon from '@material-ui/icons/Stop';
import RemoveIcon from '@material-ui/icons/Remove';
import Modal from './Modal'

const Chart = ({plotData}) => {
function contentSwitch() {
   if(plotData.yearsAdded != 'false'){
     return false
} else{
    return true
}}
function getPlotHeight() {
    if(plotData.yearsAdded != 'false'){
      return 450
 } else{
     return 400
 }}
 const plotHeight = getPlotHeight()
const home = contentSwitch()
console.log(home)
const trace1 = {
    x: plotData.year,
    y: plotData.mortality,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'linear',
    line: {shape: 'spline'},
    type: 'scatter'
}
const trace2 = {
    x: plotData.year,
    y: plotData.projectedWithoutWar,
    mode: 'lines+markers',
}
const trace3 = {
    x: plotData.year,
    y: plotData.projectedFromRecord,
    mode: 'lines+markers',
    line:{color:"#0000ff"}
}
const data = [trace1, trace2, trace3]

function renderContent(){
    if (!home){
        return (
        <div className='content'>
            <div className='heading'>
                <h1>{plotData.country}:</h1>
            </div>
            <div className='stats' >
                <h2 style={{fontWeight:'normal'}}>Began:   </h2>
                <h2>{plotData.start}</h2>
                <h2 style={{fontWeight:"normal"}}> Ended:   </h2>
                <h2>{plotData.end}</h2> 
                <h2 style={{fontWeight:"normal"}}> Years Added:</h2>
                <h2>{plotData.yearsAdded}</h2>
                <h2/><h2/><h2/>
                <Modal bio={plotData.bio} title={plotData.conflictName} style={{marginRight:5}}/>
            </div>
            </div> 
            )
        } else {
            return <div className='introText' ><p>{plotData.bio}</p><p>{plotData.bio2}</p><p>{plotData.bio3}</p></div>
        }
    }

    return (
        <div>
            
            <div className='titleAndText'>
                    {renderContent()}
            </div>
            
            <div className='plot'>
                <Plot 
                    data={data}
                    layout={{
                        shapes: [
                            {
                                type: 'rect',
                                x0: plotData.start,
                                y0: 0,
                                x1: plotData.end,
                                y1: plotData.height-5,
                                fillcolor: 'FF0000',
                                opacity: 0.2,
                                line: 0,
                                line:{
                                    width:0
                                }
                            },{
                                type: 'rect',
                                x0: 1945,
                                y0: 19,
                                x1: 2029,
                                y1: 20,
                                fillcolor: '009900',
                                opacity: 0.7,
                                line:{
                                    width:0
                                }
                            }
                        ],
                    height:plotHeight,
                    width:'auto',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',  
                    yaxis: {showgrid: false, 
                    range: [-10, Number(plotData.height)+10]}, 
                    xaxis: {showgrid: false}, 
                    title: false,
                    "showlegend": false,
                    margin: {
                        l: 20,
                        r: 20,
                        b: 40,
                        t: 1,
                        pad: 5
                      }
                    }}
                /> 
            </div>

                    <div className='legendContainer'>
                        <div className='legend'>
                            <LinearScaleIcon fontSize="large" style={{ color: 'rgb(30,80,255)' }}/>
                            <h4>Recorded {home ? 'mortality':''}</h4>
                        </div>
                        <div className='legend'>
                            <LinearScaleIcon fontSize="large" style={{ color: 'rgb(255,200,0)' }}/>
                            <h4>Projected {home ? 'mortality without war':''}</h4>
                        </div>
                        <div className='legend'>
                            <StopIcon fontSize="large" style={{ color: 'rgb(255,200,200)' }}/>
                            <h4>{home ? 'time of ':''}Conflict</h4>
                        </div>
                        <div className='legend'>
                            <RemoveIcon fontSize="large" style={{ color: 'rgb(0,200,0)' }}/>
                            <h4>Target:<br/>{home ? '20 Deaths/ 1000 Births':''}</h4>
                        </div>
                      
                    </div>

        </div>
    )
}

export default Chart



