import {IAsset} from "./IAsset.js";

export interface IAssetLoader {

  readonly supportedExtensions: string[];

  loadAsset(assetName: string): IAsset;
  
}