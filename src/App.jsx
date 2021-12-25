import { useState, useEffect, useRef} from 'react'
import './App.css'
import axios from 'axios'
import React, {Component} from "react"
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from "recharts"

const App = () => {
      const [state,setState] = useState({
          loading:false,
          data: {},
        })
      const [d,setD] = useState([])
        // const [time, setTime] = useState([]);
        // const [temp, setTemp] = useState([]);
        // const [co2, setCo2] = useState([]);
  useEffect(() => { 

    setState({
            loading: true
        })
    setInterval(() =>  
      fetch("http://192.168.10.11:8888")
      .then(response => response.json())
      .then(data => {
          setState({
              data: data,
              loading: false
          })
          // setTime( ...time, Date().toLocaleString())
          // setTemp( ...temp, data.temp)
          // setCo2( ...co2, data.co2)
      })
      ,
      1000
    )
  }, [])
  useEffect(() => {
    console.log(state.data)
    if (state.loading === false &&  state.data.temp !== undefined) {
      const now_date = {
        time: Date().toLocaleString(),
        temp: state.data.temp,
        hum: state.data.hum,
        co2: state.data.co2,
        pressure: state.data.pressure,
      }
      setD(d => [...d, now_date])
      console.log(d)
    }
  }, [state])

  const displayText = state.loading ? "now loading...." : "got data!!"
  if (state.loading) {
    return <div>{displayText}</div>
  } else {
    let _d = []
    if ( d.length > 6000 ){
      _d = d.slice(-6001,-1)
    } else {
      _d = d
    }
    return (
        <div>
            <h1>temp: {state.data.temp}</h1>
            <h1>hum: {state.data.hum}</h1>
            <h1>co2: {state.data.co2}</h1>
            <h1>pressure: {state.data.pressure}</h1>
            <LineChart
        width={730}
        height={250}
        data={_d}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
      </LineChart>
      <LineChart
        width={730}
        height={250}
        data={_d}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="hum" stroke="#8800d8" />
      </LineChart>
      <LineChart
        width={730}
        height={250}
        data={_d}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="co2" stroke="#8800d8" />
      </LineChart>
      <LineChart
        width={730}
        height={250}
        data={d}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pressure" stroke="#00ca9d" />
      </LineChart>
        </div>

    )
  }
}
export default App
// function App() {
//   const [context,setContext] = useState(null)
//   let pre_context = null
//   const [canvas,setCanvas] = useState(null)
//   const [strokeHistory,setStrokeHistory] = useState([])
//   let pre_strokeHistory = []
//   const [isMousedown,setIsMousedown] = useState(false)
//   let pre_isMousedown = false
//   const [points,setPoints] = useState([])
//   let pre_points = []
//   const [lineWidth,setLineWidth] = useState(0.5)
//   const requestIdleCallback = window.requestIdleCallback || function (fn) { setTimeout(fn, 1) };

//   useEffect(()=>{
//     if(context==null && canvas==null){
//     // キャンバスを取得
//       const tmp = document.getElementById("canvas")
//       const canvasContext = tmp.getContext("2d")
//       setContext(context=>canvasContext)
//       tmp.width = window.innerWidth
//       tmp.height = window.innerHeight
//       setCanvas(canvas=>tmp)
//     }
//   })
//   const drawOnCanvas = (stroke) => {
//     pre_context = context
//     pre_context.strokeStyle = 'black'
//     pre_context.lineCap = 'round'
//     pre_context.lineJoin = 'round'
//     const l = stroke.length - 1
//     if (stroke.length >= 3) {
//       const xc = (stroke[l].x + stroke[l - 1].x) / 2
//       const yc = (stroke[l].y + stroke[l - 1].y) / 2
//       pre_context.quadraticCurveTo(stroke[l - 1].x, stroke[l - 1].y, xc, yc)
//       pre_context.stroke()
//       pre_context.beginPath()
//       pre_context.moveTo(xc, yc)
//     } else {
//       const point = stroke[l];
//       pre_context.strokeStyle = 'black'
//       pre_context.beginPath()
//       pre_context.moveTo(point.x, point.y)
//       pre_context.stroke()
//     }
//     setContext(context=>pre_context)
//   }
  
//   /**
//    * Remove the previous stroke from history and repaint the entire canvas based on history
//    * @return {void}
//    */
//   function undoDraw () {
//     pre_strokeHistory = strokeHistory.slice(0, strokeHistory.length - 2)
//     setStrokeHistory( pre_strokeHistory )
//     context.clearRect(0, 0, canvas.width, canvas.height)
  
//     pre_strokeHistory.map(function (stroke) {
//       if (pre_strokeHistory.length === 0) return
  
//       context.beginPath()
  
//       let strokePath = [];
//       stroke.map(function (point) {
//         strokePath.push(point)
//         drawOnCanvas(strokePath)
//       })
//     })
//   }
//   useEffect(()=>{
//     if(context!==null && canvas!==null){
//       for (const ev of ["touchstart", "mousedown"]) {
//         canvas.addEventListener(ev, (e) =>{
//           let pressure = 0.1;
//           let x, y;
//           if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
//             pressure = 0.5
//             x = e.touches[0].pageX
//             y = e.touches[0].pageY
//           } else {
//             pressure = 0.5
//             x = e.pageX
//             y = e.pageY
//           }
//           pre_points.push({x, y, lineWidth})
//           pre_isMousedown = true
//           drawOnCanvas(pre_points)
//           setIsMousedown(pre_isMousedown)
//           setPoints(pre_points)
//         })
//       }
      
//       for (const ev of ['touchmove', 'mousemove']) {
//         canvas.addEventListener(ev, function (e) {
//           if (!pre_isMousedown) return
//           e.preventDefault()

//           let pressure = 0.1
//           let x, y
//           if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
//             if (e.touches[0]["force"] > 0) {
//               pressure = e.touches[0]["force"]
//             }
//             x = e.touches[0].pageX
//             y = e.touches[0].pageY
//           } else {
//             pressure = 1.0
//             x = e.pageX
//             y = e.pageY
//           }
      
//           // smoothen line width
//           pre_points.push({x, y, lineWidth})
//           setPoints(pre_points)
      
//           drawOnCanvas(pre_points);
      
//           requestIdleCallback(() => {
//             const touch = e.touches ? e.touches[0] : null
//           })
//         })
//       }
      
//       for (const ev of ['touchend', 'touchleave', 'mouseup']) {
//         canvas.addEventListener(ev, function (e) {
//           let pressure = 0.1;
//           let x, y;
      
//           if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
//             pressure = 0.5
//             x = e.touches[0].pageX
//             y = e.touches[0].pageY
//           } else {
//             pressure = 0.5
//             x = e.pageX 
//             y = e.pageY
//           }

//           pre_isMousedown=false
//           setIsMousedown(pre_isMousedown)
      
//           requestIdleCallback(()=>{setStrokeHistory(...strokeHistory, [...pre_points]); pre_points=[];setPoints(poinst=>[])})
        
//           })
//         };
//       }
//   },[context])
//   console.log(strokeHistory)
//   console.log(pre_points,points)
//   return (
//     <div className="App">
//     <h1>Demo of Apple Pencil / 3D touch API</h1>
//     <canvas id="canvas">Sorry, your browser is too old for this demo.</canvas>
//     <div id="info">
//       <a href="https://github.com/quietshu/apple-pencil-safari-api-test" target="_blank">GitHub</a>
//       <button onClick={undoDraw}>Undo</button>
//     </div>
//     </div>
//   )
// }

// export default App
