import { useState } from 'react';
import axios from 'axios';

const useUpload = () => {
    const uploadFile = async (uuid: string, files: File | File[]) => {
        try {
            const user = "blob";
            const formData = new FormData();

            // If files is an array, take the first file only
            const fileToUpload = Array.isArray(files) ? files[0] : files;

            formData.append('file', fileToUpload);
            formData.append('uuid', uuid);
            formData.append('user', user);

            const response = await axios.post(`http://localhost:3000/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });

            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href = url;

            // // Extract filename from Content-Disposition header
            // const contentDisposition = response.headers['content-disposition'];
            // if (contentDisposition) {
            //     const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            //     let matches = filenameRegex.exec(contentDisposition);
            //     if (matches != null && matches[1]) {
            //         let filename = matches[1].replace(/['"]/g, '');
            //         link.setAttribute('download', filename);
            //     }
            // }

            // document.body.appendChild(link);
            // link.click();
        } catch (error) {
            console.error(error);
        }
    }

    return { uploadFile };
}

export default useUpload;