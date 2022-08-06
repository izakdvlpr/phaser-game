import Phaser from 'phaser';
import { Direction } from 'grid-engine';
import type { GridEngine, GridEngineConfig } from 'grid-engine';

export class MainScene extends Phaser.Scene {
  gridEngine!: GridEngine;

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('tiles', 'images/cloud_tileset.png');
    this.load.tilemapTiledJSON('cloud-city-map', 'images/cloud_city.json');
    this.load.spritesheet('player', 'images/characters.png', {
      frameWidth: 52,
      frameHeight: 72,
    });
  }

  create() {
    if (!this.gridEngine) return;

    const cloudCityTilemap = this.make.tilemap({ key: 'cloud-city-map' });
    cloudCityTilemap.addTilesetImage('Cloud City', 'tiles');

    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap.createLayer(i, 'Cloud City', 0, 0);
      layer.scale = 3;
    }

    const playerSprite = this.add.sprite(0, 0, 'player');
    playerSprite.scale = 1.5;

    this.cameras.main.startFollow(playerSprite, true);
    this.cameras.main.setFollowOffset(
      -playerSprite.width,
      -playerSprite.height,
    );

    const npcSprite = this.add.sprite(0, 0, 'player');
    npcSprite.scale = 1.5;

    const npcSprite1 = this.add.sprite(0, 0, 'player');
    npcSprite1.scale = 1.5;

    const npcSprite2 = this.add.sprite(0, 0, 'player');
    npcSprite2.scale = 1.5;

    const gridEngineConfig: GridEngineConfig = {
      characters: [
        {
          id: 'player',
          sprite: playerSprite,
          walkingAnimationMapping: 6,
          startPosition: { x: 8, y: 8 },
        },
        {
          id: 'npc0',
          sprite: npcSprite,
          walkingAnimationMapping: 0,
          startPosition: { x: 5, y: 5 },
          speed: 3,
        },
        {
          id: 'npc1',
          sprite: npcSprite1,
          walkingAnimationMapping: 1,
          startPosition: { x: 10, y: 10 },
        },
        {
          id: 'npc2',
          sprite: npcSprite2,
          walkingAnimationMapping: 3,
          startPosition: { x: 5, y: 10 },
          speed: 2,
        },
      ],
    };

    this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

    this.gridEngine.moveRandomly('npc0');
    this.gridEngine.moveRandomly('npc1', 500);
    this.gridEngine.moveRandomly('npc2', 1500);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.gridEngine.move('player', Direction.LEFT);
    } else if (cursors.right.isDown) {
      this.gridEngine.move('player', Direction.RIGHT);
    } else if (cursors.up.isDown) {
      this.gridEngine.move('player', Direction.UP);
    } else if (cursors.down.isDown) {
      this.gridEngine.move('player', Direction.DOWN);
    }
  }
}
