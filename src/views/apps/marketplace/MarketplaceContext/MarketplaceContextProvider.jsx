/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import propTypes from 'prop-types';
import MarketplaceContext from './MarketplaceContext';
import { useNavigate } from 'react-router';

function MarketplaceContextProvider({children}){
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(40); // Definido para exibir 6 itens por página
    const [loading, setLoading] = useState(false);
    const [totalItens, setTotalItens] = useState(0);
    const [properties, setProperties] = useState([]); // Dados retornados da API
    const [drawerOpen, setDrawerOpen] = useState(false); // Estado para controlar a abertura do Drawer
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        propertyType : "",
        city : "",
        state : "",
        opcoesRapidas: {
            pool: false,
            grill: false,
            airConditioning: false,
            playground: false,
            eventArea: false,
            gym: false,
            porch: false,
            solarEnergy: false,
            concierge: false,
            yard: false,
            gourmetArea: false,
            balcony: false,
            slab: false,
            gatedCommunity: false,
            garden: false
        },
        minPrice : '',
        maxPrice : '',
        announcementType : '',
    });


  const value = {
    currentPage, setCurrentPage,itemsPerPage,loading, setLoading,
    totalItens, setTotalItens,
    properties, setProperties,
    drawerOpen, setDrawerOpen,
    navigate, formData, setFormData,


  };

  return (
    <MarketplaceContext.Provider value = {value}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export default MarketplaceContextProvider;

MarketplaceContextProvider.propTypes = {
  children: propTypes.any,
}.isRequired;
