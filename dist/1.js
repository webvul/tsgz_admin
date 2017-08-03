webpackJsonp([1],{

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(684)

var Component = __webpack_require__(200)(
  /* script */
  __webpack_require__(596),
  /* template */
  __webpack_require__(727),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = changeTheme;
/* harmony export (immutable) */ __webpack_exports__["b"] = IPAddress;
/* harmony export (immutable) */ __webpack_exports__["a"] = tranlateDataTree;
/**
 * Created by Administrator on 2017/7/19 0019.
 */
//改变主题的方法
function changeTheme(element, themeClass) {
    if (!element || !themeClass) {
        return;
    }
    var classString = element.className;
    var nameIndex = classString.indexOf(themeClass);
    if (nameIndex === -1) {
        classString = themeClass;
    } else {
        classString = null;
    }
    element.className = classString;
}
//获取用户的ip地址
function IPAddress() {
    return returnCitySN;
}

//将对象结构转换为树形结构

function tranlateDataTree(old_arr) {
    var temp_arr = [];
    old_arr.map(function (item, key) {
        if (item.parentId == 1) {
            item.rank = 1;
            temp_arr.push(item);
        }
    });
    temp_arr.map(function (item) {
        translate(old_arr, item);
    });
    function translate(old_arr, temp_i) {
        temp_i.children = [];
        var temp_rank = temp_i.rank;
        old_arr.map(function (item, key) {
            if (item.parentId == temp_i.id) {
                item.rank = temp_rank + 1;
                temp_i.children.push(item);
            }
        });
        if (!temp_i.children.length) {
            return true;
        } else {
            temp_i.children.map(function (item_arr) {
                translate(old_arr, item_arr);
            });
        }
    }
    return temp_arr;
}

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(555), __esModule: true };

/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(60)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
});


/***/ }),

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = hasClass;
/* harmony export (immutable) */ __webpack_exports__["c"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["a"] = removeClass;
/* unused harmony export setStyle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* istanbul ignore next */



const isServer = __WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();
/* harmony export (immutable) */ __webpack_exports__["d"] = on;


/* istanbul ignore next */
const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
/* unused harmony export off */


/* istanbul ignore next */
const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
/* unused harmony export once */


/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};
/* unused harmony export getStyle */


/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};


/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
});;


/***/ }),

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Administrator on 2017/8/3 0003.
 */
var findFromTree = function findFromTree(treeArray, id) {
    var idPropName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "id";
    var childrenPropName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "children";

    if (!treeArray || treeArray == null || treeArray.length <= 0) return null;
    for (var i = 0; i < treeArray.length; i++) {
        if (treeArray[i][idPropName] == id) {
            return treeArray[i];
        } else {
            var result = findFromTree(treeArray[i][childrenPropName], id, idPropName, childrenPropName);
            if (result != null) {
                return result;
            }
        }
    }
    return null;
};

var appendTreeNode = function appendTreeNode(treeArray, item) {
    var idPropName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "id";
    var parentPropName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "parentId";
    var childrenPropName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "children";

    if (treeArray == null || treeArray.length <= 0) return;
    if (!item[parentPropName] || item[parentPropName] == null) {
        var i = treeArray.findIndex(function (p) {
            return p.sort > item.sort;
        });
        if (i == -1) {
            i = treeArray.length;
        }
        treeArray.splice(i, 0, item);
        return;
    }
    for (var j = 0; j < treeArray.length; j++) {
        var value = treeArray[j];
        if (item[parentPropName] == value[idPropName]) {
            if (value[childrenPropName] && value[childrenPropName].length > 0) {
                var _i = value[childrenPropName].findIndex(function (p) {
                    return p.sort > item.sort;
                });
                if (_i == -1) {
                    _i = value[childrenPropName].length;
                }
                value[childrenPropName].splice(_i, 0, item);
            } else {
                value[childrenPropName] = [];
                value[childrenPropName].push(item);
            }
        } else {
            appendTreeNode(value[childrenPropName], item, idPropName, parentPropName, childrenPropName);
        }
    }
};

var deleteFromTree = function deleteFromTree(list, id) {
    var idPropName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "id";
    var childrenPropName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "children";

    if (!list || list == null || list.length <= 0) return true;
    for (var i = 0; i < list.length; i++) {
        if (list[i][idPropName] == id) {
            list.splice(i, 1);
            return true;
        } else {
            var result = deleteFromTree(list[i][childrenPropName], id, idPropName, childrenPropName);
            if (result) {
                return result;
            }
        }
    }
    return false;
};

var batchDeleteFromTree = function batchDeleteFromTree(list, ids) {
    var idPropName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "id";
    var childrenPropName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "children";

    if (!list || list == null || list.length <= 0) return;
    if (!ids || ids == null || ids.length <= 0) return;
    for (var i = 0; i < list.length; i++) {
        if (ids.findIndex(function (x) {
            return x == list[i][idPropName];
        }) > -1) {
            list.splice(i, 1);
            i--;
            continue;
        } else {
            batchDeleteFromTree(list[i][childrenPropName], ids, idPropName, childrenPropName);
        }
    }
};

var updateTreeNode = function updateTreeNode(list, item) {
    var idPropName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "id";
    var childrenPropName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "children";

    if (!list || list == null || list.length <= 0) return false;
    for (var i = 0; i < list.length; i++) {
        if (list[i][idPropName] == item[idPropName]) {
            console.log(list[i][idPropName], item[idPropName]);
            list.splice(i, 1, item);
            return true;
        } else {
            var result = updateTreeNode(list[i][childrenPropName], item, idPropName, childrenPropName);
            if (result) {
                return result;
            }
        }
    }
    return false;
};

/* harmony default export */ __webpack_exports__["a"] = ({
    methods: {
        findFromTree: findFromTree,
        appendTreeNode: appendTreeNode,
        deleteFromTree: deleteFromTree,
        updateTreeNode: updateTreeNode,
        batchDeleteFromTree: batchDeleteFromTree
    }
});

/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_locale_lang_zh_CN__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_deepmerge__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_deepmerge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_deepmerge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__format__ = __webpack_require__(657);





const format = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__format__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1_vue__["default"]);
let lang = __WEBPACK_IMPORTED_MODULE_0_element_ui_src_locale_lang_zh_CN__["a" /* default */];
let merged = false;
let i18nHandler = function() {
  const vuei18n = Object.getPrototypeOf(this || __WEBPACK_IMPORTED_MODULE_1_vue__["default"]).$t;
  if (typeof vuei18n === 'function' && !!__WEBPACK_IMPORTED_MODULE_1_vue__["default"].locale) {
    if (!merged) {
      merged = true;
      __WEBPACK_IMPORTED_MODULE_1_vue__["default"].locale(
        __WEBPACK_IMPORTED_MODULE_1_vue__["default"].config.lang,
        __WEBPACK_IMPORTED_MODULE_2_deepmerge___default()(lang, __WEBPACK_IMPORTED_MODULE_1_vue__["default"].locale(__WEBPACK_IMPORTED_MODULE_1_vue__["default"].config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, arguments);
  }
};

const t = function(path, options) {
  let value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};
/* harmony export (immutable) */ __webpack_exports__["a"] = t;


const use = function(l) {
  lang = l || lang;
};
/* unused harmony export use */


const i18n = function(fn) {
  i18nHandler = fn || i18nHandler;
};
/* unused harmony export i18n */


/* unused harmony default export */ var _unused_webpack_default_export = ({ use, t, i18n });


/***/ }),

/***/ 576:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_vue_popper__ = __webpack_require__(667);
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ElSelectDropdown',

  componentName: 'ElSelectDropdown',

  mixins: [__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_vue_popper__["a" /* default */]],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default: function _default() {
        return {
          forceAbsolute: true,
          gpuAcceleration: false
        };
      }
    }
  },

  data: function data() {
    return {
      minWidth: ''
    };
  },


  computed: {
    popperClass: function popperClass() {
      return this.$parent.popperClass;
    }
  },

  watch: {
    '$parent.inputWidth': function $parentInputWidth() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', function () {
      if (_this.$parent.visible) _this.updatePopper();
    });
    this.$on('destroyPopper', this.destroyPopper);
  }
});

/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_mixins_emitter__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_src_mixins_locale__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_packages_select_src_select_dropdown_vue__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_packages_select_src_select_dropdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_element_ui_packages_select_src_select_dropdown_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_clickoutside__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_src_utils_dom__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_element_ui_src_utils_resize_event__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_element_ui_src_locale__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_element_ui_src_utils_merge__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_tableTree_treeter__ = __webpack_require__(572);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










var sizeMap = {
    'large': 42,
    'small': 30,
    'mini': 22
};
/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0_element_ui_src_mixins_emitter__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1_element_ui_src_mixins_locale__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__components_tableTree_treeter__["a" /* default */]],
    name: 'ElSelectTree',
    componentName: 'ElSelectTree',
    computed: {
        iconClass: function iconClass() {
            var criteria = this.clearable && !this.disabled && this.inputHovering && !this.multiple && this.value !== undefined && this.value != null && this.value !== '';
            return criteria ? 'circle-close is-show-close' : 'caret-top';
        },
        emptyText: function emptyText() {
            if (this.loading) {
                return this.loadingText || this.t('el.select.loading');
            } else {
                if (this.treeData.length === 0) {
                    return this.noDataText || this.t('el.select.noData');
                }
            }
            return null;
        }
    },
    components: { ElSelectMenu: __WEBPACK_IMPORTED_MODULE_2_element_ui_packages_select_src_select_dropdown_vue___default.a },
    directives: { Clickoutside: __WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_clickoutside__["a" /* default */] },
    props: {
        name: String,
        value: {},
        treeData: Array,
        size: String,
        disabled: Boolean,
        clearable: Boolean,
        loading: Boolean,
        popperClass: String,
        loadingText: String,
        noDataText: String,
        multiple: Boolean,
        propNames: {
            type: Object,
            default: function _default() {
                return { children: 'children', label: 'label', id: 'id' };
            }
        },
        multipleLimit: {
            type: Number,
            default: 0
        },
        placeholder: {
            type: String,
            default: function _default() {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_element_ui_src_locale__["a" /* t */])('el.select.placeholder');
            }
        }
    },
    data: function data() {
        return {
            selected: this.multiple ? [] : {},
            inputLength: 20,
            inputWidth: 0,
            currentPlaceholder: '',
            dropdownUl: null,
            visible: false,
            selectedLabel: '',
            bottomOverflow: 0,
            topOverflow: 0,
            inputHovering: false
        };
    },

    watch: {
        value: function value(val) {
            this.handleResize();
            if (!!val) {
                this.currentPlaceholder = '';
            } else {
                this.currentPlaceholder = this.placeholder;
            }
            this.setSelected(val);
            this.$emit('change', val);
            this.dispatch('ElFormItem', 'el.form.change', val);
        },
        visible: function visible(val) {
            if (!val) {
                this.$refs.reference.$el.querySelector('input').blur();
                this.handleIconHide();
                this.broadcast('ElSelectDropdown', 'destroyPopper');
                if (!this.multiple) {
                    this.inputLength = 20;
                    this.getOverflows();
                }
            } else {
                this.handleIconShow();
                this.broadcast('ElSelectDropdown', 'updatePopper');
            }
            this.$emit('visible-change', val);
        }
    },
    methods: {
        handleIconHide: function handleIconHide() {
            var icon = this.$el.querySelector('.el-input__icon');
            if (icon) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_element_ui_src_utils_dom__["a" /* removeClass */])(icon, 'is-reverse');
            }
        },
        handleIconShow: function handleIconShow() {
            var icon = this.$el.querySelector('.el-input__icon');
            if (icon && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_element_ui_src_utils_dom__["b" /* hasClass */])(icon, 'el-icon-circle-close')) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_element_ui_src_utils_dom__["c" /* addClass */])(icon, 'is-reverse');
            }
        },
        handleMenuEnter: function handleMenuEnter() {
            if (!this.dropdownUl) {
                this.dropdownUl = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap');
                this.getOverflows();
            }
            if (!this.multiple && this.dropdownUl) {
                this.resetMenuScroll();
            }
        },
        getOverflows: function getOverflows() {
            if (this.dropdownUl && this.selected && this.selected.$el) {
                var selectedRect = this.selected.$el.getBoundingClientRect();
                var popperRect = this.$refs.popper.$el.getBoundingClientRect();
                this.bottomOverflow = selectedRect.bottom - popperRect.bottom;
                this.topOverflow = selectedRect.top - popperRect.top;
            }
        },
        resetMenuScroll: function resetMenuScroll() {
            if (this.bottomOverflow > 0) {
                this.dropdownUl.scrollTop += this.bottomOverflow;
            } else if (this.topOverflow < 0) {
                this.dropdownUl.scrollTop += this.topOverflow;
            }
        },
        setSelected: function setSelected(ids) {
            if (!!ids) {
                if (this.multiple) {
                    this.$refs.tree.setCheckedKeys(ids);
                    this.selected = this.$refs.tree.getCheckedNodes();
                } else {
                    this.selected = this.findFromTree(this.treeData, ids, this.propNames.id, this.propNames.children);
                    this.selectedLabel = !!this.selected ? this.selected[this.propNames.label] : '';
                }
            } else {
                this.selected = this.multiple ? [] : {};
                this.selectedLabel = '';
            }
        },
        handleIconClick: function handleIconClick(event) {
            if (this.iconClass.indexOf('circle-close') > -1) {
                this.deleteSelected(event);
            } else {
                this.toggleMenu();
            }
        },
        doDestroy: function doDestroy() {
            this.$refs.popper && this.$refs.popper.doDestroy();
        },
        handleClose: function handleClose() {
            this.visible = false;
        },
        managePlaceholder: function managePlaceholder() {
            if (this.currentPlaceholder !== '') {
                this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
            }
        },
        resetInputState: function resetInputState(e) {
            if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
            this.inputLength = this.$refs.input.value.length * 15 + 20;
            this.resetInputHeight();
        },
        resetInputHeight: function resetInputHeight() {
            var _this = this;

            this.$nextTick(function () {
                if (!_this.$refs.reference) return;
                var inputChildNodes = _this.$refs.reference.$el.childNodes;
                var input = [].filter.call(inputChildNodes, function (item) {
                    return item.tagName === 'INPUT';
                })[0];
                input.style.height = Math.max(_this.$refs.tags.clientHeight + 6, sizeMap[_this.size] || 36) + 'px';
                if (_this.visible && _this.emptyText !== false) {
                    _this.broadcast('ElSelectDropdown', 'updatePopper');
                }
            });
        },
        handleTreeNodeClick: function handleTreeNodeClick(nodeData) {
            if (this.multiple) return;
            this.$emit('input', nodeData.id);
            this.visible = false;
            this.selectedLabel = nodeData[this.propNames.label];
            this.selected = nodeData;
            this.handleResize();
        },
        handleCheckChange: function handleCheckChange(data, checked, indeterminate) {
            if (!this.multiple) return;
            this.selected = this.$refs.tree.getCheckedNodes();
            var tmpValue = [];
            if (this.selected) {
                this.selected.forEach(function (item, index) {
                    tmpValue.push(item.id);
                });
            }
            this.$emit('input', tmpValue);
            this.handleResize();
        },
        toggleMenu: function toggleMenu() {
            if (this.visible) {
                return;
            }
            if (!this.disabled) {
                this.visible = !this.visible;
            }
        },
        resetScrollTop: function resetScrollTop() {
            var bottomOverflowDistance = this.options[this.hoverIndex].$el.getBoundingClientRect().bottom - this.$refs.popper.$el.getBoundingClientRect().bottom;
            var topOverflowDistance = this.options[this.hoverIndex].$el.getBoundingClientRect().top - this.$refs.popper.$el.getBoundingClientRect().top;
            if (bottomOverflowDistance > 0) {
                this.dropdownUl.scrollTop += bottomOverflowDistance;
            }
            if (topOverflowDistance < 0) {
                this.dropdownUl.scrollTop += topOverflowDistance;
            }
        },
        deleteSelected: function deleteSelected(event) {
            event.stopPropagation();
            this.$emit('input', '');
            this.selected = {};
            this.selectedLabel = '';
            this.visible = false;
        },
        deleteTag: function deleteTag(event, tag) {
            var index = this.selected.indexOf(tag);
            if (index > -1 && !this.disabled) {
                this.value.splice(index, 1);
                this.selected.splice(index, 1);
                this.$emit('remove-tag', tag);
            }
            event.stopPropagation();
        },
        resetInputWidth: function resetInputWidth() {
            this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
        },
        handleResize: function handleResize() {
            this.resetInputWidth();
            if (this.multiple) {
                this.resetInputHeight();
            } else {
                this.inputLength = 20;
            }
        }
    },
    created: function created() {
        this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
        if (this.multiple && !Array.isArray(this.value)) {
            this.$emit('input', []);
        }
        if (!this.multiple && Array.isArray(this.value)) {
            this.$emit('input', '');
        }
        this.setSelected();
        this.$on('setSelected', this.setSelected);
    },
    mounted: function mounted() {
        var _this2 = this;

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_element_ui_src_utils_resize_event__["a" /* addResizeListener */])(this.$el, this.handleResize);
        this.$nextTick(function () {
            if (_this2.$refs.reference && _this2.$refs.reference.$el) {
                _this2.inputWidth = _this2.$refs.reference.$el.getBoundingClientRect().width;
            }
        });
    },
    beforeDestroy: function beforeDestroy() {
        if (this.$el && this.handleResize) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_element_ui_src_utils_resize_event__["b" /* removeResizeListener */])(this.$el, this.handleResize);
    }
});

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_tsgz_admin_node_modules_babel_runtime_core_js_json_stringify__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_tsgz_admin_node_modules_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_E_tsgz_admin_node_modules_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_tableTree_selectTree_vue__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_tableTree_selectTree_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_tableTree_selectTree_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_tableTree_treeter__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_merge__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_js_ajax__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(553);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_2__components_tableTree_treeter__["a" /* default */]],
    components: {
        'el-select-tree': __WEBPACK_IMPORTED_MODULE_1__components_tableTree_selectTree_vue___default.a
    },
    data: function data() {
        return {
            gccList: [],
            height: 0,
            filterText: '',
            detaillData: {},
            selectIconDialog: false,
            formLabelWidth: '100px',
            defaultProps: {
                children: 'children',
                label: 'name',
                id: "id"
            },
            maxId: 7000000,
            form: {
                id: null,
                name: '',
                sort: 0,
                icon: '',
                href: '',
                isShow: '',
                delivery: false,
                parentId: null,
                desc: ''
            },
            dialogTableVisible: false //获取添加商品代码的弹窗
        };
    },
    mounted: function mounted() {
        //设置首行高亮
        window.setTimeout(function () {
            $('.filter-tree .el-tree-node').eq(0).addClass("is-current");
        }, 100);
    },

    methods: {
        filterNode: function filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        choNodeKey: function choNodeKey(obj, node, self) {
            $('.filter-tree .el-tree-node').eq(0).removeClass("is-current");
            this.form = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_merge__["a" /* default */])({}, obj);
        },
        selectIcon: function selectIcon(event) {
            this.form.icon = event.target.className;
            this.selectIconDialog = false;
        },
        renderContent: function renderContent(h, _ref) {
            var node = _ref.node,
                data = _ref.data,
                store = _ref.store;

            return h(
                "span",
                null,
                [h(
                    "span",
                    null,
                    [h(
                        "span",
                        null,
                        [h(
                            "i",
                            { "class": data.icon },
                            []
                        ), "\xA0", node.label]
                    )]
                )]
            );
        },
        newAdd: function newAdd() {
            this.form = {
                id: null,
                name: '',
                sort: 0,
                icon: '',
                href: '',
                isShow: '',
                delivery: false,
                parentId: null,
                desc: ''
            };
        },
        deleteSelected: function deleteSelected() {
            var _this = this;
            __WEBPACK_IMPORTED_MODULE_4__assets_js_ajax__["a" /* default */].delete("website/gcc/gccContror/deleteMeun", {
                id: this.form.id
            }, function () {
                _this.$message('操作成功');
                _this.deleteFromTree(_this.gccList, _this.form.id);
                _this.newAdd();
            });
        },

        /*batchDelete(){
            var checkKeys = this.$refs.menuTree.getCheckedKeys();
            if (checkKeys == null || checkKeys.length <= 0) {
                this.$message.warning('请选择要删除的资源');
                return;
            }
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(api.SYS_MENU_DELETE + "?menuIds=" + checkKeys.join(','))
                    .then(res => {
                        this.$message('操作成功');
                        this.load();
                    }).catch(e => {
                    this.$message('操作成功');
                    console.log(checkKeys);
                    this.batchDeleteFromTree(this.menuTree, checkKeys);
                })
            });
        },*/
        handleNodeClick: function handleNodeClick(data) {
            this.form = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_merge__["a" /* default */])({}, data);
        },
        handleGoodsClass: function handleGoodsClass() {
            this.dialogTableVisible = true;
            var menu_id = this.form.id;
            __WEBPACK_IMPORTED_MODULE_4__assets_js_ajax__["a" /* default */].get("website/gcc/gccViewGoodsContror/findAllList", { menuid: menu_id }, function (res) {
                console.log(res);
            });
        },
        onSubmit: function onSubmit() {
            var _this = this;
            if (this.form.id === null) {
                __WEBPACK_IMPORTED_MODULE_4__assets_js_ajax__["a" /* default */].post("website/gcc/gccContror/addeditMeun", {
                    params: __WEBPACK_IMPORTED_MODULE_0_E_tsgz_admin_node_modules_babel_runtime_core_js_json_stringify___default()(_this.form)
                }, function (res) {
                    _this.$message('操作成功');
                    _this.form.id = res.data.id;
                    _this.appendTreeNode(_this.gccList, _this.form);
                });
                /*this.$http.post(api.SYS_MENU_ADD, this.form)
                    .then(res => {
                        this.$message('操作成功');
                        this.form.id = res.data.id;
                        this.appendTreeNode(this.menuTree, res.data);
                    }).catch(e => {
                    this.maxId += 1;
                    this.$message('操作成功');
                    this.form.id = this.maxId;
                    var  ddd = {
                        id: this.form.id,
                        name: this.form.name,
                        sort: this.form.sort,
                        icon:this.form.icon,
                        href:this.form.href,
                        isShow: this.form.isShow,
                        delivery: this.form.delivery,
                        parentId: this.form.parentId,
                        desc: this.form.desc,
                        children:[]
                    }
                    console.log(ddd)
                    this.appendTreeNode(this.menuTree, ddd);
                    this.menuTree.push({});
                    this.menuTree.pop();
                })*/
            } else {
                __WEBPACK_IMPORTED_MODULE_4__assets_js_ajax__["a" /* default */].post("website/gcc/gccContror/addeditMeun", {
                    params: __WEBPACK_IMPORTED_MODULE_0_E_tsgz_admin_node_modules_babel_runtime_core_js_json_stringify___default()(_this.form)
                }, function (res) {
                    _this.$message('操作成功');
                    _this.updateTreeNode(_this.gccList, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_merge__["a" /* default */])({}, this.form));
                });
            }
        },
        load: function load() {
            var _this = this;
            __WEBPACK_IMPORTED_MODULE_4__assets_js_ajax__["a" /* default */].get('website/gcc/gccContror/findGccList', {}, function (data) {
                _this.gccList = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* tranlateDataTree */])(data);
                _this.form = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_merge__["a" /* default */])({}, _this.gccList[0]);
            });
        }
    },
    created: function created() {
        this.load();
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(87)))

