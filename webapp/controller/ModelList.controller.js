sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("titanic.controller.ModelList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf titanic.view.ModelList
		 */
		onInit: function() {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf titanic.view.ModelList
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf titanic.view.ModelList
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf titanic.view.ModelList
		 */
		//	onExit: function() {
		//
		//	}

		onModelItemPress: function(oEvent) {
			var oBindContext;
			oBindContext = oEvent.getSource().getBindingContext();
			var oModel = oBindContext.getModel();
			var sModelId = oModel.getData(oBindContext.getPath()).ID;
			this._router.navTo("model", {
				id: sModelId
			});
		},

		onNewModel: function( ) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("titanic.view.Dialog", this);
				this.getView().addDependent(this._oDialog);
			}
			this._oDialog.open();
		},

		onCloseDialog: function( ) {
			this._oDialog.close();
		},
		
		onSaveNewModel: function( ){
			var desc = sap.ui.getCore().byId("newModelDesc").getValue();
			var treenum = sap.ui.getCore().byId("newModelTreeNum").getValue();
			var para = "?";
			para += "DESC=";
			para += desc;
			para += "&";
			para += "TREENUM=";
			para += treenum;
			$.ajax({
				url: "/TITANIC_TRAIN_MODEL" + para,
				async: false
			});
			this.byId("modelList").getBinding("items").refresh(true);
			this._oDialog.close();
		}
	});

});