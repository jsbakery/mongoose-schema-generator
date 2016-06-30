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

var Collection = function () {
    function Collection(name) {
        _classCallCheck(this, Collection);

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

var Schema = function Schema(collectionName) {
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

    this.Types = Object.assign({ arrayOf: {} }, types);
    Object.keys(types).forEach(function (type) {
        if (type !== "Array") {
            _this2.Types.arrayOf[type] = "[" + types[type] + "]";
        }
    });

    collection.addKey("_id", types.ObjectId).appendTo(RenderTarget);
    this.collection = collection;
};

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
            console.info(["Start:", this.appName, this.version].join(" "));
            var schema = new _mongodb.Schema("Default Collection");
        }
    }]);

    return mongooseSchemaGenerator;
}();

var MSG = new mongooseSchemaGenerator(_config.appName);

window['$MSG'] = MSG;
MSG.start();
},{"./config.es6":1,"./mongodb.es6":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlnLmVzNiIsInNyYy9tb25nb2RiLmVzNiIsInNyYy9tb25nb29zZS1zY2hlbWEtZ2VuZXJhdG9yLmVzNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGFwcE5hbWUgPSAnbW9uZ29vc2Utc2NoZW1hLWdlbmVyYXRvcic7XG5cbmV4cG9ydHMuYXBwTmFtZSA9IGFwcE5hbWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIERPTVBhcmVudCA9ICQoXCIjTVNHLURPTS1TT1VSQ0VTXCIpO1xudmFyIFJlbmRlclRhcmdldCA9ICQoXCIjTVNHLWNvbGxlY3Rpb24tcmVuZGVyVGFyZ2V0XCIpO1xuXG52YXIgQ29sbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKG5hbWUpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbGxlY3Rpb24pO1xuXG4gICAgICAgIHZhciBzZWxlY3RvcnMgPSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uOiAnLk1TRy1jb2xsZWN0aW9uJyxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25OYW1lOiAnLk1TRy1jb2xsZWN0aW9uLXRpdGxlJyxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25LZXlMaXN0OiAnLk1TRy1jb2xsZWN0aW9uLWtleUxpc3QnLFxuICAgICAgICAgICAgY29sbGVjdGlvbktleTogJy5NU0ctY29sbGVjdGlvbi1rZXknLFxuICAgICAgICAgICAgY29sbGVjdGlvbktleU5hbWU6ICcuTVNHLWNvbGxlY3Rpb24ta2V5TmFtZScsXG4gICAgICAgICAgICBjb2xsZWN0aW9uS2V5VHlwZTogJy5NU0ctY29sbGVjdGlvbi1rZXlUeXBlJyxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25DbG9uZTogJy5NU0ctY29sbGVjdGlvbi1jbG9uZScsXG4gICAgICAgICAgICBjb2xsZWN0aW9uRGVsZXRlOiAnLk1TRy1jb2xsZWN0aW9uLWtleSdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgICAgICAgc2VsZWN0b3JzOiBzZWxlY3RvcnNcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fX2NvbGxlY3Rpb24gPSBET01QYXJlbnQuZmluZChzZWxlY3RvcnMuY29sbGVjdGlvbikuY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fX2NvbGxlY3Rpb25LZXkgPSBET01QYXJlbnQuZmluZChzZWxlY3RvcnMuY29sbGVjdGlvbktleSkuY2xvbmUoKTtcbiAgICAgICAgdGhpcy5fX2NvbGxlY3Rpb24uZmluZChzZWxlY3RvcnMuY29sbGVjdGlvbktleSkucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMubmFtZShuYW1lKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQ29sbGVjdGlvbiwgW3tcbiAgICAgICAga2V5OiBcImFkZEtleVwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkS2V5KG5hbWUsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBjb2xsZWN0aW9uS2V5ID0gdGhpcy5fX2NvbGxlY3Rpb25LZXkuY2xvbmUoKTtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25LZXkuZmluZCh0aGlzLl9jb25maWcuc2VsZWN0b3JzLmNvbGxlY3Rpb25LZXlOYW1lKS5odG1sKG5hbWUpO1xuICAgICAgICAgICAgY29sbGVjdGlvbktleS5maW5kKHRoaXMuX2NvbmZpZy5zZWxlY3RvcnMuY29sbGVjdGlvbktleVR5cGUpLmh0bWwodHlwZSk7XG4gICAgICAgICAgICB0aGlzLmRvbS5jb2xsZWN0aW9uS2V5TGlzdC5hcHBlbmQoY29sbGVjdGlvbktleSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcImFwcGVuZFRvXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBlbmRUbyh0YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX19jb2xsZWN0aW9uLmFwcGVuZFRvKHRhcmdldCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcIm5hbWVcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG5hbWUob3B0aW9uYWxOYW1lKSB7XG4gICAgICAgICAgICB2YXIgcmV0VmFsdWU7XG4gICAgICAgICAgICBpZiAob3B0aW9uYWxOYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb20uY29sbGVjdGlvbk5hbWUuaHRtbChvcHRpb25hbE5hbWUpO1xuICAgICAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmRvbS5jb2xsZWN0aW9uTmFtZS5odG1sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJkb21cIixcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgZG9tT2JqZWN0cyA9IHt9O1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fY29uZmlnLnNlbGVjdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IgPT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVRhcmdldCA9IF90aGlzLl9fY29sbGVjdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yID09ICdjb2xsZWN0aW9uS2V5TGlzdCcgfHwgc2VsZWN0b3IuaW5kZXhPZignY29sbGVjdGlvbktleScpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVRhcmdldCA9IF90aGlzLl9fY29sbGVjdGlvbi5maW5kKF90aGlzLl9jb25maWcuc2VsZWN0b3JzW3NlbGVjdG9yXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvbU9iamVjdHNbc2VsZWN0b3JdID0gZG9tVGFyZ2V0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZG9tT2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb2xsZWN0aW9uO1xufSgpO1xuXG52YXIgU2NoZW1hID0gZnVuY3Rpb24gU2NoZW1hKGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2NoZW1hKTtcblxuICAgIHZhciB0eXBlcyA9IHtcbiAgICAgICAgU3RyaW5nOiAnU3RyaW5nJyxcbiAgICAgICAgTnVtYmVyOiAnTnVtYmVyJyxcbiAgICAgICAgRGF0ZTogJ0RhdGUnLFxuICAgICAgICBCdWZmZXI6ICdCdWZmZXInLFxuICAgICAgICBCb29sZWFuOiAnQm9vbGVhbicsXG4gICAgICAgIE1peGVkOiAnU2NoZW1hLlR5cGVzLk1peGVkJyxcbiAgICAgICAgT2JqZWN0SWQ6ICdTY2hlbWEuVHlwZXMuT2JqZWN0SWQnLFxuICAgICAgICBBcnJheTogJ1tdJ1xuICAgIH0sXG4gICAgICAgIGNvbGxlY3Rpb24gPSBuZXcgQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG5cbiAgICB0aGlzLlR5cGVzID0gT2JqZWN0LmFzc2lnbih7IGFycmF5T2Y6IHt9IH0sIHR5cGVzKTtcbiAgICBPYmplY3Qua2V5cyh0eXBlcykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBpZiAodHlwZSAhPT0gXCJBcnJheVwiKSB7XG4gICAgICAgICAgICBfdGhpczIuVHlwZXMuYXJyYXlPZlt0eXBlXSA9IFwiW1wiICsgdHlwZXNbdHlwZV0gKyBcIl1cIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29sbGVjdGlvbi5hZGRLZXkoXCJfaWRcIiwgdHlwZXMuT2JqZWN0SWQpLmFwcGVuZFRvKFJlbmRlclRhcmdldCk7XG4gICAgdGhpcy5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcbn07XG5cbmV4cG9ydHMuU2NoZW1hID0gU2NoZW1hOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9jb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5lczYnKTtcblxudmFyIF9tb25nb2RiID0gcmVxdWlyZSgnLi9tb25nb2RiLmVzNicpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgbW9uZ29vc2VTY2hlbWFHZW5lcmF0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gbW9uZ29vc2VTY2hlbWFHZW5lcmF0b3IobmFtZSkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgbW9uZ29vc2VTY2hlbWFHZW5lcmF0b3IpO1xuXG4gICAgICAgIHRoaXMuYXBwTmFtZSA9IG5hbWUgKyAnIHdlYmFwcCc7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9ICcwLjAuMSc7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKG1vbmdvb3NlU2NoZW1hR2VuZXJhdG9yLCBbe1xuICAgICAgICBrZXk6ICdzdGFydCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhbXCJTdGFydDpcIiwgdGhpcy5hcHBOYW1lLCB0aGlzLnZlcnNpb25dLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgICAgIHZhciBzY2hlbWEgPSBuZXcgX21vbmdvZGIuU2NoZW1hKFwiRGVmYXVsdCBDb2xsZWN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIG1vbmdvb3NlU2NoZW1hR2VuZXJhdG9yO1xufSgpO1xuXG52YXIgTVNHID0gbmV3IG1vbmdvb3NlU2NoZW1hR2VuZXJhdG9yKF9jb25maWcuYXBwTmFtZSk7XG5cbndpbmRvd1snJE1TRyddID0gTVNHO1xuTVNHLnN0YXJ0KCk7Il19
