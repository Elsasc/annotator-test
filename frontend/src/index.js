import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";

import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root
root.render(<App />); // Render your app using the root

// ReactDOM.render(<App />, document.getElementById("root"));
