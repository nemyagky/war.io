Main branch is empty. The code is in refactoring and playground branches.

- Playground branch: rendering 2 million Three.js squares in 60fps
- Refactoring branch: A game where your troops fight another player's troops using socket.io (you need to have war.io-server running and the second tab open). In fact, you just have 10x100 squares. You can rotate and move them to different locations (they are always arranged 18th century style, in a straight line). If there are enemy troops nearby - each soldier will find the best enemy to attack. ```I use quadtree for this purpose```


I can't deploy it cause npm build command is not working and I'm kinda lazy to fix webpack configs
