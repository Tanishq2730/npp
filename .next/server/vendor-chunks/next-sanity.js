"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/next-sanity";
exports.ids = ["vendor-chunks/next-sanity"];
exports.modules = {

/***/ "(action-browser)/./node_modules/next-sanity/dist/visual-editing/server-actions.js":
/*!************************************************************************!*\
  !*** ./node_modules/next-sanity/dist/visual-editing/server-actions.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   revalidateRootLayout: () => (/* binding */ revalidateRootLayout)\n/* harmony export */ });\n/* harmony import */ var private_next_rsc_server_reference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! private-next-rsc-server-reference */ \"(action-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js\");\n/* harmony import */ var private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-encryption */ \"(action-browser)/./node_modules/next/dist/server/app-render/action-encryption.js\");\n/* harmony import */ var next_cache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/cache.js */ \"(action-browser)/./node_modules/next/cache.js\");\n/* harmony import */ var next_headers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/headers.js */ \"(action-browser)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var private_next_rsc_action_validate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-rsc-action-validate */ \"(action-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js\");\n/* __next_internal_action_entry_do_not_use__ {\"15f3214a1c6278ab7008a8bc743078f13acd419f\":\"revalidateRootLayout\"} */ \n\n\n\nasync function revalidateRootLayout() {\n    if (!(await (0,next_headers_js__WEBPACK_IMPORTED_MODULE_3__.draftMode)()).isEnabled) {\n        console.warn(\"Skipped revalidatePath request because draft mode is not enabled\");\n        return;\n    }\n    await (0,next_cache_js__WEBPACK_IMPORTED_MODULE_2__.revalidatePath)(\"/\", \"layout\");\n}\n //# sourceMappingURL=server-actions.js.map\n\n(0,private_next_rsc_action_validate__WEBPACK_IMPORTED_MODULE_4__.ensureServerEntryExports)([\n    revalidateRootLayout\n]);\n(0,private_next_rsc_server_reference__WEBPACK_IMPORTED_MODULE_0__.registerServerReference)(\"15f3214a1c6278ab7008a8bc743078f13acd419f\", revalidateRootLayout);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9uZXh0LXNhbml0eS9kaXN0L3Zpc3VhbC1lZGl0aW5nL3NlcnZlci1hY3Rpb25zLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQytDO0FBQ0g7QUFDNUMsZUFBZUU7SUFDYixJQUFJLENBQUMsQ0FBQyxNQUFNRCwwREFBU0EsRUFBQyxFQUFHRSxTQUFTLEVBQUU7UUFDbENDLFFBQVFDLElBQUksQ0FBQztRQUNiO0lBQ0Y7SUFDQSxNQUFNTCw2REFBY0EsQ0FBQyxLQUFLO0FBQzVCO0FBR0UsQ0FDRiwwQ0FBMEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ucHAvLi9ub2RlX21vZHVsZXMvbmV4dC1zYW5pdHkvZGlzdC92aXN1YWwtZWRpdGluZy9zZXJ2ZXItYWN0aW9ucy5qcz83NGFlIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZS5qc1wiO1xuaW1wb3J0IHsgZHJhZnRNb2RlIH0gZnJvbSBcIm5leHQvaGVhZGVycy5qc1wiO1xuYXN5bmMgZnVuY3Rpb24gcmV2YWxpZGF0ZVJvb3RMYXlvdXQoKSB7XG4gIGlmICghKGF3YWl0IGRyYWZ0TW9kZSgpKS5pc0VuYWJsZWQpIHtcbiAgICBjb25zb2xlLndhcm4oXCJTa2lwcGVkIHJldmFsaWRhdGVQYXRoIHJlcXVlc3QgYmVjYXVzZSBkcmFmdCBtb2RlIGlzIG5vdCBlbmFibGVkXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCByZXZhbGlkYXRlUGF0aChcIi9cIiwgXCJsYXlvdXRcIik7XG59XG5leHBvcnQge1xuICByZXZhbGlkYXRlUm9vdExheW91dFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZlci1hY3Rpb25zLmpzLm1hcFxuIl0sIm5hbWVzIjpbInJldmFsaWRhdGVQYXRoIiwiZHJhZnRNb2RlIiwicmV2YWxpZGF0ZVJvb3RMYXlvdXQiLCJpc0VuYWJsZWQiLCJjb25zb2xlIiwid2FybiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/next-sanity/dist/visual-editing/server-actions.js\n");

/***/ })

};
;