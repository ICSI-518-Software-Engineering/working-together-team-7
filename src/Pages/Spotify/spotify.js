import React, { useCallback, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import axios from "axios";
import { musicGenres, ROUTE_PATHS, musicMoods } from "../../utility/constants";
import { useNavigate, useSearchParams } from "react-router-dom";

const Spotify = () => {
  const token = window.localStorage.getItem("spotify_token");

  const [searchParams] = useSearchParams();
  const emotion = searchParams.get("emotion");
   
  const [categories, setCategories] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [trackUris, setTrackUris] = useState([]);
  const [trackUrl, setTrackUrl] = useState("");
  const [currentView, setCurrentView] = useState("categories");
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: "Categories", view: "categories" },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const items = response.data.categories.items;

        // Check if there is an emotion query param and filter categories
        if (emotion && musicMoods[emotion]) {
           
          const filteredCategories = items.filter((category) =>
            musicMoods[emotion].includes(category?.name)
          );
          setCategories(filteredCategories);
        } else {
          setCategories(items);
        }
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          // Clear user data from localStorage
          localStorage.removeItem("user");
          localStorage.removeItem("authenticated");
          localStorage.removeItem("spotify_token");
          window.location.reload();
          // Or if you want to clear all local storage data
          // localStorage.clear();

          // Redirect to login page or home page after logout
          navigate(ROUTE_PATHS.LOGIN);
        }
        console.error("Error fetching categories from Spotify:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const fetchPlaylists = async (categoryId, categoryName) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaylists(response.data.playlists.items);
      setCurrentView("playlists");
      // Update breadcrumbs to include the new category
      setBreadcrumbs([
        { name: "Categories", view: "categories" },
        { name: categoryName, view: "playlists" },
      ]);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const fetchTracks = async (playlistId, playlistName) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTracks(response.data.items);
      setCurrentView("tracks");
      // Update breadcrumbs to include the new playlist
      setBreadcrumbs(prevBreadcrumbs => [
        ...prevBreadcrumbs.filter(crumb => crumb.view !== "tracks"), // Keep all but the 'tracks' breadcrumb
        { name: playlistName, view: "tracks" },
      ]);

      // Extract URIs from the fetched tracks and update the trackUris state
      const uris = response?.data?.items.map((item) => item?.track?.uri);
      setTrackUris(uris);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };
