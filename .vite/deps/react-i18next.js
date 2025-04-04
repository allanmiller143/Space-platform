import {
  _arrayWithHoles,
  _nonIterableRest
} from "./chunk-L26NNOLT.js";
import {
  _classCallCheck,
  _createClass,
  _unsupportedIterableToArray
} from "./chunk-3YC4TMQT.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-SSLM52RX.js";
import {
  _defineProperty
} from "./chunk-KEQESJWX.js";
import {
  _typeof
} from "./chunk-J2ICA2KM.js";
import {
  require_react
} from "./chunk-UMBEC6V5.js";
import {
  __commonJS,
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/void-elements/index.js
var require_void_elements = __commonJS({
  "node_modules/void-elements/index.js"(exports, module) {
    module.exports = {
      "area": true,
      "base": true,
      "br": true,
      "col": true,
      "embed": true,
      "hr": true,
      "img": true,
      "input": true,
      "link": true,
      "meta": true,
      "param": true,
      "source": true,
      "track": true,
      "wbr": true
    };
  }
});

// node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(e2, t2) {
  if (null == e2)
    return {};
  var o, r2, i2 = _objectWithoutPropertiesLoose(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var s2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < s2.length; r2++)
      o = s2[r2], t2.includes(o) || {}.propertyIsEnumerable.call(e2, o) && (i2[o] = e2[o]);
  }
  return i2;
}

// node_modules/react-i18next/dist/es/Trans.js
var import_react3 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/TransWithoutContext.js
var import_react = __toESM(require_react(), 1);

// node_modules/html-parse-stringify/dist/html-parse-stringify.module.js
var import_void_elements = __toESM(require_void_elements());
var t = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
function n(n2) {
  var r2 = { type: "tag", name: "", voidElement: false, attrs: {}, children: [] }, i2 = n2.match(/<\/?([^\s]+?)[/\s>]/);
  if (i2 && (r2.name = i2[1], (import_void_elements.default[i2[1]] || "/" === n2.charAt(n2.length - 2)) && (r2.voidElement = true), r2.name.startsWith("!--"))) {
    var s2 = n2.indexOf("-->");
    return { type: "comment", comment: -1 !== s2 ? n2.slice(4, s2) : "" };
  }
  for (var a2 = new RegExp(t), c2 = null; null !== (c2 = a2.exec(n2)); )
    if (c2[0].trim())
      if (c2[1]) {
        var o = c2[1].trim(), l = [o, ""];
        o.indexOf("=") > -1 && (l = o.split("=")), r2.attrs[l[0]] = l[1], a2.lastIndex--;
      } else
        c2[2] && (r2.attrs[c2[2]] = c2[3].trim().substring(1, c2[3].length - 1));
  return r2;
}
var r = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g;
var i = /^\s*$/;
var s = /* @__PURE__ */ Object.create(null);
function a(e2, t2) {
  switch (t2.type) {
    case "text":
      return e2 + t2.content;
    case "tag":
      return e2 += "<" + t2.name + (t2.attrs ? function(e3) {
        var t3 = [];
        for (var n2 in e3)
          t3.push(n2 + '="' + e3[n2] + '"');
        return t3.length ? " " + t3.join(" ") : "";
      }(t2.attrs) : "") + (t2.voidElement ? "/>" : ">"), t2.voidElement ? e2 : e2 + t2.children.reduce(a, "") + "</" + t2.name + ">";
    case "comment":
      return e2 + "<!--" + t2.comment + "-->";
  }
}
var c = { parse: function(e2, t2) {
  t2 || (t2 = {}), t2.components || (t2.components = s);
  var a2, c2 = [], o = [], l = -1, m = false;
  if (0 !== e2.indexOf("<")) {
    var u = e2.indexOf("<");
    c2.push({ type: "text", content: -1 === u ? e2 : e2.substring(0, u) });
  }
  return e2.replace(r, function(r2, s2) {
    if (m) {
      if (r2 !== "</" + a2.name + ">")
        return;
      m = false;
    }
    var u2, f = "/" !== r2.charAt(1), h = r2.startsWith("<!--"), p = s2 + r2.length, d = e2.charAt(p);
    if (h) {
      var v = n(r2);
      return l < 0 ? (c2.push(v), c2) : ((u2 = o[l]).children.push(v), c2);
    }
    if (f && (l++, "tag" === (a2 = n(r2)).type && t2.components[a2.name] && (a2.type = "component", m = true), a2.voidElement || m || !d || "<" === d || a2.children.push({ type: "text", content: e2.slice(p, e2.indexOf("<", p)) }), 0 === l && c2.push(a2), (u2 = o[l - 1]) && u2.children.push(a2), o[l] = a2), (!f || a2.voidElement) && (l > -1 && (a2.voidElement || a2.name === r2.slice(2, -1)) && (l--, a2 = -1 === l ? c2 : o[l]), !m && "<" !== d && d)) {
      u2 = -1 === l ? c2 : o[l].children;
      var x = e2.indexOf("<", p), g = e2.slice(p, -1 === x ? void 0 : x);
      i.test(g) && (g = " "), (x > -1 && l + u2.length >= 0 || " " !== g) && u2.push({ type: "text", content: g });
    }
  }), c2;
}, stringify: function(e2) {
  return e2.reduce(function(e3, t2) {
    return e3 + a("", t2);
  }, "");
} };
var html_parse_stringify_module_default = c;

