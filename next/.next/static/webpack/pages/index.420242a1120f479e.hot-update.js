"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_AddMarkers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/AddMarkers */ \"./src/components/AddMarkers.tsx\");\n/* harmony import */ var _components_AddRestroom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/AddRestroom */ \"./src/components/AddRestroom.tsx\");\n/* harmony import */ var _utils_RightClickMapHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/RightClickMapHandler */ \"./src/utils/RightClickMapHandler.ts\");\n/* harmony import */ var _utils_loadGoogleMapsAPI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/loadGoogleMapsAPI */ \"./src/utils/loadGoogleMapsAPI.ts\");\n/* harmony import */ var _emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/react/jsx-dev-runtime */ \"./node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js\");\nvar _jsxFileName = \"/app/src/pages/index.tsx\",\n  _this = undefined,\n  _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nvar Index = function Index() {\n  _s();\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),\n    map = _useState[0],\n    setMap = _useState[1];\n  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    openAddRestroomModal = _useState2[0],\n    setOpenAddRestroomModal = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),\n    coords = _useState3[0],\n    setCoords = _useState3[1];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    (0,_utils_loadGoogleMapsAPI__WEBPACK_IMPORTED_MODULE_4__.loadGoogleMapsAPI)(setMap);\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    if (map) {\n      (0,_utils_RightClickMapHandler__WEBPACK_IMPORTED_MODULE_3__.RightClickMapHandler)({\n        map: map,\n        setMap: setMap,\n        setOpenAddRestroomModal: setOpenAddRestroomModal,\n        setCoords: setCoords\n      });\n    }\n  }, [map]);\n  return (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {\n    children: (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Container, {\n      maxWidth: \"xl\",\n      children: [(0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_components_AddMarkers__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        map: map\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 30,\n        columnNumber: 9\n      }, _this), (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n        id: \"map\",\n        style: {\n          height: '80vh',\n          width: '100%'\n        }\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 31,\n        columnNumber: 9\n      }, _this), (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n        id: \"infoPanel\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 32,\n        columnNumber: 9\n      }, _this), (0,_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_components_AddRestroom__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        open: openAddRestroomModal,\n        onClose: function onClose() {\n          return setOpenAddRestroomModal(false);\n        },\n        coords: coords\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 33,\n        columnNumber: 9\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 29,\n      columnNumber: 7\n    }, _this)\n  }, void 0, false);\n};\n_s(Index, \"rMKtKXUKpIsbEL2s+wX/3dgj3Lk=\");\n_c = Index;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Index);\nvar _c;\n$RefreshReg$(_c, \"Index\");\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUE4QztBQUVIO0FBQ0s7QUFDRTtBQUNpQjtBQUNOO0FBQUE7QUFBQTtBQUU3RCxJQUFNWSxLQUFlLEdBQUcsU0FBbEJBLEtBQWVBLENBQUEsRUFBUztFQUFBQyxFQUFBO0VBQzVCLElBQUFDLFNBQUEsR0FBc0JYLCtDQUFRLENBQXlCLElBQUksQ0FBQztJQUFyRFksR0FBRyxHQUFBRCxTQUFBO0lBQUVFLE1BQU0sR0FBQUYsU0FBQTtFQUVsQixJQUFBRyxVQUFBLEdBQXdEZCwrQ0FBUSxDQUFDLEtBQUssQ0FBQztJQUFoRWUsb0JBQW9CLEdBQUFELFVBQUE7SUFBRUUsdUJBQXVCLEdBQUFGLFVBQUE7RUFDcEQsSUFBQUcsVUFBQSxHQUE0QmpCLCtDQUFRLENBQ2xDLElBQ0YsQ0FBQztJQUZNa0IsTUFBTSxHQUFBRCxVQUFBO0lBQUVFLFNBQVMsR0FBQUYsVUFBQTtFQUl4QmxCLGdEQUFTLENBQUMsWUFBTTtJQUNkSywyRUFBaUIsQ0FBQ1MsTUFBTSxDQUFDO0VBQzNCLENBQUMsRUFBRSxFQUFFLENBQUM7RUFFTmQsZ0RBQVMsQ0FBQyxZQUFNO0lBQ2QsSUFBSWEsR0FBRyxFQUFFO01BQ1BULGlGQUFvQixDQUFDO1FBQUVTLEdBQUcsRUFBSEEsR0FBRztRQUFFQyxNQUFNLEVBQU5BLE1BQU07UUFBRUcsdUJBQXVCLEVBQXZCQSx1QkFBdUI7UUFBRUcsU0FBUyxFQUFUQTtNQUFVLENBQUMsQ0FBQztJQUMzRTtFQUNGLENBQUMsRUFBRSxDQUFDUCxHQUFHLENBQUMsQ0FBQztFQUVULE9BQ0VOLHNFQUFBLENBQUFFLG9FQUFBO0lBQUFZLFFBQUEsRUFDRWQsc0VBQUEsQ0FBQ1Isb0RBQVM7TUFBQ3VCLFFBQVEsRUFBQyxJQUFJO01BQUFELFFBQUEsR0FDdEJkLHNFQUFBLENBQUNMLDhEQUFVO1FBQUNXLEdBQUcsRUFBRUE7TUFBSTtRQUFBVSxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUEsR0FBQUMsS0FBRSxDQUFDLEVBQ3hCcEIsc0VBQUEsQ0FBQ1QsOENBQUc7UUFBQzhCLEVBQUUsRUFBQyxLQUFLO1FBQUNDLEtBQUssRUFBRTtVQUFFQyxNQUFNLEVBQUUsTUFBTTtVQUFFQyxLQUFLLEVBQUU7UUFBTztNQUFFO1FBQUFSLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQSxHQUFBQyxLQUFNLENBQUMsRUFDOURwQixzRUFBQSxDQUFDVCw4Q0FBRztRQUFDOEIsRUFBRSxFQUFDO01BQVc7UUFBQUwsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBLEdBQUFDLEtBQU0sQ0FBQyxFQUMxQnBCLHNFQUFBLENBQUNKLCtEQUFXO1FBQ1Y2QixJQUFJLEVBQUVoQixvQkFBcUI7UUFDM0JpQixPQUFPLEVBQUUsU0FBQUEsUUFBQTtVQUFBLE9BQU1oQix1QkFBdUIsQ0FBQyxLQUFLLENBQUM7UUFBQSxDQUFDO1FBQzlDRSxNQUFNLEVBQUVBO01BQU87UUFBQUksUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBLEdBQUFDLEtBQ2hCLENBQUM7SUFBQTtNQUFBSixRQUFBLEVBQUFDLFlBQUE7TUFBQUMsVUFBQTtNQUFBQyxZQUFBO0lBQUEsR0FBQUMsS0FDTztFQUFDLGdCQUNaLENBQUM7QUFFUCxDQUFDO0FBQUFoQixFQUFBLENBaENLRCxLQUFlO0FBQUF3QixFQUFBLEdBQWZ4QixLQUFlO0FBa0NyQiwrREFBZUEsS0FBSztBQUFBLElBQUF3QixFQUFBO0FBQUFDLFlBQUEsQ0FBQUQsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvaW5kZXgudHN4PzE5YTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94LCBDb250YWluZXIgfSBmcm9tICdAbXVpL21hdGVyaWFsJ1xuaW1wb3J0IHR5cGUgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgQWRkTWFya2VycyBmcm9tICdAL2NvbXBvbmVudHMvQWRkTWFya2VycydcbmltcG9ydCBBZGRSZXN0cm9vbSBmcm9tICdAL2NvbXBvbmVudHMvQWRkUmVzdHJvb20nXG5pbXBvcnQgeyBSaWdodENsaWNrTWFwSGFuZGxlciB9IGZyb20gJ0AvdXRpbHMvUmlnaHRDbGlja01hcEhhbmRsZXInXG5pbXBvcnQgeyBsb2FkR29vZ2xlTWFwc0FQSSB9IGZyb20gJ0AvdXRpbHMvbG9hZEdvb2dsZU1hcHNBUEknXG5cbmNvbnN0IEluZGV4OiBOZXh0UGFnZSA9ICgpID0+IHtcbiAgY29uc3QgW21hcCwgc2V0TWFwXSA9IHVzZVN0YXRlPGdvb2dsZS5tYXBzLk1hcCB8IG51bGw+KG51bGwpXG5cbiAgY29uc3QgW29wZW5BZGRSZXN0cm9vbU1vZGFsLCBzZXRPcGVuQWRkUmVzdHJvb21Nb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2Nvb3Jkcywgc2V0Q29vcmRzXSA9IHVzZVN0YXRlPHsgbGF0OiBudW1iZXI7IGxuZzogbnVtYmVyIH0gfCBudWxsPihcbiAgICBudWxsLFxuICApXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkR29vZ2xlTWFwc0FQSShzZXRNYXApXG4gIH0sIFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG1hcCkge1xuICAgICAgUmlnaHRDbGlja01hcEhhbmRsZXIoeyBtYXAsIHNldE1hcCwgc2V0T3BlbkFkZFJlc3Ryb29tTW9kYWwsIHNldENvb3JkcyB9KVxuICAgIH1cbiAgfSwgW21hcF0pXG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPENvbnRhaW5lciBtYXhXaWR0aD1cInhsXCI+XG4gICAgICAgIDxBZGRNYXJrZXJzIG1hcD17bWFwfSAvPlxuICAgICAgICA8Qm94IGlkPVwibWFwXCIgc3R5bGU9e3sgaGVpZ2h0OiAnODB2aCcsIHdpZHRoOiAnMTAwJScgfX0+PC9Cb3g+XG4gICAgICAgIDxCb3ggaWQ9XCJpbmZvUGFuZWxcIj48L0JveD5cbiAgICAgICAgPEFkZFJlc3Ryb29tXG4gICAgICAgICAgb3Blbj17b3BlbkFkZFJlc3Ryb29tTW9kYWx9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0T3BlbkFkZFJlc3Ryb29tTW9kYWwoZmFsc2UpfVxuICAgICAgICAgIGNvb3Jkcz17Y29vcmRzfVxuICAgICAgICAvPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhcbiJdLCJuYW1lcyI6WyJCb3giLCJDb250YWluZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkFkZE1hcmtlcnMiLCJBZGRSZXN0cm9vbSIsIlJpZ2h0Q2xpY2tNYXBIYW5kbGVyIiwibG9hZEdvb2dsZU1hcHNBUEkiLCJqc3hERVYiLCJfanN4REVWIiwiRnJhZ21lbnQiLCJfRnJhZ21lbnQiLCJJbmRleCIsIl9zIiwiX3VzZVN0YXRlIiwibWFwIiwic2V0TWFwIiwiX3VzZVN0YXRlMiIsIm9wZW5BZGRSZXN0cm9vbU1vZGFsIiwic2V0T3BlbkFkZFJlc3Ryb29tTW9kYWwiLCJfdXNlU3RhdGUzIiwiY29vcmRzIiwic2V0Q29vcmRzIiwiY2hpbGRyZW4iLCJtYXhXaWR0aCIsImZpbGVOYW1lIiwiX2pzeEZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsIl90aGlzIiwiaWQiLCJzdHlsZSIsImhlaWdodCIsIndpZHRoIiwib3BlbiIsIm9uQ2xvc2UiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n"));

/***/ })

});