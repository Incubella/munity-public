const Community = require("../models/community");
import { RoadmapSchemaJoi } from "@/schemas";

export const addOrUpdateRoadmap = async (req, res) => {
  const { id } = req.query;
  const roadmapData = req.body; // roadmapData should include the roadmap items and their points
  console.log("roadmapData:", roadmapData);
  const { error } = RoadmapSchemaJoi.validate(roadmapData);
  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
  try {
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    // Find the roadmap item within the community's roadmaps.data array
    let roadmapIndex = community.roadmaps.data.findIndex(
      (roadmap) => roadmap._id.toString() === roadmapData._id
    );

    if (roadmapIndex !== -1) {
      // Update existing roadmap item
      community.roadmaps.data[roadmapIndex] = roadmapData;
    } else {
      // Add new roadmap item to the data array
      community.roadmaps.data.push(roadmapData);
    }

    await community.save();
    res.status(200).json({ success: true, data: community.roadmaps });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteRoadmap = async (req, res) => {
  const { id, roadmapItemId } = req.query; // Assuming these are the community ID and the roadmap item ID respectively
  try {
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    // Locate the folder to be deleted
    const roadmapToDelete = community.roadmaps.data.find(
      (roadmap) => roadmap._id.toString() === roadmapItemId
    );
    if (!roadmapToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Roadmap not found" });
    }

    await Community.findByIdAndUpdate(
      id,
      { $pull: { "roadmaps.data": { _id: roadmapItemId } } },
      { new: true }
    );
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Assuming your Community model has a field called `roadmapType`
export const updateRoadmapType = async (req, res) => {
  const { id } = req.query; // Assuming communityId comes from the query
  const { type } = req.body; // The new roadmap type
  try {
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    community.roadmaps.type = type; // Update the roadmap type
    await community.save();

    res.json({ success: true, message: `Roadmap type updated to ${type}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};
