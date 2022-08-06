import { useEffect } from 'react';
import Phaser from 'phaser';
import { GridEngine } from 'grid-engine';

import { MainScene } from './scenes/MainScene';

export function Game() {
  async function initPhaser() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'game',
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#333333',
      render: {
        antialias: false,
      },
      scene: [MainScene],
      physics: {
        default: 'arcade',
      },
      plugins: {
        scene: [
          {
            key: 'gridEngine',
            plugin: GridEngine,
            mapping: 'gridEngine',
          },
        ],
      },
    };

    new Phaser.Game(config);
  }

  useEffect(() => {
    initPhaser();
  }, []);

  return <div id="game" />;
}
