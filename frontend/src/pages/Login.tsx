import { Box, Button, Typography } from "@mui/material";
import CustomInput from "../components/shared/CustomInput";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    // console.log(email, password);

    try {
      toast.loading(" Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success(" Signed in Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing in failed", { id: "login" });
    }
  };
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="https://media.istockphoto.com/id/1196084872/photo/digital-x-ray-human-brain-on-blue-background-3d-rendering.jpg?s=612x612&w=0&k=20&c=w8jU2Auw6Jnk24SJ_1UF3OIGjShFPpih10eBdZuZt-E="
          alt="Robot"
          style={{ width: "400px" }}
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              jusitfyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomInput type="email" name="email" label="Email" />
            <CustomInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                widht: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
