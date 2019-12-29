export interface QuadtreeItem {
   x: number;
   y: number;
   // QuadtreeItem can has many properties
   [propName: string]: any;
}
