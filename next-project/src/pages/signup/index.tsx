import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useRouter } from "next/router";

interface SignupValues {
  email:string;
  username:string;
  password:string;
  phoneNumber:string;
}

const SignupPage = () => {
  const navigate = useRouter();

  const formik = useFormik<SignupValues>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("enter a valid email address").required(),
      username: Yup.string().required("make a username"),
      password: Yup.string()
        .min(8, "password must be atleast 6 character")
        .required(),
      phoneNumber: Yup.string()
        .matches(/^\d{12}$/, "Invalid phone number")
        .required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert("Loginsucces redirecting to login page");
      navigate.push("/Login");
    },
  });
  return (
    <Container className="flex items-center justify-center h-[700px]">
      <Paper
        elevation={8}
        className="p-8 ml-20 max-w-md w-[500px] text-center"
        color="black"
      >
        <Typography variant="h5" component="div" className="mb-10">
          Sign Up
        </Typography>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className="mb-4"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            className="mb-4"
            {...formik.getFieldProps("username")}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className="mb-4"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            className="mb-4"
            {...formik.getFieldProps("phoneNumber")}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          <Button
            className="bg-primary w-[400px] h-[50px]"
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
