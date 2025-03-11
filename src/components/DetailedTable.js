import React from 'react';

const DetailedTable = ({ detailedData }) => {
    return (
        <div>
            <h2>Detailed Element Lengths</h2>
            <table>
                <thead>
                    <tr>
                        <th>Element Type</th>
                        <th>Total Length</th>
                    </tr>
                </thead>
                <tbody>
                    {detailedData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetailedTable;