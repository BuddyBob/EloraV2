import Header from "./components/Header";
import DonutChart from "./components/DonutChart";
import LineGraph from "./components/LineGraph";
import eeg_sensors from './assets/eeg_sensors.mp4'
import eeg_waves from './assets/eeg_waves.mp4'
import React, { useState } from "react";

function App() {
  const [micPressed, setMicPressed] = useState(false);
  const [stressScore, setStressScore] = useState(50);
  const [imageUrl, setImageUrl] = useState('');
  const [labels, setLabels] = useState('');
  const [report, setReport] = useState('No report found yet');
  const fetchPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/record_predict", {
        method: "POST"
      });
      const data = await response.json();

      setLabels(data.labels);
      setStressScore((data.stress_score * 100).toFixed(2));
      setImageUrl(data.image_url);
      setReport(data.report);
      console.log(data.labels);
      console.log(data.image_url);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Failed to fetch EEG prediction.");
    }
  };
  const handleMicPress = () => {
    setMicPressed(true);
    fetchPrediction();
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
      <Header onMicPress={() => setMicPressed(true)} />
      <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="container flex flex-row w-[100vw] space-x-6 ml-20">
          {/* Left side */}
          <div className="leftside flex flex-col space-y-6 w-3/4"> {/* Updated width to 3/4 */}
            <div className="row-1 flex space-x-3">
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-40 w-48">
                <DonutChart percentage={stressScore} />
              </div>
              <div 
                className={`bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-40 w-64`} 
                style={{
                  backgroundImage: micPressed ? `url(${imageUrl})` : 'none', 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center'
                }}
              >
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md flex-col items-center justify-center h-40 w-48">
                <h1 className="font-bold">Current Mood</h1>
                <h1>{labels}</h1>
              </div>
            </div>
            <div className="row-2 flex">
              <div className="bg-white p-6 rounded-xl shadow-md col-span-1 md:col-span-4 flex-col items-center justify-center w-full">
                  <h1 className="font-extrabold">Brainwaves</h1>
                  <video width="640" height="360" loop muted autoPlay preload="auto">
                    <source src={eeg_waves} type="video/mp4"/>
                  </video>
              </div>
            </div>
            <div className="row3 flex">
              <div className="bg-white p-6 rounded-xl shadow-md col-span-1 md:col-span-4 flex-col items-center justify-center w-full">
                <h1 className="font-extrabold">Neural Sensors</h1>
                <video width="640" height="360" loop muted autoPlay preload="auto">
                  <source src={eeg_sensors} type="video/mp4"/>
                </video>

              </div>
            </div>
            <div className="row4 flex">
              <div className="bg-white p-6 rounded-xl shadow-md col-span-1 md:col-span-4 flex-col items-center justify-center w-full">
                <h1 className="font-extrabold">History</h1>
                <LineGraph />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="rightside bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-full w-full">
            <p>{report}</p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
