/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.proto = (function() {
    
        /**
         * Namespace proto.
         * @exports proto
         * @namespace
         */
        var proto = {};
    
        /**
         * MessageType enum.
         * @name proto.MessageType
         * @enum {number}
         * @property {number} MESSAGE=0 MESSAGE value
         * @property {number} ONLINE_COUNT=1 ONLINE_COUNT value
         * @property {number} SYSTEM=2 SYSTEM value
         * @property {number} JOIN=3 JOIN value
         * @property {number} LEAVE=4 LEAVE value
         */
        proto.MessageType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MESSAGE"] = 0;
            values[valuesById[1] = "ONLINE_COUNT"] = 1;
            values[valuesById[2] = "SYSTEM"] = 2;
            values[valuesById[3] = "JOIN"] = 3;
            values[valuesById[4] = "LEAVE"] = 4;
            return values;
        })();
    
        proto.ChatMessage = (function() {
    
            /**
             * Properties of a ChatMessage.
             * @memberof proto
             * @interface IChatMessage
             * @property {proto.MessageType|null} [type] ChatMessage type
             * @property {string|null} [content] ChatMessage content
             * @property {number|null} [senderId] ChatMessage senderId
             * @property {string|null} [senderName] ChatMessage senderName
             * @property {number|null} [onlineCount] ChatMessage onlineCount
             * @property {number|Long|null} [timestamp] ChatMessage timestamp
             * @property {Uint8Array|null} [imageData] ChatMessage imageData
             * @property {string|null} [imageMime] ChatMessage imageMime
             */
    
            /**
             * Constructs a new ChatMessage.
             * @memberof proto
             * @classdesc Represents a ChatMessage.
             * @implements IChatMessage
             * @constructor
             * @param {proto.IChatMessage=} [properties] Properties to set
             */
            function ChatMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ChatMessage type.
             * @member {proto.MessageType} type
             * @memberof proto.ChatMessage
             * @instance
             */
            ChatMessage.prototype.type = 0;
    
            /**
             * ChatMessage content.
             * @member {string} content
             * @memberof proto.ChatMessage
             * @instance
             */
            ChatMessage.prototype.content = "";
    
            /**
             * ChatMessage senderId.
             * @member {number} senderId
             * @memberof proto.ChatMessage
             * @instance
             */
            ChatMessage.prototype.senderId = 0;
    
            /**
             * ChatMessage senderName.
             * @member {string} senderName
             * @memberof proto.ChatMessage
             * @instance
             */
            ChatMessage.prototype.senderName = "";
    
            /**
             * ChatMessage onlineCount.
             * @member {number} onlineCount
             * @memberof proto.ChatMessage
             * @instance
             */
            ChatMessage.prototype.onlineCount = 0;
    
            /**
             * ChatMessage timestamp.
             * @member {number|Long} timestamp
             * @memberof proto.ChatMessage
             * @instance
             */
            ChatMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * ChatMessage imageData.
             * @member {Uint8Array} imageData
             * @memberof proto.ChatMessage
             * @instance
             */
            ChatMessage.prototype.imageData = $util.newBuffer([]);
    
            /**
             * ChatMessage imageMime.
             * @member {string} imageMime
             * @memberof proto.ChatMessage
             * @instance
             */
            ChatMessage.prototype.imageMime = "";
    
            /**
             * Creates a new ChatMessage instance using the specified properties.
             * @function create
             * @memberof proto.ChatMessage
             * @static
             * @param {proto.IChatMessage=} [properties] Properties to set
             * @returns {proto.ChatMessage} ChatMessage instance
             */
            ChatMessage.create = function create(properties) {
                return new ChatMessage(properties);
            };
    
            /**
             * Encodes the specified ChatMessage message. Does not implicitly {@link proto.ChatMessage.verify|verify} messages.
             * @function encode
             * @memberof proto.ChatMessage
             * @static
             * @param {proto.IChatMessage} message ChatMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
                if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.senderId);
                if (message.senderName != null && Object.hasOwnProperty.call(message, "senderName"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.senderName);
                if (message.onlineCount != null && Object.hasOwnProperty.call(message, "onlineCount"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.onlineCount);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int64(message.timestamp);
                if (message.imageData != null && Object.hasOwnProperty.call(message, "imageData"))
                    writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.imageData);
                if (message.imageMime != null && Object.hasOwnProperty.call(message, "imageMime"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.imageMime);
                return writer;
            };
    
            /**
             * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link proto.ChatMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.ChatMessage
             * @static
             * @param {proto.IChatMessage} message ChatMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatMessage message from the specified reader or buffer.
             * @function decode
             * @memberof proto.ChatMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.ChatMessage} ChatMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatMessage.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.ChatMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.type = reader.int32();
                            break;
                        }
                    case 2: {
                            message.content = reader.string();
                            break;
                        }
                    case 3: {
                            message.senderId = reader.int32();
                            break;
                        }
                    case 4: {
                            message.senderName = reader.string();
                            break;
                        }
                    case 5: {
                            message.onlineCount = reader.int32();
                            break;
                        }
                    case 6: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    case 7: {
                            message.imageData = reader.bytes();
                            break;
                        }
                    case 8: {
                            message.imageMime = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.ChatMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.ChatMessage} ChatMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatMessage message.
             * @function verify
             * @memberof proto.ChatMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.content != null && message.hasOwnProperty("content"))
                    if (!$util.isString(message.content))
                        return "content: string expected";
                if (message.senderId != null && message.hasOwnProperty("senderId"))
                    if (!$util.isInteger(message.senderId))
                        return "senderId: integer expected";
                if (message.senderName != null && message.hasOwnProperty("senderName"))
                    if (!$util.isString(message.senderName))
                        return "senderName: string expected";
                if (message.onlineCount != null && message.hasOwnProperty("onlineCount"))
                    if (!$util.isInteger(message.onlineCount))
                        return "onlineCount: integer expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                if (message.imageData != null && message.hasOwnProperty("imageData"))
                    if (!(message.imageData && typeof message.imageData.length === "number" || $util.isString(message.imageData)))
                        return "imageData: buffer expected";
                if (message.imageMime != null && message.hasOwnProperty("imageMime"))
                    if (!$util.isString(message.imageMime))
                        return "imageMime: string expected";
                return null;
            };
    
            /**
             * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.ChatMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.ChatMessage} ChatMessage
             */
            ChatMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.ChatMessage)
                    return object;
                var message = new $root.proto.ChatMessage();
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "MESSAGE":
                case 0:
                    message.type = 0;
                    break;
                case "ONLINE_COUNT":
                case 1:
                    message.type = 1;
                    break;
                case "SYSTEM":
                case 2:
                    message.type = 2;
                    break;
                case "JOIN":
                case 3:
                    message.type = 3;
                    break;
                case "LEAVE":
                case 4:
                    message.type = 4;
                    break;
                }
                if (object.content != null)
                    message.content = String(object.content);
                if (object.senderId != null)
                    message.senderId = object.senderId | 0;
                if (object.senderName != null)
                    message.senderName = String(object.senderName);
                if (object.onlineCount != null)
                    message.onlineCount = object.onlineCount | 0;
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                if (object.imageData != null)
                    if (typeof object.imageData === "string")
                        $util.base64.decode(object.imageData, message.imageData = $util.newBuffer($util.base64.length(object.imageData)), 0);
                    else if (object.imageData.length >= 0)
                        message.imageData = object.imageData;
                if (object.imageMime != null)
                    message.imageMime = String(object.imageMime);
                return message;
            };
    
            /**
             * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.ChatMessage
             * @static
             * @param {proto.ChatMessage} message ChatMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type = options.enums === String ? "MESSAGE" : 0;
                    object.content = "";
                    object.senderId = 0;
                    object.senderName = "";
                    object.onlineCount = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.imageData = "";
                    else {
                        object.imageData = [];
                        if (options.bytes !== Array)
                            object.imageData = $util.newBuffer(object.imageData);
                    }
                    object.imageMime = "";
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.proto.MessageType[message.type] === undefined ? message.type : $root.proto.MessageType[message.type] : message.type;
                if (message.content != null && message.hasOwnProperty("content"))
                    object.content = message.content;
                if (message.senderId != null && message.hasOwnProperty("senderId"))
                    object.senderId = message.senderId;
                if (message.senderName != null && message.hasOwnProperty("senderName"))
                    object.senderName = message.senderName;
                if (message.onlineCount != null && message.hasOwnProperty("onlineCount"))
                    object.onlineCount = message.onlineCount;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                if (message.imageData != null && message.hasOwnProperty("imageData"))
                    object.imageData = options.bytes === String ? $util.base64.encode(message.imageData, 0, message.imageData.length) : options.bytes === Array ? Array.prototype.slice.call(message.imageData) : message.imageData;
                if (message.imageMime != null && message.hasOwnProperty("imageMime"))
                    object.imageMime = message.imageMime;
                return object;
            };
    
            /**
             * Converts this ChatMessage to JSON.
             * @function toJSON
             * @memberof proto.ChatMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ChatMessage
             * @function getTypeUrl
             * @memberof proto.ChatMessage
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ChatMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/proto.ChatMessage";
            };
    
            return ChatMessage;
        })();
    
        return proto;
    })();

    return $root;
})(protobuf);
