import axios from 'axios';
// import { faker } from '@faker-js/faker';
import { useLocation } from 'react-router';
import { useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  Alert,
  Select,
  Snackbar,
  MenuItem,
  AlertTitle,
  InputLabel,
  FormControl,
} from '@mui/material';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [purchasedOrders, setPurchasedOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [soldProducts, setSoldProducts] = useState(0);
  const [totalPriceCompletedOrders, setTotalPriceCompletedOrders] = useState(0);
  const [beforeDiscount, setBeforeDiscount] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [actualRevenueByMonth, setActualRevenueByMonth] = useState(Array(12).fill(0));
  const [completedOrdersByMonth, setCompletedOrdersByMonth] = useState(Array(12).fill(0));
  const [cancelledOrdersByMonth, setCancelledOrdersByMonth] = useState(Array(12).fill(0));
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [productCategoryByMonth, setProductCategoryByMonth] = useState({});

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.showSnackbar) {
      setOpenSnackbar(true);
      // Clear the state to avoid showing Snackbar again if the user navigates back to this page
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchData = useCallback(() => {
    axios
      .get('https://fdiamond-api.azurewebsites.net/api/Order/GetDashboard')
      .then((response) => {
        if (response.data.isSuccess) {
          const ordersByYear = response.data.result.filter(
            (order) => new Date(order.orderDate).getFullYear() === selectedYear
          );

          const purchaseOrdersData = ordersByYear.filter(
            (purchaseOrder) => purchaseOrder.status === 'Ordered'
          );
          setPurchasedOrders(purchaseOrdersData.length || 0);

          const completedOrdersData = ordersByYear.filter((order) => order.status === 'Delivered');

          const cancelledOrdersData = ordersByYear.filter((order) => order.status === 'Cancelled');
          setCompletedOrders(completedOrdersData.length || 0);

          const soldProductsCount =
            completedOrdersData.reduce(
              (total, order) => total + order.productDashboardDTOs.length,
              0
            ) || 0;

          setSoldProducts(soldProductsCount);

          const totalPrice =
            completedOrdersData.reduce((total, order) => total + order.totalPrice, 0) || 0;
          setTotalPriceCompletedOrders(totalPrice);

          const totalBeforeDiscount =
            completedOrdersData.reduce((total, order) => total + order.basePrice, 0) || 0;
          setBeforeDiscount(totalBeforeDiscount);

          const revenueByMonth = Array(12).fill(0);
          const completedOrdersByMonthTemp = Array(12).fill(0);
          const productCategoryCount = {};
          const localProductCategoryByMonth = {};
          const cancelledOrdersByMonthTemp = Array(12).fill(0);

          cancelledOrdersData.forEach((order) => {
            const month = new Date(order.orderDate).getMonth();
            cancelledOrdersByMonthTemp[month] += 1;
          });

          setCancelledOrdersByMonth(cancelledOrdersByMonthTemp);

          completedOrdersData.forEach((order) => {
            const month = new Date(order.orderDate).getMonth();
            revenueByMonth[month] += order.totalPrice;
            completedOrdersByMonthTemp[month] += 1;

            order.productDashboardDTOs.forEach((item) => {
              const category = `Category ${item.categoryId}`;
              if (category) {
                if (!productCategoryCount[category]) {
                  productCategoryCount[category] = 0;
                }
                productCategoryCount[category] += 1;

                if (!localProductCategoryByMonth[category]) {
                  localProductCategoryByMonth[category] = Array(12).fill(0);
                }
                localProductCategoryByMonth[category][month] += 1;
              }
            });
          });

          console.log('Product Category By Month:', localProductCategoryByMonth);
          setActualRevenueByMonth(revenueByMonth);
          setCompletedOrdersByMonth(completedOrdersByMonthTemp);
          setProductCategoryData(
            Object.entries(productCategoryCount).map(([label, value]) => ({ label, value }))
          );
          setProductCategoryByMonth(localProductCategoryByMonth);
        } else {
          console.error('Error in response data:', response.data.errorMessages);
        }
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [selectedYear]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const Average = completedOrders > 0 ? totalPriceCompletedOrders / completedOrders : 0;
  const Discount = beforeDiscount - totalPriceCompletedOrders;

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xl">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle>
          Update Account Profile Successfully
        </Alert>
      </Snackbar>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel id="select-year-label">Year</InputLabel>
        <Select
          labelId="select-year-label"
          id="select-year"
          value={selectedYear}
          onChange={handleYearChange}
          label="Year"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Purchase Order"
            total={purchasedOrders}
            color="warning"
            sx={{ backgroundColor: '#1877F2', color: '#FFFFFF' }}
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Completed Order (1)"
            total={completedOrders}
            color="success"
            sx={{ backgroundColor: '#00A76F', color: '#FFFFFF' }}
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Product Sold"
            total={soldProducts}
            color="info"
            sx={{ backgroundColor: '#FFAB00', color: '#000000' }}
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Average invoice (5)=(4)/(1)"
            type="currency"
            total={Average}
            color="error"
            sx={{ backgroundColor: '#8E33FF', color: '#FFFFFF' }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Grid xs={12} sm={6} md={3} sx={{ mb: 3 }}>
            <AppWidgetSummary
              title="Before Discount (2)"
              type="currency"
              total={beforeDiscount}
              color="error"
            />
          </Grid>

          <Grid xs={12} sm={6} md={3} sx={{ mb: 3 }}>
            <AppWidgetSummary title="Discount (3)" type="currency" total={Discount} color="error" />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Actual Revenue (4)=(2)-(3)"
              type="currency"
              total={totalPriceCompletedOrders}
              color="error"
              // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} md={9}>
          <AppWebsiteVisits
            title="Revenue"
            subheader="Monthly Revenue"
            chart={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              series: [
                {
                  name: 'Revenue',
                  type: 'area',
                  fill: 'gradient',
                  data: actualRevenueByMonth,
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} sm={12} md={8}>
          <AppWebsiteVisits
            title="Completed Orders"
            subheader="Monthly Completed Orders"
            chart={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              series: [
                {
                  name: 'Completed Orders',
                  type: 'area',
                  fill: 'gradient',
                  data: completedOrdersByMonth,
                  color: '#00A76F',
                },
                {
                  name: 'Cancelled Orders',
                  type: 'line',
                  fill: 'solid',
                  data: cancelledOrdersByMonth,
                  color: '#FF5630',
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Product Sold"
            chart={{
              series: productCategoryData,
            }}
          />
        </Grid>

        <Grid xs={12} sm={12} md={12}>
          <AppWebsiteVisits
            title="Products Sold by Category"
            subheader="Monthly Products Sold by Category"
            chart={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              series: Object.entries(productCategoryByMonth).map(([category, data]) => ({
                name: category,
                type: 'column',
                fill: 'solid',
                data,
              })),
              options: {
                plotOptions: {
                  bar: {
                    columnWidth: '50%', // Tăng độ rộng cột lên
                  },
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
