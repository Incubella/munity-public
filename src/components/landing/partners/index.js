/* eslint-disable import/no-anonymous-default-export */
import { Box } from "@mui/material";
import Image from "next/legacy/image";
import { partners } from "../../../../public";

const images = [
  partners.abper,
  partners.evianto,
  partners.agillian,
  partners.morga,
  partners.blogkio,
  partners.barney,
];

export default function Partners() {
  return (
    <Box className="flex ai-ce fj-sb" sx={{ px: "7rem", pb: "3rem" }}>
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`partner-${index}`} // Consider using a more descriptive alt text if possible
          width={90} // Set the desired size
          height={45}
        />
      ))}
    </Box>
  );
}
