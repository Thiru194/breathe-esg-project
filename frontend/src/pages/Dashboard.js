import React, { useEffect, useState } from 'react';

import axios from 'axios';

function Dashboard() {

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    useEffect(() => {

        fetchRecords();

    }, []);

    // FETCH RECORDS

    const fetchRecords = async () => {

        try {

            const res = await axios.get(
                'https://breathe-esg-project-i6wa.onrender.com/api/records/'
            );

            setRecords(res.data);

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);
        }
    };

    // APPROVE RECORD

    const handleApprove = async (id) => {

        try {

            await axios.patch(
                `https://breathe-esg-project-i6wa.onrender.com/api/approve/${id}/`
            );

            fetchRecords();

        } catch (error) {

            console.log(error);
        }
    };

    // REJECT RECORD

    const handleReject = async (id) => {

        try {

            await axios.patch(
                `https://breathe-esg-project-i6wa.onrender.com/api/reject/${id}/`
            );

            fetchRecords();

        } catch (error) {

            console.log(error);
        }
    };

    // LOCK RECORD

    const handleLock = async (id) => {

        try {

            await axios.patch(
                `https://breathe-esg-project-i6wa.onrender.com/api/lock/${id}/`
            );

            fetchRecords();

        } catch (error) {

            console.log(error);
        }
    };

    // FILTER SEARCH

    const filteredRecords = records.filter((item) =>

        item.company_name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // SUMMARY COUNTS

    const totalRecords = records.length;

    const suspiciousCount = records.filter(
        (item) => item.suspicious
    ).length;

    const approvedCount = records.filter(
        (item) => item.status === 'APPROVED'
    ).length;

    const lockedCount = records.filter(
        (item) => item.locked
    ).length;

    return (

        <div
            className="container-fluid py-5"
            style={{
                backgroundColor: '#f4f6f9',
                minHeight: '100vh'
            }}
        >

            <div className="container">

                <div className="text-center mb-5">

                    <h1 className="fw-bold">
                        Breathe ESG Dashboard
                    </h1>

                    <p className="text-muted">
                        ESG Analyst Review Portal
                    </p>

                </div>

                {/* SUMMARY CARDS */}

                <div className="row mb-4">

                    <div className="col-md-3 mb-3">

                        <div className="card shadow border-0 p-4">

                            <h6>Total Records</h6>

                            <h2 className="fw-bold">
                                {totalRecords}
                            </h2>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card shadow border-0 p-4">

                            <h6>Suspicious</h6>

                            <h2 className="fw-bold text-danger">
                                {suspiciousCount}
                            </h2>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card shadow border-0 p-4">

                            <h6>Approved</h6>

                            <h2 className="fw-bold text-success">
                                {approvedCount}
                            </h2>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card shadow border-0 p-4">

                            <h6>Locked</h6>

                            <h2 className="fw-bold text-dark">
                                {lockedCount}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* SEARCH */}

                <div className="card shadow border-0 mb-4 p-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Company Name..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                {/* TABLE */}

                <div className="card shadow border-0">

                    <div className="card-body">

                        {loading ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-dark"
                                    role="status"
                                />

                                <p className="mt-3">
                                    Loading ESG Records...
                                </p>

                            </div>

                        ) : filteredRecords.length === 0 ? (

                            <div className="text-center py-5">

                                <h5>No Records Found</h5>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table align-middle table-hover">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>Company</th>

                                            <th>Source</th>

                                            <th>Category</th>

                                            <th>Status</th>

                                            <th>Suspicious</th>

                                            <th>Locked</th>

                                            <th>Actions</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredRecords.map((item) => (

                                            <tr
                                                key={item.id}
                                                style={{
                                                    backgroundColor:
                                                        item.suspicious
                                                            ? '#fff3f3'
                                                            : 'white'
                                                }}
                                            >

                                                <td className="fw-semibold">
                                                    {item.company_name}
                                                </td>

                                                <td>
                                                    {item.source_type}
                                                </td>

                                                <td>
                                                    {item.category}
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            item.status === 'APPROVED'
                                                                ? 'badge bg-success'
                                                                : item.status === 'REJECTED'
                                                                ? 'badge bg-danger'
                                                                : 'badge bg-warning text-dark'
                                                        }
                                                    >
                                                        {item.status}
                                                    </span>

                                                </td>

                                                <td>

                                                    {item.suspicious ? (

                                                        <span className="badge bg-danger">
                                                            Suspicious
                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-success">
                                                            Clean
                                                        </span>

                                                    )}

                                                </td>

                                                <td>

                                                    {item.locked ? (

                                                        <span className="badge bg-dark">
                                                            Locked
                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-secondary">
                                                            Open
                                                        </span>

                                                    )}

                                                </td>

                                                <td>

                                                    {item.locked ? (

                                                        <span className="text-muted">
                                                            Audit Locked
                                                        </span>

                                                    ) : (

                                                        <>

                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() =>
                                                                    handleApprove(item.id)
                                                                }
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                className="btn btn-danger btn-sm ms-2"
                                                                onClick={() =>
                                                                    handleReject(item.id)
                                                                }
                                                            >
                                                                Reject
                                                            </button>

                                                            <button
                                                                className="btn btn-dark btn-sm ms-2"
                                                                onClick={() =>
                                                                    handleLock(item.id)
                                                                }
                                                            >
                                                                Lock
                                                            </button>

                                                        </>

                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;