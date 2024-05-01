/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        xl: "1208px",
        "2xl": "1208px",
      },
    },
    extend: {
      screens: {
        mob: "0",
        // => @media (min-width: 0 { ... }
        "mob-smalest": "300px",
        "mob-xs": "340px",
        "mob-ssm": "360px",
        // => @media (min-width: 360px) { ... }

        "mob-sm": "400px",
        // => @media (min-width: 400px) { ... }
        "mob-sm2": "450px",
        // => @media (min-width: 450px) { ... }
        "mob-sm1": "500px",
        // => @media (min-width: 500px) { ... }
        "mob-sm3": "550px",
        // => @media (min-width: 550px) { ... }

        tab: "640px",
        // => @media (min-width: 640px) { ... }
        biggerTab: "800px",
        // => @media (min-width: 640px) { ... }

        lap: "1024px",
        // => @media (min-width: 1024px) { ... }

        desk: "1281px",
        // => @media (min-width: 1280px) { ... }
        deskPd: "1320px",
        // => @media (min-width: 1320px) { ... }
        bigDesk: "1520px",
        // => @media (min-width: 1320px) { ... }
      },
      fontFamily: {
        munityfont: ["A2Z-Styra-A"],
      },
      colors: {
        graylight: "rgba(16, 17, 27, 0.20)",
        gray: "rgba(16, 17, 27, 0.20)",
        gray06: "rgba(16, 17, 27, 0.60)",
        gray01: "rgba(16, 17, 27, 0.10)",
        blackGray06: "rgba(232, 233, 244, 0.60)",
        darkModebg: "#14151D",
        mainCol: "#10111B",
        greenlight: "#B7D992",
        greenlightHover: "rgba(181, 217, 145, 0.8)",
        grayWhite: "#E8E9F4",
        blue01: "#34A4E0",
        bgLightBlue: "rgba(52, 164, 224, 0.05);",
      },
      width: {
        140: "140px",
        5: "20px",
      },
      height: {
        140: "140px",
        5: "20px",
      },
      maxWidth: {
        250: "250px",
        242: "242px",
      },
      margin: {
        215: "215px",
        260: "260px",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.175, 0.885, 0.32, 1.1)",
      },
      keyframes: {
        lightning: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        lightning: "lightning 1s ease-in-out",
      },
      styles: {
        "button, [type='button'], [type='reset'], [type='submit']": {
          "-webkit-appearance": "none",
          "background-color": "unset",
          "background-image": "unset",
        },
      },
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/aspect-ratio"),
    function ({ addBase, config }) {
      addBase({
        'button, [type="button"], [type="reset"], [type="submit"]': {
          "background-color": "inherit",
        },
      });
    },
  ],
  // corePlugins: {
  //   preflight: false, // Disables Tailwind's reset styles
  // },
};
