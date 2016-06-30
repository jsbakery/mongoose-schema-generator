(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var appName = 'mongoose-schema-generator';

exports.appName = appName;
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var RefreshCollections = function RefreshCollections() {
    var deleteButtons;
    deleteButtons = RenderTarget.find(Selectors.collectionDelete);
    if (deleteButtons.length == 1) {
        deleteButtons.prop("disabled", true);
    } else {
        deleteButtons.prop("disabled", false);
    }
};

var Collection = function () {
    function Collection(name) {
        _classCallCheck(this, Collection);

        this._config = {
            selectors: Selectors
        };
        this.__collection = DOMParent.find(Selectors.collection).clone();
        this.__collectionKey = DOMParent.find(Selectors.collectionKey).clone();
        this.__collection.find(Selectors.collectionKey).remove();
        this.name(name);
    }

    _createClass(Collection, [{
        key: "addKey",
        value: function addKey(name, type) {
            var collectionKey = this.__collectionKey.clone();
            collectionKey.find(this._config.selectors.collectionKeyName).html(name);
            collectionKey.find(this._config.selectors.collectionKeyType).html(type);
            this.dom.collectionKeyList.append(collectionKey);
            return this;
        }
    }, {
        key: "appendTo",
        value: function appendTo(target) {
            this.__collection.appendTo(target);
            this.__target = target;
            return this;
        }
    }, {
        key: "name",
        value: function name(optionalName) {
            var retValue;
            if (optionalName) {
                this.dom.collectionName.html(optionalName);
                retValue = this;
            } else {
                retValue = this.dom.collectionName.html();
            }
            return retValue;
        }
    }, {
        key: "copy",
        value: function copy(fromCollection) {
            this.name(fromCollection.name());
            this.__collection.remove();
            this.__collection = fromCollection.__collection.clone();
            this.__collection.appendTo(fromCollection.__target);
            return this;
        }
    }, {
        key: "dom",
        get: function get() {
            var _this = this;

            var domObjects = {};
            Object.keys(this._config.selectors).forEach(function (selector) {
                var domTarget = null;
                if (selector == 'collection') {
                    domTarget = _this.__collection;
                } else if (selector == 'collectionKeyList' || selector.indexOf('collectionKey') == -1) {
                    domTarget = _this.__collection.find(_this._config.selectors[selector]);
                }
                domObjects[selector] = domTarget;
            });
            return domObjects;
        }
    }]);

    return Collection;
}();

var Schema = function () {
    function Schema(collectionName) {
        var _this2 = this;

        _classCallCheck(this, Schema);

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
        this.Types = Object.assign({ arrayOf: {} }, types);
        this.collection = collection;

        Object.keys(types).forEach(function (type) {
            if (type !== "Array") {
                _this2.Types.arrayOf[type] = "[" + types[type] + "]";
            }
        });
        collection.addKey("_id", types.ObjectId).appendTo(RenderTarget);
        collection.dom.collectionClone.off("click").on("click", function () {
            return _this2.clone();
        });
        collection.dom.collectionDelete.off("click").on("click", function () {
            return _this2.remove();
        });
        RefreshCollections();
    }

    _createClass(Schema, [{
        key: "clone",
        value: function clone() {
            var newSchema = new Schema(this.Name);
            newSchema.collection.copy(this.collection);
            newSchema.collection.dom.collectionClone.off("click").on("click", function () {
                return newSchema.clone();
            });
            newSchema.collection.dom.collectionDelete.off("click").on("click", function () {
                return newSchema.remove();
            });
            RefreshCollections();
            return newSchema;
        }
    }, {
        key: "name",
        value: function name(optionalName) {
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
    }, {
        key: "remove",
        value: function remove() {
            this.collection.__collection.remove();
            RefreshCollections();
        }
    }]);

    return Schema;
}();

exports.Schema = Schema;
},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config.es6');

var _mongodb = require('./mongodb.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongooseSchemaGenerator = function () {
    function mongooseSchemaGenerator(name) {
        _classCallCheck(this, mongooseSchemaGenerator);

        this.appName = name + ' webapp';
        this.version = '0.0.1';
    }

    _createClass(mongooseSchemaGenerator, [{
        key: 'start',
        value: function start() {
            console.info('Start: ' + this.appName + ' ' + this.version);
            new _mongodb.Schema("Default Collection");
        }
    }]);

    return mongooseSchemaGenerator;
}();

var MSG = new mongooseSchemaGenerator(_config.appName);

window['$MSG'] = MSG;
MSG.start();
},{"./config.es6":1,"./mongodb.es6":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlnLmVzNiIsInNyYy9tb25nb2RiLmVzNiIsInNyYy9tb25nb29zZS1zY2hlbWEtZ2VuZXJhdG9yLmVzNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGFwcE5hbWUgPSAnbW9uZ29vc2Utc2NoZW1hLWdlbmVyYXRvcic7XG5cbmV4cG9ydHMuYXBwTmFtZSA9IGFwcE5hbWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIERPTVBhcmVudCA9ICQoXCIjTVNHLURPTS1TT1VSQ0VTXCIpO1xudmFyIFJlbmRlclRhcmdldCA9ICQoXCIjTVNHLWNvbGxlY3Rpb24tcmVuZGVyVGFyZ2V0XCIpO1xudmFyIFNlbGVjdG9ycyA9IHtcbiAgICBjb2xsZWN0aW9uOiAnLk1TRy1jb2xsZWN0aW9uJyxcbiAgICBjb2xsZWN0aW9uTmFtZTogJy5NU0ctY29sbGVjdGlvbi10aXRsZScsXG4gICAgY29sbGVjdGlvbktleUxpc3Q6ICcuTVNHLWNvbGxlY3Rpb24ta2V5TGlzdCcsXG4gICAgY29sbGVjdGlvbktleTogJy5NU0ctY29sbGVjdGlvbi1rZXknLFxuICAgIGNvbGxlY3Rpb25LZXlOYW1lOiAnLk1TRy1jb2xsZWN0aW9uLWtleU5hbWUnLFxuICAgIGNvbGxlY3Rpb25LZXlUeXBlOiAnLk1TRy1jb2xsZWN0aW9uLWtleVR5cGUnLFxuICAgIGNvbGxlY3Rpb25DbG9uZTogJy5NU0ctY29sbGVjdGlvbi1jbG9uZScsXG4gICAgY29sbGVjdGlvbkRlbGV0ZTogJy5NU0ctY29sbGVjdGlvbi1kZWxldGUnXG59O1xudmFyIFJlZnJlc2hDb2xsZWN0aW9ucyA9IGZ1bmN0aW9uIFJlZnJlc2hDb2xsZWN0aW9ucygpIHtcbiAgICB2YXIgZGVsZXRlQnV0dG9ucztcbiAgICBkZWxldGVCdXR0b25zID0gUmVuZGVyVGFyZ2V0LmZpbmQoU2VsZWN0b3JzLmNvbGxlY3Rpb25EZWxldGUpO1xuICAgIGlmIChkZWxldGVCdXR0b25zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbnMucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbnMucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICB9XG59O1xuXG52YXIgQ29sbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKG5hbWUpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbGxlY3Rpb24pO1xuXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgICAgICAgIHNlbGVjdG9yczogU2VsZWN0b3JzXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX19jb2xsZWN0aW9uID0gRE9NUGFyZW50LmZpbmQoU2VsZWN0b3JzLmNvbGxlY3Rpb24pLmNsb25lKCk7XG4gICAgICAgIHRoaXMuX19jb2xsZWN0aW9uS2V5ID0gRE9NUGFyZW50LmZpbmQoU2VsZWN0b3JzLmNvbGxlY3Rpb25LZXkpLmNsb25lKCk7XG4gICAgICAgIHRoaXMuX19jb2xsZWN0aW9uLmZpbmQoU2VsZWN0b3JzLmNvbGxlY3Rpb25LZXkpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLm5hbWUobmFtZSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKENvbGxlY3Rpb24sIFt7XG4gICAgICAgIGtleTogXCJhZGRLZXlcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEtleShuYW1lLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgY29sbGVjdGlvbktleSA9IHRoaXMuX19jb2xsZWN0aW9uS2V5LmNsb25lKCk7XG4gICAgICAgICAgICBjb2xsZWN0aW9uS2V5LmZpbmQodGhpcy5fY29uZmlnLnNlbGVjdG9ycy5jb2xsZWN0aW9uS2V5TmFtZSkuaHRtbChuYW1lKTtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25LZXkuZmluZCh0aGlzLl9jb25maWcuc2VsZWN0b3JzLmNvbGxlY3Rpb25LZXlUeXBlKS5odG1sKHR5cGUpO1xuICAgICAgICAgICAgdGhpcy5kb20uY29sbGVjdGlvbktleUxpc3QuYXBwZW5kKGNvbGxlY3Rpb25LZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJhcHBlbmRUb1wiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwZW5kVG8odGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9fY29sbGVjdGlvbi5hcHBlbmRUbyh0YXJnZXQpO1xuICAgICAgICAgICAgdGhpcy5fX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwibmFtZVwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbmFtZShvcHRpb25hbE5hbWUpIHtcbiAgICAgICAgICAgIHZhciByZXRWYWx1ZTtcbiAgICAgICAgICAgIGlmIChvcHRpb25hbE5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvbS5jb2xsZWN0aW9uTmFtZS5odG1sKG9wdGlvbmFsTmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuZG9tLmNvbGxlY3Rpb25OYW1lLmh0bWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImNvcHlcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvcHkoZnJvbUNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMubmFtZShmcm9tQ29sbGVjdGlvbi5uYW1lKCkpO1xuICAgICAgICAgICAgdGhpcy5fX2NvbGxlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9fY29sbGVjdGlvbiA9IGZyb21Db2xsZWN0aW9uLl9fY29sbGVjdGlvbi5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5fX2NvbGxlY3Rpb24uYXBwZW5kVG8oZnJvbUNvbGxlY3Rpb24uX190YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJkb21cIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgZG9tT2JqZWN0cyA9IHt9O1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fY29uZmlnLnNlbGVjdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IgPT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVRhcmdldCA9IF90aGlzLl9fY29sbGVjdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yID09ICdjb2xsZWN0aW9uS2V5TGlzdCcgfHwgc2VsZWN0b3IuaW5kZXhPZignY29sbGVjdGlvbktleScpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVRhcmdldCA9IF90aGlzLl9fY29sbGVjdGlvbi5maW5kKF90aGlzLl9jb25maWcuc2VsZWN0b3JzW3NlbGVjdG9yXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvbU9iamVjdHNbc2VsZWN0b3JdID0gZG9tVGFyZ2V0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZG9tT2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb2xsZWN0aW9uO1xufSgpO1xuXG52YXIgU2NoZW1hID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjaGVtYShjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2NoZW1hKTtcblxuICAgICAgICB2YXIgdHlwZXMgPSB7XG4gICAgICAgICAgICBTdHJpbmc6ICdTdHJpbmcnLFxuICAgICAgICAgICAgTnVtYmVyOiAnTnVtYmVyJyxcbiAgICAgICAgICAgIERhdGU6ICdEYXRlJyxcbiAgICAgICAgICAgIEJ1ZmZlcjogJ0J1ZmZlcicsXG4gICAgICAgICAgICBCb29sZWFuOiAnQm9vbGVhbicsXG4gICAgICAgICAgICBNaXhlZDogJ1NjaGVtYS5UeXBlcy5NaXhlZCcsXG4gICAgICAgICAgICBPYmplY3RJZDogJ1NjaGVtYS5UeXBlcy5PYmplY3RJZCcsXG4gICAgICAgICAgICBBcnJheTogJ1tdJ1xuICAgICAgICB9LFxuICAgICAgICAgICAgY29sbGVjdGlvbiA9IG5ldyBDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lKTtcblxuICAgICAgICB0aGlzLk5hbWUgPSBjb2xsZWN0aW9uTmFtZTtcbiAgICAgICAgdGhpcy5UeXBlcyA9IE9iamVjdC5hc3NpZ24oeyBhcnJheU9mOiB7fSB9LCB0eXBlcyk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG5cbiAgICAgICAgT2JqZWN0LmtleXModHlwZXMpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlICE9PSBcIkFycmF5XCIpIHtcbiAgICAgICAgICAgICAgICBfdGhpczIuVHlwZXMuYXJyYXlPZlt0eXBlXSA9IFwiW1wiICsgdHlwZXNbdHlwZV0gKyBcIl1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkS2V5KFwiX2lkXCIsIHR5cGVzLk9iamVjdElkKS5hcHBlbmRUbyhSZW5kZXJUYXJnZXQpO1xuICAgICAgICBjb2xsZWN0aW9uLmRvbS5jb2xsZWN0aW9uQ2xvbmUub2ZmKFwiY2xpY2tcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMyLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb2xsZWN0aW9uLmRvbS5jb2xsZWN0aW9uRGVsZXRlLm9mZihcImNsaWNrXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFJlZnJlc2hDb2xsZWN0aW9ucygpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhTY2hlbWEsIFt7XG4gICAgICAgIGtleTogXCJjbG9uZVwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICAgICAgICB2YXIgbmV3U2NoZW1hID0gbmV3IFNjaGVtYSh0aGlzLk5hbWUpO1xuICAgICAgICAgICAgbmV3U2NoZW1hLmNvbGxlY3Rpb24uY29weSh0aGlzLmNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgbmV3U2NoZW1hLmNvbGxlY3Rpb24uZG9tLmNvbGxlY3Rpb25DbG9uZS5vZmYoXCJjbGlja1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U2NoZW1hLmNsb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5ld1NjaGVtYS5jb2xsZWN0aW9uLmRvbS5jb2xsZWN0aW9uRGVsZXRlLm9mZihcImNsaWNrXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTY2hlbWEucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFJlZnJlc2hDb2xsZWN0aW9ucygpO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1NjaGVtYTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIm5hbWVcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG5hbWUob3B0aW9uYWxOYW1lKSB7XG4gICAgICAgICAgICB2YXIgcmV0VmFsO1xuICAgICAgICAgICAgaWYgKG9wdGlvbmFsTmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IG9wdGlvbmFsTmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24ubmFtZShvcHRpb25hbE5hbWUpO1xuICAgICAgICAgICAgICAgIHJldFZhbCA9IHRoaXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldFZhbCA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJyZW1vdmVcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbi5fX2NvbGxlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICBSZWZyZXNoQ29sbGVjdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBTY2hlbWE7XG59KCk7XG5cbmV4cG9ydHMuU2NoZW1hID0gU2NoZW1hOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9jb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5lczYnKTtcblxudmFyIF9tb25nb2RiID0gcmVxdWlyZSgnLi9tb25nb2RiLmVzNicpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgbW9uZ29vc2VTY2hlbWFHZW5lcmF0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gbW9uZ29vc2VTY2hlbWFHZW5lcmF0b3IobmFtZSkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgbW9uZ29vc2VTY2hlbWFHZW5lcmF0b3IpO1xuXG4gICAgICAgIHRoaXMuYXBwTmFtZSA9IG5hbWUgKyAnIHdlYmFwcCc7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9ICcwLjAuMSc7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKG1vbmdvb3NlU2NoZW1hR2VuZXJhdG9yLCBbe1xuICAgICAgICBrZXk6ICdzdGFydCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnU3RhcnQ6ICcgKyB0aGlzLmFwcE5hbWUgKyAnICcgKyB0aGlzLnZlcnNpb24pO1xuICAgICAgICAgICAgbmV3IF9tb25nb2RiLlNjaGVtYShcIkRlZmF1bHQgQ29sbGVjdGlvblwiKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBtb25nb29zZVNjaGVtYUdlbmVyYXRvcjtcbn0oKTtcblxudmFyIE1TRyA9IG5ldyBtb25nb29zZVNjaGVtYUdlbmVyYXRvcihfY29uZmlnLmFwcE5hbWUpO1xuXG53aW5kb3dbJyRNU0cnXSA9IE1TRztcbk1TRy5zdGFydCgpOyJdfQ==
