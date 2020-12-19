const express = require('express');
var router =express.Router();
const verify = require("../routes/verifyToken");

var Listing =require('../model/listing');
// Get All Listing
router.get('/get-listing',verify,async(req,res)=>{
    try {
        let GetListing = await Listing.find();
        res.status(200).send(GetListing);
      } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
      }
});

// Add All Listing
router.post('/add-listing',verify,async(req,res)=>{
     try {
        const listing = new Listing({
            'title':req.body.title,
            'price':req.body.price,
            'locality':req.body.locality,
            'details':req.body.details
        });
        console.log('before save');
        let saveListing = await listing.save(); //when fail its goes to catch
        console.log(saveListing); //when success it print.
        console.log('after save');
        res.status(201).send(saveListing);
      } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
      }
});

// single listing
router.get('/:listingid',verify, async(req,res)=>{
    try {
        let GetListingID = await Listing.findById(req.params.listingid);
        res.status(200).send(GetListingID);
      } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
      }
  
});

// Update listing
router.put("/:listingId",verify, async (req, res) => {
    try {
      const listing = {
        title: req.body.title,
        price: req.body.price,
        locality: req.body.locality,
        details: req.body.details
      };
  
      const updatedListing = await Listing.findByIdAndUpdate(
        { _id: req.params.listingId },
        listing
      );
      res.status(200).send(updatedListing);
    } catch (error) {
      res.json({ message: error });
    }
  });

// Delete listing
router.delete("/:listingId",verify, async (req, res) => {
    try {
      const removeListing = await Listing.findByIdAndDelete(req.params.listingId);
      res.status(203).json(removeListing);
    } catch (error) {
      res.json({ message: error });
    }
  });
module.exports =router;