var bg1,bg2,cody,cursors,crossKey, buttonA, buttonB, buttonleft, buttonright, buttonup, buttondown, Ybtn, upBtn;
var SCALE = 2.0;
var SPEED = 180;
var bounds;
var handlePointerDown;
var left, right, up, down = false;
var punch = false;
var jump = false;
var jump_tween;
var frame = 0;

var state = {
   
    preload: function() {
        game.load.atlas("cody_atlas","../assets/cody_spritesheet.png", "../assets/cody_spritesheet.json");
        game.load.image("forward", "../assets/Slum1-1.png");
        game.load.image("back", "../assets/Slum1-2.png");
        game.load.spritesheet("buttonvertical", "../assets/buttons/button-vertical.png", 64,64);
        game.load.spritesheet("buttonhorizontal", "../assets/buttons/button-horizontal.png", 96,64);
        game.load.spritesheet("buttondiagonal", "../assets/buttons/button-diagonal.png", 64,64);
        game.load.spritesheet("buttonA", "../assets/buttons/button-round-a.png", 96,96);
        game.load.spritesheet("buttonB", "../assets/buttons/button-round-b.png", 96,96);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.world.setBounds(0, 0, 1424*SCALE, 256*SCALE);
        // bg1.scale.set(SCALE,SCALE);
        bg2 = game.add.sprite(0, 0, "forward");
        bg2.scale.set(SCALE,SCALE);
        
        cody = game.add.sprite(201, 300, "cody_atlas");
        cody.frameName = "cody_35";
        cody.scale.set(3);
        game.physics.p2.enable(cody);
        cody.body.fixedRotation=true; //don't rotate
        
        cody.animations.add("walk", Phaser.Animation.generateFrameNames('cody_', 6, 11, '', 2));
        // cody.animations.add("punch", Phaser.Animation.generateFrameNames('cody_', 28, 29, '', 2));
        
        jump_tween = game.add.tween(cody).to({y: cody.body.y - 100}, 1500, Phaser.Easing.Linear.None);
        jump_tween.onComplete.add(function(){jump=false;});
        
        // punch_anim = new Phaser.Animation(this, cody, "punch", cody.animations.frameData, ["cody_28", "cody_29", "cody_28"], 10, false, false);
        // cody.animations.add("punch", punch_anim);
        // cody.animations.play("walk", 5, true);
        game.camera.follow(cody);
        cursors = game.input.keyboard.createCursorKeys();
        
        // Create virtual controller
        buttonA = game.add.button(600, 400, 'buttonA', null, this, 0, 1, 0, 1);
        buttonA.fixedToCamera = true;
        buttonA.events.onInputOver.add(function(){punch=true;});
        // buttonA.events.onInputOut.add(function(){punch=false;});
        buttonA.events.onInputDown.add(function(){punch=true;});
        // buttonA.events.onInputUp.add(function(){punch=false;});
        
        buttonB = game.add.button(700, 400, 'buttonB', null, this, 0, 1, 0, 1);
        buttonB.fixedToCamera = true;
        buttonB.events.onInputOver.add(function(){jump=true;});
        // buttonB.events.onInputOut.add(function(){jump=false;});
        buttonB.events.onInputDown.add(function(){jump=true;});
        // buttonB.events.onInputUp.add(function(){jump=false;});
        
        buttonleft = game.add.button(0, 372, 'buttonhorizontal', null, this, 0, 1, 0, 1);
        buttonleft.fixedToCamera = true;
        buttonleft.events.onInputOver.add(function(){left=true;});
        buttonleft.events.onInputOut.add(function(){left=false;});
        buttonleft.events.onInputDown.add(function(){left=true;});
        buttonleft.events.onInputUp.add(function(){left=false;});
        
        buttonright = game.add.button(160, 372, 'buttonhorizontal', null, this, 0, 1, 0, 1);
        buttonright.fixedToCamera = true;
        buttonright.events.onInputOver.add(function(){right=true;});
        buttonright.events.onInputOut.add(function(){right=false;});
        buttonright.events.onInputDown.add(function(){right=true;});
        buttonright.events.onInputUp.add(function(){right=false;});
        
        buttondown = game.add.button(96, 436, 'buttonvertical', null, this, 0, 1, 0, 1);
        buttondown.fixedToCamera = true;
        buttondown.events.onInputOver.add(function(){down=true;});
        buttondown.events.onInputOut.add(function(){down=false;});
        buttondown.events.onInputDown.add(function(){down=true;});
        buttondown.events.onInputUp.add(function(){down=false;});
        
        buttonup = game.add.button(96, 436-128, 'buttonvertical', null, this, 0, 1, 0, 1);
        buttonup.fixedToCamera = true;
        buttonup.events.onInputOver.add(function(){up=true;});
        buttonup.events.onInputOut.add(function(){up=false;});
        buttonup.events.onInputDown.add(function(){up=true;});
        buttonup.events.onInputUp.add(function(){up=false;});
        
    },
    update: function() {
        if (left )
        {
            if(cody.x > 200 ){
                cody.scale.x = -3;
                cody.body.moveLeft(SPEED);
                cody.animations.play("walk", 6, true);
            }
            else{
                cody.body.moveRight(SPEED);
            }
        }
        else if (right )
        {
            if( cody.x < 2375){
                cody.scale.x = 3;
                cody.body.moveRight(SPEED);
                cody.animations.play("walk", 6);
            }
            else{
                cody.body.moveLeft(SPEED);
            }
        }
        else if (up)
        {
            if(cody.y > 264 ){
                cody.body.moveUp(SPEED * 0.8);
                cody.animations.play("walk", 6);
            }
            else{
                cody.body.moveDown(SPEED);
            }
        }
        else if (down)
        {
            if( cody.y < 367){
                cody.body.moveDown(SPEED * 0.8);
                cody.animations.play("walk", 6);
            }
            else{
                cody.body.moveUp(SPEED);
            }
        }
        else if(punch)
        {
            // anim = cody.animations.play("punch", 13, false);
            // anim.delay = 550;
            // anim.onComplete.add(function(){punch = false;}, cody);
            cody.frameName = "cody_28";
            frame += 1;
            if (frame > 2){
                cody.frameName = "cody_29";
            }
            if(frame > 10){
                punch = false;
                frame = 0;
            }
        }
        else if(jump)
        {
           jump_tween.start();
        }
        else
        {
            cody.frameName = "cody_35";
            cody.body.setZeroVelocity();
        }
    },
    render: function() {
        game.debug.spriteCoords(cody, 32, 50);
        game.debug.text("punch " + punch, 32, 100);
        
        
    }
};

// function onClick_punch() {
//     punch = true;
//     if(punch){
//         punch_animation = cody.animations.play("punch", 9, false);
//         punch_animation.onComplete.add(function(){punch = false;}, cody)
//         }
//     }

var game = new Phaser.Game(
    800,
    256 * SCALE,
    Phaser.AUTO,
    'game',
    state
);
