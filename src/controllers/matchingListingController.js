const { MatchingListing, User, Pet, Profile } = require("../models");


exports.createMatchingListing = async (req, res) => {
    try {
        const { petId, status } = req.body;
        const userId = req.userId; // Extract userId from the authenticated request

        if (!petId || !status) {
            return res.status(400).json({ error: "PetId and status are required" });
        }

        console.log(userId, petId, status);

        // Create a new matching listing
        const newListing = await MatchingListing.create({ userId, petId, status });

        res.status(201).json(newListing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create matching listing" });
    }
};


// Get all MatchingListings
  exports.getAllMatchingListings = async (req, res) => {
    try {
      // Fetch all matching listings with associated owner (User) and pet (Pet), also including the user's profile
      const listings = await MatchingListing.findAll({
        include: [
          {
            model: User,
            as: "owner",
            attributes: ['email'],
            include: [
              {
                model: Profile,  // Include the profile associated with the user
                as: "profile",   // The alias you defined in the User model association
                attributes: ['firstName', 'organisationName', "profilePicture", "address", "phoneNumber"] // Adjust this to include the relevant profile attributes
              }
            ]
          },
          { model: Pet, as: "pet" }
        ],
      });
  

  
      res.status(200).json(listings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch matching listings" });
    }
  };


exports.getMatchingListingByPetId = async (req, res) => {

  try {
    const { id } = req.params; // Get petId from request parameters
    const userId = req.userId; // Get userId from request parameters

    const listing = await MatchingListing.findOne({
      where: { petId: id, userId: userId}, // Search by petId
});

    // If no listing is found, return 404
    if (!listing) {
      return res.status(404).json({ error: "Matching listing not found for this petId." });
    }

    // Return the found listing
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching matching listing by petId:", error);
    res.status(500).json({ error: "Failed to fetch matching listing by petId." });
  }
};


// Get a single MatchingListing by ID
exports.getMatchingListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await MatchingListing.findByPk(id, {
      include: [
        { model: User, as: "owner" },
        { model: Pet, as: "pet" },
      ],
    });

    if (!listing) {
      return res.status(404).json({ error: "Matching listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch matching listing" });
  }
};

// Update a MatchingListing 
  exports.updateMatchingListing = async (req, res) => {
    try {
      const { id } = req.params; // Get petId from request parameters
      const updateData = req.body; // Get the updated data from the request body
  
      console.log("Updating listing for petId:", id);
  
      // Find the listing by petId
      const listing = await MatchingListing.findOne({
        where: { petId: id },
      });
  
      // If no listing is found, return 404
      if (!listing) {
        return res.status(404).json({ error: "Matching listing not found for this petId." });
      }
  
      // Update the listing with the new data
      await listing.update(updateData);
  
      // Return the updated listing
      res.status(200).json({ message: "Matching listing updated successfully", listing });
    } catch (error) {
      console.error("Error updating matching listing by petId:", error);
      res.status(500).json({ error: "Failed to update matching listing by petId." });
    }
  };
  

// Delete a MatchingListing
exports.deleteMatchingListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await MatchingListing.findByPk(id);

    if (!listing) {
      return res.status(404).json({ error: "Matching listing not found" });
    }

    await listing.destroy();
    res.status(204).json({ message: "Matching listing deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete matching listing" });
  }
};