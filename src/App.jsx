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
  const fetchPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/record_predict", {
        method: "POST"
      });
      const data = await response.json();

      setLabels(data.labels);
      setStressScore(data.stress_score.toFixed(2));
      setImageUrl(data.image_url);
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
              <div className={`bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-40 w-64 ${micPressed ? 'bg-[url("https://example.com/your-image.jpg")] bg-cover bg-center' : ''}`}>
                
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-40 w-48">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-86.4-67.7 13.8 9.2c9.8 6.5 22.4 7.2 32.9 1.6s16.9-16.4 16.9-28.2l0-256c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.9 1.6l-96 64L448 174.9l0 17.1 0 128 0 5.8-32-25.1L416 128c0-35.3-28.7-64-64-64L113.9 64 38.8 5.1zM407 416.7L32.3 121.5c-.2 2.1-.3 4.3-.3 6.5l0 256c0 35.3 28.7 64 64 64l256 0c23.4 0 43.9-12.6 55-31.3z"/></svg>
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
            {/* Right content */}
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