/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(undefined);
// imports


// module
exports.push([module.i, ".select-tree .icons-wrapper{display:block}.select-tree .is-empty i{width:30px;height:30px;line-height:30px;text-align:center;display:inline-block;cursor:pointer}.select-tree .is-empty i:hover{background-color:#0d6aad;color:#fff}.goodsPage{display:-webkit-box;display:-ms-flexbox;display:flex;padding-bottom:44px}.goodsPage .tableTree{height:100%;width:200px;overflow-x:auto;position:relative;z-index:1}.goodsPage .tableTree .el-input{width:175px;margin:10px 5px}.goodsPage .tableTree .el-tree{border:none}.goodsPage .tableTree .el-tree .el-tree-node__label{font-size:12px}.goodsPage .content{position:relative;margin-left:-15px;height:100%;z-index:2;background:#fff;-webkit-box-flex:4;-ms-flex:4;flex:4;border-left:1px solid #ddd}.goodsPage .content header{height:40px;display:-webkit-box;display:-ms-flexbox;display:flex;padding-left:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-bottom:1px solid #ddd}.goodsPage .content header .el-button{height:30px}.goodsPage .content .checkbox,.goodsPage .content .radio{display:inline-block}.goodsPage .content .el-form-item__content{line-height:inherit}.goodsPage .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content,.goodsPage .goodsPage .el-tree .el-tree-node>.el-tree-node__content{background-color:#ddd!important}", ""]);

// exports


/***/ }),

/***/ 657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_util__ = __webpack_require__(666);


const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
/* harmony default export */ __webpack_exports__["a"] = (function(Vue) {

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string, ...args) {
    if (args.length === 1 && typeof args[0] === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      let result;

      if (string[index - 1] === '{' &&
        string[index + match.length] === '}') {
        return i;
      } else {
        result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_element_ui_src_utils_util__["a" /* hasOwn */])(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
});


/***/ }),

/***/ 658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  el: {
    colorpicker: {
      confirm: '确定',
      clear: '清空'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      // week: '周次',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    select: {
      loading: '加载中',
      noMatch: '无匹配数据',
      noData: '无数据',
      placeholder: '请选择'
    },
    cascader: {
      noMatch: '无匹配数据',
      loading: '加载中',
      placeholder: '请选择'
    },
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    tree: {
      emptyText: '暂无数据'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    }
  }
});


/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_locale__ = __webpack_require__(575);


/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    t(...args) {
      return __WEBPACK_IMPORTED_MODULE_0_element_ui_src_locale__["a" /* t */].apply(this, args);
    }
  }
});


/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__ = __webpack_require__(565);



const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;

!__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["d" /* on */])(document, 'mousedown', e => (startClick = e));

!__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["d" /* on */])(document, 'mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});
/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  bind(el, binding, vnode) {
    const id = nodeList.push(el) - 1;
    const documentHandler = function(mouseup = {}, mousedown = {}) {
      if (!vnode.context ||
        !mouseup.target ||
        !mousedown.target ||
        el.contains(mouseup.target) ||
        (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
        vnode.context.popperElm.contains(mousedown.target)))) return;

      if (binding.expression &&
        el[ctx].methodName &&
        vnode.context[el[ctx].methodName]) {
        vnode.context[el[ctx].methodName]();
      } else {
        el[ctx].bindingFn && el[ctx].bindingFn();
      }
    };
    el[ctx] = {
      id,
      documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },

  update(el, binding) {
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
  }
});


