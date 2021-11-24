import React from "react";
import { Box, IconButton, createSvgIcon } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setToken } from "../redux/user";
import { useNavigate } from "react-router-dom";
const GoogleIcon = createSvgIcon(
  <>
    <path
      fill="#EA4335 "
      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
    />
    <path
      fill="#34A853"
      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
    />
    <path
      fill="#4A90E2"
      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
    />
  </>,
  "Google"
);
const FacebookIcon = createSvgIcon(
  <>
    <g>
      <path
        fill="#3B5998"
        d="M145.659,0c80.45,0,145.66,65.219,145.66,145.66c0,80.45-65.21,145.659-145.66,145.659
          S0,226.109,0,145.66C0,65.219,65.21,0,145.659,0z"
      />
      <path
        fill="#FFFFFF"
        d="M163.394,100.277h18.772v-27.73h-22.067v0.1c-26.738,0.947-32.218,15.977-32.701,31.763h-0.055
          v13.847h-18.207v27.156h18.207v72.793h27.439v-72.793h22.477l4.342-27.156h-26.81v-8.366
          C154.791,104.556,158.341,100.277,163.394,100.277z"
      />
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </>,
  "Facebook"
);

const SocialAuth = ({ pathname, search }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const messageFn = (event) => {
    try {
      if (event.data.token) {
        window.removeEventListener("message", messageFn);
        const { token } = event.data;
        localStorage.setItem("token", token);
        dispatch(setToken(token));
        dispatch(setIsAuthenticated(true));
        if (search === "") {
          navigate(pathname);
        } else {
          navigate({
            pathname: pathname,
            search: search,
          });
        }
      }
    } catch (e) {
      // do nothing
      console.error(e);
    }
  };
  const openAuthorizePopUp = (method) => {
    window.addEventListener("message", messageFn);
    const url = process.env.REACT_APP_SERVER_URL + "/api/auth/" + method;
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
    window.open(
      url,
      "Authorize",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };
  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        sx={{ marginRight: 1 }}
        onClick={() => openAuthorizePopUp("google")}
      >
        <GoogleIcon sx={{ height: 40, width: 40 }} />
      </IconButton>
      <IconButton onClick={() => openAuthorizePopUp("facebook")}>
        <FacebookIcon
          viewBox="0 0 291.319 291.319"
          sx={{ height: 40, width: 40 }}
        />
      </IconButton>
    </Box>
  );
};

export default SocialAuth;
