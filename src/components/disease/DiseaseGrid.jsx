import React from 'react';
import DiseaseCard from './DiseaseCard';

const DiseaseGrid = ({ diseases, onDiseaseSelect }) => {
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {diseases.map((disease) => (
        <DiseaseCard
          key={disease.id}
          disease={disease}
          onClick={() => onDiseaseSelect(disease)}
        />
      ))}
    </div>
  );
};

export default DiseaseGrid;