/***/ }),

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version {{version}}
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//
// Cross module loader
// Supported: Node, AMD, Browser globals
//
;(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.Popper = factory();
    }
}(this, function () {

    'use strict';

    var root = window;

    // default options
    var DEFAULTS = {
        // placement of the popper
        placement: 'bottom',

        gpuAcceleration: true,

        // shift popper from its origin by the given amount of pixels (can be negative)
        offset: 0,

        // the element which will act as boundary of the popper
        boundariesElement: 'viewport',

        // amount of pixel used to define a minimum distance between the boundaries and the popper
        boundariesPadding: 5,

        // popper will try to prevent overflow following this order,
        // by default, then, it could overflow on the left and on top of the boundariesElement
        preventOverflowOrder: ['left', 'right', 'top', 'bottom'],

        // the behavior used by flip to change the placement of the popper
        flipBehavior: 'flip',

        arrowElement: '[x-arrow]',

        // list of functions used to modify the offsets before they are applied to the popper
        modifiers: [ 'shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle'],

        modifiersIgnored: [],

        forceAbsolute: false
    };

    /**
     * Create a new Popper.js instance
     * @constructor Popper
     * @param {HTMLElement} reference - The reference element used to position the popper
     * @param {HTMLElement|Object} popper
     *      The HTML element used as popper, or a configuration used to generate the popper.
     * @param {String} [popper.tagName='div'] The tag name of the generated popper.
     * @param {Array} [popper.classNames=['popper']] Array of classes to apply to the generated popper.
     * @param {Array} [popper.attributes] Array of attributes to apply, specify `attr:value` to assign a value to it.
     * @param {HTMLElement|String} [popper.parent=window.document.body] The parent element, given as HTMLElement or as query string.
     * @param {String} [popper.content=''] The content of the popper, it can be text, html, or node; if it is not text, set `contentType` to `html` or `node`.
     * @param {String} [popper.contentType='text'] If `html`, the `content` will be parsed as HTML. If `node`, it will be appended as-is.
     * @param {String} [popper.arrowTagName='div'] Same as `popper.tagName` but for the arrow element.
     * @param {Array} [popper.arrowClassNames='popper__arrow'] Same as `popper.classNames` but for the arrow element.
     * @param {String} [popper.arrowAttributes=['x-arrow']] Same as `popper.attributes` but for the arrow element.
     * @param {Object} options
     * @param {String} [options.placement=bottom]
     *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -right),
     *      left(-start, -end)`
     *
     * @param {HTMLElement|String} [options.arrowElement='[x-arrow]']
     *      The DOM Node used as arrow for the popper, or a CSS selector used to get the DOM node. It must be child of
     *      its parent Popper. Popper.js will apply to the given element the style required to align the arrow with its
     *      reference element.
     *      By default, it will look for a child node of the popper with the `x-arrow` attribute.
     *
     * @param {Boolean} [options.gpuAcceleration=true]
     *      When this property is set to true, the popper position will be applied using CSS3 translate3d, allowing the
     *      browser to use the GPU to accelerate the rendering.
     *      If set to false, the popper will be placed using `top` and `left` properties, not using the GPU.
     *
     * @param {Number} [options.offset=0]
     *      Amount of pixels the popper will be shifted (can be negative).
     *
     * @param {String|Element} [options.boundariesElement='viewport']
     *      The element which will define the boundaries of the popper position, the popper will never be placed outside
     *      of the defined boundaries (except if `keepTogether` is enabled)
     *
     * @param {Number} [options.boundariesPadding=5]
     *      Additional padding for the boundaries
     *
     * @param {Array} [options.preventOverflowOrder=['left', 'right', 'top', 'bottom']]
     *      Order used when Popper.js tries to avoid overflows from the boundaries, they will be checked in order,
     *      this means that the last ones will never overflow
     *
     * @param {String|Array} [options.flipBehavior='flip']
     *      The behavior used by the `flip` modifier to change the placement of the popper when the latter is trying to
     *      overlap its reference element. Defining `flip` as value, the placement will be flipped on
     *      its axis (`right - left`, `top - bottom`).
     *      You can even pass an array of placements (eg: `['right', 'left', 'top']` ) to manually specify
     *      how alter the placement when a flip is needed. (eg. in the above example, it would first flip from right to left,
     *      then, if even in its new placement, the popper is overlapping its reference element, it will be moved to top)
     *
     * @param {Array} [options.modifiers=[ 'shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle']]
     *      List of functions used to modify the data before they are applied to the popper, add your custom functions
     *      to this array to edit the offsets and placement.
     *      The function should reflect the @params and @returns of preventOverflow
     *
     * @param {Array} [options.modifiersIgnored=[]]
     *      Put here any built-in modifier name you want to exclude from the modifiers list
     *      The function should reflect the @params and @returns of preventOverflow
     *
     * @param {Boolean} [options.removeOnDestroy=false]
     *      Set to true if you want to automatically remove the popper when you call the `destroy` method.
     */
    function Popper(reference, popper, options) {
        this._reference = reference.jquery ? reference[0] : reference;
        this.state = {};

        // if the popper variable is a configuration object, parse it to generate an HTMLElement
        // generate a default popper if is not defined
        var isNotDefined = typeof popper === 'undefined' || popper === null;
        var isConfig = popper && Object.prototype.toString.call(popper) === '[object Object]';
        if (isNotDefined || isConfig) {
            this._popper = this.parse(isConfig ? popper : {});
        }
        // otherwise, use the given HTMLElement as popper
        else {
            this._popper = popper.jquery ? popper[0] : popper;
        }

        // with {} we create a new object with the options inside it
        this._options = Object.assign({}, DEFAULTS, options);

        // refactoring modifiers' list
        this._options.modifiers = this._options.modifiers.map(function(modifier){
            // remove ignored modifiers
            if (this._options.modifiersIgnored.indexOf(modifier) !== -1) return;

            // set the x-placement attribute before everything else because it could be used to add margins to the popper
            // margins needs to be calculated to get the correct popper offsets
            if (modifier === 'applyStyle') {
                this._popper.setAttribute('x-placement', this._options.placement);
            }

            // return predefined modifier identified by string or keep the custom one
            return this.modifiers[modifier] || modifier;
        }.bind(this));

        // make sure to apply the popper position before any computation
        this.state.position = this._getPosition(this._popper, this._reference);
        setStyle(this._popper, { position: this.state.position, top: 0 });

        // fire the first update to position the popper in the right place
        this.update();

        // setup event listeners, they will take care of update the position in specific situations
        this._setupEventListeners();
        return this;
    }


    //
    // Methods
    //
    /**
     * Destroy the popper
     * @method
     * @memberof Popper
     */
    Popper.prototype.destroy = function() {
        this._popper.removeAttribute('x-placement');
        this._popper.style.left = '';
        this._popper.style.position = '';
        this._popper.style.top = '';
        this._popper.style[getSupportedPropertyName('transform')] = '';
        this._removeEventListeners();

        // remove the popper if user explicity asked for the deletion on destroy
        if (this._options.removeOnDestroy) {
            this._popper.remove();
        }
        return this;
    };

    /**
     * Updates the position of the popper, computing the new offsets and applying the new style
     * @method
     * @memberof Popper
     */
    Popper.prototype.update = function() {
        var data = { instance: this, styles: {} };

        // store placement inside the data object, modifiers will be able to edit `placement` if needed
        // and refer to _originalPlacement to know the original value
        data.placement = this._options.placement;
        data._originalPlacement = this._options.placement;

        // compute the popper and reference offsets and put them inside data.offsets
        data.offsets = this._getOffsets(this._popper, this._reference, data.placement);

        // get boundaries
        data.boundaries = this._getBoundaries(data, this._options.boundariesPadding, this._options.boundariesElement);

        data = this.runModifiers(data, this._options.modifiers);

        if (typeof this.state.updateCallback === 'function') {
            this.state.updateCallback(data);
        }

    };

    /**
     * If a function is passed, it will be executed after the initialization of popper with as first argument the Popper instance.
     * @method
     * @memberof Popper
     * @param {Function} callback
     */
    Popper.prototype.onCreate = function(callback) {
        // the createCallbacks return as first argument the popper instance
        callback(this);
        return this;
    };

    /**
     * If a function is passed, it will be executed after each update of popper with as first argument the set of coordinates and informations
     * used to style popper and its arrow.
     * NOTE: it doesn't get fired on the first call of the `Popper.update()` method inside the `Popper` constructor!
     * @method
     * @memberof Popper
     * @param {Function} callback
     */
    Popper.prototype.onUpdate = function(callback) {
        this.state.updateCallback = callback;
        return this;
    };

    /**
     * Helper used to generate poppers from a configuration file
     * @method
     * @memberof Popper
     * @param config {Object} configuration
     * @returns {HTMLElement} popper
     */
    Popper.prototype.parse = function(config) {
        var defaultConfig = {
            tagName: 'div',
            classNames: [ 'popper' ],
            attributes: [],
            parent: root.document.body,
            content: '',
            contentType: 'text',
            arrowTagName: 'div',
            arrowClassNames: [ 'popper__arrow' ],
            arrowAttributes: [ 'x-arrow']
        };
        config = Object.assign({}, defaultConfig, config);

        var d = root.document;

        var popper = d.createElement(config.tagName);
        addClassNames(popper, config.classNames);
        addAttributes(popper, config.attributes);
        if (config.contentType === 'node') {
            popper.appendChild(config.content.jquery ? config.content[0] : config.content);
        }else if (config.contentType === 'html') {
            popper.innerHTML = config.content;
        } else {
            popper.textContent = config.content;
        }

        if (config.arrowTagName) {
            var arrow = d.createElement(config.arrowTagName);
            addClassNames(arrow, config.arrowClassNames);
            addAttributes(arrow, config.arrowAttributes);
            popper.appendChild(arrow);
        }

        var parent = config.parent.jquery ? config.parent[0] : config.parent;

        // if the given parent is a string, use it to match an element
        // if more than one element is matched, the first one will be used as parent
        // if no elements are matched, the script will throw an error
        if (typeof parent === 'string') {
            parent = d.querySelectorAll(config.parent);
            if (parent.length > 1) {
                console.warn('WARNING: the given `parent` query(' + config.parent + ') matched more than one element, the first one will be used');
            }
            if (parent.length === 0) {
                throw 'ERROR: the given `parent` doesn\'t exists!';
            }
            parent = parent[0];
        }
        // if the given parent is a DOM nodes list or an array of nodes with more than one element,
        // the first one will be used as parent
        if (parent.length > 1 && parent instanceof Element === false) {
            console.warn('WARNING: you have passed as parent a list of elements, the first one will be used');
            parent = parent[0];
        }

        // append the generated popper to its parent
        parent.appendChild(popper);

        return popper;

        /**
         * Adds class names to the given element
         * @function
         * @ignore
         * @param {HTMLElement} target
         * @param {Array} classes
         */
        function addClassNames(element, classNames) {
            classNames.forEach(function(className) {
                element.classList.add(className);
            });
        }

        /**
         * Adds attributes to the given element
         * @function
         * @ignore
         * @param {HTMLElement} target
         * @param {Array} attributes
         * @example
         * addAttributes(element, [ 'data-info:foobar' ]);
         */
        function addAttributes(element, attributes) {
            attributes.forEach(function(attribute) {
                element.setAttribute(attribute.split(':')[0], attribute.split(':')[1] || '');
            });
        }

    };

    /**
     * Helper used to get the position which will be applied to the popper
     * @method
     * @memberof Popper
     * @param config {HTMLElement} popper element
     * @param reference {HTMLElement} reference element
     * @returns {String} position
     */
    Popper.prototype._getPosition = function(popper, reference) {
        var container = getOffsetParent(reference);

        if (this._options.forceAbsolute) {
            return 'absolute';
        }

        // Decide if the popper will be fixed
        // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
        var isParentFixed = isFixed(reference, container);
        return isParentFixed ? 'fixed' : 'absolute';
    };

    /**
     * Get offsets to the popper
     * @method
     * @memberof Popper
     * @access private
     * @param {Element} popper - the popper element
     * @param {Element} reference - the reference element (the popper will be relative to this)
     * @returns {Object} An object containing the offsets which will be applied to the popper
     */
    Popper.prototype._getOffsets = function(popper, reference, placement) {
        placement = placement.split('-')[0];
        var popperOffsets = {};

        popperOffsets.position = this.state.position;
        var isParentFixed = popperOffsets.position === 'fixed';

        //
        // Get reference element position
        //
        var referenceOffsets = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), isParentFixed);

        //
        // Get popper sizes
        //
        var popperRect = getOuterSizes(popper);

        //
        // Compute offsets of popper
        //

        // depending by the popper placement we have to compute its offsets slightly differently
        if (['right', 'left'].indexOf(placement) !== -1) {
            popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - popperRect.height / 2;
            if (placement === 'left') {
                popperOffsets.left = referenceOffsets.left - popperRect.width;
            } else {
                popperOffsets.left = referenceOffsets.right;
            }
        } else {
            popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
            if (placement === 'top') {
                popperOffsets.top = referenceOffsets.top - popperRect.height;
            } else {
                popperOffsets.top = referenceOffsets.bottom;
            }
        }

        // Add width and height to our offsets object
        popperOffsets.width   = popperRect.width;
        popperOffsets.height  = popperRect.height;


        return {
            popper: popperOffsets,
            reference: referenceOffsets
        };
    };


    /**
     * Setup needed event listeners used to update the popper position
     * @method
     * @memberof Popper
     * @access private
     */
    Popper.prototype._setupEventListeners = function() {
        // NOTE: 1 DOM access here
        this.state.updateBound = this.update.bind(this);
        root.addEventListener('resize', this.state.updateBound);
        // if the boundariesElement is window we don't need to listen for the scroll event
        if (this._options.boundariesElement !== 'window') {
            var target = getScrollParent(this._reference);
            // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
            if (target === root.document.body || target === root.document.documentElement) {
                target = root;
            }
            target.addEventListener('scroll', this.state.updateBound);
        }
    };

    /**
     * Remove event listeners used to update the popper position
     * @method
     * @memberof Popper
     * @access private
     */
    Popper.prototype._removeEventListeners = function() {
        // NOTE: 1 DOM access here
        root.removeEventListener('resize', this.state.updateBound);
        if (this._options.boundariesElement !== 'window') {
            var target = getScrollParent(this._reference);
            // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
            if (target === root.document.body || target === root.document.documentElement) {
                target = root;
            }
            target.removeEventListener('scroll', this.state.updateBound);
        }
        this.state.updateBound = null;
    };

    /**
     * Computed the boundaries limits and return them
     * @method
     * @memberof Popper
     * @access private
     * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
     * @param {Number} padding - Boundaries padding
     * @param {Element} boundariesElement - Element used to define the boundaries
     * @returns {Object} Coordinates of the boundaries
     */
    Popper.prototype._getBoundaries = function(data, padding, boundariesElement) {
        // NOTE: 1 DOM access here
        var boundaries = {};
        var width, height;
        if (boundariesElement === 'window') {
            var body = root.document.body,
                html = root.document.documentElement;

            height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
            width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );

            boundaries = {
                top: 0,
                right: width,
                bottom: height,
                left: 0
            };
        } else if (boundariesElement === 'viewport') {
            var offsetParent = getOffsetParent(this._popper);
            var scrollParent = getScrollParent(this._popper);
            var offsetParentRect = getOffsetRect(offsetParent);

			// Thanks the fucking native API, `document.body.scrollTop` & `document.documentElement.scrollTop`
			var getScrollTopValue = function (element) {
				return element == document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : element.scrollTop;
			}
			var getScrollLeftValue = function (element) {
				return element == document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : element.scrollLeft;
			}

            // if the popper is fixed we don't have to substract scrolling from the boundaries
            var scrollTop = data.offsets.popper.position === 'fixed' ? 0 : getScrollTopValue(scrollParent);
            var scrollLeft = data.offsets.popper.position === 'fixed' ? 0 : getScrollLeftValue(scrollParent);

            boundaries = {
                top: 0 - (offsetParentRect.top - scrollTop),
                right: root.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
                bottom: root.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
                left: 0 - (offsetParentRect.left - scrollLeft)
            };
        } else {
            if (getOffsetParent(this._popper) === boundariesElement) {
                boundaries = {
                    top: 0,
                    left: 0,
                    right: boundariesElement.clientWidth,
                    bottom: boundariesElement.clientHeight
                };
            } else {
                boundaries = getOffsetRect(boundariesElement);
            }
        }
        boundaries.left += padding;
        boundaries.right -= padding;
        boundaries.top = boundaries.top + padding;
        boundaries.bottom = boundaries.bottom - padding;
        return boundaries;
    };


    /**
     * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
     * @method
     * @memberof Popper
     * @access public
     * @param {Object} data
     * @param {Array} modifiers
     * @param {Function} ends
     */
    Popper.prototype.runModifiers = function(data, modifiers, ends) {
        var modifiersToRun = modifiers.slice();
        if (ends !== undefined) {
            modifiersToRun = this._options.modifiers.slice(0, getArrayKeyIndex(this._options.modifiers, ends));
        }

        modifiersToRun.forEach(function(modifier) {
            if (isFunction(modifier)) {
                data = modifier.call(this, data);
            }
        }.bind(this));

        return data;
    };

    /**
     * Helper used to know if the given modifier depends from another one.
     * @method
     * @memberof Popper
     * @param {String} requesting - name of requesting modifier
     * @param {String} requested - name of requested modifier
     * @returns {Boolean}
     */
    Popper.prototype.isModifierRequired = function(requesting, requested) {
        var index = getArrayKeyIndex(this._options.modifiers, requesting);
        return !!this._options.modifiers.slice(0, index).filter(function(modifier) {
            return modifier === requested;
        }).length;
    };

    //
    // Modifiers
    //

    /**
     * Modifiers list
     * @namespace Popper.modifiers
     * @memberof Popper
     * @type {Object}
     */
    Popper.prototype.modifiers = {};

    /**
     * Apply the computed styles to the popper element
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @returns {Object} The same data object
     */
    Popper.prototype.modifiers.applyStyle = function(data) {
        // apply the final offsets to the popper
        // NOTE: 1 DOM access here
        var styles = {
            position: data.offsets.popper.position
        };

        // round top and left to avoid blurry text
        var left = Math.round(data.offsets.popper.left);
        var top = Math.round(data.offsets.popper.top);

        // if gpuAcceleration is set to true and transform is supported, we use `translate3d` to apply the position to the popper
        // we automatically use the supported prefixed version if needed
        var prefixedProperty;
        if (this._options.gpuAcceleration && (prefixedProperty = getSupportedPropertyName('transform'))) {
            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
            styles.top = 0;
            styles.left = 0;
        }
        // othwerise, we use the standard `left` and `top` properties
        else {
            styles.left =left;
            styles.top = top;
        }

        // any property present in `data.styles` will be applied to the popper,
        // in this way we can make the 3rd party modifiers add custom styles to it
        // Be aware, modifiers could override the properties defined in the previous
        // lines of this modifier!
        Object.assign(styles, data.styles);

        setStyle(this._popper, styles);

        // set an attribute which will be useful to style the tooltip (use it to properly position its arrow)
        // NOTE: 1 DOM access here
        this._popper.setAttribute('x-placement', data.placement);

        // if the arrow modifier is required and the arrow style has been computed, apply the arrow style
        if (this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) && data.offsets.arrow) {
            setStyle(data.arrowElement, data.offsets.arrow);
        }

        return data;
    };

    /**
     * Modifier used to shift the popper on the start or end of its reference element side
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.shift = function(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var shiftVariation = placement.split('-')[1];

        // if shift shiftVariation is specified, run the modifier
        if (shiftVariation) {
            var reference = data.offsets.reference;
            var popper = getPopperClientRect(data.offsets.popper);

            var shiftOffsets = {
                y: {
                    start:  { top: reference.top },
                    end:    { top: reference.top + reference.height - popper.height }
                },
                x: {
                    start:  { left: reference.left },
                    end:    { left: reference.left + reference.width - popper.width }
                }
            };

            var axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';

            data.offsets.popper = Object.assign(popper, shiftOffsets[axis][shiftVariation]);
        }

        return data;
    };


    /**
     * Modifier used to make sure the popper does not overflows from it's boundaries
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.preventOverflow = function(data) {
        var order = this._options.preventOverflowOrder;
        var popper = getPopperClientRect(data.offsets.popper);

        var check = {
            left: function() {
                var left = popper.left;
                if (popper.left < data.boundaries.left) {
                    left = Math.max(popper.left, data.boundaries.left);
                }
                return { left: left };
            },
            right: function() {
                var left = popper.left;
                if (popper.right > data.boundaries.right) {
                    left = Math.min(popper.left, data.boundaries.right - popper.width);
                }
                return { left: left };
            },
            top: function() {
                var top = popper.top;
                if (popper.top < data.boundaries.top) {
                    top = Math.max(popper.top, data.boundaries.top);
                }
                return { top: top };
            },
            bottom: function() {
                var top = popper.top;
                if (popper.bottom > data.boundaries.bottom) {
                    top = Math.min(popper.top, data.boundaries.bottom - popper.height);
                }
                return { top: top };
            }
        };

        order.forEach(function(direction) {
            data.offsets.popper = Object.assign(popper, check[direction]());
        });

        return data;
    };

    /**
     * Modifier used to make sure the popper is always near its reference
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by _update method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.keepTogether = function(data) {
        var popper  = getPopperClientRect(data.offsets.popper);
        var reference = data.offsets.reference;
        var f = Math.floor;

        if (popper.right < f(reference.left)) {
            data.offsets.popper.left = f(reference.left) - popper.width;
        }
        if (popper.left > f(reference.right)) {
            data.offsets.popper.left = f(reference.right);
        }
        if (popper.bottom < f(reference.top)) {
            data.offsets.popper.top = f(reference.top) - popper.height;
        }
        if (popper.top > f(reference.bottom)) {
            data.offsets.popper.top = f(reference.bottom);
        }

        return data;
    };

    /**
     * Modifier used to flip the placement of the popper when the latter is starting overlapping its reference element.
     * Requires the `preventOverflow` modifier before it in order to work.
     * **NOTE:** This modifier will run all its previous modifiers everytime it tries to flip the popper!
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by _update method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.flip = function(data) {
        // check if preventOverflow is in the list of modifiers before the flip modifier.
        // otherwise flip would not work as expected.
        if (!this.isModifierRequired(this.modifiers.flip, this.modifiers.preventOverflow)) {
            console.warn('WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!');
            return data;
        }

        if (data.flipped && data.placement === data._originalPlacement) {
            // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
            return data;
        }

        var placement = data.placement.split('-')[0];
        var placementOpposite = getOppositePlacement(placement);
        var variation = data.placement.split('-')[1] || '';

        var flipOrder = [];
        if(this._options.flipBehavior === 'flip') {
            flipOrder = [
                placement,
                placementOpposite
            ];
        } else {
            flipOrder = this._options.flipBehavior;
        }

        flipOrder.forEach(function(step, index) {
            if (placement !== step || flipOrder.length === index + 1) {
                return;
            }

            placement = data.placement.split('-')[0];
            placementOpposite = getOppositePlacement(placement);

            var popperOffsets = getPopperClientRect(data.offsets.popper);

            // this boolean is used to distinguish right and bottom from top and left
            // they need different computations to get flipped
            var a = ['right', 'bottom'].indexOf(placement) !== -1;

            // using Math.floor because the reference offsets may contain decimals we are not going to consider here
            if (
                a && Math.floor(data.offsets.reference[placement]) > Math.floor(popperOffsets[placementOpposite]) ||
                !a && Math.floor(data.offsets.reference[placement]) < Math.floor(popperOffsets[placementOpposite])
            ) {
                // we'll use this boolean to detect any flip loop
                data.flipped = true;
                data.placement = flipOrder[index + 1];
                if (variation) {
                    data.placement += '-' + variation;
                }
                data.offsets.popper = this._getOffsets(this._popper, this._reference, data.placement).popper;

                data = this.runModifiers(data, this._options.modifiers, this._flip);
            }
        }.bind(this));
        return data;
    };

    /**
     * Modifier used to add an offset to the popper, useful if you more granularity positioning your popper.
     * The offsets will shift the popper on the side of its reference element.
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by _update method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.offset = function(data) {
        var offset = this._options.offset;
        var popper  = data.offsets.popper;

        if (data.placement.indexOf('left') !== -1) {
            popper.top -= offset;
        }
        else if (data.placement.indexOf('right') !== -1) {
            popper.top += offset;
        }
        else if (data.placement.indexOf('top') !== -1) {
            popper.left -= offset;
        }
        else if (data.placement.indexOf('bottom') !== -1) {
            popper.left += offset;
        }
        return data;
    };

    /**
     * Modifier used to move the arrows on the edge of the popper to make sure them are always between the popper and the reference element
     * It will use the CSS outer size of the arrow element to know how many pixels of conjuction are needed
     * @method
     * @memberof Popper.modifiers
     * @argument {Object} data - The data object generated by _update method
     * @returns {Object} The data object, properly modified
     */
    Popper.prototype.modifiers.arrow = function(data) {
        var arrow  = this._options.arrowElement;

        // if the arrowElement is a string, suppose it's a CSS selector
        if (typeof arrow === 'string') {
            arrow = this._popper.querySelector(arrow);
        }

        // if arrow element is not found, don't run the modifier
        if (!arrow) {
            return data;
        }

        // the arrow element must be child of its popper
        if (!this._popper.contains(arrow)) {
            console.warn('WARNING: `arrowElement` must be child of its popper element!');
            return data;
        }

        // arrow depends on keepTogether in order to work
        if (!this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)) {
            console.warn('WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!');
            return data;
        }

        var arrowStyle  = {};
        var placement   = data.placement.split('-')[0];
        var popper      = getPopperClientRect(data.offsets.popper);
        var reference   = data.offsets.reference;
        var isVertical  = ['left', 'right'].indexOf(placement) !== -1;

        var len         = isVertical ? 'height' : 'width';
        var side        = isVertical ? 'top' : 'left';
        var altSide     = isVertical ? 'left' : 'top';
        var opSide      = isVertical ? 'bottom' : 'right';
        var arrowSize   = getOuterSizes(arrow)[len];

        //
        // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
        //

        // top/left side
        if (reference[opSide] - arrowSize < popper[side]) {
            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
        }
        // bottom/right side
        if (reference[side] + arrowSize > popper[opSide]) {
            data.offsets.popper[side] += (reference[side] + arrowSize) - popper[opSide];
        }

        // compute center of the popper
        var center = reference[side] + (reference[len] / 2) - (arrowSize / 2);

        var sideValue = center - popper[side];

        // prevent arrow from being placed not contiguously to its popper
        sideValue = Math.max(Math.min(popper[len] - arrowSize - 3, sideValue), 3);
        arrowStyle[side] = sideValue;
        arrowStyle[altSide] = ''; // make sure to remove any old style from the arrow

        data.offsets.arrow = arrowStyle;
        data.arrowElement = arrow;

        return data;
    };


    //
    // Helpers
    //

    /**
     * Get the outer sizes of the given element (offset size + margins)
     * @function
     * @ignore
     * @argument {Element} element
     * @returns {Object} object containing width and height properties
     */
    function getOuterSizes(element) {
        // NOTE: 1 DOM access here
        var _display = element.style.display, _visibility = element.style.visibility;
        element.style.display = 'block'; element.style.visibility = 'hidden';
        var calcWidthToForceRepaint = element.offsetWidth;

        // original method
        var styles = root.getComputedStyle(element);
        var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
        var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
        var result = { width: element.offsetWidth + y, height: element.offsetHeight + x };

        // reset element styles
        element.style.display = _display; element.style.visibility = _visibility;
        return result;
    }

    /**
     * Get the opposite placement of the given one/
     * @function
     * @ignore
     * @argument {String} placement
     * @returns {String} flipped placement
     */
    function getOppositePlacement(placement) {
        var hash = {left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
        return placement.replace(/left|right|bottom|top/g, function(matched){
            return hash[matched];
        });
    }

    /**
     * Given the popper offsets, generate an output similar to getBoundingClientRect
     * @function
     * @ignore
     * @argument {Object} popperOffsets
     * @returns {Object} ClientRect like output
     */
    function getPopperClientRect(popperOffsets) {
        var offsets = Object.assign({}, popperOffsets);
        offsets.right = offsets.left + offsets.width;
        offsets.bottom = offsets.top + offsets.height;
        return offsets;
    }

    /**
     * Given an array and the key to find, returns its index
     * @function
     * @ignore
     * @argument {Array} arr
     * @argument keyToFind
     * @returns index or null
     */
    function getArrayKeyIndex(arr, keyToFind) {
        var i = 0, key;
        for (key in arr) {
            if (arr[key] === keyToFind) {
                return i;
            }
            i++;
        }
        return null;
    }

    /**
     * Get CSS computed property of the given element
     * @function
     * @ignore
     * @argument {Eement} element
     * @argument {String} property
     */
    function getStyleComputedProperty(element, property) {
        // NOTE: 1 DOM access here
        var css = root.getComputedStyle(element, null);
        return css[property];
    }

    /**
     * Returns the offset parent of the given element
     * @function
     * @ignore
     * @argument {Element} element
     * @returns {Element} offset parent
     */
    function getOffsetParent(element) {
        // NOTE: 1 DOM access here
        var offsetParent = element.offsetParent;
        return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
    }

    /**
     * Returns the scrolling parent of the given element
     * @function
     * @ignore
     * @argument {Element} element
     * @returns {Element} offset parent
     */
    function getScrollParent(element) {
        var parent = element.parentNode;

        if (!parent) {
            return element;
        }

        if (parent === root.document) {
            // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
            // greater than 0 and return the proper element
            if (root.document.body.scrollTop) {
                return root.document.body;
            } else {
                return root.document.documentElement;
            }
        }

        // Firefox want us to check `-x` and `-y` variations as well
        if (
            ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow')) !== -1 ||
            ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-x')) !== -1 ||
            ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-y')) !== -1
        ) {
            // If the detected scrollParent is body, we perform an additional check on its parentNode
            // in this way we'll get body if the browser is Chrome-ish, or documentElement otherwise
            // fixes issue #65
            return parent;
        }
        return getScrollParent(element.parentNode);
    }

    /**
     * Check if the given element is fixed or is inside a fixed parent
     * @function
     * @ignore
     * @argument {Element} element
     * @argument {Element} customContainer
     * @returns {Boolean} answer to "isFixed?"
     */
    function isFixed(element) {
        if (element === root.document.body) {
            return false;
        }
        if (getStyleComputedProperty(element, 'position') === 'fixed') {
            return true;
        }
        return element.parentNode ? isFixed(element.parentNode) : element;
    }

    /**
     * Set the style to the given popper
     * @function
     * @ignore
     * @argument {Element} element - Element to apply the style to
     * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
     */
    function setStyle(element, styles) {
        function is_numeric(n) {
            return (n !== '' && !isNaN(parseFloat(n)) && isFinite(n));
        }
        Object.keys(styles).forEach(function(prop) {
            var unit = '';
            // add unit if the value is numeric and is one of the following
            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
                unit = 'px';
            }
            element.style[prop] = styles[prop] + unit;
        });
    }

    /**
     * Check if the given variable is a function
     * @function
     * @ignore
     * @argument {*} functionToCheck - variable to check
     * @returns {Boolean} answer to: is a function?
     */
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    /**
     * Get the position of the given element, relative to its offset parent
     * @function
     * @ignore
     * @param {Element} element
     * @return {Object} position - Coordinates of the element and its `scrollTop`
     */
    function getOffsetRect(element) {
        var elementRect = {
            width: element.offsetWidth,
            height: element.offsetHeight,
            left: element.offsetLeft,
            top: element.offsetTop
        };

        elementRect.right = elementRect.left + elementRect.width;
        elementRect.bottom = elementRect.top + elementRect.height;

        // position
        return elementRect;
    }

    /**
     * Get bounding client rect of given element
     * @function
     * @ignore
     * @param {HTMLElement} element
     * @return {Object} client rect
     */
    function getBoundingClientRect(element) {
        var rect = element.getBoundingClientRect();

        // whether the IE version is lower than 11
        var isIE = navigator.userAgent.indexOf("MSIE") != -1;

        // fix ie document bounding top always 0 bug
        var rectTop = isIE && element.tagName === 'HTML'
            ? -element.scrollTop
            : rect.top;

        return {
            left: rect.left,
            top: rectTop,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.right - rect.left,
            height: rect.bottom - rectTop
        };
    }

    /**
     * Given an element and one of its parents, return the offset
     * @function
     * @ignore
     * @param {HTMLElement} element
     * @param {HTMLElement} parent
     * @return {Object} rect
     */
    function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
        var elementRect = getBoundingClientRect(element);
        var parentRect = getBoundingClientRect(parent);

        if (fixed) {
            var scrollParent = getScrollParent(parent);
            parentRect.top += scrollParent.scrollTop;
            parentRect.bottom += scrollParent.scrollTop;
            parentRect.left += scrollParent.scrollLeft;
            parentRect.right += scrollParent.scrollLeft;
        }

        var rect = {
            top: elementRect.top - parentRect.top ,
            left: elementRect.left - parentRect.left ,
            bottom: (elementRect.top - parentRect.top) + elementRect.height,
            right: (elementRect.left - parentRect.left) + elementRect.width,
            width: elementRect.width,
            height: elementRect.height
        };
        return rect;
    }

    /**
     * Get the prefixed supported property name
     * @function
     * @ignore
     * @argument {String} property (camelCase)
     * @returns {String} prefixed property (camelCase)
     */
    function getSupportedPropertyName(property) {
        var prefixes = ['', 'ms', 'webkit', 'moz', 'o'];

        for (var i = 0; i < prefixes.length; i++) {
            var toCheck = prefixes[i] ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) : property;
            if (typeof root.document.body.style[toCheck] !== 'undefined') {
                return toCheck;
            }
        }
        return null;
    }

    /**
     * The Object.assign() method is used to copy the values of all enumerable own properties from one or more source
     * objects to a target object. It will return the target object.
     * This polyfill doesn't support symbol properties, since ES5 doesn't have symbols anyway
     * Source: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     * @function
     * @ignore
     */
    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function(target) {
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }
                    nextSource = Object(nextSource);

                    var keysArray = Object.keys(nextSource);
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            }
        });
    }

    return Popper;
}));


