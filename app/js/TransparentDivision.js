import { keyboardPressed, setColor, cursor, toRad } from "./functions"
import { Troops } from "./Troops"
import * as d3 from 'd3-quadtree'
import { ctx } from "./init"

export class TransparentDivision {

   constructor(solders) {
      // TODO delete method
      this.rotateAngle = 0

      this.create(solders)
      
   }

   create(solders) {

      this.solders = []

      const soldersInLine = 25

      let y = -solders.length/2/soldersInLine*11
      let startX = -soldersInLine/2*11
      let maxX = soldersInLine/2*11
      let x = startX
      for (let i = 0; i < solders.length; i++) {
         this.solders.push({x: x, y: y, startX: x, startY: y})

         x += 11
         if (x >= maxX) {
            y+=11
            x = startX
         }

      }
      this.rotate()
      
   }

   rotate() {
      let a = toRad(this.rotateAngle)
      this.solders.forEach(solder => {
         solder.x = solder.startX * Math.cos(a) + solder.startY * Math.sin(a)
         solder.y = solder.startX * Math.sin(a) - solder.startY * Math.cos(a)
      })
   }

   draw() {
      if (!this.solders) return
      
      
      if (keyboardPressed.w) {
         //this.createTransparentDivision()
         this.rotateAngle += 3
         this.rotate()
      }

      setColor('rgba(0,0,255,0.5)')

      this.solders.forEach((solders) => {
         ctx.fillRect(solders.x+cursor.x, solders.y+cursor.y, 10, 10)
      })
   } 


   setMoving(solders) {
      if (!this.solders) return



      // Преобразуем оба массива в квадтрисы
      let transparentQuadtree = d3.quadtree()

      this.solders.forEach( (solder) => {      
         transparentQuadtree.add([solder.x, solder.y, solder])
      })


      // Вычиляем высотку массива
      let soldersQuadtree = d3.quadtree()
      let soldersBorders = {
         top: Infinity,
         bottom: 0
      }

      solders.forEach((solder) => {

         if (solder.y < soldersBorders.top) soldersBorders.top = solder.y
         if (solder.y > soldersBorders.bottom) soldersBorders.bottom = solder.y
      
         soldersQuadtree.add([solder.x, solder.y, solder])
      })




      let soldersHeigth = soldersBorders.bottom - soldersBorders.top

      let startY = soldersBorders.top
      let yNow = startY
      let transparentStart = -transparentQuadtree.find(-1000, -1000)[1]

      for (let i = 0; i < this.solders.length; i++) {


         let currentSolder = soldersQuadtree.find(0, yNow)

         
         let currentPlace = transparentQuadtree.find(-1000, currentSolder[1] - startY - transparentStart)

         let indexes = currentSolder[2].indexes
         Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index].setRotateTo(currentPlace[0]+cursor.x, currentPlace[1]+cursor.y)

         transparentQuadtree.remove(currentPlace)
         soldersQuadtree.remove(currentSolder)

         yNow+=11
         if (yNow >= soldersHeigth+startY+10) yNow=startY
         
      }


   }


}
