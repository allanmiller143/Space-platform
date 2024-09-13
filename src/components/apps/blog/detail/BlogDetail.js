import React, { useEffect } from 'react';
import { fetchBlogPost } from 'src/store/apps/blog/BlogSlice';
import { useLocation } from 'react-router-dom';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Tooltip,
  Box,
  Divider,
  TextField,
  Button,
  Skeleton,
} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { IconEye, IconMessage2, IconPoint, IconQuote } from '@tabler/icons';
import { format } from 'date-fns';
import BlogComment from './BlogComment';
import { uniqueId } from 'lodash';
import { addComment } from 'src/store/apps/blog/BlogSlice';
import BlankCard from '../../../shared/BlankCard';
import { useDispatch, useSelector } from 'react-redux';

const BlogDetail = () => {
  const dispatch = useDispatch();
  const title = useLocation();
  const getTitle = title.pathname.split('/').pop();
  const [replyTxt, setReplyTxt] = React.useState('');

  useEffect(() => {
    dispatch(fetchBlogPost(getTitle));
  }, [dispatch]);

  // Get post
  const post = useSelector((state) => state.blogReducer.selectedPost);
  const BCrumb = [
    {
      to: '/',
      title: 'Início',
    },
    {
      to: '/apps/blog/posts',
      title: 'Blog',
    },
    {
      title: 'Post do Blog',
    },
  ];

  const onSubmit = async (id, reply) => {
    const replyId = uniqueId('#comm_');
    const newReply = {
      id: replyId,
      profile: {
        id: uniqueId('#REPLY_'),
        avatar: post?.author.avatar,
        name: post?.author.name,
        time: 'agora',
      },
      comment: reply,
      replies: [],
    };
    dispatch(addComment(id, newReply));
    dispatch(fetchBlogPost(getTitle));
    setReplyTxt('');
  };

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Breadcrumb title="Detalhe do Blog" items={BCrumb} />
      <BlankCard>
        <>
          {isLoading ? (
            <>
              <Skeleton
                animation="wave"
                variant="square"
                width="100%"
                height={440}
                sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
              ></Skeleton>
            </>
          ) : (
            <CardMedia component="img" height="440" image={post?.coverImg} alt="iguana verde" />
          )}
          <CardContent>
            <Stack direction="row" sx={{ marginTop: '-45px' }}>
              <Tooltip title={post ? post?.author.name : ''} placement="top">
                <Avatar aria-label="receita" src={post?.author.avatar}></Avatar>
              </Tooltip>
              <Chip
                sx={{ marginLeft: 'auto', marginTop: '-21px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.dark : 'white', }}
                label="Leitura de 2 min"
                size="small"
              ></Chip>
            </Stack>
            <Chip label={post?.category} size="small" sx={{ marginTop: 2 }}></Chip>
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h1"
                fontWeight={600}
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                {post?.title}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Stack direction="row" gap={1} alignItems="center">
                <IconEye size="18" /> {post?.view}
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <IconMessage2 size="18" /> {post?.comments.length}
              </Stack>

              <Stack direction="row" ml="auto" alignItems="center">
                <IconPoint size="16" />
                <small>{post ? <>{format(new Date(post.createdAt), 'E, d de MMM')}</> : ''}</small>
              </Stack>
            </Stack>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography variant="h2">Título do parágrafo</Typography>
            <p>
              Mas você não consegue descobrir o que é ou o que pode fazer. O diretório web MTA é a
              maneira mais simples de alguém fazer uma oferta por um link, ou alguns links se assim
              desejar. O diretório de links no MTA exibe todos os links que possui atualmente, e o faz
              em ordem alfabética, o que facilita muito para alguém encontrar o que está procurando
              se for algo específico e não quiser passar por todos os outros sites e links também. Ele
              permite que você comece sua oferta na parte inferior e trabalhe lentamente até o topo da
              lista.
            </p>
            <p>
              Descubra o que é ou o que pode fazer. O diretório web MTA é a maneira mais simples em
              que alguém pode fazer uma oferta por um link, ou alguns links se assim desejar. O
              diretório de links no MTA exibe todos os links que possui atualmente, e o faz em ordem
              alfabética, o que facilita muito para alguém encontrar o que está procurando se for
              algo específico e não quiser passar por todos os outros sites e links também. Ele
              permite que você comece sua oferta na parte inferior e trabalhe lentamente até o topo da
            </p>
            <Typography fontWeight={600}>Este é um texto em negrito.</Typography>
            <Typography fontStyle="italic">Este é um texto em itálico.</Typography>
            <Box my={4}>
              <Divider />
            </Box>
            <Typography variant="h3">Lista não ordenada.</Typography>
            <ul>
              <li>Descubra o que é ou</li>
              <li>Os links que possui atualmente</li>
              <li>Ele permite que você comece sua oferta</li>
              <li>Descubra o que é ou</li>
              <li>Os links que possui atualmente</li>
              <li>Ele permite que você comece sua oferta</li>
            </ul>
            <Box my={4}>
              <Divider />
            </Box>
            <Typography variant="h3">Lista ordenada.</Typography>
            <ol>
              <li>Descubra o que é ou</li>
              <li>Os links que possui atualmente</li>
              <li>Ele permite que você comece sua oferta</li>
              <li>Descubra o que é ou</li>
              <li>Os links que possui atualmente</li>
              <li>Ele permite que você comece sua oferta</li>
            </ol>
            <Box my={4}>
              <Divider />
            </Box>
            <Typography variant="h3">Citações</Typography>
            <Box p={2} bgcolor="grey[100]" mt={2}>
              <Typography variant="h6">
                <IconQuote /> A vida é curta, sorria enquanto ainda tiver dentes!
              </Typography>
            </Box>
          </CardContent>
        </>
      </BlankCard>
      <BlankCard sx={{ mt: 3, p: 0 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={600}>
            Comentários do Post
          </Typography>
          <br />
          <TextField
            rows={4}
            multiline
            fullWidth
            value={replyTxt}
            onChange={(e) => setReplyTxt(e.target.value)}
          ></TextField>
          <br />
          <br />
          <Button color="primary" variant="contained" onClick={() => onSubmit(post.id, replyTxt)}>
            Postar Comentário
          </Button>

          <Stack direction="row" gap={2} alignItems="center" mb={3} mt={5}>
            <Typography variant="h4" fontWeight={600}>
              Comentários
            </Typography>
            <Box px={1.5} py={1} color="primary.main" bgcolor={'primary.light'}>
              <Typography variant="h6" fontWeight={600}>
                {post?.comments.length}
              </Typography>
            </Box>
          </Stack>
          <Box>
            {post?.comments?.map((comment) => {
              return <BlogComment comment={comment} key={comment.profile.id} />;
            })}
          </Box>
        </CardContent>
      </BlankCard>
    </Box>
  );
};

export default BlogDetail;