/***/ }),

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_merge__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scrollbar_width__ = __webpack_require__(665);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a"]; });





let idSeed = 1;
const transitions = [];

const hookTransition = (transition) => {
  if (transitions.indexOf(transition) !== -1) return;

  const getVueInstance = (element) => {
    let instance = element.__vue__;
    if (!instance) {
      const textNode = element.previousSibling;
      if (textNode.__vue__) {
        instance = textNode.__vue__;
      }
    }
    return instance;
  };

  __WEBPACK_IMPORTED_MODULE_0_vue__["default"].transition(transition, {
    afterEnter(el) {
      const instance = getVueInstance(el);

      if (instance) {
        instance.doAfterOpen && instance.doAfterOpen();
      }
    },
    afterLeave(el) {
      const instance = getVueInstance(el);

      if (instance) {
        instance.doAfterClose && instance.doAfterClose();
      }
    }
  });
};

let scrollBarWidth;

const getDOM = function(dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling;
    getDOM(dom);
  }
  return dom;
};

/* unused harmony default export */ var _unused_webpack_default_export = ({
  model: {
    prop: 'visible',
    event: 'visible-change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: ''
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  created() {
    if (this.transition) {
      hookTransition(this.transition);
    }
  },

  beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].register(this._popupId, this);
  },

  beforeDestroy() {
    __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].deregister(this._popupId);
    __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].closeModal(this._popupId);
    if (this.modal && this.bodyOverflow !== null && this.bodyOverflow !== 'hidden') {
      document.body.style.overflow = this.bodyOverflow;
      document.body.style.paddingRight = this.bodyPaddingRight;
    }
    this.bodyOverflow = null;
    this.bodyPaddingRight = null;
  },

  data() {
    return {
      opened: false,
      bodyOverflow: null,
      bodyPaddingRight: null,
      rendered: false
    };
  },

  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          __WEBPACK_IMPORTED_MODULE_0_vue__["default"].nextTick(() => {
            this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },

  methods: {
    open(options) {
      if (!this.rendered) {
        this.rendered = true;
        this.$emit('visible-change', true);
      }

      const props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_merge__["a" /* default */])({}, this.$props || this, options);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);

      const openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },

    doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;

      this._opening = true;

      this.$emit('visible-change', true);

      const dom = getDOM(this.$el);

      const modal = props.modal;

      const zIndex = props.zIndex;
      if (zIndex) {
        __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].zIndex = zIndex;
      }

      if (modal) {
        if (this._closing) {
          __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].closeModal(this._popupId);
          this._closing = false;
        }
        __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].openModal(this._popupId, __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, props.modalFade);
        if (props.lockScroll) {
          if (!this.bodyOverflow) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.bodyOverflow = document.body.style.overflow;
          }
          scrollBarWidth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__scrollbar_width__["a" /* default */])();
          let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          if (scrollBarWidth > 0 && bodyHasOverflow) {
            document.body.style.paddingRight = scrollBarWidth + 'px';
          }
          document.body.style.overflow = 'hidden';
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      dom.style.zIndex = __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].nextZIndex();
      this.opened = true;

      this.onOpen && this.onOpen();

      if (!this.transition) {
        this.doAfterOpen();
      }
    },

    doAfterOpen() {
      this._opening = false;
    },

    close() {
      if (this.willClose && !this.willClose()) return;

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._closeTimer);

      const closeDelay = Number(this.closeDelay);

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },

    doClose() {
      this.$emit('visible-change', false);
      this._closing = true;

      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
      }

      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
    },

    doAfterClose() {
      __WEBPACK_IMPORTED_MODULE_2_element_ui_src_utils_popup_popup_manager__["a" /* default */].closeModal(this._popupId);
      this._closing = false;
    }
  }
});




