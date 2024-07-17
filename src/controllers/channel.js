const Community = require("../models/community");
import { ChannelSchemaJoi } from "@/schemas";

export const createChannel = async (req, res) => {
  const { id } = req.query;
  const channelData = req.body;

  const { error } = ChannelSchemaJoi.validate(channelData);
  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
  try {
    const community = await Community.findByIdAndUpdate(
      id,
      {
        $push: { channels: channelData },
      },
      { new: true }
    );
    // console.log(community);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }
    const createdChannel = community.channels.slice(-1)[0];
    if (createdChannel) {
      res.status(201).json({ success: true, data: createdChannel });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Channel not found after creation" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteChannel = async (req, res) => {
  const { id, channelId } = req.query;
  // console.log(req.query);
  try {
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    const channelToDelete = community.channels.find(
      (channel) => channel._id.toString() === channelId
    );

    if (!channelToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });
    }

    await Community.findByIdAndUpdate(
      id,
      { $pull: { channels: { _id: channelId } } },
      { new: true }
    );

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting a channel:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
