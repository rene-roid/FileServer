import React, { useEffect, useState } from "react";
import { IFile } from "../types/file.type";
import './file.css';

import useDownload from "../hooks/useDownload";

const FileCard: React.FC<IFile> = (file) => {
    const { downloadFile } = useDownload();
    const [uuuid, setUuid] = useState<string>('');

    useEffect(() => {
        let uuid = localStorage.getItem('uuid');

        if (uuid)
            setUuid(uuid);
    }, []);

    return (
        <div className="file">
            <div className="left">
                <i className="fas fa-file"></i> {/* Replace with your icon */}
            </div>
            <div className="middle">
                <p>{file.data.name}</p>
                <p>{file.data.size} bytes</p>
            </div>
            <div className="right">
                <button onClick={() => downloadFile(file.id, uuuid, file.data.name)}>
                    Download
                </button>
            </div>
        </div>
    )
}

export default FileCard;