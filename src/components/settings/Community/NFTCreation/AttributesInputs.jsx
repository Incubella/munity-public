import { Box } from "@mui/material";
import CustomInput from "../../CustomInput";
import ClearIcon from "../../ClearIcon";
export default function AttributesInputs({
  attributetype,
  attributename,
  onChangeType,
  onChangeName,
  onDelete,
  includeImageUpload,
}) {
  return (
    <Box className="flex items-center gap-6 relative mob:flex-wrap biggerTab:flex-nowrap lap:flex-wrap desk:flex-nowrap justify-center lap:justify-start desk:justify-center">
      <CustomInput
        label="Attribute Type"
        type="text"
        inputName={"attributetype"}
        placeholder="Enter Attribute Type.."
        value={attributetype}
        handleChange={(e) => onChangeType(e.target.value)}
        inputBoxClasses="!mb-0 max-w-[217px]"
      />
      <CustomInput
        label="Attribute Name"
        type="text"
        inputName={"attributename"}
        placeholder="Enter Attribute Name.."
        value={attributename}
        handleChange={(e) => onChangeName(e.target.value)}
        inputBoxClasses="!mb-0 max-w-[217px]"
      />

      <ClearIcon
        Classes={`!absolute   lap:left-[468px] ${
          includeImageUpload
            ? "desk:left-[-28.1px] biggerTab:left-[-28.1px] mob:left-[-5px]"
            : " biggerTab:left-[-11px] desk:left-[-20px] mob:left-[-11px] mob-ssm:left-[11px] mob-sm:left-[-13px] mob-sm1:left-[-11px]"
        } top-[50%] -translate-y-1/2`}
        onDelete={onDelete}
        ToolTipTitle={"Delete Attribute"}
      />
    </Box>
  );
}
