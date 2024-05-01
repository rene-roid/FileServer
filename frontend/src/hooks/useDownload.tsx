import { useState } from 'react';
import axios from 'axios';

const useDownload = () => {
    const downloadFile = async (id: string, uuid: string, filename: string) => {
        try {
            const response = await axios.post(`http://localhost:3000/download/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                uuid: uuid
            }, {
                responseType: 'blob', // Set the responseType to 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Extract filename from Content-Disposition header
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                let matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error(error);
        }
    }

    return { downloadFile };
}

export default useDownload;