/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__ = __webpack_require__(565);



let hasModal = false;

const getModal = function() {
  if (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer) return;
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;

    modalDom.addEventListener('touchmove', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });

    modalDom.addEventListener('click', function() {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return modalDom;
};

const instances = {};

const PopupManager = {
  zIndex: 2000,

  modalFade: true,

  getInstance: function(id) {
    return instances[id];
  },

  register: function(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  deregister: function(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },

  nextZIndex: function() {
    return PopupManager.zIndex++;
  },

  modalStack: [],

  doOnModalClick: function() {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;

    const instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },

  openModal: function(id, zIndex, dom, modalClass, modalFade) {
    if (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer) return;
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;

    const modalStack = this.modalStack;

    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }

    const modalDom = getModal();

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["c" /* addClass */])(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["c" /* addClass */])(modalDom, 'v-modal-enter');
    }
    if (modalClass) {
      let classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(item => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["c" /* addClass */])(modalDom, item));
    }
    setTimeout(() => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["a" /* removeClass */])(modalDom, 'v-modal-enter');
    }, 200);

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.style.display = '';

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
  },

  closeModal: function(id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();

    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          let classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(item => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["a" /* removeClass */])(modalDom, item));
        }

        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["c" /* addClass */])(modalDom, 'v-modal-leave');
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_dom__["a" /* removeClass */])(modalDom, 'v-modal-leave');
      }, 200);
    }
  }
};

const getTopPopup = function() {
  if (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer) return;
  if (PopupManager.modalStack.length > 0) {
    const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) return;
    const instance = PopupManager.getInstance(topPopup.id);

    return instance;
  }
};

if (!__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {
      const topPopup = getTopPopup();

      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose
          ? topPopup.handleClose()
          : (topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close());
      }
    }
  });
}

