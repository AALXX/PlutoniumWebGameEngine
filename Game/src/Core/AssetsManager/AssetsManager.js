export class AssetsManager {
    constructor() {
    }
    static isAssetLoaded(assetName) {
        return AssetsManager._loaddedAssets[assetName] !== undefined;
    }
    static getAsset(assetName) {
        if (AssetsManager._loaddedAssets[assetName] !== undefined) {
            return AssetsManager._loaddedAssets[assetName];
        }
        else {
            AssetsManager.loadAsset(assetName);
        }
        return undefined;
    }
}
AssetsManager._loadders = [];
AssetsManager._loaddedAssets = {};
AssetsManager.initialize = () => {
};
AssetsManager.registerLoadder = (loader) => {
    AssetsManager._loadders.push(loader);
};
AssetsManager.loadAsset = (assetName) => {
};
