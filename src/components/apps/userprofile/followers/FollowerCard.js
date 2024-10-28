/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {CardContent, Box, Stack, Avatar, Grid, Button,Typography, Chip, TextField, InputAdornment, CircularProgress, Skeleton,} from '@mui/material';
import React, { useEffect, useState } from 'react';
import BlankCard from 'src/components/shared/BlankCard';
import { IconMapPin, IconSearch } from '@tabler/icons';
import { deleteData, getData, postData } from '../../../../Services/Api';
import { toast } from 'sonner';

const FollowerCard = ({userData}) => {
  const [loading, setLoading] = React.useState(false);
  const cuString = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const currentUserls = JSON.parse(cuString); 
  const [loadFollowing, setLoadFollowing] = useState(false);
  const [loadUnfollowing, setLoadUnfollowing] = useState(false);
  const [followingUsers, setFollowingUsers] = React.useState([]);
  const [followed, setFollowedsers] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const loadFollowingUsers = async () => {
    try {
      setLoading(true);
      const response = await getData(`follow/followers/${userData.email}`, token);
      const GetMutalFolowingList = await getData(`find/${userData.email}`, token);
      if (response.status === 200 || response.status === 201 || GetMutalFolowingList.status === 200 || GetMutalFolowingList.status === 201) {
        setFollowingUsers(response.userInfo.result);
        setFollowedsers(GetMutalFolowingList.userInfo.follow);
      } else {
        toast.error('Não foi possível carregar os seus amigos');
      }
    } catch (e) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFollowingUsers();
  }, []);

  const filterFriends = (friends, searchQuery) => {
    if (searchQuery) {
      return friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return friends;
  };
  const filteredFriends = filterFriends(followingUsers, search);

  const mutualFollow = (userEmail) => {
    return followed.some(follow => follow.followedEmail === userEmail);
  };

  const unfollow = async ( email) => {
    setLoadFollowing(true);
    try {
      setLoadUnfollowing(true);
      const response = await deleteData(`follow/${email}?page=1&limit=40`,token);
      if (response.status === 200 || response.status === 201) {
        toast.success('Deixou de Seguir com sucesso');
        currentUserls.follow = currentUserls.follow.filter(follow => follow.followedEmail !== userData.email);
        setFollowedsers(followingUsers.filter(follow => follow.email !== email));
      } else {
        toast.error('Erro ao deixar de seguir');
      }
      console.log(response);
    } catch (error) {
      toast.error('Erro ao deixar de seguir');
    }finally {
      setLoadUnfollowing(false);
    }
  }

  const follow = async (email, user) => {
    setLoadFollowing(true);
    try {
      const response = await postData(`follow/${email}`, {}, token);
      if (response.status === 200 || response.status === 201) {
        toast.success('Seguido com sucesso');
        // Atualize o currentUser local
        const updatedFollow = [...currentUserls.follow, response.data];
        currentUserls.follow = updatedFollow;
        localStorage.setItem('currentUser', JSON.stringify(currentUserls));
        
        // Atualize o estado das listas
        setFollowedsers([...followed, response.data]); // Atualize a lista de seguidos
      } else {
        toast.error('Erro ao seguir');
      }
      setLoadFollowing(false);
    } catch (error) {
      toast.error('Erro ao seguir');
      setLoadFollowing(false);
    }
  };
  
  


  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Box  sx={{ display: 'flex', flexDirection: { sm:'row', xs: 'column'}, alignItems: 'center',width: '100%', justifyContent: 'space-between'}} alignItems={'center'} mt={2}>
            <Box sx={{ display: 'flex', alignItems: 'center',alignSelf: 'flex-start', paddingBottom : {xs: 1, sm: 0}}}>
              <Typography variant="h3" >
                Seguidores &nbsp;
                <Chip label={filteredFriends.length} color="secondary" size="small" />
              </Typography>
            </Box>
            <Box ml="auto">
              <TextField
                id="outlined-search"
                placeholder="Buscar Seguidores"
                size="small"
                type="search"
                variant="outlined"
                inputProps={{ 'aria-label': 'Buscar Seguidores' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="14" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </Box>
        </Grid>
        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <Grid item xs={12} lg={4} key={index}>
              <BlankCard>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text"sx={{ fontSize: '1rem' }}  width="80%" height={40}/>
           
                </CardContent>
              </BlankCard>
            </Grid>
          ))
        ) : (
          filteredFriends.length === 0 ? (
            <Grid item xs={12}>
              <BlankCard >
                <CardContent sx = {{height : '30vh', display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                  <Stack direction={'column'} gap={2} alignItems="center">
                    <Typography variant="h6" color="textSecondary">
                    {
                      search ? 
                      'Usuário não encontrado' : // Mostra esta mensagem se a busca não retornar resultados
                      currentUserls.email === userData.email ? 
                      'Você ainda não Possui seguidores' :
                      'Este perfil ainda não possui seguidores.'
                    }

                    </Typography>
                  </Stack>
                </CardContent>
              </BlankCard>
            </Grid>
          ) : (
            filteredFriends.map((user) => (
              <Grid item xs={12} lg={4} key={user.id}>
              <BlankCard>
                <CardContent>
                  <Stack direction={'row'} gap={2} alignItems="center">
                    <Avatar alt= {user.name} src={user.profile ? user.profile.url : ''} />
                    <Box>
                      <Typography variant="h6" textOverflow={'ellipsis'} noWrap>
                        {user.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        noWrap
                        textOverflow={'ellipsis'}
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <IconMapPin size="14" />
                        Brasil
                      </Typography>
                    </Box>

                    {
                      currentUserls.email !== userData.email ? null :
                      <Box ml="auto">
                      {mutualFollow(user.email) ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => unfollow(user.email,user)}
                        >
                          Deixar de seguir
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => follow(user.email,user)}
                        >
                          Seguir
                        </Button>
                      )}
                    </Box>}

                  </Stack>
                </CardContent>
              </BlankCard>
            </Grid>
            ))
          )
        )}          

      </Grid>
    </>
  );
};

export default FollowerCard;
