// Import necessary libraries and components from their respective packages
import React, { useState, useRef, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import Notifications from "../../Components/Notifications/notification";
// Import necessary constants from utility/constants
import {
  notificationsType,
  dismissAll,
  skeleton_loader,
  ROUTE_PATHS,
} from "../../utility/constants";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
// Import CSS for the Skeleton component
import "react-loading-skeleton/dist/skeleton.css";
// Import useSelector and useDispatch from react-redux
import { useSelector, useDispatch } from "react-redux";
// Import necessary actions from trendsSlice
import {
  setMatchTrendData,
  setBase64,
  setFavTrendData,
  setInputText,
} from "../../reducers/trendsSlice";
import cloneDeep from "clone-deep";
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";

// Define an array of acceptable file types for the FileUploader
const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const CaptureEmotions = () => {
  // Declare state variables and their setters for file, matchTrend, and inputDisable
  const [file, setFile] = useState(null);
  const [matchTrend, setMatchTrend] = useState(false);
  const [inputDisable, setInputDisable] = useState(false);

  // Declare a reference to the Webcam component
  const webcamRef = useRef(null);

  // Declare a state variable to control the visibility of the webcam
  const [showWebcam, setShowWebcam] = useState(false);

  // Retrieve necessary state variables from the Redux store
  const base64 = useSelector((state) => state.trends.base64);
  const inputText = useSelector((state) => state.trends.inputText);
  const matchtrendVal = useSelector((state) => state.trends.matchtrendVal);
  const favTrends = useSelector((state) => state.trends.favTrends);

  // Declare a state variable for loading status and its setter
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the useDispatch hook
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Function to capture an image from the webcam
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFile(imageSrc);
    dispatch(setBase64(imageSrc));
    setShowWebcam(false); // Hide the webcam after capturing the image
  }, [webcamRef, setFile]);

  // Function to toggle the webcam visibility
  const handleWebcam = () => {
    setShowWebcam(!showWebcam);
  };

  // Function to update the favorite status of a trend
  const updateFavoriteStatus = (trend, isFavorite) => {
    const newData = matchtrendVal.map((t) =>
      t.id === trend.id ? { ...t, favorite: isFavorite } : t
    );
    let favData = cloneDeep(favTrends ? favTrends : []);
    if (isFavorite) {
      favData.push(
        newData.find((t) => t.id === trend.id && t.favorite === isFavorite)
      );
      dispatch(setFavTrendData(favData));
    } else {
      const index = favData.findIndex((element) => element.id === trend.id);
      if (index >= 0) {
        favData.splice(index, 1);
        dispatch(setFavTrendData(favData));
      }
    }
    dispatch(setMatchTrendData(newData));
  };

  // Function to handle the click on an empty heart icon
  const emptyHeartClicked = (trend) => {
    updateFavoriteStatus(trend, true);
  };

  // Function to handle the click on a filled heart icon
  const fillHeartClicked = (trend) => {
    updateFavoriteStatus(trend, false);
  };

// Function to convert a file to base64 format
const toBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

// Function to handle the file change event
const handleChange = async (f) => {
setFile(f);
dispatch(setBase64(await toBase64(f)));
};

// Function to handle the match trend button click
const captureEmotionClicked = async () => {
if (base64 != null) {
  setIsLoading(true);
  dismissAll();

  // Create a FormData object and append the necessary data
  const bodyFormData = new FormData();

  // Check if `file` is a base64 string
  if (typeof file === 'string' && file.startsWith('data:')) {
    // Extract content type and base64 data from the string
    const matches = file.match(/^data:(.+);base64,(.*)$/);
    if (matches.length !== 3) {
      return Notifications({
        type: notificationsType.ERROR,
        message: 'Invalid base64 string.',
      });
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const blob = b64toBlob(base64Data, contentType);

    // Append the binary data as a file named "file"
    bodyFormData.append("file", blob);
  } else {
    // Assume `file` is already a File or Blob object
    bodyFormData.append("file", file);
  }

  try {
    // Send a POST request to the backend
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/predict-emotion",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: bodyFormData,
    });

    const resultTrends = response.data;
    
    const emotion = resultTrends?.predicted_emotion;
    navigate(`${ROUTE_PATHS.SPOTIFY}?emotion=${emotion}`);
    resetTrend();
  } catch (error) {
    console.error(error);
  }
} else {
  Notifications({
    type: notificationsType.ERROR,
    message: `Please select or upload an image and enter text to capture your emotion.`,
  });
}
};

// Utility function to convert base64 data to Blob
function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
const byteCharacters = atob(b64Data);
const byteArrays = [];

for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  const slice = byteCharacters.slice(offset, offset + sliceSize);
  const byteNumbers = new Array(slice.length);
  for (let i = 0; i < slice.length; i++) {
    byteNumbers[i] = slice.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  byteArrays.push(byteArray);
}

const blob = new Blob(byteArrays, {type: contentType});
return blob;
}


// Function to reset the trend state variables and dispatch actions
const resetTrend = () => {
dispatch(setBase64(null));
setFile(null);
setMatchTrend(false);
dispatch(setInputText(""));
setIsLoading(false);
dispatch(setMatchTrendData(null));
setInputDisable(false);
setShowWebcam(false);
dismissAll();
};

useEffect(() => {
const script = document.createElement("script");
script.src = "https://sdk.scdn.co/spotify-player.js";
script.async = true;
document.body.appendChild(script);

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = window.localStorage.getItem("token"); // Make sure this is correctly set
  const player = new window.Spotify.Player({
    name: "medoly_mood",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });

  player.connect().then((success) => {
    if (success) {
      console.log(
        "The Web Playback SDK successfully connected to Spotify!"
      );
    }
  });

  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });

  player.addListener("player_state_changed", (state) => {
    console.log(state);
  });

  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });
};

return () => {
  document.body.removeChild(script);
};
}, []);

