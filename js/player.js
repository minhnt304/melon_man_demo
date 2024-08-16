game.player = {
  x: 54,
  y: 0,
  height: 24,
  highestY: 0,
  direction: "left",
  isInAir: false,
  startedJump: false,
  jumpCount: 0,
  moveLeftInterval: null,
  moveRightInterval: null,
  fallInterval: null,
  fallTimeout: function (startingY, time, maxHeight) {
    this.fallInterval = setInterval(
      function () {
        if (this.isInAir) {
          this.y = startingY - maxHeight + Math.pow(-time / 3 + 11, 2);
          if (this.y < this.highestY) {
            this.highestY = this.y;
          }
          if (time > 37) {
            this.startedJump = false;
            if (game.checkCollisions()) {
              this.isInAir = false;
              this.y =
                Math.round(this.y / game.options.tileHeight) *
                game.options.tileHeight;
              this.jumpCount = 0;
            }
          }
          if (time < 150) {
            time++;
          } else {
            game.isOver = true;
          }
          if (this.y > game.canvas.height) {
            game.isOver = true;
          }
          game.requestRedraw();
        }
      }.bind(this),
      12
    );
  },
  animationFrameNumber: 0,
  collidesWithGround: true,
  animations: {
    // Describe coordinates of consecutive animation frames of objects in textures
    left: [
      { tileColumn: 4, tileRow: 0 },
      { tileColumn: 5, tileRow: 0 },
      { tileColumn: 4, tileRow: 0 },
      { tileColumn: 6, tileRow: 0 },
    ],
    right: [
      { tileColumn: 9, tileRow: 0 },
      { tileColumn: 8, tileRow: 0 },
      { tileColumn: 9, tileRow: 0 },
      { tileColumn: 7, tileRow: 0 },
    ],
  },
  jump: function (type) {
    if (!this.isInAir || this.jumpCount < 2) {
      clearInterval(this.fallInterval);
      this.isInAir = true;
      this.startedJump = true;
      this.jumpCount = this.isInAir ? this.jumpCount + 1 : 1;
      var startingY = this.y;
      var time = 1;
      var maxHeight = 121;
      if (type === "fall") {
        time = 30;
        maxHeight = 0;
      }
      this.fallTimeout(startingY, time, maxHeight);
    }
  },
};
