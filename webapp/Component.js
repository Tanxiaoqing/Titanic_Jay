sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"titanic/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("titanic.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			// set router
			this.getRouter().initialize();
			this._router = this.getRouter();
		},
		
		navBack: function () {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var oPrevHash = oHistory.getPreviousHash();
			if (oPrevHash !== undefined) {
				window.history.go(-1);
			} else {
				this._router.navTo("welcome", {}, true);
			}
		}
	});
});