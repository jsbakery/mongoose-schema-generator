var DOMParent = $("#MSG-DOM-SOURCES");
var RenderTarget = $("#MSG-collection-renderTarget");
class Collection {
    constructor(name) {
        var selectors = {
            collection: '.MSG-collection',
            collectionName: '.MSG-collection-title',
            collectionKeyList: '.MSG-collection-keyList',
            collectionKey: '.MSG-collection-key',
            collectionKeyName: '.MSG-collection-keyName',
            collectionKeyType: '.MSG-collection-keyType',
            collectionClone: '.MSG-collection-clone',
            collectionDelete: '.MSG-collection-key'
        };
        this._config = {
            selectors: selectors
        };
        this.__collection = DOMParent.find(selectors.collection).clone();
        this.__collectionKey = DOMParent.find(selectors.collectionKey).clone();
        this.__collection.find(selectors.collectionKey).remove();
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

        this.Types = Object.assign({arrayOf: {}}, types);
        Object.keys(types).forEach(type => {
            if (type !== "Array") {
                this.Types.arrayOf[type] = `[${types[type]}]`;
            }
        });

        collection.addKey("_id", types.ObjectId).appendTo(RenderTarget);
        this.collection = collection;
    }
}

export {Schema};