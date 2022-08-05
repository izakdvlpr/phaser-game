import { MainScene } from './scenes/MainScene.js';

const gameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#333333',
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: [MainScene],
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

new Phaser.Game(gameConfig);
