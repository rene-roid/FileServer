import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';

import './dashboard.css';

import useFiles from "../../hooks/useFiles";
import FileCard from "../../components/fileCard";

import { IFile } from "../../types/file.type";

const Dashboard: React.FC = () => {
    const { files, getFiles } = useFiles();
    const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

    useEffect(() => {
        let uuid = localStorage.getItem('uuid');

        if (uuid)
            getFiles(uuid);
    }, []);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setDroppedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const removeFile = (event: React.MouseEvent, index: number) => {
        event.stopPropagation();
        setDroppedFiles(prevFiles => prevFiles.filter((_file, i) => i !== index));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="dashboard">
            <div className="sidebar background-dark" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
                {droppedFiles.map((file, index) => (
                    <div key={index}>
                        <span>{file.name}</span>
                        <button onClick={(event) => removeFile(event, index)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="main background-dark">
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard</p>
            </div>

            <div className="body outline-dark">
                {
                    files.map((file: IFile, index: number) => {
                        return (
                            <div key={index} className="file-item">
                                <FileCard {...file} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Dashboard;