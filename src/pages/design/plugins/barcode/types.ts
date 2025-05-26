import { BaseLayer } from "@/typings/core";

export interface BarcodeLayer extends BaseLayer {
  type: 'barcode';
  flipX: boolean;
  flipY: boolean;
  width: number;
  height: number;
  content: string;
  color: string;
  cornerRadius: [number, number, number, number];
}