// node_modules/react-i18next/dist/es/utils.js
function warn() {
  if (console && console.warn) {
    var _console;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[0] === "string")
      args[0] = "react-i18next:: ".concat(args[0]);
    (_console = console).warn.apply(_console, args);
  }
}
var alreadyWarned = {};
function warnOnce() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (typeof args[0] === "string" && alreadyWarned[args[0]])
    return;
  if (typeof args[0] === "string")
    alreadyWarned[args[0]] = /* @__PURE__ */ new Date();
  warn.apply(void 0, args);
}
var loadedClb = function loadedClb2(i18n, cb) {
  return function() {
    if (i18n.isInitialized) {
      cb();
    } else {
      var initialized = function initialized2() {
        setTimeout(function() {
          i18n.off("initialized", initialized2);
        }, 0);
        cb();
      };
      i18n.on("initialized", initialized);
    }
  };
};
function loadNamespaces(i18n, ns, cb) {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
}
function loadLanguages(i18n, lng, ns, cb) {
  if (typeof ns === "string")
    ns = [ns];
  ns.forEach(function(n2) {
    if (i18n.options.ns.indexOf(n2) < 0)
      i18n.options.ns.push(n2);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
}
function oldI18nextHasLoadedNamespace(ns, i18n) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var lng = i18n.languages[0];
  var fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
  var lastLng = i18n.languages[i18n.languages.length - 1];
  if (lng.toLowerCase() === "cimode")
    return true;
  var loadNotPending = function loadNotPending2(l, n2) {
    var loadState = i18n.services.backendConnector.state["".concat(l, "|").concat(n2)];
    return loadState === -1 || loadState === 2;
  };
  if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns))
    return false;
  if (i18n.hasResourceBundle(lng, ns))
    return true;
  if (!i18n.services.backendConnector.backend || i18n.options.resources && !i18n.options.partialBundledLanguages)
    return true;
  if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns)))
    return true;
  return false;
}
function hasLoadedNamespace(ns, i18n) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce("i18n.languages were undefined or empty", i18n.languages);
    return true;
  }
  var isNewerI18next = i18n.options.ignoreJSONStructure !== void 0;
  if (!isNewerI18next) {
    return oldI18nextHasLoadedNamespace(ns, i18n, options);
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: function precheck(i18nInstance2, loadNotPending) {
      if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18nInstance2.services.backendConnector.backend && i18nInstance2.isLanguageChangingTo && !loadNotPending(i18nInstance2.isLanguageChangingTo, ns))
        return false;
    }
  });
}
function getDisplayName(Component) {
  return Component.displayName || Component.name || (typeof Component === "string" && Component.length > 0 ? Component : "Unknown");
}

