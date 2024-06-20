/* eslint-disable react/no-unescaped-entities */
"use client";
import INTForm from "@/components/Forms/Form";
import INTInput from "@/components/Forms/Input";
import { userLogin } from "@/services/actions/userLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Box,
  Button,
  Checkbox,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const validationSchema = z.object({
  user: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isLargeDevice = useMediaQuery("(min-width:960px)");
  const isSmallDevice = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#059669",
      },
      "&:hover fieldset": {
        borderColor: "green",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#059669",
      },
      color: "#059669",
    },
    "& .MuiInputLabel-root": {
      color: "#059669", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#059669",
    },
    "& .MuiInputBase-input": {
      color: "#059669",
    },
  };

  const handleSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await userLogin(data);
      if (res?.data?.url && res?.success) {
        toast.success(res?.message);
        router.push(res?.data?.url);
        setIsLoading(false);
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <Stack>
        <Box className="bg-[#fff] shadow-md px-5 py-16  md:p-20 mx-3 md:m-aut0 lg:m-0 lg:mx-0 rounded-md md:rounded-none  w-full md:w-[600px]   flex items-center text-[#059669] ">
          <INTForm
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              user: "",
              password: "",
            }}
          >
            <Box>
              <Typography
                fontWeight="semibold"
                variant="h4"
                sx={{ textAlign: "center", marginBottom: "10px" }}
              >
                Login to Indiano Travel !
              </Typography>
              <Box>
                <INTInput
                  label="User"
                  sx={textFieldStyles}
                  name="user"
                  fullWidth={true}
                />
                <INTInput
                  label="Password"
                  name="password"
                  type="password"
                  sx={textFieldStyles}
                  fullWidth={true}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#059669",
                  }}
                >
                  <Checkbox
                    sx={{
                      "& .MuiIconButton-root": {
                        color: "#fff",
                        borderColor: "#059669",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#059669",
                      },
                      "& .MuiCheckbox-indeterminate": {
                        color: "#059669",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#059669",
                      fontSize: isSmallDevice ? "12px" : "inherit",
                    }}
                    component="small"
                  >
                    Remember me
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "#059669",
                    fontSize: isSmallDevice ? "12px" : "inherit",
                  }}
                  component="small"
                >
                  Forgot password
                </Typography>
              </Box>

              <Button
                fullWidth
                type="submit"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Box>
          </INTForm>
        </Box>
      </Stack>
    </div>
  );
};

export default Login;
