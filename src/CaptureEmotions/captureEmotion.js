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

