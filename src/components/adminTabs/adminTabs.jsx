import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminCatalog from "../adminCatalog/adminCatalog"
import AdminRequest from "../adminRequest/adminRequest";
import AdminReservation from "../adminReservations/adminReservations";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminTabs() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          aria-label="basic tabs example"
          textColor="white"
          indicatorColor="secondary"
        >
          <Tab label="Reservations" {...a11yProps(0)} />
          <Tab label="Requests" {...a11yProps(1)} />
          <Tab label="Catalog" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={value}
        index={0}
        style={{ backgroundColor: "white" }}
      >
       <AdminReservation/>
      </CustomTabPanel>
      <CustomTabPanel 
      value={value} 
      index={1} 
      style={{ backgroundColor: "white" }}
      >
        <AdminRequest/>
      </CustomTabPanel>
      <CustomTabPanel 
      value={value} 
      index={2} 
      style={{backgroundColor:"white"}}>
        <AdminCatalog/> 
      </CustomTabPanel>
    </Box>
  );
}
