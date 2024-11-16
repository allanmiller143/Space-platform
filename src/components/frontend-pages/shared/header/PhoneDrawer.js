/* eslint-disable react/prop-types */
import Drawer from '@mui/material/Drawer';
import MobileSidebar from './MobileSidebar';

const PhoneDrawer = ({open, setOpen}) => {

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      
      <Drawer
        anchor="left"
        open={open}
        variant="temporary"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <MobileSidebar />
      </Drawer>
    </>
  );
};

export default PhoneDrawer;
