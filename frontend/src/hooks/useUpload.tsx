import axios from 'axios';

const useUpload = () => {
    const uploadFile = async (uuid: string, files: File | File[]) => {
        try {
            const user = "blob";

            // If files is not an array, make it an array
            const filesToUpload = Array.isArray(files) ? files : [files];

            for (const file of filesToUpload) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('uuid', uuid);
                formData.append('user', user);

                const response = await axios.post(`http://localhost:3000/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    responseType: 'blob',
                });

                console.log(response);
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return { uploadFile };
}

export default useUpload;