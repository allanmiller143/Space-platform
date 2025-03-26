/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import propTypes from 'prop-types';
import ContractContext from './ContractContext';

function ContractContextProvider({children}){
  const [currentStep,setCurrentStep] = useState(0);
  const [property,setProperty] = useState(null);
  const [loading,setLoading] = useState(false);

  const value = {
    currentStep,setCurrentStep,
    property,setProperty,
    loading,setLoading
  };

  return (
    <ContractContext.Provider value = {value}>
      {children}
    </ContractContext.Provider>
  );
}

export default ContractContextProvider;

ContractContextProvider.propTypes = {
  children: propTypes.any,
}.isRequired;
