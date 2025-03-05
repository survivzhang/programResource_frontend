// src/theme/palette.ts

// 定义调色板配置
export const palette = {
  primary: {
    main: '#C19A9A',
    light: 'FFFFFF',
    dark: '#000000',
  },
  secondary: {
    main: '#483A62',
    light: '#BC8F11',
    dark: '#000000',
  },
  custom: {
    color1: '#EBB7D2',
    color2: '#CDDECC',
    color3: '#7FD0DB',
    color4: '#D9D9D9',
  },
} as const;

// TypeScript 类型声明
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      color1: string;
      color2: string;
      color3: string;
      color4: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      color1: string;
      color2: string;
      color3: string;
      color4: string;
    };
  }
}
