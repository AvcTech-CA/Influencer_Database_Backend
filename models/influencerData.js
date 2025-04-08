const {type} = require('express/lib/response');
const mongoose = require('mongoose');

const influencerDataSchema= new mongoose.Schema({
  

    Photo:{
        type:String,
    },
  
    Name:{
        type:String,
    },
    Username:{
        type:String,
    },
    GeoLocation:{
        type:String,
    },

    Ethnicity:{
        type:String,
    },

    Religion:{
        type:String,
    },

    Language:{
        type:String,
    },

    FollowerSizeAndTier: {
        type: String,
    },

    EngagementRate: {
        type: String,
    },

    FollowerData: {
        type: String,
    },

    ProfileDescription: {
        type: String,
    },

    SocialMediaPlatformLinks: {
        type: [String],
    },

    CostRange: {
        type: String,
    },

    ContentNiche: {
        type: String,
    },

    AgencyorHandlerName: {
        type: String,
    },

    EmailAddress: {
        type: String,
    },

    HomeAddress: {
        type: String,
    },

    PhoneNumber: {
        type: String,
    },

    InternalNotes: {
        type: [String],
    },

    CampaignNumber: {
        type: String,
    },

    NameofPastProjects: {
        type: [String],
    },

    AVCBookedRate: {
        type: String,
    },

    DeliverablesforPastProjects: {
        type: [String],
    },

    MonthofAVCPastProjects: {
        type: String,
    },

    YearofAVCPastProjects: {
        type: String,
    },

    PostLinksofAVCPastProjects: {
        type: String,
    },

    SharedDrivePath: {
        type: String,
    },

    OtherBrandsWorkedWith: {
        type: [String],
    },

    ContentSampleLinks: {
        type: [String],
    },
})


const influencerData=mongoose.model("influencerData",influencerDataSchema);
module.exports=influencerData;