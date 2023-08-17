import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerDMG } from "@electron-forge/maker-dmg";
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './script/webpack.main.config';
import { rendererConfig } from './script/webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    "appVersion": "2023.08.17",
    "name": "Demo",
    "appCopyright": "",
    "icon": "./public/pack/icon/ICON",
    executableName: "Demo",
    osxSign: {
      optionsForFile: (filePath) => {
        return {
          entitlements: './entitlements.plist'
        }
      }
    }
  },
  rebuildConfig: {
  },
  makers: [
    new MakerZIP({},
        ['darwin', 'linux']),
    new MakerDeb(
        {
          options: {
            maintainer: '',
            homepage: '',
            icon: './public/pack/icon/ICON.svg'
          }
        }),
    new MakerDMG(
        {
          background: './public/pack/dmg_background.png',
          format: 'ULFO'
    }),
    new MakerSquirrel({
    }),
  ],
  plugins: [
    new WebpackPlugin({
      // @ts-ignore
      mainConfig,
      renderer: {
        // @ts-ignore
        config: rendererConfig,
        entryPoints: [
          {
            html: './public/template/index.html',
            js: './src/renderer/index.tsx',
            name: 'main_window',
            preload: {
              js: './src/renderer/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
