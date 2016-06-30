var DOMParent = $("#MSG-DOM-SOURCES");
var RenderTarget = $("#MSG-collection-renderTarget");
var Selectors = {
    collection: '.MSG-collection',
    collectionName: '.MSG-collection-title',
    collectionKeyList: '.MSG-collection-keyList',
    collectionKey: '.MSG-collection-key',
    collectionKeyName: '.MSG-collection-keyName',
    collectionKeyType: '.MSG-collection-keyType',
    collectionClone: '.MSG-collection-clone',
    collectionDelete: '.MSG-collection-delete'
};
var RefreshCollections = () => {
    var deleteButtons;
    deleteButtons = RenderTarget.find(Selectors.collectionDelete);
    if (deleteButtons.length == 1) {
        deleteButtons.prop("disabled", true);
    } else {
        deleteButtons.prop("disabled", false);
    }
};
class Collection {
    constructor(name) {
        this._config = {
            selectors: Selectors
        };
        this.__collection = DOMParent.find(Selectors.collection).clone();
        this.__collectionKey = DOMParent.find(Selectors.collectionKey).clone();
        this.__collection.find(Selectors.collectionKey).remove();
        this.name(name);
    }

    get dom() {
        var domObjects = {};
        Object.keys(this._config.selectors).forEach(selector => {
            var domTarget = null;
            if (selector == 'collection') {
                domTarget = this.__collection;
            } else if (selector == 'collectionKeyList' || selector.indexOf('collectionKey') == -1) {
                domTarget = this.__collection.find(this._config.selectors[selector]);
            }
            domObjects[selector] = domTarget;
        });
        return domObjects;
    }

    addKey(name, type) {
        var collectionKey = this.__collectionKey.clone();
        collectionKey.find(this._config.selectors.collectionKeyName).html(name);
        collectionKey.find(this._config.selectors.collectionKeyType).html(type);
        this.dom.collectionKeyList.append(collectionKey);
        return this;
    }

    appendTo(target) {
        this.__collection.appendTo(target);
        this.__target = target;
        return this;
    }

    name(optionalName) {
        var retValue;
        if (optionalName) {
            this.dom.collectionName.html(optionalName);
            retValue = this;
        } else {
            retValue = this.dom.collectionName.html();
        }
        return retValue;
    }

    copy(fromCollection) {
        this.name(fromCollection.name());
        this.__collection.remove();
        this.__collection = fromCollection.__collection.clone();
        this.__collection.appendTo(fromCollection.__target);
        return this;
    }
}

class Schema {
    constructor(collectionName) {
        var types = {
                String: 'String',
                Number: 'Number',
                Date: 'Date',
                Buffer: 'Buffer',
                Boolean: 'Boolean',
                Mixed: 'Schema.Types.Mixed',
                ObjectId: 'Schema.Types.ObjectId',
                Array: '[]'
            },
            collection = new Collection(collectionName);

        this.Name = collectionName;
        this.Types = Object.assign({arrayOf: {}}, types);
        this.collection = collection;

        Object.keys(types).forEach(type => {
            if (type !== "Array") {
                this.Types.arrayOf[type] = `[${types[type]}]`;
            }
        });
        collection.addKey("_id", types.ObjectId).appendTo(RenderTarget);
        collection.dom.collectionClone.off("click").on("click", () => this.clone());
        collection.dom.collectionDelete.off("click").on("click", () => this.remove());
        RefreshCollections();
    }

    clone() {
        var newSchema = new Schema(this.Name);
        newSchema.collection.copy(this.collection);
        newSchema.collection.dom.collectionClone.off("click").on("click", () => newSchema.clone());
        newSchema.collection.dom.collectionDelete.off("click").on("click", () => newSchema.remove());
        RefreshCollections();
        return newSchema;
    }

    name(optionalName) {
        var retVal;
        if (optionalName) {
            this.name = optionalName;
            this.collection.name(optionalName);
            retVal = this;
        } else {
            retVal = this.name;
        }
        return retVal;
    }

    remove() {
        this.collection.__collection.remove();
        RefreshCollections();
    }
}

export {Schema};