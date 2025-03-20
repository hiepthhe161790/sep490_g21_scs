import { useOutletContext } from 'react-router-dom';
import  React, {  useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Serials from './Serials';


export default function ManageSerial() {
  const { handleSetDashboardTitle } = useOutletContext();
  const [refreshOrders, setRefreshOrders] = useState(false);

  React.useEffect(() => {
    handleSetDashboardTitle("Manage Serial");
  }, [handleSetDashboardTitle])

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Serials refresh={refreshOrders} />
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{
        position: 'fixed',
        bottom: 16,
        right: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
      }}>
      </Grid >

    </>
  );
}