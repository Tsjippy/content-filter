/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/compose"
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["compose"];

/***/ },

/***/ "@wordpress/core-data"
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["coreData"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/html-entities"
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
(module) {

module.exports = window["wp"]["htmlEntities"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/url"
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
(module) {

module.exports = window["wp"]["url"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);













/**
 * Add attributes to block so we can later use them to actually folter the post content
 */

function addFilterAttribute(settings) {
  if (typeof settings.attributes !== "undefined") {
    settings.attributes = Object.assign(settings.attributes, {
      hideOnMobile: {
        type: "boolean",
        default: false
      },
      onlyLoggedIn: {
        type: "boolean",
        default: false
      },
      onlyNotLoggedIn: {
        type: "boolean",
        default: false
      },
      onlyOn: {
        type: "array",
        default: []
      },
      phpFilters: {
        type: "array",
        default: []
      },
      phpFilterInverseLogic: {
        type: "boolean",
        default: false
      },
      roles: {
        type: "array",
        default: []
      },
      rolesInverseLogic: {
        type: "boolean",
        default: false
      }
    });
  }
  return settings;
}

// Add the filter to add the extra block attributes
wp.hooks.addFilter("blocks.registerBlockType", "tsjippy/content-filter-attribute", addFilterAttribute);

// Fetch the roles over rest api
var availableRoles = [];
document.addEventListener("DOMContentLoaded", () => {
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
    path: tsjippy.restApiPrefix + `/content_filter/get_roles`,
    method: "POST"
  }).then(res => {
    availableRoles = res;
  });
});

// Fetch the allowed php filters over rest api
var allowedPhpFilters = [];
document.addEventListener("DOMContentLoaded", () => {
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
    path: tsjippy.restApiPrefix + `/content_filter/get_allowed_php_filters`,
    method: "POST"
  }).then(res => {
    allowedPhpFilters = res;
  });
});

/**
 * Add controls to panel
 */
const blockFilterControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const {
      attributes,
      setAttributes,
      isSelected,
      clientId
    } = props;
    var children = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.select)('core/block-editor').getBlocksByClientId(clientId);
    if (children.length > 0 && children[0] != null) {
      children = children[0].innerBlocks;
    }

    // Only work on selected blocks
    if (!isSelected) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(BlockEdit, {
          ...props
        })
      });
    }

    /**
     * SELECTED PAGES
     */
    // Define a variable and a function to update that variable
    const [searchTerm, setSearchTerm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)("");

    // Selected page list
    const {
      initialSelectedPages,
      selectedPagesResolved
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
      let onlyOn = attributes.onlyOn;

      // Find all selected pages
      const selectedPagesArgs = ["postType", "page", {
        include: onlyOn
      }];
      return {
        initialSelectedPages: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store).getEntityRecords(...selectedPagesArgs),
        selectedPagesResolved: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store).hasFinishedResolution("getEntityRecords", selectedPagesArgs)
      };
    }, []);

    /**
     * Search page list
     */
    const {
      pages,
      pagesResolved
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
      // do not show results if not searching
      if (!searchTerm) {
        return {
          pages: [],
          pagesResolved: true
        };
      }
      let onlyOn = attributes.onlyOn;

      // find all pages excluding the already selected pages
      const query = {
        exclude: onlyOn,
        search: searchTerm,
        per_page: 100,
        orderby: "relevance"
      };
      const pagesArgs = ["postType", "page", query];
      return {
        pages: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store).getEntityRecords(...pagesArgs),
        pagesResolved: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_6__.store).hasFinishedResolution("getEntityRecords", pagesArgs)
      };
    }, [searchTerm]);
    const PageSelected = function (checked) {
      let onlyOn = attributes.onlyOn;
      if (checked) {
        // Add to stored page ids
        setAttributes({
          onlyOn: [...onlyOn, this]
        });

        // Add to selected pages list
        setSelectedPages([...selectedPages, pages.find(p => p.id == this)]);
      } else {
        onlyOn = onlyOn.filter(p => {
          return p != this;
        });
        if (onlyOn.length == 0) {
          onlyOn = undefined;
        }
        setAttributes({
          onlyOn: onlyOn
        });
      }
    };
    const GetSelectedPagesControls = function () {
      let onlyOn = attributes.onlyOn;
      if (onlyOn.length > 0) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("i", {
            children: [" ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Currently selected pages", "tsjippy"), ":"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(BuildCheckboxControls, {
            hasResolved: selectedPagesResolved,
            items: initialSelectedPages,
            showNoResults: false
          })]
        });
      } else {
        return "";
      }
    };
    const BuildCheckboxControls = function ({
      hasResolved,
      items,
      showNoResults = true
    }) {
      if (!hasResolved) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {})]
        });
      }
      if (!items?.length) {
        if (showNoResults) {
          if (!searchTerm) {
            return "";
          }
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            children: [" ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No search results", "tsjippy")]
          });
        }
        return "";
      }
      return items?.map(page => {
        let onlyOn = attributes.onlyOn;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
          label: (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_7__.decodeEntities)(page.title.rendered),
          onChange: PageSelected.bind(page.id),
          checked: onlyOn.includes(page.id)
        });
      });
    };
    const [selectedPages, setSelectedPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [selectedPagesControls, setSelectedPagesControls] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(GetSelectedPagesControls());

    // Update selectedPagesControls on page resolve
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
      setSelectedPages(initialSelectedPages);
    }, [selectedPagesResolved]);

    // Update selectedPagesControls on check/uncheck
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
      setSelectedPages(selectedPages.filter(p => {
        return attributes.onlyOn.includes(p.id);
      }));
    }, [attributes.onlyOn]);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
      setSelectedPagesControls(BuildCheckboxControls({
        hasResolved: selectedPagesResolved,
        items: selectedPages,
        showNoResults: false
      }));
    }, [selectedPages]);

    /**
     * Update the children block if we update a parent blocks filters
     */
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
      if (children.length > 0) {
        // Update the child block's attributes
        let inherited = {};

        /**
         * Check if booleans are true
         */
        let boolKeys = ['onlyLoggedIn', 'onlyNotLoggedIn', 'onlyOn'];

        // Set on the child only if true
        boolKeys.forEach(key => {
          if (attributes[key]) {
            inherited[key] = attributes[key];
            inherited[key + 'Inherited'] = true; // mark as inherited
          }
        });

        /**
         * Check if arrays are not empty
         */
        let arrayKeys = ['phpFilters', 'roles'];

        // Set on the child only if true
        arrayKeys.forEach(key => {
          if (attributes[key].length > 0) {
            inherited[key] = attributes[key];
            inherited[key + 'Inherited'] = true; // mark as inherited
          }
        });
        children.forEach(function (child) {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)('core/block-editor').updateBlockAttributes(child.clientId, inherited);
        });
      }
    }, [attributes.hideOnMobile, attributes.onlyLoggedIn, attributes.onlyNotLoggedIn, attributes.onlyOn, attributes.phpFilters, attributes.phpFilterInverseLogic, attributes.roles, attributes.rolesInverseLogic]);

    /**
     * PHP Filters
     */
    const createFilterControls = function () {
      return [allowedPhpFilters.map(data => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
          label: data,
          onChange: checked => onPhpFiltersChanged(checked, data),
          checked: attributes.phpFilters.indexOf(data) > -1
        }, data);
      })];
    };
    const onPhpFiltersChanged = function (checked, filterName) {
      let phpFilters = attributes.phpFilters;

      // A role just got selected
      if (checked) {
        // Add to stored roles
        phpFilters.push(filterName);
      } else {
        // remove from array
        phpFilters = phpFilters.filter(p => {
          return p != filterName;
        });
      }

      // Store in Attributes
      // We need to set a new array to trigger a re-render
      setAttributes({
        phpFilters: [...phpFilters]
      });
    };

    /**
     * ROLES
     */
    const createRolesSelectors = () => {
      return [availableRoles.map(data => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
          label: data.label,
          onChange: checked => onRoleSelected(checked, data.value),
          checked: attributes.roles.indexOf(data.value) > -1
        }, data.value);
      })];
    };

    /**
     * Runs when a role gets (de)selected
     * @param {bool} checked true when selected, false otherwise
     */
    const onRoleSelected = function (checked, roleSlug) {
      let roles = attributes.roles;

      // A role just got selected
      if (checked) {
        // Add to stored roles
        roles.push(roleSlug);
      } else {
        // remove from array
        roles = roles.filter(p => {
          return p != roleSlug;
        });
      }

      // Store in Attributes
      // Store as a new array to trigger a new render
      setAttributes({
        roles: [...roles]
      });
    };
    const disabledMessage = () => {
      const inheritedAttributes = Object.keys(attributes).filter(k => k.includes('Inherited') && attributes[k]);
      if (inheritedAttributes.length > 0) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("b", {
          children: "Some attributes are set from the parent block..."
        });
      }
      return '';
    };

    /**
     * Actual Rendering
     */
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Block Visibility", "tsjippy"),
          initialOpen: false,
          children: [disabledMessage(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Disabled, {
            isDisabled: attributes.hideOnMobileInherited,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide on mobile", "tsjippy"),
              checked: !!attributes.hideOnMobile,
              onChange: () => setAttributes({
                hideOnMobile: !attributes.hideOnMobile
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Disabled, {
            isDisabled: attributes.onlyLoggedInInherited,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide if not logged in", "tsjippy"),
              checked: !!attributes.onlyLoggedIn,
              onChange: () => setAttributes({
                onlyLoggedIn: !attributes.onlyLoggedIn
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Disabled, {
            isDisabled: attributes.onlyNotLoggedInInherited,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide if logged in", "tsjippy"),
              checked: !!attributes.onlyNotLoggedIn,
              onChange: () => setAttributes({
                onlyNotLoggedIn: !attributes.onlyNotLoggedIn
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Disabled, {
            isDisabled: attributes.phpFiltersInherited,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("b", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("PHP Functions To Apply", "tsjippy")
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Select to hide", "tsjippy"), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Inverse Logic", "tsjippy"),
              checked: !!attributes.phpFilterInverseLogic,
              onChange: () => setAttributes({
                phpFilterInverseLogic: !attributes.phpFilterInverseLogic
              })
            }), createFilterControls()]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Disabled, {
            isDisabled: attributes.onlyOnInherited,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("strong", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Select pages", "tsjippy")
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Select pages you want this widget to show on", "tsjippy"), ".", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Leave empty for all pages", "tsjippy"), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), selectedPagesControls, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("i", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Use searchbox below to search for more pages to include", "tsjippy")
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SearchControl, {
              onChange: setSearchTerm,
              value: searchTerm
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(BuildCheckboxControls, {
              hasResolved: pagesResolved,
              items: pages
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Disabled, {
            isDisabled: attributes.rolesInherited,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("b", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Roles Who Can See This Block", "tsjippy")
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Inverse Logic", "tsjippy"),
              checked: !!attributes.rolesInverseLogic,
              onChange: () => setAttributes({
                rolesInverseLogic: !attributes.rolesInverseLogic
              })
            }), createRolesSelectors()]
          })]
        })
      })]
    });
  };
}, "blockFilterControls");
wp.hooks.addFilter("editor.BlockEdit", "tsjippy/block-filter-controls", blockFilterControls);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map