/* harmony default export */ __webpack_exports__["a"] = (PopupManager);


/***/ }),

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Modified from https://github.com/sdecima/javascript-detect-element-resize
 * version: 0.5.3
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Sebastián Décima
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
const isServer = typeof window === 'undefined';

/* istanbul ignore next */
const requestFrame = (function() {
  if (isServer) return;
  const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
    function(fn) {
      return window.setTimeout(fn, 20);
    };
  return function(fn) {
    return raf(fn);
  };
})();

/* istanbul ignore next */
const cancelFrame = (function() {
  if (isServer) return;
  const cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
  return function(id) {
    return cancel(id);
  };
})();

/* istanbul ignore next */
const resetTrigger = function(element) {
  const trigger = element.__resizeTrigger__;
  const expand = trigger.firstElementChild;
  const contract = trigger.lastElementChild;
  const expandChild = expand.firstElementChild;

  contract.scrollLeft = contract.scrollWidth;
  contract.scrollTop = contract.scrollHeight;
  expandChild.style.width = expand.offsetWidth + 1 + 'px';
  expandChild.style.height = expand.offsetHeight + 1 + 'px';
  expand.scrollLeft = expand.scrollWidth;
  expand.scrollTop = expand.scrollHeight;
};

/* istanbul ignore next */
const checkTriggers = function(element) {
  return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height;
};

/* istanbul ignore next */
const scrollListener = function(event) {
  resetTrigger(this);
  if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
  this.__resizeRAF__ = requestFrame(() => {
    if (checkTriggers(this)) {
      this.__resizeLast__.width = this.offsetWidth;
      this.__resizeLast__.height = this.offsetHeight;
      this.__resizeListeners__.forEach((fn) => {
        fn.call(this, event);
      });
    }
  });
};

/* Detect CSS Animations support to detect element display/re-attach */
const attachEvent = isServer ? {} : document.attachEvent;
const DOM_PREFIXES = 'Webkit Moz O ms'.split(' ');
const START_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ');
const RESIZE_ANIMATION_NAME = 'resizeanim';
let animation = false;
let keyFramePrefix = '';
let animationStartEvent = 'animationstart';

/* istanbul ignore next */
if (!attachEvent && !isServer) {
  const testElement = document.createElement('fakeelement');
  if (testElement.style.animationName !== undefined) {
    animation = true;
  }

  if (animation === false) {
    let prefix = '';
    for (var i = 0; i < DOM_PREFIXES.length; i++) {
      if (testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {
        prefix = DOM_PREFIXES[i];
        keyFramePrefix = '-' + prefix.toLowerCase() + '-';
        animationStartEvent = START_EVENTS[i];
        animation = true;
        break;
      }
    }
  }
}

let stylesCreated = false;
/* istanbul ignore next */
const createStyles = function() {
  if (!stylesCreated && !isServer) {
    const animationKeyframes = `@${keyFramePrefix}keyframes ${RESIZE_ANIMATION_NAME} { from { opacity: 0; } to { opacity: 0; } } `;
    const animationStyle = `${keyFramePrefix}animation: 1ms ${RESIZE_ANIMATION_NAME};`;

    // opacity: 0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    const css = `${animationKeyframes}
      .resize-triggers { ${animationStyle} visibility: hidden; opacity: 0; }
      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1 }
      .resize-triggers > div { background: #eee; overflow: auto; }
      .contract-trigger:before { width: 200%; height: 200%; }`;

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

/* istanbul ignore next */
const addResizeListener = function(element, fn) {
  if (isServer) return;
  if (attachEvent) {
    element.attachEvent('onresize', fn);
  } else {
    if (!element.__resizeTrigger__) {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];

      const resizeTrigger = element.__resizeTrigger__ = document.createElement('div');
      resizeTrigger.className = 'resize-triggers';
      resizeTrigger.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>';
      element.appendChild(resizeTrigger);

      resetTrigger(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      if (animationStartEvent) {
        resizeTrigger.addEventListener(animationStartEvent, function(event) {
          if (event.animationName === RESIZE_ANIMATION_NAME) {
            resetTrigger(element);
          }
        });
      }
    }
    element.__resizeListeners__.push(fn);
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = addResizeListener;


/* istanbul ignore next */
const removeResizeListener = function(element, fn) {
  if (attachEvent) {
    element.detachEvent('onresize', fn);
  } else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
    }
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = removeResizeListener;



/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);


let scrollBarWidth;

/* harmony default export */ __webpack_exports__["a"] = (function() {
  if (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
});;


/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = hasOwn;
/* unused harmony export toObject */
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};


/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_popup__ = __webpack_require__(662);



const PopperJS = __WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer ? function() {} : __webpack_require__(661);
const stop = e => e.stopPropagation();

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: {},
    popper: {},
    offset: {
      default: 0
    },
    value: Boolean,
    visibleArrow: Boolean,
    transition: String,
    appendToBody: {
      type: Boolean,
      default: true
    },
    popperOptions: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false
        };
      }
    }
  },

  data() {
    return {
      showPopper: false,
      currentPlacement: ''
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.showPopper = val;
        this.$emit('input', val);
      }
    },

    showPopper(val) {
      val ? this.updatePopper() : this.destroyPopper();
      this.$emit('input', val);
    }
  },

  methods: {
    createPopper() {
      if (this.$isServer) return;
      this.currentPlacement = this.currentPlacement || this.placement;
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return;
      }

      const options = this.popperOptions;
      const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
      let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

      if (!reference &&
        this.$slots.reference &&
        this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }

      if (!popper || !reference) return;
      if (this.visibleArrow) this.appendArrow(popper);
      if (this.appendToBody) document.body.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }

      options.placement = this.currentPlacement;
      options.offset = this.offset;
      this.popperJS = new PopperJS(reference, popper, options);
      this.popperJS.onCreate(_ => {
        this.$emit('created', this);
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      });
      if (typeof options.onUpdate === 'function') {
        this.popperJS.onUpdate(options.onUpdate);
      }
      this.popperJS._popper.style.zIndex = __WEBPACK_IMPORTED_MODULE_1_element_ui_src_utils_popup__["a" /* PopupManager */].nextZIndex();
      this.popperElm.addEventListener('click', stop);
    },

    updatePopper() {
      this.popperJS ? this.popperJS.update() : this.createPopper();
    },

    doDestroy() {
      /* istanbul ignore if */
      if (this.showPopper || !this.popperJS) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },

    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },

    resetTransformOrigin() {
      let placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      };
      let placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0];
      let origin = placementMap[placement];
      this.popperJS._popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${ origin }` : `${ origin } center`;
    },

    appendArrow(element) {
      let hash;
      if (this.appended) {
        return;
      }

      this.appended = true;

      for (let item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name;
          break;
        }
      }

      const arrow = document.createElement('div');

      if (hash) {
        arrow.setAttribute(hash, '');
      }
      arrow.setAttribute('x-arrow', '');
      arrow.className = 'popper__arrow';
      element.appendChild(arrow);
    }
  },

  beforeDestroy() {
    this.doDestroy();
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop);
      document.body.removeChild(this.popperElm);
    }
  },

  // call destroy in keep-alive mode
  deactivated() {
    this.$options.beforeDestroy[0].call(this);
  }
});


/***/ }),

