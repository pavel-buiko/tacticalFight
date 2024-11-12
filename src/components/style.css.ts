import { style } from "@vanilla-extract/css";

export const appStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
});

export const battlefieldContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const gridContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 100px)",
  gridTemplateRows: "repeat(4, 100px)",
  gap: "63px 20px",
});

export const actionButtonsStyle = style({
  display: "flex",
  gap: "12px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
});

export const buttonStyle = style({
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "8px",
  marginTop: "60px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.3s",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "#CC4E5C",
  ":hover": {
    backgroundColor: "#CC4E50",
    transform: "scale(1.05)",
  },
  ":active": {
    backgroundColor: "#CC4E59",
    transform: "scale(0.98)",
  },
});

export const defenseButtonStyle = style({
  backgroundColor: "#007BFF",
  ":hover": {
    backgroundColor: "#1c8dff",
  },
  ":active": {
    backgroundColor: "#0073e6",
  },
});

export const unitCellStyle = style({
  width: "100px",
  height: "150px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
  position: "relative",
  backgroundColor: "#f5f5f5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",

  ":hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 20px 3px red",
  },
});
export const deadUnitOverlay = style({
  position: "relative",
  filter: "grayscale(1)",
});

export const skullIconStyle = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: "100px",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "auto",
  opacity: 0.8,
});
export const unitCellWrapper = style({
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export const healthBarStyle = style({
  position: "absolute",
  bottom: "0",
  left: "0",
  backgroundColor: "rgba(255, 0, 0, 0.5)",
  zIndex: 1,
  transition: "height 0.3s ease",
  width: "100%",
});

export const healthTextStyle = style({
  position: "absolute",
  bottom: "0px",
  width: "100%",
  padding: "5px 0px",
  background: "rgb(0 0 0 / 81%)",
  textAlign: "center",
  color: "#fff",
  fontSize: "12px",
  fontWeight: "bold",
  zIndex: 2,
});

export const currentUnitStyle = style({
  border: "5px solid #CC4E5C",
});

export const selectableUnitStyle = style({
  border: "3px red dashed",
  opacity: 0.8,
  ":hover": {
    opacity: 1,
  },
});

export const hoveredUnitStyle = style({
  boxShadow: "0px 0px 3px 3px black",
});

export const turnOrderStyle = style({
  padding: "20px",
  backgroundColor: "#f4f4f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "300px",
  marginLeft: "20px",
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
});

export const currentUnitInListStyle = style({
  backgroundColor: "#CC4E5C",
  color: "white",
  fontWeight: "bold",
  borderRadius: "4px",
  padding: "8px",
  transition: "background-color 0.3s ease",
});

export const turnOrderListStyle = style({
  padding: "0",
});

export const turnOrderItemStyle = style({
  padding: "10px",
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  listStyleType: "none",
  selectors: {
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
});

export const headingStyle = style({
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "10px",
});
