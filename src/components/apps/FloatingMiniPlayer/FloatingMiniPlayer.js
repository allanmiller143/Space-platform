import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import { Box, IconButton, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const FloatingMiniPlayer = ({ content, onClose }) => {
  const miniPlayer = (
    <Draggable handle=".handle">
      <Box
        className="handle"
        sx={{
          width: 500,
          height: 510,
          position: "fixed",
          top: 100,
          left: 20,
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
          zIndex: 2147483647, // Maior valor possível para z-index no CSS
        }}
      >
        <Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{
              display: "flex",
              justifyContent: "end",
              position: "absolute",
              right: 20,
              top: 20,
              backgroundColor: "transparent",
              zIndex: 1,
              
            }}
          >
            <Cancel />
          </IconButton>
        </Box>

        {/* Conteúdo */}
        <Box sx={{ height: "100%" }}>
          {content || <Typography>Seu conteúdo aqui!</Typography>}
        </Box>
      </Box>
    </Draggable>
  );

  return ReactDOM.createPortal(miniPlayer, document.body);
};

export default FloatingMiniPlayer;