/***/ 684:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(642);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(29)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-424eee6c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./goodsList.vue", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-424eee6c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./goodsList.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(200)(
  /* script */
  __webpack_require__(576),
  /* template */
  __webpack_require__(731),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(200)(
  /* script */
  __webpack_require__(582),
  /* template */
  __webpack_require__(733),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 727:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page goodsPage"
  }, [_c('div', {
    staticClass: "tableTree"
  }, [_c('el-input', {
    attrs: {
      "placeholder": "查询",
      "size": "small"
    },
    model: {
      value: (_vm.filterText),
      callback: function($$v) {
        _vm.filterText = $$v
      },
      expression: "filterText"
    }
  }), _vm._v(" "), _c('el-tree', {
    ref: "goodsTableTree",
    class: 'filter-tree',
    staticStyle: {
      "font-size": "12px"
    },
    attrs: {
      "highlight-current": true,
      "data": _vm.gccList,
      "props": _vm.defaultProps,
      "default-expand-all": "",
      "node-key": "name",
      "current-node-key": "name",
      "filter-node-method": _vm.filterNode
    },
    on: {
      "node-click": _vm.choNodeKey
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('el-card', {
    staticClass: "box-card",
    staticStyle: {
      "margin": "15px 30px 15px 30px"
    }
  }, [_c('div', {
    staticClass: "text item"
  }, [_c('el-form', {
    ref: "form",
    attrs: {
      "model": _vm.form
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "父级",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-select-tree', {
    attrs: {
      "treeData": _vm.gccList,
      "propNames": _vm.defaultProps,
      "clearable": "",
      "placeholder": "请选择父级"
    },
    model: {
      value: (_vm.form.parentId),
      callback: function($$v) {
        _vm.form.parentId = $$v
      },
      expression: "form.parentId"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "名称",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    staticStyle: {
      "width": "300px"
    },
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.form.name),
      callback: function($$v) {
        _vm.form.name = $$v
      },
      expression: "form.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "链接",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    staticStyle: {
      "width": "300px"
    },
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.form.href),
      callback: function($$v) {
        _vm.form.href = $$v
      },
      expression: "form.href"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "是否显示",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-radio', {
    staticClass: "radio",
    attrs: {
      "label": "1"
    },
    model: {
      value: (_vm.form.isShow),
      callback: function($$v) {
        _vm.form.isShow = $$v
      },
      expression: "form.isShow"
    }
  }, [_vm._v("显示")]), _vm._v(" "), _c('el-radio', {
    staticClass: "radio",
    attrs: {
      "label": "0"
    },
    model: {
      value: (_vm.form.isShow),
      callback: function($$v) {
        _vm.form.isShow = $$v
      },
      expression: "form.isShow"
    }
  }, [_vm._v("不显示")])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "图标",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('i', {
    class: _vm.form.icon,
    model: {
      value: (_vm.form.icon),
      callback: function($$v) {
        _vm.form.icon = $$v
      },
      expression: "form.icon"
    }
  }), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "text"
    },
    on: {
      "click": function($event) {
        _vm.selectIconDialog = true
      }
    }
  }, [_vm._v("选择")])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "排序",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-slider', {
    staticStyle: {
      "width": "300px"
    },
    model: {
      value: (_vm.form.sort),
      callback: function($$v) {
        _vm.form.sort = $$v
      },
      expression: "form.sort"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "icon": "plus",
      "type": "primary"
    },
    on: {
      "click": _vm.newAdd
    }
  }, [_vm._v("新增")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "size": "small",
      "icon": "plus",
      "type": "primary"
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.form.id && _vm.form.id != null),
      expression: "form.id && form.id!=null"
    }],
    attrs: {
      "size": "small",
      "icon": "check",
      "type": "primary"
    },
    on: {
      "click": _vm.handleGoodsClass
    }
  }, [_vm._v("添加商品代码")]), _vm._v(" "), _c('el-button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.form.id && _vm.form.id != null),
      expression: "form.id && form.id!=null"
    }],
    attrs: {
      "size": "small",
      "type": "danger",
      "icon": "delete"
    },
    on: {
      "click": _vm.deleteSelected
    }
  }, [_vm._v("删除\n                            ")])], 1)], 1)], 1)])], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "选择图标",
      "size": "tiny"
    },
    model: {
      value: (_vm.selectIconDialog),
      callback: function($$v) {
        _vm.selectIconDialog = $$v
      },
      expression: "selectIconDialog"
    }
  }, [_c('div', {
    staticClass: "select-tree"
  }, [_c('el-scrollbar', {
    staticClass: "is-empty",
    attrs: {
      "tag": "div",
      "wrap-class": "el-select-dropdown__wrap",
      "view-class": "el-select-dropdown__list"
    }
  }, [_c('div', {
    staticClass: "icons-wrapper"
  }, [_c('i', {
    staticClass: "fa fa-address-book",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-address-book-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-address-card",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-address-card-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-adjust",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-american-sign-language-interpreting",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-anchor",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-archive",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-area-chart",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-arrows",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-arrows-h",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-arrows-v",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-asl-interpreting",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-assistive-listening-systems",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-asterisk",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-at",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-audio-description",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-automobile",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-balance-scale",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-ban",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bank",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bar-chart",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bar-chart-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-barcode",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bars",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bath",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bathtub",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-0",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-1",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-2",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-3",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-4",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-empty",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-full",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-half",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-quarter",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-battery-three-quarters",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bed",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-beer",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bell",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bell-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bell-slash",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bell-slash-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bicycle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-binoculars",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-birthday-cake",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-blind",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bluetooth",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bluetooth-b",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bolt",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bomb",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-book",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bookmark",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bookmark-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-braille",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-briefcase",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bug",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-building",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-building-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bullhorn",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bullseye",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-bus",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cab",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-calculator",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-calendar",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-calendar-check-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-calendar-minus-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-calendar-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-calendar-plus-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-calendar-times-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-camera",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-camera-retro",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-car",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-caret-square-o-down",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-caret-square-o-left",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-caret-square-o-right",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-caret-square-o-up",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cart-arrow-down",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cart-plus",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-certificate",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-check",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-check-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-check-circle-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-check-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-check-square-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-child",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-circle-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-circle-o-notch",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-circle-thin",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-clipboard"
  }), _c('i', {
    staticClass: "fa fa-clock-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-clone",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-close",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cloud",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cloud-download",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cloud-upload",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-code",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-code-fork",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-coffee",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cog",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cogs",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-comment",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-comment-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-commenting",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-commenting-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-comments",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-comments-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-compass",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-copyright",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-creative-commons",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-credit-card",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-credit-card-alt",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-crop",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-crosshairs",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cube",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cubes",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-cutlery",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-dashboard",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-database",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-deaf",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-deafness",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-desktop",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-diamond",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-dot-circle-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-download",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-drivers-license",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-drivers-license-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-edit",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-ellipsis-h",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-ellipsis-v",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-envelope",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-envelope-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-envelope-open",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-envelope-open-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-envelope-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-eraser",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-exchange",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-exclamation",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-exclamation-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-exclamation-triangle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-external-link",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-external-link-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-eye",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-eye-slash",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-eyedropper",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-fax",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-feed",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-female",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-fighter-jet",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-archive-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-audio-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-code-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-excel-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-image-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-movie-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-pdf-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-photo-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-picture-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-powerpoint-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-sound-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-video-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-word-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-file-zip-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-film",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-filter",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-fire",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-fire-extinguisher",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-flag",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-flag-checkered",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-flag-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-flash",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-flask",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-folder",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-folder-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-folder-open",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-folder-open-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-frown-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-futbol-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-gamepad",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-gavel",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-gear",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-gears",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-gift",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-glass",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-globe",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-graduation-cap",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-group",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-grab-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-lizard-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-paper-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-peace-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-pointer-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-rock-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-scissors-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-spock-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hand-stop-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-handshake-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hard-of-hearing",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hashtag",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hdd-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-headphones",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-heart",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-heart-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-heartbeat",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-history",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-home",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hotel",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hourglass",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hourglass-1",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hourglass-2",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hourglass-3",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hourglass-end",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hourglass-half",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hourglass-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-hourglass-start",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-i-cursor",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-id-badge",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-id-card",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-id-card-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-image",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-inbox",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-industry",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-info",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-info-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-institution",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-key",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-keyboard-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-language",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-laptop",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-leaf",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-legal",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-lemon-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-level-down",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-level-up",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-life-bouy",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-life-buoy",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-life-ring",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-life-saver",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-lightbulb-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-line-chart",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-location-arrow",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-lock",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-low-vision",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-magic",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-magnet",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-mail-forward",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-mail-reply",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-mail-reply-all",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-male",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-map",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-map-marker",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-map-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-map-pin",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-map-signs",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-meh-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-microchip",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-microphone",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-microphone-slash",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-minus",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-minus-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-minus-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-minus-square-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-mobile",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-mobile-phone",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-money",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-moon-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-mortar-board",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-motorcycle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-mouse-pointer",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-music",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-navicon",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-newspaper-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-object-group",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-object-ungroup",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-paint-brush",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-paper-plane",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-paper-plane-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-paw",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-pencil",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-pencil-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-pencil-square-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-percent",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-phone",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-phone-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-photo",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-picture-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-pie-chart",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-plane",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-plug",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-plus",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-plus-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-plus-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-plus-square-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-podcast",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-power-off",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-print",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-puzzle-piece",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-qrcode",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-question",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-question-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-question-circle-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-quote-left",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-quote-right",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-random",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-recycle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-refresh",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-registered",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-remove",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-reorder",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-reply",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-reply-all",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-retweet",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-road",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-rocket",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-rss",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-rss-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-s15",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-search",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-search-minus",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-search-plus",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-send",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-send-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-server",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-share",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-share-alt",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-share-alt-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-share-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-share-square-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-shield",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-ship",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-shopping-bag",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-shopping-basket",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-shopping-cart",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-shower",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sign-in",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sign-language",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sign-out",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-signal",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-signing",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sitemap",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sliders",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-smile-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-snowflake-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-soccer-ball-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-alpha-asc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-alpha-desc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-amount-asc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-amount-desc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-asc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-desc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-down",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-numeric-asc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-numeric-desc",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sort-up",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-space-shuttle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-spinner",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-spoon",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-square",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-square-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-star",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-star-half",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-star-half-empty",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-star-half-full",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-star-half-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-star-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sticky-note",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sticky-note-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-street-view",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-suitcase",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-sun-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-support",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tablet",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tachometer",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tag",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tags",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tasks",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-taxi",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-television",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-terminal",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-0",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-1",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-2",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-3",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-4",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-empty",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-full",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-half",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-quarter",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thermometer-three-quarters",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thumb-tack",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thumbs-down",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thumbs-o-down",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thumbs-o-up",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-thumbs-up",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-ticket",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-times",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-times-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-times-circle-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-times-rectangle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-times-rectangle-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tint",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-toggle-down",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-toggle-left",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-toggle-off",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-toggle-on",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-toggle-right",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-toggle-up",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-trademark",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-trash",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-trash-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tree",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-trophy",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-truck",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tty",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-tv",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-umbrella",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-universal-access",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-university",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-unlock",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-unlock-alt",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-unsorted",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-upload",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-user",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-user-circle",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-user-circle-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-user-o"
  }), _c('i', {
    staticClass: "fa fa-user-plus",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-user-secret",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-user-times",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-users",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-vcard",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-vcard-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-video-camera",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-volume-control-phone",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-volume-down",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-volume-off",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-volume-up",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-warning",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-wheelchair",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-wheelchair-alt",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-wifi",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-window-close",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-window-close-o",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-window-maximize",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-window-minimize",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-window-restore",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  }), _c('i', {
    staticClass: "fa fa-wrench",
    on: {
      "click": function($event) {
        _vm.selectIcon($event)
      }
    }
  })])])], 1), _vm._v(" "), _c('span', {
    staticClass: "dialog-footer",
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.selectIconDialog = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.selectIconDialog = false
      }
    }
  }, [_vm._v("确 定")])], 1)]), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "配置商品代码",
      "visible": _vm.dialogTableVisible
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogTableVisible = $event
      }
    }
  }, [_c('div', [_vm._v("这里选择商品代码")])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 731:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "el-select-dropdown",
    class: [{
      'is-multiple': _vm.$parent.multiple
    }, _vm.popperClass],
    style: ({
      minWidth: _vm.minWidth
    })
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),

/***/ 733:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "clickoutside",
      rawName: "v-clickoutside",
      value: (_vm.handleClose),
      expression: "handleClose"
    }],
    staticClass: "el-select"
  }, [(_vm.multiple) ? _c('div', {
    ref: "tags",
    staticClass: "el-select__tags",
    style: ({
      'max-width': _vm.inputWidth - 32 + 'px'
    }),
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleMenu($event)
      }
    }
  }, [_c('transition-group', {
    on: {
      "after-leave": _vm.resetInputHeight
    }
  }, _vm._l((_vm.selected), function(item) {
    return _c('el-tag', {
      key: item.id,
      attrs: {
        "closable": "",
        "type": "primary",
        "close-transition": ""
      },
      on: {
        "close": function($event) {
          _vm.deleteTag($event, item)
        }
      }
    }, [_c('span', {
      staticClass: "el-select__tags-text"
    }, [_vm._v(_vm._s(item[_vm.propNames.label]))])])
  }))], 1) : _vm._e(), _vm._v(" "), _c('el-input', {
    ref: "reference",
    attrs: {
      "type": "text",
      "placeholder": _vm.currentPlaceholder,
      "name": _vm.name,
      "size": _vm.size,
      "disabled": _vm.disabled,
      "readonly": _vm.multiple,
      "validate-event": false,
      "icon": _vm.iconClass
    },
    on: {
      "focus": function($event) {
        _vm.visible = true
      },
      "click": _vm.handleIconClick
    },
    nativeOn: {
      "mouseenter": function($event) {
        _vm.inputHovering = true
      },
      "mouseleave": function($event) {
        _vm.inputHovering = false
      }
    },
    model: {
      value: (_vm.selectedLabel),
      callback: function($$v) {
        _vm.selectedLabel = $$v
      },
      expression: "selectedLabel"
    }
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "el-zoom-in-top"
    },
    on: {
      "after-leave": _vm.doDestroy,
      "after-enter": _vm.handleMenuEnter
    }
  }, [_c('el-select-menu', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible && _vm.emptyText !== false),
      expression: "visible && emptyText !== false"
    }],
    ref: "popper"
  }, [_c('el-scrollbar', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.treeData && !_vm.loading),
      expression: "treeData && !loading"
    }],
    staticClass: "is-empty",
    attrs: {
      "tag": "div",
      "wrap-class": "el-select-dropdown__wrap",
      "view-class": "el-select-dropdown__list"
    }
  }, [_c('el-tree', {
    ref: "tree",
    attrs: {
      "data": _vm.treeData,
      "show-checkbox": _vm.multiple,
      "node-key": "id",
      "check-strictly": "",
      "props": _vm.propNames
    },
    on: {
      "check-change": _vm.handleCheckChange,
      "node-click": _vm.handleTreeNodeClick
    }
  })], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=1.js.map?fd9348ac14d0c3d9f0fa