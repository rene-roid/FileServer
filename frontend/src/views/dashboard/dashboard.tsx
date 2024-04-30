import React, { useEffect, useRef } from "react";
import './dashboard.css';

const Dashboard: React.FC = () => {

    return (
        <div className="dashboard">
            <div className="sidebar background-dark">

            </div>
            <div className="main background-dark">
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard</p>
            </div>

            <div className="body outline-dark">
                
            </div>
        </div>
    );
}

export default Dashboard;