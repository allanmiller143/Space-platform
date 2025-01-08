import PageContainer from 'src/components/container/PageContainer';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import BlogListing from 'src/components/apps/blog/BlogListing';
import { Container } from '@mui/system';

const BlogPage = () => {
  return (
    <>
      <PageContainer title="Blog" description="this is Blog">
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <BlogListing />
        </Container>
        <Footer />
        <ScrollToTop />
      </PageContainer>
    </>
  );
};

export default BlogPage;
