/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Skeleton, Button, Drawer, Box, Typography } from '@mui/material';
import BlogCard from './BlogCard';
import { putData } from '../../../Services/Api';
import { useNavigate } from 'react-router';
import FilterVitrine from '../../marketplace/Filter/'; // Ensure this component is correctly imported

const BlogListing = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: '',
    city: '',
    state: '',
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
      garden: false,
    },
    minPrice: '',
    maxPrice: '',
    announcementType: '',
  });
  const [totalItens, setTotalItens] = useState(0);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false); // Added state for Drawer
  const navigate = useNavigate();

  const filter = async () => {
    setLoading(true);

    const opcoesRapidasTrue = Object.keys(formData.opcoesRapidas)
      .filter((key) => formData.opcoesRapidas[key])
      .reduce((obj, key) => {
        obj[key] = true;
        return obj;
      }, {});

    const formDataToSend = {
      propertyType: formData.propertyType,
      city: formData.city,
      state: formData.state,
      ...opcoesRapidasTrue,
      ...(formData.announcementType === 'rent' || formData.announcementType === 'sell'
        ? { announcementType: formData.announcementType }
        : {}),
      ...(parseInt(formData.minPrice) > 1
        ? { minPrice: Math.round(parseFloat(formData.minPrice)) }
        : {}),
      ...(formData.minPrice <= formData.maxPrice &&
      parseInt(formData.maxPrice) > 1 &&
      parseInt(formData.minPrice) > 1
        ? { maxPrice: Math.round(parseFloat(formData.maxPrice)) }
        : {}),
    };

    try {
      const response = await putData(`properties/filter?page=${currentPage}&limit=42&verified=true`, formDataToSend);
      if (response.status === 200 || response.status === 201) {
        setTotalItens(response.data.pagination.total);
        setProperties(response.data.result);
      } else {
        navigate('/error');
      }
    } catch (error) {
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filter();
  }, [currentPage, formData]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button
          variant="text"
          color="primary"
          onClick={() => setDrawerOpen(true)}
          sx={{ borderRadius: 0, marginBottom: 2, display: 'flex', alignItems: 'center' }}
        >
          {`Exibindo ${properties.length} resultados - ${
            Object.keys(formData).filter((key) => formData[key]).length - 1
          } Filtros aplicados - Ver filtros`}
        </Button>
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: { xs: 340, md: 600 }, p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Filtros
            </Typography>
            <FilterVitrine {...{ formData, setFormData }} />
          </Box>
        </Drawer>
      </Grid>
      {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <Grid item xs={12} lg={4} md={6} sm={6} key={index}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        ))}

      {!loading && totalItens === 0 && (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Não foram encontrados resultados
          </Typography>
        </Grid>
      )}


      

      {!loading &&
        totalItens > 0 &&
        properties.map((post) => (
          <Grid item xs={12} lg={4} md={6} sm={6} key={post.id}>
            <BlogCard post={post} />
          </Grid>
        ))}



      {!loading && totalItens > 0 && (
        <Grid item xs={12}>
          <Pagination
            count={Math.ceil(totalItens / 42)} // Calculate total pages
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default BlogListing;
