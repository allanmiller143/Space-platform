/* eslint-disable react/prop-types */
import Draggable from "react-draggable";
import { Box, IconButton, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const FloatingMiniPlayer = ({ content, onClose }) => {
  return (
    <Draggable handle=".handle">
      <Box
      className="handle"
        sx={{
          width: 500,
          height: 500,
          position: "fixed",
          top: 100,
          left: 20,
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
          zIndex: 2147483647, // Maior valor possível para z-index no CSS
        }}
      >


        <Box sx={{ height: "85%",position: "relative" }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 20,
              right: 10,
              zIndex: 1,
            }}
          >
            <Cancel />
          </IconButton>
          {content || <Typography>Seu conteúdo aqui!</Typography>}
        </Box>
      </Box>
    </Draggable>
  );
};

export default FloatingMiniPlayer;
