// import React, { useState } from "react";
// import FileUpload from "./components/FileUpload";
// import SummaryTable from "./components/SummaryTable";
// import DetailedTable from "./components/DetailedTable";
// import MapDisplay from "./components/MapDisplay";
// import "./App.css";

// function App() {
//   const [kmlData, setKmlData] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const [detailedData, setDetailedData] = useState(null);

//   const handleFileUpload = (data) => {
//     setKmlData(data);
//     // Process the KML data to generate summary and detailed data
//     const summaryData = generateSummary(data);
//     const detailedData = generateDetailedData(data);
//     setSummary(summaryData);
//     setDetailedData(detailedData);
//   };

//   const generateSummary = (data) => {
//     // Logic to count different element types in the KML data
//     // Return summary object
//   };

//   const generateDetailedData = (data) => {
//     // Logic to calculate total lengths for lines, LineStrings, and MultiLineStrings
//     // Return detailed data object
//   };

//   return (
//     <div className="App">
//       <h1>KML Viewer</h1>
//       <FileUpload onFileUpload={handleFileUpload} />
//       {summary && <SummaryTable summary={summary} />}
//       {detailedData && <DetailedTable detailedData={detailedData} />}
//       {kmlData && <MapDisplay kmlData={kmlData} />}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SummaryTable from "./components/SummaryTable";
import DetailedTable from "./components/DetailedTable";
import MapDisplay from "./components/MapDisplay";
import "./App.css";

function App() {
  const [kmlData, setKmlData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [detailedData, setDetailedData] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  const handleFileUpload = (data) => {
    setKmlData(data);
    // Process the KML data to generate summary and detailed data
    const summaryData = generateSummary(data);
    const detailedData = generateDetailedData(data);
    setSummary(summaryData);
    setDetailedData(detailedData);
  };

  const generateSummary = (data) => {
    // Logic to count different element types in the KML data
    // Return summary object
    const summary = {};
    data.forEach((feature) => {
      if (summary[feature.type]) {
        summary[feature.type]++;
      } else {
        summary[feature.type] = 1;
      }
    });
    return summary;
  };

  const generateDetailedData = (data) => {
    // Logic to calculate total lengths for lines, LineStrings, and MultiLineStrings
    // Return detailed data object
    const detailed = data
      .filter(
        (feature) =>
          feature.type === "LineString" || feature.type === "MultiLineString"
      )
      .map((feature) => {
        const length = feature.coordinates.reduce((acc, coord, index, arr) => {
          if (index === 0) return acc;
          const [lat1, lng1] = arr[index - 1];
          const [lat2, lng2] = coord;
          const distance = Math.sqrt(
            Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2)
          );
          return acc + distance;
        }, 0);
        return { type: feature.type, length };
      });
    return detailed;
  };

  return (
    <div className="App">
      <h1>KML Viewer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <div>
        <button onClick={() => setShowSummary(!showSummary)}>Summary</button>
        <button onClick={() => setShowDetailed(!showDetailed)}>Detailed</button>
      </div>
      {showSummary && summary && <SummaryTable summary={summary} />}
      {showDetailed && detailedData && (
        <DetailedTable detailedData={detailedData} />
      )}
      {kmlData && <MapDisplay kmlData={kmlData} />}
    </div>
  );
}

export default App;
