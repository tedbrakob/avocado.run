import { Router } from "express";
import axios from 'axios';
import { spotify as config } from "../config/config"

const router = Router();

router.post("/get-auth-token", async (req, res) => {
  const code = req.body.code || '';
  const redirectUri = req.body.redirectUri || '';
  const clientId = req.body.clientId;

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      {
        headers: {
          Authorization: "Basic " + Buffer.from(`${clientId}:${config.clientSecret}`).toString('base64'),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(tokenResponse.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/refresh-auth-token", async (req, res) => {
  const {clientId, refreshToken} = req.body;

  try {
    const refreshTokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
      {
        headers: {
          Authorization: "Basic " + Buffer.from(`${clientId}:${config.clientSecret}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(refreshTokenResponse.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;