// node_modules/react-i18next/dist/es/unescape.js
var matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
var htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
};
var unescapeHtmlEntity = function unescapeHtmlEntity2(m) {
  return htmlEntities[m];
};
var unescape = function unescape2(text) {
  return text.replace(matchHtmlEntity, unescapeHtmlEntity);
};

// node_modules/react-i18next/dist/es/defaults.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var defaultOptions = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: true,
  unescape
};
function setDefaults() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  defaultOptions = _objectSpread(_objectSpread({}, defaultOptions), options);
}
function getDefaults() {
  return defaultOptions;
}

// node_modules/react-i18next/dist/es/i18nInstance.js
var i18nInstance;
function setI18n(instance) {
  i18nInstance = instance;
}
function getI18n() {
  return i18nInstance;
}

// node_modules/react-i18next/dist/es/TransWithoutContext.js
var _excluded = ["format"];
var _excluded2 = ["children", "count", "parent", "i18nKey", "context", "tOptions", "values", "defaults", "components", "ns", "i18n", "t", "shouldUnescape"];
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function hasChildren(node, checkLength) {
  if (!node)
    return false;
  var base = node.props ? node.props.children : node.children;
  if (checkLength)
    return base.length > 0;
  return !!base;
}
function getChildren(node) {
  if (!node)
    return [];
  return node.props ? node.props.children : node.children;
}
function hasValidReactChildren(children) {
  if (Object.prototype.toString.call(children) !== "[object Array]")
    return false;
  return children.every(function(child) {
    return (0, import_react.isValidElement)(child);
  });
}
function getAsArray(data) {
  return Array.isArray(data) ? data : [data];
}
function mergeProps(source, target) {
  var newTarget = _objectSpread2({}, target);
  newTarget.props = Object.assign(source.props, target.props);
  return newTarget;
}
function nodesToString(children, i18nOptions) {
  if (!children)
    return "";
  var stringNode = "";
  var childrenArray = getAsArray(children);
  var keepArray = i18nOptions.transSupportBasicHtmlNodes && i18nOptions.transKeepBasicHtmlNodesFor ? i18nOptions.transKeepBasicHtmlNodesFor : [];
  childrenArray.forEach(function(child, childIndex) {
    if (typeof child === "string") {
      stringNode += "".concat(child);
    } else if ((0, import_react.isValidElement)(child)) {
      var childPropsCount = Object.keys(child.props).length;
      var shouldKeepChild = keepArray.indexOf(child.type) > -1;
      var childChildren = child.props.children;
      if (!childChildren && shouldKeepChild && childPropsCount === 0) {
        stringNode += "<".concat(child.type, "/>");
      } else if (!childChildren && (!shouldKeepChild || childPropsCount !== 0)) {
        stringNode += "<".concat(childIndex, "></").concat(childIndex, ">");
      } else if (child.props.i18nIsDynamicList) {
        stringNode += "<".concat(childIndex, "></").concat(childIndex, ">");
      } else if (shouldKeepChild && childPropsCount === 1 && typeof childChildren === "string") {
        stringNode += "<".concat(child.type, ">").concat(childChildren, "</").concat(child.type, ">");
      } else {
        var content = nodesToString(childChildren, i18nOptions);
        stringNode += "<".concat(childIndex, ">").concat(content, "</").concat(childIndex, ">");
      }
    } else if (child === null) {
      warn("Trans: the passed in value is invalid - seems you passed in a null child.");
    } else if (_typeof(child) === "object") {
      var format = child.format, clone = _objectWithoutProperties(child, _excluded);
      var keys = Object.keys(clone);
      if (keys.length === 1) {
        var value = format ? "".concat(keys[0], ", ").concat(format) : keys[0];
        stringNode += "{{".concat(value, "}}");
      } else {
        warn("react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.", child);
      }
    } else {
      warn("Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.", child);
    }
  });
  return stringNode;
}
function renderNodes(children, targetString, i18n, i18nOptions, combinedTOpts, shouldUnescape) {
  if (targetString === "")
    return [];
  var keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
  var emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.join("|")).test(targetString);
  if (!children && !emptyChildrenButNeedsHandling)
    return [targetString];
  var data = {};
  function getData(childs) {
    var childrenArray = getAsArray(childs);
    childrenArray.forEach(function(child) {
      if (typeof child === "string")
        return;
      if (hasChildren(child))
        getData(getChildren(child));
      else if (_typeof(child) === "object" && !(0, import_react.isValidElement)(child))
        Object.assign(data, child);
    });
  }
  getData(children);
  var ast = html_parse_stringify_module_default.parse("<0>".concat(targetString, "</0>"));
  var opts = _objectSpread2(_objectSpread2({}, data), combinedTOpts);
  function renderInner(child, node, rootReactNode) {
    var childs = getChildren(child);
    var mappedChildren = mapAST(childs, node.children, rootReactNode);
    return hasValidReactChildren(childs) && mappedChildren.length === 0 ? childs : mappedChildren;
  }
  function pushTranslatedJSX(child, inner, mem, i2, isVoid) {
    if (child.dummy)
      child.children = inner;
    mem.push((0, import_react.cloneElement)(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
      key: i2
    }), isVoid ? void 0 : inner));
  }
  function mapAST(reactNode, astNode, rootReactNode) {
    var reactNodes = getAsArray(reactNode);
    var astNodes = getAsArray(astNode);
    return astNodes.reduce(function(mem, node, i2) {
      var translationContent = node.children && node.children[0] && node.children[0].content && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);
      if (node.type === "tag") {
        var tmp = reactNodes[parseInt(node.name, 10)];
        if (!tmp && rootReactNode.length === 1 && rootReactNode[0][node.name])
          tmp = rootReactNode[0][node.name];
        if (!tmp)
          tmp = {};
        var child = Object.keys(node.attrs).length !== 0 ? mergeProps({
          props: node.attrs
        }, tmp) : tmp;
        var isElement = (0, import_react.isValidElement)(child);
        var isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
        var isEmptyTransWithHTML = emptyChildrenButNeedsHandling && _typeof(child) === "object" && child.dummy && !isElement;
        var isKnownComponent = _typeof(children) === "object" && children !== null && Object.hasOwnProperty.call(children, node.name);
        if (typeof child === "string") {
          var value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
          mem.push(value);
        } else if (hasChildren(child) || isValidTranslationWithChildren) {
          var inner = renderInner(child, node, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i2);
        } else if (isEmptyTransWithHTML) {
          var _inner = mapAST(reactNodes, node.children, rootReactNode);
          mem.push((0, import_react.cloneElement)(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
            key: i2
          }), _inner));
        } else if (Number.isNaN(parseFloat(node.name))) {
          if (isKnownComponent) {
            var _inner2 = renderInner(child, node, rootReactNode);
            pushTranslatedJSX(child, _inner2, mem, i2, node.voidElement);
          } else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) {
            if (node.voidElement) {
              mem.push((0, import_react.createElement)(node.name, {
                key: "".concat(node.name, "-").concat(i2)
              }));
            } else {
              var _inner3 = mapAST(reactNodes, node.children, rootReactNode);
              mem.push((0, import_react.createElement)(node.name, {
                key: "".concat(node.name, "-").concat(i2)
              }, _inner3));
            }
          } else if (node.voidElement) {
            mem.push("<".concat(node.name, " />"));
          } else {
            var _inner4 = mapAST(reactNodes, node.children, rootReactNode);
            mem.push("<".concat(node.name, ">").concat(_inner4, "</").concat(node.name, ">"));
          }
        } else if (_typeof(child) === "object" && !isElement) {
          var content = node.children[0] ? translationContent : null;
          if (content)
            mem.push(content);
        } else if (node.children.length === 1 && translationContent) {
          mem.push((0, import_react.cloneElement)(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
            key: i2
          }), translationContent));
        } else {
          mem.push((0, import_react.cloneElement)(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
            key: i2
          })));
        }
      } else if (node.type === "text") {
        var wrapTextNodes = i18nOptions.transWrapTextNodes;
        var _content = shouldUnescape ? i18nOptions.unescape(i18n.services.interpolator.interpolate(node.content, opts, i18n.language)) : i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
        if (wrapTextNodes) {
          mem.push((0, import_react.createElement)(wrapTextNodes, {
            key: "".concat(node.name, "-").concat(i2)
          }, _content));
        } else {
          mem.push(_content);
        }
      }
      return mem;
    }, []);
  }
  var result = mapAST([{
    dummy: true,
    children: children || []
  }], ast, getAsArray(children || []));
  return getChildren(result[0]);
}
function Trans(_ref) {
  var children = _ref.children, count = _ref.count, parent = _ref.parent, i18nKey = _ref.i18nKey, context = _ref.context, _ref$tOptions = _ref.tOptions, tOptions = _ref$tOptions === void 0 ? {} : _ref$tOptions, values = _ref.values, defaults = _ref.defaults, components = _ref.components, ns = _ref.ns, i18nFromProps = _ref.i18n, tFromProps = _ref.t, shouldUnescape = _ref.shouldUnescape, additionalProps = _objectWithoutProperties(_ref, _excluded2);
  var i18n = i18nFromProps || getI18n();
  if (!i18n) {
    warnOnce("You will need to pass in an i18next instance by using i18nextReactModule");
    return children;
  }
  var t2 = tFromProps || i18n.t.bind(i18n) || function(k) {
    return k;
  };
  if (context)
    tOptions.context = context;
  var reactI18nextOptions = _objectSpread2(_objectSpread2({}, getDefaults()), i18n.options && i18n.options.react);
  var namespaces = ns || t2.ns || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === "string" ? [namespaces] : namespaces || ["translation"];
  var defaultValue = defaults || nodesToString(children, reactI18nextOptions) || reactI18nextOptions.transEmptyNodeValue || i18nKey;
  var hashTransKey = reactI18nextOptions.hashTransKey;
  var key = i18nKey || (hashTransKey ? hashTransKey(defaultValue) : defaultValue);
  var interpolationOverride = values ? tOptions.interpolation : {
    interpolation: _objectSpread2(_objectSpread2({}, tOptions.interpolation), {}, {
      prefix: "#$?",
      suffix: "?$#"
    })
  };
  var combinedTOpts = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, tOptions), {}, {
    count
  }, values), interpolationOverride), {}, {
    defaultValue,
    ns: namespaces
  });
  var translation = key ? t2(key, combinedTOpts) : defaultValue;
  var content = renderNodes(components || children, translation, i18n, reactI18nextOptions, combinedTOpts, shouldUnescape);
  var useAsParent = parent !== void 0 ? parent : reactI18nextOptions.defaultTransParent;
  return useAsParent ? (0, import_react.createElement)(useAsParent, additionalProps, content) : content;
}

