import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';
import { AccountContext } from 'src/_mock/AccountContext';

import Iconify from 'src/components/iconify';

export default function LoginView() {
  const theme = useTheme();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { updateAccount } = useContext(AccountContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://fdiamond-api.azurewebsites.net/api/Users/login',
        {
          userName,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (
        response.data &&
        response.data.isSuccess &&
        response.data.result &&
        response.data.result.token &&
        response.data.result.role === 'admin'
      ) {
        const { token, userId } = response.data.result;
        localStorage.setItem('token', token);
        localStorage.setItem('username', userName);
        localStorage.setItem('userId', userId);
        console.log(token);
        console.log(userName);
        console.log(userId);
        await fetchUserData(userId);
        navigate('/');
      } else {
        setError('You dont have permission to access this website');
      }
    } catch (err) {
      console.error('Error logging in:', err.response ? err.response.data : err.message);
      if (err.response && err.response.data) {
        setError(
          err.response.data.errorMessages
            ? err.response.data.errorMessages.join(', ')
            : 'Error, try again!'
        );
      } else {
        setError('Error, try again!');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `https://fdiamond-api.azurewebsites.net/api/Users?userId=${userId}`
      );
      const userInfo = response.data.result;
      console.log(userInfo);
      // Cập nhật thông tin vào object account
      updateAccount({
        displayName: `${userInfo.lastName} ${userInfo.firstName}`,
        email: userInfo.userName,
        // Bạn có thể thêm các thông tin khác nếu cần, ví dụ:
        // address: userInfo.address,
        // phoneNumber: userInfo.phoneNumber,
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          label="User Name"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to FDiamond Admin</Typography>
          <Divider sx={{ my: 3 }} />
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
