/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import ProductCarousel from 'src/components/apps/ecommerce/productDetail/ProductCarousel';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ProductDetail from 'src/components/apps/ecommerce/productDetail/ProductDetail';
import ChildCard from 'src/components/shared/ChildCard';
import { useEffect, useState } from 'react';
import { postData } from '../../../Services/Api';
import Loading from '../../../components/Loading/Loading';

const EcommerceDetail = () => {
  const [loading,setLoading] = useState(false);
  const id = 'd2bbc4c1-f2c1-474c-81a7-f8394e80d02f';
  
  const post = {
    "id": "1b272c63-eb69-4d28-8df2-a06026ec5654",
    "email": "millerallan17@gmail.com",
    "text": 'Olhem so para esta linda casa localizada no centro de SP. fabulosa e magnifica venha conhecer',
    "likes": 0,
    "active": true,
    "createdAt": "2024-10-14T01:20:09.867Z",
    "deletedAt": null,
    "PostMedia": [
        {
            "id": "adfd5fb7-d1dd-45f4-a109-c622d4cc82ef",
            "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
            "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-imgs.appspot.com/o/posts%2Fmedias%2F1b272c63-eb69-4d28-8df2-a06026ec5654%2F229d6da24bda221b31f7424fe628f0c4.jpg?alt=media&token=3cb878ca-d0a1-4213-9c42-7e0712b7f43c",
            "type": "image/jpeg",
            "createdAt": "2024-10-14T01:20:09.867Z"
        },
        {
            "id": "c0610ebb-30ab-470b-bc5c-b8d6a2ee16c4",
            "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
            "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-imgs.appspot.com/o/posts%2Fmedias%2F1b272c63-eb69-4d28-8df2-a06026ec5654%2F389e333dd035432fa79a55a7d855b661.jpg?alt=media&token=247c439c-af09-4b27-8089-8c6e25e96666",
            "type": "image/jpeg",
            "createdAt": "2024-10-14T01:20:09.867Z"
        },
        {
            "id": "461dd635-5606-42f5-bb3c-9d2d7e0393d8",
            "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
            "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-imgs.appspot.com/o/posts%2Fmedias%2F1b272c63-eb69-4d28-8df2-a06026ec5654%2F507e801330754252bd67960a2a07b1c7.jpg?alt=media&token=24a630f2-3c61-4008-bd51-8e3bf7d05167",
            "type": "image/jpeg",
            "createdAt": "2024-10-14T01:20:09.867Z"
        },
        {
            "id": "8dc5d114-9bdc-492b-80e5-7051577ba0e0",
            "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
            "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-imgs.appspot.com/o/posts%2Fmedias%2F1b272c63-eb69-4d28-8df2-a06026ec5654%2Ffc8674660553b32302272a96f2ab8ace.jpg?alt=media&token=f9f7abc3-f5e9-48f4-a7ca-6f0572e1a361",
            "type": "image/jpeg",
            "createdAt": "2024-10-14T01:20:09.867Z"
        }
    ],
    "PostLikes": [],
    "PostComments": [
        {
            "id": "89b47567-cfb6-4ebf-b98e-e1589d185a19",
            "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
            "email": "millerallan17@gmail.com",
            "text": "primeiro comentario..",
            "likes": 0,
            "active": true,
            "createdAt": "2024-10-14T02:18:27.078Z",
            "deletedAt": null
        },
        {
            "id": "f514a6df-909e-4526-baf6-6f1de37d84fa",
            "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
            "email": "millerallan17@gmail.com",
            "text": "ihuuuuuuuuuuuuuuuuuu",
            "likes": 0,
            "active": true,
            "createdAt": "2024-10-14T02:18:47.077Z",
            "deletedAt": null
        },        {
          "id": "89b47567-cfbds6-4ebf-b98e-e1589d185a19",
          "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
          "email": "millerallan17@gmail.com",
          "text": "primeiro comentario..",
          "likes": 0,
          "active": true,
          "createdAt": "2024-10-14T02:18:27.078Z",
          "deletedAt": null
      },
      {
          "id": "f514a6asdfddf-909e-4526-baf6-6f1de37d84fa",
          "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
          "email": "millerallan17@gmail.com",
          "text": "ihuuuuuuuuuuuuuuuuuu",
          "likes": 0,
          "active": true,
          "createdAt": "2024-10-14T02:18:47.077Z",
          "deletedAt": null
      },        {
        "id": "89b475sdfsfa67-cfb6-4ebf-b98e-e1589d185a19",
        "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
        "email": "millerallan17@gmail.com",
        "text": "primeiro comentario..",
        "likes": 0,
        "active": true,
        "createdAt": "2024-10-14T02:18:27.078Z",
        "deletedAt": null
    },
    {
        "id": "f514aasfdsaf6df-909e-4526-baf6-6f1de37d84fa",
        "postId": "1b272c63-eb69-4d28-8df2-a06026ec5654",
        "email": "millerallan17@gmail.com",
        "text": "ihuuuuuuuuuuuuuuuuuu",
        "likes": 0,
        "active": true,
        "createdAt": "2024-10-14T02:18:47.077Z",
        "deletedAt": null
    }
      
    ]
}
  // useEffect(() => {
  //   loadPostInfo();
  // },[]);

  // const loadPostInfo = async (pos) => {
  //   setLoading(true);
  //   try{
  //     const response  = await postData(`posts/${id}`,{});
  //     if(response.status === 200 || response.status === 201){
  //       console.log(response);
  //     }else{
  //       console.log(response);
  //     }
  //   }catch(err){
  //     console.log(err);
  //   } finally{
  //     setLoading(false);
  //   }
  // }

  return (
    <PageContainer title="Shop List" description="this is Shop List page">
      {/* {loading && <Loading data = {{open:loading}}/>} */}
      <Breadcrumb title="Detalhes do post" />
      <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
        <Grid item xs={12} sm={12} lg={12}>
          <ChildCard>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                <ProductCarousel  post={post}/>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <ProductDetail  post={post}/>
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EcommerceDetail;
