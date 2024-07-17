// RoadmapItem.js
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Switch,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import CustomInput from "../../CustomInput";
import ClearIcon from "../../ClearIcon";
import BtnChange from "../../BtnChange";
import IconBtn from "../../IconBtn";

const RoadmapItem = ({
  index,
  data,
  onChange,
  onDeletePoint,
  onDeleteItem,
  onToggleAchieved,
  onAddPoint,
  promptDeleteItem,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    const [fieldName2, index, pointIndex] = name.split("-");
    // console.log(fieldName2);
    const fieldName = name.replace(`-${index}`, ""); // Remove the index suffix

    if (fieldName2 === "point") {
      // If the field is a point, update it with the given value
      const updatedValue = [...data.points];
      updatedValue[pointIndex].point = value;
      onChange(index, "points", updatedValue);
    } else {
      // If the field is not a point, update it directly
      onChange(index, fieldName, value);
    }
  };

  const handleDelete = (pointIndex) => {
    onDeletePoint(index, pointIndex);
  };
  // console.log("data points:", data.points);
  return (
    <Accordion
      className="!border-0 !m-0 !p-0"
      sx={{
        boxShadow: "none",
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        className="!px-0 !mb-[28px] !pb-[18px] !min-h-0 flex items-center gap-3"
        expandIcon={<ExpandMoreIcon sx={{ color: "text.primary" }} />}
        sx={{
          borderBottom: "1px solid",
          borderColor: "primary.border",
          "& .MuiAccordionSummary-content": {
            margin: 0,
            gap: 3,
            alignItems: "center",
          },
        }}
      >
        <IconBtn
          // onClick={() => promptDeleteItem(index)}
          onClick={(e) => {
            e.stopPropagation(); // This will prevent the accordion from toggling
            promptDeleteItem(index);
          }}
          icon={<DeleteOutlineIcon fontSize="small" />}
          ToolTipTitle={"Delete Item"}
          IconSx={{
            padding: "4px",
            "& svg": {
              width: "18px",
              height: "18px",
            },
          }}
        />
        <Typography className="!m-0">Item {index + 1}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          margin: 0,
          padding: 0,
        }}
      >
        <Box className="grid mob-sm2:grid-cols-2 gap-[20px]">
          <CustomInput
            type={"text"}
            label={"Title"}
            inputName={`title-${index}`}
            value={data.title}
            handleChange={handleChange}
            inputBoxClasses="mob:!m-0 mob-sm2:!mb-6"
          />

          <CustomInput
            type={"text"}
            label={"Date"}
            inputName={`date-${index}`}
            value={data.date}
            handleChange={handleChange}
            placeholder="e.g 2024 April"
            inputProps={{
              startAdornment: (
                <InputAdornment position="start" className="!ml-3">
                  <CalendarTodayOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <CustomInput
          type={"textarea"}
          label={"Description"}
          inputName={`description-${index}`}
          value={data.description}
          handleChange={handleChange}
          placeholder="Write description here.."
        />

        {data.points.map((point, pointIndex) => (
          <Box className="relative pr-8" key={pointIndex}>
            <CustomInput
              type={"text"}
              label={`Point #${pointIndex + 1}`}
              inputName={`point-${index}-${pointIndex}`}
              value={point.point}
              handleChange={handleChange}
            />

            <ClearIcon
              Classes={"!absolute right-[4px] top-[67%] -translate-y-1/2 z-10"}
              onDelete={() => handleDelete(pointIndex)}
              ToolTipTitle="Delete point"
            />
          </Box>
        ))}
        <Box className="flex items-center gap-6 justify-between mb-8 flex-wrap">
          <Box
            display="flex"
            alignItems="center"
            className="gap-6 mob:order-2 tab:order-1"
          >
            <Switch
              checked={data.achieved}
              onChange={(e, newAchieved) =>
                onToggleAchieved(index, newAchieved)
              }
            />
            <Typography>Toggle as achieved</Typography>
          </Box>
          <Box className="mob:order-1 tab:order-2">
            <BtnChange
              icon={<AddIcon fontSize="small" />}
              onClick={() => onAddPoint(index)}
            >
              Add New Point
            </BtnChange>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default RoadmapItem;
