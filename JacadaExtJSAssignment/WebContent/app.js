/**
 * 
 */

/**
 *custom Vtype for vtype:'ssn'
 *sets validation on ssn TextField 
 */
Ext.apply(Ext.form.field.VTypes, {
	'ssn' : function(v) {
		return /^\d{3}-\d{2}-\d{4}$/.test(v);
	},
	'ssnText' : 'The SSN format is wrong, e.g., 123-45-6789',
});

/* This onReady is used to create the entire app using ExtJS*/
/* global Ext:false */
Ext.onReady(function() {
	
	//This is used for combobox to reference months
	var DOBMonths = Ext.create('Ext.data.Store', {
	    fields: ['name'],
	    data : [
	        {"name":"January"},{"name":"February"},{"name":"March"},{"name":"April"},{"name":"May"},
	        {"name":"June"},{"name":"July"},{"name":"August"},{"name":"September"},{"name":"October"},
	        {"name":"November"},{"name":"December"}
	    ]
	});
	
	//this is used for combobox to reference DOB days
	var DOBDays = Ext.create('Ext.data.Store', {
	    fields: ['dayNumber'],
	    data : [
	        {"dayNumber":1},{"dayNumber":2},{"dayNumber":3},{"dayNumber":4},{"dayNumber":5},{"dayNumber":6},
	        {"dayNumber":7},{"dayNumber":8},{"dayNumber":9},{"dayNumber":10},{"dayNumber":11},{"dayNumber":12},
	        {"dayNumber":13},{"dayNumber":14},{"dayNumber":15},{"dayNumber":16},{"dayNumber":17},{"dayNumber":18},{"dayNumber":19},
	        {"dayNumber":20},{"dayNumber":21},{"dayNumber":22},{"dayNumber":23},{"dayNumber":24},{"dayNumber":25},
	        {"dayNumber":26},{"dayNumber":27},{"dayNumber":28},{"dayNumber":29},{"dayNumber":30},{"dayNumber":31},
	    ]
	});
	
//this gets a range of years an stores it to years array
	 var years = [];
	 var year = 1900; /*begin year*/
	    while (year<=2014){   /*end year*/
	    	 years.push({"year":[year]});
	         year++;
	    }
	     
	// DOBYears variable is used to store range of years
    //combobox references this to populate with year values
	var DOBYears = Ext.create('Ext.data.Store', {
	    fields: ['year'],
	    data : years
	});

	/*
	 * this calcAge method return age based on birthdate passed into parameter
	 */
	function calcAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	        age--;
	    }
	
		return age;
	}
	
	/*
	 * This store2 variable is used to store initial values into the array
	 * The grid references the storeId to pull default values 
	 */
	var store2 = Ext.create('Ext.data.Store', {
		storeId : 'familyMemberStore',
		fields : [ 'firstname', 'lastname', 'age', 'gender', 'ssn' ],
		data : [ {
			firstname : "Michael",
			lastname : "Scott",
			age : "7",
			gender : "M",
			ssn : "254-62-6541"
		}, {
			firstname : "Caroline",
			lastname : "Schrute",
			age : "2",
			gender : "F",
			ssn : "254-62-6523"
		}, {
			firstname : "Jim",
			lastname : "Halpert",
			age : "3",
			gender : "M",
			ssn : "254-95-7456"
		}, {
			firstname : "Kevin",
			lastname : "Malone",
			age : "4",
			gender : "M",
			ssn : "111-11-1111"
		}, {
			firstname : "Angela",
			lastname : "Martin",
			age : "5",
			gender : "F",
			ssn : "454-65-3321"
		} ],
	});
	
	/*
	 * This panel will contain all components of the application
	 */
	
	var myForm = Ext.create('Ext.form.Panel', {
		/*panel attributes below*/
		title : 'Family Member Details (input)', //set title to Family Member Details
		labelWidth : 75,
		frame : true,
		bodyStyle : 'padding:5px 5px 0',
		width : 950,
		renderTo : Ext.getBody(),
		layout : 'column',
		
		/*items contains more components of panel*/
		items : [
				{
					
					// ***** Member Information*****
					//1st fieldset- collapsible via toggle button
					xtype : 'fieldset',
					
					/*fieldset attributes*/
					columnWidth : 0.6,
					title : 'Membership Information',
					collapsible : true,
					
					/*text field add in fieldset*/
					defaultType : 'textfield',
					defaults : {
						anchor : '100%'
					},
					layout : 'anchor',
					items : [
							{
								fieldLabel : 'First Name:',
								name : 'MemberFirstName'
							},
							{
								fieldLabel : 'Last Name:',
								name : 'MemberLastName'
							},
							/*add member radio buttons M-F*/
							{
								xtype : 'radiogroup',
								fieldLabel : 'Gender',
								defaultType : 'radiofield',
								name : 'memberRadios',
								defaults : {
									flex : 1
								},
								layout : 'hbox',
								column : 2,

								items : [ {
									
									boxLabel : 'M',
									name : 'memberGender',
									inputValue : 'm',
									id : 'maleRadio'
								}, {
									
									boxLabel : 'F',
									name : 'memberGender',
									inputValue : 'l',
									id : 'femaleRadio'
								} ]

							},
							/*add member SSN Field*/
							{
								xtype : 'textfield',
								fieldLabel : 'SSN:',
								name : 'MemberSSN-Field',
								vtype : 'ssn'  /*ensures SSN validation*/
							},
							/*add label for DOB*/
							{
								xtype : 'label',
								forId : 'myFieldId',
								text : 'DOB: ',
							},

							// Create Member combo box, attached to the DOBMonths data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Month',
							    store: DOBMonths,
							    queryMode: 'local',
							    displayField: 'name',
							    id:'monthId',
							    margin : '0 0 0 10',
							    renderTo: Ext.getBody()
							}),
							// Create Member combo box, attached to the DOBDays data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Day',
							    store: DOBDays,
							    queryMode: 'local',
							    displayField: 'dayNumber',
							    id:'dayId',
							    margin : '0 0 0 10',
							    renderTo: Ext.getBody()
							})
							,
							// Create Member combo box, attached to the DOBYears data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Years',
							    store: DOBYears,
							    queryMode: 'local',
							    displayField: 'year',
							    id:'yearId',
							    margin : '0 0 0 10',
							    renderTo: Ext.getBody()
							})

					]
				}, /*close Membership Information field set*/
				
				/*open Spouse Info field set*/
				{
					
					// ***** Spouse Information *****
					//2nd fieldset- collapsible via toggle button
					xtype : 'fieldset',
					
					//spouse fieldset attributes below
					columnWidth : 0.6,
					title : 'Spouse Information',
					collapsible : true,
					
					defaultType : 'textfield',  /*spouse text field add in fieldset*/
					defaults : {
						anchor : '100%'
					},
					layout : 'anchor',
					items : [
							{
								fieldLabel : 'First Name:',
								name : 'spouseFirstName'
							},
							{
								fieldLabel : 'Last Name:',
								name : 'spouseLastName'
							},
							{
								/*add spouse radio buttons M-F*/
								xtype : 'radiogroup',
								fieldLabel : 'Gender',
								defaultType : 'radiofield',
								name : 'spouseRadios',
								column : 2,

								items : [ {
									xtype : 'radiofield',
									boxLabel : 'M',
									name : 'spouseGender',
									inputValue : 'm',
									id : 'spouseMaleRadio'
								}, {
									xtype : 'radiofield',
									boxLabel : 'F',
									name : 'spouseGender',
									inputValue : 'l',
									id : 'spouseFemaleRadio'
								} ]

							},
							/*add Spouse SSN field*/
							{
								xtype : 'textfield',
								fieldLabel : 'SSN:',
								name : 'spouse-SSN-Field',
								vtype : 'ssn'
							},
							/*add spouse DOB label*/
							{
								xtype : 'label',
								forId : 'spouseMyFieldId',
								text : 'DOB: ',

							},

							
							// Create Spouse combo box, attached to the DOBMonths data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Month',
							    store: DOBMonths,
							    queryMode: 'local',
							    displayField: 'name',
							    id:'spouseMonthId',
							    margin : '0 0 0 10',
							    renderTo: Ext.getBody()
							}),
							// Create Member combo box, attached to the DOBDays data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Day',
							    store: DOBDays,
							    queryMode: 'local',
							    displayField: 'dayNumber',
							    id:'spouseDayId',
							    margin : '0 0 0 10',
							    renderTo: Ext.getBody()
							})
							,
							// Create Member combo box, attached to the DOBYears data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Years',
							    store: DOBYears,
							    queryMode: 'local',
							    displayField: 'year',
							    id:'spouseYearId',
							    margin : '0 0 0 10',
							    renderTo: Ext.getBody()
							}),
						

					]
				},

				{
					// ***** Child Information *****
					//2nd field set- collapsible via toggle button
					/*child fieldset attributes below*/
					xtype : 'fieldset',
					columnWidth :0.6,
					title : 'Child Information',
					collapsible : true,
					defaultType : 'textfield', /*field set create text field component first*/
					defaults : {
						anchor : '100%'
					},
					layout : 'anchor',
					items : [
							{
								fieldLabel : 'First Name',
								name : 'childFirstName'
							},
							{
								fieldLabel : 'Last Name',
								name : 'childLastName'
							},
							/*create child gender radio buttons*/
							{
								xtype : 'radiogroup',
								fieldLabel : 'Gender',
								defaultType : 'radiofield',
								name : 'childRadios',
								defaults : {
									flex : 1
								},
								layout : 'hbox',
								items : [ {
									boxLabel : 'M',
									name : 'childGender',
									inputValue : 'm',
									id : 'childMaleRadio'
								}, {
									boxLabel : 'F',
									name : 'childGender',
									inputValue : 'l',
									id : 'childFemaleRadio'
								} ]
							},
							/*create child ssn field*/
							{
								xtype : 'textfield',
								fieldLabel : 'SSN:',
								name : 'child-SSN-Field',
								vtype : 'ssn'
							},
							/*create child DOB Label*/
							{
								xtype : 'label',
								forId : 'childMyFieldId',
								text : 'DOB: ',

							},
							
							// Create Member combo box, attached to the DOBMonths data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Month',
							    store: DOBMonths,
							    queryMode: 'local',
							    displayField: 'name',
							    id:'childMonthId',
							    renderTo: Ext.getBody()
							}),
							// Create Member combo box, attached to the DOBDays data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Day',
							    store: DOBDays,
							    queryMode: 'local',
							    displayField: 'dayNumber',
							    id:'childDayId',
							    renderTo: Ext.getBody()
							})
							,
							// Create Member combo box, attached to the DOBYears data store
							Ext.create('Ext.form.ComboBox', {
							    fieldLabel: 'Years',
							    store: DOBYears,
							    queryMode: 'local',
							    displayField: 'year',
							    id:'childYearId',
							    renderTo: Ext.getBody()
							}),
					]
				},
				/*This button is used to add records to the grid*/
				{
					/*Button attributes*/
					text : '<div style="color: black; font-weight: bold;">Display</div>',
					xtype : 'button',
					width : 70,
					height : 25,
					margin: '100 0 45 15',
					formBind : true,
					// only enabled once the form is valid
					disabled : true,
					handler : function() {
						
						var form = this.up('form').getForm();
						
						/*variables used to track of each birthday entered by Member,Spouse or Child*/
						var memberBirthday = form.findField('monthId').getValue()+ " "+ form.findField('dayId').getValue()+ ", "+ form.findField('yearId').getValue();
						var spouseBirthday = form.findField('spouseMonthId').getValue()+ " "+ form.findField('spouseDayId').getValue()+ ", "+ form.findField('spouseYearId').getValue(); 
						var childBirthday = form.findField('childMonthId').getValue()+ " "+ form.findField('childDayId').getValue()+ ", "+ form.findField('childYearId').getValue();
						
						/*variables used to track of each age entered by Member,Spouse or Child*/
						var memberAge = calcAge(memberBirthday);
						var spouseAge = calcAge(spouseBirthday);
						var childAge = calcAge(childBirthday);
						
						//remove all values from grid before records added
						store2.removeAll();
						
						//Testing
						//Ext.Msg.alert("dddddd"+grabPanelValue());
						
						//****Add Member to grid****
						/*store all Member information added in Member fieldset*/
						store2.add({
							firstname : form.findField('MemberFirstName').getValue(),
							lastname : form.findField('MemberLastName').getValue(),
							age : memberAge,
							gender :memberRadioFix(),
							ssn : form.findField('MemberSSN-Field').getValue()
						});
						// ***Add spouse to grid***
						/*store all Member information added in Spouse fieldset*/
						store2.add({
							firstname : form.findField('spouseFirstName').getValue(),
							lastname : form.findField('spouseLastName').getValue(),
							age : spouseAge,
							gender : spouseRadioFix(),
							ssn : form.findField('spouse-SSN-Field').getValue()
						});

						// ****Add child to grid****
						/*store all Child information added in Member fieldset*/
						store2
								.add({
									firstname : form
											.findField('childFirstName').getValue(),
									lastname : form.findField('childLastName').getValue(),
									age : childAge,
									gender : childRadioFix(),
									ssn : form.findField('child-SSN-Field').getValue()
								});

					}

				},

				// ***** Grid Information *****
				{
					/*Grid attributes below*/
					xtype : 'grid',
					title : 'Family Details (in a Grid Display)',
					store : Ext.data.StoreManager.lookup('familyMemberStore'),
					margin: '0 0 35 15',
					
					/*this is used to set grid columns and column data type*/
					columns : [ {
						text : 'First Name',
						dataIndex : 'firstname',
						type : 'string'
					}, {
						text : 'Last Name',
						dataIndex : 'lastname',
						type : 'string'
					}, {
						text : 'Age',
						dataIndex : 'age',
						type : 'string',

					}, {
						text : 'Gender',
						dataIndex : 'gender',
						type : 'string',
					}, {
						text : 'SSN',
						dataIndex : 'ssn',
						type : 'string',
					} ],
					width : 400,
					forceFit : true,
					renderTo : Ext.getBody()
				} ]

	});
	
	/*The below methids contain conditionals for each gender 
	 * radio field to ensure record is added wheather/wheather 
	 * not gender radio is selected
	 */
	function memberRadioFix()
	{	
		var memberValue='';
		if(myForm.getForm().findField('memberRadios').getChecked()[0])
		{
		   memberValue = myForm.getForm().findField("memberRadios").getChecked()[0].boxLabel;
		}
		return memberValue;
	}
	
	function spouseRadioFix(){
		
		var spouseValue='';
		if(myForm.getForm().findField('spouseRadios').getChecked()[0])
		{
		   spouseValue = myForm.getForm().findField("spouseRadios").getChecked()[0].boxLabel;
		}
		return spouseValue;
		
	}
	
	function childRadioFix(){
		var childValue='';
		if(myForm.getForm().findField('childRadios').getChecked()[0])
		{
		   childValue = myForm.getForm().findField("childRadios").getChecked()[0].boxLabel;
		}
		return childValue;
	}
});
