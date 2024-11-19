const { MatchingListing, User, Pet, Profile } = require("../models");
const { Op } = require("sequelize");


exports.createMatchingListing = async (req, res) => {
    try {
        const { petId, status } = req.body;
        const userId = req.userId;

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


// Get all MatchingListings with filters (excluding species from scoring)
exports.getAllMatchingListings = async (req, res) => {
  try {
    const { species, breed, gender, address, colors, age } = req.query;
    const userId = req.userId;

    // Ensure species is provided (mandatory filter)
    if (!species) {
      return res.status(400).json({ error: "Species filter is required." });
    }

    // Build the filter criteria based on query parameters (species is mandatory)
    const whereClause = { species }; // Only include species in whereClause initially
    const scoreWeights = { breed: 10, gender: 11, colors: 10, address: 12, age: 10 }; // Weights for scoring system

    // Fetch matching listings with associated owner (User) and pet (Pet)
    const listings = await MatchingListing.findAll({
      where: {
        status: "Available", // Only include listings with status "Available"
      },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["email"],
          where: {
            id: {
              [Op.ne]: userId  // Exclude listings by the current user
            }
          },
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: [
                "firstName",
                "address"
              ],
            },
          ],
        },
        {
          model: Pet,
          as: "pet",
          where: whereClause, // Apply species filter 
        },
      ],
      order: [["pet", "score", "DESC"]], // Initially order by predefined score
    });

    // Calculate additional score based on matched filters (excluding species)
    const scoredListings = listings.map((listing) => {
      let score = listing.pet.score || 0;

      if (breed && listing.pet.breed === breed) score += scoreWeights.breed;
      if (gender && listing.pet.gender === gender) score += scoreWeights.gender;
      if (colors && listing.pet.colors?.includes(colors)) score += scoreWeights.colors;
      if (address && listing.owner?.profile?.address === address) score += scoreWeights.address;
      if (age && listing.pet.age == age) score += scoreWeights.age;

      listing.pet.score = score;
      return listing;
    });

    // Sort listings by the new calculated score
    scoredListings.sort((a, b) => b.pet.score - a.pet.score);

    res.status(200).json(scoredListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch matching listings" });
  }
};


/// Dedicated to current user to get the data of the pets that are currently listed by the user
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


// Get a single MatchingListing by ID of the other user
exports.getMatchingListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await MatchingListing.findByPk(id, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["email"],
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: [
                "firstName",
                "address",
                "profilePicture"
              ],
            },
          ],
        },
        {
          model: Pet,
          as: "pet",
        },
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
