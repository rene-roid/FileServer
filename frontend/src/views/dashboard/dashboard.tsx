import React, { useEffect, useRef } from "react";
import './dashboard.css';

import useFiles from "../../hooks/useFiles";

const Dashboard: React.FC = () => {
    const { files, getFiles } = useFiles();

    useEffect(() => {
        let uuid = localStorage.getItem('uuid');

        if (uuid)
            getFiles(uuid);
    }, []);

    return (
        <div className="dashboard">
            <div className="sidebar background-dark">

            </div>
            <div className="main background-dark">
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard</p>
            </div>

            <div className="body outline-dark">
                {
                    files.map((file, index) => {
                        return (
                            <div key={index} className="file outline-dark">
                                <p>{file.data.name}</p>
                                <button >
                                    Download
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Dashboard;