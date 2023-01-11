import { Button } from "@mui/material";

export function Dialog({ message, onDialog }) {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
        onClick={() => onDialog(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3 stlye={{ color: "#111", fontSize: "16px" }}>{message}</h3>
          <div style={{ display: "flex", alignItems: "center" , marginTop: 10}}>
            <Button
              onClick={() => onDialog(true)}
              style={{color:'red'}}
            >
              Tak
            </Button>
            <Button
              onClick={() => onDialog(false)}
              style={{color:'blue'}}
            >
              Nie
            </Button>
          </div>
        </div>
      </div>
    );
  }
  export default Dialog;
  