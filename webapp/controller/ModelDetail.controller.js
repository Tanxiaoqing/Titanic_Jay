sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("titanic.controller.ModelDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf titanic.view.ModelDetail
		 */
		onInit: function() {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
			this._router.getRoute("model").attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			this._modelId = oArgs.id;
			var sPath = "/MODELS('" + oArgs.id + "')";
			//var sPath = "/MODEL_IMP_DETAIL";
			//var oModel = oView.getModel();
			//var oData = oModel.getData(sPath);
			var oModel = oView.getModel();
			var oImpContext = oModel.getContext(sPath + "/MODEL_IMP_DETAILS");
			var oErrContext = oModel.getContext(sPath + "/MODEL_ERR_DETAILS");
			var oTstContext = oModel.getContext(sPath + "/MODEL_TEST_RESULTS");
			
			var oImpDetailsTable = this.byId("ImpDetailsTable");
			oImpDetailsTable.setBindingContext(oImpContext);
			
			var oErrDetailsTable = this.byId("ErrDetailsTable");
			oErrDetailsTable.setBindingContext(oErrContext);
			
			var oTstResultsTable = this.byId("TstResultsTable");
			oTstResultsTable.setBindingContext(oTstContext);

			oView.bindElement({
				path: sPath,
				//filter: {path:"MODEL_ID", operator:"EQ", value1:oArgs.id },
				//parameters: {expand:'MODEL_IMP_DETAILS'},
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oView.setBusy(true);
					},
					dataReceived: function() {
						oView.setBusy(false);
					}
				}
			});
		},

		_onBindingChange: function(oEvent) {
			//var oElementBinding = this.getView().getElementBinding();
			// No data for the binding
			//if (oElementBinding && !oElementBinding.getBoundContext()) {
			//	this.getRouter().getTargets().display("notFound");
			//}
		},
		
		onTestModel: function( ){
			var para = "?";
			para += "MODEL_ID=";
			para += this._modelId;
			$.ajax({
				url: "/TITANIC_TEST_MODEL" + para,
				async: false
			});
			this.byId("TstResultsTable").getBinding("items").refresh(true);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf titanic.view.ModelDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf titanic.view.ModelDetail
		 */
		//	onAfterRendering: function() {
		//		var a = null;
		//	}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf titanic.view.ModelDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});