// node_modules/react-i18next/dist/es/context.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/initReactI18next.js
var initReactI18next = {
  type: "3rdParty",
  init: function init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};

// node_modules/react-i18next/dist/es/context.js
function ownKeys3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread3(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys3(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys3(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var I18nContext = (0, import_react2.createContext)();
var ReportNamespaces = function() {
  function ReportNamespaces2() {
    _classCallCheck(this, ReportNamespaces2);
    this.usedNamespaces = {};
  }
  _createClass(ReportNamespaces2, [{
    key: "addUsedNamespaces",
    value: function addUsedNamespaces(namespaces) {
      var _this = this;
      namespaces.forEach(function(ns) {
        if (!_this.usedNamespaces[ns])
          _this.usedNamespaces[ns] = true;
      });
    }
  }, {
    key: "getUsedNamespaces",
    value: function getUsedNamespaces() {
      return Object.keys(this.usedNamespaces);
    }
  }]);
  return ReportNamespaces2;
}();
function composeInitialProps(ForComponent) {
  return function(ctx) {
    return new Promise(function(resolve) {
      var i18nInitialProps = getInitialProps();
      if (ForComponent.getInitialProps) {
        ForComponent.getInitialProps(ctx).then(function(componentsInitialProps) {
          resolve(_objectSpread3(_objectSpread3({}, componentsInitialProps), i18nInitialProps));
        });
      } else {
        resolve(i18nInitialProps);
      }
    });
  };
}
function getInitialProps() {
  var i18n = getI18n();
  var namespaces = i18n.reportNamespaces ? i18n.reportNamespaces.getUsedNamespaces() : [];
  var ret = {};
  var initialI18nStore = {};
  i18n.languages.forEach(function(l) {
    initialI18nStore[l] = {};
    namespaces.forEach(function(ns) {
      initialI18nStore[l][ns] = i18n.getResourceBundle(l, ns) || {};
    });
  });
  ret.initialI18nStore = initialI18nStore;
  ret.initialLanguage = i18n.language;
  return ret;
}

// node_modules/react-i18next/dist/es/Trans.js
var _excluded3 = ["children", "count", "parent", "i18nKey", "context", "tOptions", "values", "defaults", "components", "ns", "i18n", "t", "shouldUnescape"];
function ownKeys4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread4(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys4(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys4(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function Trans2(_ref) {
  var children = _ref.children, count = _ref.count, parent = _ref.parent, i18nKey = _ref.i18nKey, context = _ref.context, _ref$tOptions = _ref.tOptions, tOptions = _ref$tOptions === void 0 ? {} : _ref$tOptions, values = _ref.values, defaults = _ref.defaults, components = _ref.components, ns = _ref.ns, i18nFromProps = _ref.i18n, tFromProps = _ref.t, shouldUnescape = _ref.shouldUnescape, additionalProps = _objectWithoutProperties(_ref, _excluded3);
  var _ref2 = (0, import_react3.useContext)(I18nContext) || {}, i18nFromContext = _ref2.i18n, defaultNSFromContext = _ref2.defaultNS;
  var i18n = i18nFromProps || i18nFromContext || getI18n();
  var t2 = tFromProps || i18n && i18n.t.bind(i18n);
  return Trans(_objectSpread4({
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions,
    values,
    defaults,
    components,
    ns: ns || t2 && t2.ns || defaultNSFromContext || i18n && i18n.options && i18n.options.defaultNS,
    i18n,
    t: tFromProps,
    shouldUnescape
  }, additionalProps));
}

// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r2, l) {
  var t2 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t2) {
    var e2, n2, i2, u, a2 = [], f = true, o = false;
    try {
      if (i2 = (t2 = t2.call(r2)).next, 0 === l) {
        if (Object(t2) !== t2)
          return;
        f = false;
      } else
        for (; !(f = (e2 = i2.call(t2)).done) && (a2.push(e2.value), a2.length !== l); f = true)
          ;
    } catch (r3) {
      o = true, n2 = r3;
    } finally {
      try {
        if (!f && null != t2["return"] && (u = t2["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n2;
      }
    }
    return a2;
  }
}

// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(r2, e2) {
  return _arrayWithHoles(r2) || _iterableToArrayLimit(r2, e2) || _unsupportedIterableToArray(r2, e2) || _nonIterableRest();
}

// node_modules/react-i18next/dist/es/useTranslation.js
var import_react4 = __toESM(require_react(), 1);
function ownKeys5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread5(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys5(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys5(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var usePrevious = function usePrevious2(value, ignore) {
  var ref = (0, import_react4.useRef)();
  (0, import_react4.useEffect)(function() {
    ref.current = ignore ? ref.current : value;
  }, [value, ignore]);
  return ref.current;
};
function useTranslation(ns) {
  var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var i18nFromProps = props.i18n;
  var _ref = (0, import_react4.useContext)(I18nContext) || {}, i18nFromContext = _ref.i18n, defaultNSFromContext = _ref.defaultNS;
  var i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces)
    i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce("You will need to pass in an i18next instance by using initReactI18next");
    var notReadyT = function notReadyT2(k, optsOrDefaultValue) {
      if (typeof optsOrDefaultValue === "string")
        return optsOrDefaultValue;
      if (optsOrDefaultValue && _typeof(optsOrDefaultValue) === "object" && typeof optsOrDefaultValue.defaultValue === "string")
        return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    var retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if (i18n.options.react && i18n.options.react.wait !== void 0)
    warnOnce("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  var i18nOptions = _objectSpread5(_objectSpread5(_objectSpread5({}, getDefaults()), i18n.options.react), props);
  var useSuspense = i18nOptions.useSuspense, keyPrefix = i18nOptions.keyPrefix;
  var namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === "string" ? [namespaces] : namespaces || ["translation"];
  if (i18n.reportNamespaces.addUsedNamespaces)
    i18n.reportNamespaces.addUsedNamespaces(namespaces);
  var ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(function(n2) {
    return hasLoadedNamespace(n2, i18n, i18nOptions);
  });
  function getT() {
    return i18n.getFixedT(props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
  }
  var _useState = (0, import_react4.useState)(getT), _useState2 = _slicedToArray(_useState, 2), t2 = _useState2[0], setT = _useState2[1];
  var joinedNS = namespaces.join();
  if (props.lng)
    joinedNS = "".concat(props.lng).concat(joinedNS);
  var previousJoinedNS = usePrevious(joinedNS);
  var isMounted = (0, import_react4.useRef)(true);
  (0, import_react4.useEffect)(function() {
    var bindI18n = i18nOptions.bindI18n, bindI18nStore = i18nOptions.bindI18nStore;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        loadLanguages(i18n, props.lng, namespaces, function() {
          if (isMounted.current)
            setT(getT);
        });
      } else {
        loadNamespaces(i18n, namespaces, function() {
          if (isMounted.current)
            setT(getT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getT);
    }
    function boundReset() {
      if (isMounted.current)
        setT(getT);
    }
    if (bindI18n && i18n)
      i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n)
      i18n.store.on(bindI18nStore, boundReset);
    return function() {
      isMounted.current = false;
      if (bindI18n && i18n)
        bindI18n.split(" ").forEach(function(e2) {
          return i18n.off(e2, boundReset);
        });
      if (bindI18nStore && i18n)
        bindI18nStore.split(" ").forEach(function(e2) {
          return i18n.store.off(e2, boundReset);
        });
    };
  }, [i18n, joinedNS]);
  var isInitial = (0, import_react4.useRef)(true);
  (0, import_react4.useEffect)(function() {
    if (isMounted.current && !isInitial.current) {
      setT(getT);
    }
    isInitial.current = false;
  }, [i18n, keyPrefix]);
  var ret = [t2, i18n, ready];
  ret.t = t2;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready)
    return ret;
  if (!ready && !useSuspense)
    return ret;
  throw new Promise(function(resolve) {
    if (props.lng) {
      loadLanguages(i18n, props.lng, namespaces, function() {
        return resolve();
      });
    } else {
      loadNamespaces(i18n, namespaces, function() {
        return resolve();
      });
    }
  });
}

// node_modules/react-i18next/dist/es/withTranslation.js
var import_react5 = __toESM(require_react(), 1);
var _excluded4 = ["forwardedRef"];
function ownKeys6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread6(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys6(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys6(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function withTranslation(ns) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function Extend(WrappedComponent) {
    function I18nextWithTranslation(_ref) {
      var forwardedRef = _ref.forwardedRef, rest = _objectWithoutProperties(_ref, _excluded4);
      var _useTranslation = useTranslation(ns, _objectSpread6(_objectSpread6({}, rest), {}, {
        keyPrefix: options.keyPrefix
      })), _useTranslation2 = _slicedToArray(_useTranslation, 3), t2 = _useTranslation2[0], i18n = _useTranslation2[1], ready = _useTranslation2[2];
      var passDownProps = _objectSpread6(_objectSpread6({}, rest), {}, {
        t: t2,
        i18n,
        tReady: ready
      });
      if (options.withRef && forwardedRef) {
        passDownProps.ref = forwardedRef;
      } else if (!options.withRef && forwardedRef) {
        passDownProps.forwardedRef = forwardedRef;
      }
      return (0, import_react5.createElement)(WrappedComponent, passDownProps);
    }
    I18nextWithTranslation.displayName = "withI18nextTranslation(".concat(getDisplayName(WrappedComponent), ")");
    I18nextWithTranslation.WrappedComponent = WrappedComponent;
    var forwardRef = function forwardRef2(props, ref) {
      return (0, import_react5.createElement)(I18nextWithTranslation, Object.assign({}, props, {
        forwardedRef: ref
      }));
    };
    return options.withRef ? (0, import_react5.forwardRef)(forwardRef) : I18nextWithTranslation;
  };
}

// node_modules/react-i18next/dist/es/Translation.js
var _excluded5 = ["ns", "children"];
function Translation(props) {
  var ns = props.ns, children = props.children, options = _objectWithoutProperties(props, _excluded5);
  var _useTranslation = useTranslation(ns, options), _useTranslation2 = _slicedToArray(_useTranslation, 3), t2 = _useTranslation2[0], i18n = _useTranslation2[1], ready = _useTranslation2[2];
  return children(t2, {
    i18n,
    lng: i18n.language
  }, ready);
}

// node_modules/react-i18next/dist/es/I18nextProvider.js
var import_react6 = __toESM(require_react(), 1);
function I18nextProvider(_ref) {
  var i18n = _ref.i18n, defaultNS = _ref.defaultNS, children = _ref.children;
  var value = (0, import_react6.useMemo)(function() {
    return {
      i18n,
      defaultNS
    };
  }, [i18n, defaultNS]);
  return (0, import_react6.createElement)(I18nContext.Provider, {
    value
  }, children);
}

// node_modules/react-i18next/dist/es/withSSR.js
var import_react8 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/useSSR.js
var import_react7 = __toESM(require_react(), 1);
function useSSR(initialI18nStore, initialLanguage) {
  var props = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var i18nFromProps = props.i18n;
  var _ref = (0, import_react7.useContext)(I18nContext) || {}, i18nFromContext = _ref.i18n;
  var i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n.options && i18n.options.isClone)
    return;
  if (initialI18nStore && !i18n.initializedStoreOnce) {
    i18n.services.resourceStore.data = initialI18nStore;
    i18n.options.ns = Object.values(initialI18nStore).reduce(function(mem, lngResources) {
      Object.keys(lngResources).forEach(function(ns) {
        if (mem.indexOf(ns) < 0)
          mem.push(ns);
      });
      return mem;
    }, i18n.options.ns);
    i18n.initializedStoreOnce = true;
    i18n.isInitialized = true;
  }
  if (initialLanguage && !i18n.initializedLanguageOnce) {
    i18n.changeLanguage(initialLanguage);
    i18n.initializedLanguageOnce = true;
  }
}

// node_modules/react-i18next/dist/es/withSSR.js
var _excluded6 = ["initialI18nStore", "initialLanguage"];
function ownKeys7(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread7(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys7(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys7(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function withSSR() {
  return function Extend(WrappedComponent) {
    function I18nextWithSSR(_ref) {
      var initialI18nStore = _ref.initialI18nStore, initialLanguage = _ref.initialLanguage, rest = _objectWithoutProperties(_ref, _excluded6);
      useSSR(initialI18nStore, initialLanguage);
      return (0, import_react8.createElement)(WrappedComponent, _objectSpread7({}, rest));
    }
    I18nextWithSSR.getInitialProps = composeInitialProps(WrappedComponent);
    I18nextWithSSR.displayName = "withI18nextSSR(".concat(getDisplayName(WrappedComponent), ")");
    I18nextWithSSR.WrappedComponent = WrappedComponent;
    return I18nextWithSSR;
  };
}

// node_modules/react-i18next/dist/es/index.js
var date = function date2() {
  return "";
};
var time = function time2() {
  return "";
};
var number = function number2() {
  return "";
};
var select = function select2() {
  return "";
};
var plural = function plural2() {
  return "";
};
var selectOrdinal = function selectOrdinal2() {
  return "";
};
export {
  I18nContext,
  I18nextProvider,
  Trans2 as Trans,
  Trans as TransWithoutContext,
  Translation,
  composeInitialProps,
  date,
  getDefaults,
  getI18n,
  getInitialProps,
  initReactI18next,
  number,
  plural,
  select,
  selectOrdinal,
  setDefaults,
  setI18n,
  time,
  useSSR,
  useTranslation,
  withSSR,
  withTranslation
};
//# sourceMappingURL=react-i18next.js.map
