/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, Button, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';
import { Cancel, CheckCircle } from '@mui/icons-material';
import Vantagens from '../Vantagens';
import Growth from './Growth';
import BlankCard from '../../../../shared/BlankCard';
import StatsCards from './StatsCards';
import MapUsers from './MapUsers';
import Settings from './Settings';

function ImovelDestacado({ open, handleClose, property, setImovelToSee, setFilteredImoveis, setImoveis }) {
  const [adType, setAdType] = useState('big'); 
  const handleTabChange = (event, newValue) => {
    setAdType(newValue);
  };

  if (!property) {
    return null;
  }

  return (

    <>
      <BlankCard>
        <Tabs value={adType} onChange={handleTabChange} centered sx={{ mb : 3, backgroundColor: '#f5f5f5' }}>
          <Tab label="Dados do destaque" value="big" />
          <Tab label="Configurações" value="small" />
        </Tabs>

        {
          adType === 'big' ?
            <>
              <StatsCards property = {property}/>
              <Growth property = {property}/>
              <MapUsers property={property}/>
            </>
          :
            <>
              <Settings property={property} setImovelToSee={setImovelToSee} setFilteredImoveis={setFilteredImoveis} setImoveis={setImoveis}/>
            </>
        }

      </BlankCard>
    </>


  );
}

export default ImovelDestacado;