import React from "react";

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const parser = new DOMParser();
        const kml = parser.parseFromString(text, "application/xml");
        const kmlData = parseKml(kml);
        onFileUpload(kmlData);
      };
      reader.readAsText(file);
    }
  };

  const parseKml = (kml) => {
    // Logic to parse KML and convert to a suitable format
    // Return parsed KML data
    const placemarks = kml.getElementsByTagName("Placemark");
    const parsedData = [];
    for (let i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const name = placemark.getElementsByTagName("name")[0].textContent;
      const lineString = placemark.getElementsByTagName("LineString")[0];
      const coordinates = lineString
        ? lineString
            .getElementsByTagName("coordinates")[0]
            .textContent.trim()
            .split(/\s+/)
            .map((coord) => {
              const [lng, lat] = coord.split(",");
              return [parseFloat(lat), parseFloat(lng)];
            })
        : [];
      parsedData.push({ name, type: "LineString", coordinates });
    }
    return parsedData;
  };

  return (
    <div>
      <input type="file" accept=".kml" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
