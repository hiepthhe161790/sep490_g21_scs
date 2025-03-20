
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Products from './Products';
import AddProduct from './AddProduct'
import DeletedProductsLaydout from './DeletedProductsLaydout'
import { useOutletContext } from 'react-router-dom';

export default function ManageProduct() {
  // const { handleSetDashboardTitle } = useOutletContext();
  const [refresh, setRefresh] = React.useState(false);
  const handleRefreshProducts = () => {
    setRefresh(prev => !prev);
  };
  // React.useEffect(() => {
  //   handleSetDashboardTitle("Manage Product");
  // }, [handleSetDashboardTitle]);
  
  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Products refresh={refresh} />
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
        <AddProduct onAddProductSuccess={handleRefreshProducts} ></AddProduct>
        <DeletedProductsLaydout ></DeletedProductsLaydout>
      </Grid >

    </>
  );
}









