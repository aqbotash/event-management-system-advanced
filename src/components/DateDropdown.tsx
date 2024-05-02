// DateDropdown.tsx

import React from 'react';

interface Props {
    dateList: { date: string }[];
}

const DateDropdown: React.FC<Props> = ({ dateList }) => {
    return (
        <div>
            <p>Select a date:</p>
            <select>
                <option value="">Select a date</option>
                {dateList.map(dateItem => (
                    <option key={dateItem.date}>{dateItem.date}</option>
                ))}
            </select>
        </div>
    );
};

export default DateDropdown;
