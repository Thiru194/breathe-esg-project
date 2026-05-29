import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {

    const [sapFile, setSapFile] = useState(null);

    const [utilityFile, setUtilityFile] = useState(null);

    const [travelFile, setTravelFile] = useState(null);

    const uploadAllFiles = async () => {

        try {

            // SAP Upload
            if (sapFile) {

                const sapFormData = new FormData();

                sapFormData.append('file', sapFile);

                await axios.post(
                    'http://127.0.0.1:8000/api/upload-sap/',
                    sapFormData
                );
            }

            // Utility Upload
            if (utilityFile) {

                const utilityFormData = new FormData();

                utilityFormData.append('file', utilityFile);

                await axios.post(
                    'http://127.0.0.1:8000/api/upload-utility/',
                    utilityFormData
                );
            }

            // Travel Upload
            if (travelFile) {

                const travelFormData = new FormData();

                travelFormData.append('file', travelFile);

                await axios.post(
                    'http://127.0.0.1:8000/api/upload-travel/',
                    travelFormData
                );
            }

            alert("All Files Uploaded Successfully");

        } catch (error) {

            console.log(error);

            alert("Upload Failed");
        }
    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4 text-center fw-bold">
                Upload ESG Data
            </h2>

            {/* SAP */}

            <div className="card p-4 mb-4 shadow">

                <h4 className="mb-3">
                    SAP Fuel Data
                </h4>

                <input
                    type="file"
                    className="form-control"

                    onChange={(e) =>
                        setSapFile(e.target.files[0])
                    }
                />

            </div>

            {/* Utility */}

            <div className="card p-4 mb-4 shadow">

                <h4 className="mb-3">
                    Utility Electricity Data
                </h4>

                <input
                    type="file"
                    className="form-control"

                    onChange={(e) =>
                        setUtilityFile(e.target.files[0])
                    }
                />

            </div>

            {/* Travel */}

            <div className="card p-4 mb-4 shadow">

                <h4 className="mb-3">
                    Travel Data
                </h4>

                <input
                    type="file"
                    className="form-control"

                    onChange={(e) =>
                        setTravelFile(e.target.files[0])
                    }
                />

            </div>

            {/* Single Upload Button */}

            <div className="text-center">

                <button
                    className="btn btn-dark btn-lg px-5"
                    onClick={uploadAllFiles}
                >
                    Upload All Data
                </button>

            </div>

        </div>
    );
}

export default UploadPage;