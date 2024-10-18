/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CardContent, Box, Stack, Avatar, Grid, Typography, Chip, TextField, InputAdornment, Button, Skeleton, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BlankCard from 'src/components/shared/BlankCard';
import { IconSearch } from '@tabler/icons';
import { deleteData, getData } from '../../../../Services/Api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { height } from '@mui/system';

const FriendsCard = ({ userData }) => {
  const [loading, setLoading] = React.useState(false);
  const cuString = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const currentUserls = JSON.parse(cuString);  const [followingUsers, setFollowingUsers] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [loadFollowing, setLoadFollowing] = useState(false);
  const [loadUnfollowing, setLoadUnfollowing] = useState(false);


  const navigate = useNavigate();

  const loadFollowingUsers = async () => {
    try {
      setLoading(true);
      const response = await getData(`follow/following/${userData.email}`, token);
      if (response.status === 200 || response.status === 201) {
        setFollowingUsers(response.userInfo.result);
        console.log(response.userInfo);
      } else {
        toast.error('Não foi possível carregar os seus amigos');
      }
    } catch (e) {
      console.log(e);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFollowingUsers();
  }, []);

  // Função para filtrar amigos com base na pesquisa
  const filterFriends = (friends, searchQuery) => {
    if (searchQuery) {
      return friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return friends;
  };

  const openProfile = (email) => {
    navigate(`/user-profile/${email.replaceAll(/[.]/g, '-')}`);
  };

  const unfollow = async ( email) => {
    setLoadFollowing(true);
    try {
      setLoadUnfollowing(true);
      const response = await deleteData(`follow/${email}?page=1&limit=40`,token);
      if (response.status === 200 || response.status === 201) {
        toast.success('Deixou de Seguir com sucesso');
        currentUserls.follow = currentUserls.follow.filter(follow => follow.followedEmail !== userData.email);
        localStorage.setItem('currentUser', JSON.stringify(currentUserls));
        setFollowingUsers(followingUsers.filter(follow => follow.email !== email));
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

  // Aplica o filtro à lista de usuários seguindo
  const filteredFriends = filterFriends(followingUsers, search);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems={'center'} mt={2}>
            <Box>
              <Typography variant="h3">
                Amigos &nbsp;
                <Chip label={filteredFriends.length} color="secondary" size="small" />
              </Typography>
            </Box>
            <Box ml="auto">
              <TextField
                id="outlined-search"
                placeholder="Buscar Amigos"
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
          </Stack>
        </Grid>

        {loading ? (
          // Exibe Skeleton enquanto os dados estão sendo carregados
          Array.from(new Array(3)).map((_, index) => (
            <Grid item xs={12} lg={4} key={index}>
              <BlankCard>
                <CardContent>
                  <Stack direction={'column'} gap={2} alignItems="center">
                    <Skeleton variant="circular" width={80} height={80} />
                    <Box
                      textAlign={'center'}
                      width={'100%'}
                      display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Skeleton width="50%" height={30} />
                      <Box display={'flex'} gap={2} mt={1}>
                        <Skeleton width={100} height={40} />
                        <Skeleton width={100} height={40} />
                      </Box>
                    </Box>
                  </Stack>
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
                      Você ainda não está seguindo ninguém.
                    </Typography>
                  </Stack>
                </CardContent>
              </BlankCard>
            </Grid>
          ) : (
            filteredFriends.map((user) => (
              <Grid item xs={12} lg={4} key={user.id}>
                <BlankCard className="hoverCard">
                  <CardContent>
                    <Stack direction={'column'} gap={2} alignItems="center">
                      <Avatar
                        alt={user.name}
                        src={user.profile ? user.profile.url : ''}
                        sx={{ width: '80px', height: '80px' }}
                      />
                      <Box textAlign={'center'}>
                        <Typography variant="h5">{user.name}</Typography>
                        <Box display={'flex'} gap={2} mt={1}>
                          {
                            currentUserls.email === userData.email ? 
                            <Button variant="outlined" color="error" size="small" onClick={() => unfollow(user.email)} disabled={loadFollowing}>
                              Deixar de seguir
                              {loadUnfollowing ? (
                                <span style={{ marginLeft: '5px', display: 'inline-flex', alignItems: 'center' }}>
                                  <CircularProgress size={20} pl={2} color="inherit" />
                                </span>
                              ) : ''}
                            </Button> :  null
                          }

                          <Button variant="outlined" color="primary" size="small" onClick={() => openProfile(user.email)}>
                            Abrir perfil
                          </Button>
                        </Box>
                      </Box>
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

export default FriendsCard;
