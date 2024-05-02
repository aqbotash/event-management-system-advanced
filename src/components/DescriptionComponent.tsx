import React from 'react';

interface DescriptionProps {
    description: string;
}

const DescriptionComponent: React.FC<DescriptionProps> = ({ description }) => {
    // Split the description by newline characters
    const lines = description.split('\n');

    // Map each line to a paragraph element
    const descriptionElements = lines.map((line, index) => (
        <p key={index} className="text-lg">{line}</p>
    ));

    return (
        <div className="flex flex-col gap-4">
            {descriptionElements}
        </div>
    );
};

export default DescriptionComponent;
