import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  oldPassword: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
    newPassword: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
const Setting = () => {
  const [Name,setName] = useState("")
  const [Email,setEmail] = useState("")
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  });
  useEffect(()=>{
    const storedData = localStorage.getItem("userInfo");
    if (storedData) {
      const data = JSON.parse(storedData);
      console.log(data);
      setName(data.name);
      setEmail(data.email)
    }
  },[])
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        Setting
      </Typography>
      <Divider />
      <Typography variant="h6" my={2} fontWeight={600}>
        Change Password
      </Typography>
      <Box
        component={"form"}
        onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 6,

            }}
            gap={4}
           
          >
            <Stack
            direction={"row"}
              alignItems={"center"}
              spacing={2}
              
              justifyContent={"space-around"}
            >
              <Typography variant="body" fontWeight={600}>
               {Name}
              </Typography>
              <Typography variant="body" fontWeight={600}>
               {Email}
              </Typography>
            </Stack>
           <Stack
              direction="row"
              alignItems={"center"}
              spacing={2}
              justifyContent={"center"}
            >
              <Typography variant="body" fontWeight={600}>
                Old Password :
              </Typography>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  id="oldPassword"
                  name="oldPassword"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                  helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff 
                        /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    ),
                  }}
                  label="Password"
                />
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={2}
              justifyContent={"center"}
            >
              <Typography variant="body" fontWeight={600}>
                New Password :
              </Typography>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff 
                        /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    ),
                  }}
                  label="Password"
                />
              </FormControl>
            </Stack>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
    </Box>
  );
};

export default Setting;
