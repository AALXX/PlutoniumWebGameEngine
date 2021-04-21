import { IAssetLoader } from "./IAssetloader.js";
import { IAsset } from './IAsset.js';

export class AssetsManager {

  private static _loadders: IAssetLoader[] = [];
  private static _loaddedAssets: { [name: string]: IAsset } = {};
  
  constructor() {
    
  }

  public static initialize = (): void => {
    
  }

  public static registerLoadder = (loader: IAssetLoader): void =>{
    AssetsManager._loadders.push(loader);
  }

  public static loadAsset = (assetName: string): void => {
    
  }
  
  public static isAssetLoaded(assetName: string): boolean {

    return AssetsManager._loaddedAssets[assetName] !== undefined;
  }
  
  public static getAsset(assetName: string): IAsset {

    if (AssetsManager._loaddedAssets[assetName] !== undefined) {
      return AssetsManager._loaddedAssets[assetName];
    } else {
      AssetsManager.loadAsset(assetName);
    }
    return undefined;
    
  }
}