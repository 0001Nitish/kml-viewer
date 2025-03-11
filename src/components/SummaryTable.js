import React from 'react';

const SummaryTable = ({ kmlData }) => {
    const elementCount = {};

    if (kmlData) {
        kmlData.forEach(element => {
            const type = element.type;
            elementCount[type] = (elementCount[type] || 0) + 1;
        });
    }

    return (
        <div>
            <h2>Summary of KML Elements</h2>
            <table>
                <thead>
                    <tr>
                        <th>Element Type</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(elementCount).map(([type, count]) => (
                        <tr key={type}>
                            <td>{type}</td>
                            <td>{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SummaryTable;