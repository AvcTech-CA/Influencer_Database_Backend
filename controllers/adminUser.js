const Users = require('../models/users');
const AdminUsers=require('../models/adminUsers');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const axios = require("axios");
const cors = require("cors");
const user = require('../models/users');
const multer = require("multer");
const SECRET_KEY =process.env.SECRET_KEY
const influencerData=require('../models/influencerData');
const adminUser = require('../models/adminUsers');
const engagementRate=require('../models/engagementRates')
const followerSize=require('../models/followerSizes')
const filtercost=require("../models/filtercosts")
// const redis = require("redis");
// const redisClient = redis.createClient();
// redisClient.connect();

async function handleGetAllusers(req, res) {
    try{
        const allUsers = await Users.find();
        console.log(allUsers)
        res.status(200).json(allUsers)
      }
      catch{
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users.' });
      }
}

async function handlAdminSignup(req,res) {
  try {
    // Extract and normalize the email
    const { email,password} = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    console.log(email)

    // Check if the user already exists
    const existingUser = await adminUser.findOne({ email: normalizedEmail });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = await adminUser.create({
        email: normalizedEmail,
        password,
    });

    return res.status(201).json({
        message: "User created successfully!",
        user: newUser
    });

} catch (error) {
    console.error("Error in handleUserSignup:", error);

    // Unique constraint handling
    if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "User with this email already exists" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
}
}


