Dashboard.Collections.Notes = new Mongo.Collection('notes');

Dashboard.Schemas.Note = new SimpleSchema({
	content: {
		type: String,
		label: 'Note',
    autoform: {
      afFieldInput: {
        type: 'textarea'
      }
    }
	},
  customerId: {
    type: String,
    optional: false,
    autoform: {
      afFieldInput: {
        type: 'hidden'
      },
      afFormGroup: {
        label: false
      }
    }
  },
	createdById: {
		type: String,
    optional: true
	},
  createdByEmail: {
		type: String,
    optional: true
	},
	createdOn: {
		type: Date,
    optional: true
	}
});

Dashboard.Collections.Notes.attachSchema(Dashboard.Schemas.Note);

Meteor.methods({

  noteInsert: function (doc) {

    var note, user = Meteor.user(), noteId;

    check(Meteor.userId(), String);
    check(doc, {
      content: String,
      customerId: String
    });

    note = _.extend(doc, {
      createdById: user._id,
      createdByEmail: user.emails[0].address,
      createdOn: new Date()
    });

    noteId = Dashboard.Collections.Notes.insert(note);

    return {
      _id: noteId
    };

  }

});
