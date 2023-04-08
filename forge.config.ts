import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerDeb } from '@electron-forge/maker-deb';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    icon: './src/assets/images/facsimile',
    extraResource:[
      './src/assets/images/facsimile.png',
      './src/assets/images/facsimile.gif',
      './src/assets/images/facsimile.ico',
    ]
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      iconUrl: 'https://raw.githubusercontent.com/srilakshmikanthanp/facsimile/main/assets/images/facsimile.ico',
      setupIcon: './src/assets/images/facsimile.ico',
      loadingGif: './src/assets/images/facsimile.gif',
    }),
    new MakerDeb({
      options: {
        homepage: 'https://github.com/srilakshmikanthanp/facsimile',
        icon: './src/assets/images/facsimile.png',
      },
    })
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/html/index.html',
            js: './src/render/index.tsx',
            name: 'main_window',
            preload: {
              js: './src/electron/preload/mainPreload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;