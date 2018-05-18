sap.ui.controller("smax.batch32.A2.controller.ProductDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ProductDetail
*/
	onInit: function() {

		//reference of Router 
		var oRouter = this.getOwnerComponent().getRouter();
		
		oRouter.getRoute("p2").attachPatternMatched(this.handleData,this);
	},
    
	handleData : function(oEvent){
		debugger;
		var productID = oEvent.getParameters().arguments.pId;
		
		this.getView().bindElement("/ProductSet('"+productID+"')");
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.ProductDetail
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.ProductDetail
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.ProductDetail
*/
//	onExit: function() {
//
//	}
	onCreate : function(){
		var oDialog = new sap.m.Dialog({
			title : "Create Product",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Category"}),
				new sap.m.Input()
			],
			buttons : [
				new sap.m.Button({
					text : "Save and Close",
					press : function(){
						//save data to gateway
						
						var data = {
								ProductID : oDialog.getContent()[1].getValue(),
								Name : oDialog.getContent()[3].getValue(),
								Category : oDialog.getContent()[5].getValue()
						}
						var oModel = oDialog.getModel();
						
						oModel.create("/ProductSet", data, {
							success : function(data, response){
								sap.m.MessageToast.show("Data Created");
							},
							error : function(error){
								sap.m.MessageToast.show("Data Not Created");
							}
						})
						//close the dialog
						oDialog.close();
					}
				})
			]
		});
		
		var oCompModel = this.getOwnerComponent().getModel();	
		oDialog.setModel(oCompModel);
		oDialog.open();
	
	},
	onUpdate : function(){
		
		var oController = this;
		
		var oDialog = new sap.m.Dialog({
			title : "Update Product",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input({ editable : false, value : oController.getView().byId("idProd").getText()}),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input({ value : oController.getView().byId("idName").getText()})
			],
			buttons : [
				new sap.m.Button({
					text : "Update and Close",
					press : function(){
						//save data to gateway
						
						var data = {
								Name : oDialog.getContent()[3].getValue()
								
						}
						
						var oModel = oDialog.getModel();
						
						oModel.update("/ProductSet('"+oController.getView().byId("idProd").getText()+"')", data, {
							success : function(data, response){
								sap.m.MessageToast.show("Data Created");
							},
							error : function(error){
								sap.m.MessageToast.show("Data Not Created");
							}
						})
						//close the dialog
						oDialog.close();
					}
				})
			]
		});
		var oCompModel = this.getOwnerComponent().getModel();	
		oDialog.setModel(oCompModel);
		oDialog.open();
	}
});