async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const authUser = await AdminUsers.findOne({ email, password });

        if (!authUser) {
            return res.status(400).json({ message: "User not found" });
        }

     

        const token = jwt.sign(
            { userId: authUser._id, email: authUser.email }, // You can add more fields if necessary
            SECRET_KEY,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        console.log(token)

        // Send a success response (you might want to generate a JWT token here)
        res.status(200).json({ message: "Login successful",token, user: { email: authUser.email, userId: authUser._id }  });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

async function handlegetInstaInfluencer(req, res) {
    const username = req.params.username;
    const url = `https://real-time-instagram-scraper-api1.p.rapidapi.com/v1/user_followers_adv?username_or_id=${username}`;

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "85f816012amsh967553c757f970bp14efffjsn5887c2b47362", // Use your API key from .env
            "x-rapidapi-host": 'real-time-instagram-scraper-api1.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
}


async function handlesetInfluencer(req, res) {
    try {
      const { body } = req;
      console.log(body);
      console.log("Received File:", req.file);
  
      const photoBase64 = req.file ? Buffer.from(req.file.buffer).toString("base64") : null;
      const splitAndTrim = (input) =>
        typeof input === "string"
          ? input.split(",").map((item) => item.trim()).filter(Boolean)
          : Array.isArray(input)
          ? input
          : [];
      const newInfluencer = new influencerData({
        ...body,
        Photo: photoBase64,
      Name: body.Name,
      Username: body.Username,
      GeoLocation: body.GeoLocation,
      Ethnicity: body.Ethnicity,
      Religion: body.Religion,
      Language: body.Language,
      FollowerSizeAndTier: body.FollowerSizeAndTier,
      EngagementRate: body.EngagementRate,
      FollowerData: body.FollowerData,
      ProfileDescription: body.ProfileDescription,
      SocialMediaPlatformLinks: splitAndTrim(body.SocialMediaPlatformLinks),
      CostRange: body.CostRange,
      ContentNiche: body.ContentNiche,
      AgencyorHandlerName: body.AgencyorHandlerName,
      EmailAddress: body.EmailAddress,
      HomeAddress: body.HomeAddress,
      PhoneNumber: body.PhoneNumber,
      InternalNotes: splitAndTrim(body.InternalNotes),
      CampaignNumber: body.CampaignNumber,
      NameofPastProjects: splitAndTrim(body.NameofPastProjects),
      AVCBookedRate: body.AVCBookedRate,
      DeliverablesforPastProjects: splitAndTrim(body.DeliverablesforPastProjects),
      MonthofAVCPastProjects: body.MonthofAVCPastProjects,
      YearofAVCPastProjects: body.YearofAVCPastProjects,
      PostLinksofAVCPastProjects: body.PostLinksofAVCPastProjects,
      SharedDrivePath: body.SharedDrivePath,
      OtherBrandsWorkedWith: splitAndTrim(body.OtherBrandsWorkedWith),
      ContentSampleLinks: splitAndTrim(body.ContentSampleLinks),
      CampaignNumber:body.CampaignNumber,
      NameofPastProjects:splitAndTrim(body.NameofPastProjects),
      AVCBookedRate:body.AVCBookedRate,
      DeliverablesforPastProjects:splitAndTrim(body.DeliverablesforPastProjects),
      MonthofAVCPastProjects:body.MonthofAVCPastProjects,
      YearofAVCPastProjects:body.YearofAVCPastProjects,
      PostLinksofAVCPastProjects:body.PostLinksofAVCPastProjects,
      SharedDrivePath:body.SharedDrivePath,
      OtherBrandsWorkedWith:splitAndTrim(body.OtherBrandsWorkedWith),
      ContentSampleLinks:splitAndTrim(body.ContentSampleLinks),
      });
  
      await newInfluencer.save();
  
      res.status(201).json({ message: "Influencer data saved successfully!" });
      
    } catch (error) {
      console.error("Error saving influencer:", error.message || error);
  
      res.status(500).json({
        error: true,
        message: "Failed to save influencer data",
        details: error.message || "Unexpected server error",
      });
    }
  }
  

// const preWarmCache = async () => {
//     try {
//       const cached = await redisClient.get("allInfluencers");
//       if (!cached) {
//         console.log("Pre-warming Redis cache...");
//         const influencers = await influencerData.find();
//         await redisClient.setEx("allInfluencers", CACHE_DURATION, JSON.stringify(influencers));
//         console.log("Redis cache pre-warmed.");
//       } else {
//         console.log("Redis cache already exists. Skipping warm-up.");
//       }
//     } catch (err) {
//       console.error("Error during Redis pre-warm:", err);
//     }
//   };

// async function handlegetAllInfluencer(req,res){
//     try {
//         const cachedData = await redisClient.get("allInfluencers");

//     if (cachedData) {
//       console.log("Serving influencers from Redis cache");
//       return res.json(JSON.parse(cachedData));
//     }
//     const influencers = await influencerData.find();

//     // Cache the result for 1 hour (60 seconds)
//     await redisClient.setEx("allInfluencers", 60, JSON.stringify(influencers));

//     console.log("Fetched from DB and cached result");
//     res.json(influencers);
//       } catch (error) {
//         console.error("Error fetching influencers:", error);
//         res.status(500).json({ error: "Server error" });
//       }
//     };

async function handlegetAllInfluencer(req, res) {
    try {
      const influencers = await influencerData.find();
      console.log("Fetched from DB");
      res.json(influencers);
    } catch (error) {
      console.error("Error fetching influencers:", error);
      res.status(500).json({ error: "Server error" });
    }
  }

//get engagement rates
async function handleGetengagementrate(req, res) {
  try{
      const allEngagementRates = await engagementRate.find();
      console.log(allEngagementRates)
      res.status(200).json(allEngagementRates)
    }
    catch{
      console.error('Error fetching engagementrates:', error);
      res.status(500).json({ message: 'Failed to fetch engagementrates.' });
    }
}


// get followerSizes

async function handleGetfollowerSize(req, res) {
  try{
      const allfollowersizes = await followerSize.find();
      console.log(allfollowersizes)
      res.status(200).json(allfollowersizes)
    }
    catch{
      console.error('Error fetching allfollowersizes:', error);
      res.status(500).json({ message: 'Failed to fetch allfollowersizes.' });
    }
}

// get filtercosts

async function handleGetfiltercost(req, res) {
  try{
      const allfiltercosts = await filtercost.find();
      console.log(allfiltercosts)
      res.status(200).json(allfiltercosts)
    }
    catch{
      console.error('Error fetching allfiltercosts:', error);
      res.status(500).json({ message: 'Failed to fetch allfiltercosts.' });
    }
}

// UPDATE Influencer by ID
async function handleUpdateInfluencer(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Normalize arrays (if they come as strings)
    const normalizeArray = (input) =>
      typeof input === "string"
        ? input.split(",").map((item) => item.trim()).filter(Boolean)
        : Array.isArray(input)
        ? input
        : [];

    const updatedInfluencer = await influencerData.findByIdAndUpdate(
      id,
      {
        ...updatedData,
        SocialMediaPlatformLinks: normalizeArray(updatedData.SocialMediaPlatformLinks),
        InternalNotes: normalizeArray(updatedData.InternalNotes),
        NameofPastProjects: normalizeArray(updatedData.NameofPastProjects),
        DeliverablesforPastProjects: normalizeArray(updatedData.DeliverablesforPastProjects),
        OtherBrandsWorkedWith: normalizeArray(updatedData.OtherBrandsWorkedWith),
        ContentSampleLinks: normalizeArray(updatedData.ContentSampleLinks),
      },
      { new: true }
    );

    if (!updatedInfluencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    res.status(200).json({
      message: "Influencer updated successfully",
      data: updatedInfluencer,
    });
  } catch (error) {
    console.error("Error updating influencer:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


// DELETE Influencer by ID
async function handleDeleteInfluencer(req, res) {
  try {
    const { id } = req.params;

    const deletedInfluencer = await influencerData.findByIdAndDelete(id);

    if (!deletedInfluencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    res.status(200).json({
      message: "Influencer deleted successfully",
      data: deletedInfluencer
    });
  } catch (error) {
    console.error("Error deleting influencer:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


module.exports={handleGetAllusers, handleUserLogin,handlegetInstaInfluencer,handlesetInfluencer,handlegetAllInfluencer
  ,handlAdminSignup,handleGetengagementrate,handleGetfollowerSize,handleGetfiltercost,handleUpdateInfluencer,handleDeleteInfluencer};
