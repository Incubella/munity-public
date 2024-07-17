// RoadmapForm.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import RoadmapItem from "./RoadmapItem";
import BtnChange from "../../BtnChange";
import AddIcon from "@mui/icons-material/Add";

const RoadmapForm = ({
  addOrUpdateRoadmap,
  deleteRoadmap,
  creatorCommunityData,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogItemIndex, setDialogItemIndex] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [monthly, setMonthly] = useState("Monthly");
  const [roadmapData, setRoadmapData] = useState(
    creatorCommunityData.roadmaps.data || [
      {
        title: "",
        date: "",
        description: "",
        points: [{ point: "" }],
        achieved: false,
      },
    ]
  );

  const handleSwitchChange = async () => {
    const newType = monthly === "Monthly" ? "Quarterly" : "Monthly";
    setMonthly(newType);

    try {
      // Assuming your community ID is stored in `creatorCommunityData._id`
      // and your backend expects a PATCH request to update the roadmap type
      const response = await fetch(
        `/api/communities/${creatorCommunityData._id}/roadmaps`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: newType }),
        }
      );

      const data = await response.json();
      if (data.success) {
        console.log(`Roadmap type updated successfully to ${newType}`);
        // alert(`Roadmap type updated successfully to ${newType}`);
      } else {
        throw new Error(data.error || "Failed to update the roadmap type");
      }
    } catch (error) {
      console.error("Error updating the roadmap type:", error);
      alert("Error updating the roadmap type.");
    }
  };

  const handleRoadmapChange = (index, field, value, pointIndex) => {
    // console.log(index, field, value);
    const updatedRoadmap = [...roadmapData];
    if (field === "point") {
      // If the field is a point, update it with the given value
      const updatedValue = [...updatedRoadmap[index].points];
      updatedValue[pointIndex].point = value;
      updatedRoadmap[index].points = updatedValue;
    } else {
      // If the field is not a point, update it directly
      updatedRoadmap[index][field] = value;
    }
    updatedRoadmap[index].isModified = true;
    setRoadmapData(updatedRoadmap);
  };

  const handleToggleAchieved = (index, newAchieved) => {
    const updatedRoadmap = [...roadmapData];
    updatedRoadmap[index].achieved = newAchieved;
    setRoadmapData(updatedRoadmap);
  };

  const handleAddPoint = (index) => {
    const updatedRoadmap = [...roadmapData];
    updatedRoadmap[index].points.push({ point: "" });
    setRoadmapData(updatedRoadmap);
  };

  const handleDeletePoint = (roadmapIndex, pointIndex) => {
    const updatedRoadmap = [...roadmapData];
    updatedRoadmap[roadmapIndex].points.splice(pointIndex, 1);
    setRoadmapData(updatedRoadmap);
  };

  const promptDeleteItem = (index) => {
    setDialogItemIndex(index);
    setOpenDialog(true);
  };

  const handleDeleteItem = async () => {
    setOpenDialog(false);
    const item = roadmapData[dialogItemIndex];
    // console.log("item:", item);
    if (item._id) {
      // If the item has an ID, it exists in the database and should be deleted via API
      await deleteRoadmap(item._id);
      // Remove the item from the local state regardless of whether it's new or existing
      const updatedRoadmap = [...roadmapData];
      updatedRoadmap.splice(dialogItemIndex, 1);
      setRoadmapData(updatedRoadmap);
      setSnackbar({
        open: true,
        message: "Roadmap deleted successfully!",
        severity: "success",
      });
    }
  };

  const handleAddNewRoadmap = () => {
    setRoadmapData((prev) => [
      ...prev,
      {
        title: "",
        date: "",
        description: "",
        points: [{ point: "" }],
        achieved: false,
      },
    ]);
  };

  const handleSaveRoadmap = async () => {
    console.log("Saving Roadmap:", roadmapData);
    try {
      // for (const roadmap of roadmapData) {
      //   await addOrUpdateRoadmap(roadmap);
      // }

      // Use Promise.all to wait for all roadmaps to be processed
      const responses = await Promise.all(
        roadmapData.map((roadmap) => {
          // Only make the API call if the roadmap has been changed
          if (roadmap.isModified) {
            return addOrUpdateRoadmap(roadmap);
          }
          return Promise.resolve(null); // Resolve with null for unmodified roadmaps
        })
      );
      console.log("responses:", responses);
      // Filter out null responses and extract the roadmap data
      const updatedRoadmaps = responses
        .filter((response) => response !== null)
        .map((response) => response);
      console.log("updatedRoadmaps:", updatedRoadmaps[0]);

      // Update the state with the new roadmap data
      setRoadmapData(updatedRoadmaps[0]);

      setSnackbar({
        open: true,
        message: "Roadmap saved successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to save the roadmap.",
        severity: "error",
      });
    }
  };

  return (
    <Box>
      <Box className="flex items-center justify-between mt-8 mb-[29.5px] gap-4 flex-wrap">
        <Typography
          fontSize={{ mob: "18px", tab: "24px" }}
          fontWeight={"400 !important"}
          letterSpacing={"-0.48px"}
          lineHeight={"120%"}
          className=""
          color={"text.primary"}
        >
          Roadmap
        </Typography>

        <ToggleButtonGroup
          value={monthly}
          exclusive
          onChange={handleSwitchChange}
          sx={{
            borderRadius: "0",
            padding: "2px",
            backgroundColor: "background.primaryBtn",
            "& .MuiButtonBase-root": {
              border: "none",
              color: "text.primary",
            },
            "& .MuiButtonBase-root.Mui-selected": {
              backgroundColor: "text.primary",
              color: "primary.reversed",
              fontWeight: "300",
            },
          }}
        >
          <ToggleButton value="Monthly">Monthly</ToggleButton>
          <ToggleButton value="Quarterly">Quarterly</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {roadmapData.map((data, index) => (
        <RoadmapItem
          key={index}
          index={index}
          data={data}
          onChange={handleRoadmapChange}
          onDeletePoint={handleDeletePoint}
          onDeleteItem={handleDeleteItem}
          onToggleAchieved={handleToggleAchieved}
          onAddPoint={handleAddPoint}
          promptDeleteItem={promptDeleteItem}
        />
      ))}

      <Box className="flex justify-center gap-6 mob:mt-3 tab:mt-4 lap:mt-6 flex-wrap">
        <BtnChange
          icon={<AddIcon fontSize="small" />}
          onClick={handleAddNewRoadmap}
        >
          Add New Item
        </BtnChange>
        <BtnChange onClick={handleSaveRoadmap}>Save</BtnChange>
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        sx={{
          borderRadius: "0",
          ".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded": {
            borderRadius: "0",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this roadmap item?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteItem} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        sx={{
          borderRadius: "0",
        }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%", borderRadius: "0" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RoadmapForm;
