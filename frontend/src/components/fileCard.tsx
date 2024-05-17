import React, { useEffect, useState } from "react";
import { IFile } from "../types/file.type";
import useDelete from "../hooks/useDelete";
import './file.css';

import useDownload from "../hooks/useDownload";

interface IFileCard {
    file: IFile;
    edit: boolean;
}

const FileCard: React.FC<IFileCard> = (file) => {
    const { downloadFile } = useDownload();
    const { removeFile } = useDelete();
    const [uuuid, setUuid] = useState<string>('');

    useEffect(() => {
        let uuid = localStorage.getItem('uuid');

        if (uuid)
            setUuid(uuid);
    }, []);

    const showSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes === 0) return '0 Byte';

        const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));

        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    }

    const deleteFile = async (event: React.MouseEvent) => {
        event.stopPropagation();
        
        await removeFile(file.file.id, uuuid).then(() => {
            window.location.reload();
        }, (error) => {
            console.error(error);
        });
    }

    return (
        <>
            <div className="file">
                <div className="left">
                </div>
                <div className="middle">
                    <p title={file.file.data.name}>{file.file.data.name}</p>
                    <p>{showSize(file.file.data.size)}</p>
                </div>
                <div className="right">
                    <button onClick={() => downloadFile(file.file.id, uuuid, file.file.data.name)}>
                        Download
                    </button>
                </div>
                {file.edit && (
                    <div className="delete" onClick={deleteFile}>
                        <i className="fas fa-times">x</i>
                    </div>
                )}
            </div>

        </>
    )
}

export default FileCard;